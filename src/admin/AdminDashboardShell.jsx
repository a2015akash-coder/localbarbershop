import { NavLink } from "react-router-dom";
import { FileText, LayoutDashboard, Scissors } from "lucide-react";
import { cn } from "../lib/utils";

const navItems = [
  { label: "Blogs", to: "/admin/blogs", icon: FileText },
  { label: "Services", to: "/admin/services", icon: Scissors },
];

export function AdminDashboardShell({
  title,
  description,
  eyebrow = "Admin workspace",
  action,
  children,
}) {
  return (
    <section className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto grid w-full max-w-[1440px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8">
        <aside className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-950 p-3 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10">
              <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold">Local Barber</p>
              <p className="text-xs text-slate-300">Admin</p>
            </div>
          </div>

          <nav className="mt-5 grid gap-1" aria-label="Admin navigation">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-orange-50 text-orange-700"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                    )
                  }
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-950">
              Content queue
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Review drafts, update services, and keep public pages current.
            </p>
          </div>
        </aside>

        <main className="min-w-0 space-y-6">
          <header className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-medium text-orange-700">{eyebrow}</p>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                  {title}
                </h1>
                {description && (
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {description}
                  </p>
                )}
              </div>

              {action && <div className="shrink-0">{action}</div>}
            </div>
          </header>

          {children}
        </main>
      </div>
    </section>
  );
}

export function AdminStatCard({ label, value, helper, icon: Icon, tone = "slate" }) {
  const toneClasses = {
    slate: "bg-slate-100 text-slate-700",
    orange: "bg-orange-50 text-orange-700",
    green: "bg-emerald-50 text-emerald-700",
    blue: "bg-sky-50 text-sky-700",
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
            {value}
          </p>
        </div>
        {Icon && (
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-md",
              toneClasses[tone]
            )}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        )}
      </div>
      {helper && <p className="mt-3 text-xs text-slate-500">{helper}</p>}
    </div>
  );
}

export function StatusPill({ status }) {
  const normalizedStatus = (status || "").toLowerCase();
  const isPositive =
    normalizedStatus === "published" || normalizedStatus === "active";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium capitalize",
        isPositive
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-slate-200 bg-slate-100 text-slate-700"
      )}
    >
      {status || "draft"}
    </span>
  );
}

export function EmptyState({ title, description }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
      <p className="text-sm font-semibold text-slate-950">{title}</p>
      {description && (
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}
