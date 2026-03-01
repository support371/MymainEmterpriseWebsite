import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

interface FeedCardProps {
  title: string;
  description: string;
  href: string;
  icon?: LucideIcon;
  metric?: string;
}

export default function FeedCard({ title, description, href, icon: Icon, metric }: FeedCardProps) {
  return (
    <Link
      href={href}
      className="block bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {Icon && <Icon className="w-8 h-8 text-cyan-500 mb-3 group-hover:scale-110 transition-transform" />}
          <h3 className="text-lg font-bold mb-1 group-hover:text-cyan-500 transition-colors text-white">
            {title}
          </h3>
          <p className="text-slate-400 text-sm">{description}</p>
        </div>
        {metric && (
          <div className="text-right shrink-0">
            <div className="text-2xl font-bold text-cyan-500">{metric}</div>
          </div>
        )}
      </div>
    </Link>
  );
}
