import { imgRoundedBackground } from "../../imports/Animation-1/svg-69o62";

const S = 2.25 * 0.85;

export const PIECE_W = 34 * S;
export const PIECE_H = 34.686 * S;

function radius(extra = 0) {
  return `${12 * S + extra}px ${4 * S + extra}px ${12 * S + extra}px ${12 * S + extra}px`;
}

export function ShapePiece() {
  const w = PIECE_W;
  const h = PIECE_H;
  const r = radius();

  return (
    <div className="relative" style={{ width: w, height: h }}>
      <div
        className="absolute inset-0"
        style={{
          borderRadius: r,
          backdropFilter: "url(#liquid-glass) blur(1.5px)",
          WebkitBackdropFilter: "url(#liquid-glass) blur(1.5px)",
          background: "rgba(255,255,255,0.06)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          borderRadius: r,
          background: `linear-gradient(160deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 50%, rgba(200,215,255,0.07) 100%)`,
        }}
      />
      <div
        className="absolute left-0 right-0 top-0"
        style={{
          height: "28%",
          borderRadius: `${12 * S}px ${4 * S}px 0 0`,
          background: `linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          borderRadius: radius(0.5),
          border: `0.75px solid rgba(255,255,255,0.55)`,
          boxShadow: `inset 0 1.5px 2px rgba(255,255,255,0.6), 0 ${3 * S}px ${12 * S}px rgba(0,0,0,0.08)`,
        }}
      />
    </div>
  );
}

export function GlassFilters() {
  return (
    <svg width="0" height="0" className="absolute">
      <defs>
        <filter id="liquid-glass" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.018 0.022" numOctaves="2" seed="4" result="turbulence" />
          <feColorMatrix in="turbulence" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 8 -3" result="sharpNoise" />
          <feDisplacementMap in="SourceGraphic" in2="sharpNoise" scale="18" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}
