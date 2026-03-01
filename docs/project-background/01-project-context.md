# GEM Enterprise Project Context

## Purpose of this handoff pack
This folder is the **single onboarding package** for developer agents and engineering contributors joining the project late in delivery. It consolidates business context, architecture scope, UI/UX intent, implementation status, and high-priority technical evolution work.

## Program intent
GEM Cybersecurity-Monitoring Assist is positioned as an enterprise-grade security and intelligence platform with:
- Cybersecurity and physical security service positioning.
- Operationally credible trust indicators (SLA, response time, assets monitored).
- Intelligence/newsletter operations capabilities.
- Admin workflows for inbound lead operations and triage.

## Product lines and enterprise framing
- **Primary platform:** GEM Cybersecurity & Monitoring Assist (this repository).
- **Enterprise ecosystem pattern:** bridge-page integration with external platforms (e.g., Alliance Trust Realty) via outbound CTA links (open in new tab), while preserving each platform’s independent hosting and release lifecycle.

## Current stage
This project is in final-stage hardening/packaging:
1. Public pages are broad and mostly complete.
2. Contact and newsletter endpoints exist.
3. Admin center and inbox triage paths exist.
4. Architecture currently favors rapid operational delivery and now needs production-hardening.

## Source-of-truth hierarchy for future contributors
1. Runtime code in `src/**` and route handlers under `src/app/api/**`.
2. This handoff folder (`docs/project-background/**`) for architecture and intent.
3. `README.md` for local ops and deployment basics.

## Quality bar expected
- Enterprise-grade readability, maintainability, and operational traceability.
- Security-first defaults and compliance-aware design language.
- Explicit migration path from MVP constraints (shared-token auth, JSON persistence) to scalable architecture.
