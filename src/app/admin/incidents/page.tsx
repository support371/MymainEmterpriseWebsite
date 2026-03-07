export const metadata = { title: 'Admin — Incidents' };

export default function AdminIncidentsPage() {
  const incidents = [
    { id: 'INC-052', title: 'Brute force attempt on admin portal', severity: 'High', status: 'Investigating', assignee: 'David Kim', opened: 'Mar 7, 2026', sla: '4h' },
    { id: 'INC-051', title: 'Malware detected on endpoint WS-0142', severity: 'Critical', status: 'Contained', assignee: 'Maria Santos', opened: 'Mar 6, 2026', sla: '1h' },
    { id: 'INC-050', title: 'Unauthorized access attempt — VPN gateway', severity: 'High', status: 'Resolved', assignee: 'Wei Zhang', opened: 'Mar 5, 2026', sla: '4h' },
    { id: 'INC-049', title: 'Phishing email reported by 3 employees', severity: 'Medium', status: 'Resolved', assignee: 'Lisa Chen', opened: 'Mar 4, 2026', sla: '8h' },
    { id: 'INC-048', title: 'SSL certificate expiry warning — api.gem.com', severity: 'Low', status: 'Closed', assignee: 'Thomas Anderson', opened: 'Mar 3, 2026', sla: '24h' },
    { id: 'INC-047', title: 'Port 22 exposure on DMZ firewall', severity: 'High', status: 'Closed', assignee: 'Wei Zhang', opened: 'Mar 1, 2026', sla: '4h' },
  ];

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex flex-wrap gap-3 justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Incident Management</h2>
          <p className="text-sm text-slate-400">Active and historical security incidents with SLA tracking.</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-500/10 text-red-400 border border-red-500/20">1 Critical</span>
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">2 Active</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Open', value: '2', color: 'text-red-400' },
          { label: 'Resolved (30d)', value: '14', color: 'text-green-400' },
          { label: 'MTTR', value: '2.1h', color: 'text-cyan-400' },
          { label: 'SLA Compliance', value: '98%', color: 'text-amber-400' },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-950/50 border border-slate-800 rounded-lg p-3 text-center">
            <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {incidents.map((inc) => (
          <div key={inc.id} className="border border-slate-800 rounded-lg p-4 bg-slate-950/30">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-bold font-mono text-slate-500">{inc.id}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    inc.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                    inc.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                    inc.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-slate-700 text-slate-400'
                  }`}>{inc.severity}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    inc.status === 'Investigating' || inc.status === 'Contained' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                    inc.status === 'Resolved' || inc.status === 'Closed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>{inc.status}</span>
                </div>
                <h3 className="font-medium text-white">{inc.title}</h3>
                <p className="text-xs text-slate-500 mt-1">Assigned: {inc.assignee} · Opened: {inc.opened} · SLA: {inc.sla}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
