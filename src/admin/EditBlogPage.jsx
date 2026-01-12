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

  useEffect(() => {
    const load = async () => {
      try {
        const ref = doc(db, "blogs", id);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          alert("Blog not found");
          navigate("/admin");
          return;
        }

        const data = snap.data();

        setTitle(data.title || "");
        setExcerpt(data.excerpt || "");
        setCoverImage(data.coverImage || "");
        setCategory(data.category || "Hairstyle");
        setStatus(data.status || "draft");
        setContent(Array.isArray(data.content) ? data.content : [{ type: "paragraph", text: "" }]);
      } catch (err) {
        console.error(err);
        alert("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, navigate]);

  const updateBlock = (index, key, value) => {
    setContent((prev) => {
      const copy = [...prev];
      copy[index][key] = value;
      return copy;
    });
  };

  const addBlock = (type) => {
    setContent((prev) => [
      ...prev,
      type === "image" ? { type: "image", src: "", alt: "" } : { type, text: "" },
    ]);
  };

  const removeBlock = (index) => {
    setContent((prev) => prev.filter((_, i) => i !== index));
  };

  // Cloudinary widget
  const openCloudinaryWidget = (onUpload) => {
    if (!window.cloudinary) {
      alert("Cloudinary widget not loaded");
      return;
    }

    window.cloudinary.openUploadWidget(
      {
        cloudName: "dvtbbuxon",
        uploadPreset: "blog_uploads",
        multiple: false,
        folder: "blog-images",
        resourceType: "image",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          onUpload(result.info.secure_url);
        }
      }
    );
  };

  const save = async () => {
    if (!title || !excerpt || saving) return;
    setSaving(true);

    try {
      const ref = doc(db, "blogs", id);

      await updateDoc(ref, {
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
        // if publishing from edit page:
        publishedAt:
          status === "published" ? serverTimestamp() : null,
      });

      alert("Saved!");
      navigate("/admin");
    } catch (err) {
      console.error(err);
      alert("Failed to save blog");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center py-24">Loading…</p>;

  return (
    <section className="bg-white py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold">Edit Blog</h1>

          <Link
            to="/admin"
            className="rounded border px-4 py-2 text-sm hover:bg-gray-50"
          >
            ← Back
          </Link>
        </div>

        <div className="mt-8 space-y-5">
          <input
            className="w-full rounded-lg border px-4 py-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />

          <textarea
            className="w-full rounded-lg border px-4 py-3"
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Excerpt"
          />

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => openCloudinaryWidget(setCoverImage)}
              className="inline-flex rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
            >
              Upload Cover Image
            </button>

            {coverImage && (
              <img
                src={coverImage}
                alt="Cover preview"
                className="h-48 rounded-lg object-cover"
              />
            )}
          </div>

          <div className="flex gap-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border px-4 py-2"
            >
              <option>Hairstyle</option>
              <option>Beard</option>
              <option>Facility</option>
              <option>Grooming</option>
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border px-4 py-2"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        {/* BLOCKS */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold">Content</h2>

          <div className="mt-4 space-y-6">
            {content.map((block, i) => (
              <div key={i} className="rounded-lg border p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    {block.type.toUpperCase()}
                  </span>
                  <button
                    onClick={() => removeBlock(i)}
                    className="text-sm text-red-500"
                  >
                    Remove
                  </button>
                </div>

                {block.type === "paragraph" && (
                  <textarea
                    rows={4}
                    className="w-full border rounded px-3 py-2"
                    value={block.text}
                    onChange={(e) => updateBlock(i, "text", e.target.value)}
                  />
                )}

                {block.type === "heading" && (
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={block.text}
                    onChange={(e) => updateBlock(i, "text", e.target.value)}
                  />
                )}

                {block.type === "image" && (
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() =>
                        openCloudinaryWidget((url) =>
                          updateBlock(i, "src", url)
                        )
                      }
                      className="inline-flex rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      Upload Image
                    </button>

                    {block.src && (
                      <img
                        src={block.src}
                        alt="Preview"
                        className="h-40 rounded-lg object-cover"
                      />
                    )}

                    <input
                      type="text"
                      placeholder="Alt text"
                      className="w-full border rounded px-3 py-2"
                      value={block.alt || ""}
                      onChange={(e) => updateBlock(i, "alt", e.target.value)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3 flex-wrap">
            <button onClick={() => addBlock("paragraph")} className="px-4 py-2 rounded border">
              + Paragraph
            </button>
            <button onClick={() => addBlock("heading")} className="px-4 py-2 rounded border">
              + Heading
            </button>
            <button onClick={() => addBlock("image")} className="px-4 py-2 rounded border">
              + Image
            </button>
          </div>
        </div>

        <button
          onClick={save}
          disabled={saving}
          className="mt-12 rounded-full bg-orange-600 px-8 py-3 text-white font-semibold disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </section>
  );
}
