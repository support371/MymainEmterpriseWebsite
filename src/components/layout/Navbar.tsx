"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Menu, X, Newspaper, Send, ScrollText, Mail } from 'lucide-react';
import { appEnv } from '@/lib/env';

const navigation = [
  { name: 'Home', href: '/#home' },
  { name: 'Services', href: '/#services' },
  { name: 'Intelligence', href: '/#intelligence' },
  { name: 'Campaigns', href: '/#campaigns' },
  { name: 'Roadmap', href: '/#roadmap' },
  { name: 'Contact', href: '/#contact' },
];

const productNavigation = [
  { name: 'Command Center', href: '/intelligence', icon: Newspaper },
  { name: 'Campaign Engine', href: '/campaigns', icon: Send },
  { name: 'Architecture', href: '/specs', icon: ScrollText },
];

const mobileNavigation = [
  ...navigation.map((item) => ({ ...item, icon: undefined })),
  ...productNavigation,
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isProductRoute = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-cyan-900/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-sky-500 shadow-[0_0_18px_rgba(0,212,255,0.35)] flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="font-bold text-lg text-white">{appEnv.appName}</div>
              <div className="text-xs text-slate-400">Enterprise Operations Platform</div>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 rounded-lg transition-colors text-slate-300 hover:text-white hover:bg-slate-900"
              >
                {item.name}
              </Link>
            ))}
            <div className="h-8 w-px bg-slate-800 mx-1" />
            {productNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isProductRoute(item.href)
                      ? 'bg-cyan-500 text-slate-950 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
            <Link
              href={`mailto:${appEnv.supportEmail}`}
              className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 rounded-lg font-semibold transition-all ml-2 shadow-[0_0_20px_rgba(0,212,255,0.3)]"
            >
              <span className="inline-flex items-center gap-2"><Mail className="w-4 h-4" />Contact</span>
            </Link>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-slate-800">
            <div className="flex flex-col gap-2">
              {mobileNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-slate-300 hover:text-white hover:bg-slate-900"
                  >
                    {Icon ? <Icon className="w-4 h-4" /> : null}
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
