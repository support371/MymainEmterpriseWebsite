import { ReactNode } from "react";
import { Card } from "./Card";

export function Modal({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-[var(--radius)] border border-primary/40 bg-slate-950/95 p-2">
      <Card className="border-primary/20">
        <h3 className="mb-3 text-lg font-semibold">{title}</h3>
        {children}
      </Card>
    </div>
  );
}
