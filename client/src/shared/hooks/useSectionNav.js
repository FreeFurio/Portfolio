import { useState, useEffect, useRef, useCallback } from 'react';

const DEBOUNCE = 900;

function isScrollable(el) {
  return el.scrollHeight > el.clientHeight + 2;
}

function isAtBoundary(el, goingDown) {
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

export function useSectionNav(total, containerRef) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState('down');
  const indexRef = useRef(0);
  const lastTime = useRef(0);
  const touchStart = useRef(null);
  const boundaryHits = useRef(0);
  const lastBoundaryDir = useRef(null);

  const go = useCallback((next) => {
    const now = Date.now();
    if (now - lastTime.current < DEBOUNCE) return;
    const cur = indexRef.current;
    const nextVal = next(cur);
    const clamped = Math.max(0, Math.min(total - 1, nextVal));
    if (clamped === cur) return;
    lastTime.current = now;
    boundaryHits.current = 0;
    lastBoundaryDir.current = null;
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
      if (scrollable && isScrollable(scrollable)) {
        if (!isAtBoundary(scrollable, goingDown)) {
          // still scrolling inside — reset boundary counter
          boundaryHits.current = 0;
          return;
        }
        // at boundary — require one extra scroll
        const dir = goingDown ? 'down' : 'up';
        if (lastBoundaryDir.current !== dir) {
          boundaryHits.current = 0;
          lastBoundaryDir.current = dir;
        }
        boundaryHits.current += 1;
        if (boundaryHits.current < 2) return;
      }

      if (goingDown) goNext();
      else goBack();
    }

    function onKey(e) {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') goNext();
      if (e.key === 'ArrowUp' || e.key === 'PageUp') goBack();
    }

    const container = containerRef?.current || window;

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
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchend', onTouchEnd);
    };
  }, [goNext, goBack, containerRef]);

  return { index, direction, goTo };
}
