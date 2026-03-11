export default function CompliancePage() {
  const frameworks = [
    { name: 'NIST CSF 2.0', score: 94, status: 'Compliant', lastAudit: '2026-02-15' },
    { name: 'SOC 2 Type II', score: 91, status: 'Compliant', lastAudit: '2026-01-20' },
    { name: 'CMMC Level 2', score: 87, status: 'In Progress', lastAudit: '2026-03-01' },
    { name: 'ISO 27001', score: 96, status: 'Certified', lastAudit: '2025-12-10' },
    { name: 'HIPAA', score: 89, status: 'Compliant', lastAudit: '2026-02-28' },
    { name: 'FedRAMP', score: 72, status: 'Remediation', lastAudit: '2026-03-05' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Compliance Dashboard</h1>
        <p className="text-sm text-slate-400">Regulatory framework compliance status</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {frameworks.map((fw) => (
          <div key={fw.name} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h3 className="font-medium">{fw.name}</h3>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <p className={`text-3xl font-bold ${fw.score >= 90 ? 'text-emerald-400' : fw.score >= 80 ? 'text-amber-400' : 'text-rose-400'}`}>
                  {fw.score}%
                </p>
                <p className="text-xs text-slate-400 mt-1">Last audit: {fw.lastAudit}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${
                fw.status === 'Certified' || fw.status === 'Compliant'
                  ? 'bg-emerald-600/20 text-emerald-400'
                  : fw.status === 'In Progress'
                    ? 'bg-amber-600/20 text-amber-400'
                    : 'bg-rose-600/20 text-rose-400'
              }`}>
                {fw.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
