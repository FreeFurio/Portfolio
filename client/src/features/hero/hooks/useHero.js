import { useState, useEffect } from 'react';
import { getHero } from '../services/heroApi.js';

export function useHero() {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getHero()
      .then(setHero)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { hero, loading, error };
}
