import './Footer.css';

const FOOTER_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

const FOOTER_SOCIALS = [
  { href: 'https://github.com/FreeFurio', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/lance-tobia-90aaa7310/', label: 'LinkedIn' },
  { href: 'https://www.facebook.com/reeonlance.tobia', label: 'Facebook' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <nav className="footer-nav">
          {FOOTER_LINKS.map(({ href, label }) => (
            <a key={href} href={href} className="footer-nav-link">{label}</a>
          ))}
        </nav>
        <div className="footer-socials">
          {FOOTER_SOCIALS.map(({ href, label }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" className="footer-social-link">{label}</a>
          ))}
        </div>
        <p className="footer-credit">
          Designed & Built by{' '}
          <a href="https://github.com/FreeFurio" target="_blank" rel="noreferrer" className="footer-name">
            Reeon Lance Tobia
          </a>
        </p>
      </div>
    </footer>
  );
}
