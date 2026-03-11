'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { PortalRole } from '@/lib/auth/types';
import { getAllowedNavItems } from '@/lib/auth/rbac';

interface SidebarProps {
  role: PortalRole;
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const items = getAllowedNavItems(role);

  return (
    <aside className="bg-slate-900 border border-slate-800 rounded-xl p-3 h-fit sticky top-20">
      <nav className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-md transition text-sm ${
                isActive
                  ? 'bg-cyan-600/20 text-cyan-300 font-medium'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-cyan-300'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
