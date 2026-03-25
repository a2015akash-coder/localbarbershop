import { cn } from "../../lib/utils";

const variantClasses = {
  default:
    "border-[color:var(--border)] bg-white/84 text-[var(--foreground)] shadow-[0_10px_30px_-24px_rgba(15,23,42,0.8)]",
  muted:
    "border-transparent bg-[var(--muted)] text-[var(--muted-foreground)]",
  accent:
    "border-transparent bg-[var(--brand-accent-soft)] text-[var(--brand-accent-strong)]",
  dark: "border-transparent bg-[var(--brand-primary)] text-white",
  success: "border-transparent bg-[#e9f7ee] text-[var(--brand-success)]",
};

export function badgeVariants({ variant = "default", className } = {}) {
  return cn(
    "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase",
    variantClasses[variant],
    className
  );
}
