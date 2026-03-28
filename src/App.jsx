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
            {/* PUBLIC */}
           
            {/* AUTH */}
            <Route path="/login" element={<LoginPage />} />

            {/* ADMIN */}
            <Route
              path="/"
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

      
    </BrowserRouter>
  );
}

export default memo(App);

