export default function InvestmentsPage() {
  const holdings = [
    { asset: 'US Treasury Bonds', allocation: '35%', value: '$840K', change: '+1.2%' },
    { asset: 'Technology ETF', allocation: '25%', value: '$600K', change: '+4.8%' },
    { asset: 'Real Estate REIT', allocation: '20%', value: '$480K', change: '+2.1%' },
    { asset: 'Gold Holdings', allocation: '10%', value: '$240K', change: '+0.8%' },
    { asset: 'Cash & Equivalents', allocation: '10%', value: '$240K', change: '0.0%' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Investment Portfolio</h1>
        <p className="text-sm text-slate-400">Asset allocation and performance overview</p>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <p className="text-xs text-slate-400 uppercase tracking-wider">Total Portfolio Value</p>
        <p className="text-3xl font-bold mt-1">$2,400,000</p>
        <p className="text-sm text-emerald-400 mt-1">+$42,300 (1.8%) this month</p>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-slate-300">Asset</th>
              <th className="text-left px-4 py-3 font-medium text-slate-300">Allocation</th>
              <th className="text-left px-4 py-3 font-medium text-slate-300">Value</th>
              <th className="text-left px-4 py-3 font-medium text-slate-300">Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {holdings.map((h) => (
              <tr key={h.asset} className="hover:bg-slate-800/30">
                <td className="px-4 py-3">{h.asset}</td>
                <td className="px-4 py-3 text-slate-400">{h.allocation}</td>
                <td className="px-4 py-3 font-medium">{h.value}</td>
                <td className={`px-4 py-3 ${h.change.startsWith('+') ? 'text-emerald-400' : 'text-slate-400'}`}>{h.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
