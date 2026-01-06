import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(
          collection(db, "blogs"),
          where("status", "==", "published"),
          orderBy("publishedAt", "desc")
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

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

  if (loading) return <p className="text-center py-24">Loading blogs…</p>;
  if (error) return <p className="text-center py-24 text-red-600">{error}</p>;

  return (
    <section className="bg-white py-20">
      <div className="max-w-screen-xl mx-auto px-4">

        {/* PAGE HEADER */}
        <header className="max-w-3xl mb-16">
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 leading-tight">
            Expert Grooming Tips for the Modern Gentleman
          </h1>

          <div className="mt-4 h-px w-24 bg-gray-300" />

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Stay sharp with our collection of grooming advice, trends, and insider tips.
            From beard care to hair styling, our blog is your go-to resource for
            looking your best every day.
          </p>
        </header>

        {/* LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-14">

          {/* BLOG LIST */}
          <div className="lg:col-span-3 space-y-14">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="flex flex-col sm:flex-row gap-8 pb-14 border-b"
              >
                {/* IMAGE */}
                {blog.coverImage && (
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full sm:w-64 h-44 object-cover rounded"
                  />
                )}

                {/* CONTENT */}
                <div className="flex-1">
                  {/* META */}
                  <div className="text-sm text-gray-500 mb-2">
                    {blog.publishedAt?.toDate().toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    <span className="mx-2">|</span>
                    {blog.category}
                  </div>

                  {/* TITLE */}
                  <h2 className="text-2xl font-semibold text-gray-900 leading-snug">
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="hover:text-orange-600 transition"
                    >
                      {blog.title}
                    </Link>
                  </h2>

                  {/* EXCERPT */}
                  <p className="mt-4 text-gray-600 leading-relaxed">
                    {blog.excerpt}
                  </p>

                  {/* CTA */}
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="inline-block mt-5 text-orange-600 font-medium hover:underline"
                  >
                    Continue Reading
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-6">Categories</h3>

            <ul className="space-y-4 text-gray-800">
              <li className="text-orange-600 font-medium cursor-pointer">
                All Posts
              </li>
              <li className="hover:text-orange-600 cursor-pointer">
                Beard Trim
              </li>
              <li className="hover:text-orange-600 cursor-pointer">
                Facility
              </li>
              <li className="hover:text-orange-600 cursor-pointer">
                Hairstyle
              </li>
              <li className="hover:text-orange-600 cursor-pointer">
                Holiday
              </li>
              <li className="hover:text-orange-600 cursor-pointer">
                Shave
              </li>
              <li className="hover:text-orange-600 cursor-pointer">
                Skin Fade
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
