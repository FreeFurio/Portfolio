import './ScrollProgress.css';

export default function ScrollProgress({ index, total }) {
  const progress = total <= 1 ? 1 : index / (total - 1);
  return <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />;
}
