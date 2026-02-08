import React, { useState, useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import LedgerService from '../services/LedgerService';
import db from '../db/MockDatabase';
import StatusBadge from '../components/StatusBadge';

export default function ClientDashboard({ onNavigate }) {
  const { user, dbCtx } = useAuth();
  const [balances, setBalances] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user) return;
    setBalances(LedgerService.getPortfolioBalances(user.id));
    setNotifications(db.query('notifications', { user_id: user.id }, dbCtx).filter((n) => !n.read).slice(0, 5));
  }, [user, dbCtx]);

  const profile = user ? db.getById('profiles', user.id, dbCtx) : null;
  const kycStatus = profile?.kyc_status || 'pending';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* KYC Banner */}
      {kycStatus !== 'approved' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-yellow-600 font-medium">KYC Status:</span>
            <StatusBadge status={kycStatus} />
            <span className="text-sm text-yellow-700">
              {kycStatus === 'pending' && 'Your identity verification is pending. Some features may be limited.'}
              {kycStatus === 'rejected' && 'Your KYC was rejected. Please contact support.'}
            </span>
          </div>
        </div>
      )}

      {/* Portfolio Balances */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {balances.map((b) => (
          <div key={b.id} className="bg-white rounded-xl shadow-sm border p-5">
            <p className="text-sm text-gray-500 mb-1">{b.label}</p>
            <p className="text-2xl font-bold text-gray-900">
              {b.currency === 'BTC' ? `${b.balance.toFixed(8)} BTC` : `$${b.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
            </p>
            <p className="text-xs text-gray-400 mt-1">{b.type} account</p>
          </div>
        ))}
        {balances.length === 0 && (
          <div className="col-span-full text-gray-400 text-sm">No ledger accounts found.</div>
        )}
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h2>
      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        <button
          onClick={() => onNavigate('deposits')}
          className="bg-white border rounded-lg p-4 text-left hover:bg-orange-50 hover:border-orange-200 transition-colors"
        >
          <p className="font-medium text-gray-900">New Deposit</p>
          <p className="text-sm text-gray-500">Fund your account via bank transfer</p>
        </button>
        <button
          onClick={() => onNavigate('cards')}
          className="bg-white border rounded-lg p-4 text-left hover:bg-orange-50 hover:border-orange-200 transition-colors"
        >
          <p className="font-medium text-gray-900">Bitcoin Card</p>
          <p className="text-sm text-gray-500">Request or manage your spending card</p>
        </button>
        <button
          onClick={() => onNavigate('bank-accounts')}
          className="bg-white border rounded-lg p-4 text-left hover:bg-orange-50 hover:border-orange-200 transition-colors"
        >
          <p className="font-medium text-gray-900">Bank Details</p>
          <p className="text-sm text-gray-500">View deposit instructions</p>
        </button>
      </div>

      {/* Recent Notifications */}
      {notifications.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Recent Notifications</h2>
          <div className="bg-white rounded-xl shadow-sm border divide-y">
            {notifications.map((n) => (
              <div key={n.id} className="p-4">
                <p className="font-medium text-gray-900 text-sm">{n.title}</p>
                <p className="text-sm text-gray-500">{n.message}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
