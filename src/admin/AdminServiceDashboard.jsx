import { useCallback, useEffect, useMemo, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import {
  Clock,
  DollarSign,
  Eye,
  Layers3,
  Pencil,
  Plus,
  RefreshCcw,
  Scissors,
  Search,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import {
  AdminDashboardShell,
  AdminStatCard,
  EmptyState,
  StatusPill,
} from "./AdminDashboardShell";
import { cn } from "../lib/utils";

const SERVICE_DETAIL_BASE_PATH = "/services";

const buttonBase =
  "inline-flex h-9 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";
const buttonGhost =
  "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-950";
const buttonPrimary = "bg-slate-950 text-white hover:bg-slate-800";
const buttonDanger =
  "border border-red-200 bg-white text-red-600 hover:bg-red-50";

function ServiceRow({ service, onDelete }) {
  const hasViewLink = Boolean(service.slug);

  return (
    <div className="grid gap-4 p-4 transition-colors hover:bg-slate-50 lg:grid-cols-[minmax(0,1.7fr)_180px_180px_auto] lg:items-center">
      <div className="flex min-w-0 gap-4">
        <div className="h-20 w-24 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
          {service.coverImage ? (
            <img
              src={service.coverImage}
              alt={service.coverImageAlt || service.title || "Service cover"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-400">
              <Scissors className="h-5 w-5" aria-hidden="true" />
            </div>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-slate-950">
              {service.title || "Untitled service"}
            </h3>
            <StatusPill status={service.status || "published"} />
          </div>
          <p className="mt-1 break-all text-xs text-slate-500">
            {service.slug || "missing-slug"}
          </p>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
            {service.excerpt || "No excerpt added yet."}
          </p>
        </div>
      </div>

      <div className="grid gap-1 text-sm text-slate-600">
        <span className="text-xs font-medium uppercase text-slate-400">
          Details
        </span>
        <span>{service.price || "No price"}</span>
        <span>{service.duration || "No duration"}</span>
      </div>

      <div className="grid gap-1 text-sm text-slate-600">
        <span className="text-xs font-medium uppercase text-slate-400">
          Publishing
        </span>
        <span>Order {service.order ?? "-"}</span>
        <span>SEO {service.metaTitle || service.metaDescription ? "ready" : "missing"}</span>
      </div>

      <div className="flex flex-wrap gap-2 lg:justify-end">
        <Link
          to={`/admin/services/${service.id}/edit`}
          className={cn(buttonBase, buttonGhost)}
        >
          <Pencil className="h-4 w-4" aria-hidden="true" />
          Edit
        </Link>

        {hasViewLink && (
          <a
            href={`${SERVICE_DETAIL_BASE_PATH}/${service.slug}`}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonBase, buttonGhost)}
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
            View
          </a>
        )}

        <button
          type="button"
          onClick={() => onDelete(service.id, service.title)}
          className={cn(buttonBase, buttonDanger)}
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          Delete
        </button>
      </div>
    </div>
  );
}

function LoadingRows() {
  return (
    <div className="divide-y divide-slate-200">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="grid gap-4 p-4 lg:grid-cols-[1fr_180px_180px_220px]">
          <div className="h-20 animate-pulse rounded-md bg-slate-100" />
          <div className="h-14 animate-pulse rounded-md bg-slate-100" />
          <div className="h-14 animate-pulse rounded-md bg-slate-100" />
          <div className="h-14 animate-pulse rounded-md bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

export default function AdminServiceDashboard() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const ref = collection(db, "services");
      const q = query(ref, orderBy("order", "asc"));
      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));

      setServices(data);
    } catch (err) {
      console.error("Failed to fetch services:", err);
      setError("Failed to load services. Try refreshing the dashboard.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const filteredServices = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    if (!searchTerm) return services;

    return services.filter((service) => {
      const haystack = [
        service.title,
        service.slug,
        service.excerpt,
        service.price,
        service.duration,
        service.metaTitle,
        service.metaDescription,
        service.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(searchTerm);
    });
  }, [services, search]);

  const stats = useMemo(
    () => ({
      total: services.length,
      published: services.filter((item) => item.status === "published").length,
      withPrice: services.filter((item) => item.price).length,
      withDuration: services.filter((item) => item.duration).length,
      filtered: filteredServices.length,
    }),
    [filteredServices.length, services]
  );

  const deleteService = async (id, title) => {
    const confirmed = window.confirm(
      `Delete service "${title || "Untitled service"}"?`
    );
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "services", id));
      setServices((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete service:", err);
      setError("Failed to delete the service.");
    }
  };

  return (
    <AdminDashboardShell
      title="Service dashboard"
      description="Keep service pages ordered, priced, searchable, and ready for customers."
      action={
        <Link
          to="/admin/services/new"
          className={cn(buttonBase, buttonPrimary, "h-10 px-4")}
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          New service
        </Link>
      }
    >
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          label="Total services"
          value={stats.total}
          helper={`${stats.filtered} match the current search`}
          icon={Scissors}
          tone="blue"
        />
        <AdminStatCard
          label="Published"
          value={stats.published}
          helper="Visible on the website"
          icon={Layers3}
          tone="green"
        />
        <AdminStatCard
          label="With price"
          value={stats.withPrice}
          helper="Pricing details completed"
          icon={DollarSign}
          tone="orange"
        />
        <AdminStatCard
          label="With duration"
          value={stats.withDuration}
          helper="Timing details completed"
          icon={Clock}
          tone="slate"
        />
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-4 md:grid-cols-[minmax(260px,1fr)_auto] md:items-center">
          <label className="relative block">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search title, slug, excerpt, price, duration..."
              className="h-10 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-950 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </label>

          <button
            type="button"
            onClick={fetchServices}
            disabled={loading}
            className={cn(buttonBase, buttonGhost, "h-10")}
          >
            <RefreshCcw className={cn("h-4 w-4", loading && "animate-spin")} aria-hidden="true" />
            Refresh
          </button>
        </div>
      </section>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-950">Services</h2>
            <p className="mt-1 text-sm text-slate-500">
              {filteredServices.length} of {services.length} services match the current view.
            </p>
          </div>
          <div className="text-sm text-slate-500">Sorted by service order</div>
        </div>

        {loading ? (
          <LoadingRows />
        ) : filteredServices.length === 0 ? (
          <div className="p-4">
            <EmptyState
              title="No services found"
              description="Try another search or add a new service page."
            />
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {filteredServices.map((service) => (
              <ServiceRow
                key={service.id}
                service={service}
                onDelete={deleteService}
              />
            ))}
          </div>
        )}
      </section>
    </AdminDashboardShell>
  );
}
