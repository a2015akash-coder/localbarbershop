import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import SEO from "../components/SEO";
import { getBlogPostJsonLd } from "../seo/jsonLd";
import {
  BLOG_DETAIL_BASE_PATH,
  BLOG_LIST_PATH,
  normalizeBlogContentBlocks,
} from "../utils/blogLinkUtils";

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const q = query(collection(db, "blogs"), where("slug", "==", slug));
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
    return <p className="py-24 text-center text-red-600">{error}</p>;
  }

  if (!blog) {
    return <p className="py-24 text-center">Loading...</p>;
  }

  const contentBlocks = normalizeBlogContentBlocks(
    Array.isArray(blog.content) ? blog.content : []
  );

  return (
    <>
      <SEO
        title={blog.metaTitle || blog.title}
        description={blog.metaDescription || blog.excerpt}
        canonical={`https://thegroomingroom.com.au${BLOG_DETAIL_BASE_PATH}/${blog.slug}`}
        robots="index, follow, max-image-preview:large"
        jsonLd={getBlogPostJsonLd(blog)}
      />

      <section className="bg-[#fafafa] py-16 sm:py-20">
        <div className="mx-auto max-w-[760px] px-4">
          <Link
            to={BLOG_LIST_PATH}
            className="inline-block mb-6 text-sm font-medium text-orange-600 hover:underline"
          >
            All posts
          </Link>

          <div className="text-xs uppercase tracking-wide text-gray-500">
            {blog.category}
          </div>

          <h1 className="mt-3 text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl">
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
              prose prose-gray mt-8 max-w-none
              prose-h2:mt-12 prose-h2:mb-4 prose-h2:font-semibold prose-h2:text-[#F4511E]
              prose-a:font-medium prose-a:text-blue-600 prose-a:no-underline prose-a:transition-colors
              hover:prose-a:underline
            "
          >
            {contentBlocks.map((block, i) => {
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

              if (block.type === "image") {
                return (
                  <figure key={i}>
                    <img
                      src={block.src}
                      alt={block.alt || ""}
                      loading="lazy"
                      className="rounded-xl"
                    />
                  </figure>
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
