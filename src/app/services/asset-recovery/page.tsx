import { Building2, Shield, Globe, ArrowRight, CheckCircle, Search, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function AssetRecoveryPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 to-slate-950" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Building2 className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-500">Alliance Trust Realty Division</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Enterprise Asset Recovery &
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                Portfolio Protection
              </span>
            </h1>
            <p className="text-xl text-slate-400 mb-10">
              Specialized logistics and legal operations for the physical recovery and protection of high-value corporate assets.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { label: 'Value Recovered', val: '$12M+' },
                { label: 'Global Reach', val: '24+ Countries' },
                { label: 'Audit Success', val: '100%' },
                { label: 'Asset Classes', val: 'Real Estate' }
              ].map((stat, i) => (
                <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-500">{stat.val}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-white text-center">Recovery Capabilities</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Globe, title: 'International Liaison', desc: 'Working with global legal entities and local authorities to secure physical assets.' },
                { icon: Shield, title: 'Physical Hardening', desc: 'Implementation of high-end physical security protocols for corporate real estate.' },
                { icon: Search, title: 'Asset Tracing', desc: 'Forensic-level tracking of high-value assets across jurisdictions.' },
                { icon: BarChart3, title: 'Valuation Audits', desc: 'Real-time assessment and auditing of physical asset values and security state.' },
                { icon: Building2, title: 'Portfolio Management', desc: 'Strategic oversight of large-scale physical holdings with integrated security.' },
                { icon: CheckCircle, title: 'Chain of Custody', desc: 'Rigorous documentation and legal proof for every stage of asset recovery.' }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all">
                  <item.icon className="w-10 h-10 text-blue-500 mb-6" />
                  <h3 className="text-xl font-bold mb-4 text-white">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-white text-center">Operational Workflow</h2>
            <div className="space-y-8">
              {[
                { step: '01', title: 'Asset Identification', desc: 'Comprehensive audit of lost or at-risk physical assets and legal standing.' },
                { step: '02', title: 'Jurisdictional Strategy', desc: 'Legal and logistical planning based on local laws and recovery requirements.' },
                { step: '03', title: 'Security Deployment', desc: 'Physical and digital monitoring deployment to secure the asset perimeter.' },
                { step: '04', title: 'Recovery & Legalization', desc: 'Formal recovery process and normalization of asset ownership/custody.' },
                { step: '05', title: 'Integration', desc: 'Onboarding the asset back into the enterprise security and monitoring hub.' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="text-3xl font-black text-blue-500/20">{item.step}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-white">Protect Your Physical Perimeter</h2>
            <p className="text-blue-100 mb-8 text-lg">
              Consult with our asset experts to develop a custom recovery and protection strategy.
            </p>
            <Link href="/contact-us" className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-slate-100 transition-all inline-block">
              Schedule Asset Assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
