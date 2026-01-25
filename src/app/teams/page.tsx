import { Linkedin, Mail, Shield, Users } from 'lucide-react';
import Link from 'next/link';

export default function TeamPage() {
  const leadership = [
    { name: 'Michael Chen', title: 'CEO & Founder', initials: 'MC', bio: 'Former CISO at Fortune 100 with 20+ years experience' },
    { name: 'Sarah Rodriguez', title: 'CTO', initials: 'SR', bio: 'MIT PhD, pioneered AI threat detection systems' },
    { name: 'James Patterson', title: 'Chief Compliance Officer', initials: 'JP', bio: 'Former federal regulator, Harvard Law' },
    { name: 'Alexandra Morrison', title: 'VP Real Estate', initials: 'AM', bio: '18 years managing $200M+ portfolios' }
  ];

  const securityTeam = [
    { name: 'David Kim', role: 'Lead Security Analyst', certs: 'GCIA, GCIH, OSCP' },
    { name: 'Maria Santos', role: 'Incident Response', certs: 'GCFA, GREM, EnCE' },
    { name: 'Robert Taylor', role: 'Compliance Manager', certs: 'CISA, CRISC, QSA' },
    { name: 'Jennifer Lee', role: 'Penetration Testing', certs: 'OSCP, OSCE, GPEN' },
    { name: 'Thomas Anderson', role: 'Cloud Security', certs: 'CCSP, AWS Security' },
    { name: 'Lisa Chen', role: 'Threat Hunter', certs: 'GCTI, GDAT, CEH' }
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-slate-950" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            The Experts Behind
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Your Security
            </span>
          </h1>
          <p className="text-lg text-slate-400">
            World-class security professionals dedicated to protecting your organization
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">Leadership Team</h2>
            <p className="text-slate-400">Decades of combined expertise</p>
          </div>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
            {leadership.map((member, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-colors">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-3xl font-bold flex-shrink-0 text-white">
                    {member.initials}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1 text-white">{member.name}</h3>
                    <p className="text-cyan-500 font-medium mb-4">{member.title}</p>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 flex items-center justify-center transition-colors">
                        <Linkedin className="w-4 h-4 text-cyan-500" />
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 flex items-center justify-center transition-colors">
                        <Mail className="w-4 h-4 text-cyan-500" />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-slate-400 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">Security Operations Team</h2>
            <p className="text-slate-400">Elite analysts protecting 24/7/365</p>
          </div>
          <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityTeam.map((member, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-colors">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold mb-4 text-white">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-lg font-bold mb-1 text-white">{member.name}</h3>
                <p className="text-cyan-500 text-sm font-medium mb-3">{member.role}</p>
                <div className="pt-4 border-t border-slate-700">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-cyan-500" />
                    <span className="text-xs text-slate-400">{member.certs}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <Users className="w-16 h-16 text-cyan-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4 text-white">Join Our Team</h2>
          <p className="text-slate-400 text-lg mb-8">
            Looking for talented security professionals passionate about protecting organizations
          </p>
          <Link
            href="/contact-us"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold text-lg transition-all shadow-lg text-white inline-block"
          >
            View Positions
          </Link>
        </div>
      </section>
    </div>
  );
}
