export default function DealsPage() {
  const deals = [
    { id: 'RE-001', property: 'Tech Park Office Complex', type: 'Acquisition', value: '$4.2M', status: 'Due Diligence', closing: '2026-04-15' },
    { id: 'RE-002', property: 'Downtown Retail Space', type: 'Lease', value: '$850K/yr', status: 'Negotiation', closing: '2026-03-30' },
    { id: 'RE-003', property: 'Industrial Warehouse Unit 7', type: 'Acquisition', value: '$1.8M', status: 'Closing', closing: '2026-03-20' },
    { id: 'RE-004', property: 'Residential Portfolio (12 units)', type: 'Disposal', value: '$3.6M', status: 'Listed', closing: 'TBD' },
    { id: 'RE-005', property: 'Mixed-Use Development Lot', type: 'Acquisition', value: '$6.1M', status: 'Under Review', closing: '2026-05-01' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Active Deals</h1>
        <p className="text-sm text-slate-400">Property transactions in progress</p>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-slate-300">ID</th>
              <th className="text-left px-4 py-3 font-medium text-slate-300">Property</th>
              <th className="text-left px-4 py-3 font-medium text-slate-300">Type</th>
              <th className="text-left px-4 py-3 font-medium text-slate-300">Value</th>
              <th className="text-left px-4 py-3 font-medium text-slate-300">Status</th>
              <th className="text-left px-4 py-3 font-medium text-slate-300">Target Close</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {deals.map((deal) => (
              <tr key={deal.id} className="hover:bg-slate-800/30">
                <td className="px-4 py-3 font-mono text-xs">{deal.id}</td>
                <td className="px-4 py-3">{deal.property}</td>
                <td className="px-4 py-3 text-slate-400">{deal.type}</td>
                <td className="px-4 py-3 font-medium">{deal.value}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded text-xs bg-cyan-600/20 text-cyan-400">{deal.status}</span>
                </td>
                <td className="px-4 py-3 text-slate-400">{deal.closing}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
