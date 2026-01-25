"use client";

import { Newspaper, Bell, Lock, ArrowRight, Zap, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function IntelligencePage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
            <Newspaper className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-500">INTELLIGENCE HUB</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
            GEM Cyber
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              Intelligence & News
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
            The canonical source for global threat intelligence, regulatory updates, and hybrid enterprise security insights.
          </p>
          <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Lock className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-left">
              <div className="text-white font-bold uppercase tracking-widest text-sm">Status: Restricted Access</div>
              <div className="text-slate-500 text-xs">Public release scheduled for Q3 2026</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Insights Preview */}
      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Forthcoming Intelligence Reports</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto opacity-50 grayscale select-none">
            {[
              {
                category: 'Threat Intel',
                title: 'Global Ransomware Trends 2026',
                desc: 'An analysis of evolving double-extortion tactics in the real estate sector.',
                icon: ShieldAlert
              },
              {
                category: 'Regulatory',
                title: 'NIST 2.0 Transition Guide',
                desc: 'Strategic pathways for federal contractors navigating new compliance mandates.',
                icon: Zap
              },
              {
                category: 'Case Analysis',
                title: 'The QFS Security Model',
                desc: 'How Quantum Financial Systems are redefining asset recovery protocols.',
                icon: Bell
              }
            ].map((report, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4">
                  <report.icon className="w-6 h-6 text-blue-500" />
                </div>
                <div className="text-xs font-bold text-blue-500 mb-4 uppercase tracking-wider">{report.category}</div>
                <h3 className="text-xl font-bold text-white mb-4">{report.title}</h3>
                <p className="text-slate-400 text-sm mb-6">{report.desc}</p>
                <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                  COMING SOON <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-500/20 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Secure Your Subscription</h2>
            <p className="text-slate-400 mb-8">
              Be the first to receive restricted briefings and intelligence alerts.
            </p>
            <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enterprise Email Address"
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                Request Access
              </button>
            </form>
            <p className="text-xs text-slate-500 mt-6">
              Subject to background verification. Privacy protocols enforced.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
