# BK50 web

A one-page site for [BK50, Basketklubben Lund 1950](https://www.bk50.se/), aimed at
new players: what the club offers, how to get started, every team with a link to
its page on the club's svenskalag.se site, a link to the sign-up form, the club's
history and its Instagram.

## Development

Requires Node.js 18 or newer.

```bash
npm install
npm run dev        # http://localhost:8080
npm run build      # production build in dist/
npm run preview    # serve the production build on http://localhost:4173
```

All content is hardcoded in the components, so editing the site means editing
these files:

| File | Section |
|---|---|
| `src/links.ts` | Sign-up form, Instagram, Facebook, e-mail and other shared links |
| `src/components/Hero.tsx` | Top of the page |
| `src/components/Offer.tsx` | "Därför BK50": key numbers and what we offer |
| `src/components/GetStarted.tsx` | "Kom igång" in three steps |
| `src/components/Teams.tsx` | All teams, their links, and the birth-year finder |
| `src/components/History.tsx` | Timeline since 1950 |
| `src/components/Instagram.tsx` | Instagram grid (`PHOTOS` takes images from `public/instagram/`) |
| `src/components/Footer.tsx` | Contact, halls and more links |
| `src/pages/NotFound.tsx` | "Airball!" 404 page |

Colours and fonts live in `tailwind.config.ts` and `src/index.css`.

## Deployment

The site is static: nginx serves the contents of `dist/` from
`/var/www/$(DOMAIN)`. The Makefile defaults to `DOMAIN=localhost`, so pass your
real domain to every target:

```bash
make help    # list all targets
```

### First-time server setup (Ubuntu)

On the server, from a clone of this repo:

```bash
make setup                                      # nginx, certbot, make
make obtain-ssl DOMAIN=yanct.com EMAIL=info@yanct.com
make build
make configure-nginx DOMAIN=yanct.com           # copy dist/ and write the nginx config
```

`make setup` installs Node.js from apt, which is too old on many Ubuntu
releases. Install a current version with [nvm](https://github.com/nvm-sh/nvm)
(`nvm install --lts`) if `node -v` shows anything below 18.

`configure-nginx` writes both the HTTP and HTTPS server blocks, so the SSL
certificate has to exist before running it. Re-run it after changing
`configure-nginx.sh`.

To renew the certificate:

```bash
make renew-ssl DOMAIN=yanct.com
```

### Updating the site

Either build locally and copy `dist/` to the server over SSH:

```bash
make publish HOST=root@yanct.com DOMAIN=yanct.com
```

or, on the server itself:

```bash
git pull && make build && sudo rsync -a --delete dist/ /var/www/yanct.com/
```

## Tech

Vite, React, TypeScript, Tailwind CSS and Framer Motion, served by nginx with
Let's Encrypt certificates via certbot.
