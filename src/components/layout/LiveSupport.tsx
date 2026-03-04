"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showLauncher, setShowLauncher] = useState(pathname !== '/');

  useEffect(() => {
    const updateLauncher = () => {
      if (pathname !== '/') {
        setShowLauncher(true);
        return;
      }
      setShowLauncher(window.scrollY > 520);
    };

    updateLauncher();
    window.addEventListener('scroll', updateLauncher, { passive: true });
    return () => window.removeEventListener('scroll', updateLauncher);
  }, [pathname]);

  return (
    <>
      {showLauncher ? (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 z-30 flex items-center gap-2 rounded-full bg-cyan-500 p-3 text-white shadow-2xl transition-all hover:scale-105 hover:bg-cyan-400 sm:right-6 sm:p-4"
        style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
        aria-label="Open live support panel"
      >
        <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
        <span className="hidden text-sm font-bold md:inline">Live Support</span>
      </button>
      ) : null}

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

          <div className="absolute bottom-0 right-0 top-0 flex w-full max-w-sm flex-col border-l border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-6">
              <div>
                <h2 className="text-xl font-bold text-white">Department Hub</h2>
                <p className="mt-1 text-xs text-slate-400">Direct enterprise support channels</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-6">
              {departments.map((dept, idx) => (
                <div key={idx} className="group rounded-xl border border-slate-800 bg-slate-950 p-4 transition-all hover:border-cyan-500/50">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="rounded-lg bg-cyan-500/10 p-2 text-cyan-400">
                      <dept.icon className="h-5 w-5" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">{dept.status}</span>
                    </div>
                  </div>
                  <h3 className="mb-1 font-bold text-white">{dept.name}</h3>
                  <a
                    href={`mailto:${dept.email}`}
                    className="flex items-center gap-2 break-all text-sm text-slate-400 transition-colors hover:text-cyan-300"
                  >
                    <Mail className="h-3 w-3 flex-shrink-0" />
                    {dept.email}
                  </a>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 bg-slate-950/50 p-6" style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}>
              <div className="text-center text-xs text-slate-500">Response SLA: Under 2 Minutes for Enterprise Tier</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
