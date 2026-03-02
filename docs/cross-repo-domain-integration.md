# Cross-Repo Domain Integration Baseline

This document consolidates domain signals harvested from connected repositories and local project artifacts into a production implementation baseline.

## Connected Repositories

- `support371/MymainEmterpriseWebsite` (primary product repository)
- `support371/azuredev-31ea` (auxiliary repository shell)
- `support371/azuredev-aaf8` (auxiliary repository shell)

## Consolidated Domain Scope

- Real estate and cyber-physical trust operations
- Finance, fintech, digital banking, and investment security workflows
- Cybersecurity, compliance, and threat monitoring
- QFS-oriented financial security narratives
- Community, news, about, services, intelligence, resources, teams, membership
- Admin operations and client portal workflows

## Information Architecture Mapping

Primary domain surfaces:

- `/home`: executive posture and operational command overview
- `/intel`: threat and regulatory intelligence
- `/assets`: portfolio and asset protection operations
- `/community`: membership, resources, and narrative trust
- `/hub`: module gateway

Hub modules:

- `/hub/soc`
- `/hub/research`
- `/hub/compliance`
- `/hub/portfolio`
- `/hub/real-estate`

Client and investment surfaces:

- `/clients`
- `/clients/portal`

## Backend + Data Layer Alignment

- Keep existing API routes as canonical backend surface:
  - `/api/contact`
  - `/api/newsletter`
  - `/api/health`
  - `/api/routes`
  - `/api/admin/*`
- Preserve existing admin and operational routes under `/admin/*`.
- Preserve route governance through `src/lib/siteRoutes.ts` and redirect management via Next config.

## Standards Targets

- Mobile-first persistent tab navigation with desktop horizontal adaptation.
- Route parity across breakpoints (no breakpoint-specific route divergence).
- Module-driven surfaces with state persistence per domain.
- Build-verified production output (`npm run build`).
- Keep enterprise/legal/compliance pages and APIs integrated into one design system.
