# AGENTS.md

## Project

- Next.js 16 static export (React 19, TypeScript, Tailwind v4) for Clínica Cialo.
- Output goes to `out/`; no SSR, no Next.js API routes.
- Package manager: pnpm (single-package workspace; `pnpm-workspace.yaml`).

## Monorepo layout

- `app/` — Next.js App Router. ~90 `page.tsx` files, mostly static treatment landings plus shared components under `app/components/`.
- `src/data/` — Source of truth for static TypeScript data (tratamientos, productos, profesionales, blog, consultas, categorias, tecnologias, faqs-tratamientos). Root `data/` is not tracked.
- `src/lib/` — Zustand stores, API client, types, recommendation logic.
- `public/` — Static assets. Images are often external (CDN/Unsplash) or processed with scripts.
- `api/` — **The production backend.** Plain PHP (no framework) serving all of `api.cialo.cl`: Reservo booking endpoints (`/reservo/*`), orders, auth, Transbank, coupons, affiliates, commissions, gift cards, reports. Deployed by FTP to `/api.cialo.cl` (NOT `/public_html`); `api/config/config.php` holds production secrets and is gitignored — never upload the repo copy. See `api/DEPLOY_AGENDAMIENTO.md`.
- `backend/` — Unfinished Laravel 11 + Filament migration of the API. **Not deployed anywhere** (no `backend` folder on the server); do not treat it as production code.
- `astro-cialo/` — Separate Astro experiment; excluded from `tsconfig.json`.

## Commands

```bash
# Dev / verification
pnpm dev                 # localhost:3000
pnpm lint                # ESLint only; no tests or typecheck script exist

# Frontend build / deploy
pnpm build               # static export to out/
pnpm optimize            # rewrite blog/large images in place; creates .original backups
pnpm predeploy           # npm run optimize && npm run build
pnpm zip-changes         # delta ZIP vs scripts/baseline-hashes.json (needs out/)
pnpm zip-changes --init  # initialize baseline hashes
pnpm zip-changes --commit # update baseline after manual deploy
pnpm deploy:ftp          # full manual FTP deploy (reads .env.local)
```

## Deployment

All deploys are **manual via FTP from this machine**. GitHub (`xaulosky/web-clinicaCialo`) is only for version control: there are no GitHub Actions and pushing to `master` deploys nothing.

- **Frontend**: `pnpm deploy:ftp` (credentials in `.env.local`, copied from `.env.example`). It runs `pnpm build`, zips `out/` into `deploy-artifacts/build-cialo.zip`, uploads it + `scripts/unzip.php` to `216.246.47.183/public_html`, then hits `https://cialo.cl/unzip.php`. `SKIP_BUILD=1` reuses an existing `out/`.
- The PHP extractor atomically swaps `_next/` and merges page files; raw `out/` is never uploaded. It never deletes pages that no longer exist in the build.
- **API**: upload changed files from `api/` to `/api.cialo.cl` by FTP (never `config/config.php`). There is no script for it yet.
- Commit and push to GitHub after each deploy so the repo matches production.
- `.env*` files are gitignored.

## Config & conventions

- `next.config.ts`: `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`, experimental view transitions.
- Path aliases (`tsconfig.json`): `@/app/*` → `./app/*`, `@/data/*` → `./src/data/*`, `@/lib/*` → `./src/lib/*`.
- Tailwind v4 is configured purely in CSS (`app/globals.css`) with `@theme inline`; no `tailwind.config`.
- Fonts are loaded via `next/font/google` in `app/layout.tsx`: Italiana, Poppins, Comfortaa.
- No Next.js middleware; no test framework.

## API & auth

- Frontend API base: `process.env.NEXT_PUBLIC_API_URL || 'https://api.cialo.cl'` (`src/lib/api.ts`).
- `api.cialo.cl` is served entirely by `api/` (plain PHP).
- JWT tokens stored in `localStorage`: `auth_token` for users, `adminToken` for the frontend admin panel.
- Admin UI: Next.js `/admin/` — order/coupon/affiliate/commission management (client-side guard in `app/admin/AdminShell.tsx`; `app/admin/layout.tsx` only sets `noindex` metadata). The Laravel Filament admin in `backend/` is not deployed.

## Image workflow

- Professional photos: drop WebP/JPG/PNG into `public/profesionales/`, then `node scripts/create-thumbnails.js` to generate `public/profesionales/thumb/`.
- After `pnpm optimize`, re-run `pnpm build` to validate final asset sizes.
- Utility scripts: `scripts/export-kata.ts` (treatment CSV export), `scripts/update_tratamientos.js` (bulk update from CSV).

## Gotchas

- `pnpm zip-changes` requires `out/`; if `_next/` changed it includes the whole folder to avoid missing hashed assets.
- `create-deploy-zip.js` skips public media by default; set `DEPLOY_INCLUDE_PUBLIC_MEDIA=1` to include it.
- On Git Bash, set `MSYS_NO_PATHCONV=1` when passing remote FTP paths like `/api.cialo.cl` to node scripts, or they get rewritten to Windows paths.
- `astro-cialo/` is excluded from `tsconfig.json`; edits there do not affect the Next.js build.
