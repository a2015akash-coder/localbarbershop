// components/SEO.jsx
import { Helmet } from "react-helmet-async";

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  robots = "index, follow, max-image-preview:large",
}) {
  return (
    <Helmet>
      {/* Primary Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Optional Keywords (not critical, but allowed) */}
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Robots Control */}
      <meta name="robots" content={robots} />
    </Helmet>
  );
}
