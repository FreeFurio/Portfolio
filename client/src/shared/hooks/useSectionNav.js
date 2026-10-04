import { useState, useEffect, useRef, useCallback } from 'react';



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
    if (el.classList?.contains('slide')) {
      // only count the slide itself if it's a scrollable slide
      if (el.classList.contains('slide--scrollable') || el.classList.contains('slide--mobile-scrollable')) {
        return isScrollable(el) ? el : null;
      }
      return null;
    }
    el = el.parentElement;
  }
  return null;
}

export function useSectionNav(total, containerEl, enabled = true) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState('down');

  // keep everything in refs so listeners never need to be re-registered
  const stateRef = useRef({ index: 0, total, busy: false, boundaryHits: 0, lastBoundaryDir: null });
  const touchStart = useRef(null);
  const setIndexRef = useRef(setIndex);
  const setDirectionRef = useRef(setDirection);

  stateRef.current.total = total;

  const go = useCallback((next) => {
    const s = stateRef.current;
    if (s.busy) return;
    const nextVal = next(s.index);
    const clamped = Math.max(0, Math.min(s.total - 1, nextVal));
    if (clamped === s.index) return;
    s.busy = true;
    s.boundaryHits = 0;
    s.lastBoundaryDir = null;
    setDirectionRef.current(nextVal > s.index ? 'down' : 'up');
    s.index = clamped;
    setIndexRef.current(clamped);
    // unlock after CSS transition finishes (~600ms)
    setTimeout(() => { s.busy = false; }, 600);
  }, []);

  const goNext = useCallback(() => go((i) => i + 1), [go]);
  const goBack = useCallback(() => go((i) => i - 1), [go]);
  const goTo = useCallback((i) => go(() => i), [go]);

  // keep goNext/goBack in refs so the effect closure never goes stale
  const goNextRef = useRef(goNext);
  const goBackRef = useRef(goBack);
  goNextRef.current = goNext;
  goBackRef.current = goBack;

  useEffect(() => {
    if (!containerEl || !enabled) return;

    function onWheel(e) {
      const goingDown = e.deltaY > 30;
      const goingUp = e.deltaY < -30;
      if (!goingDown && !goingUp) return;

      const s = stateRef.current;
      const scrollable = getScrollableParent(e.target);
      if (scrollable) {
        if (!isAtBoundary(scrollable, goingDown)) {
          s.boundaryHits = 0;
          return;
        }
        const dir = goingDown ? 'down' : 'up';
        if (s.lastBoundaryDir !== dir) {
          s.boundaryHits = 0;
          s.lastBoundaryDir = dir;
        }
        s.boundaryHits += 1;
        if (s.boundaryHits < 2) return;
      }

      if (goingDown) goNextRef.current();
      else goBackRef.current();
    }

    function onKey(e) {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') goNextRef.current();
      if (e.key === 'ArrowUp' || e.key === 'PageUp') goBackRef.current();
    }

    function onTouchStart(e) {
      touchStart.current = { y: e.touches[0].clientY, target: e.target };
    }

    function onTouchEnd(e) {
      if (touchStart.current === null) return;
      const delta = touchStart.current.y - e.changedTouches[0].clientY;
      const goingDown = delta > 40;
      const goingUp = delta < -40;
      if (goingDown || goingUp) {
        const scrollable = getScrollableParent(touchStart.current.target);
        if (scrollable && !isAtBoundary(scrollable, goingDown)) {
          touchStart.current = null;
          return;
        }
        if (goingDown) goNextRef.current();
        else goBackRef.current();
      }
      touchStart.current = null;
    }

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKey);
    containerEl.addEventListener('touchstart', onTouchStart, { passive: true });
    containerEl.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      containerEl.removeEventListener('touchstart', onTouchStart);
      containerEl.removeEventListener('touchend', onTouchEnd);
    };
  }, [containerEl, enabled]); // only re-runs when the DOM node itself changes

  return { index, direction, goTo };
}
