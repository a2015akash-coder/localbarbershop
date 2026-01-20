import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

/* ================= CLOUDINARY UPLOAD (NO WIDGET) ================= */

const CLOUD_NAME = "dvtbbuxon";
const UPLOAD_PRESET = "blog_uploads";

async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Cloudinary upload failed");
  }

  const data = await res.json();
  return data.secure_url;
}

/* ================= HELPERS ================= */

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const createUniqueSlug = (title) => `${slugify(title)}-${Date.now()}`;
const sanitizeText = (text) => text.replace(/\s+/g, " ").trim();

/* ================= UI CARD ================= */

function Card({ title, children, action }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      {(title || action) && (
        <div className="mb-5 flex items-center justify-between">
          {title && <h3 className="font-semibold text-gray-900">{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

/* ================= PAGE ================= */

export default function UploadBlogPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("Hairstyle");
  const [status, setStatus] = useState("draft");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [lastCreatedId, setLastCreatedId] = useState(null);

  const [content, setContent] = useState([{ type: "paragraph", text: "" }]);

  /* ================= CONTENT BLOCK HELPERS ================= */

  const addBlock = (type) => {
    setContent((prev) => [
      ...prev,
      type === "image"
        ? { type: "image", src: "", alt: "" }
        : { type, text: "" },
    ]);
  };

  const updateBlock = (i, key, value) => {
    setContent((prev) => {
      const copy = [...prev];
      copy[i][key] = value;
      return copy;
    });
  };

  const removeBlock = (i) => {
    setContent((prev) => prev.filter((_, idx) => idx !== i));
  };

  /* ================= SUBMIT ================= */

  const submitBlog = async () => {
    if (!title || !excerpt || saving) {
      alert("Missing required fields");
      return;
    }

    setSaving(true);

    try {
      const docRef = await addDoc(collection(db, "blogs"), {
        title: sanitizeText(title),
        slug: createUniqueSlug(title),
        excerpt: sanitizeText(excerpt),
        coverImage,
        category,
        status,
        content: content.map((b) => ({
          ...b,
          text: b.text ? sanitizeText(b.text) : "",
          alt: b.alt ? sanitizeText(b.alt) : "",
        })),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        publishedAt: status === "published" ? serverTimestamp() : null,
      });

      setLastCreatedId(docRef.id);
      navigate("/admin");
    } catch {
      alert("Failed to save blog");
    } finally {
      setSaving(false);
    }
  };

  /* ================= RENDER ================= */

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-screen-lg px-4 space-y-8">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Upload Blog Post
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Create and publish a new article.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to="/admin"
              className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-100"
            >
              ← Dashboard
            </Link>

            <button
              disabled={!lastCreatedId}
              onClick={() => navigate(`/admin/blogs/${lastCreatedId}/edit`)}
              className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-100 disabled:opacity-50"
            >
              Edit Last Created
            </button>
          </div>
        </div>

        {/* POST DETAILS */}
        <Card title="Post details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              className="rounded-xl border px-4 py-3"
              placeholder="Blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              placeholder="Short excerpt (used in listings & SEO)"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
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
        <Card
          title="Cover image"
          action={
            <label className="cursor-pointer rounded-lg border px-4 py-2 text-sm hover:bg-gray-100">
              {uploading ? "Uploading…" : "Upload image"}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  setUploading(true);
                  try {
                    const url = await uploadToCloudinary(file);
                    setCoverImage(url);
                  } catch {
                    alert("Upload failed");
                  } finally {
                    setUploading(false);
                  }
                }}
              />
            </label>
          }
        >
          {coverImage ? (
            <img
              src={coverImage}
              alt="Cover preview"
              className="h-56 w-full rounded-xl object-cover"
            />
          ) : (
            <p className="text-sm text-gray-500">
              Recommended: landscape image, ~1600×900
            </p>
          )}
        </Card>

        {/* CONTENT */}
        <Card title="Content">
          <div className="space-y-6">
            {content.map((block, i) => (
              <div key={i} className="rounded-xl bg-gray-50 p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase font-medium text-gray-500">
                    {block.type}
                  </span>
                  <button
                    onClick={() => removeBlock(i)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>

                {block.type !== "image" && (
                  <textarea
                    rows={block.type === "paragraph" ? 4 : 2}
                    className="w-full rounded-lg border px-3 py-2"
                    value={block.text}
                    onChange={(e) =>
                      updateBlock(i, "text", e.target.value)
                    }
                  />
                )}

                {block.type === "image" && (
                  <>
                    <label className="inline-block cursor-pointer rounded-lg border px-4 py-2 text-sm hover:bg-gray-100">
                      Upload image
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;

                          setUploading(true);
                          try {
                            const url = await uploadToCloudinary(file);
                            updateBlock(i, "src", url);
                          } catch {
                            alert("Upload failed");
                          } finally {
                            setUploading(false);
                          }
                        }}
                      />
                    </label>

                    {block.src && (
                      <img
                        src={block.src}
                        alt=""
                        className="h-40 rounded-lg object-cover"
                      />
                    )}

                    <input
                      className="w-full rounded-lg border px-3 py-2"
                      placeholder="Alt text"
                      value={block.alt || ""}
                      onChange={(e) =>
                        updateBlock(i, "alt", e.target.value)
                      }
                    />
                  </>
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
            onClick={submitBlog}
            disabled={saving}
            className="rounded-full bg-orange-600 px-10 py-4 font-semibold text-white hover:bg-orange-700 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Blog"}
          </button>
        </div>
      </div>
    </section>
  );
}
