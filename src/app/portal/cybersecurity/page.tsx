import Link from 'next/link';

export default function CybersecurityPage() {
  const modules = [
    { href: '/portal/cybersecurity/incidents', label: 'Incidents', description: 'Active and resolved security incidents', count: 3 },
    { href: '/portal/cybersecurity/monitoring', label: 'Monitoring', description: 'Real-time threat monitoring dashboard', count: null },
    { href: '/portal/cybersecurity/compliance', label: 'Compliance', description: 'Regulatory compliance status and reports', count: null },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Cybersecurity</h1>
        <p className="text-sm text-slate-400">Security operations and threat management</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {modules.map((mod) => (
          <Link
            key={mod.href}
            href={mod.href}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-cyan-500 transition block"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{mod.label}</h3>
              {mod.count !== null && (
                <span className="bg-rose-600/20 text-rose-400 text-xs px-2 py-0.5 rounded">{mod.count}</span>
              )}
            </div>
            <p className="text-sm text-slate-400">{mod.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
