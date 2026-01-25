import { Shield, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ThreatMonitoringPage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-slate-950" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Shield className="w-4 h-4 text-cyan-500" />
              <span className="text-sm font-medium text-cyan-500">Service Detail</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              24/7 Threat Monitoring &
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                AI-Powered Detection
              </span>
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Continuous surveillance of your entire digital perimeter using advanced AI and expert human analysis.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">Comprehensive Visibility</h2>
              <p className="text-slate-400 text-lg mb-8">
                Our Security Operations Center (SOC) provides around-the-clock monitoring of your infrastructure,
                identifying and neutralizing threats before they can impact your business.
              </p>
              <ul className="space-y-4">
                {[
                  'Real-time SIEM Analysis',
                  'AI-Powered Behavior Analysis',
                  'Global Threat Intelligence',
                  'Network Traffic Surveillance',
                  'Cloud Infrastructure Auditing',
                  'Automated Alert Prioritization'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-500" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-cyan-500 mb-2">2.4M+</div>
                <div className="text-slate-400">Threats Blocked YTD</div>
              </div>
              <div className="space-y-4">
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 w-[94%]" />
                </div>
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Detection Accuracy</span>
                  <span>94%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-white">Ready to Secure Your Enterprise?</h2>
          <Link
            href="/contact-us"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold text-lg transition-all shadow-lg text-white inline-block"
          >
            Schedule Free Assessment
          </Link>
        </div>
      </section>
    </div>
  );
}
