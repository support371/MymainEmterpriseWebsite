import { Metadata } from 'next';
import Link from 'next/link';
import {
  Shield,
  Zap,
  Lock,
  Eye,
  Building2,
  Globe,
  Phone,
  Users,
  Award,
  BookOpen,
  Network,
  LayoutDashboard,
  Mail,
} from 'lucide-react';

export const metadata: Metadata = {
  description:
    'Unified Operations Center for global threat detection, federal compliance, and high-value physical asset protection. The definitive partner for the Hybrid Enterprise.',
};

const solutions = [
  { icon: Shield, title: '24/7 Threat Monitoring', desc: 'Continuous surveillance with AI-powered detection' },
  { icon: Zap, title: 'Incident Response', desc: '2-minute average response time guaranteed' },
  { icon: Lock, title: 'Federal Compliance', desc: 'NIST, CMMC, and ISO 27001 certification support' },
  { icon: Building2, title: 'Asset Recovery', desc: 'High-value physical asset recovery and protection' },
  { icon: Eye, title: 'Intelligence Hub', desc: 'Canonical source for global threat intelligence' },
  { icon: Globe, title: 'Global Coverage', desc: 'Protection across all time zones and jurisdictions' },
];

const platformLinks = [
  { title: 'About Us', icon: Shield, path: '/about-us', desc: 'Our story and mission' },
  { title: 'Our Team', icon: Users, path: '/teams', desc: 'Security experts' },
  { title: 'Case Studies', icon: Award, path: '/case-studies', desc: 'Real success stories' },
  { title: 'Intelligence', icon: Eye, path: '/news', desc: 'Global threat feed' },
  { title: 'Resources', icon: BookOpen, path: '/resources', desc: 'Guides & reports' },
  { title: 'QFS Network', icon: Network, path: '/qfs', desc: 'Quantum security' },
  { title: 'Sentinel Trust', icon: Lock, path: '/cyber-sentinel-trust', desc: 'Zero trust' },
  { title: 'Portfolio', icon: LayoutDashboard, path: '/portfolio', desc: 'Asset dashboard' },
  { title: 'Pricing', icon: Zap, path: '/pricing', desc: 'Plans & pricing' },
  { title: 'Contact', icon: Mail, path: '/contact-us', desc: 'Get in touch' },
];

export default function HomePage() {
  return (
    <div className="bg-slate-950">
      <section className="relative overflow-hidden border-b border-slate-800/70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(6,182,212,0.2),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.14),transparent_30%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="container mx-auto px-4 relative z-10 pt-32 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-7">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-xs md:text-sm font-medium text-cyan-300">24/7 Enterprise Monitoring Active</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight max-w-5xl mx-auto">
            GEM Enterprise
            <br />
            Cybersecurity &amp; Alliance
            <br />
            Trust Realty
          </h1>

          <p className="mt-7 text-slate-300 max-w-3xl mx-auto text-lg md:text-2xl">
            Unified Operations Center for global threat detection, federal compliance, and physical asset protection.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact-us" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition-colors">
              Schedule Assessment
            </Link>
            <Link href="/pricing" className="px-8 py-4 border border-cyan-500 text-cyan-300 hover:bg-cyan-500/10 font-semibold rounded-lg transition-colors">
              View Pricing
            </Link>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { label: 'Uptime SLA', value: '99.9%' },
              { label: 'Response Time', value: '2min' },
              { label: '$50M+ Assets Managed', value: '$50M+' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900/55 p-6">
                <div className="text-cyan-400 text-4xl font-bold">{stat.value}</div>
                <div className="text-xs text-slate-400 uppercase tracking-[0.2em] mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[linear-gradient(180deg,rgba(15,23,42,0.7),rgba(2,6,23,0.9))]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Cybersecurity &amp; Physical Solutions</h2>
            <p className="text-slate-400 mt-3 text-lg">Enterprise-grade protection for the modern Hybrid Enterprise</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {solutions.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.title} className="rounded-xl border border-slate-800 bg-slate-900/45 p-7 hover:border-cyan-500/50 transition-colors">
                  <Icon className="w-10 h-10 text-cyan-400 mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-slate-400">{service.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  'The integration of digital threat intelligence with physical asset protection has transformed our risk profile. GEM Cybersecurity is the definitive partner for the hybrid enterprise.',
                name: 'Michael Gilbert',
                role: 'Director of Operations',
              },
              {
                quote:
                  "Their 2-minute response guarantee isn't just a marketing slogan; it's a mission-critical reality that has saved our enterprise millions in potential data loss.",
                name: 'Jennifer Davis',
                role: 'Senior Security Analyst',
              },
            ].map((testimonial) => (
              <article key={testimonial.name} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-8 relative">
                <span className="absolute top-4 left-4 text-cyan-500/25 text-6xl leading-none">&quot;</span>
                <p className="text-slate-300 italic mb-6 relative z-10">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-slate-800 rounded-full" />
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-slate-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900/45 border-y border-slate-800/70">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Explore Our Platform</h2>
            <p className="text-slate-400 mt-3 text-lg">Comprehensive security and asset management</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {platformLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} href={item.path} className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 hover:border-cyan-500/50 transition-colors">
                  <Icon className="w-8 h-8 text-cyan-400 mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto rounded-2xl border border-cyan-500/35 bg-cyan-500/10 p-12 text-center">
            <Phone className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-3">24/7 Emergency Hotline</h2>
            <p className="text-slate-300 text-lg mb-8">Active security breach? Our rapid-response team is standing by.</p>
            <a href="tel:+18603054376" className="inline-flex items-center gap-2 px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition-colors">
              <Phone className="w-5 h-5" />
              (860) 305-4376
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
