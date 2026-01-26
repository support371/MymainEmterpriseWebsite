import { Metadata } from 'next';
import { Building2, Shield, Globe, CheckCircle, Search, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import Hero from '@/components/ui/Hero';
import StatGrid from '@/components/ui/StatGrid';
import SectionHeader from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: "Asset Recovery & Protection",
  description: "Specialized logistics and legal operations for the physical recovery and protection of high-value corporate assets through Alliance Trust Realty.",
};

export default function AssetRecoveryPage() {
  const stats = [
    { label: 'Value Recovered', value: '$12M+' },
    { label: 'Global Reach', value: '24+ Countries' },
    { label: 'Audit Success', value: '100%' },
    { label: 'Asset Classes', value: 'Real Estate' }
  ];

  return (
    <div className="min-h-screen pt-20">
      <Hero
        title="Enterprise Asset Recovery & Portfolio Protection"
        subtitle="Specialized logistics and legal operations for the physical recovery and protection of high-value corporate assets."
        badge={{ icon: Building2, text: "Alliance Trust Realty Division" }}
      />

      <div className="container mx-auto px-4 -mt-16 relative z-20 mb-24">
        <StatGrid stats={stats} columns={4} />
      </div>

      {/* Capabilities */}
      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <SectionHeader title="Recovery Capabilities" />
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
      </section>

      {/* Workflow */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeader title="Operational Workflow" />
          <div className="space-y-8 max-w-4xl mx-auto">
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
