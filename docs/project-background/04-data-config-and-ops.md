# Data, Configuration, and Operations

## Environment variables in active use
- `ADMIN_ACCESS_TOKEN` — shared secret token used for admin session validation.
- `SMTP_USER`, `SMTP_PASS`, `SMTP_HOST`, `SMTP_PORT` — SMTP transport configuration used by contact intake flow.

## Active data contract: contact message
Current message record shape includes:
- Identity and time: `id`, `createdAt`, `sourcePage`.
- Lead identity: `firstName`, `lastName`, `email`, `phone`.
- Intent: `serviceInterest`, `messageBody`.
- Ops fields: `status`, `assignedToUserId`, `orgId`, `tags`.

## Current persistence model
- Path: `data/contact-messages.json`.
- Access pattern: full-file read/modify/write.
- Strength: low-complexity bootstrap model for MVP.
- Constraint: no row-level locks, no native querying/indexing, limited durability guarantees at scale.

## Operational commands
- Local development: `npm install`, `npm run dev`.
- Quality checks: `npm run lint`, `npm run build`.

## Production hardening blueprint

### Data and reliability
1. Move to Postgres with migrations and seed scripts.
2. Introduce repository layer with explicit transactions.
3. Add retention policy + archival strategy for messages/events.

### API hardening
1. Add schema validation library and typed error envelopes.
2. Add IP-based and identity-based rate limits.
3. Add idempotency keys for external-event ingest endpoints.

### Email and campaign operations
1. Move from direct send to queue-based dispatch workers.
2. Add delivery-state persistence (`queued`, `sent`, `failed`, `deferred`).
3. Add bounce/complaint suppression automation.

### Observability and supportability
1. Structured logs with request/correlation IDs.
2. Basic metrics (latency, error rate, queue depth, dispatch throughput).
3. Alert thresholds for API failures, queue stalls, and SMTP provider degradation.

### Security and compliance
1. Per-user auth + RBAC replacing shared token model.
2. Immutable audit trail for admin and campaign actions.
3. Secret rotation process and environment parity checks.
