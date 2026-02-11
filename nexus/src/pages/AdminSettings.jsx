import React, { useState, useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useToast } from '../providers/ToastProvider';
import db from '../db/MockDatabase';

export default function AdminSettings() {
  const { user, dbCtx } = useAuth();
  const toast = useToast();
  const [profile, setProfile] = useState(null);
  const [tableStats, setTableStats] = useState({});

  useEffect(() => {
    if (!user) return;
    setProfile(db.getById('profiles', user.id, dbCtx));

    // Collect table stats
    const stats = {};
    const tables = [
      'profiles', 'roles', 'bank_accounts', 'ledger_accounts',
      'deposits', 'ledger_entries', 'bitcoin_cards', 'card_requests',
      'card_transactions', 'webhook_events', 'operations_log',
      'email_outbox', 'notifications', 'activity_log',
    ];
    for (const t of tables) {
      stats[t] = db.count(t);
    }
    setTableStats(stats);
  }, [user, dbCtx]);

  const handleReset = () => {
    if (!window.confirm('This will erase ALL data and sign you out. Continue?')) return;
    db.reset();
    toast.info('Database reset. Reloading...');
    setTimeout(() => window.location.reload(), 1000);
  };

  if (!profile) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Settings</h1>

      {/* Admin Profile */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Admin Profile</h2>
        <div className="space-y-2">
          <Row label="Name" value={profile.full_name} />
          <Row label="Email" value={profile.email} />
          <Row label="Role" value="admin" />
          <Row label="ID" value={profile.id} />
        </div>
      </div>

      {/* Database Stats */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Database Stats</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Object.entries(tableStats).map(([table, count]) => (
            <div key={table} className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">{table}</p>
              <p className="text-lg font-bold text-gray-900">{count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-red-800 mb-2">Danger Zone</h2>
        <p className="text-sm text-red-600 mb-4">
          Reset the entire in-memory database. All users, deposits, cards, and ledger entries will be erased.
        </p>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Reset Database
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}
