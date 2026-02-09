/**
 * CardService
 *
 * Handles card eligibility, requests, approval, issuance, and transaction simulation.
 * Enforces idempotency on ledger entries for card transactions.
 */
import db from '../db/MockDatabase';

const CardService = {
  /**
   * Check if a user is eligible for a bitcoin card.
   * Requirements: KYC approved, at least one settled deposit.
   */
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

    // Check for existing pending request
    const pendingRequests = db.query('card_requests', { user_id: userId, status: 'requested' }, { isAdmin: true });
    if (pendingRequests.length > 0) {
      return { eligible: false, reason: 'You already have a pending card request' };
    }

    // Check for existing active card
    const activeCards = db.query('bitcoin_cards', { user_id: userId, status: 'active' }, { isAdmin: true });
    if (activeCards.length > 0) {
      return { eligible: false, reason: 'You already have an active card' };
    }

    return { eligible: true, reason: null };
  },

  /**
   * Client: request a new bitcoin card.
   */
  requestCard(userId) {
    const eligibility = this.checkEligibility(userId);
    if (!eligibility.eligible) {
      throw new Error(eligibility.reason);
    }

    const request = db.insert('card_requests', {
      user_id: userId,
      status: 'requested',
      card_type: 'virtual',
    });

    db.insert('activity_log', {
      user_id: userId,
      action: 'card_requested',
      description: 'Bitcoin card requested',
    });

    db.insert('operations_log', {
      type: 'card',
      action: 'request',
      reference: request.id,
      details: `Card request ${request.id} from user ${userId}`,
    });

    return request;
  },

  /**
   * Admin: approve a card request and issue the card.
   */
  approveAndIssueCard(requestId) {
    const request = db.getById('card_requests', requestId, { isAdmin: true });
    if (!request) throw new Error('Card request not found');
    if (request.status !== 'requested') throw new Error(`Request is ${request.status}, expected requested`);

    // Update request status
    db.update('card_requests', requestId, { status: 'approved' });

    // Issue the card
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

    db.insert('notifications', {
      user_id: request.user_id,
      type: 'card_issued',
      title: 'Card Issued',
      message: `Your Bitcoin card ending in ${last4} has been issued and is ready to use.`,
      read: false,
    });

    db.insert('email_outbox', {
      user_id: request.user_id,
      to: db.getById('profiles', request.user_id, { isAdmin: true })?.email || 'unknown',
      subject: 'Your Bitcoin Card is Ready',
      body: `Your Nexus Bitcoin card ending in ${last4} is now active.`,
      status: 'queued',
    });

    db.insert('activity_log', {
      user_id: request.user_id,
      action: 'card_issued',
      description: `Card ending ${last4} issued`,
    });

    db.insert('operations_log', {
      type: 'card',
      action: 'approved_and_issued',
      reference: card.id,
      details: `Card ${last4} issued for request ${requestId}`,
    });

    return card;
  },

  /**
   * Admin: simulate a card transaction.
   * Debits BTC ledger account. Idempotent via ledger idempotency_key.
   */
  simulateCardTransaction(cardId, { amount = 50, merchant = 'Coffee Shop', btcRate = 65000 } = {}) {
    const card = db.getById('bitcoin_cards', cardId, { isAdmin: true });
    if (!card) throw new Error('Card not found');
    if (card.status !== 'active') throw new Error('Card is not active');

    const btcAmount = amount / btcRate;
    const txRef = `TX-${Date.now().toString(36).toUpperCase()}`;

    // Record card transaction
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

    // Debit BTC ledger (idempotent)
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

    // Update daily spending
    db.update('bitcoin_cards', cardId, {
      spent_today: (card.spent_today || 0) + amount,
    });

    db.insert('operations_log', {
      type: 'card',
      action: 'transaction',
      reference: txRef,
      details: `Card tx at ${merchant}: $${amount}`,
    });

    return tx;
  },

  /** Get cards for a user. */
  getUserCards(userId) {
    return db.query('bitcoin_cards', { user_id: userId }, { userId });
  },

  /** Get card requests for a user. */
  getUserCardRequests(userId) {
    return db.query('card_requests', { user_id: userId }, { userId });
  },

  /** Get all card requests (admin). */
  getAllCardRequests() {
    return db.query('card_requests', {}, { isAdmin: true });
  },

  /** Get all cards (admin). */
  getAllCards() {
    return db.query('bitcoin_cards', {}, { isAdmin: true });
  },

  /** Get all card transactions (admin). */
  getAllTransactions() {
    return db.query('card_transactions', {}, { isAdmin: true });
  },
};

export default CardService;
