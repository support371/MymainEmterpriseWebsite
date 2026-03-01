"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const hubLinks = [
  { name: 'Overview', href: '/hub' },
  { name: 'SOC', href: '/hub/soc' },
  { name: 'Compliance', href: '/hub/compliance' },
  { name: 'Research', href: '/hub/research' },
];

export default function HubSubNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/hub') return pathname === '/hub';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <nav className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
          {hubLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                isActive(link.href)
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
