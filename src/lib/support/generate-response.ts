/**
 * Deterministic AI concierge reply generator (no external LLM call).
 * Returns a structured text reply based on policy evaluation result.
 */
export function generateResponse(input: {
  userMessage: string;
  queue: string;
  escalated: boolean;
  userName: string;
}): string {
  const { userMessage, queue, escalated, userName } = input;

  if (escalated) {
    return `I understand you need direct human assistance. I've initiated an escalation to our ${queue} team. A specialist will be in touch shortly. Your reference has been created.`;
  }

  const lower = userMessage.toLowerCase();

  if (queue === 'Billing / Accounts') {
    return `I can help with your billing inquiry. Our accounts team monitors all payment and charge-related issues. Could you provide your account number or the specific charge in question so I can look into this?`;
  }

  if (queue === 'Consultation Scheduling') {
    return `I'd be happy to help you schedule a consultation. Our team offers security assessments, compliance reviews, and strategic advisory sessions. What type of consultation are you looking for, ${userName}?`;
  }

  if (queue === 'Cybersecurity / Incident') {
    return `This sounds like a potential security incident. I'm escalating this to our Cybersecurity Incident Response team immediately. Please do not make any changes to affected systems until our team contacts you.`;
  }

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return `Hello ${userName}! Welcome to GEM Cyber Enterprise Support. I'm your AI concierge — I can help with security questions, billing, scheduling consultations, or connect you with a human specialist. How can I assist you today?`;
  }

  if (lower.includes('help')) {
    return `Of course, ${userName}. I can assist with:\n• Security incidents and monitoring\n• Billing and account questions\n• Scheduling consultations\n• Connecting you with a human specialist\n\nWhat would you like help with?`;
  }

  return `Thank you for your message, ${userName}. I'm reviewing your request regarding "${userMessage.slice(0, 60)}${userMessage.length > 60 ? '...' : ''}". Is there anything specific you'd like me to focus on, or would you prefer to speak with a human specialist?`;
}
