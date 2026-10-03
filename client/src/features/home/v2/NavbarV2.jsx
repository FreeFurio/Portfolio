import ThemeToggle from '../../../shared/components/ThemeToggle.jsx';
import './NavbarV2.css';

const NAV_LINKS = [
  { label: 'About', id: 'about', number: '01.' },
  { label: 'Projects', id: 'projects', number: '02.' },
  { label: 'Skills', id: 'skills', number: '03.' },
  { label: 'Contact', id: 'contact', number: '04.' },
];

export default function NavbarV2({ activeId, onNavClick, sectionIds }) {
  return (
    <header className="v2-navbar">
      <button className="v2-navbar-brand" onClick={() => onNavClick(0)}>RLT.</button>
      <nav className="v2-navbar-links">
        {NAV_LINKS.map(({ label, id, number }) => (
          <button
            key={id}
            className={`v2-nav-link ${activeId === id ? 'v2-nav-link--active' : ''}`}
            onClick={() => onNavClick(sectionIds.indexOf(id))}
          >
            <span className="v2-nav-link-number">{number}</span>
            {label}
          </button>
        ))}
      </nav>
      <div className="v2-navbar-right">
        <ThemeToggle />
      </div>
    </header>
  );
}
