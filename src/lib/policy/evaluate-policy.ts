export interface PolicyResult {
  shouldEscalate: boolean;
  queue: string;
  reason: string | null;
}

const ESCALATION_KEYWORDS: [RegExp, string, string][] = [
  [/\b(human|agent|person|representative)\b/i, 'User requested human agent', 'General Member Support'],
  [/\b(incident|breach|hacked|compromised|attack|ransomware|malware)\b/i, 'Security incident detected', 'Cybersecurity / Incident'],
];

const QUEUE_KEYWORDS: [RegExp, string][] = [
  [/\b(book|schedule|consultation|appointment|meeting)\b/i, 'Consultation Scheduling'],
  [/\b(bill|payment|charge|invoice|subscription|refund)\b/i, 'Billing / Accounts'],
  [/\b(incident|breach|hacked|compromised|attack|ransomware|malware|phishing)\b/i, 'Cybersecurity / Incident'],
];

export function evaluatePolicy(message: string, userRole: string): PolicyResult {
  const lower = message.toLowerCase();

  // Check escalation triggers first
  for (const [pattern, reason, queue] of ESCALATION_KEYWORDS) {
    if (pattern.test(lower)) {
      return { shouldEscalate: true, queue, reason };
    }
  }

  // Check queue routing
  for (const [pattern, queue] of QUEUE_KEYWORDS) {
    if (pattern.test(lower)) {
      return { shouldEscalate: false, queue, reason: null };
    }
  }

  return { shouldEscalate: false, queue: 'General Member Support', reason: null };
}
