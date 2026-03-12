import Link from 'next/link';

export default function RealEstatePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Real Estate</h1>
        <p className="text-sm text-slate-400">Property portfolio and transaction management</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/portal/real-estate/deals" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500 transition block">
          <h3 className="font-medium text-lg">Active Deals</h3>
          <p className="text-sm text-slate-400 mt-2">Track ongoing property transactions and acquisitions</p>
          <p className="text-2xl font-bold text-cyan-400 mt-3">5</p>
        </Link>
        <Link href="/portal/real-estate/documents" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500 transition block">
          <h3 className="font-medium text-lg">Documents</h3>
          <p className="text-sm text-slate-400 mt-2">Property documents, titles, and contracts</p>
          <p className="text-2xl font-bold text-cyan-400 mt-3">23</p>
        </Link>
      </div>
    </div>
  );
}
