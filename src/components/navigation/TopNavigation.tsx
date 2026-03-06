"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Home, Wallet, Users, LayoutGrid, Briefcase } from 'lucide-react';

const tabs = [
  { name: 'Home', href: '/home', icon: Home },
  { name: 'Services', href: '/services', icon: Briefcase },
  { name: 'Intel', href: '/intel', icon: Shield },
  { name: 'Assets', href: '/assets', icon: Wallet },
  { name: 'Community', href: '/community', icon: Users },
  { name: 'Hub', href: '/hub', icon: LayoutGrid },
];

export default function TopNavigation() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="hidden lg:block sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/home" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="font-bold text-lg text-white">GEM CYBER</div>
              <div className="text-xs text-slate-400">Enterprise Security</div>
            </div>
          </Link>

          <nav className="flex items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = isActive(tab.href);
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    active
                      ? 'bg-cyan-500 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/home/contact"
            className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
