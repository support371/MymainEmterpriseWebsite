import { TextareaHTMLAttributes } from "react";

export function Textarea({ className = "", ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`w-full rounded-[var(--radius)] border bg-surface px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary ${className}`} {...props} />;
}
