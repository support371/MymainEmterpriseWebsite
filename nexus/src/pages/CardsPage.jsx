import React, { useState, useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useToast } from '../providers/ToastProvider';
import CardService from '../services/CardService';
import db from '../db/MockDatabase';
import StatusBadge from '../components/StatusBadge';

export default function CardsPage() {
  const { user, dbCtx } = useAuth();
  const toast = useToast();
  const [cards, setCards] = useState([]);
  const [requests, setRequests] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [eligibility, setEligibility] = useState(null);

  const refresh = () => {
    if (!user) return;
    setCards(CardService.getUserCards(user.id));
    setRequests(CardService.getUserCardRequests(user.id));
    setEligibility(CardService.checkEligibility(user.id));
    const txs = db.query('card_transactions', { user_id: user.id }, dbCtx);
    setTransactions(txs);
  };

  useEffect(refresh, [user, dbCtx]);

  const handleRequest = () => {
    try {
      CardService.requestCard(user.id);
      toast.success('Card request submitted');
      refresh();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Bitcoin Cards</h1>

      {/* Active Cards */}
      {cards.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Cards</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {cards.map((card) => (
              <div key={card.id} className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white">
                <div className="flex justify-between items-start mb-8">
                  <span className="text-orange-400 font-bold text-lg">NEXUS</span>
                  <StatusBadge status={card.status} />
                </div>
                <p className="font-mono text-xl tracking-widest mb-4">
                  **** **** **** {card.card_number_last4}
                </p>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{card.card_type}</span>
                  <span>Limit: ${card.spending_limit?.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Request Card */}
      {cards.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Request a Bitcoin Card</h2>
          {eligibility && !eligibility.eligible ? (
            <div>
              <p className="text-sm text-gray-500 mb-3">{eligibility.reason}</p>
              {requests.filter((r) => r.status === 'requested').length > 0 && (
                <p className="text-sm text-orange-600">Your card request is pending admin approval.</p>
              )}
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-500 mb-4">
                Get a Bitcoin-backed spending card. Spend anywhere, powered by your BTC balance.
              </p>
              <button
                onClick={handleRequest}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
              >
                Request Card
              </button>
            </div>
          )}
        </div>
      )}

      {/* Pending Requests */}
      {requests.filter((r) => r.status === 'requested').length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-yellow-800 font-medium">
            You have a pending card request. An admin will review it shortly.
          </p>
        </div>
      )}

      {/* Transactions */}
      {transactions.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="font-semibold text-gray-900">Recent Transactions</h2>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-2 text-gray-500 font-medium">Merchant</th>
                <th className="text-right px-4 py-2 text-gray-500 font-medium">Amount</th>
                <th className="text-right px-4 py-2 text-gray-500 font-medium">BTC</th>
                <th className="text-left px-4 py-2 text-gray-500 font-medium">Status</th>
                <th className="text-left px-4 py-2 text-gray-500 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="px-4 py-2">{tx.merchant}</td>
                  <td className="px-4 py-2 text-right">${tx.amount}</td>
                  <td className="px-4 py-2 text-right font-mono text-xs">{tx.btc_amount?.toFixed(8)}</td>
                  <td className="px-4 py-2"><StatusBadge status={tx.status} /></td>
                  <td className="px-4 py-2 text-gray-500">{new Date(tx.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
