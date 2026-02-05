const grants = [
  { role: 'Platform Admin', permission: 'org.manage', scope: '*' },
  { role: 'SOC Analyst', permission: 'alerts.read', scope: 'org:{id}' },
  { role: 'SOC Analyst', permission: 'inbox.triage', scope: 'org:{id}' },
  { role: 'Compliance Lead', permission: 'audit.export', scope: 'org:{id}' },
];

export default function GrantsAdminPage() {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-2">RBAC Grants</h2>
      <p className="text-sm text-slate-400 mb-6">Role to permission mapping with explicit scopes.</p>
      <ul className="space-y-3">
        {grants.map((grant, index) => (
          <li key={`${grant.role}-${grant.permission}-${index}`} className="border border-slate-800 rounded-lg p-4 bg-slate-950/40">
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="font-medium text-cyan-300">{grant.role}</span>
              <span className="text-slate-400">→</span>
              <span>{grant.permission}</span>
              <span className="text-slate-500">[{grant.scope}]</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
