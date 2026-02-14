import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/intelligence", label: "Intelligence" },
  { href: "/contact", label: "Contact" },
  { href: "/app/intelligence", label: "Command Center" },
];

export function PublicNav() {
  return (
    <header className="border-b bg-slate-950/80 backdrop-blur">
      <div className="container-shell flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold text-primary">GEM CYBER</Link>
        <nav className="flex gap-4 text-sm text-muted">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
