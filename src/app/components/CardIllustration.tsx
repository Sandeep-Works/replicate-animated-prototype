import React from "react";

const GF = "url(#liquid-glass) blur(2px)";
const W = 180, H = 135;

// Shared drop-shadow that lifts shapes off the card surface
const SHADOW = "drop-shadow(0 6px 24px rgba(0,15,60,0.10)) drop-shadow(0 2px 6px rgba(0,15,60,0.07))";

// ── Glass orb ─────────────────────────────────────────────────────────────────
function Orb({ d, x, y }: { d: number; x: number; y: number }) {
  return (
    <>
      <div style={{
        position: "absolute",
        left: x - d / 2, top: y - d / 2,
        width: d, height: d, borderRadius: "50%", overflow: "hidden",
        filter: SHADOW,
      }}>
        <div style={{ position: "absolute", inset: 0, backdropFilter: GF, WebkitBackdropFilter: GF }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at 30% 26%, rgba(255,255,255,0.88) 0%, rgba(240,245,255,0.52) 38%, rgba(220,230,255,0.22) 62%, transparent 85%)",
        }} />
        <div style={{
          position: "absolute", top: "9%", left: "14%",
          width: "32%", height: "18%",
          borderRadius: "50%", background: "rgba(255,255,255,0.90)",
          filter: `blur(${Math.max(2, d * 0.07)}px)`,
        }} />
      </div>
      <div style={{
        position: "absolute",
        left: x - d / 2, top: y - d / 2,
        width: d, height: d, borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.80)",
        boxShadow: "inset 0 2px 3px rgba(255,255,255,0.70)",
        pointerEvents: "none",
      }} />
    </>
  );
}

// ── 1. Case Studies — Glass Cube ──────────────────────────────────────────────
function CubeIllustration() {
  return (
    <div style={{ position: "relative", width: W, height: H, filter: SHADOW }}>
      {/* Right face — shadow side */}
      <div style={{ position: "absolute", inset: 0, clipPath: "polygon(50% 48.1%, 83.3% 29.6%, 83.3% 66.7%, 50% 85.2%)" }}>
        <div style={{ position: "absolute", inset: 0, backdropFilter: GF, WebkitBackdropFilter: GF }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(255,255,255,0.50) 0%, rgba(210,220,245,0.28) 100%)" }} />
      </div>
      {/* Left face — medium */}
      <div style={{ position: "absolute", inset: 0, clipPath: "polygon(16.7% 29.6%, 50% 48.1%, 50% 85.2%, 16.7% 66.7%)" }}>
        <div style={{ position: "absolute", inset: 0, backdropFilter: GF, WebkitBackdropFilter: GF }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.68) 0%, rgba(225,232,252,0.35) 100%)" }} />
      </div>
      {/* Top face — brightest, most lit */}
      <div style={{ position: "absolute", inset: 0, clipPath: "polygon(16.7% 29.6%, 50% 11.1%, 83.3% 29.6%, 50% 48.1%)" }}>
        <div style={{ position: "absolute", inset: 0, backdropFilter: GF, WebkitBackdropFilter: GF }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(145deg, rgba(255,255,255,0.90) 0%, rgba(238,244,255,0.60) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(190deg, rgba(255,255,255,0.70) 0%, transparent 50%)" }} />
      </div>
      {/* Edges */}
      <svg style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }}
        width="100%" height="100%" viewBox={`0 0 ${W} ${H}`}>
        <path
          d="M90,15 L150,40 L150,90 L90,115 L30,90 L30,40 L90,15 M30,40 L90,65 M150,40 L90,65 M90,65 L90,115"
          fill="none" stroke="rgba(255,255,255,0.90)" strokeWidth="1.0"
          strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
      <Orb d={22} x={149} y={107} />
      <Orb d={14} x={34} y={119} />
    </div>
  );
}

// ── 2. Experiments — Saturn Sphere + Ring ────────────────────────────────────
function SaturnIllustration() {
  const cx = 90, cy = 70, sr = 46;
  const rx = 80, ry = 23;
  return (
    <div style={{ position: "relative", width: W, height: H }}>
      {/* Ring back half */}
      <div style={{
        position: "absolute",
        left: cx - rx, top: cy - ry,
        width: rx * 2, height: ry * 2,
        borderRadius: "50%",
        border: "3px solid rgba(255,255,255,0.55)",
        backdropFilter: GF, WebkitBackdropFilter: GF,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)",
      }} />
      {/* Sphere body */}
      <div style={{
        position: "absolute",
        left: cx - sr, top: cy - sr, width: sr * 2, height: sr * 2,
        borderRadius: "50%", overflow: "hidden", zIndex: 1,
        filter: SHADOW,
      }}>
        <div style={{ position: "absolute", inset: 0, backdropFilter: GF, WebkitBackdropFilter: GF }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at 30% 26%, rgba(255,255,255,0.88) 0%, rgba(235,242,255,0.55) 38%, rgba(215,228,255,0.25) 65%, rgba(200,218,255,0.08) 85%, transparent 100%)",
        }} />
        <div style={{
          position: "absolute", top: "10%", left: "16%", width: "38%", height: "22%",
          borderRadius: "50%", background: "rgba(255,255,255,0.88)", filter: "blur(8px)",
        }} />
      </div>
      {/* Sphere border */}
      <div style={{
        position: "absolute",
        left: cx - sr, top: cy - sr, width: sr * 2, height: sr * 2,
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.80)",
        boxShadow: "inset 0 2px 5px rgba(255,255,255,0.65)",
        pointerEvents: "none", zIndex: 2,
      }} />
      {/* Ring front half */}
      <div style={{
        position: "absolute",
        left: cx - rx, top: cy - ry,
        width: rx * 2, height: ry * 2,
        borderRadius: "50%",
        border: "3px solid rgba(255,255,255,0.82)",
        backdropFilter: GF, WebkitBackdropFilter: GF,
        clipPath: "polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)",
        zIndex: 3,
      }} />
    </div>
  );
}

// ── 3. Thoughts — Concentric Glass Rings ─────────────────────────────────────
function RingsIllustration() {
  const cx = 90, cy = 68;
  const rings = [
    { rx: 82, ry: 30, t: 5,   op: 0.52 },
    { rx: 62, ry: 22, t: 4.5, op: 0.64 },
    { rx: 44, ry: 16, t: 4,   op: 0.75 },
    { rx: 26, ry:  9, t: 3.5, op: 0.85 },
  ];
  return (
    <div style={{ position: "relative", width: W, height: H }}>
      {rings.map((r, i) => (
        <div key={i} style={{
          position: "absolute",
          left: cx - r.rx, top: cy - r.ry,
          width: r.rx * 2, height: r.ry * 2,
          borderRadius: "50%",
          border: `${r.t}px solid rgba(255,255,255,${r.op})`,
          backdropFilter: "url(#liquid-glass) blur(1px)",
          WebkitBackdropFilter: "url(#liquid-glass) blur(1px)",
          boxShadow: `inset 0 1.5px 0 rgba(255,255,255,${r.op * 0.75}), 0 0 12px rgba(255,255,255,${r.op * 0.25})`,
        }} />
      ))}
      <Orb d={32} x={cx} y={cy} />
    </div>
  );
}

// ── 4. Handcrafted — Two Glass Tablets ───────────────────────────────────────
function TabletsIllustration() {
  return (
    <div style={{ position: "relative", width: W, height: H }}>
      {/* Back tablet — rotated, slightly less opaque */}
      <div style={{
        position: "absolute", left: 20, top: 20,
        width: 110, height: 90, borderRadius: 24, overflow: "hidden",
        transform: "rotate(-8deg) translate(8px, 4px)",
        filter: SHADOW,
      }}>
        <div style={{ position: "absolute", inset: 0, backdropFilter: GF, WebkitBackdropFilter: GF }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(145deg, rgba(255,255,255,0.62) 0%, rgba(222,230,252,0.32) 100%)" }} />
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: "26%", background: "linear-gradient(180deg, rgba(255,255,255,0.68) 0%, transparent 100%)" }} />
      </div>
      <div style={{
        position: "absolute", left: 20, top: 20, width: 110, height: 90, borderRadius: 24,
        border: "1px solid rgba(255,255,255,0.62)",
        transform: "rotate(-8deg) translate(8px, 4px)",
        pointerEvents: "none",
      }} />
      {/* Front tablet — full brightness */}
      <div style={{
        position: "absolute", left: 54, top: 26,
        width: 110, height: 90, borderRadius: 24, overflow: "hidden",
        filter: SHADOW,
      }}>
        <div style={{ position: "absolute", inset: 0, backdropFilter: GF, WebkitBackdropFilter: GF }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(145deg, rgba(255,255,255,0.82) 0%, rgba(232,238,255,0.45) 100%)" }} />
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: "26%", background: "linear-gradient(180deg, rgba(255,255,255,0.80) 0%, transparent 100%)" }} />
      </div>
      <div style={{
        position: "absolute", left: 54, top: 26, width: 110, height: 90, borderRadius: 24,
        border: "1px solid rgba(255,255,255,0.85)",
        boxShadow: "inset 0 2px 4px rgba(255,255,255,0.70)",
        pointerEvents: "none",
      }} />
    </div>
  );
}

// ── 5. Caffeinated — Liquid Oval + Bubbles ────────────────────────────────────
function LiquidIllustration() {
  const cx = 90, cy = 85, rx = 72, ry = 54;
  return (
    <div style={{ position: "relative", width: W, height: H }}>
      <Orb d={22} x={62} y={22} />
      <Orb d={14} x={93} y={12} />
      <Orb d={11} x={114} y={26} />
      {/* Oval body */}
      <div style={{
        position: "absolute", left: cx - rx, top: cy - ry,
        width: rx * 2, height: ry * 2, borderRadius: "50%", overflow: "hidden",
        filter: SHADOW,
      }}>
        <div style={{ position: "absolute", inset: 0, backdropFilter: GF, WebkitBackdropFilter: GF }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(230,238,255,0.38) 42%, rgba(245,248,255,0.65) 58%, rgba(220,230,252,0.28) 100%)",
        }} />
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: "28%", background: "linear-gradient(180deg, rgba(255,255,255,0.75) 0%, transparent 100%)" }} />
        <svg style={{ position: "absolute", inset: 0 }} width={rx * 2} height={ry * 2}
          viewBox={`0 0 ${rx * 2} ${ry * 2}`}>
          <path
            d={`M0,${ry * 0.96} C${rx * 0.28},${ry * 0.72} ${rx * 0.72},${ry * 1.20} ${rx * 2},${ry * 0.96}`}
            fill="none" stroke="rgba(255,255,255,0.80)" strokeWidth="2" strokeLinecap="round"
          />
        </svg>
      </div>
      <div style={{
        position: "absolute", left: cx - rx, top: cy - ry,
        width: rx * 2, height: ry * 2, borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.80)",
        boxShadow: "inset 0 2px 5px rgba(255,255,255,0.65)",
        pointerEvents: "none",
      }} />
    </div>
  );
}

// ── 6. Resume — Glass Card ────────────────────────────────────────────────────
function ResumeIllustration() {
  return (
    <div style={{ position: "relative", width: W, height: H }}>
      <div style={{
        position: "absolute", left: 28, top: 8, width: 124, height: 112, borderRadius: 24, overflow: "hidden",
        filter: SHADOW,
      }}>
        <div style={{ position: "absolute", inset: 0, backdropFilter: GF, WebkitBackdropFilter: GF }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(145deg, rgba(255,255,255,0.80) 0%, rgba(228,235,255,0.42) 100%)" }} />
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: "24%", background: "linear-gradient(180deg, rgba(255,255,255,0.78) 0%, transparent 100%)" }} />
      </div>
      <div style={{
        position: "absolute", left: 28, top: 8, width: 124, height: 112, borderRadius: 24,
        border: "1px solid rgba(255,255,255,0.85)",
        boxShadow: "inset 0 2px 4px rgba(255,255,255,0.72)",
        pointerEvents: "none",
      }} />
      <Orb d={28} x={90} y={98} />
    </div>
  );
}

// ── Map + export ──────────────────────────────────────────────────────────────

const ILLUSTRATIONS: Record<string, () => React.ReactElement> = {
  "Case Studies": CubeIllustration,
  "Experiments":  SaturnIllustration,
  "Thoughts":     RingsIllustration,
  "Handcrafted":  TabletsIllustration,
  "Caffeinated":  LiquidIllustration,
  "Resume":       ResumeIllustration,
};

// Illustration anchored so its top sits at the default-visible boundary (1/4 cardH).
// scale(1.15) with transformOrigin "bottom right" shifts the rendered top ≈ 20px
// upward — a sliver shows at rest, more on hover, full shape on scroll (3/4 visible).
const BLEED = 22;
const SCALE = 1.15;

export function CardIllustration({ label, visibleHeight }: { label: string; visibleHeight: number }) {
  const IllShape = ILLUSTRATIONS[label];
  if (!IllShape) return null;
  const top = visibleHeight; // pegs illustration to the default-visible boundary
  return (
    <div style={{
      position: "absolute",
      top,
      right: -BLEED,
      transform: `scale(${SCALE})`,
      transformOrigin: "bottom right",
      pointerEvents: "none",
      zIndex: 0,
    }}>
      <IllShape />
    </div>
  );
}
