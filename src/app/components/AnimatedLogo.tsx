import { motion } from "motion/react";
import { useEffect, useState } from "react";

const S = 2.25 * 0.85;

function radius(extra = 0) {
  return `${12 * S + extra}px ${4 * S + extra}px ${12 * S + extra}px ${12 * S + extra}px`;
}

// SVG filter that displaces the backdrop — this is the actual "bending light" effect
function GlassFilters() {
  return (
    <svg width="0" height="0" className="absolute">
      <defs>
        <filter id="liquid-glass" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          {/* Generate noise to use as displacement map */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018 0.022"
            numOctaves="2"
            seed="4"
            result="turbulence"
          />
          {/* Scale/shift turbulence to bias displacement direction (simulates glass lens) */}
          <feColorMatrix
            in="turbulence"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 8 -3"
            result="sharpNoise"
          />
          {/* Displace the background pixels — this bends the light */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="sharpNoise"
            scale="18"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
        </filter>

        {/* Softer version for the blur pass */}
        <filter id="glass-blur" x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
    </svg>
  );
}

function ShapePiece() {
  const w = 34 * S;
  const h = 34.686 * S;
  const r = radius();
  const rInner = radius(0.5);

  return (
    <div className="relative" style={{ width: w, height: h }}>
      {/* Layer 1 — refraction: backdrop-filter with the SVG displacement map */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: r,
          backdropFilter: "url(#liquid-glass) blur(1.5px)",
          WebkitBackdropFilter: "url(#liquid-glass) blur(1.5px)",
          // almost invisible fill — glass is transparent
          background: "rgba(255,255,255,0.06)",
          overflow: "hidden",
        }}
      />

      {/* Layer 2 — very faint frosted tint so it reads as a surface */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: r,
          background: `linear-gradient(
            160deg,
            rgba(255,255,255,0.18) 0%,
            rgba(255,255,255,0.04) 50%,
            rgba(200,215,255,0.07) 100%
          )`,
        }}
      />

      {/* Layer 3 — specular highlight (thin bright sliver at top edge only) */}
      <div
        className="absolute left-0 right-0 top-0"
        style={{
          height: "28%",
          borderRadius: `${12 * S}px ${4 * S}px 0 0`,
          background: `linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)`,
        }}
      />

      {/* Layer 4 — glass rim: thin bright border */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: rInner,
          border: `0.75px solid rgba(255,255,255,0.55)`,
          boxShadow: `
            inset 0 1px 1px rgba(255,255,255,0.6),
            0 ${3 * S}px ${12 * S}px rgba(0,0,0,0.08)
          `,
        }}
      />
    </div>
  );
}

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

const TRANSITION = { duration: 0.55, ease: [0.4, 0, 0.2, 1] as const };
const HOLD_MS = 1400;

export function AnimatedLogo() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s + 1) % states.length);
    }, HOLD_MS);
    return () => clearInterval(id);
  }, []);

  const { piece1, piece2 } = states[step];
  const pieceW = 34 * S;
  const pieceH = 35 * S;
  const containerSize = 90 * S;

  return (
    <>
      <GlassFilters />
      <div
        className="relative overflow-hidden"
        style={{ width: containerSize, height: containerSize }}
      >
        <motion.div
          className="absolute"
          animate={{ left: piece1.left, top: piece1.top, rotate: piece1.rotate, scaleY: piece1.scaleY }}
          transition={TRANSITION}
          style={{ width: pieceW, height: pieceH, originX: "50%", originY: "50%" }}
        >
          <ShapePiece />
        </motion.div>
        <motion.div
          className="absolute"
          animate={{ left: piece2.left, top: piece2.top, rotate: piece2.rotate, scaleY: piece2.scaleY }}
          transition={TRANSITION}
          style={{ width: pieceW, height: pieceH, originX: "50%", originY: "50%" }}
        >
          <ShapePiece />
        </motion.div>
      </div>
    </>
  );
}
