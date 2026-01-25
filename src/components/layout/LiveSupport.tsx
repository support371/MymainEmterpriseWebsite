"use client";

import { useState } from 'react';
import { MessageSquare, X, Mail, Shield, Building2, CreditCard, Activity } from 'lucide-react';

const departments = [
  {
    name: 'Cyber Intelligence',
    email: 'Analyzer@gemcybersecurityassist.com',
    icon: Activity,
    status: 'Monitoring'
  },
  {
    name: 'Security Department',
    email: 'Support@gemcybersecurityassist.com',
    icon: Shield,
    status: 'Ready'
  },
  {
    name: 'Financial Services',
    email: 'Billing@gemcybersecurityassist.com',
    icon: CreditCard,
    status: 'Online'
  },
  {
    name: 'Trust Real Estate',
    email: 'Portfolio@gemcybersecurityassist.com',
    icon: Building2,
    status: 'Active'
  }
];

export default function LiveSupport() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center gap-2 group"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold">
          Live Support
        </span>
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div>
                <h2 className="text-xl font-bold text-white">Department Hub</h2>
                <p className="text-xs text-slate-400 mt-1">Direct enterprise support channels</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Department List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {departments.map((dept, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 hover:border-blue-500/50 transition-all group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                      <dept.icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{dept.status}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-white mb-1">{dept.name}</h3>
                  <a
                    href={`mailto:${dept.email}`}
                    className="text-sm text-slate-400 hover:text-blue-400 flex items-center gap-2 transition-colors break-all"
                  >
                    <Mail className="w-3 h-3 flex-shrink-0" />
                    {dept.email}
                  </a>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-800 bg-slate-950/50">
              <div className="text-xs text-slate-500 text-center">
                Response SLA: Under 2 Minutes for Enterprise Tier
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
