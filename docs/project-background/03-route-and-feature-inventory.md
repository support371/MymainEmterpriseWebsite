# Route and Feature Inventory

## Public routes (current)
- `/` — flagship homepage with hero, KPI strip, service tiles, testimonials, platform explorer, roadmap/admin surfaces teaser, emergency hotline CTA.
- `/services` and child routes:
  - `/services/threat-monitoring`
  - `/services/incident-response`
  - `/services/compliance-management`
  - `/services/federal-compliance`
  - `/services/asset-recovery`
- `/about-us`, `/teams`, `/case-studies`, `/pricing`, `/resources`, `/portfolio`, `/qfs`, `/news`, `/intelligence`, `/cyber-sentinel-trust`.
- `/bridge/alliance-trust`.
- Legal pages under `/legal/*`.
- `/contact-us` for lead conversion.

## Admin routes (current)
- `/admin`
- `/admin/login`
- `/admin/inbox`
- `/admin/teams`
- `/admin/organizations`
- `/admin/grants`
- `/admin/diagnostics`

## API routes (current)
- `POST /api/contact` — validates request, persists contact message, conditionally sends SMTP notifications/autoresponse.
- `POST /api/newsletter` — validates email and records signup event (currently lightweight implementation).
- `POST /api/admin/login` — validates token and establishes session cookie.
- `POST /api/admin/logout` — expires cookie and redirects.
- `GET /api/admin/inbox` — query/filter + CSV export.
- `PATCH /api/admin/inbox` — message status/assignment/tag updates.

## Screenshot-derived feature inventory to preserve in architecture docs

### Homepage modules
1. Hero headline emphasizing breach prevention.
2. KPI strip (availability, response time, assets monitored).
3. Service-card cluster (threat monitoring, incident response, federal compliance, asset recovery, intelligence hub, global coverage).
4. Platform navigation matrix (about/team/case studies/intelligence/resources/QFS/sentinel trust/portfolio/pricing/contact/company overview/roadmap).
5. "Everything in one page" execution + admin/backend surfaces summary cards.
6. Emergency hotline block and high-visibility contact CTAs.

### Intelligence/Newsroom modules
1. Command center banner with operational controls (schedule upload, open queue).
2. Dispatch telemetry cards (ingestion, dispatch time, routed regions, health score).
3. Category filter tabs and sorted feed control.
4. Grid of intelligence cards with metadata, source, age, and read actions.
5. "Load more" pagination behavior.
6. Newsletter dispatch status footer panel.

### Outreach and intelligence distribution specification modules
1. System purpose and compliance-safe architecture claims.
2. Core architecture details (API provider, domain reputation safeguards, policy controls).
3. Dual campaign engine separation (cold outreach vs newsletter).
4. Queue/hygiene/compliance guardrails.
5. Data model and event lifecycle traceability.
6. Dashboard KPIs and operational controls.
7. Segmentation/builder flow and prohibited actions list.
8. Next-build direction CTA for phased implementation.
