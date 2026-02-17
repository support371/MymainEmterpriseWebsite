/**
 * Server-side business logic services.
 *
 * These operate on the shared server-side MockDatabase instance.
 * All idempotency invariants are enforced here.
 */

import db from './database.js';

// ── Deposit Service ──────────────────────────────────────────────

export const DepositService = {
  createDeposit({ userId, amount, currency = 'USD' }) {
    if (!userId || !amount || amount <= 0) throw new Error('Invalid deposit parameters');

    const ref = `DEP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    const deposit = db.insert('deposits', {
      user_id: userId,
      amount,
      currency,
      status: 'requested',
      deposit_reference: ref,
      receipt_json: null,
    });

    db.insert('activity_log', {
      user_id: userId,
      action: 'deposit_requested',
      description: `Deposit ${ref} for ${currency} ${amount} requested`,
    });

    db.insert('operations_log', {
      type: 'deposit',
      action: 'create',
      reference: ref,
      details: `Deposit ${ref} created for user ${userId}`,
    });

    return deposit;
  },

  simulateInboundPayment(depositId) {
    const deposit = db.getById('deposits', depositId, { isAdmin: true });
    if (!deposit) throw new Error('Deposit not found');
    if (deposit.status !== 'requested') throw new Error(`Deposit is ${deposit.status}, expected requested`);

    const idempotencyKey = `webhook_inbound_${depositId}`;

    db.insert('webhook_events', {
      idempotency_key: idempotencyKey,
      type: 'inbound_payment',
      deposit_id: depositId,
      payload: JSON.stringify({ depositId, amount: deposit.amount, currency: deposit.currency }),
      status: 'processed',
    });

    db.update('deposits', depositId, { status: 'received' });

    const fiatAccounts = db.query('ledger_accounts', { user_id: deposit.user_id, type: 'fiat' }, { isAdmin: true });
    if (fiatAccounts.length === 0) throw new Error('No fiat ledger account');

    db.insert('ledger_entries', {
      idempotency_key: `fiat_in_${depositId}`,
      account_id: fiatAccounts[0].id,
      user_id: deposit.user_id,
      type: 'fiat_in',
      credit: deposit.amount,
      debit: 0,
      currency: deposit.currency,
      reference: deposit.deposit_reference,
      description: `Inbound payment received for deposit ${deposit.deposit_reference}`,
    });

    db.insert('operations_log', {
      type: 'deposit',
      action: 'inbound_simulated',
      reference: deposit.deposit_reference,
      details: `Inbound payment simulated for ${deposit.deposit_reference}`,
    });

    return db.getById('deposits', depositId, { isAdmin: true });
  },

  settleDeposit(depositId, { btcRate = 65000 } = {}) {
    const deposit = db.getById('deposits', depositId, { isAdmin: true });
    if (!deposit) throw new Error('Deposit not found');
    if (deposit.status !== 'received') throw new Error(`Deposit is ${deposit.status}, expected received`);

    const btcAmount = deposit.amount / btcRate;

    const btcAccounts = db.query('ledger_accounts', { user_id: deposit.user_id, type: 'bitcoin' }, { isAdmin: true });
    if (btcAccounts.length === 0) throw new Error('No BTC ledger account');

    const fiatAccounts = db.query('ledger_accounts', { user_id: deposit.user_id, type: 'fiat' }, { isAdmin: true });

    db.insert('ledger_entries', {
      idempotency_key: `conversion_debit_${depositId}`,
      account_id: fiatAccounts[0].id,
      user_id: deposit.user_id,
      type: 'conversion',
      credit: 0,
      debit: deposit.amount,
      currency: deposit.currency,
      reference: deposit.deposit_reference,
      description: `Fiat converted to BTC at rate ${btcRate}`,
    });

    db.insert('ledger_entries', {
      idempotency_key: `conversion_credit_${depositId}`,
      account_id: btcAccounts[0].id,
      user_id: deposit.user_id,
      type: 'conversion',
      credit: btcAmount,
      debit: 0,
      currency: 'BTC',
      reference: deposit.deposit_reference,
      description: `Received ${btcAmount.toFixed(8)} BTC at rate ${btcRate}`,
    });

    const receipt = {
      deposit_reference: deposit.deposit_reference,
      fiat_amount: deposit.amount,
      fiat_currency: deposit.currency,
      btc_amount: btcAmount,
      btc_rate: btcRate,
      settled_at: new Date().toISOString(),
    };

    db.update('deposits', depositId, {
      status: 'complete',
      receipt_json: JSON.stringify(receipt),
    });

    db.insert('notifications', {
      user_id: deposit.user_id,
      type: 'deposit_settled',
      title: 'Deposit Settled',
      message: `Your deposit of ${deposit.currency} ${deposit.amount} has been converted to ${btcAmount.toFixed(8)} BTC.`,
      read: false,
    });

    const profile = db.getById('profiles', deposit.user_id, { isAdmin: true });
    db.insert('email_outbox', {
      user_id: deposit.user_id,
      to: profile?.email || 'unknown',
      subject: 'Deposit Settled',
      body: `Your deposit ${deposit.deposit_reference} has been settled. ${btcAmount.toFixed(8)} BTC credited.`,
      status: 'queued',
    });

    db.insert('operations_log', {
      type: 'deposit',
      action: 'settled',
      reference: deposit.deposit_reference,
      details: `Deposit settled: ${deposit.amount} ${deposit.currency} → ${btcAmount.toFixed(8)} BTC`,
    });

    return db.getById('deposits', depositId, { isAdmin: true });
  },

  getUserDeposits(userId) {
    return db.query('deposits', { user_id: userId }, { userId });
  },

  getDepositById(depositId, ctx) {
    return db.getById('deposits', depositId, ctx);
  },

  getAllDeposits() {
    return db.query('deposits', {}, { isAdmin: true });
  },
};

// ── Card Service ─────────────────────────────────────────────────

export const CardService = {
  checkEligibility(userId) {
    const profile = db.getById('profiles', userId, { isAdmin: true });
    if (!profile) return { eligible: false, reason: 'User not found' };
    if (profile.kyc_status !== 'approved') {
      return { eligible: false, reason: 'KYC not approved' };
    }

    const deposits = db.query('deposits', { user_id: userId, status: 'complete' }, { isAdmin: true });
    if (deposits.length === 0) {
      return { eligible: false, reason: 'No settled deposits. Complete at least one deposit first.' };
    }

    const pendingRequests = db.query('card_requests', { user_id: userId, status: 'requested' }, { isAdmin: true });
    if (pendingRequests.length > 0) {
      return { eligible: false, reason: 'You already have a pending card request' };
    }

    const activeCards = db.query('bitcoin_cards', { user_id: userId, status: 'active' }, { isAdmin: true });
    if (activeCards.length > 0) {
      return { eligible: false, reason: 'You already have an active card' };
    }

    return { eligible: true, reason: null };
  },

  requestCard(userId) {
    const eligibility = this.checkEligibility(userId);
    if (!eligibility.eligible) throw new Error(eligibility.reason);

    const request = db.insert('card_requests', {
      user_id: userId,
      status: 'requested',
      card_type: 'virtual',
    });

    db.insert('activity_log', { user_id: userId, action: 'card_requested', description: 'Bitcoin card requested' });
    db.insert('operations_log', { type: 'card', action: 'request', reference: request.id, details: `Card request from user ${userId}` });

    return request;
  },

  approveAndIssueCard(requestId) {
    const request = db.getById('card_requests', requestId, { isAdmin: true });
    if (!request) throw new Error('Card request not found');
    if (request.status !== 'requested') throw new Error(`Request is ${request.status}, expected requested`);

    db.update('card_requests', requestId, { status: 'approved' });

    const last4 = Math.floor(1000 + Math.random() * 9000).toString();
    const card = db.insert('bitcoin_cards', {
      user_id: request.user_id,
      request_id: requestId,
      card_number_last4: last4,
      card_type: request.card_type || 'virtual',
      status: 'active',
      spending_limit: 5000,
      spent_today: 0,
    });

    db.insert('notifications', { user_id: request.user_id, type: 'card_issued', title: 'Card Issued', message: `Your Bitcoin card ending in ${last4} has been issued.`, read: false });
    const profile = db.getById('profiles', request.user_id, { isAdmin: true });
    db.insert('email_outbox', { user_id: request.user_id, to: profile?.email || 'unknown', subject: 'Your Bitcoin Card is Ready', body: `Your Nexus Bitcoin card ending in ${last4} is now active.`, status: 'queued' });
    db.insert('activity_log', { user_id: request.user_id, action: 'card_issued', description: `Card ending ${last4} issued` });
    db.insert('operations_log', { type: 'card', action: 'approved_and_issued', reference: card.id, details: `Card ${last4} issued for request ${requestId}` });

    return card;
  },

  simulateCardTransaction(cardId, { amount = 50, merchant = 'Coffee Shop', btcRate = 65000 } = {}) {
    const card = db.getById('bitcoin_cards', cardId, { isAdmin: true });
    if (!card) throw new Error('Card not found');
    if (card.status !== 'active') throw new Error('Card is not active');

    const btcAmount = amount / btcRate;
    const txRef = `TX-${Date.now().toString(36).toUpperCase()}`;

    const tx = db.insert('card_transactions', {
      card_id: cardId,
      user_id: card.user_id,
      amount,
      currency: 'USD',
      btc_amount: btcAmount,
      merchant,
      status: 'authorized',
      reference: txRef,
    });

    const btcAccounts = db.query('ledger_accounts', { user_id: card.user_id, type: 'bitcoin' }, { isAdmin: true });
    if (btcAccounts.length === 0) throw new Error('No BTC ledger account');

    db.insert('ledger_entries', {
      idempotency_key: `card_tx_${tx.id}`,
      account_id: btcAccounts[0].id,
      user_id: card.user_id,
      type: 'card_spend',
      credit: 0,
      debit: btcAmount,
      currency: 'BTC',
      reference: txRef,
      description: `Card spend at ${merchant}: $${amount} (${btcAmount.toFixed(8)} BTC)`,
    });

    db.update('bitcoin_cards', cardId, { spent_today: (card.spent_today || 0) + amount });
    db.insert('operations_log', { type: 'card', action: 'transaction', reference: txRef, details: `Card tx at ${merchant}: $${amount}` });

    return tx;
  },

  getUserCards(userId) {
    return db.query('bitcoin_cards', { user_id: userId }, { userId });
  },

  getUserCardRequests(userId) {
    return db.query('card_requests', { user_id: userId }, { userId });
  },

  getUserTransactions(userId) {
    return db.query('card_transactions', { user_id: userId }, { userId });
  },

  getAllCardRequests() {
    return db.query('card_requests', {}, { isAdmin: true });
  },

  getAllCards() {
    return db.query('bitcoin_cards', {}, { isAdmin: true });
  },
};

// ── Ledger Service ───────────────────────────────────────────────

export const LedgerService = {
  getUserEntries(userId) {
    return db.query('ledger_entries', { user_id: userId }, { userId });
  },

  getAllEntries() {
    return db.query('ledger_entries', {}, { isAdmin: true });
  },

  getPortfolioBalances(userId) {
    return db.getPortfolioBalances(userId);
  },

  getEntriesByReference(reference, ctx) {
    return db.query('ledger_entries', { reference }, ctx);
  },
};

// ── Admin Service ────────────────────────────────────────────────

export const AdminService = {
  getDashboardStats() {
    return {
      totalClients: db.count('profiles'),
      pendingKyc: db.query('profiles', { kyc_status: 'pending' }, { isAdmin: true }).length,
      totalDeposits: db.count('deposits'),
      requestedDeposits: db.query('deposits', { status: 'requested' }, { isAdmin: true }).length,
      receivedDeposits: db.query('deposits', { status: 'received' }, { isAdmin: true }).length,
      completedDeposits: db.query('deposits', { status: 'complete' }, { isAdmin: true }).length,
      totalCards: db.count('bitcoin_cards'),
      pendingCardRequests: db.query('card_requests', { status: 'requested' }, { isAdmin: true }).length,
      webhookEvents: db.count('webhook_events'),
      operationsCount: db.count('operations_log'),
      queuedEmails: db.query('email_outbox', { status: 'queued' }, { isAdmin: true }).length,
    };
  },

  getClients() {
    const roles = db.query('roles', { role: 'client' }, { isAdmin: true });
    const clientIds = new Set(roles.map((r) => r.user_id));
    return db.all('profiles').filter((p) => clientIds.has(p.id));
  },

  getClientDetail(clientId) {
    const profile = db.getById('profiles', clientId, { isAdmin: true });
    if (!profile) return null;
    return {
      profile,
      bankAccounts: db.query('bank_accounts', { user_id: clientId }, { isAdmin: true }),
      balances: db.getPortfolioBalances(clientId),
      deposits: db.query('deposits', { user_id: clientId }, { isAdmin: true }),
      cards: db.query('bitcoin_cards', { user_id: clientId }, { isAdmin: true }),
      cardRequests: db.query('card_requests', { user_id: clientId }, { isAdmin: true }),
      ledgerEntries: db.query('ledger_entries', { user_id: clientId }, { isAdmin: true }),
      activity: db.query('activity_log', { user_id: clientId }, { isAdmin: true }),
      notifications: db.query('notifications', { user_id: clientId }, { isAdmin: true }),
    };
  },

  updateKycStatus(clientId, status) {
    const profile = db.update('profiles', clientId, { kyc_status: status });
    if (!profile) throw new Error('Profile not found');

    db.insert('activity_log', { user_id: clientId, action: 'kyc_update', description: `KYC status updated to ${status}` });
    db.insert('notifications', { user_id: clientId, type: 'kyc_update', title: 'KYC Status Updated', message: `Your KYC status has been updated to: ${status}`, read: false });
    db.insert('operations_log', { type: 'kyc', action: 'status_change', reference: clientId, details: `KYC for ${profile.email} set to ${status}` });

    return profile;
  },

  getWebhookEvents() {
    return db.query('webhook_events', {}, { isAdmin: true });
  },

  getOperationsLog() {
    return db.query('operations_log', {}, { isAdmin: true });
  },
};

// ── Email Worker Service ─────────────────────────────────────────

export const EmailWorkerService = {
  processQueue() {
    const queued = db.query('email_outbox', { status: 'queued' }, { isAdmin: true });
    let processed = 0;
    for (const email of queued) {
      db.update('email_outbox', email.id, { status: 'sent', sent_at: new Date().toISOString() });
      db.insert('operations_log', { type: 'email', action: 'sent', reference: email.id, details: `Email to ${email.to}: "${email.subject}"` });
      processed++;
    }
    return { processed, total: queued.length };
  },

  getOutbox() {
    return db.query('email_outbox', {}, { isAdmin: true });
  },
};

// ── Profile / Bank Account helpers ───────────────────────────────

export const ProfileService = {
  getProfile(userId) {
    return db.getById('profiles', userId, { isAdmin: true });
  },

  updateProfile(userId, updates) {
    return db.update('profiles', userId, updates);
  },

  getBankAccounts(userId) {
    return db.query('bank_accounts', { user_id: userId }, { userId });
  },

  getNotifications(userId) {
    return db.query('notifications', { user_id: userId }, { userId });
  },

  markNotificationRead(notificationId, userId) {
    return db.update('notifications', notificationId, { read: true });
  },

  getActivity(userId) {
    return db.query('activity_log', { user_id: userId }, { userId });
  },
};
