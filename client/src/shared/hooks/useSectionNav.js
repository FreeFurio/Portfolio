import { useState, useEffect, useRef, useCallback } from 'react';

const DEBOUNCE = 900;

function isScrollable(el) {
  return el.scrollHeight > el.clientHeight + 2;
}

function isAtScrollBoundary(el, goingDown) {
  if (!isScrollable(el)) return true;
  if (goingDown) return el.scrollTop + el.clientHeight >= el.scrollHeight - 4;
  return el.scrollTop <= 4;
}

function getScrollableParent(target) {
  let el = target;
  while (el && el !== document.body) {
    if (isScrollable(el)) return el;
    el = el.parentElement;
  }
  return null;
}

export function useSectionNav(total) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState('down');
  const indexRef = useRef(0);
  const lastTime = useRef(0);
  const touchStart = useRef(null);
  const touchStartTarget = useRef(null);

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
      const goingDown = e.deltaY > 30;
      const goingUp = e.deltaY < -30;
      if (!goingDown && !goingUp) return;

      const scrollable = getScrollableParent(e.target);
      if (scrollable && !isAtScrollBoundary(scrollable, goingDown)) return;

      if (goingDown) goNext();
      else goBack();
    }

    function onKey(e) {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') goNext();
      if (e.key === 'ArrowUp' || e.key === 'PageUp') goBack();
    }

    function onTouchStart(e) {
      touchStart.current = e.touches[0].clientY;
      touchStartTarget.current = e.target;
    }

    function onTouchEnd(e) {
      if (touchStart.current === null) return;
      const delta = touchStart.current - e.changedTouches[0].clientY;
      const goingDown = delta > 40;
      const goingUp = delta < -40;
      if (!goingDown && !goingUp) { touchStart.current = null; return; }

      const scrollable = getScrollableParent(touchStartTarget.current);
      if (scrollable && !isAtScrollBoundary(scrollable, goingDown)) {
        touchStart.current = null;
        return;
      }

      if (goingDown) goNext();
      else if (goingUp) goBack();
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
