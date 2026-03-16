import { getSession, getMessages } from './store-instance';
import { audit } from '@/lib/audit';
import type { TicketResult } from '@/types/support';

let ticketCounter = 0;

export function createTicket(sessionId: string, summary?: string): TicketResult | null {
  const session = getSession(sessionId);
  if (!session) return null;

  const msgs = getMessages(sessionId);
  const autoSummary = summary || (msgs.length > 0
    ? `Support request from ${session.userName}: ${msgs[0].content.slice(0, 100)}`
    : `Support ticket for session ${sessionId}`);

  const ticket: TicketResult = {
    id: `TKT-${++ticketCounter}`,
    sessionId,
    summary: autoSummary,
    queue: session.queue,
    createdAt: Date.now(),
  };

  audit({ action: 'support_ticket_created', user: session.userEmail });
  return ticket;
}
