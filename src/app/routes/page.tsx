import Link from 'next/link';
import { appRoutes, legacyRedirects } from '@/lib/siteRoutes';

export const metadata = {
  title: 'Route Directory | GEM Cyber',
  description: 'Published route and redirect registry for frontend and backend route management.',
};

const categoryStyles: Record<string, string> = {
  core: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40',
  platform: 'bg-sky-500/15 text-sky-300 border border-sky-500/40',
  admin: 'bg-violet-500/15 text-violet-300 border border-violet-500/40',
  legal: 'bg-amber-500/15 text-amber-300 border border-amber-500/40',
};

const backendEndpoints = [
  { method: 'GET', path: '/api/routes', description: 'Route + redirect registry payload for frontend/admin tooling.' },
  { method: 'GET', path: '/api/health', description: 'Deployment health check endpoint for uptime and smoke tests.' },
  { method: 'GET', path: '/api/contact', description: 'Contact message intake endpoint.' },
  { method: 'POST', path: '/api/newsletter', description: 'Newsletter subscription endpoint.' },
  { method: 'POST', path: '/api/admin/login', description: 'Admin session authentication endpoint.' },
  { method: 'POST', path: '/api/admin/logout', description: 'Admin session termination and cookie clearing.' },
  { method: 'GET', path: '/api/admin/inbox', description: 'Inbox message export and triage data endpoint.' },
];

export default function RoutesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3">
          <span className="inline-block rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1 text-xs uppercase tracking-[0.15em] text-cyan-300">
            Full-Stack Route Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold">Frontend + Backend Route Management</h1>
          <p className="text-slate-300 max-w-3xl">
            This page documents route URLs, categories, and legacy redirect paths. Backend JSON is available at{' '}
            <Link href="/api/routes" className="text-cyan-300 underline underline-offset-4">/api/routes</Link>.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Active Routes</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {appRoutes.map((route) => (
              <article key={route.path} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                <div className="flex items-center justify-between gap-3">
                  <Link href={route.path} className="text-cyan-300 font-semibold break-all hover:text-cyan-200">
                    {route.path}
                  </Link>
                  <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.14em] ${categoryStyles[route.category]}`}>
                    {route.category}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold">{route.label}</h3>
                <p className="mt-2 text-sm text-slate-400">{route.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Backend Endpoints</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {backendEndpoints.map((endpoint) => (
              <article key={`${endpoint.method}-${endpoint.path}`} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.14em]">
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-300">
                    {endpoint.method}
                  </span>
                  <Link href={endpoint.path} className="text-cyan-300 break-all hover:text-cyan-200">
                    {endpoint.path}
                  </Link>
                </div>
                <p className="mt-3 text-sm text-slate-400">{endpoint.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Redirect URLs</h2>
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900 text-slate-300">
                <tr>
                  <th className="px-4 py-3">Source URL</th>
                  <th className="px-4 py-3">Destination URL</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Reason</th>
                </tr>
              </thead>
              <tbody>
                {legacyRedirects.map((redirect) => (
                  <tr key={redirect.source} className="border-t border-slate-800/90">
                    <td className="px-4 py-3 text-cyan-300">{redirect.source}</td>
                    <td className="px-4 py-3 text-emerald-300">{redirect.destination}</td>
                    <td className="px-4 py-3">{redirect.permanent ? '301 Permanent' : '307 Temporary'}</td>
                    <td className="px-4 py-3 text-slate-400">{redirect.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
