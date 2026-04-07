import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Progress, Upload, message } from "antd";
import { ArrowLeft, FileImage, Plus, Save, Sparkles, Trash2 } from "lucide-react";
import { db } from "../firebase";
import { AdminDashboardShell } from "./AdminDashboardShell";
import {
  accentButtonClassName,
  dangerButtonClassName,
  inputClassName,
  secondaryButtonClassName,
  textareaClassName,
} from "./AdminFormClasses";
import {
  CharacterCount,
  EmptyDashedState,
  Field,
  FormCard,
} from "./AdminFormPrimitives";
import { cn } from "../lib/utils";

const uploadToCloudinary = (file, onProgress) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "blog_uploads");
    formData.append("folder", "service-images");

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      try {
        const response = JSON.parse(xhr.responseText);
        if (!response.secure_url) {
          reject(new Error("Cloudinary upload failed"));
          return;
        }
        resolve(response.secure_url);
      } catch (error) {
        reject(error);
      }
    };

    xhr.onerror = reject;
    xhr.open("POST", "https://api.cloudinary.com/v1_1/dvtbbuxon/image/upload");
    xhr.send(formData);
  });

const slugify = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const EMPTY_HIGHLIGHT = { title: "", text: "" };

export default function UploadServicePage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [slug, setSlug] = useState("");
  const [order, setOrder] = useState("0");

  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const [coverImage, setCoverImage] = useState("");
  const [coverImageAlt, setCoverImageAlt] = useState("");
  const [coverProgress, setCoverProgress] = useState(0);

  const [highlights, setHighlights] = useState([]);
  const [saving, setSaving] = useState(false);

  const addHighlight = () => {
    if (highlights.length >= 6) {
      message.warning("Maximum 6 highlights allowed");
      return;
    }
    setHighlights((prev) => [...prev, { ...EMPTY_HIGHLIGHT }]);
  };

  const updateHighlight = (index, key, value) => {
    setHighlights((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
  };

  const removeHighlight = (index) => {
    setHighlights((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const saveService = async () => {
    const cleanTitle = title.trim();
    const cleanExcerpt = excerpt.trim();
    const cleanSlug = slugify(slug || cleanTitle);
    const cleanCoverAlt = coverImageAlt.trim();
    const parsedOrder = Number(order);

    if (!cleanTitle) {
      message.error("Title is required");
      return;
    }

    if (!cleanExcerpt) {
      message.error("Excerpt is required");
      return;
    }

    if (!cleanSlug) {
      message.error("Slug is required");
      return;
    }

    if (!coverImage) {
      message.error("Cover image is required");
      return;
    }

    if (!cleanCoverAlt) {
      message.error("Cover image alt text is required");
      return;
    }

    if (!Number.isFinite(parsedOrder)) {
      message.error("Order must be a valid number");
      return;
    }

    const cleanHighlights = highlights
      .map((highlight) => ({
        title: (highlight.title || "").trim(),
        text: (highlight.text || "").trim(),
      }))
      .filter((highlight) => highlight.title.length > 0);

    setSaving(true);

    try {
      await addDoc(collection(db, "services"), {
        slug: cleanSlug,
        title: cleanTitle,
        excerpt: cleanExcerpt,
        coverImage,
        coverImageAlt: cleanCoverAlt,
        status: "published",
        order: parsedOrder,
        price: price.trim() || "",
        duration: duration.trim() || "",
        metaTitle: metaTitle.trim() || cleanTitle,
        metaDescription: metaDescription.trim() || cleanExcerpt,
        highlights: cleanHighlights,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      message.success("Service created");
      navigate("/admin/services");
    } catch (error) {
      console.error(error);
      message.error("Failed to save service");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminDashboardShell
      title="New service"
      description="Create a public service page with ordering, pricing, SEO, and customer-facing highlights."
      eyebrow="Service editor"
      action={
        <button
          type="button"
          onClick={() => navigate("/admin/services")}
          className={secondaryButtonClassName}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to services
        </button>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <FormCard
            title="Service details"
            description="Set the content that appears on the service page."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Service title" className="md:col-span-2">
                <input
                  className={inputClassName}
                  placeholder="Skin fade"
                  value={title}
                  onChange={(event) => {
                    const nextTitle = event.target.value;
                    setTitle(nextTitle);
                    if (!slug) setMetaTitle((current) => current || nextTitle);
                  }}
                />
              </Field>

              <Field label="Excerpt" className="md:col-span-2">
                <textarea
                  rows={4}
                  className={textareaClassName}
                  placeholder="Short customer-facing service summary"
                  value={excerpt}
                  onChange={(event) => setExcerpt(event.target.value)}
                />
              </Field>

              <Field label="Order" hint="Lower numbers appear first.">
                <input
                  type="number"
                  className={inputClassName}
                  value={order}
                  onChange={(event) => setOrder(event.target.value)}
                />
              </Field>

              <Field label="Status">
                <input className={inputClassName} value="published" disabled />
              </Field>

              <Field label="Price">
                <input
                  className={inputClassName}
                  placeholder="$35"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
              </Field>

              <Field label="Duration">
                <input
                  className={inputClassName}
                  placeholder="45 minutes"
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                />
              </Field>
            </div>
          </FormCard>

          <FormCard
            title="SEO"
            description="Control how the service page reads in links and search results."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Slug" className="md:col-span-2">
                <input
                  className={inputClassName}
                  placeholder="beard-trim-kellyville"
                  value={slug}
                  onChange={(event) => setSlug(slugify(event.target.value))}
                />
                <CharacterCount value={slug} limit={75} />
              </Field>

              <Field label="Meta title">
                <input
                  className={inputClassName}
                  placeholder="60 characters ideal"
                  value={metaTitle}
                  onChange={(event) => setMetaTitle(event.target.value)}
                />
                <CharacterCount value={metaTitle} limit={60} />
              </Field>

              <Field label="Meta description">
                <textarea
                  rows={3}
                  className={textareaClassName}
                  placeholder="150-160 characters ideal"
                  value={metaDescription}
                  onChange={(event) => setMetaDescription(event.target.value)}
                />
                <CharacterCount value={metaDescription} limit={160} />
              </Field>
            </div>
          </FormCard>

          <FormCard
            title="Highlights"
            description="Add up to six quick selling points for the service page."
          >
            <div className="mb-5 flex justify-end">
              <button
                type="button"
                onClick={addHighlight}
                disabled={highlights.length >= 6}
                className={secondaryButtonClassName}
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                Add highlight
              </button>
            </div>

            {highlights.length === 0 && (
              <EmptyDashedState>No highlights yet.</EmptyDashedState>
            )}

            <div className="space-y-4">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded-md bg-white px-2.5 py-1 text-xs font-medium uppercase text-slate-500">
                      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                      Highlight {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeHighlight(index)}
                      className={cn(dangerButtonClassName, "h-9 px-3")}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                      Remove
                    </button>
                  </div>

                  <div className="grid gap-4">
                    <Field label="Title">
                      <input
                        className={inputClassName}
                        placeholder="Crisp line-up"
                        value={highlight.title}
                        onChange={(event) =>
                          updateHighlight(index, "title", event.target.value)
                        }
                      />
                    </Field>

                    <Field label="Description">
                      <textarea
                        rows={3}
                        className={textareaClassName}
                        placeholder="Short description of this feature"
                        value={highlight.text}
                        onChange={(event) =>
                          updateHighlight(index, "text", event.target.value)
                        }
                      />
                    </Field>
                  </div>
                </div>
              ))}
            </div>
          </FormCard>
        </div>

        <aside className="space-y-6">
          <FormCard
            title="Cover image"
            description="Image and alt text are required."
            className="xl:sticky xl:top-6"
          >
            <Upload
              showUploadList={false}
              customRequest={async ({ file, onSuccess, onError }) => {
                try {
                  setCoverProgress(0);
                  const url = await uploadToCloudinary(file, setCoverProgress);
                  setCoverImage(url);
                  setCoverProgress(100);
                  onSuccess?.("ok");
                } catch (error) {
                  console.error(error);
                  message.error("Failed to upload cover image");
                  onError?.(error);
                }
              }}
            >
              <button type="button" className={secondaryButtonClassName}>
                <FileImage className="h-4 w-4" aria-hidden="true" />
                Upload cover
              </button>
            </Upload>

            {coverProgress > 0 && coverProgress < 100 && (
              <Progress percent={coverProgress} className="mt-4" />
            )}

            {coverImage ? (
              <>
                <img
                  src={coverImage}
                  className="mt-4 h-56 w-full rounded-lg object-cover"
                  alt="Cover preview"
                />
                <Field label="Alt text" className="mt-4">
                  <input
                    className={inputClassName}
                    placeholder="Barber finishing a skin fade"
                    value={coverImageAlt}
                    onChange={(event) => setCoverImageAlt(event.target.value)}
                  />
                </Field>
              </>
            ) : (
              <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
                No cover selected.
              </div>
            )}

            <button
              type="button"
              disabled={saving}
              onClick={saveService}
              className={cn(accentButtonClassName, "mt-6 w-full")}
            >
              <Save className="h-4 w-4" aria-hidden="true" />
              Save service
            </button>
          </FormCard>
        </aside>
      </div>
    </AdminDashboardShell>
  );
}
