export default function MonitoringPage() {
  const feeds = [
    { source: 'Perimeter Firewall', status: 'online', events: 1247, lastEvent: '2 min ago' },
    { source: 'Endpoint Detection', status: 'online', events: 892, lastEvent: '5 min ago' },
    { source: 'Email Gateway', status: 'online', events: 3401, lastEvent: '1 min ago' },
    { source: 'Cloud WAF', status: 'degraded', events: 567, lastEvent: '12 min ago' },
    { source: 'DNS Sinkhole', status: 'online', events: 234, lastEvent: '8 min ago' },
    { source: 'SIEM Aggregator', status: 'online', events: 8920, lastEvent: '30 sec ago' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Threat Monitoring</h1>
        <p className="text-sm text-slate-400">Real-time security feed status</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {feeds.map((feed) => (
          <div key={feed.source} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-sm">{feed.source}</h3>
              <span className={`w-2 h-2 rounded-full ${
                feed.status === 'online' ? 'bg-emerald-400' : 'bg-amber-400'
              }`} />
            </div>
            <p className="text-2xl font-bold">{feed.events.toLocaleString()}</p>
            <p className="text-xs text-slate-400 mt-1">events today · last {feed.lastEvent}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
