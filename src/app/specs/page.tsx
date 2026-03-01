import { Layers3, ShieldCheck, Send, Newspaper, Database, Cog } from 'lucide-react';

const sections = [
  {
    title: 'Platform Purpose',
    icon: Layers3,
    points: [
      'Unify enterprise cybersecurity, IT service reliability, and outbound campaign operations.',
      'Operate as an everything-in-one-page front door with module routes for operator workflows.',
      'Maintain design and control consistency across marketing and internal surfaces.',
    ],
  },
  {
    title: 'Intelligence Command Center',
    icon: Newspaper,
    points: [
      'Feed ingestion with normalized card model and severity scoring.',
      'Filter pills, sort newest controls, and daily upload scheduling.',
      'Escalation-ready notices for campaign and SOC owners.',
    ],
  },
  {
    title: 'Campaign Engine',
    icon: Send,
    points: [
      'Builder supports sequence and newsletter composition workflows.',
      'Segments, suppression list, dispatch queue, and UTC schedule control.',
      'Analytics tiles for delivered, open, click, bounce, complaint rates.',
    ],
  },
  {
    title: 'Data & Storage',
    icon: Database,
    points: [
      'Model stubs: contacts, segments, campaigns, recipients, events.',
      'Compliance entities: suppression_list, audit_logs, notification_outbox.',
      'Designed for environment-driven provider swaps without refactors.',
    ],
  },
  {
    title: 'Guardrails & Compliance',
    icon: ShieldCheck,
    points: [
      'Preflight compliance validation before every send.',
      'Domain throttling and reputation-safe warm-up paths.',
      'Audit trail requirements on operator actions and dispatch state transitions.',
    ],
  },
  {
    title: 'Backend Surfaces',
    icon: Cog,
    points: [
      'Webhook ingestion for intelligence and delivery events.',
      'Queue and scheduler surfaces for deterministic campaign execution.',
      'Notification sink for operational incident and delivery exceptions.',
    ],
  },
];

export default function SpecsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-950 text-white">
      <div className="container mx-auto px-4">
        <section className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">/specs</p>
          <h1 className="text-4xl md:text-5xl font-bold mt-2">GEM CYBER Architecture Specification</h1>
          <p className="text-slate-400 mt-4">Readable specification view for product, compliance, and delivery teams. This route mirrors the module-level architecture from the one-page narrative.</p>
        </section>

        <section className="mt-8 grid md:grid-cols-2 gap-5">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <article key={section.title} className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
                <h2 className="text-xl font-semibold inline-flex items-center gap-2"><Icon className="w-5 h-5 text-cyan-300" /> {section.title}</h2>
                <ul className="mt-3 list-disc pl-5 text-sm text-slate-300 space-y-2">
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </section>
      </div>
    </div>
  );
}
