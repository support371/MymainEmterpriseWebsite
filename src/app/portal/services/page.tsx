export default function PortalServicesPage() {
  const services = [
    { name: 'Threat Monitoring', status: 'Active', tier: 'Enterprise', description: 'Real-time SOC monitoring and alerting' },
    { name: 'Incident Response', status: 'Active', tier: 'Enterprise', description: '24/7 rapid incident response team' },
    { name: 'Compliance Management', status: 'Active', tier: 'Professional', description: 'Automated compliance tracking and reporting' },
    { name: 'Asset Recovery', status: 'Pending', tier: 'Enterprise', description: 'Digital and physical asset recovery services' },
    { name: 'Vulnerability Assessment', status: 'Active', tier: 'Professional', description: 'Continuous vulnerability scanning' },
    { name: 'Legal Advisory', status: 'Active', tier: 'Enterprise', description: 'Legal counsel for cybersecurity matters' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Subscribed Services</h1>
        <p className="text-sm text-slate-400">Your active service subscriptions and entitlements</p>
      </div>
      <div className="grid gap-4">
        {services.map((svc) => (
          <div key={svc.name} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
            <div>
              <h3 className="font-medium">{svc.name}</h3>
              <p className="text-sm text-slate-400 mt-1">{svc.description}</p>
            </div>
            <div className="text-right">
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                svc.status === 'Active' ? 'bg-emerald-600/20 text-emerald-400' : 'bg-amber-600/20 text-amber-400'
              }`}>
                {svc.status}
              </span>
              <p className="text-xs text-slate-500 mt-1">{svc.tier}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
