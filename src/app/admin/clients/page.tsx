export const metadata = { title: 'Admin — Clients' };

export default function AdminClientsPage() {
  const clients = [
    { name: 'Acme Holdings', tier: 'Enterprise', status: 'Active', contacts: 4, services: 'SOC, Compliance, Asset Recovery', since: 'Jan 2024', health: 'Good' },
    { name: 'Meridian Advisors', tier: 'Professional', status: 'Active', contacts: 2, services: 'Compliance, Wealth Advisory', since: 'Mar 2024', health: 'Good' },
    { name: 'Thompson & Associates', tier: 'Professional', status: 'Active', contacts: 1, services: 'Audit, GRC', since: 'Apr 2024', health: 'Attention' },
    { name: 'Pacific Ventures', tier: 'Enterprise', status: 'Active', contacts: 3, services: 'SOC, Pen Testing, Cloud Security', since: 'Jun 2024', health: 'Good' },
    { name: 'Silverstone Real Estate', tier: 'Community', status: 'Onboarding', contacts: 1, services: 'Property Security', since: 'Feb 2026', health: 'New' },
    { name: 'NovaTech Solutions', tier: 'Enterprise', status: 'Active', contacts: 5, services: 'Full Suite', since: 'Sep 2023', health: 'Good' },
  ];

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex flex-wrap gap-3 justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Client Management</h2>
          <p className="text-sm text-slate-400">Enterprise client directory with service subscriptions and account health.</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Clients', value: '6', color: 'text-white' },
          { label: 'Enterprise', value: '3', color: 'text-cyan-400' },
          { label: 'Onboarding', value: '1', color: 'text-amber-400' },
          { label: 'Avg Health', value: 'Good', color: 'text-green-400' },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-950/50 border border-slate-800 rounded-lg p-3 text-center">
            <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-500 text-left">
              <th className="py-3 px-3 font-medium">Client</th>
              <th className="py-3 px-3 font-medium">Tier</th>
              <th className="py-3 px-3 font-medium">Status</th>
              <th className="py-3 px-3 font-medium">Services</th>
              <th className="py-3 px-3 font-medium">Contacts</th>
              <th className="py-3 px-3 font-medium">Health</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.name} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                <td className="py-3 px-3">
                  <div className="font-medium text-white">{client.name}</div>
                  <div className="text-xs text-slate-500">Since {client.since}</div>
                </td>
                <td className="py-3 px-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    client.tier === 'Enterprise' ? 'bg-cyan-500/20 text-cyan-400' :
                    client.tier === 'Professional' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-slate-700 text-slate-400'
                  }`}>{client.tier}</span>
                </td>
                <td className="py-3 px-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    client.status === 'Active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>{client.status}</span>
                </td>
                <td className="py-3 px-3 text-slate-400 text-xs">{client.services}</td>
                <td className="py-3 px-3 text-slate-400 text-center">{client.contacts}</td>
                <td className="py-3 px-3">
                  <span className={`text-xs font-bold ${
                    client.health === 'Good' ? 'text-green-400' :
                    client.health === 'Attention' ? 'text-amber-400' :
                    'text-cyan-400'
                  }`}>{client.health}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
