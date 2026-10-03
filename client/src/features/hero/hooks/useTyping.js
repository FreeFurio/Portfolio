import { useState, useEffect } from 'react';

const TITLES = ['Full-Stack Developer', 'React & Node Developer', '.NET & Blazor Developer', 'AI Integration Developer'];
const TYPE_SPEED = 80;
const DELETE_SPEED = 40;
const PAUSE = 1800;

export function useTyping() {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TITLES[index];

    if (!deleting && displayed === current) {
      const pause = setTimeout(() => setDeleting(true), PAUSE);
      return () => clearTimeout(pause);
    }

    if (deleting && displayed === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % TITLES.length);
      return;
    }

    const speed = deleting ? DELETE_SPEED : TYPE_SPEED;
    const timer = setTimeout(() => {
      setDisplayed(deleting ? current.slice(0, displayed.length - 1) : current.slice(0, displayed.length + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [displayed, deleting, index]);

  return displayed;
}
