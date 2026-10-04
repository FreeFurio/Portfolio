import { useState, useEffect } from 'react';
import HeroSection from '../../hero/components/HeroSection.jsx';
import AboutSection from '../../about/components/AboutSection.jsx';
import ProjectsSection from '../../projects/components/ProjectsSection.jsx';
import SkillsSection from '../../skills/components/SkillsSection.jsx';
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

const SECTION_IDS = ['hero', 'about', 'projects', 'skills', 'contact'];
const IS_MOBILE = () => window.innerWidth <= 768;

export default function HomePage() {
  const { hero, loading: heroLoading } = useHero();
  const { about, loading: aboutLoading } = useAbout();
  const { projects, loading: projectsLoading } = useProjects();
  const { skills, loading: skillsLoading } = useSkills();
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);
  const [isMobile, setIsMobile] = useState(IS_MOBILE());
  const mountTime = useState(() => Date.now())[0];

  const allLoaded = !heroLoading && !aboutLoading && !projectsLoading && !skillsLoading;

  const { index, direction, goTo } = useSectionNav(SECTION_IDS.length);

  useEffect(() => {
    const handler = () => setIsMobile(IS_MOBILE());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

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
    <HeroSection key="hero" hero={hero} onScrollDown={() => goTo(1)} />,
    <AboutSection key="about" about={about} />,
    <ProjectsSection key="projects" projects={projects || []} />,
    <SkillsSection key="skills" skills={skills} />,
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
          {isMobile ? (
            <main>
              {sections.map((section, i) => (
                <div key={i} className="slide slide--active">
                  {section}
                </div>
              ))}
            </main>
          ) : (
            <main className="slides-container">
              {sections.map((section, i) => {
                let state = 'hidden';
                if (i === index) state = 'active';
                return (
                  <div
                    key={i}
                    className={`slide slide--${state} slide--${direction}`}
                    aria-hidden={i !== index}
                  >
                    {section}
                  </div>
                );
              })}
            </main>
          )}
          <ScrollToTop onGoTop={() => goTo(0)} visible={index > 0} />
          {!isMobile && (
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
          )}
        </>
      )}
    </>
  );
}
