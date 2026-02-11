import { Metadata } from 'next';
import { Shield, Zap, Lock, Building2, Eye, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Hero from '@/components/ui/Hero';
import StatGrid from '@/components/ui/StatGrid';
import SectionHeader from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: "Services Hub",
  description: "Explore our comprehensive security services, from 24/7 threat monitoring to federal compliance and high-value asset recovery.",
};

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
  const stats = [
    { label: 'Countries', value: '24+' },
    { label: 'Assets Managed', value: '$50M+' },
    { label: 'Security Analysts', value: '150+' },
    { label: 'Enterprise Clients', value: '500+' }
  ];

  return (
    <div className="min-h-screen pt-20">
      <Hero
        title="Enterprise Service Suite"
        subtitle="Integrated cybersecurity and physical asset management for the modern hybrid enterprise."
      />

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
              <SectionHeader
                title="Global Operations Center"
                subtitle="Operating across 24 countries, our Unified Operations Center provides seamless protection for both your digital perimeter and physical holdings."
                centered={false}
              />
              <StatGrid stats={stats} columns={2} />
            </div>
            <div className="relative aspect-video rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center shadow-2xl">
               <Globe className="w-32 h-32 text-blue-500 opacity-20 animate-pulse" />
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_70%)]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
