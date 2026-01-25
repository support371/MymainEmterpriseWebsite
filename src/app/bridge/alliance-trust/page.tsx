import { Building2, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AllianceTrustPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <Building2 className="w-20 h-20 text-cyan-500 mx-auto mb-8" />
        <h1 className="text-4xl font-bold mb-6 text-white">Alliance Trust Realty</h1>
        <p className="text-xl text-slate-400 mb-12">
          Protecting physical assets with the same precision and technology used for digital security.
        </p>
        <div className="bg-slate-900 border border-slate-800 p-12 rounded-2xl text-left space-y-6 text-slate-300">
           <h2 className="text-2xl font-bold text-white mb-4">Integrated Asset Protection</h2>
           <p>Alliance Trust Realty, a GEM Enterprise company, provides specialized real estate asset management and recovery services.</p>
           <ul className="space-y-4">
              <li className="flex items-center gap-3">
                 <Shield className="w-5 h-5 text-cyan-500" />
                 <span>High-value property protection</span>
              </li>
              <li className="flex items-center gap-3">
                 <Shield className="w-5 h-5 text-cyan-500" />
                 <span>Asset recovery and liquidation</span>
              </li>
              <li className="flex items-center gap-3">
                 <Shield className="w-5 h-5 text-cyan-500" />
                 <span>Portfolio security audits</span>
              </li>
           </ul>
        </div>
        <div className="mt-12">
           <Link href="/contact-us" className="inline-flex items-center gap-2 text-cyan-500 font-bold hover:text-cyan-400">
              Learn more about our dual-platform model
              <ArrowRight className="w-5 h-5" />
           </Link>
        </div>
      </div>
    </div>
  );
}
