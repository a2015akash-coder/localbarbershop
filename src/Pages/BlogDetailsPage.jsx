import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import SEO from "../components/SEO";

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

  return (
    <>
      <SEO
        title={blog.metaTitle || blog.title}
        description={blog.metaDescription || blog.excerpt}
        canonical={`https://thegroomingroom.com.au/blogs/${blog.slug}`}
        robots="index, follow, max-image-preview:large"
      />

      <section className="bg-[#fafafa] py-16 sm:py-20">
        <div className="mx-auto max-w-[760px] px-4">

          <Link
            to="/blogs"
            className="inline-block mb-6 text-sm font-medium text-orange-600 hover:underline"
          >
            ← All posts
          </Link>

          <div className="text-xs uppercase tracking-wide text-gray-500">
            {blog.category}
          </div>

          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-gray-900 leading-tight">
            {blog.title}
          </h1>

          <div className="mt-3 text-sm text-gray-500">
            {blog.publishedAt?.toDate().toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>

          <div className="mt-6 h-px w-20 bg-gray-300" />

<article
  className="
    prose
    prose-gray
    max-w-none
    mt-8

    prose-h2:text-[#F4511E]
    prose-h2:font-semibold
    prose-h2:mt-12
    prose-h2:mb-4

    prose-a:text-blue-600
    prose-a:font-medium
    prose-a:no-underline
    hover:prose-a:underline
    prose-a:transition-colors
  "
>
  {Array.isArray(blog.content) &&
    blog.content.map((block, i) => {
      if (block.type === "heading") {
        return <h2 key={i}>{block.text}</h2>;
      }

      if (block.type === "richtext") {
        return (
          <div
            key={i}
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
        );
      }

      return null;
    })}
</article>


        </div>
      </section>
    </>
  );
}
