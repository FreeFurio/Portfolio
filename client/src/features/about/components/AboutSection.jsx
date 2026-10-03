import './AboutSection.css';

const DEFAULT_STATS = [
  { value: '1+', label: 'Years Experience' },
  { value: '3+', label: 'Projects Built' },
  { value: '10+', label: 'Technologies' },
];

export default function AboutSection({ about }) {
  const stats = about.stats || DEFAULT_STATS;

  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-photo-wrapper">
          <div className="about-photo-inner">
            <div className="about-photo">
              {about.photoUrl ? (
                <img src={about.photoUrl} alt="Reeon Lance Tobia" />
              ) : (
                <div className="about-photo-placeholder"><span>RLT</span></div>
              )}
            </div>
          </div>
        </div>
        <div className="about-content">
          <div className="section-header">
            <p className="section-number">01. About Me</p>
            <h2 className="section-title">Who I Am</h2>
          </div>
          <p className="about-bio">{about.bio}</p>
          <div className="about-stats">
            {stats.map((stat) => (
              <div key={stat.label} className="about-stat">
                <span className="about-stat-value">{stat.value}</span>
                <span className="about-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
