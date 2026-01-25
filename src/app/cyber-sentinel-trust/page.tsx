import { Users, Eye, Lock, Network, FileText, Shield } from 'lucide-react';

export default function SentinelPage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-slate-950" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Enterprise Zero Trust
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Security Framework
            </span>
          </h1>
          <p className="text-lg text-slate-400">
            Never trust, always verify - eliminate implicit trust
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Users, title: 'Identity Verification', desc: 'Multi-factor authentication' },
              { icon: Eye, title: 'Continuous Monitoring', desc: '24/7 surveillance' },
              { icon: Lock, title: 'Least Privilege', desc: 'Minimal access only' },
              { icon: Network, title: 'Micro-Segmentation', desc: 'Secure zones' },
              { icon: FileText, title: 'Data Classification', desc: 'Auto protection' },
              { icon: Shield, title: 'Threat Prevention', desc: 'Proactive defense' }
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-colors">
                  <Icon className="w-8 h-8 text-cyan-500 mb-4" />
                  <h3 className="font-bold mb-2 text-white">{pillar.title}</h3>
                  <p className="text-slate-400 text-sm">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-6">
            {[
              { stat: '89%', label: 'Attack Surface Reduced' },
              { stat: '94%', label: 'Faster Detection' },
              { stat: '100%', label: 'Audit Coverage' },
              { stat: '2.3min', label: 'Containment Time' }
            ].map((benefit, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-cyan-500 mb-2">{benefit.stat}</div>
                <div className="text-sm text-slate-400">{benefit.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
