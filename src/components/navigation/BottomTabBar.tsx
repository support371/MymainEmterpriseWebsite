"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Shield, Wallet, Users, LayoutGrid, Briefcase } from 'lucide-react';

const tabs = [
  { name: 'Home', href: '/home', icon: Home },
  { name: 'Services', href: '/services', icon: Briefcase },
  { name: 'Intel', href: '/intel', icon: Shield },
  { name: 'Assets', href: '/assets', icon: Wallet },
  { name: 'Community', href: '/community', icon: Users },
  { name: 'Hub', href: '/hub', icon: LayoutGrid },
];

export default function BottomTabBar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.href);
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex h-full flex-1 flex-col items-center justify-center gap-1 px-1 transition-colors ${
                active
                  ? 'text-cyan-400'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-medium leading-none">{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
