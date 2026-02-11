import React from 'react';
import { useAuth } from '../providers/AuthProvider';

const CLIENT_NAV = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'bank-accounts', label: 'Bank Accounts' },
  { key: 'deposits', label: 'Deposits' },
  { key: 'cards', label: 'Cards' },
  { key: 'settings', label: 'Settings' },
];

const ADMIN_NAV = [
  { key: 'admin-dashboard', label: 'Dashboard' },
  { key: 'admin-clients', label: 'Clients' },
  { key: 'admin-deposits', label: 'Deposits' },
  { key: 'admin-cards', label: 'Cards' },
  { key: 'admin-webhooks', label: 'Webhooks' },
  { key: 'admin-operations', label: 'Operations' },
  { key: 'admin-settings', label: 'Settings' },
];

export default function Navigation({ currentPage, onNavigate }) {
  const { user, isAdmin, signOut } = useAuth();

  const navItems = isAdmin ? ADMIN_NAV : CLIENT_NAV;

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate(isAdmin ? 'admin-dashboard' : 'dashboard')}
              className="text-xl font-bold text-orange-400 hover:text-orange-300 transition-colors"
            >
              NEXUS
            </button>
            {isAdmin && (
              <span className="text-xs bg-red-600 px-2 py-0.5 rounded-full font-medium">
                ADMIN
              </span>
            )}
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === item.key
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* User info + sign out */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 hidden sm:block">
              {user?.full_name || user?.email}
            </span>
            <button
              onClick={signOut}
              className="text-sm px-3 py-1.5 rounded bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden pb-3 flex flex-wrap gap-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`px-2 py-1 rounded text-xs font-medium ${
                currentPage === item.key
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-400 hover:bg-gray-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
