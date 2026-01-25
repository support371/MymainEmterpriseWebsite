import { Shield, Zap, Lock, Building2, Eye, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: 'Threat Monitoring',
    href: '/services/threat-monitoring',
    icon: Shield,
    desc: '24/7 AI-powered surveillance and real-time threat detection across all enterprise endpoints.',
    tier: 'Enterprise'
  },
  {
    title: 'Compliance Management',
    href: '/services/compliance-management',
    icon: Lock,
    desc: 'Automated governance and continuous compliance for SOC 2, ISO 27001, and HIPAA.',
    tier: 'Core'
  },
  {
    title: 'Asset Recovery',
    href: '/services/asset-recovery',
    icon: Building2,
    desc: 'High-value physical asset protection and global recovery operations by Alliance Trust Realty.',
    tier: 'Elite'
  },
  {
    title: 'Federal Compliance',
    href: '/services/federal-compliance',
    icon: Eye,
    desc: 'Specialized regulatory navigation for NIST SP 800-171 and CMMC 2.0 requirements.',
    tier: 'Enterprise'
  },
  {
    title: 'Incident Response',
    href: '/services/incident-response',
    icon: Zap,
    desc: 'Guaranteed 2-minute response time for active security breaches and data loss mitigation.',
    tier: 'All Tiers'
  }
];

export default function ServicesHubPage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 bg-slate-950 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight">
              Enterprise
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500"> Service Suite
              </span>
            </h1>
            <p className="text-xl text-slate-400">
              Integrated cybersecurity and physical asset management for the modern hybrid enterprise.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, idx) => (
              <Link
                key={idx}
                href={service.href}
                className="group bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-800 px-2 py-1 rounded">
                    {service.tier}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 leading-relaxed mb-8 flex-1">
                  {service.desc}
                </p>
                <div className="flex items-center gap-2 text-blue-500 font-bold group-hover:translate-x-1 transition-transform">
                  Explore Service <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-24 bg-slate-900/50 border-y border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Global Operations Center</h2>
              <p className="text-slate-400 text-lg mb-8">
                Operating across 24 countries, our Unified Operations Center provides seamless
                protection for both your digital perimeter and physical holdings.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Countries', val: '24+' },
                  { label: 'Assets', val: '$50M+' },
                  { label: 'Analysts', val: '150+' },
                  { label: 'Clients', val: '500+' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl font-bold text-white">{stat.val}</div>
                    <div className="text-sm text-slate-500 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-video rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
               <Globe className="w-32 h-32 text-blue-500 opacity-20 animate-pulse" />
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_70%)]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
