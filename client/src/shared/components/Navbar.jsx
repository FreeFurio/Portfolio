import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle.jsx';
import './Navbar.css';

const NAV_LINKS = [
  { href: '#about', label: 'About', id: 'about', number: '01.' },
  { href: '#projects', label: 'Projects', id: 'projects', number: '02.' },
  { href: '#skills', label: 'Skills', id: 'skills', number: '03.' },
  { href: '#contact', label: 'Contact', id: 'contact', number: '04.' },
];

export default function Navbar() {
  const [activeId, setActiveId] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    ['hero', ...NAV_LINKS.map(l => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function handleNavClick() {
    setMenuOpen(false);
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <a href="#hero" className="navbar-brand">RLT.</a>
      <nav className={`navbar-links ${menuOpen ? 'navbar-links--open' : ''}`}>
        {NAV_LINKS.map(({ href, label, id, number }) => (
          <a
            key={href}
            href={href}
            className={`nav-link ${activeId === id ? 'nav-link--active' : ''}`}
            onClick={handleNavClick}
          >
            <span className="nav-link-number">{number}</span>
            {label}
          </a>
        ))}
      </nav>
      <div className="navbar-right">
        <ThemeToggle />
        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${menuOpen ? 'hamburger-line--open' : ''}`} />
          <span className={`hamburger-line ${menuOpen ? 'hamburger-line--open' : ''}`} />
          <span className={`hamburger-line ${menuOpen ? 'hamburger-line--open' : ''}`} />
        </button>
      </div>
    </header>
  );
}
