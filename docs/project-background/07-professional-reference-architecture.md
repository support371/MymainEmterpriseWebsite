# Professional Reference Architecture (Deep Research-Informed)

## Security architecture recommendations
1. **Zero Trust admin access**
   - Strong identity provider integration, MFA, short-lived sessions, step-up auth for high-risk actions.
2. **Defense in depth for APIs**
   - WAF, rate limiting, schema validation, bot detection, abuse monitoring.
3. **Secure secret lifecycle**
   - Secret manager, scoped credentials, automatic rotation, breach-response procedure.

## Compliance and governance design
1. Map controls to recognized frameworks:
   - NIST CSF 2.0 (govern, identify, protect, detect, respond, recover).
   - SOC 2 Trust Services Criteria.
   - ISO/IEC 27001 Annex A control mapping.
2. Capture evidence continuously:
   - Access logs, change logs, incident logs, deployment attestations.
3. Data governance:
   - Data classification, retention windows, and legal-hold capability.

## Data architecture recommendations
1. **Core relational entities**
   - users, roles, permissions, organizations.
   - contacts, inquiries, assignments, notes.
   - campaigns, segments, templates, send_jobs, send_events.
   - stories, sources, tags, newsletters, dispatch_runs.
2. **Operational stores**
   - Postgres for primary data, Redis for short-lived queues/cache, object storage for exports/artifacts.
3. **Event model**
   - Append-only event log for campaign and admin actions.

## Reliability and SRE recommendations
1. Define SLOs:
   - API availability, p95 latency, ingestion lag, dispatch success rate.
2. Add health checks:
   - Liveness/readiness for app + workers + integrations.
3. Operational readiness:
   - Runbooks, on-call routing, incident severity matrix, postmortem template.

## Intelligence/news domain recommendations
1. Introduce editorial workflow states:
   - draft, reviewed, approved, scheduled, published, archived.
2. Add provenance and trust signals:
   - source confidence score, verification status, analyst owner.
3. Regional routing:
   - policy-based regional eligibility and localization metadata.

## Delivery roadmap (90-day practical sequence)
- **Days 1–30:** auth/RBAC foundation + Postgres migration skeleton + audit events.
- **Days 31–60:** queue-based dispatch + webhook ingestion + observability dashboards.
- **Days 61–90:** policy engine hardening + intelligence workflow states + automated tests and compliance evidence exports.
