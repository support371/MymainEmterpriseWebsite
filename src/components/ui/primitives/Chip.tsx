export function Chip({ label }: { label: string }) {
  return <span className="rounded-md bg-surface-2 px-2 py-1 text-xs text-muted">{label}</span>;
}
