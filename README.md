# Brassworks website

The Brassworks website implemented with React and TanStack Start. The original
Vue header and hero carousel have been ported to React while preserving their
layout, video crossfade, progress display, pause behavior and external links.

## Local development

```bash
npm install
npm run dev
```

The development server runs at <http://localhost:3000>.

## Checks and production build

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Preview the production build with:

```bash
npm run preview
```

## Project structure

- `src/routes/index.tsx` composes the home page.
- `src/components/general/Header.tsx` contains the site header.
- `src/components/general/HeroSection.tsx` contains the interactive hero.
- `src/styles.css` contains global and hero-specific styles.
- `public/` contains fonts, images and the background video.

Set `VITE_ASSET_BASE_URL` when public assets are hosted under a different base
URL. Without it, assets are served from this application.
