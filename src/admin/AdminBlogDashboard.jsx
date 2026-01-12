import { useEffect, useMemo, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
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

const PAGE_SIZE = 8;

function formatDate(ts) {
  if (!ts?.toDate) return "-";
  return ts.toDate().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminBlogDashboard() {
  const [tab, setTab] = useState("all"); // all | draft | published
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const [blogs, setBlogs] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const buildQuery = (cursor = null) => {
    const baseRef = collection(db, "blogs");

    // NOTE: Firestore queries need indexes for combinations.
    // Keep it simple + predictable.

    let q;

    if (tab === "draft") {
      q = query(
        baseRef,
        where("status", "==", "draft"),
        orderBy("createdAt", "desc"),
        limit(PAGE_SIZE)
      );
    } else if (tab === "published") {
      q = query(
        baseRef,
        where("status", "==", "published"),
        orderBy("publishedAt", "desc"),
        limit(PAGE_SIZE)
      );
    } else {
      // all
      q = query(baseRef, orderBy("createdAt", "desc"), limit(PAGE_SIZE));
    }

    if (cursor) {
      q = query(q, startAfter(cursor));
    }

    return q;
  };

  const fetchFirstPage = async () => {
    setLoading(true);
    setError("");
    setBlogs([]);
    setLastDoc(null);
    setHasMore(true);

    try {
      const q = buildQuery();
      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setBlogs(data);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
      setHasMore(snapshot.docs.length === PAGE_SIZE);
    } catch (err) {
      console.error(err);
      setError("Failed to load admin blogs.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMore = async () => {
    if (!hasMore || !lastDoc) return;
    setLoadingMore(true);

    try {
      const q = buildQuery(lastDoc);
      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setBlogs((prev) => [...prev, ...data]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
      setHasMore(snapshot.docs.length === PAGE_SIZE);
    } catch (err) {
      console.error(err);
      setError("Failed to load more blogs.");
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchFirstPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const filteredBlogs = useMemo(() => {
    const s = search.trim().toLowerCase();

    return blogs.filter((b) => {
      const matchesCategory =
        category === "all" ? true : b.category === category;

      const matchesSearch =
        !s ||
        (b.title || "").toLowerCase().includes(s) ||
        (b.slug || "").toLowerCase().includes(s) ||
        (b.excerpt || "").toLowerCase().includes(s);

      return matchesCategory && matchesSearch;
    });
  }, [blogs, category, search]);

  const publishBlog = async (id) => {
    try {
      await updateDoc(doc(db, "blogs", id), {
        status: "published",
        publishedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      fetchFirstPage();
    } catch (err) {
      console.error(err);
      alert("Failed to publish blog.");
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
      console.error(err);
      alert("Failed to unpublish blog.");
    }
  };

  const deleteBlog = async (id, title) => {
    const ok = confirm(`Delete blog "${title}"? This cannot be undone.`);
    if (!ok) return;

    try {
      await deleteDoc(doc(db, "blogs", id));
      fetchFirstPage();
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog.");
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
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
            className="inline-flex justify-center rounded-md bg-orange-600 px-5 py-3 text-white font-medium hover:bg-orange-700"
          >
            + New Blog
          </Link>
        </div>

        {/* TABS */}
        <div className="mt-10 flex flex-wrap gap-3">
          {[
            { key: "all", label: "All" },
            { key: "draft", label: "Drafts" },
            { key: "published", label: "Published" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-full px-4 py-2 text-sm border ${
                tab === t.key
                  ? "bg-orange-600 text-white border-orange-600"
                  : "hover:bg-gray-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* FILTERS */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title / excerpt / slug"
            className="w-full rounded-lg border px-4 py-3"
          />

          <select
            className="w-full rounded-lg border px-4 py-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All categories</option>
            <option value="Hairstyle">Hairstyle</option>
            <option value="Beard">Beard</option>
            <option value="Facility">Facility</option>
            <option value="Grooming">Grooming</option>
          </select>

          <button
            onClick={fetchFirstPage}
            className="rounded-lg border px-4 py-3 hover:bg-gray-50"
          >
            Refresh
          </button>
        </div>

        {/* STATES */}
        {loading && <p className="text-center py-24">Loading…</p>}
        {error && <p className="text-center py-10 text-red-600">{error}</p>}

        {!loading && !error && filteredBlogs.length === 0 && (
          <p className="text-center py-24 text-gray-600">
            No blogs found.
          </p>
        )}

        {/* LIST */}
        {!loading && !error && filteredBlogs.length > 0 && (
          <div className="mt-10 overflow-x-auto border rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left px-4 py-3">Title</th>
                  <th className="text-left px-4 py-3">Category</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Created</th>
                  <th className="text-left px-4 py-3">Published</th>
                  <th className="text-right px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredBlogs.map((b) => (
                  <tr key={b.id} className="border-t">
                    <td className="px-4 py-4">
                      <div className="font-medium text-gray-900">
                        {b.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {b.slug}
                      </div>
                    </td>

                    <td className="px-4 py-4">{b.category || "-"}</td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          b.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>

                    <td className="px-4 py-4">{formatDate(b.createdAt)}</td>
                    <td className="px-4 py-4">{formatDate(b.publishedAt)}</td>

                    <td className="px-4 py-4">
                      <div className="flex gap-2 justify-end flex-wrap">
                        <Link
                          to={`/admin/blogs/${b.id}/edit`}
                          className="rounded border px-3 py-2 hover:bg-gray-50"
                        >
                          Edit
                        </Link>

                        {b.status === "draft" ? (
                          <button
                            onClick={() => publishBlog(b.id)}
                            className="rounded bg-orange-600 px-3 py-2 text-white hover:bg-orange-700"
                          >
                            Publish
                          </button>
                        ) : (
                          <button
                            onClick={() => unpublishBlog(b.id)}
                            className="rounded border px-3 py-2 hover:bg-gray-50"
                          >
                            Unpublish
                          </button>
                        )}

                        <button
                          onClick={() => deleteBlog(b.id, b.title)}
                          className="rounded border px-3 py-2 text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>

                        {b.status === "published" && (
                          <Link
                            to={`/blog/${b.slug}`}
                            className="rounded border px-3 py-2 hover:bg-gray-50"
                            target="_blank"
                            rel="noreferrer"
                          >
                            View
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* LOAD MORE */}
        {!loading && !error && hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={fetchMore}
              disabled={loadingMore}
              className="rounded-lg border px-6 py-3 hover:bg-gray-50 disabled:opacity-60"
            >
              {loadingMore ? "Loading…" : "Load more"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
