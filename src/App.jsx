import { memo, lazy, Suspense } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";

import Navbar from "./components/landingpage/Navbar.jsx";
import Footer from "./components/landingpage/Footer.jsx";
import ScrollToTop from "./utils/ScrollToTop.jsx";

import LoadingSpinner from "./components/LoadingSpinner.jsx";

// EAGER (core landing experience)
import Home from "./Pages/Home.jsx";
import Contact from "./Pages/Contact.jsx";
import MonthlyDraw from "./Pages/MonthlyDraw.jsx";
import Promotion from "./Pages/Promotion.jsx";
import PageViewTracker from "./analytics/PageViewTracker.js";

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

function LegacyBlogRedirect() {
  const { slug = "" } = useParams();
  const location = useLocation();

  return (
    <Navigate
      replace
      to={`/blogs/${slug}${location.search}${location.hash}`}
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <PageViewTracker />
      <ScrollToTop />

      <Navbar />

      <main id="main-content">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* PUBLIC */}
            <Route path="/" element={<Home />} />
            <Route
              path="/mens-haircuts-beard-trims-kellyville"
              element={<Services />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/win" element={<MonthlyDraw />} />
            <Route
              path="/monthly-draw-kellyville-barber"
              element={<Promotion />}
            />

            {/* BLOG */}
            <Route path="/blogs" element={<BlogListPage />} />
            <Route path="/blogs/:slug" element={<BlogDetailsPage />} />
            <Route path="/blog/:slug" element={<LegacyBlogRedirect />} />

            {/* AUTH */}
            <Route path="/login" element={<LoginPage />} />

            {/* ADMIN */}
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
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default memo(App);

