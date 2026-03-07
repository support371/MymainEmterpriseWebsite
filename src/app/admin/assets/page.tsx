export const metadata = { title: 'Admin — Assets' };

export default function AdminAssetsPage() {
  const assets = [
    { name: 'Primary Data Center', type: 'Infrastructure', value: '$4.2M', risk: 'Low', location: 'Virginia, US', compliance: 'SOC 2' },
    { name: 'Summit Plaza — Building A', type: 'Real Estate', value: '$12.8M', risk: 'Medium', location: 'New York, US', compliance: 'N/A' },
    { name: 'Cloud Infrastructure (AWS)', type: 'Digital', value: '$1.8M/yr', risk: 'Low', location: 'Multi-region', compliance: 'ISO 27001' },
    { name: 'QFS Settlement Engine', type: 'Digital', value: '$6.5M', risk: 'High', location: 'Singapore', compliance: 'NIST 800-171' },
    { name: 'Alliance Trust Portfolio', type: 'Financial', value: '$18.4M', risk: 'Medium', location: 'Global', compliance: 'SEC Reg' },
    { name: 'Edge Firewall Cluster', type: 'Infrastructure', value: '$340K', risk: 'Critical', location: 'DMZ', compliance: 'PCI DSS' },
  ];

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex flex-wrap gap-3 justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Asset Registry</h2>
          <p className="text-sm text-slate-400">Managed digital, physical, and financial assets with risk classification.</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Assets', value: '289', color: 'text-white' },
          { label: 'Total Value', value: '$52.4M', color: 'text-cyan-400' },
          { label: 'High Risk', value: '12', color: 'text-orange-400' },
          { label: 'Compliant', value: '94%', color: 'text-green-400' },
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
              <th className="py-3 px-3 font-medium">Asset</th>
              <th className="py-3 px-3 font-medium">Type</th>
              <th className="py-3 px-3 font-medium">Value</th>
              <th className="py-3 px-3 font-medium">Risk</th>
              <th className="py-3 px-3 font-medium">Location</th>
              <th className="py-3 px-3 font-medium">Compliance</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.name} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                <td className="py-3 px-3 font-medium text-white">{asset.name}</td>
                <td className="py-3 px-3 text-slate-400">{asset.type}</td>
                <td className="py-3 px-3 text-cyan-400 font-mono">{asset.value}</td>
                <td className="py-3 px-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    asset.risk === 'Critical' ? 'bg-red-500/20 text-red-400' :
                    asset.risk === 'High' ? 'bg-orange-500/20 text-orange-400' :
                    asset.risk === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>{asset.risk}</span>
                </td>
                <td className="py-3 px-3 text-slate-400">{asset.location}</td>
                <td className="py-3 px-3 text-slate-500 font-mono text-xs">{asset.compliance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
