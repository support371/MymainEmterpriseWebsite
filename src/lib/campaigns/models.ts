export type CampaignMode = 'sequence' | 'newsletter';

export interface Contact {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  tags: string[];
  status: 'active' | 'suppressed' | 'bounced';
}

export interface Segment {
  id: string;
  name: string;
  filters: string[];
  contactCount: number;
}

export interface Campaign {
  id: string;
  name: string;
  mode: CampaignMode;
  status: 'draft' | 'scheduled' | 'running' | 'paused' | 'completed';
  segmentId: string;
  scheduledAtUtc?: string;
}

export interface Recipient {
  id: string;
  campaignId: string;
  contactId: string;
  deliveryStatus: 'queued' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'complaint';
}

export interface Event {
  id: string;
  recipientId: string;
  eventType: 'delivered' | 'open' | 'click' | 'bounce' | 'complaint' | 'unsubscribe';
  atUtc: string;
}

export interface SuppressionListEntry {
  id: string;
  email: string;
  reason: 'manual' | 'unsubscribe' | 'hard_bounce' | 'complaint';
  createdAtUtc: string;
}

export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  targetId: string;
  createdAtUtc: string;
}

export interface NotificationOutbox {
  id: string;
  channel: 'email' | 'slack' | 'webhook';
  status: 'pending' | 'sent' | 'failed';
  payloadRef: string;
  createdAtUtc: string;
}

export const campaignEngineGuardrails = [
  'Rate limits are applied by sending domain and mailbox provider.',
  'Compliance preflight checks block sends without unsubscribe + sender identity.',
  'Suppression list is enforced before queue enqueue and again before handoff.',
  'Complaint and bounce signals auto-adjust sender reputation posture.',
];
