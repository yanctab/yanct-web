# yanct-web

The one-page website for [Yanct](https://yanct.com), embedded Linux consulting:
Yocto, BSPs, CI and helping teams move from bare metal to Linux.

The page is styled like a terminal on a booting device: a boot-log hero, a
product stack you build layer by layer from `while(1)` to Linux, `lsmod`-style
skills, `dmesg` testimonials and a kernel-panic 404.

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
| `src/components/BootHero.tsx` | Boot log and hero |
| `src/components/Journey.tsx` | "From while(1) to Linux" layers and product stack |
| `src/components/HowIWork.tsx` | How we'd work together |
| `src/components/Toolbox.tsx` | Loaded modules (skills) |
| `src/components/Testimonials.tsx` | What the logs say |
| `src/components/Team.tsx` | Meet the entire team |
| `src/components/Contact.tsx` | Contact |
| `src/pages/NotFound.tsx` | Kernel-panic 404 page |

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
