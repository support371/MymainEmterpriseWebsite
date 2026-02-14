"use client";

import { CalendarClock, Filter, RefreshCw, ShieldAlert, Siren, Newspaper, ChevronRight } from 'lucide-react';

const filters = ['All', 'Threat Intel', 'Regulatory', 'Infrastructure', 'Campaign Risk'];

const feedCards = [
  {
    title: 'Credential stuffing wave targeting SSO portals',
    category: 'Threat Intel',
    severity: 'High',
    source: 'GEM Sensor Mesh',
    updatedAt: '2026-02-11 14:05 UTC',
  },
  {
    title: 'Email reputation policy update for bulk sender domains',
    category: 'Campaign Risk',
    severity: 'Medium',
    source: 'Provider Bulletin',
    updatedAt: '2026-02-11 13:31 UTC',
  },
  {
    title: 'Federal control family mapping extension released',
    category: 'Regulatory',
    severity: 'Low',
    source: 'Compliance Feed',
    updatedAt: '2026-02-11 12:52 UTC',
  },
  {
    title: 'Zero-day mitigation advisory for edge appliances',
    category: 'Infrastructure',
    severity: 'Critical',
    source: 'Vendor Advisory',
    updatedAt: '2026-02-11 12:40 UTC',
  },
];

export default function IntelligencePage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-950 text-white">
      <div className="container mx-auto px-4">
        <section className="rounded-2xl border border-cyan-900/40 bg-slate-900/60 p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Intelligence Command Center</p>
              <h1 className="text-4xl md:text-5xl font-bold mt-3">Analyst Feed & Control Plane</h1>
              <p className="text-slate-400 mt-3 max-w-2xl">Filter intelligence streams, sort by newest indicators, and schedule daily upload windows for your SOC and campaign operators.</p>
            </div>
            <button className="px-5 py-3 rounded-lg bg-cyan-500 text-slate-950 font-semibold inline-flex items-center gap-2">
              <CalendarClock className="w-4 h-4" /> Schedule Daily Upload
            </button>
          </div>

          <div className="mt-7 grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Active Alerts', value: '148', icon: Siren },
              { label: 'Feeds Synced', value: '12/12', icon: RefreshCw },
              { label: 'Critical Items', value: '7', icon: ShieldAlert },
            ].map((metric) => (
              <article key={metric.label} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                <div className="flex items-center gap-2 text-slate-400 text-sm"><metric.icon className="w-4 h-4" /> {metric.label}</div>
                <p className="text-3xl font-bold text-cyan-300 mt-2">{metric.value}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button key={filter} className={`px-4 py-2 rounded-full border text-sm ${filter === 'All' ? 'bg-cyan-500 text-slate-950 border-cyan-500' : 'border-slate-700 text-slate-300 hover:border-slate-500'}`}>
                  {filter}
                </button>
              ))}
            </div>
            <div className="text-sm text-slate-400 inline-flex items-center gap-2"><Filter className="w-4 h-4" /> Sort: newest</div>
          </div>

          <div className="mt-5 grid lg:grid-cols-2 gap-4">
            {feedCards.map((item) => (
              <article key={item.title} className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs uppercase tracking-[0.16em] text-cyan-300">{item.category}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${item.severity === 'Critical' ? 'bg-rose-500/20 text-rose-300' : item.severity === 'High' ? 'bg-orange-500/20 text-orange-200' : 'bg-slate-700 text-slate-200'}`}>
                    {item.severity}
                  </span>
                </div>
                <h2 className="text-xl font-semibold mt-3">{item.title}</h2>
                <div className="mt-4 text-sm text-slate-400">
                  Source: {item.source} · Updated: {item.updatedAt}
                </div>
                <button className="mt-5 inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 text-sm">View details <ChevronRight className="w-4 h-4" /></button>
              </article>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button className="px-5 py-2 rounded-lg border border-slate-600 text-slate-200 hover:bg-slate-800">Load More</button>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h3 className="font-semibold text-lg inline-flex items-center gap-2"><Newspaper className="w-5 h-5 text-cyan-300" /> Ingestion Notes</h3>
          <ul className="mt-3 text-sm text-slate-300 space-y-2 list-disc pl-5">
            <li>Feeds are normalized and scored before analyst visibility.</li>
            <li>High-risk campaign indicators automatically notify dispatch owners.</li>
            <li>All access and state changes are mirrored to audit logs.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
