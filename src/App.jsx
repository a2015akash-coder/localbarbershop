import { memo, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/landingpage/Navbar.jsx";
import Footer from "./components/landingpage/Footer.jsx";
import ScrollToTop from "./utils/ScrollToTop.jsx";

import LoadingSpinner from "./components/LoadingSpinner.jsx";

// EAGER (core landing experience)
import Home from "./Pages/Home.jsx";
import Contact from "./Pages/Contact.jsx";
import MonthlyDraw from "./Pages/MonthlyDraw.jsx";

// LAZY (secondary / heavy pages)
const Services = lazy(() => import("./Pages/Services.jsx"));
const BlogListPage = lazy(() => import("./Pages/BlogListPage.jsx"));
const BlogDetailsPage = lazy(() => import("./Pages/BlogDetailsPage.jsx"));

// ADMIN
const UploadBlogPage = lazy(() => import("./admin/UploadBlogPage.jsx"));
const LoginPage = lazy(() => import("./components/Login/Login.jsx"));
const AdminGuard = lazy(() => import("./utils/AdminGuard.jsx"));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      {/* Page-level suspense */}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contest" element={<MonthlyDraw />} />

          {/* BLOG (PUBLIC) */}
          <Route path="/blogs" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogDetailsPage />} />

          {/* AUTH */}
          <Route path="/login" element={<LoginPage />} />

          {/* ADMIN (PROTECTED) */}
          <Route
            path="/admin"
            element={
              <AdminGuard>
                <UploadBlogPage />
              </AdminGuard>
            }
          />
        </Routes>
      </Suspense>

      <Footer />
    </BrowserRouter>
  );
}

export default memo(App);