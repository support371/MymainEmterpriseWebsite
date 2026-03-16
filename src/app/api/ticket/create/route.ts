import { NextRequest, NextResponse } from 'next/server';
import { getCurrentPortalSession } from '@/lib/auth/session';
import { getSession } from '@/lib/support/store-instance';
import { createTicket } from '@/lib/support/create-ticket';

export async function POST(req: NextRequest) {
  const session = await getCurrentPortalSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json() as { sessionId: string; summary?: string };
  if (!body.sessionId) {
    return NextResponse.json({ error: 'sessionId required' }, { status: 400 });
  }

  const supportSession = getSession(body.sessionId);
  if (!supportSession || supportSession.userId !== session.userId) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }

  const ticket = createTicket(body.sessionId, body.summary);
  if (!ticket) {
    return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 });
  }

  return NextResponse.json({ ticket });
}
