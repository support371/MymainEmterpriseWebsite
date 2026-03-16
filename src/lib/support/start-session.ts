import { createSession } from './store-instance';
import { audit } from '@/lib/audit';
import type { SupportSession } from '@/types/support';

export function startSession(input: {
  userId: string;
  userEmail: string;
  userName: string;
  userRole: string;
}): SupportSession {
  const session = createSession(input);
  audit({ action: 'support_session_started', user: input.userEmail });
  return session;
}
