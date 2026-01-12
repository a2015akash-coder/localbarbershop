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

// AUTH
const LoginPage = lazy(() => import("./components/Login/Login.jsx"));

// ADMIN
const AdminGuard = lazy(() => import("./utils/AdminGuard.jsx"));
const AdminBlogDashboard = lazy(() => import("./admin/AdminBlogDashboard.jsx"));
const UploadBlogPage = lazy(() => import("./admin/UploadBlogPage.jsx"));
const EditBlogPage = lazy(() => import("./admin/EditBlogPage.jsx"));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route
            path="/mens-haircuts-beard-trims-kellyville"
            element={<Services />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contest" element={<MonthlyDraw />} />

          {/* BLOG (PUBLIC) */}
          <Route path="/blogs" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogDetailsPage />} />

          {/* AUTH */}
          <Route path="/login" element={<LoginPage />} />

          {/* ADMIN CMS */}
          <Route
            path="/admin"
            element={
              <AdminGuard>
                <AdminBlogDashboard />
              </AdminGuard>
            }
          />

          <Route
            path="/admin/blogs/new"
            element={
              <AdminGuard>
                <UploadBlogPage />
              </AdminGuard>
            }
          />

          <Route
            path="/admin/blogs/:id/edit"
            element={
              <AdminGuard>
                <EditBlogPage />
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
