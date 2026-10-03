import './PageLoader.css';

export default function PageLoader({ exiting }) {
  return (
    <div className={`pl${exiting ? ' pl--exit' : ''}`}>
      <div className="pl-scanlines" aria-hidden="true" />

      <div className="pl-corner pl-corner--tl" aria-hidden="true" />
      <div className="pl-corner pl-corner--tr" aria-hidden="true" />
      <div className="pl-corner pl-corner--bl" aria-hidden="true" />
      <div className="pl-corner pl-corner--br" aria-hidden="true" />

      <div className={`pl-stage${exiting ? ' pl-stage--exit' : ''}`}>
        <div className="pl-logo">
          <span className="pl-letter pl-letter--r">R</span>
          <span className="pl-letter pl-letter--l">L</span>
          <span className="pl-letter pl-letter--t">T</span>
          <span className="pl-letter pl-letter--dot">.</span>
        </div>

        <div className="pl-bar-wrap">
          <div className="pl-bar" />
          <div className="pl-bar-glow" />
        </div>

        <div className="pl-meta">
          <span className="pl-name-type">REEON LANCE TOBIA</span>
          <span className="pl-role-fade">FULL-STACK DEVELOPER</span>
        </div>
      </div>
    </div>
  );
}
