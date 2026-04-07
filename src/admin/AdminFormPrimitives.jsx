import { cn } from "../lib/utils";

export function FormCard({ title, description, children, className }) {
  return (
    <section
      className={cn(
        "rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6",
        className
      )}
    >
      {(title || description) && (
        <div className="mb-5 border-b border-slate-200 pb-4">
          {title && (
            <h2 className="text-base font-semibold text-slate-950">{title}</h2>
          )}
          {description && (
            <p className="mt-1 text-sm leading-6 text-slate-500">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

export function Field({ label, hint, children, className }) {
  return (
    <label className={cn("block space-y-2", className)}>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
      {hint && <span className="block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

export function CharacterCount({ value = "", limit }) {
  const count = value.length;
  const tone =
    count > limit
      ? "text-red-600"
      : count > limit * 0.9
      ? "text-orange-500"
      : "text-slate-400";

  return (
    <p className={cn("mt-1 text-right text-xs", tone)}>
      {count}/{limit} characters
    </p>
  );
}

export function EmptyDashedState({ children }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
      {children}
    </div>
  );
}
