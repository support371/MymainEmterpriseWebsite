# GEM Cyber Enterprise Platform Extraction Report

## 1) Repository Analysis

### Workspace inventory
- Framework/runtime
  - Next.js App Router application (`src/app`) with TypeScript and React client/server components.
  - Styling via global CSS/Tailwind-style utility classes in component markup.
- Core folders
  - `src/app`: route-level pages and API routes.
  - `src/components`: layout and UI primitives.
  - `src/lib`: auth and data persistence utilities.
  - `data`: file-backed operational data (`contact-messages.json`).
  - `attached_assets`: external prompt/design/deployment instruction artifacts.
- Operational config
  - `README.md` documents env vars for admin token and SMTP plus deployment posture.
  - `middleware.ts` enforces admin-area session gating.
  - `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `tsconfig.json`, `package.json` present.

### Existing functional intent inferred from structure
- Public marketing + services site is complete as a static-first experience with rich content pages.
- Intelligence experience exists in two tracks:
  - Public dynamic-style newsroom (`/news`) with category filtering and article drill-in UX.
  - Restricted intelligence preview (`/intelligence`) for controlled access messaging.
- Admin command area (`/admin/*`) provides operational inbox triage + placeholder governance surfaces (teams, orgs, grants, diagnostics).
- Current persistence layer is file-based JSON and explicitly intended to migrate to durable DB.

### Current architecture posture
- Monolithic Next.js deployment with API routes co-located in app.
- Session auth for admin based on shared token cookie.
- Email notifications via SMTP when contact forms are submitted.
- No external queue/event bus/database yet; those are enterprise TODOs.

### Enterprise TODOs inferred
- Replace JSON storage with multi-tenant relational/event store.
- Introduce true IAM (users, roles, policies, tenant boundaries, least privilege).
- Add immutable audit/event backbone for all security/ops actions.
- Add domain services for threat intel ingestion, incident workflows, SLA tracking, and escalation.
- Replace mock/content arrays with managed CMS or domain APIs.

## 2) Page & Experience Mapping

## Public / Marketing Experience

### Home (`/`)
- Purpose
  - Primary value proposition for unified cyber + physical asset protection.
- Primary user roles
  - Executive buyer, security lead, procurement, operations stakeholder.
- Key UI components
  - Hero, KPI stat grid, service cards, testimonials, route exploration cards, final CTA.
- Data dependencies
  - Marketing content/KPIs (currently static).
- APIs/services required
  - Optional CMS, analytics, lead attribution.
- Real-time or async behavior
  - None currently.

### About (`/about-us`)
- Purpose
  - Mission/vision credibility and enterprise timeline.
- Primary user roles
  - Prospects, partners, auditors.
- Key UI components
  - Timeline cards, mission/vision panels, trust CTA.
- Data dependencies
  - Corporate timeline and trust claims.
- APIs/services required
  - CMS/brand content service.
- Real-time or async behavior
  - None.

### Services Hub (`/services`)
- Purpose
  - Service catalog and routing into service-specific pages.
- Primary user roles
  - Security buyers, technical evaluators.
- Key UI components
  - Service tiles, global operations section, stats.
- Data dependencies
  - Service catalog metadata and tiers.
- APIs/services required
  - Product catalog/CMS.
- Real-time or async behavior
  - None.

### Service detail pages
- Routes
  - `/services/threat-monitoring`
  - `/services/incident-response`
  - `/services/compliance-management`
  - `/services/asset-recovery`
  - `/services/federal-compliance`
- Purpose
  - Deep capability narratives and conversion CTAs per domain.
- Primary user roles
  - SOC leader, incident commander, compliance officer, legal/commercial sponsor.
- Key UI components
  - Capability cards, process workflows, KPI/status blocks, CTA panels.
- Data dependencies
  - Service runbooks, benchmark metrics, framework catalogs.
- APIs/services required
  - Service content API, KPI source integrations.
- Real-time or async behavior
  - Mostly static now; future async pull of proof metrics.

### Pricing (`/pricing`)
- Purpose
  - Plan framing and conversion path.
- Primary user roles
  - Procurement, finance sponsor.
- Key UI components
  - Plan cards, feature matrices, CTA.
- Data dependencies
  - SKU/pricing catalog.
- APIs/services required
  - Billing/pricing API.
- Real-time or async behavior
  - None currently.

### Case Studies (`/case-studies`)
- Purpose
  - Outcome evidence by industry.
- Primary user roles
  - Executive buyers, risk committees.
- Key UI components
  - Success cards + KPI snippets + CTA.
- Data dependencies
  - Case study library.
- APIs/services required
  - CMS and asset service.
- Real-time or async behavior
  - None.

### Team (`/teams`)
- Purpose
  - Leadership and SOC staffing credibility.
- Primary user roles
  - Buyers, partners, candidates.
- Key UI components
  - Leadership profiles, security team grid, hiring CTA.
- Data dependencies
  - Directory/profile data.
- APIs/services required
  - People/profile service.
- Real-time or async behavior
  - None.

### Portfolio (`/portfolio`)
- Purpose
  - Cross-asset dashboard concept (digital + property).
- Primary user roles
  - Asset manager, CISO, enterprise operator.
- Key UI components
  - Portfolio KPIs, tab nav, security status panel.
- Data dependencies
  - Asset inventory, monitoring status, report summaries.
- APIs/services required
  - Portfolio service, telemetry service.
- Real-time or async behavior
  - Tab interaction in client; future real-time status feeds.

### QFS (`/qfs`)
- Purpose
  - Quantum-secure financial infrastructure positioning.
- Primary user roles
  - Financial risk leaders, platform partners.
- Key UI components
  - Performance KPIs, explanatory section, integration CTA.
- Data dependencies
  - Performance/SLA metrics.
- APIs/services required
  - Platform integration and documentation portal.
- Real-time or async behavior
  - None currently.

### Cyber Sentinel Trust (`/cyber-sentinel-trust`)
- Purpose
  - Zero-trust framework presentation.
- Primary user roles
  - IAM architect, security architect, CISO.
- Key UI components
  - Pillar cards, benefits KPI section.
- Data dependencies
  - Control framework metadata.
- APIs/services required
  - Security framework content service.
- Real-time or async behavior
  - None.

### Alliance Trust bridge (`/bridge/alliance-trust`)
- Purpose
  - Bridge from cyber brand to physical asset arm.
- Primary user roles
  - Asset-protection prospects.
- Key UI components
  - Capability list + CTA.
- Data dependencies
  - Division profile content.
- APIs/services required
  - CMS.
- Real-time or async behavior
  - None.

### Contact (`/contact-us`)
- Purpose
  - Lead intake and service request capture.
- Primary user roles
  - Prospective client, partnership/buying contact.
- Key UI components
  - Multi-field form, status/error UX, contact details panel.
- Data dependencies
  - Submitted contact message records.
- APIs/services required
  - `POST /api/contact`, SMTP provider, future CRM integration.
- Real-time or async behavior
  - Async API submit + optimistic loading/submission states.

### Legal pages (`/legal/privacy-policy`, `/legal/terms-of-service`, `/legal/cookie-policy`)
- Purpose
  - Compliance disclosures and legal terms.
- Primary user roles
  - Legal, compliance, end users.
- Key UI components
  - Long-form legal sections.
- Data dependencies
  - Legal text revisions/versioning.
- APIs/services required
  - Legal content/version repository.
- Real-time or async behavior
  - None.

## Intelligence & Newsroom

### Newsroom App (`/news`)
- Purpose
  - Aggregated intelligence/news browsing with category filter and article-detail mode.
- Primary user roles
  - Threat analyst, exec reader, market watcher.
- Key UI components
  - Category pill nav, article cards, detailed article panel, share/bookmark actions.
- Data dependencies
  - News articles (currently mocked local arrays).
- APIs/services required
  - News ingestion service, enrichment/scoring pipeline, bookmark/share backend.
- Real-time or async behavior
  - Client-side filtered views; would move to async fetch + periodic refresh.

### Intelligence Restricted Hub (`/intelligence`)
- Purpose
  - Controlled-access intelligence brand with subscription request.
- Primary user roles
  - Verified enterprise subscribers.
- Key UI components
  - Access status card, upcoming report previews, subscription form.
- Data dependencies
  - Report release schedules and access control state.
- APIs/services required
  - Subscriber verification + waitlist/onboarding API.
- Real-time or async behavior
  - Form submit stub now; future async onboarding workflow.

### Resources (`/resources`)
- Purpose
  - Download center for whitepapers/guides/reports/tools.
- Primary user roles
  - Security practitioners, compliance managers.
- Key UI components
  - Resource cards, search box, newsletter subscription panel.
- Data dependencies
  - Resource catalog and engagement metrics.
- APIs/services required
  - Resource library API + newsletter API (`POST /api/newsletter`).
- Real-time or async behavior
  - Search currently local; future async query + tracking events.

## Enterprise Command Center

### Admin Sign-in (`/admin/login`)
- Purpose
  - Gatekeep admin operations using token-based session cookie.
- Primary user roles
  - Platform admin / operations admin.
- Key UI components
  - Credential form + error state.
- Data dependencies
  - Admin token secret.
- APIs/services required
  - `POST /api/admin/login`; middleware cookie checks.
- Real-time or async behavior
  - Async auth call + redirect.

### Admin Inbox (`/admin/inbox`)
- Purpose
  - Triage inbound contact leads/messages and export CSV.
- Primary user roles
  - Support lead, SOC intake analyst, operations coordinator.
- Key UI components
  - Search/filter form, message cards, status/assignee editor, CSV export.
- Data dependencies
  - Message records from file store (future DB).
- APIs/services required
  - `GET/PATCH /api/admin/inbox`, file/DB store abstraction.
- Real-time or async behavior
  - Server actions for updates; future websocket/polling for live intake.

### Admin Teams (`/admin/teams`)
- Purpose
  - Team structure and role profile visibility.
- Primary user roles
  - IAM admin, operations manager.
- Key UI components
  - Team table with lead/member/role template.
- Data dependencies
  - Team directory (currently static).
- APIs/services required
  - Team management API.
- Real-time or async behavior
  - None currently.

### Admin Organizations (`/admin/organizations`)
- Purpose
  - Tenant/org account profile and billing flags.
- Primary user roles
  - Tenant admin, platform operations.
- Key UI components
  - Org cards with tier + billing status.
- Data dependencies
  - Tenant model and billing state.
- APIs/services required
  - Tenant/organization service + billing integration.
- Real-time or async behavior
  - None currently.

### Admin Grants (`/admin/grants`)
- Purpose
  - RBAC grant mapping visibility.
- Primary user roles
  - Security admin, compliance auditor.
- Key UI components
  - Role-permission-scope grant list.
- Data dependencies
  - Authorization policy store.
- APIs/services required
  - IAM policy API.
- Real-time or async behavior
  - None currently.

### Admin Diagnostics (`/admin/diagnostics`)
- Purpose
  - Runtime readiness checks (storage, smtp, token config).
- Primary user roles
  - Platform operator, SRE.
- Key UI components
  - Diagnostic cards.
- Data dependencies
  - Runtime env and storage reachability checks.
- APIs/services required
  - Internal diagnostics endpoints/checkers.
- Real-time or async behavior
  - Server-render-time checks; future background health probes.

## Cybersecurity Operations

### Cross-cutting ops surfaces currently represented
- Threat monitoring, incident response, compliance, zero trust, and live support channels are represented as service/marketing narratives and should become command modules.
- Live support sidebar conceptually maps to departmental queues and escalation paths.

## Identity & Access Management

### IAM representation in current repo
- Shared admin access token + cookie for session.
- Static RBAC grant examples and role profile placeholders.
- Tenant concepts present in organization pages but not enforced in data model/authz.

## Event & Audit Backbone

### Current state
- Minimal eventing: console logs for contact/newsletter submit events.
- No immutable audit trail or central event bus.
- CSV export and message status updates occur without append-only audit records.

### TODO extraction
- Introduce tamper-evident audit stream for admin actions, incident actions, policy changes, and data exports.

## 3) System Domain Extraction (Independent Projects)

### Threat Monitoring
- Responsibilities
  - Ingest telemetry, detect threats, maintain alert lifecycle/severity, correlate indicators.
- Inputs / Outputs
  - Inputs: endpoint/network/cloud events.
  - Outputs: normalized alerts, detections, risk signals.
- Events emitted / consumed
  - Emits: `alert.created`, `alert.escalated`, `threat.detected`.
  - Consumes: `asset.registered`, `policy.updated`, `tenant.onboarded`.
- Dependencies
  - IAM for scoped visibility, audit backbone, incident response domain.

### Incident Response
- Responsibilities
  - Triage, assign, contain, eradicate, recover, post-incident review.
- Inputs / Outputs
  - Inputs: alerts, user reports, contact submissions.
  - Outputs: incidents, timelines, action logs, RCA reports.
- Events emitted / consumed
  - Emits: `incident.opened`, `incident.status.changed`, `incident.closed`.
  - Consumes: `alert.created`, `sla.breach.detected`, `escalation.triggered`.
- Dependencies
  - Threat Monitoring, On-Call/Escalation, Audit backbone, Notification services.

### SLA & Breach Detection
- Responsibilities
  - Track contractual SLO/SLA timers, identify breached commitments.
- Inputs / Outputs
  - Inputs: incident clocks, queue wait times, response acknowledgments.
  - Outputs: breach records, penalty flags, compliance reports.
- Events emitted / consumed
  - Emits: `sla.at_risk`, `sla.breach.detected`.
  - Consumes: `incident.opened`, `incident.acknowledged`, `incident.closed`.
- Dependencies
  - Incident Response, On-Call, Compliance domain.

### On-Call & Escalation
- Responsibilities
  - Routing, paging, escalation policy execution, handoff tracking.
- Inputs / Outputs
  - Inputs: incident severity, SLA risk, department queues.
  - Outputs: paging notifications, escalation chains, acknowledgment records.
- Events emitted / consumed
  - Emits: `escalation.triggered`, `oncall.acknowledged`, `handoff.completed`.
  - Consumes: `incident.opened`, `sla.at_risk`, `alert.escalated`.
- Dependencies
  - IAM (who can be paged), Notification gateways (email/SMS/chat), Audit.

### Newsletter / Intelligence Publishing
- Responsibilities
  - Subscriber lifecycle, campaign creation, intelligence publication workflow.
- Inputs / Outputs
  - Inputs: subscription requests, report metadata, editorial approvals.
  - Outputs: newsletters, subscriber segments, campaign analytics.
- Events emitted / consumed
  - Emits: `subscriber.created`, `campaign.published`, `newsletter.sent`.
  - Consumes: `subscription.requested`, `report.approved`.
- Dependencies
  - IAM (editor/admin roles), Compliance (consent records), Event backbone.

### Compliance & Governance
- Responsibilities
  - Framework mapping, control evidence, policy attestations, audit prep.
- Inputs / Outputs
  - Inputs: operational events, control test results, policy changes.
  - Outputs: compliance dashboards, findings, remediation tasks.
- Events emitted / consumed
  - Emits: `control.noncompliant`, `audit.exported`, `policy.attested`.
  - Consumes: `incident.closed`, `sla.breach.detected`, `grant.changed`.
- Dependencies
  - Audit backbone, IAM, Incident/SLA domains.

### IAM (roles, permissions, tenants)
- Responsibilities
  - Identity lifecycle, authN, authZ, tenant isolation, policy evaluation.
- Inputs / Outputs
  - Inputs: user invites, role grants, org assignments.
  - Outputs: access tokens/sessions, policy decisions, entitlement snapshots.
- Events emitted / consumed
  - Emits: `user.created`, `grant.assigned`, `session.started`.
  - Consumes: `tenant.created`, `policy.updated`.
- Dependencies
  - Org/Tenant service, Audit backbone, all domain services for enforcement.

### Audit & Event Backbone
- Responsibilities
  - Canonical event ingestion, immutable storage, replay, export, lineage.
- Inputs / Outputs
  - Inputs: domain events from all bounded contexts.
  - Outputs: append-only audit ledger, compliance exports, event streams.
- Events emitted / consumed
  - Emits: `audit.recorded`, `audit.export.ready`.
  - Consumes: all domain events (`*`).
- Dependencies
  - Storage/retention infrastructure, encryption/KMS, compliance policies.

## 4) Data & Model Inference

### Core entities
- `Tenant`
  - id, name, domain, tier, billingStatus, region, status.
- `User`
  - id, tenantId, email, name, status, mfaState.
- `Role`
  - id, name, description, systemRoleFlag.
- `Permission`
  - id, action, resource, scopeType.
- `Grant`
  - id, userId/roleId, permissionId, scope, effectiveAt, expiresAt.
- `Team`
  - id, tenantId, name, leadUserId, roleProfile.
- `OrganizationProfile`
  - tenant metadata + compliance posture.
- `Asset`
  - id, tenantId, type (digital/property), criticality, location, owner.
- `Alert`
  - id, tenantId, source, severity, status, detectedAt, indicators.
- `Incident`
  - id, tenantId, alertIds[], severity, state, commanderId, openedAt, closedAt.
- `IncidentAction`
  - id, incidentId, actorId, actionType, notes, occurredAt.
- `SlaPolicy`
  - id, tenantId, metric, threshold, penaltyModel.
- `SlaBreach`
  - id, incidentId, policyId, breachedAt, duration.
- `EscalationPolicy`
  - id, tenantId, severityMap, targetScheduleIds.
- `OnCallSchedule`
  - id, teamId, rotationRules.
- `ContactMessage`
  - id, sourcePage, name fields, email/phone, serviceInterest, messageBody, status, assignee, tags.
- `Subscription`
  - id, email, tenantId?, consentState, verificationState.
- `Campaign`
  - id, title, segment, scheduledAt, publishedAt, status.
- `NewsArticle`
  - id, source, category, title, excerpt/content, riskScore, publishedAt.
- `AuditEvent`
  - id, tenantId, actorType, actorId, eventType, payloadHash, occurredAt, chainHash.

### Key relationships
- Tenant 1:N Users, Teams, Assets, Alerts, Incidents, Policies, Campaigns.
- Users N:M Roles via Grants; Roles N:M Permissions.
- Alert N:M Incident (or Alert belongs to primary Incident with links).
- Incident 1:N IncidentActions; Incident 1:N SlaBreach.
- Team 1:N OnCallSchedules; EscalationPolicy references Teams/Schedules.
- ContactMessage may be promoted into Incident/Case intake.
- NewsArticle can map to ThreatIntel indicators and Campaign content.

### Entities requiring strict auditability / immutability
- Must be immutable append logs
  - `AuditEvent`, `IncidentAction`, `Grant` changes, `Policy` changes, `SlaBreach`, export actions.
- Must be compliance-retained
  - Contact intake handling records, access decisions, incident timelines, control evidence artifacts.
- Must support legal hold
  - Incident records, audit exports, regulatory correspondence.

## 5) Frontend Structure Plan (Proposal)

### Route topology (web)
- Public marketing
  - `/`, `/about-us`, `/services`, `/services/*`, `/pricing`, `/case-studies`, `/teams`, `/contact-us`, `/portfolio`, `/qfs`, `/cyber-sentinel-trust`, `/bridge/alliance-trust`, `/legal/*`.
- Intelligence
  - `/news`, `/intelligence`, `/resources`.
- Command center
  - `/admin/login`, `/admin/inbox`, `/admin/teams`, `/admin/organizations`, `/admin/grants`, `/admin/diagnostics`.
- Future enterprise app route groups
  - `/command/overview`
  - `/command/incidents`
  - `/command/alerts`
  - `/command/sla`
  - `/command/escalations`
  - `/command/compliance`
  - `/command/iam/users`
  - `/command/iam/roles`
  - `/command/audit/events`

### High-level components
- Shell/layout
  - `RootLayout`, `Navbar`, `Footer`, `LiveSupport`, theme and telemetry wrappers.
- Marketing primitives
  - `Hero`, `StatGrid`, `SectionHeader`, card grids, CTA panels.
- Command center primitives (new)
  - Data table framework, filter/query bars, status chips, timeline/event feed, drawer panels, policy editors.

### Layouts and navigation
- Public layout
  - Persistent navbar/footer/live support.
- Admin layout
  - Side navigation + top strip + guarded routes.
- Future domain layouts
  - Command center with contextual subnav per domain.

### Shared UI primitives required
- Input controls: searchable selects, date ranges, multiselect tags.
- Data density controls: table/card view toggles, saved filters.
- Event visualization: incident timeline, alert graph, SLA clock badges.
- Security UX: approval dialogs, break-glass prompts, consent/legal banners.

### Frontend TODOs
- Replace static arrays with typed API queries (server components + streaming).
- Tenant-aware route guards and role-based component rendering.
- Add accessibility and localization strategy for enterprise deployments.

## 6) Backend Structure Plan (Proposal)

### Services
- `gateway-api`
  - BFF/API gateway for web; auth/session management.
- `iam-service`
  - Users, roles, permissions, tenant boundaries, policy engine.
- `intake-service`
  - Contact/inbox ingestion, enrichment, triage hooks.
- `threat-monitoring-service`
  - Alert ingestion/correlation and threat detection.
- `incident-service`
  - Incident lifecycle, runbooks, timelines.
- `sla-service`
  - SLA clocks, breach detection, contractual metrics.
- `escalation-service`
  - On-call schedules, paging, escalation policies.
- `compliance-service`
  - Controls, evidence collection, framework mapping.
- `intelligence-publishing-service`
  - News ingestion, editorial workflows, newsletter campaigns.
- `audit-event-service`
  - Immutable event journal, retention, export.
- `notification-service`
  - Email/SMS/chat/webhook delivery abstraction.

### Modules per service (non-merged)
- Each service should keep separate modules:
  - controller/api layer
  - application/service layer
  - domain model layer
  - repository/infrastructure adapters
  - policy/authz interceptors
  - observability instrumentation

### APIs (target shape)
- IAM
  - `/v1/tenants`, `/v1/users`, `/v1/roles`, `/v1/grants`, `/v1/policies/evaluate`.
- Intake/Admin inbox
  - `/v1/messages`, `/v1/messages/{id}`, `/v1/messages/export`.
- Security ops
  - `/v1/alerts`, `/v1/incidents`, `/v1/incidents/{id}/actions`, `/v1/sla/breaches`, `/v1/escalations`.
- Intelligence
  - `/v1/news/articles`, `/v1/subscriptions`, `/v1/campaigns`.
- Audit
  - `/v1/audit/events`, `/v1/audit/exports`.

### Workers / queues
- Ingestion workers
  - News feed ingest, threat telemetry normalization.
- Workflow workers
  - SLA timers, escalation dispatch, campaign scheduling.
- Compliance workers
  - Evidence harvest, control drift detection, periodic attestations.
- Queue/event transport
  - Kafka/NATS/SQS-class bus with dead-letter and replay.

### WebSocket / event layers
- Realtime channels
  - `alerts.stream`, `incidents.stream`, `sla.stream`, `audit.tail`.
- Subscription model
  - Tenant-scoped channel auth + role claims.
- Delivery guarantees
  - At-least-once events, idempotent consumers, sequence checkpoints.

### Backend TODOs
- Introduce durable DB (PostgreSQL) + migration framework.
- Add object storage for evidence/artifacts and signed URL access.
- Add KMS-backed secrets and envelope encryption for sensitive fields.
- Add policy-as-code for cross-service authz.
- Add full observability (traces, logs, metrics, SLO dashboards).

## 7) Explicit Missing Information / TODO Ledger
- TODO: No explicit commit history analysis included in repo snapshot; if `.git` history is available, extract architecture decisions from commit messages.
- TODO: No infrastructure-as-code present; define deployment topology (VPC, private subnets, managed DB, queue bus, SIEM sink).
- TODO: No explicit tenant lifecycle workflows; define onboarding/offboarding/legal hold paths.
- TODO: No incident severity matrix/runbooks; codify response playbooks by class.
- TODO: No formal data retention policy docs; define retention and purge/archival by jurisdiction.
- TODO: No DR/BCP artifacts; define RTO/RPO and failover runbooks.

## 8) Security, Compliance, and Auditability Assumptions Applied
- Multi-tenant isolation is mandatory at API, data, cache, and event layers.
- RBAC + scoped ABAC must be enforced server-side for every operation.
- Every mutable admin/security action requires immutable audit event append.
- Compliance exports must be signed, versioned, and traceable to source events.
- Sensitive data should be encrypted at rest and in transit; key access audited.
