// Application router. Defines all routes and protects authenticated pages.

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from '../states/useAuthStore';
import GalleryPage from '../pages/gallery/GalleryPage';
import LoginPage from '../pages/auth/LoginPage';
import PresentationPage from '../pages/gallery/PresentationPage';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GalleryPage />} />
        <Route path="/category/:category" element={<GalleryPage />} />
        <Route path="/favorites" element={<GalleryPage />} />
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