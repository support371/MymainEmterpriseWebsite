# GEM CYBER — Codex/VS Code Agent Execution Playbook

This playbook is the **single operator instruction set** for Codex in VS Code (or any autonomous coding agent) to build, validate, and ship GEM CYBER at or above the currently delivered enterprise standard.

---

## 1) Mission and non-negotiables

- Preserve GEM CYBER visual identity:
  - dark/navy base
  - cyan/blue glow accents
  - bold, compact enterprise typography
  - card-based platform information architecture
- Keep the site enterprise-safe:
  - no unverifiable compliance claims
  - no prototype artifacts/overlays
  - clear route governance and API readiness
- Deliver both marketing and platform readiness:
  - `/` as conversion surface
  - `/live-preview` as route + backend readiness surface
  - `/routes` as route registry index
  - `/api/health` and `/api/routes` operational

---

## 2) Agent operating contract

When running as Codex (or another agent), always execute in this order:

1. **Discover**
   - Identify framework and routing.
   - Locate shared layout (`src/app/layout.tsx`) and global nav/footer/live support.
2. **Plan**
   - Propose file-level patch list before editing.
   - Keep changes additive and reversible.
3. **Implement**
   - Build shared data sources first (e.g., route inventory), then pages/components.
   - Reuse existing styling system (Tailwind) and app patterns.
4. **Validate**
   - `npm run lint`
   - `npm run build`
   - `npm run dev` smoke check
5. **Document**
   - Include changed files + purpose.
   - Include verification checklist for header, mobile nav, route APIs, and redirects.
6. **Ship**
   - Commit with focused message.
   - Open PR with summary, testing, deployment notes.

---

## 3) Required standards (must pass)

### UX and layout

- Header behavior:
  - transparent over home hero at load
  - transitions to semi-opaque/blur on scroll
- Mobile nav:
  - hamburger + drawer/dropdown
  - primary CTA remains visible and tappable
- Live support widget:
  - safe-area-aware bottom offset
  - never blocks key CTAs at 375px width

### Route governance

- These routes must exist and render:
  - `/services`
  - `/intelligence`
  - `/membership`
  - `/leadership`
  - `/about`
  - `/admin`
  - `/routes`
  - `/live-preview`
- Route registry must be exposed by `GET /api/routes`.

### Backend readiness

- `GET /api/health` returns JSON health payload.
- Existing contact/newsletter/admin API routes remain functional.
- Redirects are configured for legacy paths.

### Accessibility and quality

- One `h1` per page.
- Visible focus states for keyboard users.
- No low-contrast text in primary UI areas.
- Avoid heavy animation causing layout instability.

---

## 4) Build + execution commands

Run exactly:

```bash
npm install
npm run lint
npm run build
npm run dev
```

Optional API checks during dev:

```bash
curl -s http://localhost:3000/api/health
curl -s http://localhost:3000/api/routes
```

---

## 5) Visual reference implementation targets

### Target A — Eco cinematic mobile hero style (from reference image)

Apply this style language to campaign/special landing surfaces (without replacing core GEM CYBER brand):

- high-contrast cinematic hero image treatment
- centered 2–3 line headline with short subcopy
- single strong primary CTA
- subtle glass/overlay top nav on mobile

Use as a **variant section** for storytelling pages, not as a full global redesign.

### Target B — Enterprise route governance dashboard (from reference image)

Maintain and improve `/live-preview` with:

- top summary metrics (routes, modules, API surfaces, redirects)
- full route coverage list with category tags
- side panels for service scope, admin scope, backend endpoint readiness, and redirect rules
- direct links to `/` and `/routes`

---

## 6) Upgrade backlog for next agent iteration

1. Add route search/filter on `/routes` and `/live-preview`.
2. Add E2E smoke tests for:
   - header transition on scroll
   - mobile menu open/close
   - `/api/health` and `/api/routes` response schema
3. Add Vercel preview/deploy checklist in PR template.
4. Add structured JSON schema validation for `routeInventory`.

---

## 7) PR acceptance template (required)

Every agent PR should include:

- **Scope**: what was changed and why.
- **Files changed**: path + responsibility.
- **Validation evidence**:
  - lint/build/dev results
  - screenshots for visual changes (desktop + mobile when applicable)
- **Deployment readiness**:
  - route impact
  - API impact
  - redirect impact
  - rollback notes

---

## 8) Definition of done

A task is complete only when:

- all required routes and APIs resolve correctly,
- visual behavior matches enterprise standards,
- lint/build pass,
- PR is opened with screenshots and verification steps,
- changes are production-ready for Vercel auto-deploy workflows.
