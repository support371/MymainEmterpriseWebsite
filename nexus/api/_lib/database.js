/**
 * Server-side MockDatabase singleton.
 *
 * Shares the same in-memory instance across all API handlers within
 * a single Vercel function invocation (warm start). Data resets on
 * cold start — acceptable for demo; swap with PostgreSQL for prod.
 *
 * Tables: profiles, roles, sessions, bank_accounts, ledger_accounts,
 *   deposits, ledger_entries, bitcoin_cards, card_requests,
 *   card_transactions, webhook_events, operations_log, email_outbox,
 *   notifications, activity_log
 */

let _nextId = 1;
const uid = () => `id_${_nextId++}_${Date.now().toString(36)}`;
const deepClone = (o) => JSON.parse(JSON.stringify(o));

const UNIQUE_KEYS = {
  deposits: ['deposit_reference'],
  webhook_events: ['idempotency_key'],
  ledger_entries: ['idempotency_key'],
  sessions: ['token'],
};

class MockDatabase {
  constructor() {
    this.tables = {
      profiles: [],
      roles: [],
      sessions: [],
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
    };
  }

  insert(table, row) {
    if (!this.tables[table]) throw new Error(`Unknown table: ${table}`);
    const record = { id: uid(), created_at: new Date().toISOString(), ...row };

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
    return deepClone(record);
  }

  query(table, filters = {}, ctx = {}) {
    if (!this.tables[table]) throw new Error(`Unknown table: ${table}`);
    let rows = this.tables[table];

    if (!ctx.isAdmin && ctx.userId) {
      const hasUserIdCol = rows.length === 0 || rows.some((r) => 'user_id' in r);
      if (hasUserIdCol) {
        rows = rows.filter((r) => r.user_id === ctx.userId);
      }
    }

    for (const [key, value] of Object.entries(filters)) {
      rows = rows.filter((r) => r[key] === value);
    }

    return deepClone(rows);
  }

  getById(table, id, ctx = {}) {
    const rows = this.query(table, { id }, ctx);
    return rows[0] || null;
  }

  update(table, id, updates) {
    if (!this.tables[table]) throw new Error(`Unknown table: ${table}`);
    const idx = this.tables[table].findIndex((r) => r.id === id);
    if (idx === -1) return null;

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
    return deepClone(this.tables[table][idx]);
  }

  delete(table, id) {
    if (!this.tables[table]) throw new Error(`Unknown table: ${table}`);
    const before = this.tables[table].length;
    this.tables[table] = this.tables[table].filter((r) => r.id !== id);
    return this.tables[table].length < before;
  }

  count(table, filters = {}) {
    return this.query(table, filters, { isAdmin: true }).length;
  }

  all(table) {
    return deepClone(this.tables[table] || []);
  }

  getPortfolioBalances(userId) {
    const ledgerAccounts = this.query('ledger_accounts', { user_id: userId }, { userId, isAdmin: false });
    return ledgerAccounts.map((la) => {
      const entries = this.tables.ledger_entries.filter((e) => e.account_id === la.id);
      const balance = entries.reduce((sum, e) => sum + (e.credit || 0) - (e.debit || 0), 0);
      return { ...deepClone(la), balance };
    });
  }

  reset() {
    for (const t of Object.keys(this.tables)) {
      this.tables[t] = [];
    }
    _nextId = 1;
  }
}

// Module-level singleton — persists across handler calls in warm starts
const db = new MockDatabase();
export default db;
