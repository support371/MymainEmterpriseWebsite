'use client';

import { useState } from 'react';

interface ServiceRequest {
  id: string;
  subject: string;
  category: string;
  status: string;
  created: string;
  priority: string;
}

const initialRequests: ServiceRequest[] = [
  { id: 'REQ-001', subject: 'Security audit for new acquisition', category: 'Cybersecurity', status: 'Open', created: '2026-03-10', priority: 'High' },
  { id: 'REQ-002', subject: 'Compliance report for Q1 filing', category: 'Compliance', status: 'In Progress', created: '2026-03-08', priority: 'Medium' },
  { id: 'REQ-003', subject: 'VPN access for remote team', category: 'IT Services', status: 'Completed', created: '2026-03-05', priority: 'Low' },
  { id: 'REQ-004', subject: 'Property title verification', category: 'Real Estate', status: 'Open', created: '2026-03-09', priority: 'Medium' },
];

export default function RequestsPage() {
  const [requests] = useState<ServiceRequest[]>(initialRequests);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Service Requests</h1>
          <p className="text-sm text-slate-400">Submit and track service requests</p>
        </div>
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-md text-sm font-medium transition">
          New Request
        </button>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-slate-300">ID</th>
              <th className="text-left px-4 py-3 font-medium text-slate-300">Subject</th>
              <th className="text-left px-4 py-3 font-medium text-slate-300">Category</th>
              <th className="text-left px-4 py-3 font-medium text-slate-300">Priority</th>
              <th className="text-left px-4 py-3 font-medium text-slate-300">Status</th>
              <th className="text-left px-4 py-3 font-medium text-slate-300">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-slate-800/30">
                <td className="px-4 py-3 font-mono text-xs">{req.id}</td>
                <td className="px-4 py-3">{req.subject}</td>
                <td className="px-4 py-3 text-slate-400">{req.category}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    req.priority === 'High' ? 'bg-rose-600/20 text-rose-400' :
                    req.priority === 'Medium' ? 'bg-amber-600/20 text-amber-400' :
                    'bg-slate-600/20 text-slate-400'
                  }`}>{req.priority}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`${
                    req.status === 'Open' ? 'text-cyan-400' :
                    req.status === 'In Progress' ? 'text-amber-400' :
                    'text-emerald-400'
                  }`}>{req.status}</span>
                </td>
                <td className="px-4 py-3 text-slate-400">{req.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
