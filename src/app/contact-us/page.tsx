"use client";

import { useState } from 'react';
import { Mail, Phone, Calendar, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-slate-950" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Get Started With
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Enterprise Security
            </span>
          </h1>
          <p className="text-lg text-slate-400">
            Schedule a personalized demo with our security experts
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-4 text-white">Thank You!</h3>
                    <p className="text-slate-400">We&apos;ll reach out within 24 hours</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Request Information</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <input type="text" placeholder="First Name" required className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-cyan-500 focus:outline-none text-white" />
                      <input type="text" placeholder="Last Name" required className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-cyan-500 focus:outline-none text-white" />
                    </div>
                    <input type="email" placeholder="Work Email" required className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-cyan-500 focus:outline-none text-white" />
                    <input type="text" placeholder="Company" required className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-cyan-500 focus:outline-none text-white" />
                    <select required className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-cyan-500 focus:outline-none text-white">
                      <option value="">Company Size</option>
                      <option>1-50</option>
                      <option>51-200</option>
                      <option>201-500</option>
                      <option>500+</option>
                    </select>
                    <textarea placeholder="Message" rows={4} required className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-cyan-500 focus:outline-none resize-none text-white" />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold text-lg transition-all shadow-lg text-white disabled:opacity-50"
                    >
                      {loading ? 'Sending...' : 'Submit Request'}
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="font-bold mb-4 text-white">Get In Touch</h3>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: 'Email', value: 'Support@gemcybersecurityassist.com' },
                    { icon: Phone, label: 'Phone', value: '(860) 305-4376' },
                    { icon: Calendar, label: 'Hours', value: '24/7 Monitoring Active' }
                  ].map((contact, i) => {
                    const Icon = contact.icon;
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <Icon className="w-5 h-5 text-cyan-500 mt-0.5" />
                        <div>
                          <div className="font-medium text-white">{contact.label}</div>
                          <div className="text-sm text-slate-400">{contact.value}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gradient-to-b from-cyan-500/10 to-slate-900 border border-cyan-500/30 rounded-xl p-6">
                <h3 className="font-bold mb-4 text-white">What to Expect</h3>
                <div className="space-y-3">
                  {['Response within 24 hours', 'Personalized assessment', 'Custom pricing', 'No obligation'].map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <CheckCircle className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                      <span className="text-sm text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
