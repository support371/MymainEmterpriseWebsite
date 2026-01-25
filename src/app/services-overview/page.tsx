import { Shield, Zap, Lock } from 'lucide-react';
import Link from 'next/link';

export default function ServicesOverviewPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-12 text-white">Our Services</h1>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { title: '24/7 Monitoring', icon: Shield, href: '/monitoring-threats' },
            { title: 'Incident Response', icon: Zap, href: '/services/incident-response' },
            { title: 'Compliance', icon: Lock, href: '/compliance-governance' }
          ].map((s, i) => (
            <Link key={i} href={s.href} className="bg-slate-900 border border-slate-800 p-8 rounded-xl hover:border-cyan-500 transition-colors">
              <s.icon className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white">{s.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
