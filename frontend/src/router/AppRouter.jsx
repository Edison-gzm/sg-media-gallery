// Application router. Defines all routes and protects authenticated pages.

import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import GalleryPage from '../pages/gallery/GalleryPage';
import LoginPage from '../pages/auth/LoginPage';
import PresentationPage from '../pages/gallery/PresentationPage';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  return isAuthenticated
    ? children
    : <Navigate to="/login" state={{ from: location }} replace />;
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GalleryPage />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <GalleryPage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/presentation"
          element={
            <PrivateRoute>
              <PresentationPage />
            </PrivateRoute>
          }
        />

      
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;