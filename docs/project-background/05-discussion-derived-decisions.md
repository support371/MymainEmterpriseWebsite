# Discussion-Derived Decisions, Constraints, and Next Actions

## Confirmed decisions to retain
1. Preserve premium dark enterprise visual language and trust-centric UX.
2. Keep broad route coverage and avoid dead-end navigation.
3. Maintain functioning contact and newsletter capture flows.
4. Keep admin operations practical for inbox triage in current phase.
5. Use bridge pages for external enterprise platforms instead of embedded iframes.

## Constraints accepted in current phase
- Shared-token admin access for speed of implementation.
- JSON persistence for low-friction deployment.
- Partial simulation behavior in intelligence/news operations where full backend orchestration is not yet implemented.

## Risks introduced by those constraints
1. Limited accountability and traceability for admin actions.
2. Data contention/corruption risk under concurrent writes.
3. Limited reporting/analytics depth without normalized relational schemas.
4. Operational blind spots without event-level observability.

## Required next-step milestones

### Milestone A — Security + identity baseline
- Implement user-backed auth, RBAC, and secure session lifecycle.
- Add admin audit logging for read/update/export actions.

### Milestone B — Data platform upgrade
- Introduce relational schema for contacts, organizations, campaign entities, and event telemetry.
- Migrate JSON records with backfill script and validation checks.

### Milestone C — Intelligence operations engine
- Implement dispatch queue, campaign scheduler, suppression list logic, and webhook event ingestion.
- Persist and visualize campaign lifecycle metrics in command-center UI.

### Milestone D — Delivery governance
- Add CI checks (lint, typecheck, tests, build).
- Add release notes/change log discipline.
- Define rollback procedure and post-deploy smoke tests.

## Definition of done for architecture readiness
- Every critical user flow maps to durable storage.
- Every privileged action is attributable to an authenticated principal.
- Every operational claim in UI has an observable metric behind it.
- Every deploy has validated rollback and audit evidence.
