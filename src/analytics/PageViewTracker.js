// src/analytics/PageViewTracker.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    const payload = {
      event: "page_view",
      page_path: location.pathname,
      page_title: document.title,
    };

    // Ensure dataLayer exists
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);

    // ✅ DEBUG: confirm SPA page view tracking works
    console.log("[GTM] Page view fired:", payload);
  }, [location]);

  return null;
}
