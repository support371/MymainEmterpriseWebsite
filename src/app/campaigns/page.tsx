import { BarChart3, Clock3, ListChecks, MailOpen, ShieldCheck, Users2 } from 'lucide-react';
import { campaignEngineGuardrails } from '@/lib/campaigns/models';

const analytics = [
  { label: 'Delivered', value: '94,280' },
  { label: 'Open Rate', value: '42.7%' },
  { label: 'Click Rate', value: '11.9%' },
  { label: 'Bounce Rate', value: '0.52%' },
  { label: 'Complaints', value: '0.03%' },
];

const queueRows = [
  { id: 'CMP-2026-114', name: 'SOC Weekly Brief', mode: 'Newsletter', schedule: '2026-02-11 16:00 UTC', status: 'Queued' },
  { id: 'CMP-2026-115', name: 'Incident Follow-up Sequence', mode: 'Sequence', schedule: '2026-02-11 18:00 UTC', status: 'Preflight' },
  { id: 'CMP-2026-116', name: 'Quarterly Security Program', mode: 'Newsletter', schedule: '2026-02-12 14:00 UTC', status: 'Scheduled' },
];

const dataModelStubs = [
  'contacts',
  'segments',
  'campaigns',
  'recipients',
  'events',
  'suppression_list',
  'audit_logs',
  'notification_outbox',
];

export default function CampaignsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-950 text-white">
      <div className="container mx-auto px-4">
        <section className="rounded-2xl border border-cyan-900/40 bg-slate-900/60 p-8">
          <h1 className="text-4xl font-bold">Email Campaign Engine</h1>
          <p className="text-slate-400 mt-3 max-w-3xl">Build compliant enterprise campaigns with segmentation, suppression hygiene, dispatch scheduling, and analytics built into one operator-friendly surface.</p>
          <div className="mt-6 grid md:grid-cols-5 gap-3">
            {analytics.map((tile) => (
              <article key={tile.label} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{tile.label}</p>
                <p className="text-2xl font-bold text-cyan-300 mt-2">{tile.value}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 grid lg:grid-cols-2 gap-5">
          <article className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="font-semibold text-xl inline-flex items-center gap-2"><MailOpen className="w-5 h-5 text-cyan-300" /> Campaign Builder</h2>
            <p className="text-sm text-slate-400 mt-2">Choose sequence or newsletter mode, author content variants, and stage internal approvals.</p>
            <button className="mt-4 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-semibold">Create Campaign</button>
          </article>

          <article className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="font-semibold text-xl inline-flex items-center gap-2"><Users2 className="w-5 h-5 text-cyan-300" /> Audience Segments</h2>
            <p className="text-sm text-slate-400 mt-2">Target by tags, lifecycle stage, compliance scope, and engagement profile.</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {['enterprise', 'regulated', 'warm-leads', 'analyst-subscribers'].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full border border-slate-700 text-slate-300">{tag}</span>
              ))}
            </div>
          </article>

          <article className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="font-semibold text-xl inline-flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-cyan-300" /> Suppression & Hygiene</h2>
            <p className="text-sm text-slate-400 mt-2">Hard bounce and complaint addresses are automatically excluded before every send.</p>
            <p className="text-sm text-emerald-300 mt-4">Suppression list synced: 3,842 records</p>
          </article>

          <article className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="font-semibold text-xl inline-flex items-center gap-2"><Clock3 className="w-5 h-5 text-cyan-300" /> Newsletter Dispatch Time</h2>
            <p className="text-sm text-slate-400 mt-2">Primary dispatch window: 16:00 UTC · fallback throttled batch every 15 minutes.</p>
            <button className="mt-4 px-4 py-2 rounded-lg border border-cyan-500/50">Update Schedule</button>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="text-2xl font-semibold inline-flex items-center gap-2"><ListChecks className="w-5 h-5 text-cyan-300" /> Dispatch Queue</h2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-800">
                  <th className="py-2 pr-4">Campaign</th>
                  <th className="py-2 pr-4">Mode</th>
                  <th className="py-2 pr-4">Schedule (UTC)</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {queueRows.map((row) => (
                  <tr key={row.id} className="border-b border-slate-900">
                    <td className="py-3 pr-4">
                      <div className="font-medium">{row.name}</div>
                      <div className="text-slate-500 text-xs">{row.id}</div>
                    </td>
                    <td className="py-3 pr-4">{row.mode}</td>
                    <td className="py-3 pr-4">{row.schedule}</td>
                    <td className="py-3 pr-4">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-amber-700/30 bg-amber-400/5 p-6">
          <h3 className="text-lg font-semibold inline-flex items-center gap-2"><BarChart3 className="w-5 h-5 text-amber-300" /> Compliance & Reputation Guardrails</h3>
          <ul className="mt-3 text-sm text-slate-300 space-y-2 list-disc pl-5">
            {campaignEngineGuardrails.map((guardrail) => (
              <li key={guardrail}>{guardrail}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h3 className="text-lg font-semibold">Data Model Surfaces</h3>
          <p className="text-sm text-slate-400 mt-2">Schema-aligned entities are ready for provider swaps and backend activation without refactoring UI routes.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {dataModelStubs.map((stub) => (
              <span key={stub} className="px-3 py-1 rounded-full border border-cyan-900/50 text-cyan-200 text-xs tracking-[0.08em] uppercase">
                {stub}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
