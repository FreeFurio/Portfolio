import heroImg from '../../../assets/hero.png';
import { useTyping } from '../../hero/hooks/useTyping.js';
import './HeroV2.css';

export default function HeroV2({ hero, onScrollDown }) {
  const typedTitle = useTyping();

  return (
    <section className="v2-hero">
      <div className="v2-hero-issue">
        <span>PORTFOLIO</span>
        <span className="v2-hero-issue-divider" />
        <span>VOL. 2</span>
        <span className="v2-hero-issue-divider" />
        <span>FULL-STACK</span>
      </div>

      <div className="v2-hero-grid">
        <div className="v2-hero-left">
          <p className="v2-hero-greeting">Hi, my name is</p>
          <h1 className="v2-hero-name">
            <span className="v2-hero-name-first">Reeon</span>
            <span className="v2-hero-name-last">Lance Tobia</span>
          </h1>
          <div className="v2-hero-rule" />
          <div className="v2-hero-meta">
            <span className="v2-hero-location">📍 Tarlac City, PH</span>
            <span className="v2-hero-divider">—</span>
            <span className="v2-hero-status">Available for work</span>
          </div>
        </div>

        <div className="v2-hero-center">
          <div className="v2-hero-photo-wrap">
            <img src={heroImg} alt="Reeon Lance Tobia" className="v2-hero-photo" />
            <div className="v2-hero-photo-label">
              <span>DEVELOPER</span>
              <span>2025</span>
            </div>
          </div>
        </div>

        <div className="v2-hero-right">
          <h2 className="v2-hero-title">
            {typedTitle}<span className="v2-hero-cursor">_</span>
          </h2>
          <p className="v2-hero-tagline">{hero.tagline}</p>
          <div className="v2-hero-cta">
            <a href={hero.ctaPrimaryUrl || '#'} className="v2-btn v2-btn--primary">{hero.ctaPrimary}</a>
            <a
              href={hero.ctaSecondaryUrl || '#'}
              {...((hero.ctaSecondaryUrl || '').match(/\.[a-z]+$/i) ? { download: true } : {})}
              className="v2-btn v2-btn--ghost"
            >{hero.ctaSecondary}</a>
          </div>
        </div>
      </div>

      <button className="v2-hero-scroll" onClick={onScrollDown} aria-label="Scroll down">
        <span className="v2-hero-scroll-line" />
        <span className="v2-hero-scroll-label">scroll</span>
      </button>
    </section>
  );
}
