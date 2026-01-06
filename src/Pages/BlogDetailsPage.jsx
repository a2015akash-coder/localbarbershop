import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const q = query(
          collection(db, "blogs"),
          where("slug", "==", slug),
          where("status", "==", "published")
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          setError("Blog not found.");
          return;
        }

        setBlog(snapshot.docs[0].data());
      } catch (err) {
        console.error(err);
        setError("Failed to load blog.");
      }
    };

    fetchBlog();
  }, [slug]);

  if (error) {
    return <p className="text-center py-24 text-red-600">{error}</p>;
  }

  if (!blog) {
    return <p className="text-center py-24">Loading…</p>;
  }

  return (
    <section className="bg-white py-20">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-16">

        {/* MAIN CONTENT */}
        <article className="lg:col-span-3 max-w-3xl">

          {/* BACK LINK */}
          <Link
            to="/blogs"
            className="text-sm text-orange-600 font-medium hover:underline"
          >
            ← All Posts
          </Link>

          {/* TITLE */}
          <h1 className="mt-6 text-4xl sm:text-5xl font-semibold text-gray-900 leading-tight">
            {blog.title}
          </h1>

          {/* META */}
          <div className="mt-4 text-sm text-gray-500">
            {blog.publishedAt?.toDate().toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            <span className="mx-2">|</span>
            {blog.category}
          </div>

          {/* HERO IMAGE */}
          {blog.coverImage && (
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="mt-10 w-full rounded-lg object-cover"
            />
          )}

          {/* CONTENT */}
          <div className="mt-12 space-y-8 text-gray-700 leading-relaxed">

            {Array.isArray(blog.content) &&
              blog.content.map((block, i) => {
                if (block.type === "heading") {
                  return (
                    <h2
                      key={i}
                      className="text-2xl font-semibold text-gray-900 mt-12"
                    >
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === "paragraph") {
                  return (
                    <p key={i} className="text-base">
                      {block.text}
                    </p>
                  );
                }

                if (block.type === "image") {
                  return (
                    <img
                      key={i}
                      src={block.src}
                      alt={block.alt || ""}
                      className="rounded-lg my-10"
                    />
                  );
                }

                return null;
              })}
          </div>

          {/* SHARE */}
          <div className="mt-16 text-sm text-gray-600">
            <span className="font-medium">Share this post:</span>
            <span className="ml-4 inline-flex gap-4 text-orange-600">
              <a href="#" className="hover:underline">Facebook</a>
              <a href="#" className="hover:underline">Twitter</a>
            </span>
          </div>
        </article>

        {/* SIDEBAR */}
        <aside className="lg:col-span-1">
          <div className="sticky top-28 space-y-12">

            {/* CATEGORIES */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="text-orange-600 font-medium">All Posts</li>
                <li className="hover:text-orange-600 cursor-pointer">Beard Trim</li>
                <li className="hover:text-orange-600 cursor-pointer">Facility</li>
                <li className="hover:text-orange-600 cursor-pointer">Hairstyle</li>
                <li className="hover:text-orange-600 cursor-pointer">Holiday</li>
                <li className="hover:text-orange-600 cursor-pointer">Shave</li>
                <li className="hover:text-orange-600 cursor-pointer">Skin Fade</li>
              </ul>
            </div>

            {/* RECENT POSTS (STATIC FOR NOW) */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>

              <ul className="space-y-4 text-sm text-gray-700">
                <li>
                  <p className="font-medium leading-snug">
                    Visit Grooming Barbershop in the Heart of Kellyville
                  </p>
                  <span className="text-gray-500">24 Jan 2025</span>
                </li>
                <li>
                  <p className="font-medium leading-snug">
                    The Perfect Fade Cut at The Grooming Barbershop
                  </p>
                  <span className="text-gray-500">20 Jan 2025</span>
                </li>
              </ul>
            </div>

          </div>
        </aside>
      </div>
    </section>
  );
}
