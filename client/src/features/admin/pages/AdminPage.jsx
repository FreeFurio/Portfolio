import { useNavigate } from 'react-router-dom';
import { supabase } from '../../auth/services/supabaseClient.js';
import { useVersion } from '../../version/hooks/useVersion.js';
import AdminHero from '../components/AdminHero.jsx';
import AdminAbout from '../components/AdminAbout.jsx';
import AdminProjects from '../components/AdminProjects.jsx';
import AdminSkills from '../components/AdminSkills.jsx';
import AdminMessages from '../components/AdminMessages.jsx';
import Footer from '../../../shared/components/Footer.jsx';
import CustomCursor from '../../../shared/components/CustomCursor.jsx';
import './AdminPage.css';

export default function AdminPage() {
  const navigate = useNavigate();
  const { version, switchVersion } = useVersion();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/login');
  }

  return (
    <>
      <CustomCursor />
      <div className="admin-bar">
        <span className="admin-bar-label">Admin Mode</span>
        <div className="admin-bar-version">
          <button
            className={`admin-version-btn ${version === 'v1' ? 'admin-version-btn--active' : ''}`}
            onClick={() => switchVersion('v1')}
          >V1</button>
          <button
            className={`admin-version-btn ${version === 'v2' ? 'admin-version-btn--active' : ''}`}
            onClick={() => switchVersion('v2')}
          >V2</button>
        </div>
        <button className="admin-bar-logout" onClick={handleLogout}>Log out</button>
      </div>
      <main className="admin-page-content">
        <section id="hero">
          <AdminHero />
        </section>
        <section id="about">
          <AdminAbout />
        </section>
        <section id="projects">
          <AdminProjects />
        </section>
        <section id="skills">
          <AdminSkills />
        </section>
        <section id="messages" style={{ padding: 'var(--section-padding) var(--container-padding)' }}>
          <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto' }}>
            <div className="section-header">
              <p className="section-number">05. Messages</p>
              <h2 className="section-title">Inbox</h2>
            </div>
            <AdminMessages />
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
