import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-slate-950 hover:bg-primary-strong",
  secondary: "bg-surface-2 text-foreground hover:bg-surface",
  ghost: "bg-transparent text-foreground hover:bg-surface",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-[var(--radius)] px-4 py-2 text-sm font-semibold transition ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
