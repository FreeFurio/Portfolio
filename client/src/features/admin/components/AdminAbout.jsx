import { useState, useEffect } from 'react';
import { useAbout } from '../../about/hooks/useAbout.js';
import { adminApi } from '../services/adminApi.js';
import EditModal from './EditModal.jsx';
import '../../about/components/AboutSection.css';
import './EditModal.css';

const DEFAULT_STATS = [
  { value: '1+', label: 'Yrs of Programming' },
  { value: '3+', label: 'Projects Built' },
  { value: '10+', label: 'Technologies' },
];

export default function AdminAbout() {
  const { about, loading } = useAbout();
  const [form, setForm] = useState({ bio: '', photoUrl: '', stats: [] });
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (about) setForm(about);
  }, [about]);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleStatChange(i, field, value) {
    setForm((prev) => ({
      ...prev,
      stats: prev.stats.map((s, si) => si === i ? { ...s, [field]: value } : s),
    }));
  }

  async function handleSave() {
    setSaving(true);
    await adminApi.updateAbout(form);
    setSaving(false);
    setOpen(false);
  }

  if (loading) return <p className="admin-state">Loading...</p>;

  const stats = form.stats?.length ? form.stats : DEFAULT_STATS;

  return (
    <div style={{ position: 'relative' }}>
      <button className="section-edit-btn" onClick={() => setOpen(true)}>✎ Edit</button>

      <section className="about-section">
        <div className="about-container">
          <div className="about-photo-wrapper">
            <div className="about-photo-inner">
              <div className="about-photo">
                {form.photoUrl
                  ? <img src={form.photoUrl} alt="Reeon Lance Tobia" />
                  : <div className="about-photo-placeholder"><span>RLT</span></div>}
              </div>
            </div>
          </div>
          <div className="about-content">
            <div className="section-header">
              <p className="section-number">01. About Me</p>
              <h2 className="section-title">Who I Am</h2>
            </div>
            <p className="about-bio">{form.bio}</p>
            <div className="about-stats">
              {stats.map((stat, i) => (
                <div key={i} className="about-stat">
                  <span className="about-stat-value">{stat.value}</span>
                  <span className="about-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {open && (
        <EditModal title="Edit About" onClose={() => setOpen(false)} onSave={handleSave} saving={saving}>
          <div className="modal-field">
            <label>Bio</label>
            <textarea name="bio" rows={5} value={form.bio} onChange={handleChange} />
          </div>
          <div className="modal-field">
            <label>Photo URL</label>
            <input name="photoUrl" value={form.photoUrl} onChange={handleChange} />
          </div>
          {stats.map((stat, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-3)' }}>
              <div className="modal-field">
                <label>Stat {i + 1} Value</label>
                <input value={stat.value} onChange={(e) => handleStatChange(i, 'value', e.target.value)} />
              </div>
              <div className="modal-field">
                <label>Stat {i + 1} Label</label>
                <input value={stat.label} onChange={(e) => handleStatChange(i, 'label', e.target.value)} />
              </div>
            </div>
          ))}
        </EditModal>
      )}
    </div>
  );
}
