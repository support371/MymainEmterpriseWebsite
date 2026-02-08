import React, { useState, useEffect } from 'react';
import AdminService from '../services/AdminService';
import StatusBadge from '../components/StatusBadge';

export default function AdminWebhooks() {
  const [events, setEvents] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    setEvents(AdminService.getWebhookEvents());
  }, []);

  const toggle = (id) => setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin — Webhooks</h1>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Idempotency Key</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Type</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Date</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Payload</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {events.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">No webhook events</td></tr>
            ) : (
              events.map((e) => (
                <React.Fragment key={e.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs">{e.idempotency_key}</td>
                    <td className="px-4 py-3">{e.type}</td>
                    <td className="px-4 py-3"><StatusBadge status={e.status} /></td>
                    <td className="px-4 py-3 text-gray-500">{new Date(e.created_at).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggle(e.id)}
                        className="text-xs text-orange-600 hover:underline font-medium"
                      >
                        {expandedId === e.id ? 'Hide' : 'View'}
                      </button>
                    </td>
                  </tr>
                  {expandedId === e.id && (
                    <tr>
                      <td colSpan={5} className="px-4 py-3 bg-gray-50">
                        <pre className="text-xs font-mono bg-gray-900 text-green-300 p-4 rounded-lg overflow-x-auto">
                          {formatJson(e.payload)}
                        </pre>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatJson(str) {
  try {
    return JSON.stringify(JSON.parse(str), null, 2);
  } catch {
    return str || '(empty)';
  }
}
