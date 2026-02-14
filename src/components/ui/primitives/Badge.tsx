import { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return <span className="inline-flex rounded-full border border-primary/50 px-3 py-1 text-xs text-primary">{children}</span>;
}
