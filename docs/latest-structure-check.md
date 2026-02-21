# Latest Structure & Live Preview Check

Date: 2026-02-20

## Repository structure snapshot

- Framework: Next.js App Router (`src/app`)
- UI components: `src/components` with `layout`, `navigation`, and `ui/primitives`
- Shared data modules: `src/data`
- Utility/library modules: `src/lib`
- Backend endpoints: `src/app/api/**/route.ts`
- New merged enterprise preview page: `/live-preview` (combines homepage visual style and route-ops coverage)

### Route inventory highlights

- Total app pages (`page.tsx`): **40**
- Total API route handlers (`route.ts`): **7**
- New merged review route: `/live-preview`
- Admin and auth flow present under: `/admin`, `/admin/login`, `/api/admin/*`

## Thorough checks run

1. **Lint check** via `npm run lint`
   - Result: pass (no lint errors)
2. **Production build check** via `npm run build`
   - Result: pass
   - Static and dynamic route manifest generated successfully.
3. **Live preview check** via `npm run dev -- --hostname 0.0.0.0 --port 3000`
   - Opened `/live-preview` for merged enterprise validation
   - Captured preview screenshot for visual verification.

## Live preview artifacts

- Merged enterprise page preview: `artifacts/live-preview-merged.png`

