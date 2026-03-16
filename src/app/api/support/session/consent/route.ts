import { NextRequest, NextResponse } from 'next/server';
import { getCurrentPortalSession } from '@/lib/auth/session';
import { recordConsent, getConsent } from '@/lib/support/store-instance';
import { audit } from '@/lib/audit';

export async function POST(req: NextRequest) {
  const session = await getCurrentPortalSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json() as { sessionId: string; granted: boolean };
  if (!body.sessionId || typeof body.granted !== 'boolean') {
    return NextResponse.json({ error: 'sessionId and granted required' }, { status: 400 });
  }

  const consent = recordConsent(body.sessionId, session.userId, body.granted);
  audit({ action: 'support_consent_recorded', user: session.email });

  return NextResponse.json({ consent });
}

export async function GET(req: NextRequest) {
  const session = await getCurrentPortalSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sessionId = req.nextUrl.searchParams.get('sessionId');
  if (!sessionId) {
    return NextResponse.json({ error: 'sessionId required' }, { status: 400 });
  }

  const consent = getConsent(session.userId, sessionId);
  return NextResponse.json({ hasConsent: consent?.granted ?? false, consent });
}
