import { useEffect, useRef } from 'react';
import photoImg from '../../../assets/Photo.jpg';
import './AboutSection.css';

const DEFAULT_STATS = [
  { value: 1, suffix: '+', label: 'Years Experience' },
  { value: 3, suffix: '+', label: 'Projects Built' },
  { value: 10, suffix: '+', label: 'Technologies' },
];

const WHAT_I_DO = [
  'Frontend Development — React, Vite, CSS',
  'Backend Development — Node.js, Express',
  'Database Design — Firebase, Firestore',
  'Full-Stack Applications — end-to-end builds',
];

const TECH_STACK = ['React', 'Node.js', 'Firebase', 'Supabase', 'JavaScript', 'CSS'];

function AnimatedStat({ value, suffix, label, delay }) {
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(eased * value) + suffix;
          if (t < 1) requestAnimationFrame(tick);
        }
        setTimeout(() => requestAnimationFrame(tick), delay);
      }
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, suffix, delay]);

  return (
    <div className="about-stat">
      <span className="about-stat-value" ref={ref}>0{suffix}</span>
      <span className="about-stat-label">{label}</span>
    </div>
  );
}

export default function AboutSection({ about }) {
  const rawStats = about.stats || DEFAULT_STATS;
  const stats = rawStats.map((s) => {
    const num = parseInt(s.value, 10);
    const suffix = String(s.value).replace(/[0-9]/g, '');
    return { value: num, suffix, label: s.label };
  });

  const photo = (
    <div className="about-photo">
      <img src={about.photoUrl || photoImg} alt="Reeon Lance Tobia" />
    </div>
  );

  return (
    <section className="about-section">

      {/* ── Desktop layout ── */}
      <div className="about-container">
        <div className="about-photo-wrapper">
          <div className="about-photo-inner">
            {photo}
            <div className="about-photo-holo" aria-hidden="true" />
          </div>
          <div className="about-corner about-corner--tl" aria-hidden="true" />
          <div className="about-corner about-corner--br" aria-hidden="true" />
        </div>

        <div className="about-content">
          <div className="about-availability">
            <span className="about-availability-dot" />
            Open to Opportunities
          </div>
          <div className="section-header">
            <p className="section-number">01. About Me</p>
            <h2 className="section-title">Who I Am</h2>
          </div>
          <p className="about-bio">{about.bio}</p>
          <ul className="about-what-i-do">
            {WHAT_I_DO.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="about-tech-stack">
            {TECH_STACK.map((tech) => (
              <span key={tech} className="about-tech-pill">{tech}</span>
            ))}
          </div>
          <div className="about-stats">
            {stats.map((stat, i) => (
              <AnimatedStat key={stat.label} {...stat} delay={i * 150} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile layout ── */}
      <div className="about-mobile">
        <div className="about-availability">
          <span className="about-availability-dot" />
          Open to Opportunities
        </div>

        <div className="section-header">
          <p className="section-number">01. About Me</p>
          <h2 className="section-title">Who I Am</h2>
        </div>

        <div className="about-mobile-hero">
          <div className="about-mobile-photo">
            {photo}
          </div>
          <div className="about-mobile-stats">
            {stats.map((stat, i) => (
              <AnimatedStat key={stat.label} {...stat} delay={i * 150} />
            ))}
          </div>
        </div>

        <p className="about-bio">{about.bio}</p>

        <ul className="about-what-i-do">
          {WHAT_I_DO.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="about-tech-stack">
          {TECH_STACK.map((tech) => (
            <span key={tech} className="about-tech-pill">{tech}</span>
          ))}
        </div>
      </div>

    </section>
  );
}
