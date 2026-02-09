# System Architecture (Current + Target)

## Runtime architecture (current)
- **Framework:** Next.js App Router.
- **Language:** TypeScript.
- **Rendering model:** Server components + route handlers.
- **UI:** Reusable layout components and page-level composition.

## Layered architecture

### 1) Experience Layer
- Public marketing and intelligence pages in `src/app/**`.
- Shared navigation/footer/live-support patterns.
- Service, legal, and resource pages built as route-centric modules.

### 2) Application/API Layer
- Route handlers under `src/app/api/**` provide:
  - Contact intake and optional SMTP mail dispatch.
  - Newsletter signup endpoint.
  - Admin login/logout and inbox read/update operations.

### 3) Access Control Layer
- `middleware.ts` guards `/admin/:path*` except `/admin/login`.
- Session persisted via HTTP-only cookie.
- Auth token validated against `ADMIN_ACCESS_TOKEN` env value.

### 4) Data Layer
- Current store: `data/contact-messages.json`.
- Data helpers in `src/lib/contactMessages.ts` handle list/create/update and CSV export.

## Screenshot-derived operational architecture additions
The provided UI artifacts imply intended architecture beyond basic marketing pages:
- **Intelligence Command Center** pattern:
  - ingestion counters, regional routing, pipeline health panels.
  - category-tagged intelligence stream (`tech`, `finance`, `business`, `crypto`, `real estate`, `cybersecurity`).
  - controlled dispatch controls (schedule upload, queue open).
- **Enterprise outreach/distribution engine** pattern:
  - dual campaign tracks (cold outreach + newsletter dispatch).
  - queue throttling and reputation protection controls.
  - lifecycle + webhook event ingestion for delivery/open/click/bounce/complaint events.

## Target-state production architecture (recommended)
1. **Persistence:** Postgres with migrations and point-in-time recovery.
2. **Auth:** Identity-backed RBAC (admin, analyst, operator, auditor) with per-action audit logging.
3. **Messaging:** Queue-backed outbound orchestration (e.g., BullMQ/SQS) for controlled dispatch.
4. **Observability:** structured logs, request tracing, error budgets/SLOs, alert routing.
5. **Security controls:** rate limiting, schema validation, secret rotation, anti-automation controls, signed webhooks.

## Non-functional requirements to enforce
- Availability target aligned to public trust claims.
- Secure-by-default headers and cookie policy.
- Compliance-ready auditability (change events, admin actions, campaign actions).
- Deterministic rollback and deployment traceability.
