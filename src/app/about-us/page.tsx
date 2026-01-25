import { Shield, Target, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const timeline = [
    { year: '2019', title: 'Foundation', desc: 'GEM Enterprise founded with mission to democratize enterprise security' },
    { year: '2020', title: 'SOC Launch', desc: '24/7 Security Operations Center with 99.9% uptime' },
    { year: '2022', title: 'Alliance Trust', desc: 'Merged with Alliance Trust Realty for asset protection' },
    { year: '2024', title: 'SOC 2 Certified', desc: 'Achieved SOC 2 Type II compliance' },
    { year: '2025', title: 'Global Expansion', desc: 'Protecting 500+ enterprises with $50M+ assets' },
    { year: '2026', title: 'Quantum Security', desc: 'Launched QFS Network and Sentinel Trust' }
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-slate-950" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Shield className="w-4 h-4 text-cyan-500" />
              <span className="text-sm font-medium text-cyan-500">About GEM Enterprise</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Protecting Digital Assets &
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Recovering Physical Value
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400">
              Enterprise-grade security accessible to all organizations
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-cyan-500/10 to-slate-900 border border-cyan-500/30 rounded-2xl p-8">
              <Target className="w-12 h-12 text-cyan-500 mb-4" />
              <h2 className="text-2xl font-bold mb-4 text-white">Our Mission</h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Provide uncompromising cybersecurity that empowers organizations to operate with
                confidence. Every business deserves Fortune 500-level protection.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600/10 to-slate-900 border border-blue-600/30 rounded-2xl p-8">
              <Globe className="w-12 h-12 text-blue-500 mb-4" />
              <h2 className="text-2xl font-bold mb-4 text-white">Our Vision</h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Be the global standard for integrated security, where threats are neutralized
                before they impact operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Journey</h2>
              <p className="text-slate-400 text-lg">Seven years of innovation and growth</p>
            </div>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-cyan-500/30 hidden md:block" />
              {timeline.map((event, idx) => (
                <div key={idx} className="relative pl-0 md:pl-24 pb-12 last:pb-0">
                  <div className="absolute left-0 md:left-4 w-8 h-8 rounded-full bg-cyan-500 border-4 border-slate-950 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div className="ml-12 md:ml-0 bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-cyan-500/50 transition-colors">
                    <div className="text-cyan-500 text-sm font-bold mb-2">{event.year}</div>
                    <h3 className="text-xl font-bold mb-2 text-white">{event.title}</h3>
                    <p className="text-slate-400">{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-white">Join 500+ Protected Enterprises</h2>
          <Link
            href="/contact-us"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold text-lg transition-all shadow-lg text-white inline-flex items-center gap-2"
          >
            Schedule Consultation
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
