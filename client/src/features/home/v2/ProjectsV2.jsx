import { useState } from 'react';
import './ProjectsV2.css';

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

export default function ProjectsV2({ projects }) {
  const featuredIndex = projects.findIndex((p) => p.featured);
  const [active, setActive] = useState(featuredIndex >= 0 ? featuredIndex : 0);

  if (projects.length === 0) {
    return (
      <section className="v2-projects">
        <div className="v2-projects-inner">
          <p className="v2-projects-empty">No projects yet.</p>
        </div>
      </section>
    );
  }

  const prev = (active - 1 + projects.length) % projects.length;
  const next = (active + 1) % projects.length;
  const project = projects[active];

  return (
    <section className="v2-projects">
      <div className="v2-projects-inner">

        <div className="v2-projects-header">
          <span className="v2-projects-index">02</span>
          <div className="v2-projects-header-rule" />
          <span className="v2-projects-label">Projects</span>
          <div className="v2-projects-counter">
            <span className="v2-projects-counter-active">{String(active + 1).padStart(2, '0')}</span>
            <span className="v2-projects-counter-sep">/</span>
            <span>{String(projects.length).padStart(2, '0')}</span>
          </div>
        </div>

        <div className="v2-projects-stage">
          <div className="v2-projects-image-col">
            <div className="v2-projects-image">
              <span className="v2-projects-image-letter">{project.title.charAt(0)}</span>
              {project.featured && (
                <div className="v2-projects-featured-tag">★ Featured</div>
              )}
            </div>
          </div>

          <div className="v2-projects-content-col">
            <div className="v2-projects-nav-row">
              <button className="v2-projects-nav-btn" onClick={() => setActive(prev)} aria-label="Previous">←</button>
              <button className="v2-projects-nav-btn" onClick={() => setActive(next)} aria-label="Next">→</button>
            </div>

            <h2 className="v2-projects-title">{project.title}</h2>
            <p className="v2-projects-desc">{project.description}</p>

            <div className="v2-projects-rule" />

            <div className="v2-projects-tech">
              {(project.tech || []).map((t) => (
                <span key={t} className="v2-projects-tech-pill">{t}</span>
              ))}
            </div>

            <div className="v2-projects-links">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="v2-projects-link">
                  <GitHubIcon /> GitHub
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="v2-projects-link">
                  <ExternalIcon /> Live
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="v2-projects-dots">
          {projects.map((_, i) => (
            <button
              key={i}
              className={`v2-projects-dot ${i === active ? 'v2-projects-dot--active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Project ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
