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
- `backend/` — Laravel 11 API + Filament admin. Auto-deployed when `backend/**` changes on `master`.
- `api/` — Custom PHP API serving `api.cialo.cl`: Reservo booking endpoints (`/reservo/*`), orders, Transbank, coupons, affiliates, reports. This is the API that production actually runs; `backend/` (Laravel) has no `/reservo/*` routes. Deployed by FTP to `/api.cialo.cl` (NOT `/public_html`); `api/config/config.php` holds production secrets and is gitignored — never upload the repo copy. See `api/DEPLOY_AGENDAMIENTO.md`.
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

Backend commands are in `backend/README.md`.

## Deployment

- **Frontend auto-deploy** (push to `master`): `.github/workflows/deploy.yml` runs `pnpm install --frozen-lockfile` → `pnpm build`, uploads `deploy-artifacts/build-cialo.zip` + `scripts/unzip.php` via FTP to `216.246.47.183/public_html`, then hits `https://cialo.cl/unzip.php`.
- The PHP extractor atomically swaps `_next/` and merges page files; raw `out/` is never uploaded.
- **Backend auto-deploy** (push to `master` with changes under `backend/**`): `.github/workflows/backend-deploy.yml` builds the Laravel app, uploads `backend-deploy.zip` + `.github/deploy-scripts/deploy-backend.php`, and executes it at `https://cialo.cl/deploy-backend.php`.
- **Manual frontend deploy**: copy `.env.example` → `.env.local`, fill FTP credentials, run `pnpm deploy:ftp`.
- `.env*` files are gitignored; production env vars live on the deployment platform.

## Config & conventions

- `next.config.ts`: `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`, experimental view transitions.
- Path aliases (`tsconfig.json`): `@/app/*` → `./app/*`, `@/data/*` → `./src/data/*`, `@/lib/*` → `./src/lib/*`.
- Tailwind v4 is configured purely in CSS (`app/globals.css`) with `@theme inline`; no `tailwind.config`.
- Fonts are loaded via `next/font/google` in `app/layout.tsx`: Italiana, Poppins, Comfortaa.
- No Next.js middleware; no test framework.

## API & auth

- Frontend API base: `process.env.NEXT_PUBLIC_API_URL || 'https://api.cialo.cl'` (`src/lib/api.ts`).
- `api.cialo.cl` is served by `backend/` (Laravel) for orders, auth, coupons, affiliates, commissions.
- Reservo booking endpoints (`/reservo/*`) are still served by legacy `api/`.
- JWT / Sanctum tokens stored in `localStorage`: `auth_token` for users, `adminToken` for the frontend admin panel.
- Two admin UIs exist:
  - Next.js `/admin/` — frontend order/coupon/affiliate/commission management (client-side guard in `app/admin/layout.tsx`).
  - Laravel Filament at `https://api.cialo.cl/admin` — backend admin (see `backend/README.md`).

## Image workflow

- Professional photos: drop WebP/JPG/PNG into `public/profesionales/`, then `node scripts/create-thumbnails.js` to generate `public/profesionales/thumb/`.
- After `pnpm optimize`, re-run `pnpm build` to validate final asset sizes.
- Utility scripts: `scripts/export-kata.ts` (treatment CSV export), `scripts/update_tratamientos.js` (bulk update from CSV).

## Gotchas

- `pnpm zip-changes` requires `out/`; if `_next/` changed it includes the whole folder to avoid missing hashed assets.
- `create-deploy-zip.js` skips public media by default; set `DEPLOY_INCLUDE_PUBLIC_MEDIA=1` to include it.
- `api/deploy-ftp.ps1` contains hardcoded FTP credentials — treat as sensitive and do not expose further.
- `astro-cialo/` is excluded from `tsconfig.json`; edits there do not affect the Next.js build.
