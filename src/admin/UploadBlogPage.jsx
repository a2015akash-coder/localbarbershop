import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Button, Upload, Progress, message, Divider } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { db } from "../firebase";
import RichTextEditor from "../components/RichTextEditor";

/* ================= CLOUDINARY ================= */

const uploadToCloudinary = (file, onProgress) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "blog_uploads");
    formData.append("folder", "blog-images");

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      const res = JSON.parse(xhr.responseText);
      resolve(res.secure_url);
    };

    xhr.onerror = reject;

    xhr.open(
      "POST",
      "https://api.cloudinary.com/v1_1/dvtbbuxon/image/upload"
    );
    xhr.send(formData);
  });

/* ================= HELPERS ================= */

const slugify = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const getCounterColor = (length, limit) => {
  if (length > limit) return "text-red-600";
  if (length > limit * 0.9) return "text-orange-500";
  return "text-gray-400";
};

/* ================= PAGE ================= */

export default function UploadBlogPage() {
  const navigate = useNavigate();

  /* -------- Display Content -------- */
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Hairstyle");

  /* -------- SEO -------- */
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [slug, setSlug] = useState("");

  /* -------- Cover -------- */
  const [coverImage, setCoverImage] = useState("");
  const [coverProgress, setCoverProgress] = useState(0);

  /* -------- Content -------- */
  const [blocks, setBlocks] = useState([]);
  const [saving, setSaving] = useState(false);

  /* ================= BLOCK HELPERS ================= */

  const addBlock = (type) => {
    setBlocks((prev) => [
      ...prev,
      type === "heading"
        ? { type: "heading", text: "" }
        : type === "image"
        ? { type: "image", src: "", alt: "" }
        : { type: "richtext", html: "" },
    ]);
  };

  const updateBlock = (i, key, value) => {
    setBlocks((prev) => {
      const copy = [...prev];
      copy[i] = { ...copy[i], [key]: value };
      return copy;
    });
  };

  const removeBlock = (i) =>
    setBlocks((prev) => prev.filter((_, idx) => idx !== i));

  /* ================= SAVE ================= */

  const saveBlog = async (publish = false) => {
    if (!title || !excerpt) {
      message.error("Title and excerpt are required");
      return;
    }

    if (publish && !coverImage) {
      message.error("Cover image is required to publish");
      return;
    }

    setSaving(true);

    try {
      await addDoc(collection(db, "blogs"), {
        title,
        excerpt,
        category,

        slug: slug || slugify(title),
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || excerpt,

        status: publish ? "published" : "draft",

        coverImage,
        content: blocks,

        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        publishedAt: publish ? serverTimestamp() : null,
      });

      message.success(publish ? "Blog published" : "Draft saved");
      navigate("/admin");
    } catch (err) {
      console.error(err);
      message.error("Failed to save blog");
    } finally {
      setSaving(false);
    }
  };

  /* ================= UI ================= */

  return (
    <section className="bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 space-y-8">

        <nav className="text-sm text-gray-500">
          <Link to="/admin" className="hover:underline">Admin</Link> / New Blog
        </nav>

        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Upload Blog</h1>
          <Button onClick={() => navigate(-1)}>Back</Button>
        </div>

        {/* META SECTION */}
        <div className="bg-white rounded-xl p-6 space-y-6">

          <input
            className="w-full rounded border px-4 py-3"
            placeholder="Blog title (H1)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            rows={3}
            className="w-full rounded border px-4 py-3"
            placeholder="Excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />

          <Divider />

          <p className="font-medium text-gray-700">SEO Settings</p>

          {/* Meta Title */}
          <div>
            <input
              className="w-full rounded border px-4 py-3"
              placeholder="Meta title (60 characters ideal)"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
            />
            <div className={`text-xs mt-1 text-right ${getCounterColor(metaTitle.length, 60)}`}>
              {metaTitle.length}/60 characters
            </div>
          </div>

          {/* Meta Description */}
          <div>
            <textarea
              rows={2}
              className="w-full rounded border px-4 py-3"
              placeholder="Meta description (150–160 characters ideal)"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
            />
            <div className={`text-xs mt-1 text-right ${getCounterColor(metaDescription.length, 160)}`}>
              {metaDescription.length}/160 characters
            </div>
          </div>

          {/* Slug */}
          <div>
            <input
              className="w-full rounded border px-4 py-3"
              placeholder="Custom slug (e.g. best-skin-fade-kellyville)"
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
            />
            <div className={`text-xs mt-1 text-right ${getCounterColor(slug.length, 75)}`}>
              {slug.length}/75 characters
            </div>
          </div>
        </div>

        {/* COVER IMAGE */}
        <div className="bg-white rounded-xl p-6">
          <p className="font-medium mb-3">Cover image</p>

          <Upload
            showUploadList={false}
            customRequest={async ({ file, onSuccess }) => {
              setCoverProgress(0);
              const url = await uploadToCloudinary(file, setCoverProgress);
              setCoverImage(url);
              setCoverProgress(100);
              onSuccess();
            }}
          >
            <Button icon={<UploadOutlined />}>Upload cover</Button>
          </Upload>

          {coverProgress > 0 && coverProgress < 100 && (
            <Progress percent={coverProgress} className="mt-3" />
          )}

          {coverImage && (
            <img
              src={coverImage}
              className="mt-4 rounded-lg h-56 w-full object-cover"
              alt="Cover preview"
            />
          )}
        </div>

        {/* CONTENT BLOCKS */}
        <Divider orientation="left">Content</Divider>

        {blocks.map((b, i) => (
          <div key={i} className="bg-white rounded-xl p-6 space-y-4 border">

            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wide text-gray-400">
                {b.type}
              </span>
              <Button
                danger
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => removeBlock(i)}
              />
            </div>

            {b.type === "heading" && (
              <input
                className="w-full rounded border px-3 py-2"
                placeholder="Heading"
                value={b.text}
                onChange={(e) => updateBlock(i, "text", e.target.value)}
              />
            )}

            {b.type === "richtext" && (
              <RichTextEditor
                value={b.html}
                onChange={(html) => updateBlock(i, "html", html)}
              />
            )}

            {b.type === "image" && (
              <>
                <Upload
                  showUploadList={false}
                  customRequest={async ({ file, onSuccess }) => {
                    const url = await uploadToCloudinary(file);
                    updateBlock(i, "src", url);
                    onSuccess();
                  }}
                >
                  <Button icon={<UploadOutlined />}>Upload image</Button>
                </Upload>

                {b.src && (
                  <img
                    src={b.src}
                    className="mt-3 rounded-lg h-48 w-full object-cover"
                    alt=""
                  />
                )}

                <input
                  className="w-full rounded border px-3 py-2"
                  placeholder="Alt text (optional)"
                  value={b.alt}
                  onChange={(e) => updateBlock(i, "alt", e.target.value)}
                />
              </>
            )}
          </div>
        ))}

        <div className="flex gap-3">
          <Button onClick={() => addBlock("heading")}>+ Heading</Button>
          <Button onClick={() => addBlock("richtext")}>+ Content</Button>
          <Button onClick={() => addBlock("image")}>+ Image</Button>
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <Button loading={saving} onClick={() => saveBlog(false)}>
            Save Draft
          </Button>

          <Button
            type="primary"
            size="large"
            loading={saving}
            onClick={() => saveBlog(true)}
          >
            Publish
          </Button>
        </div>

      </div>
    </section>
  );
}
