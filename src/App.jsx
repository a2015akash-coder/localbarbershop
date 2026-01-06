import { memo, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/landingpage/Navbar.jsx";
import Footer from "./components/landingpage/Footer.jsx";
import ScrollToTop from "./utils/ScrollToTop.jsx";

// EAGER (core landing experience)
import Home from "./Pages/Home.jsx";
import Contact from "./Pages/Contact.jsx";
import Win from "./Pages/Win.jsx";

// LAZY (secondary / heavy pages)
const Services = lazy(() => import("./Pages/Services.jsx"));
const BlogListPage = lazy(() => import("./Pages/BlogListPage.jsx"));
const BlogDetailsPage = lazy(() => import("./Pages/BlogDetailsPage.jsx"));
const UploadBlogPage = lazy(() => import("./admin/UploadBlogPage.jsx"));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      {/* Page-level suspense (correct placement) */}
      <Suspense
        fallback={
          <div className="py-24 text-center text-gray-500">
            Loading…
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contest" element={<Win />} />

          {/* BLOG */}
          <Route path="/blogs" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogDetailsPage />} />

          {/* ADMIN (lazy + isolated) */}
          <Route path="/admin" element={<UploadBlogPage />} />
        </Routes>
      </Suspense>

      <Footer />
    </BrowserRouter>
  );
}

export default memo(App);
