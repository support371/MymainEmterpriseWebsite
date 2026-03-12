'use client';

import { FormEvent, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginFormInner() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const nextUrl = searchParams.get('next') || '/portal';

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const body = (await response.json()) as { message?: string };
        throw new Error(body.message || 'Invalid credentials');
      }

      router.push(nextUrl);
      router.refresh();
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : 'Authentication failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-5">
      <h1 className="text-2xl font-semibold">Portal Sign-in</h1>
      <p className="text-sm text-slate-400">Sign in to access the GEM Cyber Enterprise Portal.</p>

      <label className="block">
        <span className="text-sm text-slate-300">Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="you@example.com"
        />
      </label>

      <label className="block">
        <span className="text-sm text-slate-300">Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Password"
        />
      </label>

      {error && <p className="text-sm text-rose-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-md bg-cyan-600 hover:bg-cyan-500 disabled:opacity-60 transition font-medium"
      >
        {loading ? 'Signing in…' : 'Sign in'}
      </button>

      <div className="text-xs text-slate-500 border-t border-slate-800 pt-4 space-y-1">
        <p className="font-medium text-slate-400">Preview credentials:</p>
        <p>admin@gemcyber.com / admin</p>
        <p>analyst@gemcyber.com / analyst</p>
        <p>client@gemcyber.com / client</p>
        <p>viewer@gemcyber.com / viewer</p>
      </div>
    </form>
  );
}

export default function LoginForm() {
  return (
    <Suspense>
      <LoginFormInner />
    </Suspense>
  );
}
