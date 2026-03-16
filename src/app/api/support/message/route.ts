import { NextRequest, NextResponse } from 'next/server';
import { getCurrentPortalSession } from '@/lib/auth/session';
import { getSession } from '@/lib/support/store-instance';
import { orchestrateSupportReply } from '@/lib/orchestration/orchestrate-support-reply';
import { parseOrchestrationResult } from '@/lib/orchestration/parse-orchestration-result';

export async function POST(req: NextRequest) {
  const session = await getCurrentPortalSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json() as { sessionId: string; content: string };
  if (!body.sessionId || !body.content?.trim()) {
    return NextResponse.json({ error: 'sessionId and content required' }, { status: 400 });
  }

  const supportSession = getSession(body.sessionId);
  if (!supportSession || supportSession.userId !== session.userId) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }

  if (!supportSession.consentGranted) {
    return NextResponse.json({ error: 'Consent required before sending messages' }, { status: 403 });
  }

  const result = orchestrateSupportReply(body.sessionId, body.content.trim());
  if (!result) {
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }

  return NextResponse.json(parseOrchestrationResult(result));
}
