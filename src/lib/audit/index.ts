export interface AuditEntry {
  id: string;
  timestamp: string;
  actorUserId: string | null;
  actorEmail: string | null;
  action: string;
  target: string;
  meta: Record<string, unknown>;
  result: 'success' | 'failure' | 'denied';
}

/**
 * In-memory audit store. Entries persist for the lifetime of the
 * server process. Replace with a database-backed store for production.
 */
const auditEvents: AuditEntry[] = [];

export async function writeAuditEntry(
  entry: Omit<AuditEntry, 'id' | 'timestamp'>,
): Promise<AuditEntry> {
  const full: AuditEntry = {
    id: `aud_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    ...entry,
  };
  auditEvents.unshift(full);
  // Cap at 10 000 entries in memory
  if (auditEvents.length > 10_000) auditEvents.length = 10_000;
  return full;
}

export async function getAuditEntries(opts?: {
  limit?: number;
  offset?: number;
  action?: string;
}): Promise<{ entries: AuditEntry[]; total: number }> {
  let entries = auditEvents;
  if (opts?.action) {
    entries = entries.filter((e) => e.action === opts.action);
  }
  const total = entries.length;
  const offset = opts?.offset ?? 0;
  const limit = opts?.limit ?? 50;
  return { entries: entries.slice(offset, offset + limit), total };
}

export async function exportAuditLog(): Promise<AuditEntry[]> {
  return [...auditEvents];
}

export function audit(event: Record<string, unknown>) {
  auditEvents.push({
    id: `aud_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    actorUserId: (event.actorUserId as string) ?? null,
    actorEmail: (event.actorEmail as string) ?? null,
    action: (event.action as string) ?? 'unknown',
    target: (event.target as string) ?? '',
    meta: event,
    result: (event.result as 'success' | 'failure' | 'denied') ?? 'success',
  });
}

export function getAuditEvents() {
  return auditEvents;
}
