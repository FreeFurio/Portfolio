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

import { useHero } from '../../hero/hooks/useHero.js';
import { useAbout } from '../../about/hooks/useAbout.js';
import { useProjects } from '../../projects/hooks/useProjects.js';
import { useSkills } from '../../skills/hooks/useSkills.js';
import { useFadeIn } from '../../../shared/hooks/useFadeIn.js';
import { useSpotlight } from '../../../shared/hooks/useSpotlight.js';
import { useAnchorNav } from '../../../shared/hooks/useAnchorNav.js';

function FadeSection({ id, children }) {
  const ref = useFadeIn();
  return (
    <section id={id} ref={ref} className="fade-in">
      {children}
    </section>
  );
}

export default function HomePage() {
  const { hero, loading: heroLoading } = useHero();
  const { about, loading: aboutLoading } = useAbout();
  const { projects, loading: projectsLoading } = useProjects();
  const { skills, loading: skillsLoading } = useSkills();
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);

  const allLoaded = !heroLoading && !aboutLoading && !projectsLoading && !skillsLoading;

  useEffect(() => {
    if (!allLoaded) return;
    const delay = setTimeout(() => {
      setExiting(true);
      const exit = setTimeout(() => setDone(true), 900);
      return () => clearTimeout(exit);
    }, 2000);
    return () => clearTimeout(delay);
  }, [allLoaded]);

  useSpotlight();
  useAnchorNav();

  return (
    <>
      <CustomCursor />
      {!done && <PageLoader exiting={exiting} />}
      {allLoaded && (
        <main>
          <section id="hero">
            <HeroSection hero={hero} />
          </section>
          <FadeSection id="about">
            <AboutSection about={about} />
          </FadeSection>
          <FadeSection id="projects">
            <ProjectsSection projects={projects || []} />
          </FadeSection>
          <FadeSection id="skills">
            <SkillsSection skills={skills} />
          </FadeSection>
          <FadeSection id="contact">
            <ContactSection />
          </FadeSection>
          <Footer />
          <ScrollToTop />
        </main>
      )}
    </>
  );
}
