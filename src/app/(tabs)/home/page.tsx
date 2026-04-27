import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileText,
  Layers3,
  LockKeyhole,
  Radar,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Predictive Compliance Intelligence',
  description:
    'ArdenCrescentBrook turns compliance intake, SCRIA risk audits, analyst validation, and ongoing monitoring into an audit-ready intelligence workflow.',
};

const stats = [
  { value: '3', label: 'Delivery tiers' },
  { value: '6', label: 'Workflow stages' },
  { value: '5', label: 'SCRIA risk categories' },
  { value: '0-100', label: 'Predictive score range' },
];

const pillars = [
  {
    icon: FileText,
    title: 'AI Report Engine',
    copy: 'Structured executive reporting from secure intake, document review, risk classification, and analyst-approved findings.',
  },
  {
    icon: BarChart3,
    title: 'Predictive Risk Scoring',
    copy: 'Quantifies securities, state filing, entity, disclosure, and operational control exposure into a normalized risk posture.',
  },
  {
    icon: ShieldCheck,
    title: 'Analyst Validation',
    copy: 'Every client-ready output passes through a human review gate with evidence references, timestamps, and approval history.',
  },
  {
    icon: Database,
    title: 'Compliance Pattern Repository',
    copy: 'Reusable anonymized patterns, scoring heuristics, and control libraries compound institutional intelligence engagement by engagement.',
  },
  {
    icon: Radar,
    title: 'Subscription Monitoring',
    copy: 'Converts point-in-time audits into ongoing alerts, monthly summaries, posture tracking, and client portal continuity.',
  },
  {
    icon: LockKeyhole,
    title: 'Enterprise Readiness',
    copy: 'Role-based access, secure intake, private report delivery, export controls, and a deployment model aligned to regulated workflows.',
  },
];

const scriaCategories = [
  'Securities Compliance',
  'State Filing Exposure',
  'Entity Structure',
  'Disclosure Adequacy',
  'Operational Controls',
];

const workflow = [
  ['01', 'Pre-Qualification', 'Capture scope, client profile, market, entity posture, offering history, and urgency signals.'],
  ['02', 'Secure Intake', 'Collect entity documents, operating agreements, Form D references, PPMs, investor decks, and operational evidence.'],
  ['03', 'AI Draft', 'Generate executive findings, SCRIA risk flags, scored categories, assumptions, and recommended non-legal actions.'],
  ['04', 'Analyst Validation', 'Review reasoning, attach evidence, normalize severity, resolve inconsistencies, and approve report sections.'],
  ['05', 'Delivery', 'Package audit-ready PDF reporting with scorecard, observations, next steps, appendices, and evidence traceability.'],
  ['06', 'Monitoring', 'Transition qualified clients into subscription alerts, periodic reassessment, dashboard history, and renewal workflows.'],
];

const stages = [
  {
    title: 'Stage 1 · Boutique Audits',
    copy: 'High-touch SCRIA delivery for sponsors, operators, and regulated real-estate syndication teams that need fast risk visibility.',
  },
  {
    title: 'Stage 2 · Managed Monitoring',
    copy: 'Recurring posture updates, alert cycles, document refreshes, and board-ready monthly reporting.',
  },
  {
    title: 'Stage 3 · Platform Productization',
    copy: 'Client portal, dashboard exports, API-ready report data, multi-tenant workflow controls, and licensing pathways.',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.14),transparent_30%),linear-gradient(180deg,rgba(15,23,42,0),#020617_92%)]" />
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="max-w-5xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">
              <Sparkles className="h-4 w-4 text-cyan-300" />
              ArdenCrescentBrook · Predictive Compliance Intelligence
            </div>
            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-7xl">
              AI-powered SCRIA audits for regulated syndication workflows.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              ACB turns fragmented entity, securities, disclosure, and operating evidence into analyst-validated compliance intelligence, scorecards, and export-ready reporting.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/home/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Request an Audit <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/home/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-bold text-white transition hover:bg-white/10"
              >
                View Delivery Tiers
              </Link>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
                  <div className="text-3xl font-black text-cyan-300">{item.value}</div>
                  <div className="mt-1 text-sm text-slate-400">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400">
            Core operating model
          </div>
          <h2 className="text-3xl font-black md:text-5xl">From boutique audit to recurring intelligence platform.</h2>
          <p className="mt-4 text-slate-400">
            The final website is structured around service conversion, report credibility, and deployment-grade routing clarity.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article key={pillar.title} className="rounded-2xl border border-white/10 bg-slate-900/70 p-7 shadow-2xl shadow-slate-950/40">
                <Icon className="mb-5 h-10 w-10 text-cyan-300" />
                <h3 className="text-xl font-bold text-white">{pillar.title}</h3>
                <p className="mt-3 leading-7 text-slate-400">{pillar.copy}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-900/40 py-20">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-100">
              <ClipboardCheck className="h-4 w-4" />
              SCRIA report architecture
            </div>
            <h2 className="text-3xl font-black md:text-5xl">Risk categories mapped to delivery evidence.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              The SCRIA template becomes a commercial delivery engine: executive summary, document review, observations, recommendations, scorecard, pattern detection, final comments, and appendices.
            </p>
            <div className="mt-8 grid gap-3">
              {scriaCategories.map((category, index) => (
                <div key={category} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <span className="font-semibold text-white">{category}</span>
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">Risk {index + 1}-5</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950 p-6">
            <h3 className="mb-5 flex items-center gap-2 text-xl font-bold">
              <BookOpenCheck className="h-5 w-5 text-cyan-300" />
              Client-ready report outputs
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                'Executive summary and scope framing',
                'Entity and structure review',
                'Reg D, Form D, and Blue Sky overview',
                'PPM and investor presentation scan',
                'Investor onboarding and capital call controls',
                'Final comments, appendices, and methodology',
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-300" />
                  <span className="text-sm leading-6 text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" className="container mx-auto px-4 py-20">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400">
              <Workflow className="h-4 w-4" />
              CAMEA-aligned client journey
            </div>
            <h2 className="max-w-3xl text-3xl font-black md:text-5xl">One workflow from pre-qualification to monitoring.</h2>
          </div>
          <Link href="/home/contact" className="inline-flex w-fit items-center gap-2 rounded-xl border border-cyan-400/40 px-5 py-3 font-bold text-cyan-200 transition hover:bg-cyan-400/10">
            Start Intake <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {workflow.map(([num, title, copy]) => (
            <article key={num} className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 font-black text-cyan-200">
                {num}
              </div>
              <h3 className="text-lg font-bold text-white">{title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-900/40 py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-3">
            {stages.map((stage) => (
              <article key={stage.title} className="rounded-3xl border border-white/10 bg-slate-950 p-8">
                <Layers3 className="mb-5 h-9 w-9 text-cyan-300" />
                <h3 className="text-2xl font-black">{stage.title}</h3>
                <p className="mt-4 leading-7 text-slate-400">{stage.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 via-slate-900 to-blue-600/10 p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Building2 className="mb-5 h-12 w-12 text-cyan-300" />
              <h2 className="text-3xl font-black md:text-5xl">Start with a SCRIA audit. Scale into a compliance intelligence portal.</h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                The production path is built for Vercel: App Router pages, API health checks, legacy redirects, contact intake, and route registry validation.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href="/home/contact" className="rounded-xl bg-white px-6 py-3 text-center font-black text-slate-950 transition hover:bg-cyan-100">
                Request Audit
              </Link>
              <Link href="/api/health" className="rounded-xl border border-white/15 px-6 py-3 text-center font-black text-white transition hover:bg-white/10">
                Check Health API
              </Link>
              <Link href="/api/routes" className="rounded-xl border border-white/15 px-6 py-3 text-center font-black text-white transition hover:bg-white/10">
                View Route Registry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
