import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Zap, Lock, Eye, Building2, Globe, Phone, Users, Award, BookOpen, Network, LayoutDashboard, Mail } from 'lucide-react';
import Hero from '@/components/ui/Hero';
import StatGrid from '@/components/ui/StatGrid';
import SectionHeader from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  description: "Unified Operations Center for global threat detection, federal compliance, and high-value physical asset protection. The definitive partner for the Hybrid Enterprise.",
};

export default function HomePage() {
  const stats = [
    { label: 'Uptime SLA', value: '99.9%' },
    { label: 'Response Time', value: '2min' },
    { label: '$50M+ Assets Managed', value: '$50M+' }
  ];

  return (
    <div>
      <Hero
        title="GEM Enterprise Cybersecurity & Alliance Trust Realty"
        subtitle="Unified Operations Center for global threat detection, federal compliance, and physical asset protection."
        badge={{ icon: Shield, text: "24/7 Enterprise Monitoring Active" }}
        cta={{ text: "Schedule Assessment", href: "/contact-us" }}
        secondaryCta={{ text: "View Pricing", href: "/pricing" }}
      />

      <div className="container mx-auto px-4 -mt-16 relative z-20 mb-24">
        <StatGrid stats={stats} />
      </div>

      {/* Solutions Section */}
      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Cybersecurity & Physical Solutions"
            subtitle="Enterprise-grade protection for the modern Hybrid Enterprise"
          />

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { icon: Shield, title: '24/7 Threat Monitoring', desc: 'Continuous surveillance with AI-powered detection' },
              { icon: Zap, title: 'Incident Response', desc: '2-minute average response time guaranteed' },
              { icon: Lock, title: 'Federal Compliance', desc: 'NIST, CMMC, and ISO 27001 certification support' },
              { icon: Building2, title: 'Asset Recovery', desc: 'High-value physical asset recovery and protection' },
              { icon: Eye, title: 'Intelligence Hub', desc: 'Canonical source for global threat intelligence' },
              { icon: Globe, title: 'Global Coverage', desc: 'Protection across all time zones and jurisdictions' }
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-8 hover:border-cyan-500/50 transition-colors">
                  <Icon className="w-12 h-12 text-cyan-500 mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                  <p className="text-slate-400">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl relative">
              <div className="text-cyan-500 text-6xl font-serif absolute top-4 left-4 opacity-20">&quot;</div>
              <p className="text-slate-300 italic mb-6 relative z-10">
                The integration of digital threat intelligence with physical asset protection has transformed our risk profile. GEM Cybersecurity is the definitive partner for the hybrid enterprise.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800" />
                <div>
                  <div className="text-white font-bold">Michael Gilbert</div>
                  <div className="text-slate-500 text-sm">Director of Operations</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl relative">
              <div className="text-cyan-500 text-6xl font-serif absolute top-4 left-4 opacity-20">&quot;</div>
              <p className="text-slate-300 italic mb-6 relative z-10">
                Their 2-minute response guarantee isn&apos;t just a marketing slogan; it&apos;s a mission-critical reality that has saved our enterprise millions in potential data loss.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800" />
                <div>
                  <div className="text-white font-bold">Jennifer Davis</div>
                  <div className="text-slate-500 text-sm">Senior Security Analyst</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Explore Our Platform"
            subtitle="Comprehensive security and asset management"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              { title: 'About Us', icon: Shield, path: '/about-us', desc: 'Our story and mission' },
              { title: 'Our Team', icon: Users, path: '/teams', desc: 'Security experts' },
              { title: 'Case Studies', icon: Award, path: '/case-studies', desc: 'Real success stories' },

              { title: 'Intelligence', icon: Eye, path: '/intelligence', desc: 'Global threat feed' },


              { title: 'Resources', icon: BookOpen, path: '/resources', desc: 'Guides & reports' },
              { title: 'QFS Network', icon: Network, path: '/qfs', desc: 'Quantum security' },
              { title: 'Sentinel Trust', icon: Lock, path: '/cyber-sentinel-trust', desc: 'Zero trust' },
              { title: 'Portfolio', icon: LayoutDashboard, path: '/portfolio', desc: 'Asset dashboard' },
              { title: 'Pricing', icon: Zap, path: '/pricing', desc: 'Plans & pricing' },
              { title: 'Contact', icon: Mail, path: '/contact-us', desc: 'Get in touch' }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.path}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all text-left group block"
                >
                  <Icon className="w-8 h-8 text-cyan-500 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-500 transition-colors text-white">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border-2 border-cyan-500/30 p-12 rounded-2xl text-center shadow-2xl">
            <Phone className="w-16 h-16 text-cyan-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4 text-white">24/7 Emergency Hotline</h2>
            <p className="text-slate-400 text-lg mb-8">
              Active security breach? Our rapid-response team is standing by.
            </p>
            <a href="tel:+18603054376" className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold text-lg transition-colors text-white">
              <Phone className="w-5 h-5" />
              (860) 305-4376
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
