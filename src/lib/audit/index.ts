import fs from 'node:fs';
import path from 'node:path';

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
 * Local-file audit persistence (preview mode).
 *
 * PRODUCTION BLOCKER: Replace with database writes (Prisma AuditLog model)
 * or a managed audit service. This file-based approach is not suitable
 * for production due to concurrency and durability concerns.
 */
const AUDIT_FILE = path.join(process.cwd(), 'data', 'audit-log.json');

function ensureFile() {
  const dir = path.dirname(AUDIT_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(AUDIT_FILE)) fs.writeFileSync(AUDIT_FILE, '[]', 'utf8');
}

function readAll(): AuditEntry[] {
  ensureFile();
  try {
    return JSON.parse(fs.readFileSync(AUDIT_FILE, 'utf8')) as AuditEntry[];
  } catch {
    return [];
  }
}

function writeAll(entries: AuditEntry[]) {
  ensureFile();
  fs.writeFileSync(AUDIT_FILE, JSON.stringify(entries, null, 2), 'utf8');
}

export async function writeAuditEntry(
  entry: Omit<AuditEntry, 'id' | 'timestamp'>,
): Promise<AuditEntry> {
  const full: AuditEntry = {
    id: `aud_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    ...entry,
  };
  const entries = readAll();
  entries.unshift(full);
  // Keep last 10 000 entries in preview
  writeAll(entries.slice(0, 10_000));
  return full;
}

export async function getAuditEntries(opts?: {
  limit?: number;
  offset?: number;
  action?: string;
}): Promise<{ entries: AuditEntry[]; total: number }> {
  let entries = readAll();
  if (opts?.action) {
    entries = entries.filter((e) => e.action === opts.action);
  }
  const total = entries.length;
  const offset = opts?.offset ?? 0;
  const limit = opts?.limit ?? 50;
  return { entries: entries.slice(offset, offset + limit), total };
}

export async function exportAuditLog(): Promise<AuditEntry[]> {
  return readAll();
}
