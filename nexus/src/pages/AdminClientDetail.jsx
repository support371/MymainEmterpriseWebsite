import React, { useState, useEffect } from 'react';
import AdminService from '../services/AdminService';
import { useToast } from '../providers/ToastProvider';
import StatusBadge from '../components/StatusBadge';

export default function AdminClientDetail({ clientId, onNavigate }) {
  const toast = useToast();
  const [detail, setDetail] = useState(null);

  const refresh = () => {
    if (clientId) setDetail(AdminService.getClientDetail(clientId));
  };

  useEffect(refresh, [clientId]);

  const handleKyc = (status) => {
    try {
      AdminService.updateKycStatus(clientId, status);
      toast.success(`KYC status set to ${status}`);
      refresh();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!detail) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-gray-400">Client not found.</p>
        <button onClick={() => onNavigate('admin-clients')} className="mt-4 text-orange-600 hover:underline text-sm">
          Back to Clients
        </button>
      </div>
    );
  }

  const { profile, bankAccounts, balances, deposits, cards, cardRequests, ledgerEntries, activity, notifications } = detail;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button onClick={() => onNavigate('admin-clients')} className="text-orange-600 hover:underline text-sm mb-4 block">
        &larr; Back to Clients
      </button>

      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{profile.full_name}</h1>
            <p className="text-gray-500">{profile.email}</p>
          </div>
          <StatusBadge status={profile.kyc_status} />
        </div>

        {/* KYC Actions */}
        <div className="flex gap-2">
          <span className="text-sm text-gray-500 self-center mr-2">KYC:</span>
          {['approved', 'pending', 'rejected'].map((s) => (
            <button
              key={s}
              onClick={() => handleKyc(s)}
              disabled={profile.kyc_status === s}
              className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                profile.kyc_status === s
                  ? 'bg-gray-200 text-gray-500 cursor-default'
                  : 'bg-gray-100 hover:bg-orange-100 text-gray-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Balances */}
        <Section title="Portfolio Balances">
          {balances.length === 0 ? <Empty /> : (
            <div className="space-y-2">
              {balances.map((b) => (
                <div key={b.id} className="flex justify-between py-2 border-b last:border-0">
                  <span className="text-sm text-gray-600">{b.label}</span>
                  <span className="font-mono text-sm font-medium">
                    {b.currency === 'BTC' ? `${b.balance.toFixed(8)} BTC` : `$${b.balance.toFixed(2)}`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Bank Accounts */}
        <Section title="Bank Accounts">
          {bankAccounts.length === 0 ? <Empty /> : (
            <div className="space-y-2">
              {bankAccounts.map((a) => (
                <div key={a.id} className="text-sm">
                  <p className="font-medium">{a.bank_name}</p>
                  <p className="text-gray-500 font-mono">{a.account_number} | Ref: {a.deposit_reference}</p>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Deposits */}
        <Section title={`Deposits (${deposits.length})`}>
          {deposits.length === 0 ? <Empty /> : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {deposits.map((d) => (
                <div key={d.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <span className="text-xs font-mono text-gray-500">{d.deposit_reference}</span>
                    <p className="text-sm font-medium">${d.amount.toLocaleString()}</p>
                  </div>
                  <StatusBadge status={d.status} />
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Cards */}
        <Section title={`Cards (${cards.length})`}>
          {cards.length === 0 && cardRequests.length === 0 ? <Empty /> : (
            <div className="space-y-2">
              {cards.map((c) => (
                <div key={c.id} className="flex items-center justify-between py-2 border-b">
                  <span className="font-mono text-sm">**** {c.card_number_last4}</span>
                  <StatusBadge status={c.status} />
                </div>
              ))}
              {cardRequests.filter((r) => r.status === 'requested').map((r) => (
                <div key={r.id} className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-500">Pending request</span>
                  <StatusBadge status={r.status} />
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Ledger Entries */}
        <Section title={`Ledger Entries (${ledgerEntries.length})`}>
          {ledgerEntries.length === 0 ? <Empty /> : (
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {ledgerEntries.map((e) => (
                <div key={e.id} className="flex items-center justify-between py-1 text-xs border-b last:border-0">
                  <span className="text-gray-600">{e.type}: {e.description}</span>
                  <span className={e.credit ? 'text-green-600' : 'text-red-600'}>
                    {e.credit ? `+${e.credit}` : `-${e.debit}`} {e.currency}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Activity */}
        <Section title={`Activity (${activity.length})`}>
          {activity.length === 0 ? <Empty /> : (
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {activity.slice().reverse().map((a) => (
                <div key={a.id} className="py-1 text-xs border-b last:border-0">
                  <span className="font-medium text-gray-700">{a.action}</span>
                  <span className="text-gray-400 ml-2">{a.description}</span>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Notifications */}
        <Section title={`Notifications (${notifications.length})`}>
          {notifications.length === 0 ? <Empty /> : (
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {notifications.slice().reverse().map((n) => (
                <div key={n.id} className="py-1 text-xs border-b last:border-0">
                  <span className="font-medium text-gray-700">{n.title}</span>
                  <p className="text-gray-500">{n.message}</p>
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5">
      <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Empty() {
  return <p className="text-sm text-gray-400">None</p>;
}
