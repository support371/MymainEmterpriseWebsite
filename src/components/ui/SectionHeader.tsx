interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({ title, subtitle, centered = true }: SectionHeaderProps) {
  return (
    <div className={`max-w-4xl mx-auto mb-16 ${centered ? 'text-center' : 'text-left'}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{title}</h2>
      {subtitle && <p className="text-slate-400 text-lg">{subtitle}</p>}
    </div>
  );
}
