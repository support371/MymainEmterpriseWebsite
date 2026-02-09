import React, { useState, useEffect } from 'react';
import AdminService from '../services/AdminService';
import StatusBadge from '../components/StatusBadge';

export default function AdminClients({ onNavigate }) {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setClients(AdminService.getClients());
  }, []);

  const filtered = clients.filter((c) => {
    const q = search.toLowerCase();
    return !q || c.full_name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Clients</h1>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full max-w-md px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Name</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Email</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">KYC</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Joined</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No clients found</td></tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{c.full_name}</td>
                  <td className="px-4 py-3 text-gray-600">{c.email}</td>
                  <td className="px-4 py-3"><StatusBadge status={c.kyc_status} /></td>
                  <td className="px-4 py-3"><StatusBadge status={c.status || 'active'} /></td>
                  <td className="px-4 py-3 text-gray-500">{new Date(c.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onNavigate('admin-client-detail', { clientId: c.id })}
                      className="text-orange-600 hover:underline text-xs font-medium"
                    >
                      View Detail
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
