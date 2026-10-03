import './SkillsV2.css';

export default function SkillsV2({ skills }) {
  return (
    <section className="v2-skills">
      <div className="v2-skills-inner">

        <div className="v2-skills-header">
          <span className="v2-skills-index">03</span>
          <div className="v2-skills-header-rule" />
          <span className="v2-skills-label">Skills</span>
        </div>

        <div className="v2-skills-grid">
          <div className="v2-skills-title-col">
            <h2 className="v2-skills-title">What I<br />Work<br />With</h2>
          </div>

          <div className="v2-skills-groups">
            {skills.groups.map((group, gi) => (
              <div key={group.label} className="v2-skills-group">
                <div className="v2-skills-group-header">
                  <span className="v2-skills-group-num">{String(gi + 1).padStart(2, '0')}</span>
                  <span className="v2-skills-group-label">{group.label}</span>
                </div>
                <div className="v2-skills-pills">
                  {group.items.map((item, ii) => (
                    <span
                      key={item}
                      className="v2-skill-pill"
                      style={{ animationDelay: `${gi * 100 + ii * 50}ms` }}
                    >{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
