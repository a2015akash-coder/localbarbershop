export const LEGACY_SERVICE_FIELDS = [
  "excerpt",
  "coverImage",
  "coverImageAlt",
  "status",
  "order",
  "price",
  "metaTitle",
  "metaDescription",
];

const isRecord = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const trimString = (value) => (typeof value === "string" ? value.trim() : "");

const cleanStringArray = (value) => {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => trimString(item))
    .filter((item) => item.length > 0);
};

const cleanHighlights = (value) => {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (typeof item === "string") return trimString(item);
      if (!isRecord(item)) return "";

      const title = trimString(item.title);
      const text = trimString(item.text || item.description);

      if (title && text) return `${title}: ${text}`;
      return title || text;
    })
    .filter((item) => item.length > 0);
};

const cleanProcess = (value) => {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => ({
      title: trimString(item?.title),
      description: trimString(item?.description),
    }))
    .filter((item) => item.title || item.description);
};

export const slugify = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const createEmptyServiceForm = () => ({
  title: "",
  slug: "",
  isActive: true,
  hero: {
    title: "",
    subtitle: "",
    description: "",
    image: "",
    imageAlt: "",
  },
  includes: [],
  suitableFor: [],
  process: [],
  highlights: [],
  seo: {
    metaTitle: "",
    metaDescription: "",
  },
  duration: "",
  isRecommended: false,
});

export function normalizeServiceDocument(data = {}) {
  const hero = isRecord(data.hero) ? data.hero : {};
  const seo = isRecord(data.seo) ? data.seo : {};
  const legacyExcerpt = trimString(data.excerpt);
  const heroDescription = trimString(hero.description) || legacyExcerpt;

  return {
    title: trimString(data.title),
    slug: trimString(data.slug),
    isActive:
      typeof data.isActive === "boolean" ? data.isActive : data.status !== "draft",
    hero: {
      title: trimString(hero.title),
      subtitle: trimString(hero.subtitle),
      description: heroDescription,
      image: trimString(hero.image) || trimString(data.coverImage),
      imageAlt: trimString(hero.imageAlt) || trimString(data.coverImageAlt),
    },
    includes: cleanStringArray(data.includes),
    suitableFor: cleanStringArray(data.suitableFor),
    process: cleanProcess(data.process),
    highlights: cleanHighlights(data.highlights),
    seo: {
      metaTitle: trimString(seo.metaTitle) || trimString(data.metaTitle),
      metaDescription:
        trimString(seo.metaDescription) ||
        trimString(data.metaDescription) ||
        heroDescription,
    },
    duration: trimString(data.duration),
    isRecommended: Boolean(data.isRecommended),
  };
}

export function buildServicePayload(form) {
  const cleanTitle = trimString(form.title);
  const cleanSlug = slugify(form.slug || cleanTitle);
  const cleanHeroTitle = trimString(form.hero?.title);
  const cleanHeroSubtitle = trimString(form.hero?.subtitle);
  const cleanHeroDescription = trimString(form.hero?.description);
  const cleanHeroImage = trimString(form.hero?.image);
  const cleanHeroImageAlt = trimString(form.hero?.imageAlt);
  const cleanDuration = trimString(form.duration);
  const includes = cleanStringArray(form.includes);
  const suitableFor = cleanStringArray(form.suitableFor);
  const highlights = cleanStringArray(form.highlights);
  const process = cleanProcess(form.process);

  if (!cleanTitle) {
    return { error: "Title is required" };
  }

  if (!cleanSlug) {
    return { error: "Slug is required" };
  }

  if (!cleanHeroImage) {
    return { error: "Hero image is required" };
  }

  if (!cleanHeroImageAlt) {
    return { error: "Hero image alt text is required" };
  }

  const hasIncompleteProcessStep = process.some(
    (step) => !step.title || !step.description
  );

  if (hasIncompleteProcessStep) {
    return { error: "Each process step needs both a title and description" };
  }

  const metaTitle = trimString(form.seo?.metaTitle) || cleanTitle;
  const metaDescription =
    trimString(form.seo?.metaDescription) ||
    cleanHeroDescription ||
    cleanHeroSubtitle ||
    cleanTitle;

  const hero = {
    image: cleanHeroImage,
    imageAlt: cleanHeroImageAlt,
  };

  if (cleanHeroTitle) hero.title = cleanHeroTitle;
  if (cleanHeroSubtitle) hero.subtitle = cleanHeroSubtitle;
  if (cleanHeroDescription) hero.description = cleanHeroDescription;

  const payload = {
    title: cleanTitle,
    slug: cleanSlug,
    isActive: Boolean(form.isActive),
    hero,
    includes,
    suitableFor,
    process,
    highlights,
    seo: {
      metaTitle,
      metaDescription,
    },
    isRecommended: Boolean(form.isRecommended),
  };

  const optionalDeletes = [];

  if (cleanDuration) {
    payload.duration = cleanDuration;
  } else {
    optionalDeletes.push("duration");
  }

  return { payload, optionalDeletes };
}
