import { ShieldCheck, Scale, FileCheck, Landmark, Globe2, Lock, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

export default function FederalCompliancePage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,#3b82f6_0%,transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 text-blue-400">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide uppercase">Federal Standards Compliance</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Regulatory Navigation for the
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Hybrid Enterprise
              </span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              Achieving and maintaining compliance across NIST, CMMC, GDPR, and localized federal regulations for global operations.
            </p>
          </div>
        </div>
      </section>

      {/* Compliance Frameworks */}
      <section className="py-24 bg-slate-900/30">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Supported Frameworks</h2>
              <p className="text-slate-400">We specialize in high-stakes regulatory environments.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'NIST SP 800-171', desc: 'Protecting Controlled Unclassified Information (CUI) in non-federal systems.' },
                { title: 'CMMC 2.0', desc: 'Cybersecurity Maturity Model Certification for Defense Industrial Base contractors.' },
                { title: 'GDPR / CCPA', desc: 'Comprehensive data privacy compliance for international and domestic markets.' },
                { title: 'ISO 27001', desc: 'International standard for information security management systems.' }
              ].map((fw, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:bg-slate-800/50 transition-colors">
                  <Landmark className="w-10 h-10 text-blue-500 mb-6" />
                  <h3 className="text-lg font-bold text-white mb-3">{fw.title}</h3>
                  <p className="text-slate-400 text-sm">{fw.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">End-to-End Compliance Management</h2>
                <div className="space-y-6">
                  {[
                    { title: 'Gap Analysis & Assessment', desc: 'In-depth review of current controls vs. regulatory requirements.', icon: FileCheck },
                    { title: 'Policy Development', desc: 'Crafting robust, defensible security policies and governance documentation.', icon: Scale },
                    { title: 'Continuous Monitoring', desc: 'Automated compliance tracking to ensure you never fall out of scope.', icon: Zap },
                    { title: 'Incident Response Planning', desc: 'Required legal protocols for data breach notification and recovery.', icon: Lock }
                  ].map((service, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <service.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1">{service.title}</h4>
                        <p className="text-slate-400">{service.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-500/20 blur-3xl rounded-full" />
                <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-white">Compliance Status</h3>
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full">ACTIVE MONITORING</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { l: 'Access Control', v: 98 },
                      { l: 'Risk Assessment', v: 100 },
                      { l: 'System Integrity', v: 94 },
                      { l: 'Media Protection', v: 100 }
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-400">{item.l}</span>
                          <span className="text-white font-mono">{item.v}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.v}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-b from-transparent to-blue-600/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready for Audit?</h2>
          <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
            Don&apos;t wait for an audit to find your vulnerabilities. GEM Cybersecurity provides the expertise to secure your certifications and protect your federal contracts.
          </p>
          <Link href="/contact-us" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all group">
            Speak with a Compliance Officer
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
