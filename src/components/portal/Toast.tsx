'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Toast() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get('denied') === '1') {
      setMessage('Access denied. You do not have permission for that page.');
    }
  }, [searchParams]);

  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-rose-600/90 text-white px-4 py-3 rounded-lg shadow-lg max-w-sm">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm">{message}</p>
        <button onClick={() => setMessage(null)} className="text-white/70 hover:text-white text-lg">
          ×
        </button>
      </div>
    </div>
  );
}
