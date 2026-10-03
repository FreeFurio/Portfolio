import { useState, useEffect } from 'react';
import { useHero } from '../../hero/hooks/useHero.js';
import { adminApi } from '../services/adminApi.js';
import EditModal from './EditModal.jsx';
import heroImg from '../../../assets/hero.png';
import '../../hero/components/HeroSection.css';
import './EditModal.css';

export default function AdminHero() {
  const { hero, loading } = useHero();
  const [form, setForm] = useState({ name: '', title: '', tagline: '', ctaPrimary: '', ctaPrimaryUrl: '', ctaSecondary: '', ctaSecondaryUrl: '', ctaTertiary: '', ctaTertiaryUrl: '' });
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (hero) setForm(hero);
  }, [hero]);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSave() {
    setSaving(true);
    await adminApi.updateHero(form);
    setSaving(false);
    setOpen(false);
  }

  if (loading) return <p className="admin-state">Loading...</p>;

  return (
    <div style={{ position: 'relative' }}>
      <button className="section-edit-btn" onClick={() => setOpen(true)}>✎ Edit</button>

      <section className="hero-section" style={{ minHeight: 'auto', paddingTop: 'var(--space-16)', paddingBottom: 'var(--space-16)' }}>
        <div className="hero-inner">
          <div className="hero-content">
            <p className="hero-greeting">Hi, my name is</p>
            <h1 className="hero-name">{form.name}</h1>
            <h2 className="hero-title">{form.title}<span className="hero-cursor">_</span></h2>
            <p className="hero-tagline">{form.tagline}</p>
            <div className="hero-cta">
              <a href={form.ctaPrimaryUrl || '#projects'} className="btn btn--primary">{form.ctaPrimary}</a>
              <a href={form.ctaSecondaryUrl || '#contact'} {...((form.ctaSecondaryUrl || '').match(/\.[a-z]+$/i) ? { download: true } : {})} className="btn btn--ghost">{form.ctaSecondary}</a>
              {form.ctaTertiary && (
                <a href={form.ctaTertiaryUrl || '/Resume_RLT.pdf'} {...((form.ctaTertiaryUrl || '/Resume_RLT.pdf').match(/\.[a-z]+$/i) ? { download: true } : {})} className="btn btn--ghost">{form.ctaTertiary}</a>
              )}
            </div>
          </div>
          <div className="hero-photo">
            <div className="hero-photo-inner">
              <img src={heroImg} alt="Reeon Lance Tobia" className="hero-photo-img" />
            </div>
          </div>
        </div>
      </section>

      {open && (
        <EditModal title="Edit Hero" onClose={() => setOpen(false)} onSave={handleSave} saving={saving}>
          {[
            { key: 'name', label: 'Name' },
            { key: 'title', label: 'Title' },
            { key: 'tagline', label: 'Tagline', textarea: true },
            { key: 'ctaPrimary', label: 'Button 1 Label' },
            { key: 'ctaPrimaryUrl', label: 'Button 1 URL' },
            { key: 'ctaSecondary', label: 'Button 2 Label' },
            { key: 'ctaSecondaryUrl', label: 'Button 2 URL' },
            { key: 'ctaTertiary', label: 'Button 3 Label' },
            { key: 'ctaTertiaryUrl', label: 'Button 3 URL' },
          ].map(({ key, label, textarea }) => (
            <div key={key} className="modal-field">
              <label>{label}</label>
              {textarea
                ? <textarea name={key} rows={3} value={form[key] || ''} onChange={handleChange} />
                : <input name={key} value={form[key] || ''} onChange={handleChange} />}
            </div>
          ))}
        </EditModal>
      )}
    </div>
  );
}
