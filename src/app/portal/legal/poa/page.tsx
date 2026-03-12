export default function POAPage() {
  const documents = [
    { title: 'General Power of Attorney', status: 'Active', granted: '2025-06-15', expires: '2027-06-15' },
    { title: 'Financial POA - Trust Account', status: 'Active', granted: '2025-08-01', expires: '2026-08-01' },
    { title: 'Healthcare Directive', status: 'Active', granted: '2025-03-10', expires: 'No expiry' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Power of Attorney</h1>
        <p className="text-sm text-slate-400">Active POA documents and delegations</p>
      </div>
      <div className="space-y-3">
        {documents.map((doc, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{doc.title}</h3>
              <span className="px-2 py-0.5 rounded text-xs bg-emerald-600/20 text-emerald-400">{doc.status}</span>
            </div>
            <div className="flex gap-6 mt-3 text-xs text-slate-400">
              <span>Granted: {doc.granted}</span>
              <span>Expires: {doc.expires}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
