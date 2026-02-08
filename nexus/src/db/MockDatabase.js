/**
 * MockDatabase — In-memory relational database with RLS simulation.
 *
 * Tables:
 *   profiles, roles, bank_accounts, ledger_accounts, deposits,
 *   ledger_entries, bitcoin_cards, card_requests, card_transactions,
 *   webhook_events, operations_log, email_outbox, notifications,
 *   activity_log, portfolio_balances
 *
 * Invariants:
 *   - deposits.deposit_reference is UNIQUE
 *   - webhook_events.idempotency_key is UNIQUE
 *   - ledger_entries.idempotency_key is UNIQUE
 *   - db.query() respects isAdmin vs userId (RLS simulation)
 */

let _nextId = 1;
const uid = () => `id_${_nextId++}_${Date.now().toString(36)}`;

// ── helpers ──────────────────────────────────────────────────────
const deepClone = (o) => JSON.parse(JSON.stringify(o));

const UNIQUE_KEYS = {
  deposits: ['deposit_reference'],
  webhook_events: ['idempotency_key'],
  ledger_entries: ['idempotency_key'],
};

// ── Database singleton ───────────────────────────────────────────
class MockDatabase {
  constructor() {
    this.tables = {
      profiles: [],
      roles: [],
      bank_accounts: [],
      ledger_accounts: [],
      deposits: [],
      ledger_entries: [],
      bitcoin_cards: [],
      card_requests: [],
      card_transactions: [],
      webhook_events: [],
      operations_log: [],
      email_outbox: [],
      notifications: [],
      activity_log: [],
      portfolio_balances: [],
    };
    this._listeners = new Set();
  }

  // ── subscription ────────────────────────────────────────────────
  subscribe(fn) {
    this._listeners.add(fn);
    return () => this._listeners.delete(fn);
  }

  _notify() {
    this._listeners.forEach((fn) => {
      try { fn(); } catch (_) { /* swallow */ }
    });
  }

  // ── CRUD ────────────────────────────────────────────────────────

  /** Insert a row. Enforces uniqueness constraints. Returns the inserted row. */
  insert(table, row) {
    if (!this.tables[table]) throw new Error(`Unknown table: ${table}`);
    const record = { id: uid(), created_at: new Date().toISOString(), ...row };

    // Uniqueness checks
    const uniques = UNIQUE_KEYS[table] || [];
    for (const key of uniques) {
      if (record[key] !== undefined) {
        const exists = this.tables[table].some((r) => r[key] === record[key]);
        if (exists) {
          throw new Error(`UNIQUE violation on ${table}.${key} = "${record[key]}"`);
        }
      }
    }

    this.tables[table].push(record);
    this._notify();
    return deepClone(record);
  }

  /**
   * Query rows with RLS simulation.
   *
   * @param {string}  table
   * @param {object}  filters  – key/value pairs ANDed together
   * @param {object}  ctx      – { userId, isAdmin }
   *   • If isAdmin=true → full table access
   *   • Otherwise only rows where row.user_id === ctx.userId are visible
   *     (tables without user_id are fully visible to everyone)
   */
  query(table, filters = {}, ctx = {}) {
    if (!this.tables[table]) throw new Error(`Unknown table: ${table}`);

    let rows = this.tables[table];

    // RLS: non-admin can only see own rows (if table has user_id column)
    if (!ctx.isAdmin && ctx.userId) {
      const hasUserIdCol = rows.length === 0 || rows.some((r) => 'user_id' in r);
      if (hasUserIdCol) {
        rows = rows.filter((r) => r.user_id === ctx.userId);
      }
    }

    // Apply filters
    for (const [key, value] of Object.entries(filters)) {
      rows = rows.filter((r) => r[key] === value);
    }

    return deepClone(rows);
  }

  /** Get a single row by id (respects RLS). */
  getById(table, id, ctx = {}) {
    const rows = this.query(table, { id }, ctx);
    return rows[0] || null;
  }

  /** Update a row by id. Returns the updated row or null. */
  update(table, id, updates) {
    if (!this.tables[table]) throw new Error(`Unknown table: ${table}`);
    const idx = this.tables[table].findIndex((r) => r.id === id);
    if (idx === -1) return null;

    // Uniqueness checks on updated fields
    const uniques = UNIQUE_KEYS[table] || [];
    for (const key of uniques) {
      if (updates[key] !== undefined) {
        const exists = this.tables[table].some(
          (r, i) => i !== idx && r[key] === updates[key]
        );
        if (exists) {
          throw new Error(`UNIQUE violation on ${table}.${key} = "${updates[key]}"`);
        }
      }
    }

    Object.assign(this.tables[table][idx], updates, {
      updated_at: new Date().toISOString(),
    });
    this._notify();
    return deepClone(this.tables[table][idx]);
  }

  /** Delete a row by id. Returns true if deleted. */
  delete(table, id) {
    if (!this.tables[table]) throw new Error(`Unknown table: ${table}`);
    const before = this.tables[table].length;
    this.tables[table] = this.tables[table].filter((r) => r.id !== id);
    if (this.tables[table].length < before) {
      this._notify();
      return true;
    }
    return false;
  }

  /** Count rows (admin-only, no RLS). */
  count(table, filters = {}) {
    return this.query(table, filters, { isAdmin: true }).length;
  }

  /** Get all rows (admin-only). */
  all(table) {
    return deepClone(this.tables[table] || []);
  }

  // ── convenience: portfolio balances ─────────────────────────────
  getPortfolioBalances(userId) {
    const ledgerAccounts = this.query('ledger_accounts', { user_id: userId }, { userId, isAdmin: false });
    return ledgerAccounts.map((la) => {
      const entries = this.tables.ledger_entries.filter((e) => e.account_id === la.id);
      const balance = entries.reduce((sum, e) => sum + (e.credit || 0) - (e.debit || 0), 0);
      return { ...deepClone(la), balance };
    });
  }

  /** Reset all tables (for testing). */
  reset() {
    for (const t of Object.keys(this.tables)) {
      this.tables[t] = [];
    }
    _nextId = 1;
    this._notify();
  }
}

// Export singleton
const db = new MockDatabase();
export default db;
export { MockDatabase };
