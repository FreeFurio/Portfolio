import { useHero } from '../hooks/useHero.js';
import HeroSection from '../components/HeroSection.jsx';

export default function HeroPage() {
  const { hero, loading, error } = useHero();

  if (loading) return <main className="page-state">Loading...</main>;
  if (error) return <main className="page-state">Something went wrong.</main>;
  if (!hero) return <main className="page-state">No content yet.</main>;

  return (
    <main>
      <HeroSection hero={hero} />
    </main>
  );
}
