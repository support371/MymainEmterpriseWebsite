export default function RetirementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Retirement Planning</h1>
        <p className="text-sm text-slate-400">Retirement accounts and projections</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <p className="text-xs text-slate-400 uppercase tracking-wider">401(k) Balance</p>
          <p className="text-2xl font-bold mt-1">$892,400</p>
          <p className="text-xs text-emerald-400 mt-1">On track for target</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <p className="text-xs text-slate-400 uppercase tracking-wider">IRA Balance</p>
          <p className="text-2xl font-bold mt-1">$345,200</p>
          <p className="text-xs text-emerald-400 mt-1">Annual contribution: $6,500</p>
        </div>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Retirement Projection</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-slate-800">
            <span className="text-slate-400">Target Retirement Age</span>
            <span>65</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-800">
            <span className="text-slate-400">Projected Balance at Retirement</span>
            <span className="font-medium">$2,840,000</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-800">
            <span className="text-slate-400">Monthly Income (projected)</span>
            <span className="font-medium">$11,200</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-400">Funding Status</span>
            <span className="text-emerald-400">92% funded</span>
          </div>
        </div>
      </div>
    </div>
  );
}
