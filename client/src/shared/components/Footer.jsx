import './Footer.css';

const NAV = ['About', 'Projects', 'Skills', 'Contact'];

export default function Footer({ onNavClick }) {
  return (
    <footer className="footer">
      <div className="footer-scan" aria-hidden="true" />

      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-logo">
            <span className="footer-logo-rlt">RLT</span>
            <span className="footer-logo-dot">.</span>
          </div>

          <nav className="footer-nav">
            {NAV.map((label, i) => (
              <button key={label} className="footer-nav-link" onClick={() => onNavClick?.(i + 1)}>
                <span className="footer-nav-num">0{i + 1}.</span>
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="footer-divider">
          <span className="footer-divider-line" aria-hidden="true" />
          <span className="footer-divider-diamond" aria-hidden="true" />
          <span className="footer-divider-line" aria-hidden="true" />
        </div>

        <div className="footer-bottom">
          <p className="footer-credit">
            <span className="footer-credit-designed">Designed &amp; Built by</span>
            <span className="footer-credit-name">Reeon Lance Tobia</span>
          </p>
          <p className="footer-copy">
            <span className="footer-copy-symbol">©</span>
            {new Date().getFullYear()} — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
