import { useNavigate } from 'react-router-dom';
import { supabase } from '../../auth/services/supabaseClient.js';
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

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/login');
  }

  return (
    <>
      <CustomCursor />
      <div className="admin-bar">
        <span className="admin-bar-label">Admin Mode</span>
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
