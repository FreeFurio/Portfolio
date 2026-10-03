import './ScrollToTop.css';

export default function ScrollToTop({ onGoTop, visible }) {
  if (!visible) return null;
  return (
    <button className="scroll-to-top" onClick={onGoTop} aria-label="Go to top">
      ↑
    </button>
  );
}
