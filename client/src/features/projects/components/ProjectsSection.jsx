import ProjectCard from './ProjectCard.jsx';
import FeaturedProjectCard from './FeaturedProjectCard.jsx';
import './ProjectsSection.css';

export default function ProjectsSection({ projects }) {
  if (projects.length === 0) {
    return (
      <section className="projects-section">
        <div className="projects-container">
          <div className="section-header">
            <p className="section-number">02. Projects</p>
            <h2 className="section-title">What I've Built</h2>
          </div>
          <p className="projects-empty">No projects yet.</p>
        </div>
      </section>
    );
  }

  const [featured, ...rest] = projects;

  return (
    <section className="projects-section">
      <div className="projects-container">
        <div className="section-header">
          <p className="section-number">02. Projects</p>
          <h2 className="section-title">What I've Built</h2>
        </div>
        <FeaturedProjectCard project={featured} />
        {rest.length > 0 && (
          <div className="projects-grid stagger-children visible">
            {rest.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
