import Link from 'next/link';
import type { ReactNode } from 'react';

const navItems = [
  { href: '/admin/inbox', label: 'Inbox' },
  { href: '/admin/teams', label: 'Teams' },
  { href: '/admin/organizations', label: 'Organizations' },
  { href: '/admin/grants', label: 'Grants' },
  { href: '/admin/diagnostics', label: 'Diagnostics' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20">
      <div className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Admin Center</h1>
            <p className="text-xs text-slate-400">Enterprise operations and governance</p>
          </div>
          <form action="/api/admin/logout" method="post">
            <button className="px-3 py-2 text-sm rounded-md border border-slate-700 hover:border-cyan-400">
              Log out
            </button>
          </form>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6 grid lg:grid-cols-[220px_1fr] gap-6">
        <aside className="bg-slate-900 border border-slate-800 rounded-xl p-3 h-fit">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-md text-slate-200 hover:bg-slate-800 hover:text-cyan-300 transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="space-y-6">{children}</main>
      </div>
    </div>
  );
}
