import { useState, useEffect } from 'react';
import { getVersion, putVersion } from '../services/versionApi.js';

const STORAGE_KEY = 'portfolio-version';

export function useVersion() {
  const [version, setVersion] = useState(() => localStorage.getItem(STORAGE_KEY) || 'v1');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVersion()
      .then(({ version: v }) => {
        setVersion(v);
        localStorage.setItem(STORAGE_KEY, v);
      })
      .finally(() => setLoading(false));
  }, []);

  async function switchVersion(v) {
    await putVersion(v);
    setVersion(v);
    localStorage.setItem(STORAGE_KEY, v);
  }

  return { version, loading, switchVersion };
}
