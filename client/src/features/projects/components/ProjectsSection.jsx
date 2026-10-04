import { useState, useRef, useCallback } from 'react';
import './ProjectsSection.css';
import aiPoweredImg from '../../../assets/AIPOWEREDIMG.jpg';
import docTrackImg from '../../../assets/DocTrackIMG.jpg';

const PROJECT_IMAGES = {
  'ai-powered': aiPoweredImg,
  'doctrack': docTrackImg,
};

function getProjectImage(title) {
  const key = title.toLowerCase();
  if (key.includes('ai') || key.includes('digital marketing')) return PROJECT_IMAGES['ai-powered'];
  if (key.includes('doc')) return PROJECT_IMAGES['doctrack'];
  return null;
}

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

function CarouselCard({ project, state, onClick }) {
  const isFeatured = project.featured;
  const isActive = state === 'active';
  const cardRef = useRef(null);
  const rafRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!isActive) return;
    const card = cardRef.current;
    if (!card) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateX(0) scale(1) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`;
    });
  }, [isActive]);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = '';
  }, []);

  return (
    <div
      ref={cardRef}
      className={`carousel-card carousel-card--${state}${isFeatured ? ' carousel-card--featured' : ''}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {isFeatured && (
        <div className="carousel-folder-tab">★ Featured Project</div>
      )}
      <div className="carousel-card-inner">
        <div className="carousel-card-image">
          {(() => {
            const img = getProjectImage(project.title);
            return img
              ? <img src={img} alt={project.title} className="carousel-card-img" />
              : <span>{project.title.charAt(0)}</span>;
          })()}
        </div>
        <div className="carousel-card-content">
          <h3 className="carousel-card-title">{project.title}</h3>
          <p className="carousel-card-desc">{project.description}</p>
          <div className="carousel-card-tech">
            {(project.tech || []).map((t) => (
              <span key={t} className="carousel-tech-pill">{t}</span>
            ))}
          </div>
          <div className="carousel-card-links">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="carousel-link" aria-label="GitHub" onClick={(e) => e.stopPropagation()}>
                <GitHubIcon />
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="carousel-link" aria-label="Live" onClick={(e) => e.stopPropagation()}>
                <ExternalIcon />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection({ projects }) {
  const featuredIndex = projects.findIndex((p) => p.featured);
  const [active, setActive] = useState(featuredIndex >= 0 ? featuredIndex : 0);

  if (projects.length === 0) {
    return (
      <section className="projects-section">
        <div className="projects-header">
          <p className="section-number">02. Projects</p>
          <h2 className="section-title">What I've Built</h2>
        </div>
        <p className="projects-empty">No projects yet.</p>
      </section>
    );
  }

  const prev = (active - 1 + projects.length) % projects.length;
  const next = (active + 1) % projects.length;

  function getState(i) {
    if (i === active) return 'active';
    if (i === prev) return 'prev';
    if (i === next) return 'next';
    return 'hidden';
  }

  return (
    <section className="projects-section">
      <div className="projects-header">
        <p className="section-number">02. Projects</p>
        <h2 className="section-title">What I've Built</h2>
      </div>
      <div className="projects-carousel">
        {projects.map((project, i) => {
          const state = getState(i);
          return (
            <CarouselCard
              key={project.id}
              project={project}
              state={state}
              onClick={() => state !== 'active' && setActive(i)}
            />
          );
        })}
      </div>
      <div className="carousel-controls">
        <button className="carousel-btn" onClick={() => setActive(prev)} aria-label="Previous">←</button>
        <div className="carousel-dots">
          {projects.map((_, i) => (
            <button key={i} className={`carousel-dot ${i === active ? 'carousel-dot--active' : ''}`} onClick={() => setActive(i)} />
          ))}
        </div>
        <button className="carousel-btn" onClick={() => setActive(next)} aria-label="Next">→</button>
      </div>
    </section>
  );
}
