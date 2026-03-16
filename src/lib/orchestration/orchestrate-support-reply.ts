import { evaluatePolicy } from '@/lib/policy/evaluate-policy';
import { resolveQueue } from '@/lib/policy/resolve-queue';
import { generateResponse } from '@/lib/support/generate-response';
import { getSession, updateSession, addMessage } from '@/lib/support/store-instance';
import { escalateSession } from '@/lib/support/escalate-session';
import { audit } from '@/lib/audit';
import type { SupportMessage } from '@/types/support';

export interface OrchestrationResult {
  userMessage: SupportMessage;
  aiReply: SupportMessage;
  escalated: boolean;
  queue: string;
}

export function orchestrateSupportReply(sessionId: string, content: string): OrchestrationResult | null {
  const session = getSession(sessionId);
  if (!session) return null;

  // Record user message
  const userMsg = addMessage(sessionId, 'user', content);
  if (!userMsg) return null;

  audit({ action: 'support_message_sent', user: session.userEmail });

  // Activate session on first message
  if (session.status === 'pending') {
    updateSession(sessionId, { status: 'active' });
  }

  // Evaluate policy
  const policy = evaluatePolicy(content, session.userRole);
  const finalQueue = resolveQueue(policy.queue, session.userRole);

  // Update session queue
  updateSession(sessionId, { queue: finalQueue });

  // Handle escalation
  if (policy.shouldEscalate) {
    escalateSession(sessionId, policy.reason ?? undefined);
  }

  // Generate AI response
  const aiText = generateResponse({
    userMessage: content,
    queue: finalQueue,
    escalated: policy.shouldEscalate,
    userName: session.userName,
  });

  const aiMsg = addMessage(sessionId, 'ai', aiText)!;
  audit({ action: 'support_ai_replied', user: session.userEmail });

  return {
    userMessage: userMsg,
    aiReply: aiMsg,
    escalated: policy.shouldEscalate,
    queue: finalQueue,
  };
}
