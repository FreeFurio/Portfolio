import './SkillsSection.css';

export default function SkillsSection({ skills }) {
  return (
    <section className="skills-section">
      <div className="skills-container">
        <div className="section-header">
          <p className="section-number">03. Skills</p>
          <h2 className="section-title">What I Work With</h2>
        </div>
        <div className="skills-groups">
          {skills.groups.map((group) => (
            <div key={group.label} className="skills-group">
              <h3 className="skills-group-label">{group.label}</h3>
              <div className="skills-pills">
                {group.items.map((item) => (
                  <span key={item} className="skill-pill">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
