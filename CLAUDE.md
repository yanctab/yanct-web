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

A **Swedish one-page site** for the basketball club BK50 (Basketklubben Lund 1950), built with React + Vite + Tailwind + Framer Motion. It pitches the club to new players and links out to the club's svenskalag.se pages (www.bk50.se) for teams and sign-up. Navigation within a page is anchor-based. There is no router: `App.tsx` picks the page from the path in `PAGES` and renders the 404 page for any other path:

- `/` - `src/pages/Welcome.tsx`, a neutral pitch for the club and a choice: Förälder, Spelare (12 år och uppåt), Ledare. `src/components/WelcomeNav.tsx` is its menu (the four pages, then the sections in page order: Sponsorer, Klubbshop, Nyheter, Följ oss, and last Svenskalag). Below the choice what's for everyone: `Sponsors`, `Shop`, `News` and `Instagram` (from `src/components/`)
- `/foralder` - `src/pages/Foralder.tsx`, the full page for parents (the sections below, in `src/components/`)
- `/spelare` - `src/pages/Spelare.tsx`, a dark, plain-spoken page for players, components in `src/spelare/` (from the `bk50-alt2` branch). It uses its own prefixed classes (`s-eyebrow`, `s-title`, `s-btn*`, `font-poster` = Anton, `night` colours) so it never clashes with the parent page's styles. `src/spelare/Engage.tsx` recruits players as assistant leaders and referees; questions go to mikael@bk50.se
- `/ledare` - `src/pages/Ledare.tsx`, a hero with links to the leaders' group, education and values, `LEVELS` for those who want to become leaders (Easy Basket 7–11 with no score kept, series U13–U18, satsningslag from 15 with try-outs; how much experience a leader needs at each), the tools (Svenskalag: team page, news, calendar, call-ups answered in the app; WhatsApp in the green theme: the team's group and the BK50 community, joined via `COMMUNITY_MAIL`), then the leaders' meetings as a year timeline (`MEETINGS`: compulsory meetings in person in January and August, where the August one also decides the club's cups, and online check-ins in March and October), and `MEETUPS`: a monthly informal get-together in Fäladshallen or ISLK and clinics leaders can offer. Each month's get-together is an activity in the leaders' group on Svenskalag (`LINKS.leaders`): leaders reply there and offer a clinic in a comment; and After Basket, the leaders' after work on a Friday (with a training in Fäladshallen or ISLK, then something social), also an activity to reply to on Svenskalag
- `/styrelse` - `src/pages/Styrelse.tsx`, the board: how it works (principles and `MEETINGS`, the half-year plan as a year timeline: a planning meeting at the start of each term, an online check-in mid-term and an online follow-up at the end), the members, how to mail styrelse@bk50.se (subject must start with `Förslag:`, `Fråga:` or `Workshop:`), the workshop concept (first join the BK50 WhatsApp community and post the idea in its Workshop chat to find others; the invite link is never published) `DONE`, what the board has decided and carried out since the last meeting (`LAST_MEETING`, from the minutes in `basket/styrelse/2026/möten/` and `register.json`), and `ISSUES`, proposals in the board's queue (shown as proposals only, not as items for a given meeting). Sources are `basket/dokument/styrelsen/`, `basket/dokument/workshop/` and `basket/styrelse/inkommet/`; update `DONE`, `LAST_MEETING`, `ISSUES`, `NEXT_MEETING` and `UPDATED` after each board meeting, and never publish restricted issues (personnel, finances) or personal e-mail addresses. Linked from the welcome page under "Redan med i klubben?" and from `WelcomeNav`

New paths must be added both to `PAGES` and to the `location ~ ^/(foralder|spelare|ledare|styrelse)/?$` block in `configure-nginx.sh`, or nginx serves them with a 404 status.

### Key Files

- `src/links.ts` - Links to the club's Svenskalag site go via svenskalag.se, which forwards to whatever domain the club has set there (www.bk50.se today), so they survive a domain change: `club(path)` for club pages (`svenskalag.se/bk50/...`; `lugibbk` is the old slug), `team(slug)` for team/group pages (top level, e.g. `svenskalag.se/bk50-flickor2013`), `doc(path)` for uploaded documents (`svenskalag.se/bk50/dokument/<id>/<file>.pdf`). Link texts say "BK50 Svenskalag" / "BK50 lag", never a domain. `LINKS` holds the shared ones (sign-up form, Svenskalag app/store links, Instagram, fees, e-mail)
- `src/pages/Foralder.tsx` - Composes the sections: `Nav`, `Hero`, `Offer`, `GetStarted`, `Teams`, `SignUp`, `Svenskalag`, `Parents`, `Ambition`, `Engage`, `History`, `Footer` (leaders have their own page, `/ledare`; news, shop, Instagram and sponsors are on the welcome page)
- `src/components/Nav.tsx` - `ITEMS` in the bar, `CLUB_ITEMS` under the "Klubben" dropdown (a section under "Klubben" on mobile); "Ledare" goes to `/ledare`
- `src/components/GetStarted.tsx` - "Kom igång": the joining process in four steps (find a team → sign up → welcome e-mail and Svenskalag login → the team's WhatsApp group), each linking to where it's explained; `Teams`, `SignUp` ("Redo att testa?", `#anmalan`) and `Svenskalag` follow it and are labelled "Steg 1", "Steg 2" and "Steg 3"
- `src/components/Svenskalag.tsx` - All club info lives on Svenskalag; getting started (welcome e-mail, change password, app with official badges in `public/badges/`), then step 4, the team's WhatsApp group (`#whatsapp`). Invite links are never published on the site: teams share them with registered members only
- `src/components/Parents.tsx` - "För föräldrar": `DOCS`, PDFs on Svenskalag (guide for parents, sekretariat, kiosk, baking for the kiosk). Term-specific files like the kiosk instruction get new names, so check the links each term
- `src/components/Shop.tsx` - Mid-page banner for the club shop at 2win.se (`LINKS.shop`); `PRODUCTS` photos copied by hand into `public/shop/`, no prices so they can't go stale
- `src/components/Teams.tsx` - `TEAMS` (name, `team()` URL, group, birth years) grouped by `GROUPS`; a birth-year `<select>` dims teams that don't match
- `src/components/News.tsx` - The 3 latest posts from the bk50.se RSS feed, fetched client-side from `/nyheter.xml`. The feed (www.svenskalag.se/rss/82814, independent of the club's domain) has no CORS header, so nginx proxies and caches it (`configure-nginx.sh`) and `vite.config.ts` proxies it in dev/preview; if it fails, only the "Alla nyheter" link shows
- `src/components/Instagram.tsx` - Instagram can't be scraped, so `PHOTOS` is filled by hand from `public/instagram/`; empty shows placeholder tiles
- `src/components/Ambition.tsx` - "Satsa på basket": commit from 15–16, before that own pace with friends; the qualifying teams Män utveckling (the P11 team, Pojkar 2011 vit, on Svenskalag) and Damer utveckling where anyone may try out
- `src/components/Engage.tsx` - `ROLES` the club is recruiting volunteers for (lagförälder, ledare, foto & film, open court-värd); each CTA mails info@ with a role-specific subject, except lagförälder, which mails the secretary at styrelse@ (`boardMail`). Then the BK50 WhatsApp community (join by mailing the secretary, `COMMUNITY_MAIL`) and a link to the workshop concept on `/styrelse`
- `src/sponsors.ts` - `SPONSORS` logos from `public/sponsors/` (`url` optional), shown in full on the welcome page and as a logo strip in the footers of `/foralder` and `/spelare`
- `src/components/Sponsors.tsx` - The sponsor logos, a pitch for new sponsors (mails info@ with a subject), plus stödmedlem/Pantamera links
- `src/components/Reveal.tsx` - Fade-in-on-scroll wrapper, respects reduced motion
- `src/components/DraftBanner.tsx` - Banner at the bottom of every page (rendered in `App.tsx`): the site is a proposal for evaluation and a shared vision, nothing is decided. Closable for the visit; links to styrelse@bk50.se. Remove it when the board has decided on the site
- `src/components/PageNav.tsx` - The menu on `/ledare` and `/styrelse`, styled like `WelcomeNav` (transparent over the wine hero, solid on scroll, a panel on mobile), given the page's `items` and a `cta` button
- `src/components/YearTimeline.tsx` - A year of meetings as a timeline (horizontal on desktop, vertical on mobile), given `meetings` (month, kind, text) and `kinds` (legend, tag, colours). Used on `/styrelse` and `/ledare`
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
