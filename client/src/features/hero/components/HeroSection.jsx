import heroImg from '../../../assets/hero.png';
import { useTyping } from '../hooks/useTyping.js';
import './HeroSection.css';

const NAME_LETTERS = ['R','e','e','o','n',' ','L','a','n','c','e',' ','T','o','b','i','a'];

export default function HeroSection({ hero, onScrollDown }) {
  const typedTitle = useTyping();

  return (
    <section className="hero-section">
      <div className="hero-grid-bg" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-content">
          <p className="hero-greeting">
            <span className="hero-greeting-line" />
            Hi, my name is
          </p>

          <h1 className="hero-name" aria-label={hero.name}>
            {NAME_LETTERS.map((ch, i) => (
              ch === ' '
                ? <span key={i} className="hero-name-space" aria-hidden="true">&nbsp;</span>
                : <span key={i} className="hero-name-letter" style={{ '--i': i }} aria-hidden="true">{ch}</span>
            ))}
          </h1>

          <h2 className="hero-title">
            <span className="hero-title-text">{typedTitle}</span>
            <span className="hero-cursor">_</span>
          </h2>

          <p className="hero-location">
            <span className="hero-location-ping" />
            Tarlac City, Philippines
          </p>

          <p className="hero-tagline">{hero.tagline}</p>

          <div className="hero-cta">
            <a href={hero.ctaPrimaryUrl || '#projects'} className="btn btn--primary">
              <span className="btn-text">{hero.ctaPrimary}</span>
              <span className="btn-charge" aria-hidden="true" />
            </a>
            <a
              href={hero.ctaSecondaryUrl || '#contact'}
              {...((hero.ctaSecondaryUrl || '').match(/\.[a-z]+$/i) ? { download: true } : {})}
              className="btn btn--ghost"
            >
              <span className="btn-text">{hero.ctaSecondary}</span>
            </a>
            {hero.ctaTertiary && (
              <a
                href={hero.ctaTertiaryUrl || '/Resume_RLT.pdf'}
                {...((hero.ctaTertiaryUrl || '/Resume_RLT.pdf').match(/\.[a-z]+$/i) ? { download: true } : {})}
                className="btn btn--ghost"
              >
                <span className="btn-text">{hero.ctaTertiary}</span>
              </a>
            )}
          </div>
        </div>

        <div className="hero-photo">
          <div className="hero-photo-inner">
            <img src={heroImg} alt="Reeon Lance Tobia" className="hero-photo-img" />
            <div className="hero-photo-holo" aria-hidden="true" />
            <div className="hero-photo-scanlines" aria-hidden="true" />
          </div>
        </div>
      </div>

      <button className="hero-scroll-indicator" onClick={onScrollDown} aria-label="Scroll down">
        <span className="hero-scroll-line">
          <span className="hero-scroll-dot" aria-hidden="true" />
        </span>
        <span className="hero-scroll-label">scroll</span>
      </button>
    </section>
  );
}
