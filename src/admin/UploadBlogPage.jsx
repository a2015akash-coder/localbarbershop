import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

/* ---------------- CLOUDINARY ---------------- */
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

/* ---------------- HELPERS ---------------- */
const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const createUniqueSlug = (title) => `${slugify(title)}-${Date.now()}`;

const sanitizeText = (text) => text.replace(/\s+/g, " ").trim();

/* ================= PAGE ================= */
export default function UploadBlogPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("Hairstyle");
  const [status, setStatus] = useState("draft");
  const [saving, setSaving] = useState(false);

  // NEW: store last created blog id so admin can jump to edit
  const [lastCreatedId, setLastCreatedId] = useState(null);

  const [content, setContent] = useState([{ type: "paragraph", text: "" }]);

  const addBlock = (type) => {
    setContent((prev) => [
      ...prev,
      type === "image" ? { type: "image", src: "", alt: "" } : { type, text: "" },
    ]);
  };

  const updateBlock = (index, key, value) => {
    setContent((prev) => {
      const copy = [...prev];
      copy[index][key] = value;
      return copy;
    });
  };

  const removeBlock = (index) => {
    setContent((prev) => prev.filter((_, i) => i !== index));
  };

  const submitBlog = async () => {
    if (!title || !excerpt || content.length === 0 || saving) {
      alert("Please fill required fields");
      return;
    }

    setSaving(true);

    try {
      const sanitizedContent = content.map((block) => ({
        ...block,
        text: block.text ? sanitizeText(block.text) : "",
        alt: block.alt ? sanitizeText(block.alt) : "",
      }));

      const docRef = await addDoc(collection(db, "blogs"), {
        title: sanitizeText(title),
        slug: createUniqueSlug(title),
        excerpt: sanitizeText(excerpt),
        coverImage,
        category,
        status,
        content: sanitizedContent,
        publishedAt: status === "published" ? serverTimestamp() : null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(), // ✅ useful for admin sorting later
      });

      // store id for edit navigation
      setLastCreatedId(docRef.id);

      alert("Blog saved successfully");

      // Option A (recommended): redirect to dashboard automatically
      navigate("/admin");

      // If you do NOT want auto redirect and want to stay on page:
      // comment the navigate("/admin") and keep reset below

      // Reset form (optional if redirecting anyway)
      setTitle("");
      setExcerpt("");
      setCoverImage("");
      setCategory("Hairstyle");
      setStatus("draft");
      setContent([{ type: "paragraph", text: "" }]);
    } catch (err) {
      console.error(err);
      alert("Error saving blog");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="bg-white section-spacing">
      <div className="max-w-3xl mx-auto px-4">
        {/* TOP BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-semibold text-gray-900">
            Upload Blog Post
          </h1>

          <div className="flex gap-3 flex-wrap">
            {/* Dashboard navigation */}
            <Link
              to="/admin"
              className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              ← Dashboard
            </Link>

            {/* Edit last created blog */}
            <button
              type="button"
              disabled={!lastCreatedId}
              onClick={() => navigate(`/admin/blogs/${lastCreatedId}/edit`)}
              className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              title={
                lastCreatedId
                  ? "Edit the blog you just created"
                  : "Create a blog first to enable edit"
              }
            >
              Edit Last Created
            </button>
          </div>
        </div>

        {/* BASIC INFO */}
        <div className="mt-8 space-y-5">
          <input
            type="text"
            placeholder="Blog title"
            className="w-full rounded-lg border px-4 py-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Short excerpt"
            className="w-full rounded-lg border px-4 py-3"
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />

          <button
            type="button"
            onClick={() => openCloudinaryWidget(setCoverImage)}
            className="inline-flex rounded-md border px-4 py-2 text-sm"
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

        {/* CONTENT BLOCKS */}
        <div className="mt-12 space-y-6">
          {content.map((block, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium">{block.type}</span>
                <button
                  type="button"
                  onClick={() => removeBlock(i)}
                  className="text-sm text-red-500"
                >
                  Remove
                </button>
              </div>

              {block.type !== "image" && (
                <textarea
                  className="w-full border rounded px-3 py-2"
                  rows={block.type === "paragraph" ? 4 : 2}
                  value={block.text}
                  onChange={(e) => updateBlock(i, "text", e.target.value)}
                />
              )}

              {block.type === "image" && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      openCloudinaryWidget((url) => updateBlock(i, "src", url))
                    }
                    className="border px-4 py-2 rounded"
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
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => addBlock("paragraph")}
            className="border px-4 py-2"
          >
            + Paragraph
          </button>
          <button
            type="button"
            onClick={() => addBlock("heading")}
            className="border px-4 py-2"
          >
            + Heading
          </button>
          <button
            type="button"
            onClick={() => addBlock("image")}
            className="border px-4 py-2"
          >
            + Image
          </button>
        </div>

        <button
          type="button"
          onClick={submitBlog}
          disabled={saving}
          className="mt-12 rounded-full bg-orange-600 px-8 py-3 text-white font-semibold disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save Blog"}
        </button>
      </div>
    </section>
  );
}
