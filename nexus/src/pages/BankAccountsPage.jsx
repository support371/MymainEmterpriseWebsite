import React, { useState, useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import db from '../db/MockDatabase';
import CopyButton from '../components/CopyButton';

export default function BankAccountsPage() {
  const { user, dbCtx } = useAuth();
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (!user) return;
    setAccounts(db.query('bank_accounts', { user_id: user.id }, dbCtx));
  }, [user, dbCtx]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Bank Accounts</h1>

      {accounts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border p-8 text-center text-gray-400">
          No bank accounts found.
        </div>
      ) : (
        <div className="space-y-6">
          {accounts.map((acct) => (
            <div key={acct.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="bg-gray-900 text-white px-6 py-4">
                <h2 className="text-lg font-semibold">{acct.bank_name}</h2>
                <p className="text-gray-400 text-sm">Status: {acct.status}</p>
              </div>

              <div className="p-6 space-y-4">
                <InfoRow label="Account Number" value={acct.account_number} copyable />
                <InfoRow label="Routing Number" value={acct.routing_number} copyable />
                <InfoRow label="Currency" value={acct.currency} />
                <InfoRow label="Payment Rail" value={acct.rail} />

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-orange-800 mb-1">Deposit Reference</p>
                  <div className="flex items-center gap-2">
                    <code className="text-lg font-mono font-bold text-orange-700">{acct.deposit_reference}</code>
                    <CopyButton text={acct.deposit_reference} />
                  </div>
                  <p className="text-xs text-orange-600 mt-2">
                    Include this reference in the memo/reference field of your bank transfer.
                    This ensures your deposit is matched to your account automatically.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-blue-800 mb-2">Deposit Instructions</p>
                  <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                    <li>Log in to your bank&apos;s online portal</li>
                    <li>Initiate an {acct.rail} transfer to the account number above</li>
                    <li>Enter the deposit reference in the memo/reference field</li>
                    <li>Submit the transfer — funds typically arrive within 1-2 business days</li>
                    <li>Once received, you can convert to Bitcoin from the Deposits page</li>
                  </ol>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value, copyable }) {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm text-gray-900">{value}</span>
        {copyable && <CopyButton text={value} />}
      </div>
    </div>
  );
}
