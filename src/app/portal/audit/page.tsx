import { listAuditEvents } from '@/lib/audit';

export default async function AuditPage() {
  const entries = listAuditEvents();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Audit Log</h1>
          <p className="text-sm text-slate-400">{entries.length} total entries</p>
        </div>
        <a
          href="/api/portal/audit/export"
          className="px-4 py-2 border border-slate-700 hover:border-cyan-500 rounded-md text-sm transition"
        >
          Export CSV
        </a>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-slate-300">Timestamp</th>
              <th className="text-left px-4 py-3 font-medium text-slate-300">Actor</th>
              <th className="text-left px-4 py-3 font-medium text-slate-300">Action</th>
              <th className="text-left px-4 py-3 font-medium text-slate-300">Route</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {entries.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                  No audit entries yet. Actions will be logged as users interact with the portal.
                </td>
              </tr>
            )}
            {entries.map((entry, i) => (
              <tr key={i} className="hover:bg-slate-800/30">
                <td className="px-4 py-3 text-xs text-slate-400 font-mono">
                  {new Date(entry.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-xs">{entry.user || 'system'}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded text-xs bg-slate-700 text-slate-300">{entry.action}</span>
                </td>
                <td className="px-4 py-3 text-xs text-slate-400 font-mono">{entry.route || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
