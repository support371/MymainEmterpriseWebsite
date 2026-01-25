import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const plans = [
    { name: 'Starter', price: '$2,499', features: ['50 Endpoints', '24/7 Monitoring', 'Email Support', 'Monthly Reports'], popular: false },
    { name: 'Professional', price: '$5,999', features: ['500 Endpoints', 'Priority Support (2hr)', 'Weekly Reports', 'Quarterly Pen Testing'], popular: true },
    { name: 'Enterprise', price: 'Custom', features: ['Unlimited Endpoints', 'Dedicated Team', 'Real-time Reports', 'Monthly Pen Testing'], popular: false }
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-slate-950" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Security That Scales
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              With Your Business
            </span>
          </h1>
          <p className="text-lg text-slate-400">
            Enterprise-grade cybersecurity without enterprise complexity
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, idx) => (
              <div key={idx} className={`rounded-2xl p-8 ${plan.popular ? 'bg-gradient-to-b from-cyan-500/10 to-slate-900 border-2 border-cyan-500/50 relative' : 'bg-slate-900 border border-slate-800'}`}>
                {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-500 rounded-full text-sm font-semibold text-white">Most Popular</div>}
                <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                <div className="text-4xl font-bold mb-6 text-white">{plan.price}<span className="text-lg text-slate-400 font-normal">/mo</span></div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-sm text-slate-300">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact-us"
                  className={`w-full py-3 rounded-lg font-semibold transition-all text-center block ${plan.popular ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white' : 'border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white'}`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
