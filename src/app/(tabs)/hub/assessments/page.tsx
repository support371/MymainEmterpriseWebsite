import { Shield, FileCheck, AlertTriangle, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Security Assessments',
  description: 'Enterprise security assessments, vulnerability scanning, and penetration testing services.',
};

export default function AssessmentsPage() {
  const assessments = [
    {
      title: 'Vulnerability Assessment',
      status: 'Completed',
      date: 'Mar 1, 2026',
      findings: { critical: 0, high: 2, medium: 8, low: 14 },
      scope: 'External perimeter + DMZ',
    },
    {
      title: 'Penetration Test — Web Applications',
      status: 'In Progress',
      date: 'Mar 10, 2026',
      findings: { critical: 1, high: 3, medium: 5, low: 7 },
      scope: 'Client portal, API gateway',
    },
    {
      title: 'Cloud Infrastructure Review',
      status: 'Scheduled',
      date: 'Apr 1, 2026',
      findings: null,
      scope: 'AWS + Azure multi-cloud',
    },
    {
      title: 'Social Engineering Campaign',
      status: 'Completed',
      date: 'Feb 15, 2026',
      findings: { critical: 0, high: 1, medium: 3, low: 6 },
      scope: 'Phishing simulation — 500 users',
    },
  ];

  const services = [
    { icon: Shield, title: 'Penetration Testing', desc: 'Black-box and white-box testing of networks, applications, and infrastructure.' },
    { icon: FileCheck, title: 'Compliance Audits', desc: 'SOC 2, ISO 27001, HIPAA, and NIST compliance gap analysis and readiness.' },
    { icon: AlertTriangle, title: 'Red Team Exercises', desc: 'Adversarial simulation of advanced persistent threats targeting your organization.' },
    { icon: Clock, title: 'Continuous Monitoring', desc: '24/7 automated vulnerability scanning with real-time risk scoring.' },
  ];

  return (
    <div className="min-h-screen pt-20 lg:pt-0">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-slate-950" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Shield className="w-4 h-4 text-cyan-500" />
              <span className="text-sm font-medium text-cyan-500">Security Assessments</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Proactive Security
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Assessment Suite
              </span>
            </h1>
            <p className="text-xl text-slate-400">
              Comprehensive vulnerability discovery, penetration testing, and compliance assessments.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-white">Assessment Dashboard</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Completed', value: '24', color: 'text-green-400' },
              { label: 'In Progress', value: '3', color: 'text-cyan-400' },
              { label: 'Scheduled', value: '5', color: 'text-amber-400' },
              { label: 'Critical Findings', value: '1', color: 'text-red-400' },
            ].map((stat) => (
              <div key={stat.label} className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center">
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {assessments.map((assessment) => (
              <div key={assessment.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-white">{assessment.title}</h3>
                    <p className="text-sm text-slate-500 font-mono">{assessment.scope} · {assessment.date}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    assessment.status === 'Completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                    assessment.status === 'In Progress' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>{assessment.status}</span>
                </div>
                {assessment.findings && (
                  <div className="flex gap-3 flex-wrap">
                    {Object.entries(assessment.findings).map(([severity, count]) => (
                      <div key={severity} className={`text-xs font-mono px-2 py-1 rounded ${
                        severity === 'critical' ? 'bg-red-500/10 text-red-400' :
                        severity === 'high' ? 'bg-orange-500/10 text-orange-400' :
                        severity === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {severity}: {count}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-white text-center">Assessment Services</h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div key={service.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex gap-4">
                <service.icon className="w-8 h-8 text-cyan-500 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">{service.title}</h3>
                  <p className="text-sm text-slate-400">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <CheckCircle className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4 text-white">Request an Assessment</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">Our certified security engineers will scope and execute a tailored assessment for your organization.</p>
          <Link href="/home/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-all">
            Schedule Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
