export const sanitizeText = (text = "") =>
  text.replace(/\s+/g, " ").trim();

export const slugify = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
