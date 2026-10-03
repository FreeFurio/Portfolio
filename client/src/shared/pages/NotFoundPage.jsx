import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export default function NotFoundPage() {
  return (
    <main className="not-found">
      <p className="not-found-code">404</p>
      <h1 className="not-found-title">Page not found</h1>
      <p className="not-found-text">The page you're looking for doesn't exist.</p>
      <Link to="/" className="not-found-link">← Back to home</Link>
    </main>
  );
}
