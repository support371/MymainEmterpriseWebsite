import { Cookie } from 'lucide-react';

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-white">Cookie Policy</h1>
        <p className="text-slate-400 mb-8">Last Updated: January 24, 2026</p>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-8 text-slate-300">
          <p>We use cookies and similar technologies to enhance your experience on our website.</p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { type: 'Essential', desc: 'Required for the website to function properly.' },
              { type: 'Analytics', desc: 'Used to understand how visitors interact with our website.' },
              { type: 'Functional', desc: 'Used to remember your preferences and settings.' },
              { type: 'Marketing', desc: 'Used to deliver relevant advertisements to you.' }
            ].map((cookie, i) => (
              <div key={i} className="bg-slate-800 rounded-lg p-6">
                <Cookie className="w-6 h-6 text-cyan-500 mb-2" />
                <h3 className="font-bold mb-1 text-white">{cookie.type} Cookies</h3>
                <p className="text-slate-400 text-sm">{cookie.desc}</p>
              </div>
            ))}
          </div>

          <section>
            <h2 className="text-xl font-bold mb-4 text-white">Managing Cookies</h2>
            <p className="text-sm">Most web browsers allow you to control cookies through their settings. You can choose to block or delete cookies at any time.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
