import { useState, useEffect } from 'react';
import { useSkills } from '../../skills/hooks/useSkills.js';
import { adminApi } from '../services/adminApi.js';
import EditModal from './EditModal.jsx';
import '../../skills/components/SkillsSection.css';
import './EditModal.css';

export default function AdminSkills() {
  const { skills, loading } = useSkills();
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (skills) setGroups(skills.groups.map((g) => ({ ...g, itemsStr: g.items.join(', ') })));
  }, [skills]);

  function handleChange(i, field, value) {
    setGroups((prev) => prev.map((g, gi) => gi === i ? { ...g, [field]: value } : g));
  }

  async function handleSave() {
    setSaving(true);
    await adminApi.updateSkills({
      groups: groups.map((g) => ({
        label: g.label,
        items: g.itemsStr.split(',').map((s) => s.trim()).filter(Boolean),
      })),
    });
    setSaving(false);
    setOpen(false);
  }

  if (loading) return <p className="admin-state">Loading...</p>;

  return (
    <div style={{ position: 'relative' }}>
      <button className="section-edit-btn" onClick={() => setOpen(true)}>✎ Edit</button>

      <section className="skills-section">
        <div className="skills-container">
          <div className="section-header">
            <p className="section-number">03. Skills</p>
            <h2 className="section-title">What I Work With</h2>
          </div>
          <div className="skills-groups">
            {groups.map((group, i) => (
              <div key={i} className="skills-group">
                <h3 className="skills-group-label">{group.label}</h3>
                <div className="skills-pills">
                  {group.itemsStr.split(',').map((item) => item.trim()).filter(Boolean).map((item) => (
                    <span key={item} className="skill-pill">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {open && (
        <EditModal title="Edit Skills" onClose={() => setOpen(false)} onSave={handleSave} saving={saving}>
          {groups.map((group, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', padding: 'var(--space-4)', background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-sm)' }}>
              <div className="modal-field">
                <label>Group Label</label>
                <input value={group.label} onChange={(e) => handleChange(i, 'label', e.target.value)} />
              </div>
              <div className="modal-field">
                <label>Items (comma separated)</label>
                <input value={group.itemsStr} onChange={(e) => handleChange(i, 'itemsStr', e.target.value)} />
              </div>
            </div>
          ))}
        </EditModal>
      )}
    </div>
  );
}
