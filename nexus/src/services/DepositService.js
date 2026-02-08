/**
 * DepositService
 *
 * Handles deposit creation, inbound payment simulation, and settlement.
 * Enforces idempotency via deposit_reference uniqueness and webhook idempotency_key.
 */
import db from '../db/MockDatabase';

const DepositService = {
  /**
   * Create a new deposit request (status: requested).
   */
  createDeposit({ userId, amount, currency = 'USD' }) {
    if (!userId || !amount || amount <= 0) {
      throw new Error('Invalid deposit parameters');
    }

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

  /**
   * Admin: simulate an inbound bank payment (webhook).
   * Sets deposit to "received" and records fiat_in ledger entry.
   * Idempotent: same idempotency_key is rejected (unique constraint).
   */
  simulateInboundPayment(depositId) {
    const deposit = db.getById('deposits', depositId, { isAdmin: true });
    if (!deposit) throw new Error('Deposit not found');
    if (deposit.status !== 'requested') throw new Error(`Deposit is ${deposit.status}, expected requested`);

    const idempotencyKey = `webhook_inbound_${depositId}`;

    // Record webhook event (idempotent — duplicate key throws)
    db.insert('webhook_events', {
      idempotency_key: idempotencyKey,
      type: 'inbound_payment',
      deposit_id: depositId,
      payload: JSON.stringify({ depositId, amount: deposit.amount, currency: deposit.currency }),
      status: 'processed',
    });

    // Update deposit status
    db.update('deposits', depositId, { status: 'received' });

    // Find user's fiat ledger account
    const fiatAccounts = db.query('ledger_accounts', { user_id: deposit.user_id, type: 'fiat' }, { isAdmin: true });
    if (fiatAccounts.length === 0) throw new Error('No fiat ledger account');

    // Post fiat_in ledger entry (idempotent via unique key)
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

  /**
   * Admin: settle a received deposit.
   * Converts fiat to BTC, marks deposit complete, generates receipt.
   */
  settleDeposit(depositId, { btcRate = 65000 } = {}) {
    const deposit = db.getById('deposits', depositId, { isAdmin: true });
    if (!deposit) throw new Error('Deposit not found');
    if (deposit.status !== 'received') throw new Error(`Deposit is ${deposit.status}, expected received`);

    const btcAmount = deposit.amount / btcRate;

    // Find user's BTC ledger account
    const btcAccounts = db.query('ledger_accounts', { user_id: deposit.user_id, type: 'bitcoin' }, { isAdmin: true });
    if (btcAccounts.length === 0) throw new Error('No BTC ledger account');

    // Post conversion ledger entries (idempotent)
    db.insert('ledger_entries', {
      idempotency_key: `conversion_debit_${depositId}`,
      account_id: db.query('ledger_accounts', { user_id: deposit.user_id, type: 'fiat' }, { isAdmin: true })[0].id,
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

    // Notification
    db.insert('notifications', {
      user_id: deposit.user_id,
      type: 'deposit_settled',
      title: 'Deposit Settled',
      message: `Your deposit of ${deposit.currency} ${deposit.amount} has been converted to ${btcAmount.toFixed(8)} BTC.`,
      read: false,
    });

    // Email
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

  /** Get deposits for a user. */
  getUserDeposits(userId) {
    return db.query('deposits', { user_id: userId }, { userId });
  },

  /** Get all deposits (admin). */
  getAllDeposits() {
    return db.query('deposits', {}, { isAdmin: true });
  },
};

export default DepositService;
