import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

let blogCache = null;

// Static categories for now (can be dynamic later)
const CATEGORIES = [
  "Haircuts",
  "Beard Care",
  "Styling Tips",
  "Barber Advice",
  "Grooming Products",
];

/* ---------------- SKELETONS ---------------- */

function BlogCardSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-8 rounded-3xl bg-slate-50 p-6 animate-pulse">
      <div className="w-full sm:w-64 h-48 rounded-2xl bg-gray-200" />

      <div className="flex-1 space-y-4">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-6 w-3/4 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 rounded" />
        <div className="h-4 w-32 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

function SidebarSkeleton() {
  return (
    <div className="sticky top-28 rounded-3xl bg-slate-50 p-6 animate-pulse">
      <div className="h-5 w-32 bg-gray-200 rounded mb-6" />
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-9 w-full rounded-xl bg-gray-200" />
        ))}
      </div>
    </div>
  );
}

/* ---------------- PAGE ---------------- */

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (blogCache) {
          setBlogs(blogCache);
          setLoading(false);
          return;
        }

        const q = query(
          collection(db, "blogs"),
          where("status", "==", "published"),
          orderBy("publishedAt", "desc"),
          limit(6)
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        blogCache = data;
        setBlogs(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load blog posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  /* -------- LOADING STATE (SKELETON) -------- */

  if (loading) {
    return (
      <section className="bg-white py-20">
        <div className="max-w-screen-xl mx-auto px-4">
          {/* Header skeleton */}
          <div className="max-w-2xl mb-14 animate-pulse">
            <div className="h-6 w-24 bg-gray-200 rounded mb-4" />
            <div className="h-10 w-3/4 bg-gray-200 rounded mb-4" />
            <div className="h-5 w-full bg-gray-200 rounded" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-10">
              {[...Array(3)].map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>

            <aside className="lg:col-span-4">
              <SidebarSkeleton />
            </aside>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <p className="text-center py-24 text-red-600">{error}</p>;
  }

  /* -------- CONTENT -------- */

  return (
    <section className="bg-white py-20">
      <div className="max-w-screen-xl mx-auto px-4">

        {/* PAGE HEADER */}
        <div className="max-w-2xl mb-14">
          <span className="inline-block mb-4 rounded-full bg-orange-50 px-5 py-2 text-sm font-semibold text-orange-600">
            Blog
          </span>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
            Grooming Tips & Barber Advice
          </h1>

          <p className="mt-4 text-gray-600 text-base sm:text-lg">
            Practical haircut, beard, and grooming advice from the barbers at
            The Grooming Room.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* BLOG LIST */}
          <div className="lg:col-span-8 space-y-10">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="
                  group
                  flex flex-col sm:flex-row gap-8
                  rounded-3xl
                  bg-slate-50
                  p-6
                  hover:bg-white hover:shadow-md
                  transition
                "
              >
                {/* IMAGE */}
                {blog.coverImage && (
                  <Link to={`/blog/${blog.slug}`} className="shrink-0">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="
                        w-full sm:w-64
                        h-48
                        rounded-2xl
                        object-cover
                        transition-transform
                        group-hover:scale-[1.03]
                      "
                      loading="lazy"
                    />
                  </Link>
                )}

                {/* CONTENT */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="text-sm text-gray-500">
                      {blog.publishedAt
                        ?.toDate()
                        .toLocaleDateString("en-GB")}
                    </div>

                    <h2 className="mt-1 text-2xl font-semibold text-gray-900">
                      <Link
                        to={`/blog/${blog.slug}`}
                        className="hover:text-orange-600 transition"
                      >
                        {blog.title}
                      </Link>
                    </h2>

                    <p className="mt-3 text-gray-600 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-5">
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="
                        inline-flex items-center gap-2
                        text-sm font-semibold
                        text-orange-600
                        hover:text-orange-700
                        transition
                      "
                    >
                      Continue reading
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 rounded-3xl bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Categories
              </h3>

              <ul className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <button
                      className="
                        w-full text-left
                        rounded-xl px-4 py-2
                        text-sm font-medium
                        text-gray-700
                        hover:bg-white hover:text-orange-600
                        transition
                      "
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>

              {/* SIDEBAR CTA */}
              <div className="mt-6 rounded-2xl bg-white p-4 text-sm text-gray-600">
                Looking for a fresh cut?
                <Link
                  to="/services"
                  className="block mt-2 font-semibold text-orange-600 hover:text-orange-700"
                >
                  View our services →
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}
