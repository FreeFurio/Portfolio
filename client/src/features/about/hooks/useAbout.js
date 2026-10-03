import { useState, useEffect } from 'react';
import { getAbout } from '../services/aboutApi.js';

export function useAbout() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAbout()
      .then(setAbout)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { about, loading, error };
}
