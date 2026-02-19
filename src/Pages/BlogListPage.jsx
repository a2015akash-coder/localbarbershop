import { useEffect, useRef, useState, useMemo } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { seoPages } from "../seo/pages";
import SEO from "../components/SEO";

const PAGE_SIZE = 15;
const DEBOUNCE_DELAY = 300;
let blogCache = null;

/* ---------------- IMAGE OPTIMIZER ---------------- */

function optimizeImage(url) {
  if (!url || !url.includes("cloudinary")) return url;

  return url.replace(
    "/upload/",
    "/upload/f_auto,q_auto,w_800/"
  );
}

/* ---------------- EMPTY STATE ---------------- */

function EmptyStateCard({ isAdmin }) {
  return (
    <div className="rounded-2xl bg-gray-50 p-10 text-center">
      <h2 className="text-xl font-semibold text-gray-900">
        No blog posts yet
      </h2>

      <p className="mt-3 text-gray-600 max-w-xl mx-auto">
        Fresh grooming tips and style guides are coming soon.
      </p>

      <div className="mt-6 flex justify-center gap-3 flex-wrap">
        <Link
          to="/"
          className="rounded-full border border-gray-300 bg-white px-5 py-2 text-sm hover:bg-gray-100"
        >
          Back to Home
        </Link>

        {isAdmin && (
          <Link
            to="/admin/blogs/new"
            className="rounded-full bg-orange-600 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-700"
          >
            + Upload first blog
          </Link>
        )}
      </div>
    </div>
  );
}

/* ---------------- MAIN PAGE ---------------- */

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);

  const unsubscribeRef = useRef(null);
  const debounceTimerRef = useRef(null);

  /* -------- ADMIN DETECTION -------- */

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsAdmin(false);
        return;
      }
      const token = await user.getIdTokenResult();
      setIsAdmin(token.claims.admin === true);
    });

    return () => unsub();
  }, []);

  /* -------- FETCH BLOGS -------- */

  useEffect(() => {
    const q = query(
      collection(db, "blogs"),
      where("status", "==", "published"),
      orderBy("publishedAt", "desc"),
      limit(PAGE_SIZE)
    );

    const cleanup = () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };

    const fetchPublic = async () => {
      try {
        setLoading(true);

        if (blogCache) {
          setBlogs(blogCache);
          setLoading(false);
          return;
        }

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        blogCache = data;
        setBlogs(data);
      } catch {
        setError("Failed to load blog posts.");
      } finally {
        setLoading(false);
      }
    };

    const listenAdmin = () => {
      cleanup();
      unsubscribeRef.current = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        blogCache = data;
        setBlogs(data);
        setLoading(false);
      });
    };

    if (isAdmin) {
      listenAdmin();
    } else {
      fetchPublic();
    }

    return cleanup;
  }, [isAdmin]);

  /* -------- SEARCH FILTER (MEMOIZED) -------- */

  const filteredBlogs = useMemo(() => {
    const q = search.toLowerCase();

    return blogs.filter((blog) =>
      blog.title?.toLowerCase().includes(q) ||
      blog.excerpt?.toLowerCase().includes(q) ||
      blog.category?.toLowerCase().includes(q)
    );
  }, [blogs, search]);

  const displayedBlogs = filteredBlogs.slice(0, displayCount);

  if (loading) return <p className="py-24 text-center">Loading blogs…</p>;
  if (error) return <p className="py-24 text-center text-red-600">{error}</p>;

  return (
    <section className="bg-white py-20">
      <SEO {...seoPages.blogs} />

      <div className="max-w-screen-xl mx-auto px-4">
        {/* ---------------- HEADER ---------------- */}

        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="inline-block mb-4 rounded-full bg-gray-100 px-4 py-1 text-sm font-medium text-gray-700">
            Blog
          </span>

          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            Discover our latest news
          </h1>

          <p className="mt-4 text-gray-600">
            Grooming tips, barber insights, and practical advice.
          </p>

          {/* SEARCH */}
          <div className="mt-8 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search by title, category, or keyword"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                clearTimeout(debounceTimerRef.current);
                debounceTimerRef.current = setTimeout(() => {
                  setDisplayCount(PAGE_SIZE);
                }, DEBOUNCE_DELAY);
              }}
              className="w-full rounded-full border border-gray-300 px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* ---------------- BLOG GRID ---------------- */}

        {filteredBlogs.length === 0 ? (
          <EmptyStateCard isAdmin={isAdmin} />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedBlogs.map((blog, index) => (
                <Link
                  to={`/blog/${blog.slug}`}
                  key={blog.id}
                  className="group relative overflow-hidden rounded-2xl bg-gray-900 aspect-[4/5]"
                >
                  {/* IMAGE */}
                  {blog.coverImage && (
                    <img
                      src={optimizeImage(blog.coverImage)}
                      alt={blog.title}
                      loading={index < 6 ? "eager" : "lazy"}
                      decoding="async"
                      className="
                        absolute inset-0 h-full w-full object-cover
                        transition-transform duration-500
                        group-hover:scale-105
                        will-change-transform
                      "
                    />
                  )}

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* CONTENT */}
                  <div className="absolute bottom-0 p-5 text-white">
                    <span className="inline-block mb-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-900">
                      {blog.category}
                    </span>

                    <h2 className="text-lg font-semibold leading-snug">
                      {blog.title}
                    </h2>

                    <p className="mt-2 text-sm text-white/90 line-clamp-2">
                      {blog.excerpt}
                    </p>

                    <span className="mt-3 inline-block text-sm font-medium text-orange-400">
                      Read more →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* LOAD MORE */}
            {displayCount < filteredBlogs.length && (
              <div className="mt-12 text-center">
                <button
                  onClick={() =>
                    setDisplayCount((prev) => prev + PAGE_SIZE)
                  }
                  className="rounded-full border border-gray-300 px-8 py-3 text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  Load More (
                  {filteredBlogs.length - displayCount} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
