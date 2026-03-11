export default function DocumentsPage() {
  const documents = [
    { name: 'Tech Park Purchase Agreement', type: 'Contract', uploaded: '2026-03-08', size: '2.4 MB' },
    { name: 'Title Search Report - Unit 7', type: 'Report', uploaded: '2026-03-06', size: '1.1 MB' },
    { name: 'Environmental Assessment', type: 'Assessment', uploaded: '2026-03-04', size: '3.8 MB' },
    { name: 'Lease Agreement - Downtown Retail', type: 'Contract', uploaded: '2026-03-01', size: '890 KB' },
    { name: 'Property Valuation Q1 2026', type: 'Report', uploaded: '2026-02-28', size: '1.5 MB' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Property Documents</h1>
        <p className="text-sm text-slate-400">Titles, contracts, and property reports</p>
      </div>
      <div className="space-y-3">
        {documents.map((doc, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{doc.name}</p>
              <p className="text-xs text-slate-400 mt-1">{doc.type} · {doc.size} · Uploaded {doc.uploaded}</p>
            </div>
            <button className="px-3 py-1.5 text-xs border border-slate-700 rounded hover:border-cyan-500 transition">
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
