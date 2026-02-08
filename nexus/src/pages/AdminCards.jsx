import React, { useState, useEffect } from 'react';
import CardService from '../services/CardService';
import { useToast } from '../providers/ToastProvider';
import StatusBadge from '../components/StatusBadge';
import db from '../db/MockDatabase';

export default function AdminCards() {
  const toast = useToast();
  const [requests, setRequests] = useState([]);
  const [cards, setCards] = useState([]);
  const [merchant, setMerchant] = useState('Coffee Shop');
  const [txAmount, setTxAmount] = useState('50');

  const refresh = () => {
    setRequests(CardService.getAllCardRequests());
    setCards(CardService.getAllCards());
  };

  useEffect(refresh, []);

  const handleApprove = (requestId) => {
    try {
      CardService.approveAndIssueCard(requestId);
      toast.success('Card approved and issued');
      refresh();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSimulateTx = (cardId) => {
    try {
      const amt = parseFloat(txAmount) || 50;
      CardService.simulateCardTransaction(cardId, { amount: amt, merchant });
      toast.success(`Transaction simulated: $${amt} at ${merchant}`);
      refresh();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getClientName = (userId) => {
    const profile = db.getById('profiles', userId, { isAdmin: true });
    return profile?.full_name || profile?.email || userId;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin — Cards</h1>

      {/* Pending Requests */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Pending Card Requests</h2>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Client</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Type</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Date</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {requests.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-400">No card requests</td></tr>
              ) : (
                requests.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{getClientName(r.user_id)}</td>
                    <td className="px-4 py-3">{r.card_type}</td>
                    <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                    <td className="px-4 py-3 text-gray-500">{new Date(r.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      {r.status === 'requested' && (
                        <button
                          onClick={() => handleApprove(r.id)}
                          className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                        >
                          Approve & Issue
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issued Cards */}
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Issued Cards</h2>

      {/* Tx simulation config */}
      <div className="bg-gray-50 border rounded-lg p-4 mb-4 flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Merchant</label>
          <input
            type="text" value={merchant} onChange={(e) => setMerchant(e.target.value)}
            className="px-2 py-1 text-sm border rounded"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Amount (USD)</label>
          <input
            type="number" value={txAmount} onChange={(e) => setTxAmount(e.target.value)}
            className="px-2 py-1 text-sm border rounded w-24"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Client</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Card</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Type</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
              <th className="text-right px-4 py-3 font-medium text-gray-500">Spent Today</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {cards.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-6 text-center text-gray-400">No cards issued</td></tr>
            ) : (
              cards.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{getClientName(c.user_id)}</td>
                  <td className="px-4 py-3 font-mono">**** {c.card_number_last4}</td>
                  <td className="px-4 py-3">{c.card_type}</td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-3 text-right">${(c.spent_today || 0).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    {c.status === 'active' && (
                      <button
                        onClick={() => handleSimulateTx(c.id)}
                        className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
                      >
                        Simulate Tx
                      </button>
                    )}
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
