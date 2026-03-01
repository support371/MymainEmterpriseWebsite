import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Roadmap',
  description:
    'Detailed execution roadmap for GEM Enterprise platform modernization across brand, security operations, admin workflows, and platform scale.',
};

const roadmapPhases = [
  {
    phase: 'Phase 1 · Foundation & Brand Alignment',
    timeline: 'Weeks 1-2',
    goals: [
      'Finalize visual design system tokens (colors, typography, spacing, CTA hierarchy).',
      'Align homepage + global layout to production-grade brand presentation and responsive behavior.',
      'Establish baseline performance and accessibility checks (LCP, keyboard nav, contrast, semantics).',
    ],
    deliverables: ['Design token map', 'Homepage + shell QA pass', 'Baseline lighthouse checklist'],
  },
  {
    phase: 'Phase 2 · Admin Operations Core',
    timeline: 'Weeks 3-4',
    goals: [
      'Stabilize role-based access patterns for super admin, admin, analyst, and auditor experiences.',
      'Complete functional admin modules for Teams, Organizations, Grants, Diagnostics, and Inbox workflows.',
      'Add stronger auditability around status transitions, assignment, and operational changes.',
    ],
    deliverables: ['Role matrix + route map', 'Admin module completion', 'Audit log event model'],
  },
  {
    phase: 'Phase 3 · Message Intelligence & Triage',
    timeline: 'Weeks 5-6',
    goals: [
      'Upgrade contact ingestion with richer metadata tagging and service-interest classification.',
      'Expand inbox workflows with pagination, bulk operations, saved filters, and export profiles.',
      'Introduce assignment SLAs and triage metrics dashboards for leadership visibility.',
    ],
    deliverables: ['Enhanced message schema', 'Inbox v2 workflow', 'SLA/triage KPI dashboard'],
  },
  {
    phase: 'Phase 4 · Data Durability & Security Hardening',
    timeline: 'Weeks 7-8',
    goals: [
      'Migrate file-backed stores to managed database with migrations and backup strategy.',
      'Implement credential/session hardening upgrades (rotation policy, lockouts, secret management).',
      'Add API-level authorization checks with per-role permission enforcement.',
    ],
    deliverables: ['Database migration plan', 'Secrets/auth hardening policy', 'Policy-enforced API guards'],
  },
  {
    phase: 'Phase 5 · Scale, Reliability & Release Governance',
    timeline: 'Weeks 9-10',
    goals: [
      'Introduce integration tests, admin smoke suites, and release quality gates.',
      'Optimize performance budgets (route splitting, static caching policy, query profiling).',
      'Define deployment runbooks, incident playbooks, and ownership handoff docs.',
    ],
    deliverables: ['CI quality gates', 'Performance budget report', 'Operations runbook set'],
  },
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-950">
      <section className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <p className="text-cyan-300 text-sm uppercase tracking-[0.16em] mb-3">Project Description Roadmap</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">Detailed Execution Roadmap</h1>
          <p className="text-slate-300 mt-5 text-lg md:text-xl">
            A phased plan to evolve GEM Enterprise into a resilient, enterprise-grade security and operations platform.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid gap-5">
          {roadmapPhases.map((phase) => (
            <article key={phase.phase} className="rounded-2xl border border-cyan-900/30 bg-slate-900/55 p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-white">{phase.phase}</h2>
                <span className="text-xs md:text-sm text-cyan-300 font-semibold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                  {phase.timeline}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm uppercase tracking-[0.14em] text-slate-400 mb-3">Objectives</h3>
                  <ul className="space-y-2 text-slate-200 text-sm md:text-base">
                    {phase.goals.map((goal) => (
                      <li key={goal} className="flex gap-2">
                        <span className="text-cyan-300">•</span>
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-[0.14em] text-slate-400 mb-3">Deliverables</h3>
                  <ul className="space-y-2 text-slate-200 text-sm md:text-base">
                    {phase.deliverables.map((item) => (
                      <li key={item} className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
