<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know
This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AirTrackMP Frontend

## Stack
- Next.js 16.2.6 (App Router, proxy replaces middleware) — read `node_modules/next/dist/docs/` before coding
- React 19, Tailwind CSS v4, shadcn/ui
- maplibre-gl (free Carto basemaps, no API key needed)
- Auth.js v5 (next-auth beta) with Credentials (JWT strategy)

## Commands
```sh
npm run dev       # next dev (Turbopack)
npm run build     # next build (includes typecheck)
npm run start     # next start (production server)
npm run lint      # eslint
```

## Architecture

### Route protection (`src/proxy.ts`)
Uses Next.js 16 `proxy` export (not `middleware` — that's deprecated). Exports `auth` from NextAuth. Matcher excludes `api/auth`, `_next/static`, assets, favicon.

### Auth flow (`src/auth.ts`)
- `POST {backend}/api/auth/login` with `{email, password}` → returns JWT token
- Token decoded client-side for `role` (from JWT `sub` and `role` claims)
- NextAuth stores token in session cookie, `TokenSync` component copies it to the `auth-token.ts` singleton
- `src/lib/auth-token.ts`: `getApiToken()` / `setApiToken()` — singleton for non-React providers
- Backend login returns **500** (not 401) for bad credentials — `authorize()` returns null, Auth.js throws `CredentialsSignin`

### Route structure
- `src/app/(dashboard)/` — route group wrapping protected pages (wraps children in `<AppLayout>`)
- `src/app/login/` — outside route group, no AppLayout

### Provider pattern (`src/lib/config.ts`)
All data sources use a mock/api switch via `src/lib/config.ts`:
```
alerts, metrics, map  → 'api' (default)
others                → 'mock'
```
Each provider follows: `provider.ts` (interface + factory) → `api.ts` + `mock.ts` → `index.ts` (re-exports).

### Map provider (`src/lib/providers/map/`)
Uses **public** `GET /api/measurements` (not `/api/nodes` which requires ADMIN). Extracts unique nodes with latest measurement. Status computed from PM2.5/PM10 thresholds. Default center: Barranquilla (`[-74.7813, 10.9685]`, zoom 11).

### Alerts provider (`src/lib/providers/alerts/`)
Uses `GET /api/alert` with Bearer token from `auth-token.ts`. Returns `[]` if no token available.

### Auth token sync (`src/components/auth/`)
- `SessionProvider`: wraps `NextAuthSessionProvider` + `<TokenSync />`
- `TokenSync`: reads `session.apiToken` → writes to `auth-token.ts` singleton

### Hooks
- `src/hooks/providers/useAlerts.ts`, `useMetrics.ts`, `useMapNodes.ts`, `usePredictions.ts`, `useAnalytics.ts` — consume providers via `createXxxProvider()` inside `useMemo`, fetch in `useEffect`

### Loading states (`src/components/ui/skeleton.tsx`)
- Uses shadcn `<Skeleton>` component (`animate-pulse` + `rounded-md bg-muted`)
- Every data component has a dedicated skeleton in its `if (loading)` branch matching the real layout
- Route-level `loading.tsx` files in each segment (`dashboard/`, `network/`, `analytics/`, `forecasting/`, `alerts/`, `login/`) — render inside AppLayout with full-page skeletons using the same grid structure as the page

### Error system (`src/lib/error-handler.ts`)
- Uses **sonner** (shadcn wrapper) for toast notifications
- `<Toaster />` rendered in `src/app/layout.tsx` (inside body, after SessionProvider)
- Every data hook shows a toast on `catch` via `showErrorToast(err, fallbackMsg)`
- Available helpers: `showErrorToast`, `showNetworkError`, `showAuthError`, `showApiError`, `showSuccess`, `showInfo`

## Backend API
- URL: `https://airtrackmp-backend.onrender.com` (set in `.env`)
- `docs/API_DOCUMENTATION.md` for full reference
- Public endpoints: `/api/measurements`, `/api/measurements/node/{id}/latest`
- Auth-required: `/api/alert`, `/api/nodes` (ADMIN), `/api/user`
- Register: `POST /api/auth/register` with `{name, email, password, role}`
- Test admin: `admin@airtrackmp.com` / `Admin123!`

## Known quirks
- Backend returns 500 instead of 401 for invalid credentials
- Some POST `/api/alert` calls fail with 500 for certain `type` values (backend bug)
- `AUTH_URL` in `.env` points to `http://localhost:3000` — update if dev server uses a different port
- No test framework configured yet
