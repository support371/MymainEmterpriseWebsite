import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

export default function IncidentResponsePage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-slate-950" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-red-500">Emergency Service</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Rapid Incident Response &
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">
                Digital Forensics
              </span>
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Rapid containment and remediation of active security breaches with full forensic documentation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl text-center">
              <Clock className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <div className="text-5xl font-bold text-white mb-2">2 Minutes</div>
              <div className="text-slate-400 text-lg">Average Response Time</div>
              <div className="mt-8 pt-8 border-t border-slate-800">
                <a href="tel:+18603054376" className="text-red-500 font-bold text-2xl hover:text-red-400 transition-colors block">
                  (860) 305-4376
                </a>
                <p className="text-slate-500 text-sm mt-2">24/7 Emergency Hotline</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6 text-white">Elite Response Team</h2>
              <p className="text-slate-400 text-lg mb-8">
                When a breach occurs, every second counts. Our elite response team is standing by 24/7 to contain the threat and minimize damage.
              </p>
              <ul className="space-y-4">
                {[
                  '2-Minute Response Guarantee',
                  '24/7 Emergency Team',
                  'Breach Containment Protocols',
                  'Digital Evidence Collection',
                  'Root Cause Analysis',
                  'Remediation Planning & Execution'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-red-500" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-white">Active Security Incident?</h2>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
            Our rapid-response team can be engaged immediately to protect your assets and data.
          </p>
          <Link
            href="/contact-us"
            className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 rounded-lg font-semibold text-lg transition-all shadow-lg text-white inline-block"
          >
            Engage Response Team
          </Link>
        </div>
      </section>
    </div>
  );
}
