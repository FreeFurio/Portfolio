import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './features/auth/hooks/useAuth.js';
import { useVersion } from './features/version/hooks/useVersion.js';

import HomePage from './features/home/pages/HomePage.jsx';
import HomePageV2 from './features/home/pages/HomePageV2.jsx';
import LoginPage from './features/auth/pages/LoginPage.jsx';
import AdminPage from './features/admin/pages/AdminPage.jsx';
import NotFoundPage from './shared/pages/NotFoundPage.jsx';

function AdminGuard({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" replace />;
}

function Layout() {
  const { version, loading } = useVersion();
  if (loading) return null;
  const Home = version === 'v2' ? HomePageV2 : HomePage;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
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
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
