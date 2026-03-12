import { getCurrentPortalSession } from '@/lib/auth/session';
import { audit } from '@/lib/audit';

export const metadata = {
  title: "Client Portal"
};

export default async function PortalDashboard({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await getCurrentPortalSession();
  const params = await searchParams;

  if (params.denied === '1' && session) {
    audit({ action: 'route_denied', user: session.email, route: '/portal' });
  }

  const stats = [
    { label: 'Active Incidents', value: '3', change: '-2 this week' },
    { label: 'Pending Requests', value: '12', change: '+4 this week' },
    { label: 'Compliance Score', value: '94%', change: '+2% this month' },
    { label: 'Asset Value', value: '$2.4M', change: '+$180K this quarter' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Welcome, {session?.name}</h1>
        <p className="text-sm text-slate-400">Enterprise dashboard overview</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <p className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
            <p className="text-xs text-cyan-400 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3 text-sm">
            {[
              { action: 'Incident resolved', detail: 'Phishing attempt blocked', time: '2h ago' },
              { action: 'Document uploaded', detail: 'Q4 compliance report', time: '5h ago' },
              { action: 'Request submitted', detail: 'Security audit request', time: '1d ago' },
              { action: 'User added', detail: 'New analyst onboarded', time: '2d ago' },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-slate-800 last:border-0">
                <div>
                  <p className="text-slate-200">{item.action}</p>
                  <p className="text-slate-400 text-xs">{item.detail}</p>
                </div>
                <span className="text-slate-500 text-xs">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'New Request', href: '/portal/requests' },
              { label: 'View Incidents', href: '/portal/cybersecurity/incidents' },
              { label: 'Compliance', href: '/portal/cybersecurity/compliance' },
              { label: 'Audit Log', href: '/portal/audit' },
            ].map((action) => (
              <a
                key={action.href}
                href={action.href}
                className="block text-center py-3 bg-slate-800 border border-slate-700 rounded-lg hover:border-cyan-500 transition text-sm"
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
