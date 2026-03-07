import { Users, Shield, Award, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Membership',
  description: 'GEM Cyber community membership tiers, benefits, and enrollment.',
};

export default function MembershipPage() {
  const tiers = [
    {
      name: 'Community',
      price: 'Free',
      features: ['Access to public forums', 'Monthly security digest', 'Community events', 'Knowledge base access'],
      highlight: false,
    },
    {
      name: 'Professional',
      price: '$199/mo',
      features: ['Private threat intel channels', 'Priority incident response', 'Compliance toolkit', 'Quarterly strategy sessions', 'Dedicated account manager'],
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: ['Full SOC integration', '24/7 dedicated analyst', 'Custom compliance frameworks', 'Board-level reporting', 'On-site security assessments', 'SLA-backed response times'],
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen pt-20 lg:pt-0">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-slate-950" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Users className="w-4 h-4 text-cyan-500" />
            <span className="text-sm font-medium text-cyan-500">Membership</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Join the GEM Cyber
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Security Community
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Select the membership tier that matches your organization&apos;s security posture and growth objectives.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div key={tier.name} className={`rounded-2xl p-6 flex flex-col ${
                tier.highlight
                  ? 'bg-gradient-to-b from-cyan-950/40 to-slate-900 border-2 border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900 border border-slate-800'
              }`}>
                {tier.highlight && (
                  <div className="text-center mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full">Most Popular</span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                <div className="text-3xl font-bold text-cyan-500 mb-6">{tier.price}</div>
                <ul className="space-y-3 flex-1 mb-6">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link href="/home/contact" className={`block text-center py-3 rounded-lg font-semibold transition-all ${
                  tier.highlight
                    ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                    : 'border border-slate-700 text-slate-300 hover:border-cyan-500 hover:text-white'
                }`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-3 gap-6 mb-12">
              {[
                { icon: Shield, label: 'Security First', stat: '99.97% uptime' },
                { icon: Award, label: 'Certified Team', stat: '150+ analysts' },
                { icon: Users, label: 'Global Network', stat: '500+ members' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <item.icon className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
                  <div className="text-lg font-bold text-white">{item.stat}</div>
                  <div className="text-sm text-slate-400">{item.label}</div>
                </div>
              ))}
            </div>
            <Link href="/home/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-all">
              Contact Sales <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
