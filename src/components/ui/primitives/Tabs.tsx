export function Tabs({ items, active }: { items: string[]; active: string }) {
  return (
    <div className="inline-flex rounded-[var(--radius)] bg-surface p-1">
      {items.map((item) => (
        <span
          key={item}
          className={`rounded-md px-3 py-1 text-sm ${active === item ? "bg-primary text-slate-950" : "text-muted"}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
