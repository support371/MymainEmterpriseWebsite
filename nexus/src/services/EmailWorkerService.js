/**
 * EmailWorkerService
 *
 * Processes the email_outbox queue. In this mock, "sending" simply
 * marks the row as sent and logs to operations_log.
 */
import db from '../db/MockDatabase';

const EmailWorkerService = {
  /** Process all queued emails. Returns count processed. */
  processQueue() {
    const queued = db.query('email_outbox', { status: 'queued' }, { isAdmin: true });
    let processed = 0;

    for (const email of queued) {
      db.update('email_outbox', email.id, {
        status: 'sent',
        sent_at: new Date().toISOString(),
      });

      db.insert('operations_log', {
        type: 'email',
        action: 'sent',
        reference: email.id,
        details: `Email to ${email.to}: "${email.subject}"`,
      });

      processed++;
    }

    return { processed, total: queued.length };
  },

  /** Get outbox items. */
  getOutbox() {
    return db.query('email_outbox', {}, { isAdmin: true });
  },
};

export default EmailWorkerService;
