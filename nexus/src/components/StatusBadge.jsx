import React from 'react';

const STATUS_STYLES = {
  // Deposits
  requested: 'bg-yellow-100 text-yellow-800',
  received: 'bg-blue-100 text-blue-800',
  complete: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  // KYC
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  // Cards
  active: 'bg-green-100 text-green-800',
  frozen: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-gray-100 text-gray-800',
  // Email
  queued: 'bg-yellow-100 text-yellow-800',
  sent: 'bg-green-100 text-green-800',
  // Webhook
  processed: 'bg-green-100 text-green-800',
  // Generic
  authorized: 'bg-blue-100 text-blue-800',
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || 'bg-gray-100 text-gray-800';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style}`}>
      {status}
    </span>
  );
}
