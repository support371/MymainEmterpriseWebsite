interface Stat {
  label: string;
  value: string;
}

interface StatGridProps {
  stats: Stat[];
  columns?: number;
}

export default function StatGrid({ stats, columns = 3 }: StatGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }[columns] || 'md:grid-cols-3';

  return (
    <div className={`grid grid-cols-1 ${gridCols} gap-6 max-w-4xl mx-auto`}>
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center hover:border-cyan-500/30 transition-colors">
          <div className="text-3xl font-bold text-cyan-500 mb-2">{stat.value}</div>
          <div className="text-sm text-slate-400 uppercase tracking-widest">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
