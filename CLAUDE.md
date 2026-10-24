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
make publish HOST=root@mikro.io DOMAIN=mikro.io     # build locally, rsync dist/ to the server
make configure-nginx DOMAIN=mikro.io         # on the server: copy dist/, write nginx config
make obtain-ssl / renew-ssl DOMAIN=...       # certbot
```

`configure-nginx.sh` serves `index.html` for unknown paths with a 404 status, so the app renders its 404 page.

## Architecture Overview

This `mikro` branch holds a **single-page company site for Mikro.io AB** (embedded design since 1980, formerly Mikrodidakt AB), built with React + Vite + Tailwind + Framer Motion. Content comes from the old WordPress site at https://mikro.io/. Navigation is anchor-based (`#services`, `#expertise`, `#cases`, `#about`, `#contact`); the only routes are `/` and a catch-all 404.

### Key Files

- `src/company.ts` - Contact details (`COMPANY`) and nav links (`NAV`), shared by header, hero, contact and footer
- `src/pages/Index.tsx` - Composes the sections in page order
- `src/pages/NotFound.tsx` - 404 page
- `src/components/Header.tsx` - Fixed header: transparent over the dark hero, solid white once scrolled or when the mobile menu is open
- `src/components/Hero.tsx`, `Clients.tsx`, `Services.tsx`, `Expertise.tsx`, `Process.tsx`, `Cases.tsx`, `About.tsx`, `Contact.tsx`, `Footer.tsx` - The sections
- `src/components/Reveal.tsx` - Fade-up-on-scroll wrapper used by most sections
- `src/components/Logo.tsx` - Owl mark (`public/mikro-owl.png`) plus a typeset wordmark, with a `dark` variant

### Assets

- `public/clients/*.png` - Client logos from mikro.io, with the grey card background made transparent and cropped
- `public/office.jpg` - Office photo used in About
- `public/mikro-logo.png` - The original white logo (currently unused)

### Styling

- Light, corporate theme with dark navy bands (hero, BSP panel, contact, footer)
- Tailwind palette: `ink.*` (navy text and dark bands), `surface` / `surface-line` (light grey sections, borders), `brand.*` (Mikro.io teal `#0184a9`)
- Fonts: `font-sans` (Inter, body) and `font-display` (Manrope, headings), loaded from Google Fonts in `src/index.css`
- Shared component classes in `src/index.css`: `container-page`, `section`, `eyebrow`, `section-title`, `section-lead`, `card`, `btn-primary`, `btn-ghost`, `grid-bg`
- `prefers-reduced-motion` disables CSS animations and transitions

### Path Aliases

`@/` maps to `src/` (configured in vite.config.ts and tsconfig.json)

## Conventions

- All content is hardcoded in components as small arrays/constants at the top of each file
- Mobile-first responsive design using Tailwind breakpoints (`md:` = 768px)
- Components are self-contained; shared contact details live in `src/company.ts`
