'use client';

import { useState, useCallback } from 'react';
import { Search, FileText, Clock, Download, Mail, CheckCircle, AlertCircle } from 'lucide-react';

const resources = [
  { title: 'SOC 2 Compliance Guide', type: 'Whitepaper', time: '45 min', views: '12.5K' },
  { title: 'Ransomware Defense 2026', type: 'Whitepaper', time: '35 min', views: '18.2K' },
  { title: 'Zero Trust Framework', type: 'Guide', time: '30 min', views: '11.2K' },
  { title: 'Incident Response Checklist', type: 'Guide', time: '15 min', views: '25.3K' },
  { title: 'Q1 2026 Threat Report', type: 'Report', time: '25 min', views: '21.8K' },
  { title: 'Security ROI Calculator', type: 'Tool', time: '5 min', views: '31.2K' },
];

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Subscription failed');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  }, [email]);

  return (
    <form onSubmit={handleSubmit}>
      {status === 'success' ? (
        <div className="flex items-center gap-3 justify-center text-emerald-400">
          <CheckCircle className="w-6 h-6" />
          <span className="font-semibold">{message}</span>
        </div>
      ) : (
        <>
          <div className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg focus:border-cyan-500 focus:outline-none text-white"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          {status === 'error' && (
            <p className="mt-3 text-sm text-red-400 flex items-center gap-1 justify-center">
              <AlertCircle className="w-4 h-4" /> {message}
            </p>
          )}
        </>
      )}
    </form>
  );
}

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = searchQuery.trim()
    ? resources.filter(r =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : resources;

  return (
    <div className="min-h-screen pt-20 lg:pt-0">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-slate-950" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Security Intelligence &
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Expert Insights
            </span>
          </h1>
          <p className="text-lg text-slate-400 mb-8">
            Free whitepapers, guides, and tools
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources..."
              className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-800 rounded-lg focus:border-cyan-500 focus:outline-none text-white"
            />
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          {filteredResources.length > 0 ? (
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="px-3 py-1 bg-slate-800 rounded-full text-xs font-medium text-slate-400">
                      {resource.type}
                    </div>
                    <FileText className="w-5 h-5 text-cyan-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{resource.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {resource.time}
                    </div>
                    <div>{resource.views} views</div>
                  </div>
                  <button className="w-full px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500 border border-cyan-500/30 text-cyan-500 hover:text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>No resources match &ldquo;{searchQuery}&rdquo;</p>
              <button onClick={() => setSearchQuery('')} className="mt-3 text-sm text-cyan-400 hover:underline">
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border-2 border-cyan-500/30 p-12 rounded-2xl text-center">
            <Mail className="w-16 h-16 text-cyan-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4 text-white">Get Weekly Insights</h2>
            <p className="text-slate-400 mb-6">
              Subscribe for latest threat reports and best practices
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
