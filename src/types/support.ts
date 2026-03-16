export type SessionStatus = 'pending' | 'active' | 'escalated' | 'resolved' | 'closed';
export type SenderType = 'user' | 'system' | 'ai';

export interface SupportSession {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  userRole: string;
  status: SessionStatus;
  consentGranted: boolean;
  consentTimestamp: number | null;
  queue: string;
  createdAt: number;
  updatedAt: number;
  escalatedAt: number | null;
  resolvedAt: number | null;
}

export interface SupportMessage {
  id: string;
  sessionId: string;
  senderType: SenderType;
  content: string;
  timestamp: number;
}

export interface ConsentRecord {
  userId: string;
  sessionId: string;
  granted: boolean;
  timestamp: number;
}

export interface EscalationResult {
  sessionId: string;
  queue: string;
  reason: string;
  atlassianRef: string | null;
}

export interface TicketResult {
  id: string;
  sessionId: string;
  summary: string;
  queue: string;
  createdAt: number;
}

export interface BookingResult {
  id: string;
  sessionId: string;
  type: string;
  status: 'stub';
  createdAt: number;
}
