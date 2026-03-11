import { NextResponse } from 'next/server';
import { getCurrentPortalSession } from '@/lib/auth/session';

export async function GET() {
  const session = await getCurrentPortalSession();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Preview data — wire to real backend when available
  return NextResponse.json({
    stats: {
      activeIncidents: 3,
      pendingRequests: 12,
      complianceScore: 94,
      totalAssetValue: 2_400_000,
    },
    recentActivity: [
      { action: 'Incident resolved', detail: 'Phishing attempt blocked', time: '2h ago' },
      { action: 'Document uploaded', detail: 'Q4 compliance report', time: '5h ago' },
      { action: 'Request submitted', detail: 'Security audit request', time: '1d ago' },
    ],
  });
}
