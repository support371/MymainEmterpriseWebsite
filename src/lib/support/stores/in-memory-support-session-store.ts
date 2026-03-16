import type { SupportSession, SupportMessage, ConsentRecord, SessionStatus } from '@/types/support';

let sessionCounter = 0;
let messageCounter = 0;

const sessions: Map<string, SupportSession> = new Map();
const messages: Map<string, SupportMessage[]> = new Map();
const consents: Map<string, ConsentRecord> = new Map();

function nextSessionId(): string {
  return `sup_${++sessionCounter}_${Date.now()}`;
}

function nextMessageId(): string {
  return `msg_${++messageCounter}_${Date.now()}`;
}

export function createSession(input: {
  userId: string;
  userEmail: string;
  userName: string;
  userRole: string;
}): SupportSession {
  const id = nextSessionId();
  const now = Date.now();
  const session: SupportSession = {
    id,
    userId: input.userId,
    userEmail: input.userEmail,
    userName: input.userName,
    userRole: input.userRole,
    status: 'pending',
    consentGranted: false,
    consentTimestamp: null,
    queue: 'General Member Support',
    createdAt: now,
    updatedAt: now,
    escalatedAt: null,
    resolvedAt: null,
  };
  sessions.set(id, session);
  messages.set(id, []);
  return session;
}

export function getSession(id: string): SupportSession | null {
  return sessions.get(id) ?? null;
}

export function updateSession(id: string, patch: Partial<SupportSession>): SupportSession | null {
  const s = sessions.get(id);
  if (!s) return null;
  Object.assign(s, patch, { updatedAt: Date.now() });
  return s;
}

export function updateSessionStatus(id: string, status: SessionStatus): SupportSession | null {
  return updateSession(id, { status });
}

export function addMessage(sessionId: string, senderType: SupportMessage['senderType'], content: string): SupportMessage | null {
  if (!sessions.has(sessionId)) return null;
  const msg: SupportMessage = {
    id: nextMessageId(),
    sessionId,
    senderType,
    content,
    timestamp: Date.now(),
  };
  messages.get(sessionId)!.push(msg);
  return msg;
}

export function getMessages(sessionId: string): SupportMessage[] {
  return messages.get(sessionId) ?? [];
}

export function recordConsent(sessionId: string, userId: string, granted: boolean): ConsentRecord {
  const record: ConsentRecord = {
    userId,
    sessionId,
    granted,
    timestamp: Date.now(),
  };
  consents.set(`${userId}:${sessionId}`, record);
  if (granted) {
    updateSession(sessionId, { consentGranted: true, consentTimestamp: record.timestamp });
  }
  return record;
}

export function getConsent(userId: string, sessionId: string): ConsentRecord | null {
  return consents.get(`${userId}:${sessionId}`) ?? null;
}

export function listSessionsByUser(userId: string): SupportSession[] {
  return Array.from(sessions.values()).filter((s) => s.userId === userId);
}

export function getSessionCount(): number {
  return sessions.size;
}
