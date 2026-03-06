import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Building2, Eye, Globe, Lock, Shield, Zap } from 'lucide-react';
import Hero from '@/components/ui/Hero';
import SectionHeader from '@/components/ui/SectionHeader';
import StatGrid from '@/components/ui/StatGrid';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Enterprise cybersecurity and physical asset services including SOC operations, compliance management, and incident response.',
};

const services = [
  {
    title: 'Threat Monitoring',
    href: '/hub/soc',
    icon: Shield,
    desc: '24/7 AI-powered surveillance and real-time threat detection across all enterprise endpoints.',
    tier: 'Enterprise',
  },
  {
    title: 'Compliance Management',
    href: '/hub/compliance',
    icon: Lock,
    desc: 'Automated governance and continuous compliance for SOC 2, ISO 27001, and HIPAA.',
    tier: 'Core',
  },
  {
    title: 'Asset Recovery',
    href: '/assets/recovery',
    icon: Building2,
    desc: 'High-value physical asset protection and global recovery operations by Alliance Trust Realty.',
    tier: 'Elite',
  },
  {
    title: 'Federal Compliance',
    href: '/hub/compliance/federal',
    icon: Eye,
    desc: 'Specialized regulatory navigation for NIST SP 800-171 and CMMC 2.0 requirements.',
    tier: 'Enterprise',
  },
  {
    title: 'Incident Response',
    href: '/hub/soc/incident-response',
    icon: Zap,
    desc: 'Guaranteed 2-minute response time for active security breaches and data loss mitigation.',
    tier: 'All Tiers',
  },
];

export default function ServicesPage() {
  const stats = [
    { label: 'Countries', value: '24+' },
    { label: 'Assets Managed', value: '$50M+' },
    { label: 'Security Analysts', value: '150+' },
    { label: 'Enterprise Clients', value: '500+' },
  ];

  return (
    <div className="min-h-screen pt-20 lg:pt-0">
      <Hero
        title="Enterprise Service Suite"
        subtitle="Integrated cybersecurity and physical asset management for the modern hybrid enterprise."
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Service Portfolio"
            subtitle="Select a service line to open detailed capabilities, response models, and operating standards."
          />
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all hover:border-blue-500/50"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                    <service.icon className="h-7 w-7" />
                  </div>
                  <span className="rounded border border-slate-800 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    {service.tier}
                  </span>
                </div>
                <h2 className="mb-3 text-2xl font-bold text-white transition-colors group-hover:text-blue-400">
                  {service.title}
                </h2>
                <p className="mb-6 flex-1 text-slate-400">{service.desc}</p>
                <div className="flex items-center gap-2 font-bold text-blue-500 transition-transform group-hover:translate-x-1">
                  Explore Service <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                title="Global Operations Center"
                subtitle="Operating across 24 countries, our Unified Operations Center provides seamless protection for both your digital perimeter and physical holdings."
                centered={false}
              />
              <StatGrid stats={stats} columns={2} />
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe className="h-28 w-28 animate-pulse text-blue-500 opacity-20" />
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_70%)]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
