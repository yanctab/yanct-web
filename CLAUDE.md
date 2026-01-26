# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server on http://localhost:8080
npm run build        # Production build to dist/
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

**Makefile targets** (for deployment):
```bash
make build           # npm install + npm run build
make preview         # Build and serve preview
make deploy          # Full deployment: setup + build + configure nginx
make obtain-ssl      # Get SSL cert via certbot
```

## Architecture Overview

This is a **single-page portfolio website** built with React + Vite + shadcn/ui. Navigation is scroll-based, not route-based.

### Key Files

- `src/App.tsx` - Root component with React Query provider and minimal routing (/ and 404 only)
- `src/pages/Index.tsx` - Main page that composes all portfolio sections
- `src/components/` - Business components (Hero, About, Expertise, Services, Testimonials, Connect, Footer)
- `src/components/ui/` - shadcn/ui component library (40+ components)
- `src/hooks/use-mobile.tsx` - Responsive breakpoint hook (768px threshold)

### Navigation Pattern

Uses scroll-based navigation with element IDs as anchors:
```tsx
document.getElementById('services').scrollIntoView({ behavior: 'smooth' })
```

The `VerticalLine` component creates visual connectors between sections, calculating positions dynamically via `getBoundingClientRect()`.

### Styling

- Tailwind CSS with custom brand colors defined in `tailwind.config.ts`
- Primary brand color: `#30586D` (brand-blue)
- Custom fonts: `font-typewriter` (Courier New), `font-signature` (Dancing Script)
- Dark mode support via class strategy

### Path Aliases

`@/` maps to `src/` (configured in vite.config.ts and tsconfig.json)

```tsx
import { Button } from "@/components/ui/button"
```

## Conventions

- All content is hardcoded in components (no API calls despite React Query being available)
- Mobile-first responsive design using Tailwind breakpoints and `useIsMobile()` hook
- Components are self-contained with minimal prop drilling
