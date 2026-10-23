# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
npm install          # Install dependencies (needs Node.js 18+)
npm run dev          # Dev server on http://localhost:8080
npm run build        # Production build to dist/
npm run preview      # Preview production build on http://localhost:4173
npm run lint         # ESLint (currently crashes: ESLint 9.39 vs installed typescript-eslint)
```

Type-check with `npx tsc --noEmit -p tsconfig.app.json`, since lint is broken.

**Makefile targets** (deployment; always pass `DOMAIN=`, it defaults to `localhost`):
```bash
make build                                   # npm install + npm run build
make publish HOST=root@yanct.com DOMAIN=yanct.com   # build locally, rsync dist/ to the server
make configure-nginx DOMAIN=yanct.com        # on the server: copy dist/, write nginx config
make obtain-ssl / renew-ssl DOMAIN=...       # certbot
```

`configure-nginx.sh` serves `index.html` for unknown paths with a 404 status, so the app renders its kernel-panic page.

## Architecture Overview

A **single-page portfolio site** for an embedded Linux consultant, built with React + Vite + Tailwind + Framer Motion. It's themed as a terminal on a booting device. Navigation is scroll-based; the only routes are `/` and a catch-all 404.

### Key Files

- `src/pages/Index.tsx` - Composes all sections; owns `bootKey` and the `reboot()` action (instant jump to top, then replay the boot)
- `src/pages/NotFound.tsx` - Kernel-panic 404
- `src/components/BootHero.tsx` - Boot log that types out, then the hero. Plays once per session (`sessionStorage`), skippable by any key/tap, always replays when `bootKey` changes
- `src/components/Journey.tsx` - "From while(1) to Linux": six layer steps plus a sticky, clickable product stack (see below)
- `src/components/HowIWork.tsx`, `Toolbox.tsx`, `Testimonials.tsx`, `Team.tsx`, `Contact.tsx`, `Footer.tsx` - The remaining sections, styled as `systemctl`, `lsmod`, `dmesg`, `ps` and a login prompt
- `src/components/RebootButton.tsx` - `$ sudo reboot`, shared by the footer and the product stack

### Journey / product stack

The trickiest part of the page; check these behaviours after changing it:

- `LAYERS` is ordered bottom-up; the stack renders it with `flex-col-reverse`.
- `active` is the index of the layer in the middle band of the viewport (`ACTIVE_BAND`, via `useInView`), or `-1` for "nothing built yet". Reaching the start view (section top at the top of the screen) forces at least `0`, since on short phones Layer 0 is still below the band there. Above the start view, with Layer 0 below the band, it resets to `-1` so the stack starts over at the top of the page.
- The section opens on its "start view" (what `#journey` lands on): the heading with Layer 0 (Bare metal) top-aligned beneath it, level with the stack, so Bare metal is selected and the cursor sits on Bootloader.
- Clicking a stack layer or a step's `$ cd ../<next>` button calls `scrollToLayer`. Bare metal scrolls back to the start view. Other layers line the step's centre up with the stack's *stuck* centre (sticky `top` + half its height), not the viewport centre. On mobile it centres the step in the space below the pinned `MobileStack` bar.
- Each step is `min-h-screen` so neighbouring layers stay off-screen after a jump; Layer 0 is top-aligned, the rest are centred. A desktop-only `30vh` spacer after the last layer keeps the next section out of view on tall screens.
- The stack's sticky `top` is `min(20vh, 16rem)` so it never sits below the start of the layers on very tall screens.
- A blinking `█` cursor (`layoutId` so it glides) marks the next layer (`nextLayer`), wrapping back to Bare metal once all are built.
- Desktop (`md:` and up) shows `StackDiagram` in a sticky right column. Phones get `MobileStack` instead: a row of short-labelled chips (`Layer.short`) pinned to the top of the steps column. Both are always mounted, so the two cursors need different `layoutId`s, and DOM queries for `[aria-current=step]` can hit either one.

### Styling

- Tailwind config is minimal: `term.*` palette (`bg`, `panel`, `line`, `text`, `dim`, `green`, `amber`, `red`, `cyan`) plus `brand-blue` (`#30586D`)
- Fonts: `font-mono` (JetBrains Mono, the default body font) and `font-display` (Space Grotesk), loaded from Google Fonts in `src/index.css`
- Shared component classes in `src/index.css`: `term-window`, `term-window-bar`, `section-prompt`, `section-title`, `scanlines`
- Dark-only design; `prefers-reduced-motion` disables CSS animations and the boot log

### Path Aliases

`@/` maps to `src/` (configured in vite.config.ts and tsconfig.json)

## Conventions

- All content is hardcoded in components as small arrays/constants at the top of each file
- Mobile-first responsive design using Tailwind breakpoints (`md:` = 768px)
- Components are self-contained; the only cross-section wiring is `onReboot` from `Index.tsx`
