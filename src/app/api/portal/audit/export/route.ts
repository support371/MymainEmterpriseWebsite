import { NextResponse } from 'next/server';
import { getCurrentPortalSession } from '@/lib/auth/session';
import { exportAuditLog, writeAuditEntry } from '@/lib/audit';

export async function GET() {
  const session = await getCurrentPortalSession();
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const entries = await exportAuditLog();

  await writeAuditEntry({
    actorUserId: session.userId,
    actorEmail: session.email,
    action: 'audit_export',
    target: '/api/portal/audit/export',
    meta: { count: entries.length },
    result: 'success',
  });

  const header = 'id,timestamp,actorEmail,action,target,result\n';
  const rows = entries.map((e) =>
    [e.id, e.timestamp, e.actorEmail || '', e.action, e.target, e.result].join(',')
  ).join('\n');

  return new NextResponse(header + rows, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename=audit-log-${new Date().toISOString().slice(0, 10)}.csv`,
    },
  });
}
