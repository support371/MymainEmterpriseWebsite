import React, { useState, useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useToast } from '../providers/ToastProvider';
import DepositService from '../services/DepositService';
import StatusBadge from '../components/StatusBadge';
import CopyButton from '../components/CopyButton';

export default function DepositsPage({ onNavigate }) {
  const { user } = useAuth();
  const toast = useToast();
  const [deposits, setDeposits] = useState([]);
  const [amount, setAmount] = useState('');
  const [creating, setCreating] = useState(false);

  const refresh = () => {
    if (user) setDeposits(DepositService.getUserDeposits(user.id));
  };

  useEffect(refresh, [user]);

  const handleCreate = async (e) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0) { toast.error('Enter a valid amount'); return; }
    setCreating(true);
    try {
      DepositService.createDeposit({ userId: user.id, amount: val });
      toast.success('Deposit request created');
      setAmount('');
      refresh();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Deposits</h1>

      {/* New deposit form */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">New Deposit</h2>
        <form onSubmit={handleCreate} className="flex items-end gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (USD)</label>
            <input
              type="number" min="1" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              placeholder="1000.00"
            />
          </div>
          <button
            type="submit" disabled={creating}
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-medium rounded-lg transition-colors"
          >
            {creating ? 'Creating...' : 'Create Deposit'}
          </button>
        </form>
      </div>

      {/* Deposits list */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Reference</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Amount</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Date</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {deposits.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">No deposits yet</td></tr>
            ) : (
              deposits.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs">
                    <div className="flex items-center gap-1">
                      {d.deposit_reference}
                      <CopyButton text={d.deposit_reference} label="Copy" />
                    </div>
                  </td>
                  <td className="px-4 py-3">${d.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                  <td className="px-4 py-3 text-gray-500">{new Date(d.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onNavigate('deposit-detail', { depositId: d.id })}
                      className="text-orange-600 hover:underline text-xs font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
