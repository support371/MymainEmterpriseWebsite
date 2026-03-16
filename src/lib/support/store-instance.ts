/**
 * Re-export the in-memory store as the active support store.
 * Swap this import when migrating to a persistent backend.
 */
export {
  createSession,
  getSession,
  updateSession,
  updateSessionStatus,
  addMessage,
  getMessages,
  recordConsent,
  getConsent,
  listSessionsByUser,
  getSessionCount,
} from './stores/in-memory-support-session-store';
