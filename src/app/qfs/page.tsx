import Link from 'next/link';

export default function QFSPage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-slate-950" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Quantum-Secure
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Financial Infrastructure
            </span>
          </h1>
          <p className="text-lg text-slate-400 mb-8">
            Military-level security for high-value transactions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact-us"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold text-lg transition-all shadow-lg text-white text-center"
            >
              Request Integration
            </Link>
            <button className="px-8 py-4 border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white rounded-lg font-semibold text-lg transition-all">
              View Docs
            </button>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 text-white">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'Transaction Throughput', value: '100K+ TPS' },
              { label: 'Average Latency', value: '<50ms' },
              { label: 'Uptime SLA', value: '99.99%' }
            ].map((spec, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
                <div className="text-xs text-slate-500 uppercase mb-2">{spec.label}</div>
                <div className="text-2xl font-bold text-cyan-500">{spec.value}</div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-cyan-500/10 to-slate-900 border-2 border-cyan-500/30 rounded-2xl p-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">What is QFS?</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              The Quantum Financial System represents the evolution of financial infrastructure,
              leveraging quantum-resistant encryption and distributed ledger technology.
            </p>
            <p className="text-slate-300 leading-relaxed">
              GEM Enterprise provides 24/7 security monitoring, threat detection, and compliance
              management for organizations on the QFS network.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
