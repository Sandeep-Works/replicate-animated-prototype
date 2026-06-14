import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CardIllustration } from "./components/CardIllustration";
import { DesignBackground } from "./components/DesignBackground";
import { ExpandedSection } from "./components/ExpandedSection";
import { LogoIcon } from "./components/LogoIcon";
import { TypedWord } from "./components/TypedWord";
import { navigateFromCard } from "./cardNavigation";
import { useStepScroll } from "./useStepScroll";
import { useViewport } from "./useViewport";

// ── Theme ─────────────────────────────────────────────────────────────────────
const LIGHT = {
  bg: "#f7f3ec",
  text: "#192040",
  textSub: "rgba(25,32,64,0.42)",
  cardBg: "rgba(255,255,255,0.22)",
  cardBorder: "rgba(255,255,255,0.5)",
  cardShadow: "0 -8px 40px rgba(20,40,100,0.08), inset 0 1px 0 rgba(255,255,255,0.75)",
  cardHighlight: "rgba(255,255,255,0.30)",
  placeholderBg: "rgba(255,255,255,0.22)",
  placeholderBorder: "rgba(25,32,64,0.15)",
  logoText: "rgba(255,255,255,0.6)",
};

const DARK = {
  bg: "#0b1020",
  text: "#ccd8f0",
  textSub: "rgba(200,215,240,0.42)",
  cardBg: "rgba(10,20,50,0.35)",
  cardBorder: "rgba(120,160,255,0.12)",
  cardShadow: "0 -8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(120,160,255,0.10)",
  cardHighlight: "rgba(120,160,255,0.06)",
  placeholderBg: "rgba(120,160,255,0.06)",
  placeholderBorder: "rgba(200,215,240,0.15)",
  logoText: "rgba(255,255,255,0.35)",
};

function useTheme() {
  return LIGHT;
}

// ── SVG filter ────────────────────────────────────────────────────────────────
function GlassFilter() {
  return (
    <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }}>
      <defs>
        <filter id="liquid-glass" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feTurbulence type="turbulence" baseFrequency="0.013 0.009" numOctaves="2" seed="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="9" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

// ── Glass piece ───────────────────────────────────────────────────────────────
const PW = 112.956;
const PH = 116.278;
const R = "39.867px 13.289px 39.867px 39.867px";

function GlassPiece() {
  return (
    <div style={{ position: "relative", width: PW, height: PH }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: R, overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backdropFilter: "blur(1px) brightness(1.07) saturate(1.25)",
          WebkitBackdropFilter: "blur(1px) brightness(1.07) saturate(1.25)",
          filter: "url(#liquid-glass)",
          background: "rgba(255,255,255,0.05)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(160deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 50%, rgba(200,215,255,0.07) 100%)",
        }} />
        <div style={{
          position: "absolute", left: 0, top: 0, right: 0, height: "28%",
          background: "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)",
        }} />
      </div>
      <div style={{
        position: "absolute", inset: 0, borderRadius: R,
        border: "0.75px solid rgba(255,255,255,0.55)",
        boxShadow: "inset 0 1.5px 2px rgba(255,255,255,0.6), 0 8px 32px rgba(0,0,0,0.08)",
        pointerEvents: "none",
      }} />
    </div>
  );
}

// ── Blobs ─────────────────────────────────────────────────────────────────────
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

// ── Cards ─────────────────────────────────────────────────────────────────────
const CARDS = [
  { label: "Case Studies", rotate: 0,   flipY: false },
  { label: "Experiments",  rotate: 0,   flipY: true  },
  { label: "Thoughts",     rotate: 180, flipY: false },
  { label: "Handcrafted",  rotate: 180, flipY: true  },
  { label: "Caffeinated",  rotate: 0,   flipY: false },
  { label: "Resume",       rotate: 180, flipY: false },
];

const FAN_TILTS = [-8, -4.5, -1.5, 1.5, 4.5, 8];

const p1Keys = {
  left: [-35.86, 214.14, -15.86, -15.86, 254.14, 284.14, -35.86],
  top:  [ 64.58, 290.58, 290.58, 216.58, 216.58,  64.58,  64.58],
};
const p2Keys = {
  left: [366.14,  46.14, 326.14, 326.14, -13.86,  -3.86, 366.14],
  top:  [294.14,  -5.86,  -5.86,  64.14,  64.14, 294.14, 294.14],
};
const CYCLE = 34;
const TIMES: number[] = [0, 1/6, 2/6, 3/6, 4/6, 5/6, 1];

function BottomCard({ label, index, theme, cardW, cardH, visible, overlap, isActive, onNavigate }: {
  label: string; index: number;
  theme: typeof LIGHT; cardW: number; cardH: number; visible: number; overlap: number;
  isActive: boolean; onNavigate: () => void;
}) {
  const tilt = FAN_TILTS[index];
  const offsetX = (index - 2.5) * (cardW - overlap);
  const isTopCard = index === CARDS.length - 1;

  return (
    <motion.div
      initial="rest"
      animate={isActive ? "active" : "rest"}
      whileHover={isActive ? undefined : "hover"}
      onClick={onNavigate}
      variants={{
        // default 30 % | hover +14 % → 44 % | scroll +22 % → 52 %  (scroll > hover > default)
        rest:   { y: 0,                transition: { type: "tween", duration: 0.22, ease: [0.4, 0, 0.2, 1] } },
        hover:  { y: -(cardH * 0.14),  transition: { type: "tween", duration: 0.18, ease: [0.4, 0, 0.2, 1], delay: 0 } },
        active: { y: -(cardH * 0.22),  transition: { type: "tween", duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
      }}
      style={{
        position: "absolute",
        bottom: -(cardH - visible),
        left: `calc(50% + ${offsetX}px)`,
        translateX: "-50%",
        rotate: tilt,
        transformOrigin: "bottom center",
        width: cardW,
        height: cardH,
        background: theme.cardBg,
        backdropFilter: "blur(18px) saturate(160%)",
        WebkitBackdropFilter: "blur(18px) saturate(160%)",
        border: `1px solid ${theme.cardBorder}`,
        borderRadius: "20px 20px 0 0",
        cursor: "pointer",
        overflow: "hidden",
        boxShadow: theme.cardShadow,
        zIndex: 10 + index,  // sacrosanct — never changes regardless of state
      }}
    >
      <div style={{
        position: "absolute", left: 0, top: 0, right: 0, height: 48,
        background: `linear-gradient(180deg, ${theme.cardHighlight} 0%, transparent 100%)`,
        pointerEvents: "none",
      }} />
      <CardIllustration label={label} visibleHeight={visible} />
      <div style={{ padding: "20px 20px 0", position: "relative", zIndex: 1 }}>
        <span style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: 11, fontWeight: 400,
          color: theme.textSub,
          letterSpacing: "0.1em", display: "block", marginBottom: 6,
        }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <p style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: cardW < 180 ? 15 : 18, fontWeight: 400,
          color: theme.text, margin: 0, lineHeight: 1.25, letterSpacing: "-0.02em",
        }}>
          {label}
        </p>
      </div>
      {/* Top-right corner blur — suggests the overlapping card above; fades on hover */}
      {!isTopCard && (
        <motion.div
          variants={{
            rest:   { opacity: 1 },
            hover:  { opacity: 0, transition: { duration: 0.16 } },
            active: { opacity: 0, transition: { duration: 0.30 } },
          }}
          style={{
            position: "absolute", top: 0, right: 0,
            width: "70%", height: "70%",
            backdropFilter: "blur(7px)",
            WebkitBackdropFilter: "blur(7px)",
            WebkitMaskImage: "radial-gradient(ellipse at 100% 0%, black 0%, transparent 62%)",
            maskImage: "radial-gradient(ellipse at 100% 0%, black 0%, transparent 62%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}
    </motion.div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
// All 6 cards expand on scroll in deck order
const SCROLL_CARDS = [
  { label: "Case Studies", index: 0 },
  { label: "Experiments",  index: 1 },
  { label: "Thoughts",     index: 2 },
  { label: "Handcrafted",  index: 3 },
  { label: "Caffeinated",  index: 4 },
  { label: "Resume",       index: 5 },
];

// ── Card page (full-screen view after navigation) ─────────────────────────────
function CardPage({
  label, index, theme, mobile, onBack,
}: {
  label: string; index: number; theme: typeof LIGHT; mobile: boolean; onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ type: "tween", duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: "fixed", inset: 0,
        background: theme.bg,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        padding: mobile ? "28px 24px" : "44px 80px",
        overflow: "auto",
      }}
    >
      {/* Back */}
      <motion.button
        onClick={onBack}
        whileHover={{ x: -4 }}
        transition={{ type: "tween", duration: 0.18 }}
        style={{
          background: "none", border: "none", cursor: "pointer",
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: 14, color: theme.textSub,
          display: "flex", alignItems: "center", gap: 8,
          padding: 0, marginBottom: 64, alignSelf: "flex-start",
          letterSpacing: "0.01em",
        }}
      >
        ← Back
      </motion.button>

      {/* Number + label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.30, ease: "easeOut" }}
      >
        <span style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: 13, color: theme.textSub,
          letterSpacing: "0.1em", display: "block", marginBottom: 10,
        }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: mobile ? 44 : 72, fontWeight: 700,
          color: theme.text, margin: 0,
          letterSpacing: "-0.02em", lineHeight: 1.05,
        }}>
          {label}
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.18, duration: 0.30 }}
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: 16, color: theme.textSub,
          marginTop: 28, maxWidth: 520, lineHeight: 1.65,
        }}
      >
        Content coming soon.
      </motion.p>
    </motion.div>
  );
}

export default function App() {
  const theme = useTheme();
  const { width: vw, height: vh, mobile } = useViewport();

  const [expandedStep, setExpandedStep] = useState(0);
  const [currentPage, setCurrentPage] = useState<{ label: string; index: number } | null>(null);

  const handleCardNavigate = (label: string, index: number) => {
    if (navigateFromCard(label)) return;
    setCurrentPage({ label, index });
  };

  const maxStep = SCROLL_CARDS.length + 1;
  useStepScroll((direction) => {
    setExpandedStep((s) =>
      direction === 1 ? Math.min(s + 1, maxStep) : Math.max(s - 1, 0),
    );
  }, mobile ? 450 : 550);

  const heroFontSize   = mobile ? Math.min(44, Math.floor(vw * 0.11)) : 88;
  const heroLineHeight = mobile ? `${heroFontSize + 6}px` : "92.4px";
  const nameFontSize   = mobile ? Math.min(18, Math.floor(vw * 0.048)) : 32;
  const nameLineHeight = mobile ? `${nameFontSize + 14}px` : "60px";
  const cardW          = mobile ? Math.min(132, Math.max(84, Math.floor((vw - 16) / 4.2))) : 210;
  const cardH          = mobile ? Math.round(cardW * 1.73) : 320;
  const overlap        = mobile ? Math.max(48, cardW - Math.ceil((vw - 16) / 5.4)) : 104;
  // Tuned: default ~30 % visible, hover ~52 %, scrolled ~70 %
  const visible        = Math.round(cardH * 0.30);
  const blobScale      = mobile ? 0.55 : 1;

  return (
    <>
    <div
      className="size-full relative overflow-hidden flex items-center justify-center"
      style={{
        background: theme.bg,
        transition: "background 0.4s ease",
        touchAction: "none",
        height: mobile ? "100dvh" : "100%",
      }}
    >
      <GlassFilter />

      {/* Blobs — blue palette */}
      <Blob size={480 * blobScale} color="rgba(80,110,200,0.16)" duration={18} delay={0}
        path={[{x:"10%",y:"10%"},{x:"90%",y:"85%"},{x:"90%",y:"10%"},{x:"10%",y:"85%"},{x:"10%",y:"10%"}]}
        radiusFrames={["62% 38% 55% 45%/50% 60% 40% 50%","40% 60% 70% 30%/55% 35% 65% 45%","70% 30% 45% 55%/38% 62% 50% 50%","50% 50% 35% 65%/65% 45% 55% 35%","62% 38% 55% 45%/50% 60% 40% 50%"]}
      />
      <Blob size={380 * blobScale} color="rgba(100,140,220,0.14)" duration={22} delay={4}
        path={[{x:"95%",y:"50%"},{x:"5%",y:"50%"},{x:"50%",y:"90%"},{x:"50%",y:"8%"},{x:"95%",y:"50%"}]}
        radiusFrames={["45% 55% 65% 35%/60% 40% 55% 45%","65% 35% 40% 60%/45% 65% 35% 55%","35% 65% 55% 45%/55% 45% 65% 35%","60% 40% 70% 30%/40% 60% 45% 55%","45% 55% 65% 35%/60% 40% 55% 45%"]}
      />
      <Blob size={320 * blobScale} color="rgba(60,90,180,0.13)" duration={16} delay={8}
        path={[{x:"88%",y:"88%"},{x:"12%",y:"12%"},{x:"12%",y:"88%"},{x:"88%",y:"12%"},{x:"88%",y:"88%"}]}
        radiusFrames={["70% 30% 50% 50%/40% 60% 45% 55%","38% 62% 60% 40%/65% 35% 55% 45%","55% 45% 35% 65%/50% 50% 70% 30%","45% 55% 68% 32%/38% 62% 40% 60%","70% 30% 50% 50%/40% 60% 45% 55%"]}
      />
      <Blob size={360 * blobScale} color="rgba(130,160,230,0.12)" duration={20} delay={2}
        path={[{x:"50%",y:"5%"},{x:"8%",y:"85%"},{x:"92%",y:"50%"},{x:"8%",y:"12%"},{x:"50%",y:"5%"}]}
        radiusFrames={["50% 50% 40% 60%/60% 40% 65% 35%","68% 32% 55% 45%/42% 58% 38% 62%","40% 60% 65% 35%/55% 45% 50% 50%","55% 45% 38% 62%/68% 32% 45% 55%","50% 50% 40% 60%/60% 40% 65% 35%"]}
      />
      <Blob size={280 * blobScale} color="rgba(50,80,170,0.14)" duration={14} delay={6}
        path={[{x:"50%",y:"50%"},{x:"85%",y:"10%"},{x:"15%",y:"90%"},{x:"50%",y:"50%"}]}
        radiusFrames={["55% 45% 62% 38%/45% 55% 38% 62%","38% 62% 45% 55%/60% 40% 65% 35%","65% 35% 55% 45%/38% 62% 50% 50%","55% 45% 62% 38%/45% 55% 38% 62%"]}
      />
      <Blob size={420 * blobScale} color="rgba(110,170,240,0.13)" duration={24} delay={3}
        path={[{x:"15%",y:"80%"},{x:"85%",y:"10%"},{x:"50%",y:"90%"},{x:"10%",y:"30%"},{x:"15%",y:"80%"}]}
        radiusFrames={["55% 45% 62% 38%/48% 52% 42% 58%","38% 62% 48% 52%/62% 38% 55% 45%","65% 35% 52% 48%/40% 60% 65% 35%","48% 52% 38% 62%/55% 45% 48% 52%","55% 45% 62% 38%/48% 52% 42% 58%"]}
      />
      <Blob size={340 * blobScale} color="rgba(150,190,255,0.12)" duration={19} delay={11}
        path={[{x:"80%",y:"20%"},{x:"15%",y:"55%"},{x:"70%",y:"88%"},{x:"40%",y:"15%"},{x:"80%",y:"20%"}]}
        radiusFrames={["42% 58% 55% 45%/60% 40% 50% 50%","62% 38% 45% 55%/45% 55% 65% 35%","50% 50% 65% 35%/38% 62% 48% 52%","38% 62% 50% 50%/62% 38% 42% 58%","42% 58% 55% 45%/60% 40% 50% 50%"]}
      />

      {/* Logo */}
      <div style={{ position: "absolute", top: mobile ? 16 : 28, left: mobile ? 16 : 32, zIndex: 5 }}>
        <LogoIcon />
      </div>

      {/* ── Expanded section — sits above the fan deck ───────────────────── */}
      <div style={{
        position: "absolute",
        left: 0, right: 0,
        top: mobile ? 52 : 80,
        bottom: mobile ? Math.round(vh * 0.30) : 240,
        display: "flex",
        alignItems: mobile ? "flex-start" : "center",
        justifyContent: "center",
        zIndex: 15,
        pointerEvents: "none",
        padding: mobile ? "0 16px" : 0,
        overflow: mobile ? "visible" : "hidden",
      }}>
        <AnimatePresence mode="wait">
          {expandedStep > 0 && expandedStep <= SCROLL_CARDS.length && (() => {
            const card = SCROLL_CARDS[expandedStep - 1];
            return (
              <div style={{ pointerEvents: "auto", width: mobile ? "100%" : 880, maxWidth: "100%" }}>
                <ExpandedSection
                  key={card.label}
                  label={card.label}
                  index={card.index}
                  theme={theme}
                  mobile={mobile}
                  onNavigate={() => handleCardNavigate(card.label, card.index)}
                />
              </div>
            );
          })()}
        </AnimatePresence>
      </div>

      {/* Hero text — fades out when a section is expanded */}
      <motion.div
        animate={{ opacity: expandedStep > 0 ? 0 : 1 }}
        transition={{ type: "tween", duration: 0.18, ease: "easeOut" }}
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          color: theme.text,
          position: "relative",
          zIndex: 1,
          userSelect: "none",
          marginBottom: 60,
          marginTop: mobile ? -40 : -120,
          padding: mobile ? "0 20px" : 0,
          textAlign: mobile ? "center" as const : "left" as const,
          pointerEvents: expandedStep > 0 ? "none" : "auto",
        }}>
        <p style={{ fontSize: nameFontSize, fontWeight: 300, letterSpacing: "0.8px", lineHeight: nameLineHeight, margin: 0 }}>
          Sandeep Majumder
        </p>
        <div style={{ lineHeight: heroLineHeight, fontSize: heroFontSize }}>
          <p style={{ fontWeight: 700, margin: 0, position: "relative" }}>
            {/* Ghost text reserves max width — prevents layout shift as words type */}
            <span style={{ visibility: "hidden", userSelect: "none" }}>Strategiser</span>
            <TypedWord style={{ position: "absolute", left: 0, top: 0 }} />
          </p>
          <p style={{ fontWeight: 700, margin: 0 }}>Builder</p>
          <p style={{ fontWeight: 400, fontStyle: "italic", margin: 0 }}>Storyteller</p>
        </div>
      </motion.div>

      {/* Animated glass shapes — visible on landing + closing screen */}
      <motion.div
        animate={{ opacity: expandedStep > 0 && expandedStep <= SCROLL_CARDS.length ? 0 : 1 }}
        transition={{ type: "tween", duration: 0.50, ease: "easeOut" }}
        style={{ pointerEvents: "none" }}
      >
      <div style={{
        position: "absolute",
        left: "50%", top: "calc(50% - 60px)",
        width: 467, height: 415,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 2,
        scale: mobile ? 0.6 : 1,
      }}>
        <motion.div
          style={{ position: "absolute", width: PW, height: PH }}
          animate={{ left: p1Keys.left, top: p1Keys.top }}
          transition={{ duration: CYCLE, repeat: Infinity, ease: "easeInOut", repeatType: "loop", times: TIMES }}
        >
          <div style={{ transform: "rotate(180deg) scaleY(-1)", width: PW, height: PH }}>
            <GlassPiece />
          </div>
        </motion.div>
        <motion.div
          style={{ position: "absolute", width: PW, height: PH }}
          animate={{ left: p2Keys.left, top: p2Keys.top }}
          transition={{ duration: CYCLE, repeat: Infinity, ease: "easeInOut", repeatType: "loop", times: TIMES }}
        >
          <div style={{ transform: "scaleY(-1)", width: PW, height: PH }}>
            <GlassPiece />
          </div>
        </motion.div>
      </div>
      </motion.div>


      {/* Scroll hint — bouncing chevron, visible only on landing */}
      <motion.div
        animate={{ opacity: expandedStep > 0 ? 0 : 1 }}
        transition={{ type: "tween", duration: 0.20, ease: "easeOut" }}
        style={{
          position: "absolute",
          bottom: mobile ? Math.round(vh * 0.22) : 160,
          left: "50%",
          translateX: "-50%",
          zIndex: 4,
          pointerEvents: "none",
        }}
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 1.55, repeat: Infinity, ease: "easeInOut" }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
        >
          <svg width="30" height="18" viewBox="0 0 30 18" fill="none">
            <path d="M2 2L15 15L28 2" stroke="rgba(25,32,64,0.52)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {mobile && (
            <span style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 11, color: "rgba(25,32,64,0.42)", letterSpacing: "0.06em",
            }}>
              Swipe up
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* Closing text — appears after all 6 cards, behind the deck */}
      <DesignBackground visible={expandedStep > SCROLL_CARDS.length} />

      {/* Card dock */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {CARDS.map((card, i) => (
          <div key={card.label} style={{ pointerEvents: "auto" }}>
            <BottomCard
              {...card} index={i} theme={theme}
              cardW={cardW} cardH={cardH} visible={visible} overlap={overlap}
              isActive={expandedStep > 0 && expandedStep <= SCROLL_CARDS.length && i === expandedStep - 1}
              onNavigate={() => handleCardNavigate(card.label, i)}
            />
          </div>
        ))}
      </div>
    </div>

    {/* Card page — full-screen, above everything */}
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
