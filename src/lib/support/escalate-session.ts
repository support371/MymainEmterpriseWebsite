import { getSession, updateSession, addMessage } from './store-instance';
import { createEscalationIssue } from '@/lib/atlassian/create-escalation-issue';
import { audit } from '@/lib/audit';
import type { EscalationResult } from '@/types/support';

export function escalateSession(sessionId: string, reason?: string): EscalationResult | null {
  const session = getSession(sessionId);
  if (!session) return null;

  const resolvedReason = reason || 'User requested human escalation';

  updateSession(sessionId, {
    status: 'escalated',
    escalatedAt: Date.now(),
  });

  addMessage(sessionId, 'system', `Session escalated: ${resolvedReason}`);

  const atlassianRef = createEscalationIssue({
    sessionId,
    queue: session.queue,
    userEmail: session.userEmail,
    userName: session.userName,
    reason: resolvedReason,
  });

  audit({ action: 'support_escalated', user: session.userEmail });

  return {
    sessionId,
    queue: session.queue,
    reason: resolvedReason,
    atlassianRef: atlassianRef.issueKey,
  };
}
