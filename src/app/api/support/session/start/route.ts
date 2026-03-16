import { NextResponse } from 'next/server';
import { getCurrentPortalSession } from '@/lib/auth/session';
import { startSession } from '@/lib/support/start-session';

export async function POST() {
  const session = await getCurrentPortalSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supportSession = startSession({
    userId: session.userId,
    userEmail: session.email,
    userName: session.name,
    userRole: session.role,
  });

  return NextResponse.json({ session: supportSession });
}
