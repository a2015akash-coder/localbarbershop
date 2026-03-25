import { cn } from "../../lib/utils";

const variantClasses = {
  default:
    "bg-[var(--brand-primary)] text-[var(--brand-primary-foreground)] shadow-[0_16px_40px_-24px_rgba(15,23,42,0.8)] hover:-translate-y-0.5 hover:bg-[#1f2937]",
  accent:
    "bg-[var(--brand-accent)] text-white shadow-[0_18px_45px_-24px_rgba(201,123,45,0.95)] hover:-translate-y-0.5 hover:bg-[var(--brand-accent-strong)]",
  secondary:
    "border border-[var(--border)] bg-white/88 text-[var(--foreground)] shadow-[0_14px_40px_-28px_rgba(15,23,42,0.55)] hover:-translate-y-0.5 hover:bg-white",
  outline:
    "border border-[var(--border)] bg-[var(--brand-accent-soft)] text-[var(--brand-accent-strong)] hover:-translate-y-0.5 hover:bg-[#ffe7cc]",
  ghost:
    "text-[var(--foreground)] hover:bg-white/75",
};

const sizeClasses = {
  sm: "h-10 px-4 text-sm",
  default: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
  xl: "h-14 px-8 text-base",
  icon: "h-10 w-10",
};

const radiusClasses = {
  pill: "rounded-full",
  lg: "rounded-2xl",
  md: "rounded-xl",
};

export function buttonVariants({
  variant = "default",
  size = "default",
  radius = "pill",
  className,
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    radiusClasses[radius],
    className
  );
}
