import { useEffect, useMemo, useState } from "react";
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
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { BLOG_DETAIL_BASE_PATH } from "../utils/blogLinkUtils";

const PAGE_SIZE = 8;

/* ---------------- UTILS ---------------- */

function formatDate(ts) {
  if (!ts?.toDate) return "—";
  return ts.toDate().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* ---------------- STAT CARD ---------------- */

function StatCard({ label, value, accent }) {
  const accents = {
    blue: "from-blue-500/20 to-blue-100",
    green: "from-green-500/20 to-green-100",
    orange: "from-orange-500/20 to-orange-100",
    gray: "from-gray-200 to-gray-100",
  };

  const text = {
    blue: "text-blue-600",
    green: "text-green-600",
    orange: "text-orange-600",
    gray: "text-gray-900",
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition">
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accents[accent]}`}
      />
      <div className="text-sm font-medium text-gray-500">{label}</div>
      <div className={`mt-3 text-4xl font-semibold ${text[accent]}`}>
        {value}
      </div>
    </div>
  );
}

/* ---------------- BLOG ROW CARD ---------------- */

function BlogRowCard({ blog, onPublish, onUnpublish, onDelete }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">

        {/* INFO */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900">
            {blog.title}
          </h3>

          <p className="mt-1 text-xs text-gray-500 break-all">
            {blog.slug}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <span>{blog.category || "—"}</span>

            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${blog.status === "published"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
                }`}
            >
              {blog.status}
            </span>

            <span>Created: {formatDate(blog.createdAt)}</span>
            <span>Published: {formatDate(blog.publishedAt)}</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap gap-2 lg:justify-end">
          <Link
            to={`/admin/blogs/${blog.id}/edit`}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
          >
            Edit
          </Link>

          {blog.status === "draft" ? (
            <button
              onClick={() => onPublish(blog.id)}
              className="rounded-lg bg-orange-600 px-4 py-2 text-sm text-white hover:bg-orange-700"
            >
              Publish
            </button>
          ) : (
            <button
              onClick={() => onUnpublish(blog.id)}
              className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
            >
              Unpublish
            </button>
          )}

          <button
            onClick={() => onDelete(blog.id, blog.title)}
            className="rounded-lg border px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Delete
          </button>

          {blog.status === "published" && (
            <Link
              to={`${BLOG_DETAIL_BASE_PATH}/${blog.slug}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
            >
              View
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- MAIN DASHBOARD ---------------- */

export default function AdminBlogDashboard() {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const [blogs, setBlogs] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  /* ---------------- QUERY BUILDER ---------------- */

  const buildQuery = (cursor = null) => {
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
  };

  /* ---------------- FETCHING ---------------- */

  const fetchFirstPage = async () => {
    setLoading(true);
    const snapshot = await getDocs(buildQuery());
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    setBlogs(data);
    setLastDoc(snapshot.docs.at(-1) || null);
    setHasMore(snapshot.docs.length === PAGE_SIZE);
    setLoading(false);
  };

  const fetchMore = async () => {
    if (!hasMore || !lastDoc) return;
    setLoadingMore(true);
    const snapshot = await getDocs(buildQuery(lastDoc));
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    setBlogs((p) => [...p, ...data]);
    setLastDoc(snapshot.docs.at(-1) || null);
    setHasMore(snapshot.docs.length === PAGE_SIZE);
    setLoadingMore(false);
  };

  useEffect(() => {
    fetchFirstPage();
  }, [tab]);

  /* ---------------- FILTERING ---------------- */

  const filteredBlogs = useMemo(() => {
    const s = search.toLowerCase();
    return blogs.filter((b) => {
      const matchCategory = category === "all" || b.category === category;
      const matchSearch =
        !s ||
        b.title?.toLowerCase().includes(s) ||
        b.slug?.toLowerCase().includes(s) ||
        b.excerpt?.toLowerCase().includes(s);
      return matchCategory && matchSearch;
    });
  }, [blogs, search, category]);

  /* ---------------- FIXED PUBLISH LOGIC ---------------- */

  const publishBlog = async (id) => {
    const ref = doc(db, "blogs", id);
    const snap = await getDoc(ref);

    if (!snap.exists()) return;

    const data = snap.data();
    const previousStatus = data.status;

    let publishedAt = data.publishedAt ?? null;

    if (previousStatus !== "published") {
      publishedAt = serverTimestamp();
    }

    await updateDoc(ref, {
      status: "published",
      publishedAt,
      updatedAt: serverTimestamp(),
    });

    fetchFirstPage();
  };

  const unpublishBlog = async (id) => {
    await updateDoc(doc(db, "blogs", id), {
      status: "draft",
      publishedAt: null,
      updatedAt: serverTimestamp(),
    });

    fetchFirstPage();
  };

  const deleteBlog = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return;
    await deleteDoc(doc(db, "blogs", id));
    fetchFirstPage();
  };

  /* ---------------- STATS ---------------- */

  const stats = {
    total: blogs.length,
    drafts: blogs.filter((b) => b.status === "draft").length,
    published: blogs.filter((b) => b.status === "published").length,
  };

  /* ---------------- RENDER ---------------- */

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-screen-xl mx-auto px-4">

        {/* HEADER */}
        <div className="flex justify-between items-end gap-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Blog Admin
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage drafts, published posts, edits and deletions.
            </p>
          </div>

          <Link
            to="/admin/blogs/new"
            className="rounded-xl bg-orange-600 px-6 py-3 text-white font-semibold hover:bg-orange-700"
          >
            + New Blog
          </Link>
        </div>

        {/* STATS */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total Blogs" value={stats.total} accent="blue" />
          <StatCard label="Drafts" value={stats.drafts} accent="gray" />
          <StatCard label="Published" value={stats.published} accent="green" />
          <StatCard label="Loaded" value={blogs.length} accent="orange" />
        </div>

        {/* TABS */}
        <div className="mt-12 flex gap-3">
          {["all", "draft", "published"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${tab === t
                  ? "bg-orange-600 text-white"
                  : "bg-white shadow-sm hover:bg-gray-100"
                }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* FILTERS */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blogs…"
            className="rounded-xl border px-4 py-3"
          />

          <select
            className="rounded-xl border px-4 py-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All categories</option>
            <option value="Hairstyle">Hairstyle</option>
            <option value="Beard">Beard</option>
            <option value="Facility">Facility</option>
          </select>

          <button
            onClick={fetchFirstPage}
            className="rounded-xl border px-4 py-3 hover:bg-gray-100"
          >
            Refresh
          </button>
        </div>

        {/* LIST */}
        <div className="mt-10 space-y-4">
          {loading && <p className="py-20 text-center">Loading…</p>}

          {!loading && filteredBlogs.length === 0 && (
            <p className="py-20 text-center text-gray-600">
              No blogs found.
            </p>
          )}

          {filteredBlogs.map((blog) => (
            <BlogRowCard
              key={blog.id}
              blog={blog}
              onPublish={publishBlog}
              onUnpublish={unpublishBlog}
              onDelete={deleteBlog}
            />
          ))}
        </div>

        {/* LOAD MORE */}
        {hasMore && !loading && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={fetchMore}
              disabled={loadingMore}
              className="rounded-xl border px-6 py-3 hover:bg-gray-100 disabled:opacity-60"
            >
              {loadingMore ? "Loading…" : "Load more"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
