import { memo, lazy, Suspense } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";

import LoadingSpinner from "./components/LoadingSpinner.jsx";

// AUTH
const LoginPage = lazy(() => import("./components/Login/Login.jsx"));

// ADMIN
const AdminGuard = lazy(() => import("./utils/AdminGuard.jsx"));

const AdminBlogDashboard = lazy(() => import("./admin/AdminBlogDashboard.jsx"));
const UploadBlogPage = lazy(() => import("./admin/UploadBlogPage.jsx"));
const EditBlogPage = lazy(() => import("./admin/EditBlogPage.jsx"));

const AdminServiceDashboard = lazy(() =>
  import("./admin/AdminServiceDashboard.jsx")
);
const UploadServicePage = lazy(() =>
  import("./admin/UploadServicePage.jsx")
);
const EditServicePage = lazy(() =>
  import("./admin/EditServicePage.jsx")
);

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
      <main id="main-content">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* AUTH */}
            <Route path="/login" element={<LoginPage />} />

            {/* OPTIONAL: redirect root to blogs admin */}
            <Route path="/" element={<Navigate to="/admin/blogs" replace />} />

            {/* BLOG ADMIN */}
            <Route
              path="/admin/blogs"
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

            {/* SERVICE ADMIN */}
            <Route
              path="/admin/services"
              element={
                <AdminGuard>
                  <AdminServiceDashboard />
                </AdminGuard>
              }
            />
            <Route
              path="/admin/services/new"
              element={
                <AdminGuard>
                  <UploadServicePage />
                </AdminGuard>
              }
            />
            <Route
              path="/admin/services/:id/edit"
              element={
                <AdminGuard>
                  <EditServicePage />
                </AdminGuard>
              }
            />

            {/* OPTIONAL legacy redirect if needed later */}
            <Route path="/blog/:slug" element={<LegacyBlogRedirect />} />

            {/* FALLBACK */}
            <Route path="*" element={<Navigate to="/admin/blogs" replace />} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
}

export default memo(App);