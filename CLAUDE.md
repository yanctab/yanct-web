# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
npm install          # Install dependencies (needs Node.js 18+)
npm run dev          # Dev server on http://localhost:8080
npm run build        # Production build to dist/
npm run preview      # Preview production build on http://localhost:4173
npm run lint         # ESLint
```

Type-check with `npx tsc --noEmit -p tsconfig.app.json`.

**Makefile targets** (deployment; always pass `DOMAIN=`, it defaults to `localhost`):
```bash
make build                                   # npm install + npm run build
make publish HOST=root@yanct.com DOMAIN=yanct.com   # build locally, rsync dist/ to the server
make configure-nginx DOMAIN=yanct.com        # on the server: copy dist/, write nginx config
make obtain-ssl DOMAIN=yanct.com EMAIL=...  # certbot certonly, then re-runs configure-nginx to turn on HTTPS
make renew-ssl                               # certbot renew (the certbot timer normally does this)
```

`configure-nginx.sh` writes the HTTPS server blocks (and redirects HTTP and www there) only when `/etc/letsencrypt/live/$DOMAIN/` has a certificate, so it works on a new domain and can be re-run safely. certbot never edits the nginx config.

`configure-nginx.sh` proxies the news feed at `/nyheter.xml` (re-run `make configure-nginx` after changing it) and serves `index.html` for unknown paths with a 404 status, so the app renders its 404 page.

## Architecture Overview

A **Swedish one-page site** for the basketball club BK50 (Basketklubben Lund 1950), built with React + Vite + Tailwind + Framer Motion. It pitches the club to new players and links out to the club's svenskalag.se pages (www.bk50.se) for teams and sign-up. Navigation is anchor-based. There is no router: `App.tsx` renders the page on `/` and the 404 page on any other path.

### Key Files

- `src/links.ts` - `CLUB_SITE` (the club's Svenskalag site, currently www.bk50.se, moving to svenskalag.bk50.se; change it only here), `club(path)` for links into it, `CLUB_HOST` for display, and `LINKS` (sign-up form, Svenskalag app/store links, Instagram, fees, e-mail)
- `src/pages/Index.tsx` - Composes the sections: `Nav`, `Hero`, `Offer`, `GetStarted`, `Teams`, `Ambition`, `Svenskalag`, `Shop`, `Engage`, `News`, `Instagram`, `Sponsors`, `History`, `Footer`
- `src/components/Nav.tsx` - `ITEMS` in the bar, `CLUB_ITEMS` under the "Klubben" dropdown (a section under "Klubben" on mobile)
- `src/components/Svenskalag.tsx` - All club info lives on Svenskalag: register in the club first, then the app (official App Store/Google Play badges in `public/badges/`, linked via svenskalag.se/app/ios|android)
- `src/components/Shop.tsx` - Mid-page banner for the club shop at 2win.se (`LINKS.shop`); `PRODUCTS` photos copied by hand into `public/shop/`, no prices so they can't go stale
- `src/components/Teams.tsx` - `TEAMS` (name, svenskalag URL, group, birth years) grouped by `GROUPS`; a birth-year `<select>` dims teams that don't match
- `src/components/News.tsx` - The 3 latest posts from the bk50.se RSS feed, fetched client-side from `/nyheter.xml`. The feed (www.svenskalag.se/rss/82814, independent of the club's domain) has no CORS header, so nginx proxies and caches it (`configure-nginx.sh`) and `vite.config.ts` proxies it in dev/preview; if it fails, only the "Alla nyheter" link shows
- `src/components/Instagram.tsx` - Instagram can't be scraped, so `PHOTOS` is filled by hand from `public/instagram/`; empty shows placeholder tiles
- `src/components/Ambition.tsx` - "Satsa på basket": commit from 15–16, before that own pace with friends; the qualifying teams P11 (Pojkar 2011 vit) and Damer utveckling where anyone may try out
- `src/components/Engage.tsx` - `ROLES` the club is recruiting volunteers for (ledare, foto & film, open court-värd); each CTA mails info@ with a role-specific subject
- `src/components/Sponsors.tsx` - `SPONSORS` logos from `public/sponsors/` (`url` optional), a pitch for new sponsors (mails info@ with a subject), plus stödmedlem/Pantamera links
- `src/components/Reveal.tsx` - Fade-in-on-scroll wrapper, respects reduced motion
- `src/pages/NotFound.tsx` - "Airball!" 404

Facts (team names, birth years, fees, halls, history) come from www.bk50.se; check there before changing them.

### Styling

- Tailwind palette: `wine.*` (club red `#9b2d40` from the logo), `ball` (orange accent), `cream`, `ink`
- Fonts: `font-sans` (Inter) and `font-display` (Bricolage Grotesque), loaded from Google Fonts in `src/index.css`
- Shared component classes in `src/index.css`: `container-page`, `eyebrow`, `section-title`, `btn`, `btn-primary`, `btn-ghost`, `court-bg`
- `prefers-reduced-motion` disables animations

### Path Aliases

`@/` maps to `src/` (configured in vite.config.ts and tsconfig.json)

## Conventions

- All content is hardcoded in components as small arrays/constants at the top of each file
- Mobile-first responsive design using Tailwind breakpoints (`md:` = 768px)
- Components are self-contained; shared links live in `src/links.ts`
- Site text is Swedish
