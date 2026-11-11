# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Pediatric analgosedation scales app (Spanish UI, `lang="es"`): interactive calculators for pain (FLACC, OPS, Numérica, Caritas), sedation, delirium (CAPD, CAM-ICU), withdrawal (abstinencia), RASS and Glasgow. Based on a published research project (medicinainfantil.org.ar, 2024 vol. XXXI nº 4). Deployed as a static site on Cloudflare Workers (Static Assets, no Worker script) and installable as a PWA.

Clinical content (criteria, scores, cut-offs, interpretations) is medical data — do not alter values or wording unless explicitly asked.

## Commands

- `npm run dev` — dev server at `localhost:4321`
- `npm run build` — static build to `./dist/` (also generates the service worker)
- `npm run preview` — serve the production build (use this to test PWA/service-worker behavior)
- `npm run cf:dev` — build and serve `dist/` with Wrangler locally (Cloudflare routing/headers)
- `npm run deploy` — build and `wrangler deploy` (requires `npx wrangler login` once)
- `npm run astro -- check` — type/diagnostic check

There is no test suite or linter configured.

## Architecture

Astro 5 (static output) + Preact islands + Tailwind CSS v4 (via `@tailwindcss/vite`; `src/styles/global.css` only contains `@import "tailwindcss"`, no tailwind config file).

- **Pages** (`src/pages/*.astro`): file-based routes. Each scale page is a thin wrapper: `<Layout><EscalaX client:load /></Layout>`. Hub/landing pages (`home.astro`, `escala-dolor.astro`, `otras-escalas.astro`, legal pages) are mostly static Astro markup. `index.astro` renders `home.astro` as a component (so `/home` is also a route).
- **Scale components** (`src/components/Escala*.jsx`): each is a self-contained Preact component (300–650 lines) holding its own criteria definitions as a local object (e.g. `criteriosFLACC`), `useState` for selected scores, total-score computation, interpretation/recommendation, a reset button, and a print button (`window.print()`). There is no shared scale abstraction — new scales follow the same pattern by copying an existing component. No persistence (no localStorage/backend).
- **Layout** (`src/layouts/Layout.astro`): shared `<head>` (SEO/OG meta, manifest link, Google AdSense script), the `Sidebar` island (nav, mobile hamburger, `InstallButton`), `FlechaScrollTop`, and `Footer`. Navigation links live in `Sidebar.jsx` and in the hub pages/`MenuOtrasEscalas.jsx` — update these when adding a scale page.
- **Icons** (`src/icons/*.jsx`): hand-written Tabler-style SVG components with `size`/`className`/`stroke` props. `@tabler/icons-preact` is also installed.
- **SweetAlert2** is used from an inline `<script>` in `home.astro` for "Próximamente" alerts on elements with `data-alert="proximamente"`.

## Deployment (Cloudflare Workers)

- `wrangler.jsonc` only declares `assets.directory: ./dist` — there is no Worker script and no `@astrojs/cloudflare` adapter, because the site is fully static. If SSR/API routes are ever added, the adapter becomes necessary.
- `build.format: "file"` in `astro.config.mjs` emits `ruta.html` so Cloudflare serves `/ruta` without a trailing-slash redirect; internal links use no trailing slash.
- `public/_headers` (Cloudflare format) sets `no-cache` on the service worker/manifest and immutable caching on `/_astro/*`.
- `site` in `astro.config.mjs` is the single source for canonical/OG URLs in `Layout.astro`.

## PWA

Configured via `@vite-pwa/astro` in `astro.config.mjs` (`registerType: "autoUpdate"`, workbox precache of js/css/html/svg/png/ico/webp/json). Note there is also a hand-written `public/manifest.webmanifest.json` linked from `Layout.astro`; keep both in sync when changing manifest fields. `InstallButton.jsx` handles `beforeinstallprompt`; `IOSNotice.jsx` shows install instructions on iOS.

`public/ads.txt` and the AdSense script in the layout are required for ads — don't remove them.

## Conventions

- JSX uses Preact (`jsxImportSource: "preact"`); hooks import from `preact/hooks`. Components mix `className` and `class` — both work in Preact.
- Code, identifiers, comments and UI text are in Spanish.
