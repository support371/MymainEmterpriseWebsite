# Nexus Bitcoin Banking Platform

Institutional-grade Bitcoin custody, fiat on-ramp, and Bitcoin-backed spending card — all in one platform.

## Architecture

```
nexus/
├── src/                        # FRONTEND (Vite + React 18 + Tailwind)
│   ├── main.jsx                # React entry + config validation
│   ├── App.jsx                 # PageRouter + providers + loading state
│   ├── config/index.js         # Centralized configuration (env vars)
│   ├── api/client.js           # API client (fetch wrapper + auth tokens)
│   ├── providers/
│   │   ├── AuthProvider.jsx    # Server-backed auth (token in localStorage)
│   │   └── ToastProvider.jsx   # Toast notification system
│   ├── components/
│   │   ├── Navigation.jsx      # Top nav bar (client + admin variants)
│   │   ├── StatusBadge.jsx     # Color-coded status badges
│   │   └── CopyButton.jsx     # Clipboard copy utility
│   └── pages/                  # All page components (client + admin)
├── api/                        # BACKEND (Vercel Serverless Functions)
│   ├── _lib/
│   │   ├── database.js         # MockDatabase singleton (in-memory, RLS)
│   │   ├── auth.js             # Token-based auth (sessions, middleware)
│   │   └── services.js         # Business logic (deposits, cards, ledger, admin)
│   ├── v1/[...path].js         # Catch-all API router (30+ endpoints)
│   ├── ai-review.js            # AI code review endpoint
│   └── ai-generate.js          # AI code generation endpoint
├── scripts/
│   └── ai-budget-manager.js    # Local AI budget manager CLI
├── logs/                       # AI usage logs (gitignored)
├── docs/
│   └── CREDIT_GOVERNANCE.md    # AI budget/caching documentation
├── vercel.json                 # Vercel deployment config
└── package.json                # Vite + React + Tailwind
```

## Local Development

```bash
cd nexus
cp .env.example .env
# Fill in your API keys in .env

npm install
npm run dev
# Opens at http://localhost:3000
```

## Backend API

All business logic runs server-side via Vercel Serverless Functions. A single catch-all route (`api/v1/[...path].js`) handles all endpoints, ensuring they share one in-memory MockDatabase instance within warm starts.

### Authentication

Token-based auth using `crypto.randomUUID()`. Tokens are stored in a server-side `sessions` table and expire after 24 hours.

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v1/auth/signup` | POST | None | Create account (email `admin@nexus-admin.com` → admin role) |
| `/api/v1/auth/signin` | POST | None | Sign in, returns token |
| `/api/v1/auth/signout` | POST | Bearer | Destroy session |
| `/api/v1/auth/me` | GET | Bearer | Get current user (session restore) |

### Client Endpoints (require Bearer token)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/profile` | GET | Get user profile |
| `/api/v1/profile` | PATCH | Update profile fields |
| `/api/v1/bank-accounts` | GET | List bank accounts |
| `/api/v1/portfolio` | GET | Portfolio + BTC balance |
| `/api/v1/deposits` | GET | List user deposits |
| `/api/v1/deposits` | POST | Create new deposit request |
| `/api/v1/deposits/:id` | GET | Deposit detail + ledger entries |
| `/api/v1/cards` | GET | List user cards |
| `/api/v1/cards/eligibility` | GET | Check card eligibility |
| `/api/v1/cards/request` | POST | Request a new card |
| `/api/v1/cards/requests` | GET | List user card requests |
| `/api/v1/cards/transactions` | GET | List card transactions |
| `/api/v1/notifications` | GET | List user notifications |
| `/api/v1/activity` | GET | Recent activity feed |

### Admin Endpoints (require Bearer token + admin role)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/admin/dashboard` | GET | Platform KPIs + stats |
| `/api/v1/admin/clients` | GET | List/search all clients |
| `/api/v1/admin/clients/:id` | GET | Client 360 detail view |
| `/api/v1/admin/clients/:id/kyc` | PATCH | Update client KYC status |
| `/api/v1/admin/deposits` | GET | All deposits (with client names) |
| `/api/v1/admin/deposits/:id/simulate-inbound` | POST | Simulate fiat inbound |
| `/api/v1/admin/deposits/:id/settle` | POST | Settle deposit (fiat→BTC) |
| `/api/v1/admin/cards/requests` | GET | All card requests |
| `/api/v1/admin/cards/requests/:id/approve` | POST | Approve & issue card |
| `/api/v1/admin/cards` | GET | All issued cards |
| `/api/v1/admin/cards/:id/simulate-tx` | POST | Simulate card transaction |
| `/api/v1/admin/webhooks` | GET | Webhook events log |
| `/api/v1/admin/operations` | GET | Operations log |
| `/api/v1/admin/email-outbox` | GET | Email outbox queue |
| `/api/v1/admin/email-outbox/process` | POST | Process email queue |
| `/api/v1/admin/settings` | GET | Platform settings |
| `/api/v1/admin/settings/reset` | POST | Reset platform data |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | For AI features | OpenAI API key |
| `ANTHROPIC_API_KEY` | For AI features | Anthropic API key |
| `GITHUB_TOKEN` | For CI/CD | GitHub PAT (repo + workflow scopes) |
| `VERCEL_TOKEN` | For deployment | Vercel API token |
| `VERCEL_PROJECT_ID` | For deployment | Vercel project ID |
| `VERCEL_ORG_ID` | For deployment | Vercel org/team ID |
| `GITHUB_REPO_OWNER` | For CI/CD | GitHub repository owner |
| `GITHUB_REPO_NAME` | For CI/CD | GitHub repository name (default: nexus-bitcoin-banking) |
| `VERCEL_PROJECT_NAME` | Optional | Vercel project display name |
| `DEPLOY_DOMAIN` | Optional | Custom domain for deployment |
| `APP_ENV` | Optional | Environment (development/production) |
| `MAX_DAILY_TOKENS` | Optional | AI daily token budget (default: 500000) |
| `MAX_RUN_TOKENS` | Optional | AI per-run token budget (default: 100000) |
| `MAX_CALLS_PER_RUN` | Optional | AI daily call limit (default: 20) |

## Demo Script

### 1. Sign Up as Client

1. Open the app → Click "Get Started"
2. Fill in: Name, Email (e.g. `john@example.com`), Password
3. Click "Create Account"
4. You are redirected to the Client Dashboard

### 2. Create a Deposit

1. Navigate to **Deposits**
2. Enter amount (e.g. `10000`) → Click "Create Deposit"
3. A deposit with status `requested` appears

### 3. Sign Up as Admin

1. Sign out → Create a new account with email `admin@nexus-admin.com`
2. You are redirected to the Admin Dashboard

### 4. Admin: Simulate Inbound Payment

1. Go to **Admin → Deposits**
2. Find the deposit → Click "Simulate Inbound"
3. Status changes to `received`, webhook event created, fiat_in ledger entry posted

### 5. Admin: Settle Deposit

1. Click "Settle" on the received deposit
2. Status changes to `complete`
3. Fiat deducted, BTC credited to client's ledger at current rate
4. Receipt generated, notification and email queued

### 6. Admin: Approve Card

1. Switch to client account → Go to **Cards** → "Request Card"
2. Switch to admin → Go to **Admin → Cards**
3. Click "Approve & Issue" on the pending request
4. Card is created and appears in client's card list

### 7. Admin: Simulate Card Transaction

1. In **Admin → Cards**, find the issued card
2. Enter merchant/amount → Click "Simulate Tx"
3. BTC ledger debited, transaction recorded

### 8. Run Email Worker

1. Go to **Admin → Operations**
2. Click "Run Email Worker"
3. All queued emails marked as sent

## Key Invariants

- `deposits.deposit_reference` — globally unique
- `webhook_events.idempotency_key` — globally unique (prevents double-processing)
- `ledger_entries.idempotency_key` — globally unique (prevents double-posting)
- `db.query()` enforces RLS: non-admin users only see their own rows
- Repeating an already-processed webhook throws a UNIQUE violation (idempotent)

## Deployment

Push to GitHub → Vercel auto-deploys from the connected branch.

```bash
# Manual deploy via Vercel CLI
npx vercel --prod
```

See [docs/CREDIT_GOVERNANCE.md](docs/CREDIT_GOVERNANCE.md) for AI budget and cost management.
