import { Shield, FileCheck, Scale, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Asset Governance',
  description: 'Enterprise asset governance, risk classification, and policy enforcement for digital and physical holdings.',
};

export default function AssetGovernancePage() {
  const policies = [
    { title: 'Data Classification Policy', status: 'Active', reviewed: 'Mar 2026', owner: 'CISO Office', severity: 'Critical' },
    { title: 'Physical Asset Custody', status: 'Active', reviewed: 'Feb 2026', owner: 'Property Ops', severity: 'High' },
    { title: 'Digital Asset Lifecycle', status: 'Under Review', reviewed: 'Jan 2026', owner: 'IT Security', severity: 'High' },
    { title: 'Third-Party Vendor Risk', status: 'Active', reviewed: 'Mar 2026', owner: 'Compliance', severity: 'Medium' },
    { title: 'Encryption Standards', status: 'Active', reviewed: 'Feb 2026', owner: 'Engineering', severity: 'Critical' },
  ];

  const riskCategories = [
    { label: 'Critical Assets', count: 12, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    { label: 'High Risk', count: 34, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    { label: 'Medium Risk', count: 87, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
    { label: 'Low Risk', count: 156, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  ];

  return (
    <div className="min-h-screen pt-20 lg:pt-0">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-slate-950" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Shield className="w-4 h-4 text-cyan-500" />
              <span className="text-sm font-medium text-cyan-500">Asset Governance</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Enterprise Asset
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Governance & Risk
              </span>
            </h1>
            <p className="text-xl text-slate-400">
              Centralized policy enforcement, risk classification, and compliance tracking across all asset classes.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
            {riskCategories.map((cat) => (
              <div key={cat.label} className={`${cat.bg} border ${cat.border} rounded-xl p-5 text-center`}>
                <div className={`text-3xl font-bold ${cat.color} mb-1`}>{cat.count}</div>
                <div className="text-sm text-slate-400">{cat.label}</div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-8 text-white text-center">Governance Policies</h2>
          <div className="max-w-5xl mx-auto space-y-3">
            {policies.map((policy) => (
              <div key={policy.title} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <FileCheck className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white">{policy.title}</div>
                    <div className="text-xs text-slate-500 font-mono">Owner: {policy.owner} · Reviewed: {policy.reviewed}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    policy.severity === 'Critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                    policy.severity === 'High' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                    'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                  }`}>{policy.severity}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    policy.status === 'Active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>{policy.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              { icon: Scale, title: 'Regulatory Alignment', desc: 'Continuous mapping of asset controls to NIST, SOC 2, and ISO 27001 frameworks.' },
              { icon: AlertTriangle, title: 'Risk Scoring', desc: 'Automated risk scoring for every asset class based on exposure, value, and threat landscape.' },
              { icon: CheckCircle, title: 'Audit Readiness', desc: 'Real-time compliance dashboards with exportable audit trails and evidence packages.' },
            ].map((item) => (
              <div key={item.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <item.icon className="w-8 h-8 text-cyan-500 mb-4" />
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-white">Need a Governance Review?</h2>
          <Link href="/home/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-all">
            Schedule Assessment <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
