import { useEffect, useState } from "react";
import { Progress, Upload, message } from "antd";
import { FileImage, Plus, Save, Sparkles, Trash2 } from "lucide-react";
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
import { buildServicePayload, slugify } from "./serviceFormUtils";

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

function ToggleField({ label, hint, checked, onChange }) {
  return (
    <label className="flex h-full cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
      />
      <span className="space-y-1">
        <span className="block text-sm font-medium text-slate-900">{label}</span>
        {hint && <span className="block text-xs leading-5 text-slate-500">{hint}</span>}
      </span>
    </label>
  );
}

function StringListCard({
  title,
  description,
  items,
  addLabel,
  emptyLabel,
  placeholder,
  onAdd,
  onChange,
  onRemove,
}) {
  return (
    <FormCard title={title} description={description}>
      <div className="mb-5 flex justify-end">
        <button type="button" onClick={onAdd} className={secondaryButtonClassName}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          {addLabel}
        </button>
      </div>

      {items.length === 0 && <EmptyDashedState>{emptyLabel}</EmptyDashedState>}

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-slate-200 bg-slate-50 p-4"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-md bg-white px-2.5 py-1 text-xs font-medium uppercase text-slate-500">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Item {index + 1}
              </span>
              <button
                type="button"
                onClick={() => onRemove(index)}
                className={cn(dangerButtonClassName, "h-9 px-3")}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Remove
              </button>
            </div>

            <Field label="Text">
              <input
                className={inputClassName}
                placeholder={placeholder}
                value={item}
                onChange={(event) => onChange(index, event.target.value)}
              />
            </Field>
          </div>
        ))}
      </div>
    </FormCard>
  );
}

function ProcessCard({ steps, onAdd, onChange, onRemove }) {
  return (
    <FormCard
      title="Process"
      description="Map the steps customers can expect during the service."
    >
      <div className="mb-5 flex justify-end">
        <button type="button" onClick={onAdd} className={secondaryButtonClassName}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add step
        </button>
      </div>

      {steps.length === 0 && (
        <EmptyDashedState>No process steps added yet.</EmptyDashedState>
      )}

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="rounded-lg border border-slate-200 bg-slate-50 p-4"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-md bg-white px-2.5 py-1 text-xs font-medium uppercase text-slate-500">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Step {index + 1}
              </span>
              <button
                type="button"
                onClick={() => onRemove(index)}
                className={cn(dangerButtonClassName, "h-9 px-3")}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Remove
              </button>
            </div>

            <div className="grid gap-4">
              <Field label="Step title">
                <input
                  className={inputClassName}
                  placeholder="Consultation"
                  value={step.title}
                  onChange={(event) => onChange(index, "title", event.target.value)}
                />
              </Field>

              <Field label="Step description">
                <textarea
                  rows={3}
                  className={textareaClassName}
                  placeholder="What happens in this step"
                  value={step.description}
                  onChange={(event) =>
                    onChange(index, "description", event.target.value)
                  }
                />
              </Field>
            </div>
          </div>
        ))}
      </div>
    </FormCard>
  );
}

export default function ServiceEditorForm({
  initialValues,
  onSubmit,
  submitLabel,
}) {
  const [form, setForm] = useState(initialValues);
  const [heroProgress, setHeroProgress] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(initialValues);
    setHeroProgress(0);
  }, [initialValues]);

  const updateRootField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateNestedField = (section, key, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const addStringItem = (key) => {
    setForm((prev) => ({
      ...prev,
      [key]: [...prev[key], ""],
    }));
  };

  const updateStringItem = (key, index, value) => {
    setForm((prev) => {
      const next = [...prev[key]];
      next[index] = value;

      return {
        ...prev,
        [key]: next,
      };
    });
  };

  const removeStringItem = (key, index) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const addProcessStep = () => {
    setForm((prev) => ({
      ...prev,
      process: [...prev.process, { title: "", description: "" }],
    }));
  };

  const updateProcessStep = (index, key, value) => {
    setForm((prev) => {
      const next = [...prev.process];
      next[index] = { ...next[index], [key]: value };

      return {
        ...prev,
        process: next,
      };
    });
  };

  const removeProcessStep = (index) => {
    setForm((prev) => ({
      ...prev,
      process: prev.process.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const handleSubmit = async () => {
    const result = buildServicePayload(form);

    if (result.error) {
      message.error(result.error);
      return;
    }

    setSaving(true);

    try {
      await onSubmit(result.payload, { optionalDeletes: result.optionalDeletes });
    } catch {
      // Parent handlers already surface save errors.
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-6">
        <FormCard
          title="Core settings"
          description="Set the main service details and visibility flags."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Service title" className="md:col-span-2">
              <input
                className={inputClassName}
                placeholder="Skin fade"
                value={form.title}
                onChange={(event) => {
                  const nextTitle = event.target.value;

                  setForm((prev) => ({
                    ...prev,
                    title: nextTitle,
                    slug:
                      !prev.slug || prev.slug === slugify(prev.title)
                        ? slugify(nextTitle)
                        : prev.slug,
                    seo: {
                      ...prev.seo,
                      metaTitle:
                        !prev.seo.metaTitle || prev.seo.metaTitle === prev.title
                          ? nextTitle
                          : prev.seo.metaTitle,
                    },
                  }));
                }}
              />
            </Field>

            <Field label="Slug" className="md:col-span-2" hint="Used in the service URL.">
              <input
                className={inputClassName}
                placeholder="skin-fade"
                value={form.slug}
                onChange={(event) =>
                  updateRootField("slug", slugify(event.target.value))
                }
              />
              <CharacterCount value={form.slug} limit={75} />
            </Field>

            <Field label="Duration" hint="Optional, for example 30-40 mins.">
              <input
                className={inputClassName}
                placeholder="30-40 mins"
                value={form.duration}
                onChange={(event) => updateRootField("duration", event.target.value)}
              />
            </Field>

            <div className="grid gap-4">
              <ToggleField
                label="Active service"
                hint="Inactive services stay in admin but can be hidden from the public site."
                checked={form.isActive}
                onChange={(value) => updateRootField("isActive", value)}
              />

              <ToggleField
                label="Recommended service"
                hint="Use this when you want to feature the service more prominently."
                checked={form.isRecommended}
                onChange={(value) => updateRootField("isRecommended", value)}
              />
            </div>
          </div>
        </FormCard>

        <FormCard
          title="Hero content"
          description="Control the title, subtitle, and short intro shown at the top of the service page."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Hero title"
              hint="Leave blank to reuse the service title."
              className="md:col-span-2"
            >
              <input
                className={inputClassName}
                placeholder="Precision skin fade"
                value={form.hero.title}
                onChange={(event) =>
                  updateNestedField("hero", "title", event.target.value)
                }
              />
            </Field>

            <Field label="Hero subtitle" className="md:col-span-2">
              <input
                className={inputClassName}
                placeholder="Sharp blending, tailored to your style"
                value={form.hero.subtitle}
                onChange={(event) =>
                  updateNestedField("hero", "subtitle", event.target.value)
                }
              />
            </Field>

            <Field label="Hero description" className="md:col-span-2">
              <textarea
                rows={4}
                className={textareaClassName}
                placeholder="A short paragraph that explains the service and the finish customers can expect."
                value={form.hero.description}
                onChange={(event) =>
                  updateNestedField("hero", "description", event.target.value)
                }
              />
            </Field>
          </div>
        </FormCard>

        <StringListCard
          title="What's included"
          description="List the key elements that are part of this service."
          items={form.includes}
          addLabel="Add included item"
          emptyLabel="No included items yet."
          placeholder="Hair wash and style finish"
          onAdd={() => addStringItem("includes")}
          onChange={(index, value) => updateStringItem("includes", index, value)}
          onRemove={(index) => removeStringItem("includes", index)}
        />

        <StringListCard
          title="Suitable for"
          description="Describe who this service is best suited for."
          items={form.suitableFor}
          addLabel="Add suitability point"
          emptyLabel="No suitability points yet."
          placeholder="Clients who want a low-maintenance sharp cut"
          onAdd={() => addStringItem("suitableFor")}
          onChange={(index, value) =>
            updateStringItem("suitableFor", index, value)
          }
          onRemove={(index) => removeStringItem("suitableFor", index)}
        />

        <ProcessCard
          steps={form.process}
          onAdd={addProcessStep}
          onChange={updateProcessStep}
          onRemove={removeProcessStep}
        />

        <StringListCard
          title="Highlights"
          description="Optional trust points that are specific to this service."
          items={form.highlights}
          addLabel="Add highlight"
          emptyLabel="No service-specific highlights yet."
          placeholder="Detailed consultation before the first cut"
          onAdd={() => addStringItem("highlights")}
          onChange={(index, value) => updateStringItem("highlights", index, value)}
          onRemove={(index) => removeStringItem("highlights", index)}
        />

        <FormCard
          title="SEO"
          description="Set the metadata used for search and link previews."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Meta title">
              <input
                className={inputClassName}
                placeholder="60 characters ideal"
                value={form.seo.metaTitle}
                onChange={(event) =>
                  updateNestedField("seo", "metaTitle", event.target.value)
                }
              />
              <CharacterCount value={form.seo.metaTitle} limit={60} />
            </Field>

            <Field label="Meta description">
              <textarea
                rows={3}
                className={textareaClassName}
                placeholder="150-160 characters ideal"
                value={form.seo.metaDescription}
                onChange={(event) =>
                  updateNestedField("seo", "metaDescription", event.target.value)
                }
              />
              <CharacterCount value={form.seo.metaDescription} limit={160} />
            </Field>
          </div>
        </FormCard>
      </div>

      <aside className="space-y-6">
        <FormCard
          title="Hero image"
          description="Upload the main image and alt text used across the service page."
          className="xl:sticky xl:top-6"
        >
          <Upload
            showUploadList={false}
            customRequest={async ({ file, onSuccess, onError }) => {
              try {
                setHeroProgress(0);
                const url = await uploadToCloudinary(file, setHeroProgress);
                updateNestedField("hero", "image", url);
                setHeroProgress(100);
                onSuccess?.("ok");
              } catch (error) {
                console.error(error);
                message.error("Failed to upload hero image");
                onError?.(error);
              }
            }}
          >
            <button type="button" className={secondaryButtonClassName}>
              <FileImage className="h-4 w-4" aria-hidden="true" />
              {form.hero.image ? "Replace hero image" : "Upload hero image"}
            </button>
          </Upload>

          {heroProgress > 0 && heroProgress < 100 && (
            <Progress percent={heroProgress} className="mt-4" />
          )}

          {form.hero.image ? (
            <>
              <img
                src={form.hero.image}
                className="mt-4 h-56 w-full rounded-lg object-cover"
                alt="Hero preview"
              />
              <Field label="Image alt text" className="mt-4">
                <input
                  className={inputClassName}
                  placeholder="Barber blending a fade with clippers"
                  value={form.hero.imageAlt}
                  onChange={(event) =>
                    updateNestedField("hero", "imageAlt", event.target.value)
                  }
                />
              </Field>
            </>
          ) : (
            <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
              No hero image selected.
            </div>
          )}

          <button
            type="button"
            disabled={saving}
            onClick={handleSubmit}
            className={cn(accentButtonClassName, "mt-6 w-full")}
          >
            <Save className="h-4 w-4" aria-hidden="true" />
            {submitLabel}
          </button>
        </FormCard>
      </aside>
    </div>
  );
}
