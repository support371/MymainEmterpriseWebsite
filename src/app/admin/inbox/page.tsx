import { revalidatePath } from 'next/cache';
import { listContactMessages, updateContactMessage } from '@/lib/contactMessages';

type MessageStatus = 'open' | 'triaged' | 'closed';

async function updateMessageAction(formData: FormData) {
  'use server';

  const id = String(formData.get('id') || '');
  const status = String(formData.get('status') || '') as MessageStatus;
  const assignedToUserId = String(formData.get('assignedToUserId') || '').trim();

  if (!id || !['open', 'triaged', 'closed'].includes(status)) {
    return;
  }

  await updateContactMessage(id, {
    status,
    assignedToUserId: assignedToUserId || null,
  });

  revalidatePath('/admin/inbox');
}

export default async function InboxPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: 'all' | MessageStatus }>;
}) {
  const params = await searchParams;
  const q = params.q || '';
  const status = params.status || 'all';

  const messages = await listContactMessages({
    q,
    status: status === 'all' ? undefined : status,
  });

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex flex-wrap gap-3 justify-between mb-5">
        <div>
          <h2 className="text-2xl font-semibold">Admin Inbox</h2>
          <p className="text-sm text-slate-400">Search, triage, assign, and export inbound contact messages.</p>
        </div>
        <a href="/api/admin/inbox?format=csv" className="px-3 py-2 text-sm rounded-md border border-slate-700 hover:border-cyan-400">
          Export CSV
        </a>
      </div>

      <form method="get" className="grid md:grid-cols-[1fr_180px_auto] gap-3 mb-4">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search name, email, service, message..."
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-md"
        />
        <select name="status" defaultValue={status} className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-md">
          <option value="all">All statuses</option>
          <option value="open">Open</option>
          <option value="triaged">Triaged</option>
          <option value="closed">Closed</option>
        </select>
        <button className="px-4 py-2 rounded-md border border-slate-700 hover:border-cyan-400">Apply</button>
      </form>

      <div className="space-y-3">
        {messages.map((message) => (
          <article key={message.id} className="border border-slate-800 rounded-lg p-4 bg-slate-950/30">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-medium">{message.firstName} {message.lastName}</h3>
                <p className="text-sm text-slate-400">{message.email} · {new Date(message.createdAt).toLocaleString()}</p>
                <p className="text-xs text-slate-500">Source: {message.sourcePage}</p>
              </div>
              <form action={updateMessageAction} className="flex gap-2 text-xs items-center">
                <input type="hidden" name="id" value={message.id} />
                <select name="status" defaultValue={message.status} className="bg-slate-800 border border-slate-700 rounded px-2 py-1">
                  <option value="open">open</option>
                  <option value="triaged">triaged</option>
                  <option value="closed">closed</option>
                </select>
                <input
                  name="assignedToUserId"
                  defaultValue={message.assignedToUserId || ''}
                  placeholder="assignee id"
                  className="bg-slate-800 border border-slate-700 rounded px-2 py-1 w-28"
                />
                <button className="px-2 py-1 rounded border border-slate-700">Save</button>
              </form>
            </div>
            <p className="mt-3 text-sm text-slate-200 whitespace-pre-wrap">{message.messageBody}</p>
            <p className="mt-2 text-xs text-cyan-300">Service: {message.serviceInterest || 'n/a'}</p>
          </article>
        ))}
        {messages.length === 0 && <p className="text-sm text-slate-400">No messages found.</p>}
      </div>
    </section>
  );
}
