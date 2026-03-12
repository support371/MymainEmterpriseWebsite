import { NextResponse } from 'next/server';
import { getCurrentPortalSession } from '@/lib/auth/session';
import { audit, listAuditEvents } from '@/lib/audit';

export async function GET() {
  const session = await getCurrentPortalSession();
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const entries = listAuditEvents();

  audit({ action: 'audit_export', user: session.email, route: '/api/portal/audit/export' });

  const header = 'action,user,route,timestamp\n';
  const rows = entries.map((e) =>
    [e.action, e.user || '', e.route || '', new Date(e.timestamp).toISOString()].join(',')
  ).join('\n');

  return new NextResponse(header + rows, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename=audit-log-${new Date().toISOString().slice(0, 10)}.csv`,
    },
  });
}
