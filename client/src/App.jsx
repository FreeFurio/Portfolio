import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './features/auth/hooks/useAuth.js';
import Navbar from './shared/components/Navbar.jsx';

import HomePage from './features/home/pages/HomePage.jsx';
import LoginPage from './features/auth/pages/LoginPage.jsx';
import AdminPage from './features/admin/pages/AdminPage.jsx';
import NotFoundPage from './shared/pages/NotFoundPage.jsx';

function AdminGuard({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" replace />;
}

function Layout() {
  const { pathname } = useLocation();
  const hideNav = pathname === '/login' || pathname === '/admin';

  return (
    <>
      {!hideNav && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminPage />
            </AdminGuard>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
