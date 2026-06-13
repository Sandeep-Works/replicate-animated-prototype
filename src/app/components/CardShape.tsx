import React from "react";

const GLASS = "url(#liquid-glass) blur(1.5px)";

// Blue-tinted glass that reads against the light card surface.
// Face brightness reflects a top-left light source.
const LIT = "linear-gradient(145deg, rgba(220,232,255,0.72) 0%, rgba(200,218,255,0.42) 100%)";
const MED = "linear-gradient(180deg, rgba(190,210,255,0.48) 0%, rgba(170,196,255,0.22) 100%)";
const DIM = "linear-gradient(180deg, rgba(155,182,248,0.30) 0%, rgba(138,168,244,0.12) 100%)";

// Clip-path outer → backdrop-filter + gradient inner so the distortion
// is clipped to the polygon and the fill is clearly visible.
function Face({ clip, gradient }: { clip: string; gradient: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, clipPath: clip }}>
      <div style={{
        position: "absolute", inset: 0,
        backdropFilter: GLASS, WebkitBackdropFilter: GLASS,
        background: "rgba(200,215,255,0.06)",
      }} />
      <div style={{ position: "absolute", inset: 0, background: gradient }} />
    </div>
  );
}

function Edges({ path }: { path: string }) {
  return (
    <svg
      style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}
      width="90" height="90" viewBox="0 0 90 90"
    >
      <path d={path} fill="none" stroke="rgba(255,255,255,0.85)"
        strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Cube — Case Studies ───────────────────────────────────────────────────────
// 3 visible faces: top (bright), left (med), right (dim) — light from top-left
function Cube() {
  return (
    <div style={{ position: "relative", width: 90, height: 90 }}>
      <Face clip="polygon(20% 28%, 55% 8%, 88% 28%, 53% 48%)" gradient={LIT} />
      <Face clip="polygon(20% 28%, 53% 48%, 53% 91%, 20% 71%)" gradient={MED} />
      <Face clip="polygon(53% 48%, 88% 28%, 88% 71%, 53% 91%)" gradient={DIM} />
      <Edges path="M50,7 L79,25 L79,64 L48,82 L18,64 L18,25 L50,7 M18,25 L48,43 M79,25 L48,43 M48,43 L48,82" />
    </div>
  );
}

// ── Tetrahedron — Experiments ─────────────────────────────────────────────────
// Triangular pyramid: left face (bright), right face (med), base (dim)
function Tetrahedron() {
  return (
    <div style={{ position: "relative", width: 90, height: 90 }}>
      <Face clip="polygon(48% 6%, 8% 84%, 48% 56%)" gradient={LIT} />
      <Face clip="polygon(48% 6%, 86% 80%, 48% 56%)" gradient={MED} />
      <Face clip="polygon(8% 84%, 86% 80%, 48% 56%)" gradient={DIM} />
      <Edges path="M43,5 L7,76 L77,72 L43,5 M7,76 L43,50 L77,72 M43,5 L43,50" />
    </div>
  );
}

// ── Sphere — Thoughts ─────────────────────────────────────────────────────────
// Radial lighting gradient simulates the round 3D form
function Sphere() {
  return (
    <div style={{ position: "relative", width: 84, height: 84 }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backdropFilter: GLASS, WebkitBackdropFilter: GLASS,
          background: "rgba(255,255,255,0.04)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at 33% 28%, rgba(220,234,255,0.75) 0%, rgba(190,212,255,0.42) 38%, rgba(160,190,255,0.18) 60%, rgba(140,175,255,0.08) 80%, transparent 100%)",
        }} />
        <div style={{
          position: "absolute", top: "10%", left: "16%",
          width: "36%", height: "20%",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.65)",
          filter: "blur(5px)",
        }} />
      </div>
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        border: "0.75px solid rgba(255,255,255,0.80)",
        boxShadow: "inset 0 2px 3px rgba(255,255,255,0.65)",
        pointerEvents: "none",
      }} />
    </div>
  );
}

// ── Gem / Octahedron — Handcrafted ────────────────────────────────────────────
// 4 triangular faces meeting at equator center: top-left (bright), top-right,
// bottom-left, bottom-right (dim)
function Gem() {
  return (
    <div style={{ position: "relative", width: 90, height: 90 }}>
      <Face clip="polygon(47% 6%, 8% 48%, 47% 58%)" gradient={LIT} />
      <Face clip="polygon(47% 6%, 84% 44%, 47% 58%)" gradient={MED} />
      <Face clip="polygon(8% 48%, 47% 58%, 47% 90%)" gradient={MED} />
      <Face clip="polygon(84% 44%, 47% 58%, 47% 90%)" gradient={DIM} />
      <Edges path="M42,5 L7,43 L42,81 L76,40 L42,5 M7,43 L42,52 M76,40 L42,52 M42,52 L42,81" />
    </div>
  );
}

// ── Cylinder — Caffeinated ────────────────────────────────────────────────────
// Top ellipse (bright) + body with left-to-right gradient suggesting curvature
function Cylinder() {
  return (
    <div style={{ position: "relative", width: 80, height: 90 }}>
      {/* Body */}
      <div style={{
        position: "absolute", left: 0, top: 18, right: 0, bottom: 0,
        backdropFilter: GLASS, WebkitBackdropFilter: GLASS,
        background: "linear-gradient(90deg, rgba(215,228,255,0.60) 0%, rgba(190,210,255,0.35) 35%, rgba(165,192,255,0.20) 75%, rgba(175,198,255,0.28) 100%)",
        border: "0.75px solid rgba(255,255,255,0.70)",
        borderTop: "none",
        borderRadius: "0 0 50% 50% / 0 0 14px 14px",
      }} />
      {/* Left edge highlight suggesting cylindrical curvature */}
      <div style={{
        position: "absolute", left: 0, top: 18, width: 2, bottom: 0,
        background: "linear-gradient(180deg, rgba(255,255,255,0.80) 0%, rgba(255,255,255,0.30) 100%)",
        pointerEvents: "none",
      }} />
      {/* Top ellipse */}
      <div style={{
        position: "absolute", left: 0, top: 4, right: 0, height: 28,
        backdropFilter: GLASS, WebkitBackdropFilter: GLASS,
        borderRadius: "50%",
        background: "radial-gradient(ellipse at 35% 32%, rgba(235,243,255,0.82) 0%, rgba(210,226,255,0.55) 50%, rgba(185,208,255,0.28) 100%)",
        border: "0.75px solid rgba(255,255,255,0.85)",
        boxShadow: "inset 0 1.5px 2px rgba(255,255,255,0.70)",
        zIndex: 1,
      }} />
    </div>
  );
}

// ── Rectangular Prism — Resume ────────────────────────────────────────────────
// Tall thin prism (book/document upright): top (bright), left, right (dim)
function Prism() {
  return (
    <div style={{ position: "relative", width: 90, height: 90 }}>
      <Face clip="polygon(18% 8%, 54% 2%, 88% 8%, 54% 14%)" gradient={LIT} />
      <Face clip="polygon(18% 8%, 54% 14%, 54% 93%, 18% 87%)" gradient={MED} />
      <Face clip="polygon(54% 14%, 88% 8%, 88% 87%, 54% 93%)" gradient={DIM} />
      <Edges path="M49,2 L79,7 L79,78 L49,84 L16,78 L16,7 L49,2 M16,7 L49,13 M79,7 L49,13 M49,13 L49,84" />
    </div>
  );
}

// ── Map ───────────────────────────────────────────────────────────────────────

const SHAPES: Record<string, { Component: () => React.ReactElement; size: number; offset: number }> = {
  "Case Studies": { Component: Cube,        size: 90, offset: 22 },
  "Experiments":  { Component: Tetrahedron, size: 90, offset: 22 },
  "Thoughts":     { Component: Sphere,      size: 84, offset: 18 },
  "Handcrafted":  { Component: Gem,         size: 90, offset: 22 },
  "Caffeinated":  { Component: Cylinder,    size: 90, offset: 22 },
  "Resume":       { Component: Prism,       size: 90, offset: 22 },
};

// visibleHeight: the portion of the card that peeks above the card dock.
// The shape is anchored so its bottom bleeds 22px below that visible edge,
// mirroring the 22px right-bleed clipped by the card's overflow:hidden.
export function CardShape({ label, visibleHeight }: { label: string; visibleHeight: number }) {
  const config = SHAPES[label];
  if (!config) return null;
  const { Component, size, offset } = config;
  const top = visibleHeight - size + 22;
  return (
    <div style={{
      position: "absolute",
      top,
      right: -offset,
      pointerEvents: "none",
    }}>
      <Component />
    </div>
  );
}
