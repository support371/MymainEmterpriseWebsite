import React, { useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useToast } from '../providers/ToastProvider';

export default function SignUpPage({ onNavigate }) {
  const { signUp, loading } = useAuth();
  const toast = useToast();
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    try {
      await signUp({ email: form.email, fullName: form.fullName, password: form.password });
      toast.success('Account created! Welcome to Nexus.');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-500 mt-2">Join Nexus Bitcoin Banking</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text" required value={form.fullName} onChange={set('fullName')}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              placeholder="John Doe"
            />
          </div>
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
              placeholder="Min 6 characters"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password" required value={form.confirmPassword} onChange={set('confirmPassword')}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <button type="button" onClick={() => onNavigate('signin')} className="text-orange-600 hover:underline font-medium">
              Sign In
            </button>
          </p>

          <p className="text-center text-xs text-gray-400">
            Use email ending in @nexus-admin.com for admin access
          </p>
        </form>
      </div>
    </div>
  );
}
