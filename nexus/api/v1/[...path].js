/**
 * Catch-all API router for /api/v1/*
 *
 * All routes share one server-side MockDatabase instance (warm start).
 * Routes:
 *   POST   /api/v1/auth/signup
 *   POST   /api/v1/auth/signin
 *   POST   /api/v1/auth/signout
 *   GET    /api/v1/auth/me
 *
 *   GET    /api/v1/profile
 *   PATCH  /api/v1/profile
 *   GET    /api/v1/bank-accounts
 *   GET    /api/v1/portfolio
 *   GET    /api/v1/notifications
 *   GET    /api/v1/activity
 *
 *   GET    /api/v1/deposits
 *   POST   /api/v1/deposits
 *   GET    /api/v1/deposits/:id
 *
 *   GET    /api/v1/cards
 *   GET    /api/v1/cards/eligibility
 *   POST   /api/v1/cards/request
 *   GET    /api/v1/cards/requests
 *   GET    /api/v1/cards/transactions
 *
 *   GET    /api/v1/admin/dashboard
 *   GET    /api/v1/admin/clients
 *   GET    /api/v1/admin/clients/:id
 *   PATCH  /api/v1/admin/clients/:id/kyc
 *   GET    /api/v1/admin/deposits
 *   POST   /api/v1/admin/deposits/:id/simulate
 *   POST   /api/v1/admin/deposits/:id/settle
 *   GET    /api/v1/admin/cards/requests
 *   POST   /api/v1/admin/cards/requests/:id/approve
 *   GET    /api/v1/admin/cards
 *   POST   /api/v1/admin/cards/:id/transaction
 *   GET    /api/v1/admin/webhooks
 *   GET    /api/v1/admin/operations
 *   GET    /api/v1/admin/email/outbox
 *   POST   /api/v1/admin/email/process
 *   GET    /api/v1/admin/settings
 *   POST   /api/v1/admin/reset
 */

import db from '../_lib/database.js';
import {
  hashPassword,
  verifyPassword,
  createSession,
  destroySession,
  requireAuth,
  requireAdmin,
} from '../_lib/auth.js';
import {
  DepositService,
  CardService,
  LedgerService,
  AdminService,
  EmailWorkerService,
  ProfileService,
} from '../_lib/services.js';

// ── Helpers ──────────────────────────────────────────────────────

function json(res, data, status = 200) {
  return res.status(status).json(data);
}

function error(res, message, status = 400) {
  return res.status(status).json({ error: message });
}

function parsePath(query) {
  const raw = query.path;
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string') return raw.split('/');
  return [];
}

function readBody(req) {
  return req.body || {};
}

// ── Route Matching ───────────────────────────────────────────────

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();

  const segments = parsePath(req.query);
  const method = req.method;
  const path = '/' + segments.join('/');

  try {
    // ── Auth Routes ────────────────────────────────────────────

    if (path === '/auth/signup' && method === 'POST') {
      return handleSignup(req, res);
    }
    if (path === '/auth/signin' && method === 'POST') {
      return handleSignin(req, res);
    }
    if (path === '/auth/signout' && method === 'POST') {
      return handleSignout(req, res);
    }
    if (path === '/auth/me' && method === 'GET') {
      return handleMe(req, res);
    }

    // ── Client Routes (require auth) ───────────────────────────

    if (path === '/profile' && method === 'GET') {
      return handleGetProfile(req, res);
    }
    if (path === '/profile' && method === 'PATCH') {
      return handleUpdateProfile(req, res);
    }
    if (path === '/bank-accounts' && method === 'GET') {
      return handleGetBankAccounts(req, res);
    }
    if (path === '/portfolio' && method === 'GET') {
      return handleGetPortfolio(req, res);
    }
    if (path === '/notifications' && method === 'GET') {
      return handleGetNotifications(req, res);
    }
    if (path === '/activity' && method === 'GET') {
      return handleGetActivity(req, res);
    }

    // Deposits
    if (path === '/deposits' && method === 'GET') {
      return handleGetDeposits(req, res);
    }
    if (path === '/deposits' && method === 'POST') {
      return handleCreateDeposit(req, res);
    }
    if (segments[0] === 'deposits' && segments.length === 2 && method === 'GET') {
      return handleGetDepositById(req, res, segments[1]);
    }

    // Cards
    if (path === '/cards' && method === 'GET') {
      return handleGetCards(req, res);
    }
    if (path === '/cards/eligibility' && method === 'GET') {
      return handleCardEligibility(req, res);
    }
    if (path === '/cards/request' && method === 'POST') {
      return handleRequestCard(req, res);
    }
    if (path === '/cards/requests' && method === 'GET') {
      return handleGetCardRequests(req, res);
    }
    if (path === '/cards/transactions' && method === 'GET') {
      return handleGetCardTransactions(req, res);
    }

    // ── Admin Routes (require admin) ───────────────────────────

    if (path === '/admin/dashboard' && method === 'GET') {
      return handleAdminDashboard(req, res);
    }
    if (path === '/admin/clients' && method === 'GET') {
      return handleAdminClients(req, res);
    }
    if (segments[0] === 'admin' && segments[1] === 'clients' && segments.length === 3 && method === 'GET') {
      return handleAdminClientDetail(req, res, segments[2]);
    }
    if (segments[0] === 'admin' && segments[1] === 'clients' && segments.length === 4 && segments[3] === 'kyc' && method === 'PATCH') {
      return handleAdminUpdateKyc(req, res, segments[2]);
    }
    if (path === '/admin/deposits' && method === 'GET') {
      return handleAdminDeposits(req, res);
    }
    if (segments[0] === 'admin' && segments[1] === 'deposits' && segments.length === 4 && segments[3] === 'simulate' && method === 'POST') {
      return handleAdminSimulateInbound(req, res, segments[2]);
    }
    if (segments[0] === 'admin' && segments[1] === 'deposits' && segments.length === 4 && segments[3] === 'settle' && method === 'POST') {
      return handleAdminSettle(req, res, segments[2]);
    }
    if (path === '/admin/cards/requests' && method === 'GET') {
      return handleAdminCardRequests(req, res);
    }
    if (segments[0] === 'admin' && segments[1] === 'cards' && segments[2] === 'requests' && segments.length === 5 && segments[4] === 'approve' && method === 'POST') {
      return handleAdminApproveCard(req, res, segments[3]);
    }
    if (path === '/admin/cards' && method === 'GET') {
      return handleAdminCards(req, res);
    }
    if (segments[0] === 'admin' && segments[1] === 'cards' && segments.length === 4 && segments[3] === 'transaction' && method === 'POST') {
      return handleAdminSimulateTx(req, res, segments[2]);
    }
    if (path === '/admin/webhooks' && method === 'GET') {
      return handleAdminWebhooks(req, res);
    }
    if (path === '/admin/operations' && method === 'GET') {
      return handleAdminOperations(req, res);
    }
    if (path === '/admin/email/outbox' && method === 'GET') {
      return handleAdminEmailOutbox(req, res);
    }
    if (path === '/admin/email/process' && method === 'POST') {
      return handleAdminEmailProcess(req, res);
    }
    if (path === '/admin/settings' && method === 'GET') {
      return handleAdminSettings(req, res);
    }
    if (path === '/admin/reset' && method === 'POST') {
      return handleAdminReset(req, res);
    }

    return error(res, `Not found: ${method} /api/v1${path}`, 404);
  } catch (err) {
    console.error(`[API ERROR] ${method} /api/v1${path}:`, err.message);
    return error(res, err.message, 500);
  }
}

// ═══════════════════════════════════════════════════════════════════
// AUTH HANDLERS
// ═══════════════════════════════════════════════════════════════════

function handleSignup(req, res) {
  const { email, fullName, password } = readBody(req);
  if (!email || !fullName || !password) return error(res, 'Missing email, fullName, or password');
  if (password.length < 6) return error(res, 'Password must be at least 6 characters');

  const existing = db.query('profiles', { email }, { isAdmin: true });
  if (existing.length > 0) return error(res, 'Email already registered', 409);

  const profile = db.insert('profiles', {
    email,
    full_name: fullName,
    password_hash: hashPassword(password),
    kyc_status: 'pending',
    status: 'active',
    user_id: null,
  });

  db.update('profiles', profile.id, { user_id: profile.id });
  profile.user_id = profile.id;

  const isAdmin = email.endsWith('@nexus-admin.com');
  const roleRow = db.insert('roles', { user_id: profile.id, role: isAdmin ? 'admin' : 'client' });

  if (!isAdmin) {
    const depositRef = `NEX-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    db.insert('bank_accounts', {
      user_id: profile.id,
      bank_name: 'Nexus Custody Bank',
      account_number: `ACCT-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
      routing_number: '021000021',
      deposit_reference: depositRef,
      currency: 'USD',
      rail: 'ACH',
      status: 'active',
    });

    db.insert('ledger_accounts', { user_id: profile.id, type: 'fiat', currency: 'USD', label: 'USD Cash' });
    db.insert('ledger_accounts', { user_id: profile.id, type: 'bitcoin', currency: 'BTC', label: 'Bitcoin Holdings' });
    db.insert('notifications', { user_id: profile.id, type: 'welcome', title: 'Welcome to Nexus', message: 'Your account has been created. Complete KYC to unlock full features.', read: false });
    db.insert('email_outbox', { user_id: profile.id, to: email, subject: 'Welcome to Nexus Bitcoin Banking', body: `Hi ${fullName}, welcome to Nexus!`, status: 'queued' });
    db.insert('activity_log', { user_id: profile.id, action: 'signup', description: `User ${fullName} signed up` });
  }

  const token = createSession(profile.id);

  return json(res, {
    user: sanitizeProfile(profile),
    role: roleRow.role,
    token,
  }, 201);
}

function handleSignin(req, res) {
  const { email, password } = readBody(req);
  if (!email || !password) return error(res, 'Missing email or password');

  const profiles = db.query('profiles', { email }, { isAdmin: true });
  if (profiles.length === 0) return error(res, 'Invalid credentials', 401);

  const profile = profiles[0];
  if (!verifyPassword(password, profile.password_hash)) return error(res, 'Invalid credentials', 401);

  const roles = db.query('roles', { user_id: profile.id }, { isAdmin: true });
  const role = roles[0]?.role || 'client';

  db.insert('activity_log', { user_id: profile.id, action: 'signin', description: 'User signed in' });

  const token = createSession(profile.id);

  return json(res, {
    user: sanitizeProfile(profile),
    role,
    token,
  });
}

function handleSignout(req, res) {
  destroySession(req.headers.authorization);
  return json(res, { success: true });
}

function handleMe(req, res) {
  const auth = requireAuth(req, res);
  if (!auth) return;
  return json(res, {
    user: sanitizeProfile(auth.user),
    role: auth.role,
  });
}

// ═══════════════════════════════════════════════════════════════════
// CLIENT HANDLERS
// ═══════════════════════════════════════════════════════════════════

function handleGetProfile(req, res) {
  const auth = requireAuth(req, res);
  if (!auth) return;
  return json(res, { profile: sanitizeProfile(auth.user) });
}

function handleUpdateProfile(req, res) {
  const auth = requireAuth(req, res);
  if (!auth) return;
  const { fullName } = readBody(req);
  if (!fullName || !fullName.trim()) return error(res, 'Name cannot be empty');
  const updated = db.update('profiles', auth.user.id, { full_name: fullName.trim() });
  return json(res, { profile: sanitizeProfile(updated) });
}

function handleGetBankAccounts(req, res) {
  const auth = requireAuth(req, res);
  if (!auth) return;
  return json(res, { bankAccounts: ProfileService.getBankAccounts(auth.user.id) });
}

function handleGetPortfolio(req, res) {
  const auth = requireAuth(req, res);
  if (!auth) return;
  return json(res, { balances: LedgerService.getPortfolioBalances(auth.user.id) });
}

function handleGetNotifications(req, res) {
  const auth = requireAuth(req, res);
  if (!auth) return;
  return json(res, { notifications: ProfileService.getNotifications(auth.user.id) });
}

function handleGetActivity(req, res) {
  const auth = requireAuth(req, res);
  if (!auth) return;
  return json(res, { activity: ProfileService.getActivity(auth.user.id) });
}

function handleGetDeposits(req, res) {
  const auth = requireAuth(req, res);
  if (!auth) return;
  return json(res, { deposits: DepositService.getUserDeposits(auth.user.id) });
}

function handleCreateDeposit(req, res) {
  const auth = requireAuth(req, res);
  if (!auth) return;
  const { amount, currency } = readBody(req);
  const val = parseFloat(amount);
  if (!val || val <= 0) return error(res, 'Enter a valid amount');
  const deposit = DepositService.createDeposit({ userId: auth.user.id, amount: val, currency });
  return json(res, { deposit }, 201);
}

function handleGetDepositById(req, res, depositId) {
  const auth = requireAuth(req, res);
  if (!auth) return;
  const deposit = DepositService.getDepositById(depositId, auth.dbCtx);
  if (!deposit) return error(res, 'Deposit not found', 404);
  const entries = LedgerService.getEntriesByReference(deposit.deposit_reference, auth.dbCtx);
  return json(res, { deposit, ledgerEntries: entries });
}

function handleGetCards(req, res) {
  const auth = requireAuth(req, res);
  if (!auth) return;
  return json(res, { cards: CardService.getUserCards(auth.user.id) });
}

function handleCardEligibility(req, res) {
  const auth = requireAuth(req, res);
  if (!auth) return;
  return json(res, CardService.checkEligibility(auth.user.id));
}

function handleRequestCard(req, res) {
  const auth = requireAuth(req, res);
  if (!auth) return;
  const request = CardService.requestCard(auth.user.id);
  return json(res, { request }, 201);
}

function handleGetCardRequests(req, res) {
  const auth = requireAuth(req, res);
  if (!auth) return;
  return json(res, { requests: CardService.getUserCardRequests(auth.user.id) });
}

function handleGetCardTransactions(req, res) {
  const auth = requireAuth(req, res);
  if (!auth) return;
  return json(res, { transactions: CardService.getUserTransactions(auth.user.id) });
}

// ═══════════════════════════════════════════════════════════════════
// ADMIN HANDLERS
// ═══════════════════════════════════════════════════════════════════

function handleAdminDashboard(req, res) {
  const auth = requireAdmin(req, res);
  if (!auth) return;
  return json(res, { stats: AdminService.getDashboardStats() });
}

function handleAdminClients(req, res) {
  const auth = requireAdmin(req, res);
  if (!auth) return;
  return json(res, { clients: AdminService.getClients().map(sanitizeProfile) });
}

function handleAdminClientDetail(req, res, clientId) {
  const auth = requireAdmin(req, res);
  if (!auth) return;
  const detail = AdminService.getClientDetail(clientId);
  if (!detail) return error(res, 'Client not found', 404);
  detail.profile = sanitizeProfile(detail.profile);
  return json(res, detail);
}

function handleAdminUpdateKyc(req, res, clientId) {
  const auth = requireAdmin(req, res);
  if (!auth) return;
  const { status } = readBody(req);
  if (!['approved', 'pending', 'rejected'].includes(status)) return error(res, 'Invalid KYC status');
  const profile = AdminService.updateKycStatus(clientId, status);
  return json(res, { profile: sanitizeProfile(profile) });
}

function handleAdminDeposits(req, res) {
  const auth = requireAdmin(req, res);
  if (!auth) return;
  const deposits = DepositService.getAllDeposits();
  // Attach client names
  const enriched = deposits.map((d) => {
    const p = db.getById('profiles', d.user_id, { isAdmin: true });
    return { ...d, client_name: p?.full_name || p?.email || d.user_id };
  });
  return json(res, { deposits: enriched });
}

function handleAdminSimulateInbound(req, res, depositId) {
  const auth = requireAdmin(req, res);
  if (!auth) return;
  const deposit = DepositService.simulateInboundPayment(depositId);
  return json(res, { deposit });
}

function handleAdminSettle(req, res, depositId) {
  const auth = requireAdmin(req, res);
  if (!auth) return;
  const { btcRate } = readBody(req);
  const deposit = DepositService.settleDeposit(depositId, btcRate ? { btcRate: parseFloat(btcRate) } : {});
  return json(res, { deposit });
}

function handleAdminCardRequests(req, res) {
  const auth = requireAdmin(req, res);
  if (!auth) return;
  const requests = CardService.getAllCardRequests();
  const enriched = requests.map((r) => {
    const p = db.getById('profiles', r.user_id, { isAdmin: true });
    return { ...r, client_name: p?.full_name || p?.email || r.user_id };
  });
  return json(res, { requests: enriched });
}

function handleAdminApproveCard(req, res, requestId) {
  const auth = requireAdmin(req, res);
  if (!auth) return;
  const card = CardService.approveAndIssueCard(requestId);
  return json(res, { card });
}

function handleAdminCards(req, res) {
  const auth = requireAdmin(req, res);
  if (!auth) return;
  const cards = CardService.getAllCards();
  const enriched = cards.map((c) => {
    const p = db.getById('profiles', c.user_id, { isAdmin: true });
    return { ...c, client_name: p?.full_name || p?.email || c.user_id };
  });
  return json(res, { cards: enriched });
}

function handleAdminSimulateTx(req, res, cardId) {
  const auth = requireAdmin(req, res);
  if (!auth) return;
  const { amount, merchant, btcRate } = readBody(req);
  const tx = CardService.simulateCardTransaction(cardId, {
    amount: parseFloat(amount) || 50,
    merchant: merchant || 'Coffee Shop',
    btcRate: parseFloat(btcRate) || 65000,
  });
  return json(res, { transaction: tx });
}

function handleAdminWebhooks(req, res) {
  const auth = requireAdmin(req, res);
  if (!auth) return;
  return json(res, { events: AdminService.getWebhookEvents() });
}

function handleAdminOperations(req, res) {
  const auth = requireAdmin(req, res);
  if (!auth) return;
  return json(res, { operations: AdminService.getOperationsLog() });
}

function handleAdminEmailOutbox(req, res) {
  const auth = requireAdmin(req, res);
  if (!auth) return;
  return json(res, { outbox: EmailWorkerService.getOutbox() });
}

function handleAdminEmailProcess(req, res) {
  const auth = requireAdmin(req, res);
  if (!auth) return;
  const result = EmailWorkerService.processQueue();
  return json(res, result);
}

function handleAdminSettings(req, res) {
  const auth = requireAdmin(req, res);
  if (!auth) return;
  const tables = [
    'profiles', 'roles', 'sessions', 'bank_accounts', 'ledger_accounts',
    'deposits', 'ledger_entries', 'bitcoin_cards', 'card_requests',
    'card_transactions', 'webhook_events', 'operations_log',
    'email_outbox', 'notifications', 'activity_log',
  ];
  const stats = {};
  for (const t of tables) stats[t] = db.count(t);
  return json(res, { admin: sanitizeProfile(auth.user), tableStats: stats });
}

function handleAdminReset(req, res) {
  const auth = requireAdmin(req, res);
  if (!auth) return;
  db.reset();
  return json(res, { success: true, message: 'Database reset' });
}

// ── Sanitize (strip password_hash) ───────────────────────────────

function sanitizeProfile(p) {
  if (!p) return p;
  const { password_hash, ...rest } = p;
  return rest;
}
