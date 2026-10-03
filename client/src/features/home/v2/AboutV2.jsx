import './AboutV2.css';

const WHAT_I_DO = [
  'Frontend Development — React, Vite, CSS',
  'Backend Development — Node.js, Express',
  'Database Design — Firebase, Firestore',
  'Full-Stack Applications — end-to-end builds',
];

const TECH_STACK = ['React', 'Node.js', 'Firebase', 'Supabase', 'JavaScript', 'CSS'];

export default function AboutV2({ about }) {
  const stats = about.stats || [];

  return (
    <section className="v2-about">
      <div className="v2-about-inner">

        <div className="v2-about-header">
          <span className="v2-about-index">01</span>
          <div className="v2-about-header-rule" />
          <span className="v2-about-label">About Me</span>
        </div>

        <div className="v2-about-grid">
          <div className="v2-about-left">
            <h2 className="v2-about-title">Who<br />I Am</h2>
            <div className="v2-about-availability">
              <span className="v2-about-dot" />
              Open to Opportunities
            </div>
            <div className="v2-about-stats">
              {stats.map((stat) => (
                <div key={stat.label} className="v2-about-stat">
                  <span className="v2-about-stat-value">{stat.value}</span>
                  <span className="v2-about-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="v2-about-right">
            <p className="v2-about-bio">{about.bio}</p>

            <div className="v2-about-section-rule" />

            <div className="v2-about-columns">
              <div className="v2-about-col">
                <p className="v2-about-col-label">What I Do</p>
                <ul className="v2-about-list">
                  {WHAT_I_DO.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="v2-about-col">
                <p className="v2-about-col-label">Tech Stack</p>
                <div className="v2-about-tech">
                  {TECH_STACK.map((t) => (
                    <span key={t} className="v2-about-tech-pill">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
