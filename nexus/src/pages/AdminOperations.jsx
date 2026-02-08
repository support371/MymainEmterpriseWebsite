import React, { useState, useEffect } from 'react';
import AdminService from '../services/AdminService';
import EmailWorkerService from '../services/EmailWorkerService';
import { useToast } from '../providers/ToastProvider';
import StatusBadge from '../components/StatusBadge';

export default function AdminOperations() {
  const toast = useToast();
  const [opsLog, setOpsLog] = useState([]);
  const [emailOutbox, setEmailOutbox] = useState([]);

  const refresh = () => {
    setOpsLog(AdminService.getOperationsLog());
    setEmailOutbox(EmailWorkerService.getOutbox());
  };

  useEffect(refresh, []);

  const handleRunEmailWorker = () => {
    try {
      const result = EmailWorkerService.processQueue();
      toast.success(`Email worker processed ${result.processed} emails`);
      refresh();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin — Operations</h1>

      {/* Email Outbox */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Email Outbox</h2>
          <button
            onClick={handleRunEmailWorker}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Run Email Worker
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-500">To</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Subject</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Created</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Sent</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {emailOutbox.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-400">No emails</td></tr>
              ) : (
                emailOutbox.map((e) => (
                  <tr key={e.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{e.to}</td>
                    <td className="px-4 py-3">{e.subject}</td>
                    <td className="px-4 py-3"><StatusBadge status={e.status} /></td>
                    <td className="px-4 py-3 text-gray-500">{new Date(e.created_at).toLocaleString()}</td>
                    <td className="px-4 py-3 text-gray-500">{e.sent_at ? new Date(e.sent_at).toLocaleString() : '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Operations Log */}
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Operations Log</h2>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Type</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Action</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Reference</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Details</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {opsLog.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-400">No operations logged</td></tr>
            ) : (
              opsLog.slice().reverse().map((op) => (
                <tr key={op.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{op.type}</span>
                  </td>
                  <td className="px-4 py-3">{op.action}</td>
                  <td className="px-4 py-3 font-mono text-xs">{op.reference}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs max-w-xs truncate">{op.details}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{new Date(op.created_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
