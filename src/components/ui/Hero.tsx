import { LucideIcon } from 'lucide-react';

interface HeroProps {
  title: string;
  subtitle?: string;
  badge?: {
    icon: LucideIcon;
    text: string;
  };
  cta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  centered?: boolean;
}

export default function Hero({ title, subtitle, badge, cta, secondaryCta, centered = true }: HeroProps) {
  const BadgeIcon = badge?.icon;

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-slate-950" />
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-5xl mx-auto ${centered ? 'text-center' : 'text-left'}`}>
          {badge && (
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6 ${centered ? 'justify-center' : ''}`}>
              {BadgeIcon && <BadgeIcon className="w-4 h-4 text-cyan-500" />}
              <span className="text-sm font-medium text-cyan-500">{badge.text}</span>
            </div>
          )}

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-8 font-medium tracking-tight">
              {subtitle}
            </p>
          )}

          {(cta || secondaryCta) && (
            <div className={`flex flex-col sm:flex-row gap-4 mb-12 ${centered ? 'justify-center' : 'justify-start'}`}>
              {cta && (
                <a
                  href={cta.href}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold text-lg transition-all shadow-lg text-white text-center"
                >
                  {cta.text}
                </a>
              )}
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className="px-8 py-4 border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white rounded-lg font-semibold text-lg transition-all text-center"
                >
                  {secondaryCta.text}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
