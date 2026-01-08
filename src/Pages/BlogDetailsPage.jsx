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
    <section className="bg-white py-20">
      <div className="max-w-3xl mx-auto px-4">
        <Link to="/blogs" className="text-orange-600 text-sm">
          ← All Posts
        </Link>

        <h1 className="mt-6 text-4xl font-semibold">{blog.title}</h1>

        <div className="mt-3 text-sm text-gray-500">
          {blog.publishedAt?.toDate().toLocaleDateString("en-GB")} | {blog.category}
        </div>

        {blog.coverImage && (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="mt-10 rounded-lg w-full"
          />
        )}

        <div className="mt-12 space-y-8">
          {blog.content.map((block, i) => {
            if (block.type === "heading") {
              return <h2 key={i} className="text-2xl font-semibold">{block.text}</h2>;
            }
            if (block.type === "paragraph") {
              return <p key={i}>{block.text}</p>;
            }
            if (block.type === "image") {
              return (
                <img
                  key={i}
                  src={block.src}
                  alt={block.alt || ""}
                  className="rounded-lg"
                  loading="lazy"
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </section>
  );
}