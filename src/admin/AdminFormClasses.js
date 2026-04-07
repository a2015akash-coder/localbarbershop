import { cn } from "../lib/utils";

export const inputClassName =
  "w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500";

export const textareaClassName = cn(inputClassName, "min-h-24 resize-y");

export const selectClassName = cn(inputClassName, "h-10");

export const buttonBaseClassName =
  "inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";

export const primaryButtonClassName = cn(
  buttonBaseClassName,
  "bg-slate-950 text-white hover:bg-slate-800"
);

export const accentButtonClassName = cn(
  buttonBaseClassName,
  "bg-orange-600 text-white hover:bg-orange-700"
);

export const secondaryButtonClassName = cn(
  buttonBaseClassName,
  "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-950"
);

export const dangerButtonClassName = cn(
  buttonBaseClassName,
  "border border-red-200 bg-white text-red-600 hover:bg-red-50"
);
