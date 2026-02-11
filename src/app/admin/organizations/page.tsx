const organizations = [
  { id: 'ORG-100', name: 'Vertex Finance', domain: 'vertex.example', billingEnabled: true, tier: 'Enterprise' },
  { id: 'ORG-233', name: 'Northwind Health', domain: 'northwind.example', billingEnabled: false, tier: 'Pilot' },
];

export default function OrganizationsAdminPage() {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-2">Organizations</h2>
      <p className="text-sm text-slate-400 mb-6">Track tenant domains, account tiering, and billing flags.</p>
      <div className="grid gap-4">
        {organizations.map((org) => (
          <article key={org.id} className="p-4 rounded-lg border border-slate-800 bg-slate-950/40">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-medium">{org.name}</h3>
                <p className="text-sm text-slate-400">{org.domain}</p>
              </div>
              <div className="flex gap-2 text-xs">
                <span className="px-2 py-1 rounded bg-slate-800">{org.tier}</span>
                <span className={`px-2 py-1 rounded ${org.billingEnabled ? 'bg-emerald-900/50 text-emerald-300' : 'bg-amber-900/50 text-amber-300'}`}>
                  {org.billingEnabled ? 'Billing on' : 'Billing off'}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
