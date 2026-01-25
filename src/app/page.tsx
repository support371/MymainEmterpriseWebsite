import Link from 'next/link';
import { Shield, Zap, Lock, Eye, Building2, Globe, Phone, Users, Award, BookOpen, Network, LayoutDashboard, Mail } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-slate-950" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(71, 85, 105) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          opacity: 0.15
        }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Shield className="w-4 h-4 text-cyan-500" />
              <span className="text-sm font-medium text-cyan-500">24/7 Enterprise Monitoring Active</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
              GEM Enterprise Cybersecurity &
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Alliance Trust Realty
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-8 font-medium tracking-tight">
              Unified Operations Center for global threat detection,
              federal compliance, and physical asset protection.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/contact-us"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold text-lg transition-all shadow-lg text-white text-center"
              >
                Schedule Assessment
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white rounded-lg font-semibold text-lg transition-all text-center"
              >
                View Pricing
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <div className="text-3xl font-bold text-cyan-500 mb-2">99.9%</div>
                <div className="text-sm text-slate-400">Uptime SLA</div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <div className="text-3xl font-bold text-cyan-500 mb-2">2min</div>
                <div className="text-sm text-slate-400">Response Time</div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <div className="text-3xl font-bold text-cyan-500 mb-2">$50M+</div>
                <div className="text-sm text-slate-400">Assets Managed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Cybersecurity & Physical Solutions</h2>
            <p className="text-slate-400 text-lg">Enterprise-grade protection for the modern Hybrid Enterprise</p>
          </div>

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
              <div className="text-cyan-500 text-6xl font-serif absolute top-4 left-4 opacity-20">"</div>
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
              <div className="text-cyan-500 text-6xl font-serif absolute top-4 left-4 opacity-20">"</div>
              <p className="text-slate-300 italic mb-6 relative z-10">
                Their 2-minute response guarantee isn't just a marketing slogan; it's a mission-critical reality that has saved our enterprise millions in potential data loss.
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
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Explore Our Platform</h2>
            <p className="text-slate-400 text-lg">Comprehensive security and asset management</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              { title: 'About Us', icon: Shield, path: '/about-us', desc: 'Our story and mission' },
              { title: 'Our Team', icon: Users, path: '/teams', desc: 'Security experts' },
              { title: 'Case Studies', icon: Award, path: '/case-studies', desc: 'Real success stories' },
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
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border-2 border-cyan-500/30 p-12 rounded-2xl text-center">
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
