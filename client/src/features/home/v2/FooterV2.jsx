import './FooterV2.css';

const SOCIALS = [
  { href: 'https://github.com/FreeFurio', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/lance-tobia-90aaa7310/', label: 'LinkedIn' },
  { href: 'https://www.facebook.com/reeonlance.tobia', label: 'Facebook' },
];

export default function FooterV2({ onNavClick }) {
  return (
    <footer className="v2-footer">
      <div className="v2-footer-rule" />
      <div className="v2-footer-inner">
        <span className="v2-footer-brand">RLT.</span>
        <nav className="v2-footer-nav">
          {['About', 'Projects', 'Skills', 'Contact'].map((label, i) => (
            <button key={label} className="v2-footer-nav-link" onClick={() => onNavClick?.(i + 1)}>
              {label}
            </button>
          ))}
        </nav>
        <div className="v2-footer-socials">
          {SOCIALS.map(({ href, label }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" className="v2-footer-social">{label} ↗</a>
          ))}
        </div>
        <p className="v2-footer-credit">Designed & Built by Reeon Lance Tobia</p>
      </div>
    </footer>
  );
}
