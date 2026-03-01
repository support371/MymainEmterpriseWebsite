interface KPIItem {
  label: string;
  value: string;
}

interface KPISnapshotProps {
  metrics: KPIItem[];
  columns?: 2 | 3 | 4;
}

export default function KPISnapshot({ metrics, columns = 3 }: KPISnapshotProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4 mb-8`}>
      {metrics.map((item) => (
        <div
          key={item.label}
          className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center"
        >
          <div className="text-2xl font-bold text-cyan-500">{item.value}</div>
          <div className="text-xs text-slate-400 mt-1">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
