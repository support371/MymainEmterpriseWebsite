const teams = [
  { id: 'T-01', name: 'Security Operations', lead: 'A. Morgan', members: 12, roleProfile: 'soc_analyst' },
  { id: 'T-02', name: 'Incident Response', lead: 'L. Singh', members: 7, roleProfile: 'incident_commander' },
  { id: 'T-03', name: 'Compliance & Audit', lead: 'K. Ofori', members: 5, roleProfile: 'compliance_admin' },
];

export default function TeamsAdminPage() {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-2">Teams</h2>
      <p className="text-sm text-slate-400 mb-6">Manage team membership and role profiles.</p>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-800">
              <th className="py-2 pr-4">Team</th>
              <th className="py-2 pr-4">Lead</th>
              <th className="py-2 pr-4">Members</th>
              <th className="py-2 pr-4">Role Template</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.id} className="border-b border-slate-800/70">
                <td className="py-3 pr-4">{team.name}</td>
                <td className="py-3 pr-4">{team.lead}</td>
                <td className="py-3 pr-4">{team.members}</td>
                <td className="py-3 pr-4">
                  <span className="px-2 py-1 rounded bg-slate-800 text-cyan-300">{team.roleProfile}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
