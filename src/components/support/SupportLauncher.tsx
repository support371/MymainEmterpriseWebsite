'use client';

import { useState } from 'react';
import { Headset } from 'lucide-react';
import SupportSessionShell from './SupportSessionShell';

export default function SupportLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-cyan-600 hover:bg-cyan-700 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center gap-2 group"
      >
        <Headset className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap">
          Talk to Concierge
        </span>
      </button>

      {open && <SupportSessionShell onClose={() => setOpen(false)} />}
    </>
  );
}
