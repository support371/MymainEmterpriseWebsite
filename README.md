[![Board Status](https://dev.azure.com/Gemassist/56762fd0-29ad-4c8b-a303-e6601fa9b688/ad1fffbe-8f60-4003-990a-b6983ff1e123/_apis/work/boardbadge/2728d809-c76b-47e8-bdea-ca54bb1bcd15)](https://dev.azure.com/Gemassist/56762fd0-29ad-4c8b-a303-e6601fa9b688/_boards/board/t/ad1fffbe-8f60-4003-990a-b6983ff1e123/Microsoft.RequirementCategory)

# GEM CYBER Enterprise Platform

Next.js 16 App Router experience with:

- One-page enterprise marketing surface (`/`) with anchored sections.
- Intelligence Command Center (`/intelligence`).
- Email Campaign Engine UI shell (`/campaigns`).
- Architecture/specification route (`/specs`).
- Admin center with role-based auth (`/admin/*`).

## Local development

1. Install dependencies:

```bash
npm install
```

2. Configure environment values:

```bash
cp .env.example .env.local
```

3. Start the dev server:

```bash
npm run dev
```

4. Open in browser:

- Public app: `http://localhost:3000`
- Intelligence module: `http://localhost:3000/intelligence`
- Campaign module: `http://localhost:3000/campaigns`
- Specs route: `http://localhost:3000/specs`
- Admin login: `http://localhost:3000/admin/login`

## Required environment variables

```bash
NEXT_PUBLIC_APP_NAME="GEM CYBER"
NEXT_PUBLIC_SUPPORT_EMAIL="admin@gemcybersecurityassist.com"
NEXT_PUBLIC_SUPPORT_PHONE="(xxx) xxx-xxxx"
DATA_PROVIDER_API_KEY=""
NEWS_INGESTION_WEBHOOK_SECRET=""
EMAIL_PROVIDER_API_KEY=""
EMAIL_SENDING_DOMAIN=""
DATABASE_URL=""
AUDIT_LOG_SINK=""
```

Admin and SMTP values are also defined in `.env.example` for local auth + email testing.

## Quality checks

```bash
npm run lint
npm run build
```

## Tailwind setup

Tailwind is configured through the Next.js build pipeline (no CDN dependency):

- `src/app/globals.css` imports `tailwindcss`.
- PostCSS plugin is configured in `postcss.config.mjs`.
- Production builds compile styles with `npm run build`.

## Vercel deployment

1. Import repository in Vercel.
2. Set framework preset to **Next.js**.
3. Add environment variables from `.env.example`.
4. Configure:
   - Build command: `npm run build`
   - Output: `.next` (automatic)
5. Enable previews for branch pushes.
6. Keep production deployment mapped to `main`.

## Notes

- Campaign data model stubs live in `src/lib/campaigns/models.ts` and map to `contacts`, `segments`, `campaigns`, `recipients`, `events`, `suppression_list`, `audit_logs`, and `notification_outbox`.
- File-based inbox and admin data stores are suitable for development but should be moved to managed persistence for production.
