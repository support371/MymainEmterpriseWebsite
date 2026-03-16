import type { SupportSession, SupportMessage, ConsentRecord, EscalationResult, TicketResult, BookingResult } from './support';

/** POST /api/support/session/start */
export interface StartSessionRequest {
  userId: string;
  userEmail: string;
  userName: string;
  userRole: string;
}
export interface StartSessionResponse {
  session: SupportSession;
}

/** POST /api/support/session/consent */
export interface ConsentRequest {
  sessionId: string;
  granted: boolean;
}
export interface ConsentResponse {
  consent: ConsentRecord;
}

/** POST /api/support/message */
export interface SendMessageRequest {
  sessionId: string;
  content: string;
}
export interface SendMessageResponse {
  userMessage: SupportMessage;
  aiReply: SupportMessage;
  escalated: boolean;
  queue: string;
}

/** POST /api/support/escalate */
export interface EscalateRequest {
  sessionId: string;
  reason?: string;
}
export interface EscalateResponse {
  result: EscalationResult;
}

/** POST /api/ticket/create */
export interface CreateTicketRequest {
  sessionId: string;
  summary?: string;
}
export interface CreateTicketResponse {
  ticket: TicketResult;
}

/** POST /api/booking/create */
export interface CreateBookingRequest {
  sessionId: string;
  type?: string;
}
export interface CreateBookingResponse {
  booking: BookingResult;
}
