import { useState } from 'react';
import ThemeToggle from './ThemeToggle.jsx';
import './Navbar.css';

const QR_URL = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://rltdev.vercel.app/';

const NAV_LINKS = [
  { label: 'About',      id: 'about',      number: '01.' },
  { label: 'Projects',   id: 'projects',   number: '02.' },
  { label: 'Skills',     id: 'skills',     number: '03.' },
  { label: 'Experience', id: 'experience', number: '04.' },
  { label: 'Contact',    id: 'contact',    number: '05.' },
];

export default function Navbar({ activeId, onNavClick, sectionIds }) {
  const [open, setOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

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
          <button className="navbar-qr-btn" onClick={() => setQrOpen(true)} aria-label="Show QR code">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="5" y="5" width="3" height="3" fill="currentColor" stroke="none"/>
              <rect x="16" y="5" width="3" height="3" fill="currentColor" stroke="none"/>
              <rect x="5" y="16" width="3" height="3" fill="currentColor" stroke="none"/>
              <path d="M14 14h3v3h-3zM17 17h3v3h-3zM14 20h3"/>
            </svg>
          </button>
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

      {qrOpen && (
        <div className="qr-modal-backdrop" onClick={() => setQrOpen(false)}>
          <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
            <p className="qr-modal-label">Scan to visit portfolio</p>
            <img src={QR_URL} alt="QR code for rltdev.vercel.app" className="qr-modal-img" />
            <p className="qr-modal-url">rltdev.vercel.app</p>
            <button className="qr-modal-close" onClick={() => setQrOpen(false)} aria-label="Close">✕</button>
          </div>
        </div>
      )}
    </>
  );
}
