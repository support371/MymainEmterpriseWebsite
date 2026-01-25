"use client";

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen pt-20">
      <section className="relative pt-24 pb-12 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-white">Portfolio Dashboard</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
            {[
              { label: 'Total Assets', value: '$52.4M' },
              { label: 'Digital', value: '245' },
              { label: 'Properties', value: '8' },
              { label: 'Uptime', value: '99.97%' }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                <div className="text-xs text-slate-500 uppercase mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-cyan-500">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {['overview', 'digital', 'properties', 'reports'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab ? 'bg-cyan-500 text-white' : 'bg-slate-900 text-slate-400'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-white">Security Status</h2>
            <div className="space-y-3">
              {['All Systems Operational', '24/7 Monitoring Active', 'Compliance Up to Date'].map((status, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-slate-800 rounded-lg text-white">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
