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
          where("slug", "==", slug)
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          setError("Blog not found.");
          return;
        }

        const data = snapshot.docs[0].data();

        if (data.status !== "published") {
          setError("Blog not available.");
          return;
        }

        setBlog(data);
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

  if (!Array.isArray(blog.content)) {
    return <p className="text-center py-24">Invalid blog content.</p>;
  }
return (
  <section className="bg-[#fafafa] py-16 sm:py-20">
    <div className="mx-auto max-w-[760px] px-4">

      {/* Back link */}
      <Link
        to="/blogs"
        className="inline-block mb-6 text-sm font-medium text-orange-600 hover:underline"
      >
        ← All posts
      </Link>

      {/* Category */}
      <div className="text-xs uppercase tracking-wide text-gray-500">
        {blog.category}
      </div>

      {/* Title */}
      <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-gray-900 leading-tight">
        {blog.title}
      </h1>

      {/* Meta */}
      <div className="mt-3 text-sm text-gray-500">
        {blog.publishedAt?.toDate().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </div>

      {/* Divider */}
      <div className="mt-6 h-px w-20 bg-gray-300" />

      {/* Article */}
      <article className="mt-10 space-y-8 text-[17px] leading-[1.75] text-gray-800">

        {/* NORMAL SIZED IMAGE CARD */}
        {blog.coverImage && (
          <div className="my-8 rounded-2xl border border-gray-200 bg-white p-4">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full rounded-xl object-cover max-h-[360px]"
              loading="lazy"
            />
          </div>
        )}

        {/* Content blocks */}
        {blog.content.map((block, i) => {
          if (block.type === "heading") {
            return (
              <h2
                key={i}
                className="mt-10 text-2xl font-semibold text-gray-900 leading-snug"
              >
                {block.text}
              </h2>
            );
          }

          if (block.type === "paragraph") {
            return (
              <p key={i} className="text-left">
                {block.text}
              </p>
            );
          }

          if (block.type === "image") {
            return (
              <div
                key={i}
                className="my-10 rounded-2xl border border-gray-200 bg-white p-4"
              >
                <img
                  src={block.src}
                  alt={block.alt || ""}
                  className="w-full rounded-xl object-cover max-h-[360px]"
                  loading="lazy"
                />
                {block.alt && (
                  <p className="mt-2 text-sm text-gray-500">
                    {block.alt}
                  </p>
                )}
              </div>
            );
          }

          return null;
        })}

      </article>

      {/* Footer CTA */}
      <div className="mt-16 rounded-xl bg-white border border-gray-200 p-6 text-left">
        <p className="text-gray-700">
          Ready for a fresh haircut or beard trim?
        </p>

        <Link
          to="/mens-haircuts-beard-trims-kellyville"
          className="mt-3 inline-flex items-center text-orange-600 font-semibold hover:underline"
        >
          View our services →
        </Link>
      </div>

    </div>
  </section>
);

}
