import { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[var(--radius)] border bg-surface/70 p-5 ${className}`}>{children}</div>;
}
