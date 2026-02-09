import React, { useState, useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import db from '../db/MockDatabase';
import StatusBadge from '../components/StatusBadge';
import CopyButton from '../components/CopyButton';

export default function DepositDetailPage({ depositId, onNavigate }) {
  const { user, dbCtx } = useAuth();
  const [deposit, setDeposit] = useState(null);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (!depositId || !user) return;
    const d = db.getById('deposits', depositId, dbCtx);
    setDeposit(d);
    if (d) {
      const all = db.query('ledger_entries', { reference: d.deposit_reference }, { isAdmin: true });
      setEntries(all.filter((e) => e.user_id === user.id));
    }
  }, [depositId, user, dbCtx]);

  if (!deposit) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-gray-400">Deposit not found.</p>
        <button onClick={() => onNavigate('deposits')} className="mt-4 text-orange-600 hover:underline text-sm">
          Back to Deposits
        </button>
      </div>
    );
  }

  const receipt = deposit.receipt_json ? JSON.parse(deposit.receipt_json) : null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button onClick={() => onNavigate('deposits')} className="text-orange-600 hover:underline text-sm mb-4 block">
        &larr; Back to Deposits
      </button>

      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">Deposit Detail</h1>
          <StatusBadge status={deposit.status} />
        </div>

        <div className="space-y-3">
          <Row label="Reference" value={deposit.deposit_reference} copyable />
          <Row label="Amount" value={`$${deposit.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`} />
          <Row label="Currency" value={deposit.currency} />
          <Row label="Created" value={new Date(deposit.created_at).toLocaleString()} />
          {deposit.updated_at && (
            <Row label="Last Updated" value={new Date(deposit.updated_at).toLocaleString()} />
          )}
        </div>
      </div>

      {/* Receipt */}
      {receipt && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-green-800 mb-3">Settlement Receipt</h2>
          <div className="space-y-2 text-sm">
            <Row label="Fiat Amount" value={`${receipt.fiat_currency} ${receipt.fiat_amount}`} />
            <Row label="BTC Received" value={`${receipt.btc_amount.toFixed(8)} BTC`} />
            <Row label="Exchange Rate" value={`$${receipt.btc_rate.toLocaleString()} / BTC`} />
            <Row label="Settled At" value={new Date(receipt.settled_at).toLocaleString()} />
          </div>
        </div>
      )}

      {/* Ledger Entries */}
      {entries.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="font-semibold text-gray-900">Ledger Entries</h2>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-2 text-gray-500 font-medium">Type</th>
                <th className="text-right px-4 py-2 text-gray-500 font-medium">Credit</th>
                <th className="text-right px-4 py-2 text-gray-500 font-medium">Debit</th>
                <th className="text-left px-4 py-2 text-gray-500 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {entries.map((e) => (
                <tr key={e.id}>
                  <td className="px-4 py-2">{e.type}</td>
                  <td className="px-4 py-2 text-right text-green-600">
                    {e.credit ? `+${e.credit.toFixed(e.currency === 'BTC' ? 8 : 2)} ${e.currency}` : '—'}
                  </td>
                  <td className="px-4 py-2 text-right text-red-600">
                    {e.debit ? `-${e.debit.toFixed(e.currency === 'BTC' ? 8 : 2)} ${e.currency}` : '—'}
                  </td>
                  <td className="px-4 py-2 text-gray-500 text-xs">{e.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, copyable }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-sm text-gray-500">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-900">{value}</span>
        {copyable && <CopyButton text={value} />}
      </div>
    </div>
  );
}
