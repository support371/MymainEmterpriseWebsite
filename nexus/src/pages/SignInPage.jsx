import React, { useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useToast } from '../providers/ToastProvider';

export default function SignInPage({ onNavigate }) {
  const { signIn, loading } = useAuth();
  const toast = useToast();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn({ email: form.email, password: form.password });
      toast.success('Signed in successfully');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
          <p className="text-gray-500 mt-2">Welcome back to Nexus</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email" required value={form.email} onChange={set('email')}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password" required value={form.password} onChange={set('password')}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <button type="button" onClick={() => onNavigate('signup')} className="text-orange-600 hover:underline font-medium">
              Create Account
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
