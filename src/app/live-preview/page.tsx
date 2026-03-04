import type { Metadata } from 'next';
import Link from 'next/link';
import { Activity, Route, Server, ShieldCheck } from 'lucide-react';
import {
  adminOpsCoverage,
  backendEndpoints,
  legacyRedirects,
  routeCoverage,
  serviceScaleCoverage,
} from '@/data/routeInventory';

export const metadata: Metadata = {
  title: 'Live Preview',
  description: 'Enterprise route governance and backend readiness preview.',
};

const tagStyle: Record<string, string> = {
  CORE: 'border-cyan-400/30 text-cyan-300',
  PLATFORM: 'border-sky-500/30 text-sky-300',
  ADMIN: 'border-violet-500/30 text-violet-300',
  LEGAL: 'border-slate-500/30 text-slate-300',
};

export default function LivePreviewPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 pb-16 pt-28 sm:pt-32">
      <div className="container mx-auto">
        <section className="rounded-2xl border border-cyan-900/40 bg-[linear-gradient(120deg,rgba(2,6,23,0.96),rgba(2,6,23,0.85),rgba(3,15,44,0.96))] p-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-cyan-300">
            <ShieldCheck className="h-3.5 w-3.5" /> Enterprise Composite Preview
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">Unified Webpage: Brand Experience + Route Governance + Deployment Readiness</h1>
          <p className="mt-4 max-w-3xl text-slate-300">
            This single enterprise page merges homepage messaging style with route governance and service inventory so stakeholders can review customer-facing positioning, backend readiness, and scaling coverage in one live surface.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/" className="rounded-lg bg-gradient-to-r from-cyan-400 to-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950">
              Open Homepage
            </Link>
            <Link href="/routes" className="rounded-lg border border-cyan-700/60 px-5 py-2.5 text-sm font-semibold text-cyan-100 hover:bg-cyan-500/10">
              Open Route Directory
            </Link>
          </div>
        </section>

        <section className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Active web routes', value: String(routeCoverage.length), icon: Route },
            { label: 'Service modules', value: '6', icon: Activity },
            { label: 'Core API surfaces', value: String(backendEndpoints.length), icon: Server },
            { label: 'Redirect rules', value: String(legacyRedirects.length), icon: ShieldCheck },
          ].map((metric) => (
            <article key={metric.label} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <metric.icon className="h-4 w-4 text-cyan-300" />
              <p className="mt-4 text-xs uppercase tracking-[0.14em] text-slate-400">{metric.label}</p>
              <p className="mt-1 text-3xl font-bold text-cyan-300">{metric.value}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/45 p-6">
            <h2 className="text-3xl font-semibold">Complete Route Coverage</h2>
            <p className="mt-2 text-sm text-slate-400">All customer, platform, admin, and legal routes tracked for enterprise release validation.</p>
            <div className="mt-5 space-y-2.5">
              {routeCoverage.map((route) => (
                <article key={route.path} className="rounded-lg border border-slate-800 bg-slate-950/80 p-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-cyan-300">{route.path}</p>
                    <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${tagStyle[route.tag]}`}>{route.tag}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-300">{route.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Panel title="Service Scale Coverage" items={serviceScaleCoverage} />
            <Panel title="Admin Operations Coverage" items={adminOpsCoverage} />
            <div className="rounded-2xl border border-slate-800 bg-slate-900/45 p-5">
              <h3 className="text-2xl font-semibold">Backend Endpoint Readiness</h3>
              <div className="mt-4 space-y-2">
                {backendEndpoints.map((endpoint) => (
                  <div key={endpoint.path} className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-emerald-300">{endpoint.method}</span>
                      <span className="text-cyan-300">{endpoint.path}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-300">{endpoint.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/45 p-5">
              <h3 className="text-2xl font-semibold">Legacy Redirect Protection</h3>
              <div className="mt-4 space-y-2">
                {legacyRedirects.map((rule) => (
                  <div key={rule.from} className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
                    <p className="text-sm text-cyan-300">{rule.from} <span className="text-slate-400">→</span> {rule.to}</p>
                    <p className="mt-1 text-xs text-slate-300">{rule.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

type PanelProps = {
  title: string;
  items: string[];
};

function Panel({ title, items }: PanelProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/45 p-5">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <div key={item} className="rounded-lg border border-slate-800 bg-slate-950/80 p-3 text-sm text-slate-200">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
