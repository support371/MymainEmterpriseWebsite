import { NextResponse } from 'next/server';
import { listContactMessages, toCsv, updateContactMessage } from '@/lib/contactMessages';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = url.searchParams.get('status') || undefined;
  const q = url.searchParams.get('q') || undefined;
  const format = url.searchParams.get('format');

  const messages = await listContactMessages({
    q,
    status: status === 'open' || status === 'triaged' || status === 'closed' ? status : undefined,
  });

  if (format === 'csv') {
    const csv = toCsv(messages);
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="admin-inbox.csv"',
      },
    });
  }

  return NextResponse.json({ messages });
}

export async function PATCH(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    id?: string;
    status?: 'open' | 'triaged' | 'closed';
    assignedToUserId?: string | null;
    tags?: string[];
  };

  if (!body.id) {
    return NextResponse.json({ message: 'Missing message id' }, { status: 400 });
  }

  const updated = await updateContactMessage(body.id, {
    status: body.status,
    assignedToUserId: body.assignedToUserId ?? null,
    tags: body.tags,
  });

  if (!updated) {
    return NextResponse.json({ message: 'Message not found' }, { status: 404 });
  }

  return NextResponse.json({ message: updated });
}
