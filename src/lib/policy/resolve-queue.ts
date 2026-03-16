/**
 * Resolve the final queue assignment given message context and user attributes.
 */
export function resolveQueue(policyQueue: string, userRole: string): string {
  // VIP / paid user override
  if (userRole === 'admin') return 'VIP Concierge';
  if (userRole === 'client') {
    // Clients get premium unless a specific queue is already assigned
    if (policyQueue === 'General Member Support') return 'Premium Member Support';
  }
  return policyQueue;
}
