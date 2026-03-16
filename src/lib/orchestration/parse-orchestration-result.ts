import type { OrchestrationResult } from './orchestrate-support-reply';
import type { SendMessageResponse } from '@/types/support-contracts';

/** Map internal orchestration result to API response shape. */
export function parseOrchestrationResult(result: OrchestrationResult): SendMessageResponse {
  return {
    userMessage: result.userMessage,
    aiReply: result.aiReply,
    escalated: result.escalated,
    queue: result.queue,
  };
}
