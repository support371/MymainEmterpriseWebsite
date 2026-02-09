# Visual Reference Architecture (Extracted from Provided Screens)

## Objective
Capture architecture-relevant requirements implied by the provided UI screenshots so developer agents can align implementation with intended product behavior.

## A) Homepage architecture pattern

### Hero and conversion
- Primary statement: proactive breach prevention.
- Immediate CTA pair: operational onboarding + emergency hotline.
- KPI widgets must remain visible above the fold and mapped to real telemetry sources.

### Service capability matrix
- Six-tile capability area suggests taxonomy:
  1. Threat monitoring
  2. Incident response
  3. Federal compliance
  4. Asset recovery
  5. Intelligence hub
  6. Global coverage
- Architecture implication: route + content ownership for each capability, with consistent CTA and analytics tagging.

### Platform exploration grid
- The 12-card matrix indicates a command-navigation model across product, company, resources, and execution roadmaps.
- Architecture implication: maintain semantic IA and avoid orphaned route entries.

### One-page execution summary
- “Execution Roadmap” and “Admin + Backend Surfaces” imply transparent build-state communication.
- Architecture implication: maintain source-of-truth docs synced to implementation milestones.

## B) Intelligence command center pattern

### Operational control strip
- Actions such as “Schedule Daily Upload” and “Open Newsletter Queue” indicate privileged workflow endpoints.
- Architecture implication: role-based action authorization, request audit logging, and asynchronous job queue execution.

### Telemetry cards
- Stories ingested today, dispatch time, regional routing, and health score imply near-real-time metrics.
- Architecture implication: aggregate metrics service + cache strategy + freshness indicators.

### Category feed model
- Multi-domain tags (tech/finance/business/crypto/real estate/cybersecurity) imply normalized taxonomy table and many-to-many tagging.
- Architecture implication: support filter/sort/pagination and deterministic query plans.

### Card-level metadata
- Each story card includes source, recency, category, summary, and action controls.
- Architecture implication: content entity should include provenance fields, publish state, and moderation status.

## C) Outreach + intelligence distribution engine pattern

### Governance-safe architecture claims
- Screens reference compliance-safe delivery, throttling, suppression, and reputation controls.
- Architecture implication: enforce policy gates in backend, not just UI labels.

### Campaign model separation
- Cold outreach and newsletter streams are explicitly separated.
- Architecture implication: separate templates, schedules, risk policies, and KPIs per campaign type.

### Event lifecycle coverage
- Delivered/open/click/bounce/complaint/unsubscribe events are highlighted.
- Architecture implication: event table + webhook ingest endpoint + retry/backoff + signature validation.

### Queue and prohibition rules
- Explicit “no mass-send endpoint/no one-click blasts/no unverified lists” style guardrails.
- Architecture implication: policy engine with hard constraints and auditable policy-denial records.
