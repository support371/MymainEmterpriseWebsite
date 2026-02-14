import { Metadata } from 'next';
import Link from 'next/link';
import {
  Shield,
  Server,
  Lock,
  Radar,
  Mail,
  Workflow,
  Database,
  Cpu,
  Clock3,
  CheckCircle2,
  ArrowUpRight,
  Bell,
} from 'lucide-react';
import { appEnv } from '@/lib/env';

export const metadata: Metadata = {
  description:
    'GEM CYBER unified one-page enterprise platform for cybersecurity, IT operations, intelligence monitoring, and reputation-safe email campaign orchestration.',
};

const trustMetrics = [
  { label: 'Service Reliability', value: '99.9%' },
  { label: 'Mean Time To Respond', value: '< 2 min' },
  { label: 'Assets Monitored', value: '50K+' },
  { label: 'Protected Mailboxes', value: '120K+' },
];

const services = [
  { icon: Shield, title: 'Managed Cybersecurity', desc: 'Threat hunting, SOC triage, and response playbooks that scale enterprise-wide.' },
  { icon: Lock, title: 'Compliance Operations', desc: 'NIST, ISO, SOC 2, CMMC, and control evidence workflows for audits.' },
  { icon: Server, title: 'IT Reliability Engineering', desc: 'Infrastructure hardening, patch governance, and continuity planning.' },
  { icon: Radar, title: 'Intelligence Command Center', desc: 'Analyst-ready threat feeds, filterable risk cards, and schedule controls.' },
  { icon: Mail, title: 'Campaign & Outreach Engine', desc: 'Reputation-safe email dispatch with suppression, throttling, and auditing.' },
  { icon: Workflow, title: 'Automation & Integrations', desc: 'Webhook and queue-based automations across security and growth operations.' },
];

const architectureSurfaces = [
  {
    title: 'Core Data Surfaces',
    items: ['contacts', 'segments', 'campaigns', 'recipients', 'events'],
  },
  {
    title: 'Compliance & Safety',
    items: ['suppression_list', 'audit_logs', 'notification_outbox', 'sending throttles'],
  },
  {
    title: 'Runtime Controls',
    items: ['news ingest', 'dispatch queue', 'UTC scheduler', 'access policies'],
  },
];

const intelligencePreview = [
  { tag: 'Threat Intel', title: 'Credential Harvesting Trendline', summary: 'New phishing kits targeting M365 orgs in regulated sectors.' },
  { tag: 'Regulatory', title: 'CMMC 2.0 Readiness Window', summary: 'Controls and evidence automation checkpoints for Q2 planning.' },
  { tag: 'Ops Alert', title: 'Ransomware IOC Refresh', summary: 'Updated indicators, attack chain references, and isolation playbook.' },
];

export default function HomePage() {
  return (
    <div className="bg-slate-950 text-white scroll-smooth">
      <section id="home" className="relative overflow-hidden border-b border-slate-800/70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(6,182,212,0.23),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(59,130,246,0.18),transparent_32%)]" />
        <div className="container mx-auto px-4 relative z-10 pt-28 pb-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/40 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-300 monitoring-dot" />
              <span className="text-xs font-semibold text-cyan-300 uppercase tracking-[0.12em]">Everything in One Page</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              Enterprise Cybersecurity, IT, and Growth Operations
              <span className="block text-cyan-300">Unified Under {appEnv.appName}</span>
            </h1>
            <p className="mt-6 text-slate-300 max-w-3xl text-lg">
              One platform for security operations, intelligence ingestion, and compliant campaign dispatch. Built for modern enterprise teams that need speed, trust, and control.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/intelligence" className="px-7 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 font-semibold">
                Open Intelligence Command Center
              </Link>
              <Link href="/campaigns" className="px-7 py-3 rounded-lg border border-cyan-500/60 text-cyan-100 hover:bg-cyan-500/10">
                Launch Campaign Engine
              </Link>
            </div>
          </div>

          <div className="mt-14 grid md:grid-cols-4 gap-4">
            {trustMetrics.map((metric) => (
              <article key={metric.label} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                <p className="text-3xl font-bold text-cyan-300">{metric.value}</p>
                <p className="text-xs text-slate-400 mt-2 uppercase tracking-[0.16em]">{metric.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">Cybersecurity + IT Solutions</h2>
            <p className="text-slate-400 mt-2">Production-grade service lines aligned to enterprise SOC, infrastructure, and go-to-market priorities.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.title} className="rounded-xl border border-cyan-900/40 bg-slate-900/50 p-6">
                  <Icon className="w-9 h-9 text-cyan-300 mb-4" />
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="text-slate-400 mt-2 text-sm">{service.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="intelligence" className="py-20 border-y border-slate-800/60 bg-slate-900/40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Intelligence Hub Preview</h2>
              <p className="text-slate-400 mt-2">Live threat context, regulatory changes, and analyst summaries.</p>
            </div>
            <Link href="/intelligence" className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200">
              Open command center <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {intelligencePreview.map((item) => (
              <article key={item.title} className="rounded-xl border border-slate-700 bg-slate-950/70 p-6">
                <span className="text-xs uppercase tracking-[0.14em] text-cyan-300">{item.tag}</span>
                <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="campaigns" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Email Campaign & Outreach</h2>
            <p className="text-slate-400 mt-2">First-class dispatch platform with compliance gates, sender reputation controls, and measurable outcomes.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-5">
            {[
              'Campaign Builder (sequence + newsletter modes)',
              'Audience Segments and tag-based targeting',
              'Suppression List and hygiene automation',
              'Dispatch Queue with UTC schedule orchestration',
              'Analytics: delivered, open, click, bounce, complaint',
              'Throttling + compliance preflight checks',
            ].map((feature) => (
              <div key={feature} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5" />
                <span className="text-sm text-slate-200">{feature}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-cyan-900/40 bg-cyan-500/5 p-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-cyan-300 font-semibold">Reputation-safe sending is enforced by design.</p>
              <p className="text-slate-400 text-sm mt-1">Use compliance gates, staged warm-up, suppression enforcement, and auditable controls.</p>
            </div>
            <Link href="/campaigns" className="px-5 py-3 rounded-lg bg-cyan-500 text-slate-950 font-semibold">View Campaign Engine</Link>
          </div>
        </div>
      </section>

      <section id="roadmap" className="py-20 border-y border-slate-800/60 bg-slate-900/40">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Roadmap + Backend Surfaces</h2>
            <p className="text-slate-400 mt-2">Execution modules from intake through orchestration, audit, and notification pipelines.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {architectureSurfaces.map((surface) => (
              <article key={surface.title} className="rounded-xl border border-slate-800 bg-slate-950/65 p-6">
                <h3 className="font-semibold text-cyan-300">{surface.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {surface.items.map((item) => (
                    <li key={item} className="flex items-center gap-2"><Database className="w-4 h-4 text-slate-500" />{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/specs" className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-cyan-500/50">Open Architecture</Link>
            <Link href="/roadmap" className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-slate-600"><Cpu className="w-4 h-4" />Detailed Roadmap</Link>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border border-cyan-800/40 bg-slate-900/60 p-8 md:p-10 flex flex-wrap justify-between gap-6 items-center">
            <div>
              <h2 className="text-3xl font-bold">Need escalation support now?</h2>
              <p className="text-slate-400 mt-2">Security hotline and response operations are active 24/7.</p>
            </div>
            <div className="flex flex-col gap-3">
              <a className="inline-flex items-center gap-2 text-cyan-300" href={`mailto:${appEnv.supportEmail}`}><Bell className="w-4 h-4" />{appEnv.supportEmail}</a>
              <a className="inline-flex items-center gap-2 text-cyan-300" href={`tel:${appEnv.supportPhone}`}><Clock3 className="w-4 h-4" />{appEnv.supportPhone}</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
