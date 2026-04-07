import { useCallback, useEffect, useMemo, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  CalendarDays,
  Eye,
  FileText,
  Globe2,
  Pencil,
  Plus,
  RefreshCcw,
  Search,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { BLOG_DETAIL_BASE_PATH } from "../utils/blogLinkUtils";
import {
  AdminDashboardShell,
  AdminStatCard,
  EmptyState,
  StatusPill,
} from "./AdminDashboardShell";
import { cn } from "../lib/utils";

const PAGE_SIZE = 8;

const tabOptions = [
  { value: "all", label: "All" },
  { value: "draft", label: "Drafts" },
  { value: "published", label: "Published" },
];

const buttonBase =
  "inline-flex h-9 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";
const buttonGhost =
  "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-950";
const buttonPrimary = "bg-slate-950 text-white hover:bg-slate-800";
const buttonAccent = "bg-orange-600 text-white hover:bg-orange-700";
const buttonDanger =
  "border border-red-200 bg-white text-red-600 hover:bg-red-50";

function formatDate(ts) {
  if (!ts?.toDate) return "-";

  return ts.toDate().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function BlogRow({ blog, onPublish, onUnpublish, onDelete }) {
  const viewPath =
    blog.status === "published" && blog.slug
      ? `${BLOG_DETAIL_BASE_PATH}/${blog.slug}`
      : null;

  return (
    <div className="grid gap-4 p-4 transition-colors hover:bg-slate-50 lg:grid-cols-[minmax(0,1.6fr)_170px_220px_auto] lg:items-center">
      <div className="flex min-w-0 gap-4">
        <div className="hidden h-16 w-20 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100 sm:block">
          {blog.coverImage ? (
            <img
              src={blog.coverImage}
              alt={blog.title || "Blog cover"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-400">
              <FileText className="h-5 w-5" aria-hidden="true" />
            </div>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-slate-950">
              {blog.title || "Untitled blog"}
            </h3>
            <StatusPill status={blog.status} />
          </div>
          <p className="mt-1 break-all text-xs text-slate-500">
            {blog.slug || "missing-slug"}
          </p>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
            {blog.excerpt || "No excerpt added yet."}
          </p>
        </div>
      </div>

      <div className="grid gap-1 text-sm text-slate-600">
        <span className="text-xs font-medium uppercase text-slate-400">
          Category
        </span>
        <span>{blog.category || "Uncategorized"}</span>
      </div>

      <div className="grid gap-1 text-sm text-slate-600">
        <span className="text-xs font-medium uppercase text-slate-400">
          Timeline
        </span>
        <span>Created {formatDate(blog.createdAt)}</span>
        <span>Published {formatDate(blog.publishedAt)}</span>
      </div>

      <div className="flex flex-wrap gap-2 lg:justify-end">
        <Link
          to={`/admin/blogs/${blog.id}/edit`}
          className={cn(buttonBase, buttonGhost)}
        >
          <Pencil className="h-4 w-4" aria-hidden="true" />
          Edit
        </Link>

        {blog.status === "draft" ? (
          <button
            type="button"
            onClick={() => onPublish(blog.id)}
            className={cn(buttonBase, buttonAccent)}
          >
            Publish
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onUnpublish(blog.id)}
            className={cn(buttonBase, buttonGhost)}
          >
            Unpublish
          </button>
        )}

        {viewPath && (
          <Link
            to={viewPath}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonBase, buttonGhost)}
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
            View
          </Link>
        )}

        <button
          type="button"
          onClick={() => onDelete(blog.id, blog.title)}
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
        <div key={index} className="grid gap-4 p-4 lg:grid-cols-[1fr_170px_220px_240px]">
          <div className="h-16 animate-pulse rounded-md bg-slate-100" />
          <div className="h-12 animate-pulse rounded-md bg-slate-100" />
          <div className="h-12 animate-pulse rounded-md bg-slate-100" />
          <div className="h-12 animate-pulse rounded-md bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

export default function AdminBlogDashboard() {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const [blogs, setBlogs] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");

  const buildQuery = useCallback(
    (cursor = null) => {
      const ref = collection(db, "blogs");
      let q;

      if (tab === "draft") {
        q = query(
          ref,
          where("status", "==", "draft"),
          orderBy("createdAt", "desc"),
          limit(PAGE_SIZE)
        );
      } else if (tab === "published") {
        q = query(
          ref,
          where("status", "==", "published"),
          orderBy("publishedAt", "desc"),
          limit(PAGE_SIZE)
        );
      } else {
        q = query(ref, orderBy("createdAt", "desc"), limit(PAGE_SIZE));
      }

      if (cursor) q = query(q, startAfter(cursor));
      return q;
    },
    [tab]
  );

  const fetchFirstPage = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const snapshot = await getDocs(buildQuery());
      const data = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      setBlogs(data);
      setLastDoc(snapshot.docs.at(-1) || null);
      setHasMore(snapshot.docs.length === PAGE_SIZE);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      setError("Failed to load blogs. Try refreshing the dashboard.");
    } finally {
      setLoading(false);
    }
  }, [buildQuery]);

  const fetchMore = useCallback(async () => {
    if (!hasMore || !lastDoc) return;

    setLoadingMore(true);
    setError("");

    try {
      const snapshot = await getDocs(buildQuery(lastDoc));
      const data = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      setBlogs((prev) => [...prev, ...data]);
      setLastDoc(snapshot.docs.at(-1) || null);
      setHasMore(snapshot.docs.length === PAGE_SIZE);
    } catch (err) {
      console.error("Failed to fetch more blogs:", err);
      setError("Failed to load more blogs. Try again.");
    } finally {
      setLoadingMore(false);
    }
  }, [buildQuery, hasMore, lastDoc]);

  useEffect(() => {
    fetchFirstPage();
  }, [fetchFirstPage]);

  const categories = useMemo(() => {
    const values = blogs
      .map((blog) => blog.category)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));

    return ["all", ...Array.from(new Set(values))];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return blogs.filter((blog) => {
      const matchesCategory = category === "all" || blog.category === category;
      const haystack = [blog.title, blog.slug, blog.excerpt, blog.category]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesCategory && (!searchTerm || haystack.includes(searchTerm));
    });
  }, [blogs, category, search]);

  const stats = useMemo(
    () => ({
      total: blogs.length,
      drafts: blogs.filter((blog) => blog.status === "draft").length,
      published: blogs.filter((blog) => blog.status === "published").length,
      filtered: filteredBlogs.length,
    }),
    [blogs, filteredBlogs.length]
  );

  const publishBlog = async (id) => {
    try {
      const ref = doc(db, "blogs", id);
      const snap = await getDoc(ref);

      if (!snap.exists()) return;

      const data = snap.data();

      await updateDoc(ref, {
        status: "published",
        publishedAt:
          data.status !== "published" ? serverTimestamp() : data.publishedAt ?? null,
        updatedAt: serverTimestamp(),
      });

      fetchFirstPage();
    } catch (err) {
      console.error("Failed to publish blog:", err);
      setError("Failed to publish the blog.");
    }
  };

  const unpublishBlog = async (id) => {
    try {
      await updateDoc(doc(db, "blogs", id), {
        status: "draft",
        publishedAt: null,
        updatedAt: serverTimestamp(),
      });

      fetchFirstPage();
    } catch (err) {
      console.error("Failed to unpublish blog:", err);
      setError("Failed to unpublish the blog.");
    }
  };

  const deleteBlog = async (id, title) => {
    const confirmed = window.confirm(`Delete "${title || "Untitled blog"}"?`);
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "blogs", id));
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (err) {
      console.error("Failed to delete blog:", err);
      setError("Failed to delete the blog.");
    }
  };

  return (
    <AdminDashboardShell
      title="Blog dashboard"
      description="Write, publish, and maintain barber shop content from one focused workspace."
      action={
        <Link to="/admin/blogs/new" className={cn(buttonBase, buttonPrimary, "h-10 px-4")}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          New blog
        </Link>
      }
    >
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          label="Loaded blogs"
          value={stats.total}
          helper="From the current Firestore page"
          icon={FileText}
          tone="blue"
        />
        <AdminStatCard
          label="Drafts"
          value={stats.drafts}
          helper="Ready for review"
          icon={Pencil}
          tone="slate"
        />
        <AdminStatCard
          label="Published"
          value={stats.published}
          helper="Visible on the website"
          icon={Globe2}
          tone="green"
        />
        <AdminStatCard
          label="Showing"
          value={stats.filtered}
          helper="After search and category filters"
          icon={Search}
          tone="orange"
        />
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-4 xl:grid-cols-[auto_minmax(260px,1fr)_220px_auto] xl:items-center">
          <div className="flex flex-wrap gap-2">
            {tabOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setTab(option.value)}
                className={cn(
                  buttonBase,
                  tab === option.value
                    ? "bg-slate-950 text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>

          <label className="relative block">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search title, slug, excerpt, category..."
              className="h-10 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-950 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </label>

          <select
            className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? "All categories" : item}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={fetchFirstPage}
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
            <h2 className="text-base font-semibold text-slate-950">Posts</h2>
            <p className="mt-1 text-sm text-slate-500">
              {filteredBlogs.length} of {blogs.length} loaded posts match the current view.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Sorted by latest activity
          </div>
        </div>

        {loading ? (
          <LoadingRows />
        ) : filteredBlogs.length === 0 ? (
          <div className="p-4">
            <EmptyState
              title="No blogs found"
              description="Try another search, switch tabs, or create a new blog post."
            />
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {filteredBlogs.map((blog) => (
              <BlogRow
                key={blog.id}
                blog={blog}
                onPublish={publishBlog}
                onUnpublish={unpublishBlog}
                onDelete={deleteBlog}
              />
            ))}
          </div>
        )}
      </section>

      {hasMore && !loading && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={fetchMore}
            disabled={loadingMore}
            className={cn(buttonBase, buttonGhost, "h-10 px-4")}
          >
            {loadingMore ? "Loading..." : "Load more posts"}
          </button>
        </div>
      )}
    </AdminDashboardShell>
  );
}
