"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Shield, X } from 'lucide-react';

const navItems = [
  { name: 'Services', href: '/services' },
  { name: 'Intelligence', href: '/intelligence' },
  { name: 'Membership', href: '/membership' },
  { name: 'Leadership', href: '/leadership' },
  { name: 'About', href: '/about' },
  { name: 'Admin', href: '/admin' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const transparent = pathname === '/' && !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        transparent
          ? 'border-transparent bg-transparent'
          : 'border-slate-700/60 bg-slate-950/85 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-sky-500 shadow-[0_0_18px_rgba(0,212,255,0.35)]">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-semibold tracking-wide text-white sm:text-base">GEM CYBER</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${
                  pathname === item.href ? 'text-cyan-300' : 'text-slate-200'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact-us"
              className="rounded-lg bg-gradient-to-r from-cyan-400 to-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_0_20px_rgba(0,212,255,0.35)] transition hover:from-cyan-300 hover:to-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
            >
              Security Audit
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="rounded-lg p-2 text-white transition hover:bg-slate-800/70 lg:hidden"
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-700/60 bg-slate-950/95 px-4 pb-5 pt-3 backdrop-blur-lg lg:hidden">
          <nav className="container mx-auto flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-slate-800 ${
                  pathname === item.href ? 'bg-slate-800 text-cyan-300' : 'text-slate-200'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact-us"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex justify-center rounded-lg bg-gradient-to-r from-cyan-400 to-sky-500 px-4 py-3 text-sm font-semibold text-slate-950"
            >
              Security Audit
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
