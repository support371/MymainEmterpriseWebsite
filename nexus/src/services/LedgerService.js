/**
 * LedgerService
 *
 * Read-only convenience layer for ledger queries.
 * All writes go through DepositService/CardService to ensure idempotency.
 */
import db from '../db/MockDatabase';

const LedgerService = {
  /** Get ledger entries for a user. */
  getUserEntries(userId) {
    return db.query('ledger_entries', { user_id: userId }, { userId });
  },

  /** Get all ledger entries (admin). */
  getAllEntries() {
    return db.query('ledger_entries', {}, { isAdmin: true });
  },

  /** Get entries for a specific account. */
  getAccountEntries(accountId, ctx = {}) {
    return db.query('ledger_entries', { account_id: accountId }, ctx);
  },

  /** Compute balance for a ledger account. */
  getAccountBalance(accountId) {
    const entries = db.query('ledger_entries', { account_id: accountId }, { isAdmin: true });
    return entries.reduce((sum, e) => sum + (e.credit || 0) - (e.debit || 0), 0);
  },

  /** Get portfolio balances for a user. */
  getPortfolioBalances(userId) {
    return db.getPortfolioBalances(userId);
  },
};

export default LedgerService;
