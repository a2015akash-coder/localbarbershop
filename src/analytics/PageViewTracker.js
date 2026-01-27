// src/analytics/PageViewTracker.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: "page_view",
      page_path: location.pathname,
      page_title: document.title,
    });
  }, [location]);

  return null;
}
