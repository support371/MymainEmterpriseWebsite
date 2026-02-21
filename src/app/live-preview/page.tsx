import Link from 'next/link';
import { Activity, Compass, LayoutTemplate, Server, ShieldCheck } from 'lucide-react';
import { appRoutes, legacyRedirects } from '@/lib/siteRoutes';

export const metadata = {
  title: 'Enterprise Live Preview | GEM Cyber',
  description:
    'Unified live preview that combines homepage enterprise positioning with complete frontend/backend route governance.',
};

const backendEndpoints = [
  { method: 'GET', path: '/api/routes', description: 'Route + redirect registry payload for frontend/admin tooling.' },
  { method: 'GET', path: '/api/health', description: 'Deployment health check endpoint for uptime and smoke tests.' },
  { method: 'POST', path: '/api/contact', description: 'Contact request intake endpoint.' },
  { method: 'POST', path: '/api/newsletter', description: 'Newsletter subscription endpoint.' },
  { method: 'POST', path: '/api/admin/login', description: 'Admin session authentication endpoint.' },
];

const highlightMetrics = [
  { label: 'Active web routes', value: `${appRoutes.length}`, icon: LayoutTemplate },
  { label: 'Redirect rules', value: `${legacyRedirects.length}`, icon: Compass },
  { label: 'Core API surfaces', value: `${backendEndpoints.length}`, icon: Server },
];

export default function LivePreviewPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-slate-800/70 pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(14,116,144,0.26),transparent_36%),radial-gradient(circle_at_90%_0%,rgba(59,130,246,0.18),transparent_30%)]" />
        <div className="container relative mx-auto px-4 pb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">
            <ShieldCheck className="h-4 w-4" />
            Enterprise Composite Preview
          </span>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
            Unified Webpage: Brand Experience + Route Governance
          </h1>
          <p className="mt-5 max-w-3xl text-slate-300">
            This single enterprise page merges the homepage messaging style with the operational route directory so stakeholders can review
            both customer-facing positioning and backend readiness in one live surface.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="rounded-lg bg-gradient-to-r from-cyan-400 to-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950">
              Open Homepage
            </Link>
            <Link href="/routes" className="rounded-lg border border-cyan-500/60 px-5 py-2.5 text-sm font-semibold text-cyan-100 hover:bg-cyan-500/10">
              Open Route Directory
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-800/70 bg-slate-900/30 py-8">
        <div className="container mx-auto grid gap-4 px-4 md:grid-cols-3">
          {highlightMetrics.map((metric) => (
            <article key={metric.label} className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-300">
                <metric.icon className="h-4 w-4" />
              </div>
              <p className="mt-4 text-sm text-slate-400">{metric.label}</p>
              <p className="text-3xl font-semibold text-cyan-300">{metric.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="text-2xl font-semibold">Frontend Route Coverage</h2>
            <p className="mt-2 text-sm text-slate-400">Published user/admin/legal routes consolidated for delivery verification.</p>
            <div className="mt-5 space-y-3">
              {appRoutes.map((route) => (
                <div key={route.path} className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <Link href={route.path} className="font-medium text-cyan-300 hover:text-cyan-200">
                      {route.path}
                    </Link>
                    <span className="rounded-full border border-slate-700 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-300">
                      {route.category}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">{route.label} — {route.description}</p>
                </div>
              ))}
            </div>
          </article>

          <div className="space-y-8">
            <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h2 className="text-2xl font-semibold">Backend Endpoint Readiness</h2>
              <p className="mt-2 text-sm text-slate-400">API surfaces required for health checks, routing data, and communications.</p>
              <div className="mt-5 space-y-3">
                {backendEndpoints.map((endpoint) => (
                  <div key={`${endpoint.method}-${endpoint.path}`} className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em]">
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
                        {endpoint.method}
                      </span>
                      <Link href={endpoint.path} className="text-cyan-300 hover:text-cyan-200">
                        {endpoint.path}
                      </Link>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{endpoint.description}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h2 className="text-2xl font-semibold">Legacy Redirect Protection</h2>
              <div className="mt-4 space-y-2">
                {legacyRedirects.map((redirect) => (
                  <div key={redirect.source} className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm">
                    <Activity className="mt-0.5 h-4 w-4 flex-none text-cyan-300" />
                    <p>
                      <span className="text-cyan-300">{redirect.source}</span> →{' '}
                      <span className="text-emerald-300">{redirect.destination}</span>{' '}
                      <span className="text-slate-400">({redirect.permanent ? '301' : '307'} · {redirect.reason})</span>
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
