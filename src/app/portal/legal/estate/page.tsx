export default function EstatePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Estate Planning</h1>
        <p className="text-sm text-slate-400">Estate documents and succession planning</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="font-medium">Living Trust</h3>
          <p className="text-sm text-slate-400 mt-2">Revocable living trust established 2024-01-15</p>
          <p className="text-xs text-emerald-400 mt-2">Status: Current</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="font-medium">Last Will & Testament</h3>
          <p className="text-sm text-slate-400 mt-2">Last updated 2025-09-20</p>
          <p className="text-xs text-emerald-400 mt-2">Status: Current</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="font-medium">Beneficiary Designations</h3>
          <p className="text-sm text-slate-400 mt-2">3 accounts with designated beneficiaries</p>
          <p className="text-xs text-amber-400 mt-2">Review recommended</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="font-medium">Insurance Policies</h3>
          <p className="text-sm text-slate-400 mt-2">Life insurance and umbrella policies</p>
          <p className="text-xs text-emerald-400 mt-2">Status: Active</p>
        </div>
      </div>
    </div>
  );
}
