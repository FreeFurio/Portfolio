import { useState, useEffect, useRef, useCallback } from 'react';

const DEBOUNCE = 900;

export function useSectionNav(total) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState('down');
  const indexRef = useRef(0);
  const lastTime = useRef(0);
  const touchStart = useRef(null);

  const go = useCallback((next) => {
    const now = Date.now();
    if (now - lastTime.current < DEBOUNCE) return;
    const cur = indexRef.current;
    const nextVal = next(cur);
    const clamped = Math.max(0, Math.min(total - 1, nextVal));
    if (clamped === cur) return;
    lastTime.current = now;
    setDirection(nextVal > cur ? 'down' : 'up');
    indexRef.current = clamped;
    setIndex(clamped);
  }, [total]);

  const goNext = useCallback(() => go((i) => i + 1), [go]);
  const goBack = useCallback(() => go((i) => i - 1), [go]);
  const goTo = useCallback((i) => go(() => i), [go]);

  useEffect(() => {
    function onWheel(e) {
      if (e.deltaY > 30) goNext();
      else if (e.deltaY < -30) goBack();
    }

    function onKey(e) {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') goNext();
      if (e.key === 'ArrowUp' || e.key === 'PageUp') goBack();
    }

    function onTouchStart(e) {
      touchStart.current = e.touches[0].clientY;
    }

    function onTouchEnd(e) {
      if (touchStart.current === null) return;
      const delta = touchStart.current - e.changedTouches[0].clientY;
      if (delta > 40) goNext();
      else if (delta < -40) goBack();
      touchStart.current = null;
    }

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [goNext, goBack]);

  return { index, direction, goTo };
}
