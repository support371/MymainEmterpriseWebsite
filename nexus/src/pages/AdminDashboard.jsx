import React, { useState, useEffect } from 'react';
import AdminService from '../services/AdminService';

export default function AdminDashboard({ onNavigate }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setStats(AdminService.getDashboardStats());
  }, []);

  if (!stats) return null;

  const kpis = [
    { label: 'Total Clients', value: stats.totalClients, page: 'admin-clients', color: 'bg-blue-50 text-blue-700' },
    { label: 'Pending KYC', value: stats.pendingKyc, page: 'admin-clients', color: 'bg-yellow-50 text-yellow-700' },
    { label: 'Total Deposits', value: stats.totalDeposits, page: 'admin-deposits', color: 'bg-purple-50 text-purple-700' },
    { label: 'Awaiting Inbound', value: stats.requestedDeposits, page: 'admin-deposits', color: 'bg-orange-50 text-orange-700' },
    { label: 'Awaiting Settlement', value: stats.receivedDeposits, page: 'admin-deposits', color: 'bg-indigo-50 text-indigo-700' },
    { label: 'Completed Deposits', value: stats.completedDeposits, page: 'admin-deposits', color: 'bg-green-50 text-green-700' },
    { label: 'Active Cards', value: stats.totalCards, page: 'admin-cards', color: 'bg-teal-50 text-teal-700' },
    { label: 'Pending Card Requests', value: stats.pendingCardRequests, page: 'admin-cards', color: 'bg-pink-50 text-pink-700' },
    { label: 'Webhook Events', value: stats.webhookEvents, page: 'admin-webhooks', color: 'bg-gray-100 text-gray-700' },
    { label: 'Operations Logged', value: stats.operationsCount, page: 'admin-operations', color: 'bg-gray-100 text-gray-700' },
    { label: 'Queued Emails', value: stats.queuedEmails, page: 'admin-operations', color: 'bg-red-50 text-red-700' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi) => (
          <button
            key={kpi.label}
            onClick={() => onNavigate(kpi.page)}
            className={`${kpi.color} rounded-xl p-5 text-left hover:ring-2 hover:ring-offset-1 hover:ring-orange-300 transition-all`}
          >
            <p className="text-3xl font-bold">{kpi.value}</p>
            <p className="text-sm font-medium mt-1 opacity-80">{kpi.label}</p>
          </button>
        ))}
      </div>

      {/* Quick Ops */}
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Operations</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <QuickLink label="Manage Deposits" desc="Simulate & settle" page="admin-deposits" onNavigate={onNavigate} />
        <QuickLink label="Card Requests" desc="Approve & issue" page="admin-cards" onNavigate={onNavigate} />
        <QuickLink label="Client KYC" desc="Review & approve" page="admin-clients" onNavigate={onNavigate} />
        <QuickLink label="Email Queue" desc="Run email worker" page="admin-operations" onNavigate={onNavigate} />
      </div>
    </div>
  );
}

function QuickLink({ label, desc, page, onNavigate }) {
  return (
    <button
      onClick={() => onNavigate(page)}
      className="bg-white border rounded-lg p-4 text-left hover:bg-orange-50 hover:border-orange-200 transition-colors"
    >
      <p className="font-medium text-gray-900">{label}</p>
      <p className="text-sm text-gray-500">{desc}</p>
    </button>
  );
}
