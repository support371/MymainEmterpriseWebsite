import { SelectHTMLAttributes } from "react";

export function Select({ className = "", children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={`w-full rounded-[var(--radius)] border bg-surface px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary ${className}`} {...props}>
      {children}
    </select>
  );
}
