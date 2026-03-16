/**
 * Map internal queue names to Atlassian project / issue type identifiers.
 * Stub implementation — replace with real Atlassian config when integrating.
 */
const QUEUE_MAP: Record<string, { project: string; issueType: string }> = {
  'Cybersecurity / Incident': { project: 'SEC', issueType: 'Incident' },
  'Consultation Scheduling': { project: 'CS', issueType: 'Task' },
  'Billing / Accounts': { project: 'FIN', issueType: 'Support' },
  'VIP Concierge': { project: 'VIP', issueType: 'Support' },
  'Premium Member Support': { project: 'SUP', issueType: 'Support' },
  'General Member Support': { project: 'SUP', issueType: 'Support' },
};

export function mapQueueToAtlassian(queue: string) {
  return QUEUE_MAP[queue] ?? { project: 'SUP', issueType: 'Support' };
}
