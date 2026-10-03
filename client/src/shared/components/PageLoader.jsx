import './PageLoader.css';

export default function PageLoader({ exiting }) {
  return (
    <div className={`pl${exiting ? ' pl--exit' : ''}`}>
      <div className="pl-curtain pl-curtain--left" />
      <div className="pl-curtain pl-curtain--right" />

      <div className={`pl-stage${exiting ? ' pl-stage--exit' : ''}`}>
        <div className="pl-name">
          <span className="pl-letter pl-letter--r">R</span>
          <span className="pl-letter pl-letter--l">L</span>
          <span className="pl-letter pl-letter--t">T</span>
        </div>
        <div className="pl-line-wrap">
          <div className="pl-line" />
        </div>
        <p className="pl-sub">Full-Stack Developer</p>
      </div>
    </div>
  );
}
