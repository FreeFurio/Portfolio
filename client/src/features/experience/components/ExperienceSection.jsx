import './ExperienceSection.css';

const EXPERIENCES = [
  {
    id: 'ojt',
    role: 'On-The-Job Trainee (OJT)',
    company: 'Office of Management Information Systems (OMIS), Tarlac State University',
    period: 'February 2026 – May 2026',
    points: [
      'Developed the Online Document Tracking System using ASP.NET Core, Blazor, C#, and Microsoft SQL Server.',
      'Implemented new features, fixed bugs, and optimized system performance.',
      'Participated in requirement gathering, coding, and testing of web application.',
      'Collaborated with the development team to ensure efficiency and reliability of the system.',
    ],
    tech: ['ASP.NET Core', 'Blazor', 'C#', 'Microsoft SQL Server'],
  },
  {
    id: 'capstone',
    role: 'Capstone Project',
    company: 'AI-Powered Digital Marketing Automation and SEO Score Analysis System',
    period: '2025 – 2026',
    points: [
      'Developed a web-based system that automates digital marketing tasks and evaluates SEO performance.',
      'Integrated OpenAI API for AI content generation and analysis.',
      'Implemented modules for content management, SEO score analysis, and automated posting.',
    ],
    tech: ['React.js', 'Node.js', 'Firebase', 'OpenAI API', 'Meta Graph API', 'JavaScript', 'CSS', 'HTML'],
  },
  {
    id: 'urbanbrew',
    role: 'Static Website Development',
    company: 'Urban Brew',
    period: '2024',
    points: [
      'Designed and developed a static website for Urban Brew Tarlac.',
      'Focused on UI/UX design and mobile responsiveness.',
    ],
    tech: ['JavaScript', 'CSS', 'HTML'],
  },
];

export default function ExperienceSection() {
  return (
    <section className="experience-section">
      <div className="experience-container">
        <div className="section-header">
          <p className="section-number">04. Experience</p>
          <h2 className="section-title">Where I've Worked</h2>
        </div>

        <div className="experience-timeline">
          {EXPERIENCES.map((exp, i) => (
            <div key={exp.id} className="experience-item" style={{ '--i': i }}>
              <div className="experience-line">
                <div className="experience-dot" />
                {i < EXPERIENCES.length - 1 && <div className="experience-connector" />}
              </div>

              <div className="experience-card">
                <div className="experience-card-header">
                  <div className="experience-card-title">
                    <h3 className="experience-role">{exp.role}</h3>
                    <p className="experience-company">{exp.company}</p>
                  </div>
                  <span className="experience-period">{exp.period}</span>
                </div>

                <ul className="experience-points">
                  {exp.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <div className="experience-tech">
                  {exp.tech.map((t) => (
                    <span key={t} className="experience-tech-pill">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
