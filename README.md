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
ADMIN_ACCESS_TOKEN=replace-with-a-secure-token
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

## Test and quality checks

```bash
npm run lint
npm run build
```

## Admin Center routes

Protected routes are guarded by `middleware.ts` and session cookie auth:

- `/admin/inbox` — inbound message triage, assignment, CSV export
- `/admin/teams`
- `/admin/organizations`
- `/admin/grants`
- `/admin/diagnostics`


## Project background handoff for developer agents

Architecture and project-context handoff files are available in:

- `docs/project-background/01-project-context.md`
- `docs/project-background/02-system-architecture.md`
- `docs/project-background/03-route-and-feature-inventory.md`
- `docs/project-background/04-data-config-and-ops.md`
- `docs/project-background/05-discussion-derived-decisions.md`
- `docs/project-background/06-visual-reference-architecture-from-screens.md` (captures architecture-relevant requirements from provided UI image references)
- `docs/project-background/07-professional-reference-architecture.md` (deep research-informed enterprise architecture guidance)

## Deployment

This project deploys cleanly on Vercel and other Node-compatible hosts.

- Build command: `npm run build`
- Start command: `npm run start`
- Persisted inbox data currently uses `data/contact-messages.json`; in production, migrate to a managed database or object storage for durability.

## Remaining nice-to-have checklist

- [ ] Replace file-based message store with Postgres (Prisma/Drizzle) + migrations.
- [ ] Add pagination and bulk actions to `/admin/inbox`.
- [ ] Add audit log entries for admin status/assignment changes.
- [ ] Add automated tests for admin API and route protection.
- [ ] Add role-based UI controls beyond shared admin token auth.
