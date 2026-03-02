"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes, Command, Home, Radar, Users } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const primaryTabs: NavItem[] = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Intel", href: "/intel", icon: Radar },
  { label: "Assets", href: "/assets", icon: Boxes },
  { label: "Community", href: "/community", icon: Users },
  { label: "Hub", href: "/hub", icon: Command },
];

const secondaryLinks = [
  { label: "Services", href: "/services" },
  { label: "Admin", href: "/admin" },
  { label: "Campaigns", href: "/campaigns" },
];

function isActive(pathname: string, href: string) {
  if (href === "/hub") {
    return pathname === "/hub" || pathname.startsWith("/hub/");
  }
  return pathname === href;
}

export default function PrimaryDomainNav() {
  const pathname = usePathname();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 hidden border-b border-slate-700/70 bg-slate-950/92 backdrop-blur-md md:block">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-amber-300/40 bg-amber-500/10 px-2 py-1 text-xs font-semibold tracking-[0.14em] text-amber-200">
              GEM CYBER
            </span>
            <span className="text-xs text-slate-400">Industrial Domain Navigation</span>
          </div>
          <nav className="flex items-center gap-2">
            {primaryTabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive(pathname, tab.href)
                    ? "bg-amber-500/20 text-amber-200"
                    : "text-slate-200 hover:bg-slate-800/80 hover:text-slate-100"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3 text-xs">
            {secondaryLinks.map((item) => (
              <Link key={item.href} href={item.href} className="text-slate-300 hover:text-amber-200">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-700/70 bg-slate-950/95 backdrop-blur md:hidden">
        <div className="grid grid-cols-5 gap-1 px-2 py-2">
          {primaryTabs.map((tab) => {
            const active = isActive(pathname, tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center justify-center rounded-md px-1 py-2 text-[11px] font-medium ${
                  active ? "bg-amber-500/20 text-amber-200" : "text-slate-300"
                }`}
              >
                <tab.icon className="mb-1 h-4 w-4" />
                {tab.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
