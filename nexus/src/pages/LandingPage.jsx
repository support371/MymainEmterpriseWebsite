import React from 'react';

export default function LandingPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold mb-6">
          <span className="text-orange-400">NEXUS</span> Bitcoin Banking
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Institutional-grade Bitcoin custody, seamless fiat on-ramp, and a Bitcoin-backed
          spending card — all in one platform.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => onNavigate('signup')}
            className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
          >
            Get Started
          </button>
          <button
            onClick={() => onNavigate('signin')}
            className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="Fiat On-Ramp"
            description="Deposit USD via ACH or wire transfer. Funds are automatically converted to Bitcoin at competitive rates."
          />
          <FeatureCard
            title="Bitcoin Custody"
            description="Your Bitcoin is held in institutional-grade cold storage with multi-sig security and full audit trail."
          />
          <FeatureCard
            title="Spending Card"
            description="Spend your Bitcoin anywhere with the Nexus card. Auto-converts BTC to fiat at point of sale."
          />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        <p>Nexus Bitcoin Banking &mdash; Demo Platform</p>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-orange-400 mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}
