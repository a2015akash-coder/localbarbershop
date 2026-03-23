const SITE_ORIGIN = "https://kellyvillebarber.com.au";
const SITE_HOSTS = new Set([
  "kellyvillebarber.com.au",
  "www.kellyvillebarber.com.au",
]);

export const BLOG_LIST_PATH = "/blogs";
export const BLOG_DETAIL_BASE_PATH = "/blogs";
export const LEGACY_BLOG_DETAIL_BASE_PATH = "/blog";

const EXTERNAL_REL = "nofollow noopener noreferrer";
const UNSAFE_PROTOCOL_PATTERN = /^\s*(javascript|data|vbscript):/i;

function createHtmlDocument(html) {
  if (typeof DOMParser === "undefined") return null;
  return new DOMParser().parseFromString(html, "text/html");
}

function clearSeoLinkAttributes(anchor) {
  anchor.removeAttribute("target");
  anchor.removeAttribute("rel");
}

function stripUnsafeLink(anchor) {
  anchor.removeAttribute("href");
  clearSeoLinkAttributes(anchor);
}

function escapeHtml(text = "") {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function normalizeBlogPath(pathname = "/") {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;

  if (normalizedPath === LEGACY_BLOG_DETAIL_BASE_PATH) {
    return BLOG_DETAIL_BASE_PATH;
  }

  if (normalizedPath.startsWith(`${LEGACY_BLOG_DETAIL_BASE_PATH}/`)) {
    return `${BLOG_DETAIL_BASE_PATH}${normalizedPath.slice(
      LEGACY_BLOG_DETAIL_BASE_PATH.length
    )}`;
  }

  return normalizedPath;
}

function normalizeInternalHref(url) {
  const pathname = normalizeBlogPath(url.pathname || "/");
  return `${pathname}${url.search}${url.hash}`;
}

function normalizeAnchor(anchor) {
  const href = anchor.getAttribute("href")?.trim() || "";

  if (!href || UNSAFE_PROTOCOL_PATTERN.test(href)) {
    stripUnsafeLink(anchor);
    return;
  }

  if (href.startsWith("#")) {
    anchor.setAttribute("href", href);
    clearSeoLinkAttributes(anchor);
    return;
  }

  let url;
  try {
    url = new URL(href, SITE_ORIGIN);
  } catch {
    stripUnsafeLink(anchor);
    return;
  }

  const hostname = url.hostname.toLowerCase();

  if (url.protocol === "mailto:" || url.protocol === "tel:") {
    anchor.setAttribute("href", href);
    clearSeoLinkAttributes(anchor);
    return;
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    stripUnsafeLink(anchor);
    return;
  }

  if (SITE_HOSTS.has(hostname)) {
    anchor.setAttribute("href", normalizeInternalHref(url));
    clearSeoLinkAttributes(anchor);
    return;
  }

  anchor.setAttribute("href", url.toString());
  anchor.setAttribute("target", "_blank");
  anchor.setAttribute("rel", EXTERNAL_REL);
}

export function normalizeBlogHtml(html = "") {
  if (!html) return "";

  const doc = createHtmlDocument(html);
  if (!doc) return html;

  doc.querySelectorAll("a").forEach(normalizeAnchor);
  return doc.body.innerHTML;
}

export function normalizeBlogContentBlocks(blocks = []) {
  return blocks.map((block) => {
    if (block?.type === "paragraph") {
      return {
        type: "richtext",
        html: normalizeBlogHtml(`<p>${escapeHtml(block.text || "")}</p>`),
      };
    }

    if (block?.type === "richtext") {
      return {
        ...block,
        html: normalizeBlogHtml(block.html || ""),
      };
    }

    return block;
  });
}