import React, { useState, useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useToast } from '../providers/ToastProvider';
import db from '../db/MockDatabase';
import StatusBadge from '../components/StatusBadge';

export default function SettingsPage() {
  const { user, dbCtx } = useAuth();
  const toast = useToast();
  const [profile, setProfile] = useState(null);
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    if (!user) return;
    const p = db.getById('profiles', user.id, dbCtx);
    setProfile(p);
    setFullName(p?.full_name || '');
  }, [user, dbCtx]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!fullName.trim()) { toast.error('Name cannot be empty'); return; }
    db.update('profiles', user.id, { full_name: fullName.trim() });
    toast.success('Profile updated');
    setProfile(db.getById('profiles', user.id, dbCtx));
  };

  if (!profile) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

      {/* Profile */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email" value={profile.email} disabled
              className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">KYC Status:</label>
            <StatusBadge status={profile.kyc_status} />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* Activity Log */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="font-semibold text-gray-900">Activity Log</h2>
        </div>
        <ActivityList userId={user.id} dbCtx={dbCtx} />
      </div>
    </div>
  );
}

function ActivityList({ userId, dbCtx }) {
  const activities = db.query('activity_log', { user_id: userId }, dbCtx);

  if (activities.length === 0) {
    return <div className="p-6 text-center text-gray-400 text-sm">No activity yet.</div>;
  }

  return (
    <div className="divide-y max-h-96 overflow-y-auto">
      {activities.slice().reverse().map((a) => (
        <div key={a.id} className="px-6 py-3 flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-gray-900">{a.action}</span>
            <p className="text-xs text-gray-500">{a.description}</p>
          </div>
          <span className="text-xs text-gray-400">{new Date(a.created_at).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}
