import { mapQueueToAtlassian } from './map-queue-to-atlassian';

let issueCounter = 0;

export interface AtlassianIssueStub {
  issueKey: string;
  project: string;
  issueType: string;
  summary: string;
  queue: string;
}

/**
 * Stub: creates a simulated Atlassian issue for escalation handoff.
 * Replace with real Jira/JSM API call in production.
 */
export function createEscalationIssue(input: {
  sessionId: string;
  queue: string;
  userEmail: string;
  userName: string;
  reason: string;
}): AtlassianIssueStub {
  const mapping = mapQueueToAtlassian(input.queue);
  const key = `${mapping.project}-${++issueCounter}`;

  return {
    issueKey: key,
    project: mapping.project,
    issueType: mapping.issueType,
    summary: `[Escalation] ${input.reason} — ${input.userName} (${input.userEmail})`,
    queue: input.queue,
  };
}
