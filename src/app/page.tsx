import { Metadata } from 'next';
import Link from 'next/link';
import { Activity, ArrowRight, CheckCircle2, ShieldCheck, TimerReset, Workflow } from 'lucide-react';

export const metadata: Metadata = {
  description:
    'GEM CYBER unified enterprise platform for cybersecurity operations, intelligence monitoring, and response orchestration.',
};

const trustStrip = [
  '24/7 Monitoring',
  'Incident Response SLA',
  'Compliance Operations',
  'Secure-by-design Architecture',
  'SOC 2-ready controls',
];

const howItWorks = [
  {
    title: 'Assess',
    description: 'Baseline your risk profile, assets, and compliance requirements with a focused security assessment.',
    icon: ShieldCheck,
  },
  {
    title: 'Deploy',
    description: 'Implement controls, monitoring workflows, and analyst-ready playbooks aligned to your environment.',
    icon: Workflow,
  },
  {
    title: 'Monitor & Respond',
    description: 'Operate 24/7 detection and response with measurable SLA-backed escalation paths.',
    icon: Activity,
  },
];

export default function HomePage() {
  return (
    <div className="bg-slate-950 text-white">
      <section id="home" className="relative overflow-hidden border-b border-slate-800/70 pt-28 sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(6,182,212,0.26),transparent_34%),radial-gradient(circle_at_90%_10%,rgba(59,130,246,0.2),transparent_32%)]" />
        <div className="container relative z-10 mx-auto px-4 pb-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 monitoring-dot" />
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-300">Unified Security Operations</span>
              </div>
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Stop Breaches Before
                <span className="block text-cyan-300">They Happen</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                GEM CYBER combines managed detection, response playbooks, and compliance operations into one enterprise-ready platform.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact-us" className="rounded-lg bg-gradient-to-r from-cyan-400 to-sky-500 px-6 py-3 text-sm font-semibold text-slate-950">
                  Schedule Security Assessment
                </Link>
                <Link href="/services" className="rounded-lg border border-cyan-500/60 px-6 py-3 text-sm font-semibold text-cyan-100 hover:bg-cyan-500/10">
                  Explore Services
                </Link>
              </div>
            </div>

            <article className="rounded-2xl border border-cyan-900/40 bg-slate-900/70 p-6 shadow-[0_20px_80px_rgba(2,8,23,0.45)] sm:p-8">
              <p className="text-xs uppercase tracking-[0.14em] text-cyan-300">Platform Snapshot</p>
              <h2 className="mt-3 text-2xl font-semibold">Command + Response Card</h2>
              <p className="mt-3 text-sm text-slate-300">A single view of current risk, response velocity, and deployment health.</p>
              <div className="mt-6 space-y-3">
                {[
                  'Critical alerts triaged in under 2 minutes',
                  'Cross-team escalation with audit logs',
                  'Control status aligned to SOC 2-ready controls',
                ].map((item) => (
                  <div key={item} className="flex gap-2 rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-200">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-cyan-300" />
                    {item}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-800/70 bg-slate-900/45 py-6">
        <div className="container mx-auto grid gap-3 px-4 sm:grid-cols-2 lg:grid-cols-5">
          {trustStrip.map((item) => (
            <div key={item} className="rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm font-medium text-slate-200">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold sm:text-4xl">How it works</h2>
            <p className="mt-2 text-slate-400">Outcome-driven onboarding from risk discovery to active response operations.</p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {howItWorks.map((step, index) => (
              <article key={step.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-300">
                  <step.icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Step {index + 1}</p>
                <h3 className="mt-1 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800/70 bg-slate-900/40 py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border border-cyan-900/40 bg-slate-900/70 p-8 sm:p-10">
            <h2 className="text-3xl font-bold sm:text-4xl">Ready to secure your platform posture?</h2>
            <p className="mt-3 max-w-2xl text-slate-300">Get a tailored security assessment and implementation roadmap from GEM CYBER specialists.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact-us" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 to-sky-500 px-6 py-3 text-sm font-semibold text-slate-950">
                Schedule Security Assessment
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/about" className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-800">
                Request a Call
                <TimerReset className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
