import { useState, useEffect } from 'react';
import heroImg from '../../../assets/Hero.jpg';
import photoImg from '../../../assets/Photo.jpg';
import { useTyping } from '../hooks/useTyping.js';
import './HeroSection.css';

const NAME_LETTERS = ['R','e','e','o','n',' ','L','a','n','c','e',' ','T','o','b','i','a'];
const PHOTOS = [photoImg, heroImg];

const PHOTO_POSITIONS = ['center top', 'center top'];

const SECTION_IDS = ['hero', 'about', 'projects', 'skills', 'experience', 'contact'];

function resolveHref(url) {
  const hash = (url || '').replace(/^.*#/, '');
  return SECTION_IDS.indexOf(hash) !== -1 ? undefined : (url || undefined);
}

function resolveClick(url, goTo) {
  const hash = (url || '').replace(/^.*#/, '');
  const idx = SECTION_IDS.indexOf(hash);
  if (idx !== -1) return (e) => { e.preventDefault(); goTo(idx); };
  return undefined;
}

export default function HeroSection({ hero, onScrollDown, goTo }) {
  const typedTitle = useTyping();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((a) => (a + 1) % PHOTOS.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  function handleClick() {
    setActive((a) => (a + 1) % PHOTOS.length);
  }

  return (
    <section className="hero-section">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="hero-mobile-bg" aria-hidden="true">
        {PHOTOS.map((src, i) => (
          <div
            key={i}
            className={`hero-mobile-bg-layer${i === active ? ' hero-mobile-bg-layer--active' : ''}`}
            style={{ backgroundImage: `url(${src})`, backgroundPosition: PHOTO_POSITIONS[i] }}
          />
        ))}
      </div>

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
            <a
              href={resolveHref(hero.ctaPrimaryUrl || '#projects')}
              className="btn btn--primary"
              onClick={resolveClick(hero.ctaPrimaryUrl || '#projects', goTo)}
            >
              <span className="btn-text">{hero.ctaPrimary}</span>
              <span className="btn-charge" aria-hidden="true" />
            </a>
            <a
              href={resolveHref(hero.ctaSecondaryUrl || '#contact')}
              onClick={resolveClick(hero.ctaSecondaryUrl || '#contact', goTo)}
              {...((hero.ctaSecondaryUrl || '').match(/\.[a-z]+$/i) ? { download: true } : {})}
              className="btn btn--ghost"
            >
              <span className="btn-text">{hero.ctaSecondary}</span>
            </a>
            {hero.ctaTertiary && (
              <a
                href={resolveHref(hero.ctaTertiaryUrl || '/Resume_RLT.pdf')}
                onClick={resolveClick(hero.ctaTertiaryUrl || '/Resume_RLT.pdf', goTo)}
                {...((hero.ctaTertiaryUrl || '/Resume_RLT.pdf').match(/\.[a-z]+$/i) ? { download: true } : {})}
                className="btn btn--ghost"
              >
                <span className="btn-text">{hero.ctaTertiary}</span>
              </a>
            )}
          </div>
        </div>

        <div className="hero-photo" onClick={handleClick}>
          <div className="hero-photo-stack">
            {PHOTOS.map((src, i) => {
              const isActive = i === active;
              const isBack = i !== active;
              return (
                <div
                  key={i}
                  className={`hero-photo-card${isActive ? ' hero-photo-card--active' : ''}${isBack ? ' hero-photo-card--back' : ''}`}
                >
                  <img src={src} alt="Reeon Lance Tobia" className="hero-photo-img" />
                  <div className="hero-photo-scanlines" aria-hidden="true" />
                </div>
              );
            })}
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
