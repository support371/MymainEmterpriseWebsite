import { NextRequest, NextResponse } from 'next/server';
import { getCurrentPortalSession } from '@/lib/auth/session';
import { getSession } from '@/lib/support/store-instance';
import { escalateSession } from '@/lib/support/escalate-session';

export async function POST(req: NextRequest) {
  const session = await getCurrentPortalSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json() as { sessionId: string; reason?: string };
  if (!body.sessionId) {
    return NextResponse.json({ error: 'sessionId required' }, { status: 400 });
  }

  const supportSession = getSession(body.sessionId);
  if (!supportSession || supportSession.userId !== session.userId) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }

  const result = escalateSession(body.sessionId, body.reason);
  if (!result) {
    return NextResponse.json({ error: 'Escalation failed' }, { status: 500 });
  }

  return NextResponse.json({ result });
}
