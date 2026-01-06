import { useState } from "react";
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

/* ================= PAGE ================= */
export default function UploadBlogPage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("Hairstyle");
  const [status, setStatus] = useState("draft");

  const [content, setContent] = useState([
    { type: "paragraph", text: "" },
  ]);

  /* ---------- BLOCK HELPERS ---------- */
  const addBlock = (type) => {
    if (type === "image") {
      setContent([...content, { type: "image", src: "", alt: "" }]);
    } else {
      setContent([...content, { type, text: "" }]);
    }
  };

  const updateBlock = (index, key, value) => {
    const updated = [...content];
    updated[index][key] = value;
    setContent(updated);
  };

  const removeBlock = (index) => {
    setContent(content.filter((_, i) => i !== index));
  };

  /* ---------- SUBMIT ---------- */
  const submitBlog = async () => {
    if (!title || !excerpt || content.length === 0) {
      alert("Please fill required fields");
      return;
    }

    try {
      await addDoc(collection(db, "blogs"), {
        title,
        slug: slugify(title),
        excerpt,
        coverImage,
        category,
        status,
        content,
        publishedAt: status === "published" ? serverTimestamp() : null,
        createdAt: serverTimestamp(),
      });

      alert("Blog saved successfully");

      // Reset
      setTitle("");
      setExcerpt("");
      setCoverImage("");
      setCategory("Hairstyle");
      setStatus("draft");
      setContent([{ type: "paragraph", text: "" }]);
    } catch (err) {
      console.error(err);
      alert("Error saving blog");
    }
  };

  return (
    <section className="bg-white section-spacing">
      <div className="max-w-3xl mx-auto px-4">

        <h1 className="text-3xl font-semibold text-gray-900">
          Upload Blog Post
        </h1>

        {/* ================= BASIC INFO ================= */}
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

          {/* Cover Image Upload */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() =>
                openCloudinaryWidget((url) => setCoverImage(url))
              }
              className="inline-flex rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50"
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

        {/* ================= CONTENT BLOCKS ================= */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold">Content</h2>

          <div className="mt-4 space-y-6">
            {content.map((block, i) => (
              <div
                key={i}
                className="rounded-lg border p-4 space-y-3"
              >
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
                    onChange={(e) =>
                      updateBlock(i, "text", e.target.value)
                    }
                  />
                )}

                {block.type === "heading" && (
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={block.text}
                    onChange={(e) =>
                      updateBlock(i, "text", e.target.value)
                    }
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
                      value={block.alt}
                      onChange={(e) =>
                        updateBlock(i, "alt", e.target.value)
                      }
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ADD BLOCK BUTTONS */}
          <div className="mt-6 flex gap-3 flex-wrap">
            <button
              onClick={() => addBlock("paragraph")}
              className="px-4 py-2 rounded border"
            >
              + Paragraph
            </button>
            <button
              onClick={() => addBlock("heading")}
              className="px-4 py-2 rounded border"
            >
              + Heading
            </button>
            <button
              onClick={() => addBlock("image")}
              className="px-4 py-2 rounded border"
            >
              + Image
            </button>
          </div>
        </div>

        {/* ================= SUBMIT ================= */}
        <button
          onClick={submitBlog}
          className="mt-12 rounded-full bg-orange-600 px-8 py-3 text-white font-semibold"
        >
          Save Blog
        </button>
      </div>
    </section>
  );
}
