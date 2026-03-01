import Link from 'next/link';
import { ArrowRight, type LucideIcon } from 'lucide-react';

type PlatformModuleCardProps = {
  title: string;
  description: string;
  outcomes: string[];
  ctaLabel: string;
  href: string;
  icon?: LucideIcon;
};

export default function PlatformModuleCard({
  title,
  description,
  outcomes,
  ctaLabel,
  href,
  icon: Icon,
}: PlatformModuleCardProps) {
  return (
    <article className="h-full rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-[0_0_0_1px_rgba(148,163,184,0.08)] transition hover:border-cyan-500/60 hover:bg-slate-900/80">
      <div className="flex items-start gap-4">
        {Icon ? (
          <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-cyan-300">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        ) : null}
        <div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm text-slate-300">{description}</p>
        </div>
      </div>

      <ul className="mt-5 space-y-2 text-sm text-slate-300">
        {outcomes.slice(0, 4).map((outcome) => (
          <li key={outcome} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-cyan-300" aria-hidden="true" />
            <span>{outcome}</span>
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
      >
        {ctaLabel}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
