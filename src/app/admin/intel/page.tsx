export const metadata = { title: 'Admin — Intel' };

export default function AdminIntelPage() {
  const feeds = [
    { source: 'CISA Advisory', severity: 'Critical', title: 'CVE-2026-1234 — Remote Code Execution in OpenSSL', date: 'Mar 7, 2026', status: 'Active' },
    { source: 'Internal SOC', severity: 'High', title: 'Phishing campaign targeting finance department', date: 'Mar 6, 2026', status: 'Investigating' },
    { source: 'Threat Feed', severity: 'Medium', title: 'New ransomware variant detected in wild', date: 'Mar 5, 2026', status: 'Monitoring' },
    { source: 'OSINT', severity: 'Low', title: 'Industry breach report — healthcare sector', date: 'Mar 4, 2026', status: 'Closed' },
    { source: 'Internal SOC', severity: 'High', title: 'Anomalous outbound traffic from endpoint cluster B', date: 'Mar 3, 2026', status: 'Resolved' },
  ];

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex flex-wrap gap-3 justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Threat Intelligence</h2>
          <p className="text-sm text-slate-400">Aggregated threat feeds, advisories, and internal SOC intel.</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-500/10 text-red-400 border border-red-500/20">1 Critical</span>
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">2 High</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Active Threats', value: '3', color: 'text-red-400' },
          { label: 'IOCs Tracked', value: '1,247', color: 'text-cyan-400' },
          { label: 'Feeds Active', value: '12', color: 'text-green-400' },
          { label: 'Avg Response', value: '< 4 min', color: 'text-amber-400' },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-950/50 border border-slate-800 rounded-lg p-3 text-center">
            <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {feeds.map((item, i) => (
          <div key={i} className="border border-slate-800 rounded-lg p-4 bg-slate-950/30 flex flex-wrap items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  item.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                  item.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                  item.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-slate-700 text-slate-400'
                }`}>{item.severity}</span>
                <span className="text-xs text-slate-500 font-mono">{item.source}</span>
              </div>
              <h3 className="font-medium text-white">{item.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{item.date}</p>
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${
              item.status === 'Active' || item.status === 'Investigating' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
              item.status === 'Resolved' || item.status === 'Closed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
              'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            }`}>{item.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
