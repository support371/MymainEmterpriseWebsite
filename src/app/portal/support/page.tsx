import { getCurrentPortalSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import PortalSupportEntry from '@/components/support/PortalSupportEntry';

export const metadata = { title: 'Support' };

export default async function SupportPage() {
  const session = await getCurrentPortalSession();
  if (!session) redirect('/login');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Support Center</h1>
        <p className="text-sm text-slate-400">
          Get help from our enterprise AI concierge or connect with a human specialist.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <p className="text-2xl font-bold text-cyan-400">24/7</p>
            <p className="text-xs text-slate-400 mt-1">AI Concierge Available</p>
          </div>
          <div className="text-center p-4">
            <p className="text-2xl font-bold text-cyan-400">&lt; 2 min</p>
            <p className="text-xs text-slate-400 mt-1">Enterprise SLA</p>
          </div>
          <div className="text-center p-4">
            <p className="text-2xl font-bold text-cyan-400">Secure</p>
            <p className="text-xs text-slate-400 mt-1">End-to-End Encrypted</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-sm text-slate-400 space-y-2">
        <p>Use the <strong className="text-cyan-400">Talk to Concierge</strong> button in the bottom-right corner to start a support session.</p>
        <p>You can also escalate to a human agent, create support tickets, or book a consultation directly from the chat panel.</p>
      </div>

      <PortalSupportEntry />
    </div>
  );
}
