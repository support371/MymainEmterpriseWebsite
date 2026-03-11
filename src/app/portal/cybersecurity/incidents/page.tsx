export default function IncidentsPage() {
  const incidents = [
    { id: 'INC-001', title: 'Phishing Campaign Detected', severity: 'high', status: 'investigating', created: '2026-03-10' },
    { id: 'INC-002', title: 'Unauthorized Access Attempt', severity: 'critical', status: 'open', created: '2026-03-09' },
    { id: 'INC-003', title: 'Malware Quarantined', severity: 'medium', status: 'resolved', created: '2026-03-08' },
    { id: 'INC-004', title: 'DDoS Mitigation Active', severity: 'high', status: 'mitigated', created: '2026-03-07' },
    { id: 'INC-005', title: 'SSL Certificate Expiry Warning', severity: 'low', status: 'resolved', created: '2026-03-05' },
  ];

  const severityColor: Record<string, string> = {
    critical: 'bg-rose-600/20 text-rose-400',
    high: 'bg-orange-600/20 text-orange-400',
    medium: 'bg-amber-600/20 text-amber-400',
    low: 'bg-slate-600/20 text-slate-400',
  };

  const statusColor: Record<string, string> = {
    open: 'text-rose-400',
    investigating: 'text-amber-400',
    mitigated: 'text-cyan-400',
    resolved: 'text-emerald-400',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Security Incidents</h1>
        <p className="text-sm text-slate-400">Active and historical incident tracking</p>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-slate-300">ID</th>
              <th className="text-left px-4 py-3 font-medium text-slate-300">Title</th>
              <th className="text-left px-4 py-3 font-medium text-slate-300">Severity</th>
              <th className="text-left px-4 py-3 font-medium text-slate-300">Status</th>
              <th className="text-left px-4 py-3 font-medium text-slate-300">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {incidents.map((inc) => (
              <tr key={inc.id} className="hover:bg-slate-800/30">
                <td className="px-4 py-3 font-mono text-xs">{inc.id}</td>
                <td className="px-4 py-3">{inc.title}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${severityColor[inc.severity] || ''}`}>
                    {inc.severity}
                  </span>
                </td>
                <td className={`px-4 py-3 capitalize ${statusColor[inc.status] || ''}`}>{inc.status}</td>
                <td className="px-4 py-3 text-slate-400">{inc.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
