import { useState, useEffect, useRef } from 'react';
import HeroSection from '../../hero/components/HeroSection.jsx';
import AboutSection from '../../about/components/AboutSection.jsx';
import ProjectsSection from '../../projects/components/ProjectsSection.jsx';
import SkillsSection from '../../skills/components/SkillsSection.jsx';
import ExperienceSection from '../../experience/components/ExperienceSection.jsx';
import ContactSection from '../../contact/components/ContactSection.jsx';
import Footer from '../../../shared/components/Footer.jsx';
import ScrollToTop from '../../../shared/components/ScrollToTop.jsx';
import CustomCursor from '../../../shared/components/CustomCursor.jsx';
import PageLoader from '../../../shared/components/PageLoader.jsx';
import ScrollProgress from '../../../shared/components/ScrollProgress.jsx';
import Navbar from '../../../shared/components/Navbar.jsx';

import { useHero } from '../../hero/hooks/useHero.js';
import { useAbout } from '../../about/hooks/useAbout.js';
import { useProjects } from '../../projects/hooks/useProjects.js';
import { useSkills } from '../../skills/hooks/useSkills.js';
import { useSectionNav } from '../../../shared/hooks/useSectionNav.js';
import { useSpotlight } from '../../../shared/hooks/useSpotlight.js';

const SECTION_IDS = ['hero', 'about', 'projects', 'skills', 'experience', 'contact'];

export default function HomePage() {
  const { hero, loading: heroLoading } = useHero();
  const { about, loading: aboutLoading } = useAbout();
  const { projects, loading: projectsLoading } = useProjects();
  const { skills, loading: skillsLoading } = useSkills();
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);
  const mountTime = useState(() => Date.now())[0];

  const allLoaded = !heroLoading && !aboutLoading && !projectsLoading && !skillsLoading;

  const [containerEl, setContainerEl] = useState(null);
  const { index, direction, goTo } = useSectionNav(SECTION_IDS.length, containerEl, done);

  useEffect(() => {
    if (!allLoaded) return;
    const elapsed = Date.now() - mountTime;
    const remaining = Math.max(0, 2500 - elapsed);
    const delay = setTimeout(() => {
      setExiting(true);
      const exit = setTimeout(() => setDone(true), 900);
      return () => clearTimeout(exit);
    }, remaining);
    return () => clearTimeout(delay);
  }, [allLoaded]);

  useSpotlight();

  const sections = [
    <HeroSection key="hero" hero={hero} onScrollDown={() => goTo(1)} goTo={goTo} />,
    <AboutSection key="about" about={about} />,
    <ProjectsSection key="projects" projects={projects || []} />,
    <SkillsSection key="skills" skills={skills} />,
    <ExperienceSection key="experience" />,
    <div key="contact" className="contact-slide">
      <ContactSection />
      <Footer onNavClick={goTo} />
    </div>,
  ];

  return (
    <>
      <CustomCursor />
      <ScrollProgress index={index} total={SECTION_IDS.length} />
      {!done && <PageLoader exiting={exiting} />}
      {allLoaded && (
        <>
          <Navbar activeId={SECTION_IDS[index]} onNavClick={goTo} sectionIds={SECTION_IDS} />
          <main className="slides-container" ref={setContainerEl}>
            {sections.map((section, i) => {
              let state = 'hidden';
              if (i === index) state = 'active';
              const scrollable = i === 4 || i === 5; // experience, contact
              const mobileScrollable = i === 1; // about — desktop centered, mobile scrollable
              return (
                <div
                  key={i}
                  className={`slide slide--${state} slide--${direction}${scrollable ? ' slide--scrollable' : ''}${mobileScrollable ? ' slide--mobile-scrollable' : ''}`}
                  aria-hidden={i !== index}
                >
                  {section}
                </div>
              );
            })}
          </main>
          <ScrollToTop onGoTop={() => goTo(0)} visible={index > 0} />
          <nav className="slide-dots" aria-label="Section navigation">
            {SECTION_IDS.map((id, i) => (
              <button
                key={id}
                className={`slide-dot ${i === index ? 'slide-dot--active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={id}
              />
            ))}
          </nav>
        </>
      )}
    </>
  );
}
