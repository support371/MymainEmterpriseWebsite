'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const DENIED_MESSAGE = 'Access denied. You do not have permission for that page.';

export default function Toast() {
  const searchParams = useSearchParams();
  const deniedMessage = useMemo(
    () => (searchParams.get('denied') === '1' ? DENIED_MESSAGE : null),
    [searchParams]
  );
  const [dismissed, setDismissed] = useState(false);

  const message = dismissed ? null : deniedMessage;

  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-rose-600/90 text-white px-4 py-3 rounded-lg shadow-lg max-w-sm">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm">{message}</p>
        <button onClick={() => setDismissed(true)} className="text-white/70 hover:text-white text-lg">
          ×
        </button>
      </div>
    </div>
  );
}
