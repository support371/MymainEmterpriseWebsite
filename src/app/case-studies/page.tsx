import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CaseStudiesPage() {
  const cases = [
    { industry: 'Finance', title: 'Zero Breaches Achieved', metric: '94%', label: 'Incident Reduction', size: '10K+ employees' },
    { industry: 'Healthcare', title: '50K Patient Records Secured', metric: '100%', label: 'HIPAA Compliance', size: '5K+ employees' },
    { industry: 'Manufacturing', title: 'IoT Infrastructure Secured', metric: '15%', label: 'Uptime Increase', size: '15K+ employees' },
    { industry: 'Technology', title: 'Hypergrowth Protection', metric: '0', label: 'Incidents', size: '500 employees' },
    { industry: 'Government', title: 'Classified Data Protected', metric: '<1min', label: 'Response Time', size: 'Classified' },
    { industry: 'Real Estate', title: '$12M Portfolio Protected', metric: '$12M', label: 'Assets Recovered', size: '$50M+ AUM' }
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-slate-950" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Real Results,
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Real Protection
            </span>
          </h1>
          <p className="text-lg text-slate-400 mb-8">
            Organizations across industries trust GEM Enterprise
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { val: '2.4M+', label: 'Threats Prevented' },
              { val: '500+', label: 'Clients' },
              { val: '$0', label: 'Breach Losses' }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-cyan-500">{stat.val}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((study, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all cursor-pointer">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-medium text-cyan-500 mb-4">
                  {study.industry} | {study.size}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{study.title}</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-cyan-500">{study.metric}</div>
                    <div className="text-xs text-slate-400">{study.label}</div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-3 text-center text-white">
                    <div className="text-2xl font-bold text-green-400">✓</div>
                    <div className="text-xs text-slate-400">Success</div>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500 border border-cyan-500/30 hover:border-cyan-500 text-cyan-500 hover:text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                  Read Story
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border-2 border-cyan-500/30 p-12 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4 text-white">Ready to Write Your Success Story?</h2>
            <p className="text-slate-400 text-lg mb-8">
              Join hundreds of protected organizations
            </p>
            <Link
              href="/contact-us"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold text-lg transition-all shadow-lg text-white inline-flex items-center gap-2"
            >
              Schedule Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
