import heroImg from '../../../assets/hero.png';
import './HeroSection.css';

export default function HeroSection({ hero }) {
  return (
    <section className="hero-section">
      <div className="hero-inner">
        <div className="hero-content">
          <p className="hero-greeting">Hi, my name is</p>
          <h1 className="hero-name">{hero.name}</h1>
          <h2 className="hero-title">
            {hero.title}<span className="hero-cursor">_</span>
          </h2>
          <p className="hero-tagline">{hero.tagline}</p>
          <div className="hero-cta">
            <a href={hero.ctaPrimaryUrl || '#projects'} className="btn btn--primary">{hero.ctaPrimary}</a>
            <a href={hero.ctaSecondaryUrl || '#contact'} {...((hero.ctaSecondaryUrl || '').match(/\.[a-z]+$/i) ? { download: true } : {})} className="btn btn--ghost">{hero.ctaSecondary}</a>
            {hero.ctaTertiary && (
              <a href={hero.ctaTertiaryUrl || '/Resume_RLT.pdf'} {...((hero.ctaTertiaryUrl || '/Resume_RLT.pdf').match(/\.[a-z]+$/i) ? { download: true } : {})} className="btn btn--ghost">{hero.ctaTertiary}</a>
            )}
          </div>
        </div>
        <div className="hero-photo">
          <div className="hero-photo-inner">
            <img src={heroImg} alt="Reeon Lance Tobia" className="hero-photo-img" />
          </div>
        </div>
      </div>
      <a href="#about" className="hero-scroll-indicator" aria-label="Scroll down">
        <span className="hero-scroll-line" />
        <span className="hero-scroll-label">scroll</span>
      </a>
    </section>
  );
}
