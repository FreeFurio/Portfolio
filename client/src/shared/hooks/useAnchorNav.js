import { useEffect } from 'react';

export function useAnchorNav(scrollRef) {
  useEffect(() => {
    function handleClick(e) {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const el = scrollRef?.current;
      if (el) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        const offset = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
      history.replaceState(null, '', window.location.pathname);
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [scrollRef]);
}
