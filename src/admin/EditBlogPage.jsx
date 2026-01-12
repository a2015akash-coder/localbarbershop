import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

/* HELPERS */
const sanitizeText = (text) => text.replace(/\s+/g, " ").trim();

/* CARD WRAPPER */
function Card({ children }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition">
      {children}
    </div>
  );
}

export default function EditBlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("Hairstyle");
  const [status, setStatus] = useState("draft");
  const [content, setContent] = useState([{ type: "paragraph", text: "" }]);

  /* LOAD BLOG */
  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, "blogs", id));
        if (!snap.exists()) {
          alert("Blog not found");
          navigate("/admin");
          return;
        }

        const d = snap.data();
        setTitle(d.title || "");
        setExcerpt(d.excerpt || "");
        setCoverImage(d.coverImage || "");
        setCategory(d.category || "Hairstyle");
        setStatus(d.status || "draft");
        setContent(Array.isArray(d.content) ? d.content : [{ type: "paragraph", text: "" }]);
      } catch {
        alert("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, navigate]);

  /* CONTENT HANDLERS */
  const updateBlock = (i, k, v) => {
    setContent((prev) => {
      const copy = [...prev];
      copy[i][k] = v;
      return copy;
    });
  };

  const addBlock = (type) => {
    setContent((p) => [
      ...p,
      type === "image"
        ? { type: "image", src: "", alt: "" }
        : { type, text: "" },
    ]);
  };

  const removeBlock = (i) => {
    setContent((p) => p.filter((_, idx) => idx !== i));
  };

  /* CLOUDINARY */
  const openCloudinaryWidget = (onUpload) => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "dvtbbuxon",
        uploadPreset: "blog_uploads",
        multiple: false,
        folder: "blog-images",
      },
      (_, result) => {
        if (result?.event === "success") {
          onUpload(result.info.secure_url);
        }
      }
    );
  };

  /* SAVE */
  const save = async () => {
    if (!title || !excerpt || saving) return;
    setSaving(true);

    try {
      await updateDoc(doc(db, "blogs", id), {
        title: sanitizeText(title),
        excerpt: sanitizeText(excerpt),
        coverImage,
        category,
        status,
        content: content.map((b) => ({
          ...b,
          text: b.text ? sanitizeText(b.text) : "",
          alt: b.alt ? sanitizeText(b.alt) : "",
        })),
        updatedAt: serverTimestamp(),
        publishedAt: status === "published" ? serverTimestamp() : null,
      });

      navigate("/admin");
    } catch {
      alert("Failed to save blog");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="py-24 text-center">Loading…</p>;

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-screen-lg mx-auto px-4 space-y-8">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Edit Blog
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Update content, metadata, and publishing status.
            </p>
          </div>

          <Link
            to="/admin"
            className="rounded-xl border px-5 py-3 text-sm hover:bg-gray-100"
          >
            ← Back
          </Link>
        </div>

        {/* META */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              className="rounded-xl border px-4 py-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Blog title"
            />

            <select
              className="rounded-xl border px-4 py-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Hairstyle</option>
              <option>Beard</option>
              <option>Facility</option>
              <option>Grooming</option>
            </select>

            <textarea
              rows={3}
              className="md:col-span-2 rounded-xl border px-4 py-3"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Excerpt (used in listings and SEO)"
            />

            <select
              className="rounded-xl border px-4 py-3"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </Card>

        {/* COVER IMAGE */}
        <Card>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Cover Image</h3>
              <button
                onClick={() => openCloudinaryWidget(setCoverImage)}
                className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
              >
                Upload Image
              </button>
            </div>

            {coverImage && (
              <img
                src={coverImage}
                alt="Cover"
                className="rounded-xl h-56 w-full object-cover"
              />
            )}
          </div>
        </Card>

        {/* CONTENT */}
        <Card>
          <h3 className="font-semibold mb-6">Content Blocks</h3>

          <div className="space-y-6">
            {content.map((block, i) => (
              <div key={i} className="rounded-xl bg-gray-50 p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium uppercase text-gray-500">
                    {block.type}
                  </span>
                  <button
                    onClick={() => removeBlock(i)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>

                {block.type === "paragraph" && (
                  <textarea
                    rows={4}
                    className="w-full rounded-lg border px-3 py-2"
                    value={block.text}
                    onChange={(e) => updateBlock(i, "text", e.target.value)}
                  />
                )}

                {block.type === "heading" && (
                  <input
                    className="w-full rounded-lg border px-3 py-2"
                    value={block.text}
                    onChange={(e) => updateBlock(i, "text", e.target.value)}
                  />
                )}

                {block.type === "image" && (
                  <div className="space-y-3">
                    <button
                      onClick={() =>
                        openCloudinaryWidget((url) =>
                          updateBlock(i, "src", url)
                        )
                      }
                      className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Upload Image
                    </button>

                    {block.src && (
                      <img
                        src={block.src}
                        alt=""
                        className="h-40 rounded-lg object-cover"
                      />
                    )}

                    <input
                      placeholder="Alt text"
                      className="w-full rounded-lg border px-3 py-2"
                      value={block.alt || ""}
                      onChange={(e) => updateBlock(i, "alt", e.target.value)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => addBlock("paragraph")} className="rounded-lg border px-4 py-2">
              + Paragraph
            </button>
            <button onClick={() => addBlock("heading")} className="rounded-lg border px-4 py-2">
              + Heading
            </button>
            <button onClick={() => addBlock("image")} className="rounded-lg border px-4 py-2">
              + Image
            </button>
          </div>
        </Card>

        {/* SAVE */}
        <div className="flex justify-end">
          <button
            onClick={save}
            disabled={saving}
            className="rounded-full bg-orange-600 px-10 py-4 text-white font-semibold hover:bg-orange-700 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </section>
  );
}
