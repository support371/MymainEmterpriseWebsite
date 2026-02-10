# Test Coverage Analysis

## Current State

**Test coverage: 0%.** The codebase has no test files, no testing frameworks installed,
no test scripts in either `package.json`, and no test step in the CI/CD pipeline
(`.github/workflows/nextjs.yml`).

This applies to both projects in the monorepo:

| Project | Framework | Test framework | Test files |
|---|---|---|---|
| Main (GEM Cybersecurity) | Next.js 16 / TypeScript | None | 0 |
| Nexus (Bitcoin Banking) | Vite / React 18 | None | 0 |

---

## Priority 1 — Security-Critical Paths (High Risk)

These areas handle authentication, authorization, and sensitive data. Bugs here
have the most severe consequences.

### 1.1 Admin Authentication (`src/lib/adminAuth.ts`, `src/middleware.ts`)

**What to test:**
- `isValidAdminToken()` rejects empty strings, `null`, `undefined`, and wrong tokens
- `isValidAdminToken()` accepts only the configured `ADMIN_ACCESS_TOKEN`
- Middleware allows `/admin/login` without a session cookie
- Middleware redirects unauthenticated requests to `/admin/login?next=<original_path>`
- Middleware passes authenticated requests through unchanged
- Redirect URL preserves query string parameters

**Why it matters:** A regression here exposes the entire admin panel (inbox, teams,
organizations, grants, diagnostics) to unauthenticated users.

### 1.2 Admin Login / Logout API (`src/app/api/admin/login/route.ts`, `src/app/api/admin/logout/route.ts`)

**What to test:**
- POST with valid token returns 200 and sets `gem_admin_session` cookie with
  `httpOnly`, `sameSite=lax`, and correct `maxAge`
- POST with invalid token returns 401 and does not set a cookie
- POST with non-string token body returns 401
- Logout clears the cookie and redirects to `/admin/login`

**Why it matters:** The login endpoint is the only entry point for admin access.
The cookie flags (`httpOnly`, `secure`) are the primary XSS mitigation.

### 1.3 Nexus Auth Provider (`nexus/src/providers/AuthProvider.jsx`)

**What to test:**
- `signUp()` rejects duplicate emails
- `signIn()` rejects wrong password
- `signIn()` rejects non-existent email
- Signup creates corresponding `ledger_accounts` (USD + BTC) and `roles` rows
- Admin role is assigned when email matches `@nexus-admin.com`
- `signOut()` clears the current user state

**Why it matters:** Auth logic controls who can access client vs. admin dashboards
in the Nexus platform. The password hashing uses `btoa` (base64), which is
not cryptographic — tests should document this known limitation.

---

## Priority 2 — Business Logic & Data Integrity (High Value)

These modules enforce financial invariants. Silent failures here could lead to
incorrect balances or duplicate transactions.

### 2.1 MockDatabase (`nexus/src/db/MockDatabase.js`)

**What to test:**
- `insert()` returns a row with auto-generated `id` and `created_at`
- `insert()` throws on UNIQUE violation (`deposit_reference`, `idempotency_key`)
- `query()` RLS: non-admin user only sees rows where `user_id` matches
- `query()` RLS: admin sees all rows
- `query()` with filters returns correct subset
- `getById()` returns `null` for missing rows
- `update()` throws on UNIQUE violation for updated fields
- `update()` sets `updated_at` timestamp
- `delete()` returns `false` when row doesn't exist
- `reset()` clears all tables and resets ID counter
- `subscribe()` fires listeners on insert/update/delete
- `getPortfolioBalances()` computes correct credit minus debit totals

**Why it matters:** Every service in Nexus depends on this module. A bug in RLS
simulation or uniqueness enforcement breaks the entire data layer.

### 2.2 Deposit Service (`nexus/src/services/DepositService.js`)

**What to test:**
- `createDeposit()` rejects amount <= 0
- `createDeposit()` generates a unique `deposit_reference`
- Full lifecycle: requested → received → complete
- `simulateInboundPayment()` creates a fiat ledger credit entry
- `settleDeposit()` creates both a fiat debit and a BTC credit entry
- `settleDeposit()` uses the correct BTC conversion rate
- Idempotency keys prevent duplicate ledger entries
- State transition violations throw (e.g., settling a non-received deposit)

**Why it matters:** This is the core deposit flow. Double-crediting or
miscalculating a BTC conversion is the highest-impact financial bug.

### 2.3 Card Service (`nexus/src/services/CardService.js`)

**What to test:**
- `checkEligibility()` requires KYC approval + at least one settled deposit
- `checkEligibility()` rejects users with a pending request or active card
- `requestCard()` → `approveAndIssueCard()` lifecycle produces an active card
- `simulateCardTransaction()` debits the correct ledger account
- `simulateCardTransaction()` rejects transactions on non-active cards
- Idempotency key on ledger entry (`card_tx_<id>`)

**Why it matters:** Card issuance has multi-step eligibility checks that are
easy to regress when modifying business rules.

### 2.4 Ledger Service (`nexus/src/services/LedgerService.js`)

**What to test:**
- `getAccountBalance()` returns correct sum of credits minus debits
- `getUserEntries()` only returns entries belonging to the user
- `getPortfolioBalances()` aggregates across multiple accounts

**Why it matters:** Balance calculation correctness is fundamental for any
financial platform.

---

## Priority 3 — API Routes & Input Validation (Medium Risk)

### 3.1 Contact Form API (`src/app/api/contact/route.ts`)

**What to test:**
- Returns 400 when required fields (name, email, company, service, message) are missing
- Returns 400 when email lacks `@`
- Successful submission creates a `ContactMessage` record
- Business-email detection regex categorizes correctly
  (e.g., `user@company.com` = business, `user@gmail.com` = free)
- Error in email sending does not prevent message storage (graceful degradation)

**Why it matters:** The contact form is public-facing. A crash here loses leads.

### 3.2 Admin Inbox API (`src/app/api/admin/inbox/route.ts`)

**What to test:**
- GET returns messages filtered by `status` and `q` parameters
- GET with `format=csv` returns a CSV response with correct Content-Type header
- PATCH returns 400 when `id` is missing
- PATCH returns 404 when message is not found
- PATCH updates status, assignedToUserId, tags correctly

**Why it matters:** The inbox is the admin's primary tool for managing contacts.
Filtering bugs hide messages; update bugs lose triage state.

### 3.3 Newsletter API (`src/app/api/newsletter/route.ts`)

**What to test:**
- Returns 400 for empty or missing email
- Returns 400 for email without `@`
- Returns 200 with success message for valid email

**Why it matters:** Low complexity, but it's a public endpoint — basic
validation tests prevent regressions.

### 3.4 Contact Message Library (`src/lib/contactMessages.ts`)

**What to test:**
- `createContactMessage()` generates a unique `id` and sets `status: 'open'`
- `listContactMessages()` filters by status, assignedToUserId, and free-text search
- `updateContactMessage()` returns `null` for non-existent IDs
- `toCsv()` escapes double quotes and commas in field values
- `toCsv()` produces correct header row

**Why it matters:** This is the data-access layer for all contact messages.
The CSV export function in particular needs to handle special characters
correctly or admin downloads will be corrupted.

---

## Priority 4 — AI Endpoints (Medium Risk)

### 4.1 AI Review & Generate APIs (`nexus/api/ai-review.js`, `nexus/api/ai-generate.js`)

**What to test:**
- Returns 405 for non-POST methods
- Returns 400 when `provider` or `prompt` is missing
- Returns 429 when daily token budget is exceeded
- Returns 429 when per-run call limit is reached
- Cache hit returns previous response without API call
- Token estimation (`length / 4`) edge cases
- Correct system prompts are sent for each provider

**Why it matters:** Budget enforcement prevents runaway API costs. Without
tests, a regression could blow through the daily budget silently.

---

## Priority 5 — Admin Service & KYC (Lower Risk)

### 5.1 Admin Service (`nexus/src/services/AdminService.js`)

**What to test:**
- `getDashboardStats()` returns correct aggregate counts
- `getClientDetail()` returns all associated records for a given user
- `updateKycStatus()` creates audit trail entries (activity_log, operations_log)
- `updateKycStatus()` throws for non-existent client

### 5.2 Email Worker Service (`nexus/src/services/EmailWorkerService.js`)

**What to test:**
- `processQueue()` marks all queued emails as sent
- `processQueue()` creates operations_log entries
- `getOutbox()` returns all email records

---

## Recommended Framework Setup

### Main Project (Next.js 16 / TypeScript)

```bash
npm install --save-dev vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```

**Why Vitest:** Native ESM support, fast execution, compatible with the
Next.js ecosystem. Lighter than Jest for a project of this size.

Suggested config (`vitest.config.ts`):
```ts
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
```

### Nexus Project (Vite / React 18)

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
```

Vitest integrates natively with the existing Vite config. Add to
`vite.config.js`:
```js
export default defineConfig({
  // ...existing config
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
```

### CI/CD Update (`.github/workflows/nextjs.yml`)

Add a test step between install and build:
```yaml
- name: Run tests
  run: npm test
- name: Run Nexus tests
  run: cd nexus && npm test
```

---

## Suggested File Structure

```
src/
  __tests__/
    setup.ts
    lib/
      adminAuth.test.ts
      contactMessages.test.ts
    api/
      contact.test.ts
      newsletter.test.ts
      admin/
        login.test.ts
        logout.test.ts
        inbox.test.ts
    middleware.test.ts

nexus/
  src/
    __tests__/
      db/
        MockDatabase.test.js
      services/
        DepositService.test.js
        CardService.test.js
        LedgerService.test.js
        AdminService.test.js
        EmailWorkerService.test.js
      providers/
        AuthProvider.test.jsx
```

---

## Summary Table

| Area | Priority | Risk | Effort | Files to test |
|---|---|---|---|---|
| Admin auth + middleware | P1 | High | Low | 2 |
| Admin login/logout API | P1 | High | Low | 2 |
| Nexus AuthProvider | P1 | High | Medium | 1 |
| MockDatabase | P2 | High | Medium | 1 |
| DepositService | P2 | High | Medium | 1 |
| CardService | P2 | High | Medium | 1 |
| LedgerService | P2 | Medium | Low | 1 |
| Contact form API | P3 | Medium | Low | 1 |
| Admin inbox API | P3 | Medium | Medium | 1 |
| contactMessages lib | P3 | Medium | Low | 1 |
| Newsletter API | P3 | Low | Low | 1 |
| AI endpoints | P4 | Medium | Medium | 2 |
| AdminService | P5 | Low | Low | 1 |
| EmailWorkerService | P5 | Low | Low | 1 |

Starting with P1 and P2 covers the most critical paths with the highest
return on investment.
