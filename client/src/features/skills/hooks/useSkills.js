import { useState, useEffect } from 'react';
import { getSkills } from '../services/skillsApi.js';

export function useSkills() {
  const [skills, setSkills] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSkills()
      .then(setSkills)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { skills, loading, error };
}
