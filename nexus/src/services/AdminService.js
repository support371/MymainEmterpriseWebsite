/**
 * AdminService
 *
 * Admin-specific queries and actions.
 */
import db from '../db/MockDatabase';

const AdminService = {
  /** Dashboard KPIs. */
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

  /** Get all clients (profiles with client role). */
  getClients() {
    const roles = db.query('roles', { role: 'client' }, { isAdmin: true });
    const clientIds = new Set(roles.map((r) => r.user_id));
    return db.all('profiles').filter((p) => clientIds.has(p.id));
  },

  /** Get full client detail (360 view). */
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

  /** Update KYC status. */
  updateKycStatus(clientId, status) {
    const profile = db.update('profiles', clientId, { kyc_status: status });
    if (!profile) throw new Error('Profile not found');

    db.insert('activity_log', {
      user_id: clientId,
      action: 'kyc_update',
      description: `KYC status updated to ${status}`,
    });

    db.insert('notifications', {
      user_id: clientId,
      type: 'kyc_update',
      title: 'KYC Status Updated',
      message: `Your KYC status has been updated to: ${status}`,
      read: false,
    });

    db.insert('operations_log', {
      type: 'kyc',
      action: 'status_change',
      reference: clientId,
      details: `KYC for ${profile.email} set to ${status}`,
    });

    return profile;
  },

  /** Get webhook events. */
  getWebhookEvents() {
    return db.query('webhook_events', {}, { isAdmin: true });
  },

  /** Get operations log. */
  getOperationsLog() {
    return db.query('operations_log', {}, { isAdmin: true });
  },
};

export default AdminService;
