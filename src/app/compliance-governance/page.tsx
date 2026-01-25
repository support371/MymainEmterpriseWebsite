import { Shield, CheckCircle, Lock, Award } from 'lucide-react';
import Link from 'next/link';

export default function CompliancePage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-slate-950" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Shield className="w-4 h-4 text-cyan-500" />
              <span className="text-sm font-medium text-cyan-500">Compliance & Governance</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Regulatory Compliance &
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Risk Management
              </span>
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Strategic frameworks to ensure regulatory compliance and systematic reduction of enterprise risk.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <Award className="w-12 h-12 text-cyan-500 mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-white">Certification Readiness</h3>
                <p className="text-slate-400 mb-6">
                  We help you navigate the complex landscape of cybersecurity certifications and audits.
                </p>
                <ul className="space-y-3">
                  {['SOC 2 Type II Readiness', 'ISO 27001 Certification', 'NIST Framework Alignment', 'FedRAMP Compliance Support'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="w-4 h-4 text-cyan-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <Lock className="w-12 h-12 text-cyan-500 mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-white">Risk Mitigation</h3>
                <p className="text-slate-400 mb-6">
                  Systematic identification and reduction of digital and physical assets risks.
                </p>
                <ul className="space-y-3">
                  {['Vulnerability Assessments', 'Supply Chain Risk Audits', 'Security Policy Design', 'HIPAA & PCI DSS Compliance'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="w-4 h-4 text-cyan-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl p-12 text-center">
               <h2 className="text-3xl font-bold mb-6 text-white">Industry-Leading Standards</h2>
               <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                  <div className="text-2xl font-black text-white">SOC 2</div>
                  <div className="text-2xl font-black text-white">ISO 27001</div>
                  <div className="text-2xl font-black text-white">HIPAA</div>
                  <div className="text-2xl font-black text-white">PCI DSS</div>
                  <div className="text-2xl font-black text-white">GDPR</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-white">Start Your Compliance Journey</h2>
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
