'use client';

import { UserPlus, Ticket, CalendarPlus } from 'lucide-react';

interface Props {
  sessionId: string | null;
  disabled: boolean;
  onEscalate: () => void;
  onCreateTicket: () => void;
  onBookHelp: () => void;
}

export default function SupportActionRail({ sessionId, disabled, onEscalate, onCreateTicket, onBookHelp }: Props) {
  const btnBase = 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition disabled:opacity-40 disabled:cursor-not-allowed';

  return (
    <div className="flex gap-2 px-4 py-2 border-t border-slate-800 bg-slate-900/50">
      <button
        onClick={onEscalate}
        disabled={disabled || !sessionId}
        className={`${btnBase} bg-amber-600/20 text-amber-400 hover:bg-amber-600/30`}
      >
        <UserPlus className="w-3.5 h-3.5" />
        Request Human
      </button>
      <button
        onClick={onCreateTicket}
        disabled={disabled || !sessionId}
        className={`${btnBase} bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600/30`}
      >
        <Ticket className="w-3.5 h-3.5" />
        Create Ticket
      </button>
      <button
        onClick={onBookHelp}
        disabled={disabled || !sessionId}
        className={`${btnBase} bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30`}
      >
        <CalendarPlus className="w-3.5 h-3.5" />
        Book Help
      </button>
    </div>
  );
}
