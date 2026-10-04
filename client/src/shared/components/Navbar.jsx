import { useState } from 'react';
import ThemeToggle from './ThemeToggle.jsx';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'About',      id: 'about',      number: '01.' },
  { label: 'Projects',   id: 'projects',   number: '02.' },
  { label: 'Skills',     id: 'skills',     number: '03.' },
  { label: 'Experience', id: 'experience', number: '04.' },
  { label: 'Contact',    id: 'contact',    number: '05.' },
];

export default function Navbar({ activeId, onNavClick, sectionIds }) {
  const [open, setOpen] = useState(false);

  function handleNav(i) {
    onNavClick(i);
    setOpen(false);
  }

  return (
    <>
      <header className="navbar navbar--scrolled">
        <button className="navbar-brand" onClick={() => handleNav(0)}>RLT.</button>

        <nav className="navbar-links">
          {NAV_LINKS.map(({ label, id, number }) => (
            <button
              key={id}
              className={`nav-link ${activeId === id ? 'nav-link--active' : ''}`}
              onClick={() => handleNav(sectionIds.indexOf(id))}
            >
              <span className="nav-link-number">{number}</span>
              {label}
            </button>
          ))}
        </nav>

        <div className="navbar-right">
          <ThemeToggle />
          <button
            className={`navbar-hamburger${open ? ' navbar-hamburger--open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu${open ? ' mobile-menu--open' : ''}`}>
        <nav className="mobile-menu-links">
          {NAV_LINKS.map(({ label, id, number }, i) => (
            <button
              key={id}
              className={`mobile-nav-link${activeId === id ? ' mobile-nav-link--active' : ''}`}
              onClick={() => handleNav(sectionIds.indexOf(id))}
              style={{ '--i': i }}
            >
              <span className="mobile-nav-num">{number}</span>
              {label}
            </button>
          ))}
        </nav>
      </div>

      {open && <div className="mobile-menu-backdrop" onClick={() => setOpen(false)} />}
    </>
  );
}
