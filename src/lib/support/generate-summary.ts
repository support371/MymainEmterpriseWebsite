import { getSession, getMessages } from './store-instance';

export function generateSummary(sessionId: string): string | null {
  const session = getSession(sessionId);
  if (!session) return null;

  const msgs = getMessages(sessionId);
  const lines = [
    `Session: ${session.id}`,
    `User: ${session.userName} (${session.userEmail})`,
    `Role: ${session.userRole}`,
    `Queue: ${session.queue}`,
    `Status: ${session.status}`,
    `Created: ${new Date(session.createdAt).toISOString()}`,
    session.escalatedAt ? `Escalated: ${new Date(session.escalatedAt).toISOString()}` : null,
    ``,
    `Transcript (${msgs.length} messages):`,
    ...msgs.map((m) => `  [${m.senderType}] ${m.content}`),
  ].filter(Boolean);

  return lines.join('\n');
}
