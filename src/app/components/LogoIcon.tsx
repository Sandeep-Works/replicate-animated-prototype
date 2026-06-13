import { motion } from "motion/react";
import { useEffect, useState } from "react";

const S = 0.92;

const pieceW = 34 * S;
const pieceH = 34.686 * S;
const containerSize = 90 * S;

function r(extra = 0) {
  return `${12 * S + extra}px ${4 * S + extra}px ${12 * S + extra}px ${12 * S + extra}px`;
}

function GlassPiece() {
  return (
    <div style={{ position: "relative", width: pieceW, height: pieceH }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: r(), overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backdropFilter: "url(#liquid-glass) blur(1.5px)",
          WebkitBackdropFilter: "url(#liquid-glass) blur(1.5px)",
          background: "rgba(255,255,255,0.06)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(160deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 50%, rgba(200,215,255,0.07) 100%)",
        }} />
        <div style={{
          position: "absolute", left: 0, top: 0, right: 0, height: "28%",
          borderRadius: `${12 * S}px ${4 * S}px 0 0`,
          background: "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)",
        }} />
      </div>
      <div style={{
        position: "absolute", inset: 0,
        borderRadius: r(0.5),
        border: "0.75px solid rgba(255,255,255,0.55)",
        boxShadow: `inset 0 1.5px 2px rgba(255,255,255,0.6), 0 ${3 * S}px ${12 * S}px rgba(0,0,0,0.08)`,
        pointerEvents: "none",
      }} />
    </div>
  );
}

// States: 1 = horizontally side-by-side (default/rest)
const states = [
  {
    piece1: { left: 27.73 * S, top: 8 * S,  rotate: 0,   scaleY: 1  },
    piece2: { left: 27.73 * S, top: 47 * S, rotate: 180, scaleY: 1  },
  },
  {
    piece1: { left: 47 * S,    top: 27 * S, rotate: 180, scaleY: -1 },
    piece2: { left: 9 * S,     top: 27 * S, rotate: 0,   scaleY: 1  },
  },
  {
    piece1: { left: 28 * S,    top: 47 * S, rotate: 0,   scaleY: 1  },
    piece2: { left: 28 * S,    top: 8 * S,  rotate: 180, scaleY: -1 },
  },
  {
    piece1: { left: 9 * S,     top: 27 * S, rotate: 180, scaleY: 1  },
    piece2: { left: 47 * S,    top: 27 * S, rotate: 0,   scaleY: -1 },
  },
];

const HOLD_MS = 800;
const TRANSITION = { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const };

export function LogoIcon() {
  const [step, setStep] = useState(1); // start horizontal

  // Play through remaining states once, then rest back at 1 (horizontal)
  useEffect(() => {
    const sequence = [2, 3, 0, 1];
    const ids = sequence.map((s, i) =>
      setTimeout(() => setStep(s), HOLD_MS * (i + 1))
    );
    return () => ids.forEach(clearTimeout);
  }, []);

  const { piece1, piece2 } = states[step];

  return (
    <div style={{ position: "relative", width: containerSize, height: containerSize, overflow: "hidden" }}>
      {/* "Sandeep" faintly behind — glass shapes distort it as they pass */}
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        pointerEvents: "none",
      }}>
        <span style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 13,
          fontWeight: 700,
          color: "rgba(255,255,255,0.55)",
          letterSpacing: "0.04em",
          whiteSpace: "nowrap",
          userSelect: "none",
        }}>
          Sandeep
        </span>
      </div>

      {/* Animated pieces */}
      <motion.div
        className="absolute"
        animate={{ left: piece1.left, top: piece1.top, rotate: piece1.rotate, scaleY: piece1.scaleY }}
        transition={TRANSITION}
        style={{ width: pieceW, height: pieceH, originX: "50%", originY: "50%" }}
      >
        <GlassPiece />
      </motion.div>
      <motion.div
        className="absolute"
        animate={{ left: piece2.left, top: piece2.top, rotate: piece2.rotate, scaleY: piece2.scaleY }}
        transition={TRANSITION}
        style={{ width: pieceW, height: pieceH, originX: "50%", originY: "50%" }}
      >
        <GlassPiece />
      </motion.div>
    </div>
  );
}
