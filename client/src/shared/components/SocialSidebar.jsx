import './SocialSidebar.css';

const SOCIALS = [
  { href: 'https://github.com/FreeFurio', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/lance-tobia-90aaa7310/', label: 'LinkedIn' },
  { href: 'https://www.facebook.com/reeonlance.tobia', label: 'Facebook' },
];

export default function SocialSidebar() {
  return (
    <div className="social-sidebar">
      <ul className="social-sidebar-list">
        {SOCIALS.map(({ href, label }) => (
          <li key={label}>
            <a href={href} target="_blank" rel="noreferrer" className="social-sidebar-link">
              {label}
            </a>
          </li>
        ))}
      </ul>
      <div className="social-sidebar-line" />
    </div>
  );
}
