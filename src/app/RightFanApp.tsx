/**
 * RightFanApp — right-edge fan variant.
 * All scroll/hover/navigation logic is identical to App.tsx.
 * What changes:
 *   • Cards fan from the RIGHT edge, spread vertically.
 *   • Elevation uses x (moves left) instead of y (moves up).
 *   • visible = 45 % of cardWidth (width-based, not height-based).
 *   • transformOrigin "right center" keeps the right edge anchored.
 *   • borderRadius "20px 0 0 20px" (left corners rounded).
 *   • Corner blur sits at bottom-right (card below overlaps from bottom).
 *   • CardIllustration omitted — bottom-right design doesn't map here.
 */
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ExpandedSection } from "./components/ExpandedSection";
import { LogoIcon } from "./components/LogoIcon";
import { TypedWord } from "./components/TypedWord";

// ── Theme + hooks (identical to App.tsx) ──────────────────────────────────────
const LIGHT = {
  bg: "#f7f3ec",
  text: "#192040",
  textSub: "rgba(25,32,64,0.42)",
  cardBg: "rgba(255,255,255,0.22)",
  cardBorder: "rgba(255,255,255,0.5)",
  cardShadow: "0 8px 40px rgba(20,40,100,0.08), inset 0 1px 0 rgba(255,255,255,0.75)",
  cardHighlight: "rgba(255,255,255,0.30)",
};

function useTheme() { return LIGHT; }
function useMobile() {
  const [m, setM] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const h = () => setM(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return m;
}

// ── Shared primitives ─────────────────────────────────────────────────────────
function GlassFilter() {
  return (
    <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }}>
      <defs>
        <filter id="liquid-glass" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.018 0.022" numOctaves="2" seed="4" result="turbulence" />
          <feColorMatrix in="turbulence" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 8 -3" result="sharpNoise" />
          <feDisplacementMap in="SourceGraphic" in2="sharpNoise" scale="35" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

const PW = 112.956, PH = 116.278;
const R = "39.867px 13.289px 39.867px 39.867px";
function GlassPiece() {
  return (
    <div style={{ position: "relative", width: PW, height: PH }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: R, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backdropFilter: "url(#liquid-glass) blur(1.5px)", WebkitBackdropFilter: "url(#liquid-glass) blur(1.5px)", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 50%, rgba(200,215,255,0.07) 100%)" }} />
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: "28%", background: "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)" }} />
      </div>
      <div style={{ position: "absolute", inset: 0, borderRadius: R, border: "0.75px solid rgba(255,255,255,0.55)", boxShadow: "inset 0 1.5px 2px rgba(255,255,255,0.6), 0 8px 32px rgba(0,0,0,0.08)", pointerEvents: "none" }} />
    </div>
  );
}

function Blob({ size, color, duration, delay, path, radiusFrames }: {
  size: number; color: string; duration: number; delay: number;
  path: { x: string; y: string }[]; radiusFrames: string[];
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ width: size, height: size, background: color, filter: `blur(${size * 0.38}px)`, translateX: "-50%", translateY: "-50%" }}
      animate={{ left: path.map(p => p.x), top: path.map(p => p.y), scale: path.map((_, i) => i % 2 === 0 ? 1 : 1.1), borderRadius: radiusFrames }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
    />
  );
}

// ── Cards data ────────────────────────────────────────────────────────────────
const CARDS = [
  { label: "Case Studies" },
  { label: "Experiments"  },
  { label: "Thoughts"     },
  { label: "Handcrafted"  },
  { label: "Caffeinated"  },
  { label: "Resume"       },
];

// Same tilts; transformOrigin "right center" fans them vertically
const FAN_TILTS = [-8, -4.5, -1.5, 1.5, 4.5, 8];

const SCROLL_CARDS = [
  { label: "Case Studies", index: 0 },
  { label: "Experiments",  index: 1 },
  { label: "Thoughts",     index: 2 },
  { label: "Handcrafted",  index: 3 },
  { label: "Caffeinated",  index: 4 },
  { label: "Resume",       index: 5 },
];

const p1Keys = { left: [-35.86,214.14,-15.86,-15.86,254.14,284.14,-35.86], top: [64.58,290.58,290.58,216.58,216.58,64.58,64.58] };
const p2Keys = { left: [366.14,46.14,326.14,326.14,-13.86,-3.86,366.14],  top: [294.14,-5.86,-5.86,64.14,64.14,294.14,294.14] };
const CYCLE = 34;
const TIMES = [0, 1/6, 2/6, 3/6, 4/6, 5/6, 1];

// ── Card page ─────────────────────────────────────────────────────────────────
function CardPage({ label, index, theme, mobile, onBack }: {
  label: string; index: number; theme: typeof LIGHT; mobile: boolean; onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
      transition={{ type: "tween", duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      style={{ position: "fixed", inset: 0, background: theme.bg, zIndex: 100, display: "flex", flexDirection: "column", padding: mobile ? "28px 24px" : "44px 80px", overflow: "auto" }}
    >
      <motion.button onClick={onBack} whileHover={{ x: -4 }} transition={{ type: "tween", duration: 0.18 }}
        style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "system-ui", fontSize: 14, color: theme.textSub, display: "flex", alignItems: "center", gap: 8, padding: 0, marginBottom: 64, alignSelf: "flex-start" }}>
        ← Back
      </motion.button>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.30, ease: "easeOut" }}>
        <span style={{ fontFamily: "system-ui", fontSize: 13, color: theme.textSub, letterSpacing: "0.1em", display: "block", marginBottom: 10 }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: mobile ? 44 : 72, fontWeight: 700, color: theme.text, margin: 0, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
          {label}
        </h1>
      </motion.div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
        style={{ fontFamily: "system-ui", fontSize: 16, color: theme.textSub, marginTop: 28, maxWidth: 520, lineHeight: 1.65 }}>
        Content coming soon.
      </motion.p>
    </motion.div>
  );
}

// ── Right fan card ────────────────────────────────────────────────────────────
function RightCard({ label, index, theme, cardW, cardH, visible, isActive, onNavigate }: {
  label: string; index: number; theme: typeof LIGHT;
  cardW: number; cardH: number; visible: number;
  isActive: boolean; onNavigate: () => void;
}) {
  const tilt    = FAN_TILTS[index];
  // Vertical spread — cards fan upward/downward from centre
  const offsetY = (index - 2.5) * (cardH < 280 ? 70 : 90);
  const isTopCard = index === CARDS.length - 1;

  return (
    <motion.div
      initial="rest"
      animate={isActive ? "active" : "rest"}
      whileHover={isActive ? undefined : "hover"}
      onClick={onNavigate}
      variants={{
        // x moves LEFT (negative = into viewport), revealing more of the card
        rest:   { x: 0,              transition: { type: "tween", duration: 0.36, ease: [0.4, 0, 0.2, 1] } },
        hover:  { x: -(cardW * 0.22), transition: { type: "tween", duration: 0.28, ease: [0.4, 0, 0.2, 1], delay: 0 } },
        active: { x: -(cardW * 0.33), transition: { type: "tween", duration: 0.52, ease: [0.22, 1, 0.36, 1] } },
      }}
      style={{
        position: "absolute",
        right: -(cardW - visible),       // right edge flush with viewport; left portion peeks in
        top: `calc(50% + ${offsetY}px)`,
        translateY: "-50%",
        rotate: tilt,
        transformOrigin: "right center", // anchor: right edge stays fixed as card fans
        width: cardW,
        height: cardH,
        background: theme.cardBg,
        backdropFilter: "blur(18px) saturate(160%)",
        WebkitBackdropFilter: "blur(18px) saturate(160%)",
        border: `1px solid ${theme.cardBorder}`,
        borderRadius: "20px 0 0 20px",  // left corners rounded; right edge is the pivot
        cursor: "pointer",
        overflow: "hidden",
        boxShadow: theme.cardShadow,
        zIndex: 10 + index,
      }}
    >
      {/* Top-highlight glass sheen */}
      <div style={{
        position: "absolute", left: 0, top: 0, right: 0, height: 48,
        background: `linear-gradient(180deg, ${theme.cardHighlight} 0%, transparent 100%)`,
        pointerEvents: "none",
      }} />
      {/* Number + label */}
      <div style={{ padding: "20px 20px 0", position: "relative", zIndex: 1 }}>
        <span style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 11, fontWeight: 400, color: theme.textSub, letterSpacing: "0.1em", display: "block", marginBottom: 6 }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <p style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: cardW < 180 ? 15 : 18, fontWeight: 400, color: theme.text, margin: 0, lineHeight: 1.25, letterSpacing: "-0.02em" }}>
          {label}
        </p>
      </div>
      {/* Bottom-right corner blur — the card below (higher z) overlaps from the bottom */}
      {!isTopCard && (
        <motion.div
          variants={{
            rest:   { opacity: 1 },
            hover:  { opacity: 0, transition: { duration: 0.16 } },
            active: { opacity: 0, transition: { duration: 0.30 } },
          }}
          style={{
            position: "absolute", bottom: 0, right: 0,
            width: "70%", height: "55%",
            backdropFilter: "blur(7px)",
            WebkitBackdropFilter: "blur(7px)",
            WebkitMaskImage: "radial-gradient(ellipse at 100% 100%, black 0%, transparent 62%)",
            maskImage: "radial-gradient(ellipse at 100% 100%, black 0%, transparent 62%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}
    </motion.div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function RightFanApp() {
  const theme  = useTheme();
  const mobile = useMobile();

  const [expandedStep, setExpandedStep] = useState(0);
  const [currentPage, setCurrentPage]   = useState<{ label: string; index: number } | null>(null);
  const wheelCooldown = useRef(false);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (wheelCooldown.current) return;
      wheelCooldown.current = true;
      setTimeout(() => { wheelCooldown.current = false; }, 850);
      if (e.deltaY > 0) setExpandedStep(s => Math.min(s + 1, SCROLL_CARDS.length));
      else              setExpandedStep(s => Math.max(s - 1, 0));
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  const heroFontSize   = mobile ? 44 : 88;
  const heroLineHeight = mobile ? "50px" : "92.4px";
  const nameFontSize   = mobile ? 18 : 32;
  const nameLineHeight = mobile ? "32px" : "60px";
  const cardW          = mobile ? 150 : 210;
  const cardH          = mobile ? 260 : 320;
  // Width-based visible — 45 % of card width peeks from the right edge (default state)
  const visible        = Math.round(cardW * 0.45);
  const blobScale      = mobile ? 0.55 : 1;

  return (
    <>
    <div
      className="size-full relative overflow-hidden flex items-center justify-center"
      style={{ background: theme.bg }}
    >
      <GlassFilter />

      {/* Blobs */}
      <Blob size={480*blobScale} color="rgba(80,110,200,0.16)"  duration={18} delay={0}  path={[{x:"10%",y:"10%"},{x:"90%",y:"85%"},{x:"90%",y:"10%"},{x:"10%",y:"85%"},{x:"10%",y:"10%"}]} radiusFrames={["62% 38% 55% 45%/50% 60% 40% 50%","40% 60% 70% 30%/55% 35% 65% 45%","70% 30% 45% 55%/38% 62% 50% 50%","50% 50% 35% 65%/65% 45% 55% 35%","62% 38% 55% 45%/50% 60% 40% 50%"]} />
      <Blob size={380*blobScale} color="rgba(100,140,220,0.14)" duration={22} delay={4}  path={[{x:"95%",y:"50%"},{x:"5%",y:"50%"},{x:"50%",y:"90%"},{x:"50%",y:"8%"},{x:"95%",y:"50%"}]}  radiusFrames={["45% 55% 65% 35%/60% 40% 55% 45%","65% 35% 40% 60%/45% 65% 35% 55%","35% 65% 55% 45%/55% 45% 65% 35%","60% 40% 70% 30%/40% 60% 45% 55%","45% 55% 65% 35%/60% 40% 55% 45%"]} />
      <Blob size={320*blobScale} color="rgba(60,90,180,0.13)"   duration={16} delay={8}  path={[{x:"88%",y:"88%"},{x:"12%",y:"12%"},{x:"12%",y:"88%"},{x:"88%",y:"12%"},{x:"88%",y:"88%"}]} radiusFrames={["70% 30% 50% 50%/40% 60% 45% 55%","38% 62% 60% 40%/65% 35% 55% 45%","55% 45% 35% 65%/50% 50% 70% 30%","45% 55% 68% 32%/38% 62% 40% 60%","70% 30% 50% 50%/40% 60% 45% 55%"]} />
      <Blob size={360*blobScale} color="rgba(130,160,230,0.12)" duration={20} delay={2}  path={[{x:"50%",y:"5%"},{x:"8%",y:"85%"},{x:"92%",y:"50%"},{x:"8%",y:"12%"},{x:"50%",y:"5%"}]}   radiusFrames={["50% 50% 40% 60%/60% 40% 65% 35%","68% 32% 55% 45%/42% 58% 38% 62%","40% 60% 65% 35%/55% 45% 50% 50%","55% 45% 38% 62%/68% 32% 45% 55%","50% 50% 40% 60%/60% 40% 65% 35%"]} />
      <Blob size={280*blobScale} color="rgba(50,80,170,0.14)"   duration={14} delay={6}  path={[{x:"50%",y:"50%"},{x:"85%",y:"10%"},{x:"15%",y:"90%"},{x:"50%",y:"50%"}]}                  radiusFrames={["55% 45% 62% 38%/45% 55% 38% 62%","38% 62% 45% 55%/60% 40% 65% 35%","65% 35% 55% 45%/38% 62% 50% 50%","55% 45% 62% 38%/45% 55% 38% 62%"]} />
      <Blob size={420*blobScale} color="rgba(110,170,240,0.13)" duration={24} delay={3}  path={[{x:"15%",y:"80%"},{x:"85%",y:"10%"},{x:"50%",y:"90%"},{x:"10%",y:"30%"},{x:"15%",y:"80%"}]} radiusFrames={["55% 45% 62% 38%/48% 52% 42% 58%","38% 62% 48% 52%/62% 38% 55% 45%","65% 35% 52% 48%/40% 60% 65% 35%","48% 52% 38% 62%/55% 45% 48% 52%","55% 45% 62% 38%/48% 52% 42% 58%"]} />

      {/* Logo */}
      <div style={{ position: "absolute", top: mobile ? 16 : 28, left: mobile ? 16 : 32, zIndex: 5 }}>
        <LogoIcon />
      </div>

      {/* ── Expanded section — same as main app ── */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 0,
        bottom: mobile ? 210 : 260,
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 15, pointerEvents: "none",
        padding: mobile ? "0 20px" : 0,
      }}>
        <AnimatePresence mode="wait">
          {expandedStep > 0 && (() => {
            const card = SCROLL_CARDS[expandedStep - 1];
            return (
              <div style={{ pointerEvents: "auto", width: mobile ? "100%" : 880 }}>
                <ExpandedSection
                  key={card.label}
                  label={card.label}
                  index={card.index}
                  theme={theme}
                  mobile={mobile}
                  onNavigate={() => setCurrentPage({ label: card.label, index: card.index })}
                />
              </div>
            );
          })()}
        </AnimatePresence>
      </div>

      {/* Hero — fades when a section is expanded */}
      <motion.div
        animate={{ opacity: expandedStep > 0 ? 0 : 1 }}
        transition={{ type: "tween", duration: 0.30, ease: "easeOut" }}
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          color: theme.text,
          position: "relative", zIndex: 1,
          userSelect: "none",
          marginBottom: 60,
          marginTop: mobile ? -80 : -120,
          padding: mobile ? "0 24px" : 0,
          pointerEvents: expandedStep > 0 ? "none" : "auto",
        }}
      >
        <p style={{ fontSize: nameFontSize, fontWeight: 300, letterSpacing: "0.8px", lineHeight: nameLineHeight, margin: 0 }}>
          Sandeep Majumder
        </p>
        <div style={{ lineHeight: heroLineHeight, fontSize: heroFontSize }}>
          <p style={{ fontWeight: 700, margin: 0, position: "relative" }}>
            <span style={{ visibility: "hidden", userSelect: "none" }}>Strategiser</span>
            <TypedWord style={{ position: "absolute", left: 0, top: 0 }} />
          </p>
          <p style={{ fontWeight: 700, margin: 0 }}>Builder</p>
          <p style={{ fontWeight: 400, fontStyle: "italic", margin: 0 }}>Storyteller</p>
        </div>
      </motion.div>

      {/* Hero glass shapes — fades with hero */}
      <motion.div
        animate={{ opacity: expandedStep > 0 ? 0 : 1 }}
        transition={{ type: "tween", duration: 0.30, ease: "easeOut" }}
        style={{ pointerEvents: "none" }}
      >
        <div style={{ position: "absolute", left: "50%", top: "calc(50% - 60px)", width: 467, height: 415, transform: "translate(-50%, -50%)", pointerEvents: "none", zIndex: 2, scale: mobile ? 0.6 : 1 }}>
          <motion.div style={{ position: "absolute", width: PW, height: PH }} animate={{ left: p1Keys.left, top: p1Keys.top }} transition={{ duration: CYCLE, repeat: Infinity, ease: "easeInOut", repeatType: "loop", times: TIMES }}>
            <div style={{ transform: "rotate(180deg) scaleY(-1)", width: PW, height: PH }}><GlassPiece /></div>
          </motion.div>
          <motion.div style={{ position: "absolute", width: PW, height: PH }} animate={{ left: p2Keys.left, top: p2Keys.top }} transition={{ duration: CYCLE, repeat: Infinity, ease: "easeInOut", repeatType: "loop", times: TIMES }}>
            <div style={{ transform: "scaleY(-1)", width: PW, height: PH }}><GlassPiece /></div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Right-edge card dock ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {CARDS.map((card, i) => (
          <div key={card.label} style={{ pointerEvents: "auto" }}>
            <RightCard
              label={card.label} index={i} theme={theme}
              cardW={cardW} cardH={cardH} visible={visible}
              isActive={expandedStep > 0 && i === expandedStep - 1}
              onNavigate={() => setCurrentPage({ label: card.label, index: i })}
            />
          </div>
        ))}
      </div>
    </div>

    {/* Card page */}
    <AnimatePresence>
      {currentPage && (
        <CardPage
          key="card-page"
          label={currentPage.label}
          index={currentPage.index}
          theme={theme}
          mobile={mobile}
          onBack={() => setCurrentPage(null)}
        />
      )}
    </AnimatePresence>
    </>
  );
}
