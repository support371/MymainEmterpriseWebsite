import Link from "next/link";

const links = [
  { href: "/app/intelligence", label: "Intelligence" },
  { href: "/app/spec/outreach-engine", label: "Outreach Engine" },
  { href: "/app/spec/monitoring-assist", label: "Monitoring Assist" },
];

export function AppNav() {
  return (
    <aside className="min-h-screen w-64 border-r bg-slate-950/70 p-4">
      <div className="mb-6 text-sm font-semibold text-primary">GEM CYBER APP</div>
      <nav className="space-y-2 text-sm">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="block rounded-md px-3 py-2 text-muted hover:bg-surface hover:text-foreground">
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
