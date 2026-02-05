[![Board Status](https://dev.azure.com/Gemassist/56762fd0-29ad-4c8b-a303-e6601fa9b688/ad1fffbe-8f60-4003-990a-b6983ff1e123/_apis/work/boardbadge/2728d809-c76b-47e8-bdea-ca54bb1bcd15)](https://dev.azure.com/Gemassist/56762fd0-29ad-4c8b-a303-e6601fa9b688/_boards/board/t/ad1fffbe-8f60-4003-990a-b6983ff1e123/Microsoft.RequirementCategory)

# GEM Cybersecurity Website

Next.js 16 App Router marketing + admin experience for GEM Cybersecurity.

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables (recommended `.env.local`):

```bash
ADMIN_AUTH_SECRET=replace-with-a-secure-secret
SUPER_ADMIN_PASSWORD=replace-super-admin-password
ADMIN_PASSWORD=replace-admin-password
ANALYST_PASSWORD=replace-analyst-password
SMTP_USER=
SMTP_PASS=
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

3. Start development server:

```bash
npm run dev
```

4. Open:
- Public site: `http://localhost:3000`
- Admin sign-in: `http://localhost:3000/admin/login`

## Admin credentials and roles

On first run, `data/admin-users.json` is generated with users for:

- `superadmin@gem.local` (`super_admin`)
- `admin@gem.local` (`admin`)
- `analyst@gem.local` (`analyst`)

Passwords come from env vars above (or default `change-me-*` fallbacks for local setup only).

## Test and quality checks

```bash
npm run lint
npm run build
```

## Admin Center routes

Protected routes are guarded by `src/proxy.ts` and signed session cookies:

- `/admin/inbox` — inbound message triage, assignment, CSV export
- `/admin/teams`
- `/admin/organizations`
- `/admin/grants`
- `/admin/diagnostics`
- `/admin/users` (super admin)

## Deployment

This project deploys cleanly on Vercel and other Node-compatible hosts.

- Build command: `npm run build`
- Start command: `npm run start`
- Persisted inbox data currently uses `data/contact-messages.json`; in production, migrate to a managed database or object storage for durability.

## Remaining nice-to-have checklist

- [ ] Replace file-based message and user stores with Postgres (Prisma/Drizzle) + migrations.
- [ ] Add pagination and bulk actions to `/admin/inbox`.
- [ ] Add audit log entries for admin status/assignment changes.
- [ ] Add automated tests for admin API and route protection.
- [ ] Add per-route permission checks for admin, analyst, and auditor roles.
