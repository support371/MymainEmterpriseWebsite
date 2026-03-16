import { NextRequest, NextResponse } from 'next/server';
import { getCurrentPortalSession } from '@/lib/auth/session';
import { getSession } from '@/lib/support/store-instance';
import { createBooking } from '@/lib/support/create-booking';

export async function POST(req: NextRequest) {
  const session = await getCurrentPortalSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json() as { sessionId: string; type?: string };
  if (!body.sessionId) {
    return NextResponse.json({ error: 'sessionId required' }, { status: 400 });
  }

  const supportSession = getSession(body.sessionId);
  if (!supportSession || supportSession.userId !== session.userId) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }

  const booking = createBooking(body.sessionId, body.type);
  if (!booking) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }

  return NextResponse.json({ booking });
}
