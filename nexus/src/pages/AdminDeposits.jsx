import React, { useState, useEffect } from 'react';
import DepositService from '../services/DepositService';
import { useToast } from '../providers/ToastProvider';
import StatusBadge from '../components/StatusBadge';
import db from '../db/MockDatabase';

export default function AdminDeposits() {
  const toast = useToast();
  const [deposits, setDeposits] = useState([]);

  const refresh = () => setDeposits(DepositService.getAllDeposits());
  useEffect(refresh, []);

  const handleSimulate = (id) => {
    try {
      DepositService.simulateInboundPayment(id);
      toast.success('Inbound payment simulated');
      refresh();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSettle = (id) => {
    try {
      DepositService.settleDeposit(id);
      toast.success('Deposit settled');
      refresh();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Get client name for display
  const getClientName = (userId) => {
    const profile = db.getById('profiles', userId, { isAdmin: true });
    return profile?.full_name || profile?.email || userId;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin — Deposits</h1>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Reference</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Client</th>
              <th className="text-right px-4 py-3 font-medium text-gray-500">Amount</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Date</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {deposits.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No deposits</td></tr>
            ) : (
              deposits.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs">{d.deposit_reference}</td>
                  <td className="px-4 py-3 text-gray-600">{getClientName(d.user_id)}</td>
                  <td className="px-4 py-3 text-right font-medium">${d.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                  <td className="px-4 py-3 text-gray-500">{new Date(d.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {d.status === 'requested' && (
                        <button
                          onClick={() => handleSimulate(d.id)}
                          className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                        >
                          Simulate Inbound
                        </button>
                      )}
                      {d.status === 'received' && (
                        <button
                          onClick={() => handleSettle(d.id)}
                          className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                        >
                          Settle
                        </button>
                      )}
                      {d.status === 'complete' && (
                        <span className="text-xs text-gray-400">Done</span>
                      )}
                    </div>
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
