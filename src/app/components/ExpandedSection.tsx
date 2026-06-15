import React from "react";
import { motion } from "motion/react";
import { MobileBento } from "./MobileBento";
type Theme = {
  text: string;
  textSub: string;
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
};

// ── Generic bento configs (cards 2–6) ─────────────────────────────────────────
const BENTO: Record<string, { areas: string; cols: string; rows: string; cells: string[] }> = {
  "Experiments": {
    areas: `"a b" "c c"`,
    cols:  "1fr 1fr",
    rows:  "1fr 1fr",
    cells: ["a", "b", "c"],
  },
  "Thoughts": {
    areas: `"a a" "b c"`,
    cols:  "1fr 1fr",
    rows:  "1fr 1fr",
    cells: ["a", "b", "c"],
  },
  "Handcrafted": {
    areas: `"a b" "c d"`,
    cols:  "1fr 1fr",
    rows:  "1fr 1fr",
    cells: ["a", "b", "c", "d"],
  },
  "Caffeinated": {
    areas: `"a b" "c b"`,
    cols:  "1fr 1fr",
    rows:  "1fr 1fr",
    cells: ["a", "b", "c"],
  },
  "Resume": {
    areas: `"a b" "a c"`,
    cols:  "1fr 1fr",
    rows:  "1fr 1fr",
    cells: ["a", "b", "c"],
  },
};

// ── Generic placeholder cell ──────────────────────────────────────────────────
function BentoCell({ area, delay }: { area: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "tween", duration: 0.18, delay, ease: "easeOut" }}
      style={{
        gridArea: area,
        borderRadius: 16,
        background: "rgba(246,246,249,0.88)",
        border: "1px solid rgba(255,255,255,0.70)",
        backdropFilter: "url(#liquid-glass) blur(2px)",
        WebkitBackdropFilter: "url(#liquid-glass) blur(2px)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.90)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div style={{
        position: "absolute", left: 0, top: 0, right: 0, height: "30%",
        background: "linear-gradient(180deg, rgba(255,255,255,0.38) 0%, transparent 100%)",
        pointerEvents: "none",
      }} />
      <span style={{
        fontSize: 10,
        fontFamily: "system-ui, -apple-system, sans-serif",
        letterSpacing: "0.18em",
        color: "rgba(25,32,64,0.20)",
        textTransform: "uppercase" as const,
        userSelect: "none" as const,
      }}>gif</span>
    </motion.div>
  );
}

// ── Case Studies: image cell ──────────────────────────────────────────────────
// Pure #F6F6F9 cell, image absolutely positioned per exact Figma coordinates.
function FigmaImageCell({
  src, imgStyle, delay, shadow, width, flexValue, priority = false,
}: {
  src: string;
  imgStyle: React.CSSProperties;
  delay: number;
  shadow?: string;
  width?: number;
  flexValue?: number;
  priority?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ y: -6, transition: { type: "tween", duration: 0.20, ease: "easeOut" } }}
      transition={{ type: "tween", duration: 0.20, delay }}
      style={{
        background: "rgba(246,246,249,0.92)",
        border: "1px solid rgba(255,255,255,0.68)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.90)",
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
        flex: width ? undefined : (flexValue ?? 1),
        width: width,
        flexShrink: width ? 0 : undefined,
        cursor: "pointer",
      }}
    >
      <motion.img
        src={src}
        alt=""
        draggable={false}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ type: "tween", duration: 0.24, delay: delay + 0.04, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          boxShadow: shadow,
          userSelect: "none" as const,
          ...imgStyle,
        }}
      />
    </motion.div>
  );
}


// ── Experiments bento — updated Figma spec ────────────────────────────────────
//
// Container: height 511px, padding 20px, gap 16px, bg rgba(255,255,255,0.5), r:20px
//
// Row 1 (174px): [image-280 flex:1] [Label 276px]
//   image-280: absolute left:67 top:-112 w:421 h:267
//   Label content at (20,63): "View →" 98×41 + "Experiments" Inria Serif 34.5px
//
// Row 2 (flex:1): [Release Popups 225px] [image-297 flex:1]
//   Release Popups: absolute left:38 top:63.56 w:148 h:318
//   image-297: absolute left:74 top:63.5 w:406 h:509
//
function ExperimentsBento({
  index, onNavigate, mobile,
}: {
  index: number; onNavigate: () => void; mobile: boolean;
}) {
  if (mobile) {
    return (
      <MobileBento
        title="Experiments"
        onNavigate={onNavigate}
        images={[
          { src: "/assets/experiments/image-280-531815.webp", priority: true, height: 160 },
          { src: "/assets/experiments/component-release-popups.webp", height: 200 },
          { src: "/assets/experiments/image-297.webp", height: 220 },
        ]}
      />
    );
  }

  const cellBg = "rgba(246,246,249,0.92)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24, scale: 0.98, transition: { type: "tween", duration: 0.16, ease: "easeIn" } }}
      transition={{ type: "tween", duration: 0.30, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: "100%",
        height: 511,
        background: "rgba(195,205,225,0.30)",
        backdropFilter: "blur(18px) saturate(140%)",
        WebkitBackdropFilter: "blur(18px) saturate(140%)",
        borderRadius: 20,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      {/* ── Row 1 — 174px ── */}
      <div style={{ display: "flex", gap: 16, height: 174, flexShrink: 0 }}>

        {/* image-280 cell — flex:1 */}
        <FigmaImageCell
          src="/assets/experiments/image-280-531815.webp"
          delay={0.04}
          priority
          imgStyle={{ left: 67, top: -112, width: 421, height: 267, borderRadius: 12 }}
        />

        {/* Label cell — 276px */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ y: -6, transition: { type: "tween", duration: 0.20, ease: "easeOut" } }}
          transition={{ type: "tween", duration: 0.22, delay: 0.10 }}
          style={{
            width: 276, flexShrink: 0,
            background: cellBg,
            border: "1px solid rgba(255,255,255,0.68)",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.90)",
            borderRadius: 16,
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          <div style={{
            position: "absolute",
            left: 24, bottom: 24,
            width: 199,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}>
            <motion.button
              onClick={onNavigate}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                width: 98, height: 41,
                borderRadius: 20,
                background: "rgba(255,255,255,0.90)",
                border: "1px solid rgba(0,0,0,0.10)",
                boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.05)",
                cursor: "pointer",
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 14, fontWeight: 400,
                color: "#15151C",
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: 6,
                flexShrink: 0,
              }}
            >
              View <span style={{ fontSize: 14 }}>→</span>
            </motion.button>
            <p style={{
              fontFamily: "'Inria Serif', Georgia, serif",
              fontSize: 34.5, fontWeight: 700,
              color: "#15151C",
              margin: 0, lineHeight: "46px",
              letterSpacing: "-0.01em",
            }}>
              Experiments
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Row 2 — flex:1 ── */}
      <div style={{ display: "flex", gap: 16, flex: 1 }}>

        {/* Release Popups cell — 225px */}
        <FigmaImageCell
          src="/assets/experiments/component-release-popups.webp"
          width={225}
          delay={0.18}
          imgStyle={{ left: 38, top: 63.56, width: 148, height: 318, borderRadius: 12 }}
          shadow="0px 0.84px 2.52px 0px rgba(0,0,0,0.30), 0px 3.36px 6.72px 2.52px rgba(0,0,0,0.15)"
        />

        {/* image-297 cell — flex:1 */}
        <FigmaImageCell
          src="/assets/experiments/image-297.webp"
          delay={0.26}
          imgStyle={{ left: 74, top: 63.5, width: 406, height: 509, borderRadius: 12 }}
        />
      </div>
    </motion.div>
  );
}

// ── Handcrafted bento — revamped Figma spec (node 4-3159) ────────────────────
//
// Row 1: [img-2146 263px] [img-2144 229px] [Label 322px]
//   img-2146: left:39 top:35   w:185 h:242 r:16
//   img-2144: left:34 top:-15  w:161 h:199 r:16
//   Label content at (24,110)
//
// Row 2: [img-2140 327px] [img-2142 fill] [img-2141 fill]
//   img-2140: left:38 top:40.5 w:251 h:268 r:16 (new crop 152c46)
//   img-2142: left:34 top:-36.5 w:175 h:220 r:16
//   img-2141: left:32.5 top:40.5 w:180 h:210 r:16
//
function HandcraftedBento({
  index, onNavigate, mobile,
}: {
  index: number; onNavigate: () => void; mobile: boolean;
}) {
  if (mobile) {
    return (
      <MobileBento
        title="Handcrafted"
        onNavigate={onNavigate}
        images={[
          { src: "/assets/handcrafted/img-2146.webp", priority: true, height: 170 },
          { src: "/assets/handcrafted/img-2144.webp", height: 160 },
          { src: "/assets/handcrafted/img-2140-152c46.webp", height: 180 },
          { src: "/assets/handcrafted/img-2142.webp", height: 160 },
          { src: "/assets/handcrafted/img-2141.webp", height: 160 },
        ]}
      />
    );
  }

  const cellBg = "rgba(246,246,249,0.92)";
  const cellStyle: React.CSSProperties = {
    background: cellBg,
    border: "1px solid rgba(255,255,255,0.68)",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.90)",
    borderRadius: 16,
    position: "relative",
    overflow: "hidden",
    flexShrink: 0,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24, scale: 0.98, transition: { type: "tween", duration: 0.16, ease: "easeIn" } }}
      transition={{ type: "tween", duration: 0.30, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: "100%",
        height: 511,
        background: "rgba(195,205,225,0.30)",
        backdropFilter: "blur(18px) saturate(140%)",
        WebkitBackdropFilter: "blur(18px) saturate(140%)",
        borderRadius: 20,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      {/* ── Row 1 — flex:1 (~227px) ── */}
      <div style={{ display: "flex", gap: 16, flex: 1 }}>

        {/* img-2146 — 263px */}
        <FigmaImageCell
          src="/assets/handcrafted/img-2146.webp"
          width={263}
          delay={0.04}
          priority
          imgStyle={{ left: 39, top: 35, width: 185, height: 242, borderRadius: 12 }}
        />

        {/* img-2144 — 229px */}
        <FigmaImageCell
          src="/assets/handcrafted/img-2144.webp"
          width={229}
          delay={0.08}
          imgStyle={{ left: 34, top: -15, width: 161, height: 199, borderRadius: 12 }}
        />

        {/* Label cell — 322px RIGHT */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ y: -6, transition: { type: "tween", duration: 0.20, ease: "easeOut" } }}
          transition={{ type: "tween", duration: 0.22, delay: 0.12 }}
          style={{ ...cellStyle, width: 322, cursor: "pointer" }}
        >
          <div style={{
            position: "absolute",
            left: 24, bottom: 24,
            width: 199,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}>
            <motion.button
              onClick={onNavigate}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                width: 98, height: 41,
                borderRadius: 20,
                background: "rgba(255,255,255,0.90)",
                border: "1px solid rgba(0,0,0,0.10)",
                boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.05)",
                cursor: "pointer",
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 14, fontWeight: 400,
                color: "#15151C",
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: 6,
                flexShrink: 0,
              }}
            >
              View <span style={{ fontSize: 14 }}>→</span>
            </motion.button>
            <p style={{
              fontFamily: "'Inria Serif', Georgia, serif",
              fontSize: 34.5, fontWeight: 700,
              color: "#15151C",
              margin: 0, lineHeight: "46px",
              letterSpacing: "-0.01em",
            }}>
              Handcrafted
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Row 2 — flex:1 (~227px) ── */}
      <div style={{ display: "flex", gap: 16, flex: 1 }}>

        {/* img-2140 — 327px (new crop 152c46) */}
        <FigmaImageCell
          src="/assets/handcrafted/img-2140-152c46.webp"
          width={327}
          delay={0.18}
          imgStyle={{ left: 38, top: 40.5, width: 251, height: 268, borderRadius: 12 }}
        />

        {/* img-2142 — fill */}
        <FigmaImageCell
          src="/assets/handcrafted/img-2142.webp"
          delay={0.22}
          imgStyle={{ left: 34, top: -36.5, width: 175, height: 220, borderRadius: 12 }}
        />

        {/* img-2141 — fill */}
        <FigmaImageCell
          src="/assets/handcrafted/img-2141.webp"
          delay={0.26}
          imgStyle={{ left: 32.5, top: 40.5, width: 180, height: 210, borderRadius: 12 }}
        />
      </div>
    </motion.div>
  );
}

// ── Caffeinated bento — revamped Figma spec (node 5-4852) ────────────────────
//
// Row 1: [Label fill LEFT] [img-278 263px] [img-277a 204px]
//   Label content at (24,110)
//   img-278:  left:45 top:-37 w:173 h:224 r:12
//   img-277a: left:37 top:60  w:130 h:173 r:12
//
// Row 2: [img-276 285px] [img-277b fill] [img-277c 262px]  (unchanged)
//   img-276:  left:54 top:35.5  w:177 h:222 r:16
//   img-277b: left:45 top:-29.5 w:178 h:228 r:12
//   img-277c: left:48 top:35.5  w:167 h:203 r:12
//
function CaffeinatedBento({
  index, onNavigate, mobile,
}: {
  index: number; onNavigate: () => void; mobile: boolean;
}) {
  if (mobile) {
    return (
      <MobileBento
        title="Caffeinated"
        onNavigate={onNavigate}
        images={[
          { src: "/assets/caffeinated/img-278-570c3b.webp", priority: true, height: 170 },
          { src: "/assets/caffeinated/img-277-1cbcaa.webp", height: 160 },
          { src: "/assets/caffeinated/img-276-e797b2.webp", height: 170 },
          { src: "/assets/caffeinated/img-277-7c6c1e.webp", height: 170 },
          { src: "/assets/caffeinated/img-277-6a1602.webp", height: 160 },
        ]}
      />
    );
  }

  const cellBg = "rgba(246,246,249,0.92)";
  const cellStyle: React.CSSProperties = {
    background: cellBg,
    border: "1px solid rgba(255,255,255,0.68)",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.90)",
    borderRadius: 16,
    position: "relative",
    overflow: "hidden",
    flexShrink: 0,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24, scale: 0.98, transition: { type: "tween", duration: 0.16, ease: "easeIn" } }}
      transition={{ type: "tween", duration: 0.30, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: "100%",
        height: 511,
        background: "rgba(195,205,225,0.30)",
        backdropFilter: "blur(18px) saturate(140%)",
        WebkitBackdropFilter: "blur(18px) saturate(140%)",
        borderRadius: 20,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      {/* ── Row 1 — flex:1 (~227px) ── */}
      <div style={{ display: "flex", gap: 16, flex: 1 }}>

        {/* Label cell — fill LEFT */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ y: -6, transition: { type: "tween", duration: 0.20, ease: "easeOut" } }}
          transition={{ type: "tween", duration: 0.22, delay: 0.04 }}
          style={{ ...cellStyle, flex: 1, flexShrink: undefined, cursor: "pointer" }}
        >
          <div style={{
            position: "absolute",
            left: 24, bottom: 24,
            width: 199,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}>
            <motion.button
              onClick={onNavigate}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                width: 98, height: 41,
                borderRadius: 20,
                background: "rgba(255,255,255,0.90)",
                border: "1px solid rgba(0,0,0,0.10)",
                boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.05)",
                cursor: "pointer",
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 14, fontWeight: 400,
                color: "#15151C",
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: 6,
                flexShrink: 0,
              }}
            >
              View <span style={{ fontSize: 14 }}>→</span>
            </motion.button>
            <p style={{
              fontFamily: "'Inria Serif', Georgia, serif",
              fontSize: 34.5, fontWeight: 700,
              color: "#15151C",
              margin: 0, lineHeight: "46px",
              letterSpacing: "-0.01em",
            }}>
              Caffeinated
            </p>
          </div>
        </motion.div>

        {/* img-278 — 263px */}
        <FigmaImageCell
          src="/assets/caffeinated/img-278-570c3b.webp"
          width={263}
          delay={0.08}
          imgStyle={{ left: 45, top: -37, width: 173, height: 224, borderRadius: 12 }}
        />

        {/* img-277a — 204px */}
        <FigmaImageCell
          src="/assets/caffeinated/img-277-1cbcaa.webp"
          width={204}
          delay={0.12}
          imgStyle={{ left: 37, top: 60, width: 130, height: 173, borderRadius: 12 }}
        />
      </div>

      {/* ── Row 2 — flex:1 (~227px) — unchanged ── */}
      <div style={{ display: "flex", gap: 16, flex: 1 }}>

        {/* img-276 — 285px */}
        <FigmaImageCell
          src="/assets/caffeinated/img-276-e797b2.webp"
          width={285}
          delay={0.18}
          imgStyle={{ left: 54, top: 35.5, width: 177, height: 222, borderRadius: 12 }}
        />

        {/* img-277b — fill */}
        <FigmaImageCell
          src="/assets/caffeinated/img-277-7c6c1e.webp"
          delay={0.22}
          imgStyle={{ left: 45, top: -29.5, width: 178, height: 228, borderRadius: 12 }}
        />

        {/* img-277c — 262px */}
        <FigmaImageCell
          src="/assets/caffeinated/img-277-6a1602.webp"
          width={262}
          delay={0.26}
          imgStyle={{ left: 48, top: 35.5, width: 167, height: 203, borderRadius: 12 }}
        />
      </div>
    </motion.div>
  );
}

// ── Resume bento — revamped Figma spec (node 7-555) ─────────────────────────
//
// Container: 886×511px, column, padding 20px, gap 16px
//
// Row 1 (112px): Full-width label cell
//   Content at (20,15): image-293 98×41 + "Resume" Inria Serif 34.5px
//
// Row 2 (flex:1): Full-width cell showing resume document
//   resume-doc.png at left:136.57 top:38, w:612 h:754 (overflows, clipped)
//
function ResumeBento({
  index, onNavigate, mobile,
}: {
  index: number; onNavigate: () => void; mobile: boolean;
}) {
  if (mobile) {
    return (
      <MobileBento
        title="Resume"
        onNavigate={onNavigate}
        images={[
          { src: "/assets/resume/resume-doc.webp", priority: true, height: 280 },
        ]}
      />
    );
  }

  const cellBg = "rgba(246,246,249,0.92)";
  const cellStyle: React.CSSProperties = {
    background: cellBg,
    border: "1px solid rgba(255,255,255,0.68)",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.90)",
    borderRadius: 16,
    position: "relative",
    overflow: "hidden",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24, scale: 0.98, transition: { type: "tween", duration: 0.16, ease: "easeIn" } }}
      transition={{ type: "tween", duration: 0.30, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: "100%",
        height: 511,
        background: "rgba(195,205,225,0.30)",
        backdropFilter: "blur(18px) saturate(140%)",
        WebkitBackdropFilter: "blur(18px) saturate(140%)",
        borderRadius: 20,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      {/* ── Row 1 — 112px header ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ y: -4, transition: { type: "tween", duration: 0.20, ease: "easeOut" } }}
        transition={{ type: "tween", duration: 0.22, delay: 0.04 }}
        style={{ ...cellStyle, height: 126, flexShrink: 0, cursor: "pointer" }}
      >
        <div style={{
          position: "absolute",
          left: 24, top: 16,
          width: 199,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}>
          <motion.button
            onClick={onNavigate}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              width: 98, height: 41,
              borderRadius: 20,
              background: "rgba(255,255,255,0.90)",
              border: "1px solid rgba(0,0,0,0.10)",
              boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.05)",
              cursor: "pointer",
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 14, fontWeight: 400,
              color: "#15151C",
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 6,
              flexShrink: 0,
            }}
          >
            View <span style={{ fontSize: 14 }}>→</span>
          </motion.button>
          <p style={{
            fontFamily: "'Inria Serif', Georgia, serif",
            fontSize: 34.5, fontWeight: 700,
            color: "#15151C",
            margin: 0, lineHeight: "46px",
            letterSpacing: "-0.01em",
          }}>
            Resume
          </p>
        </div>
      </motion.div>

      {/* ── Row 2 — flex:1 (resume document preview) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "tween", duration: 0.28, delay: 0.10 }}
        style={{ ...cellStyle, flex: 1 }}
      >
        <motion.img
          src="/assets/resume/resume-doc.webp"
          alt=""
          draggable={false}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ type: "tween", duration: 0.24, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            left: 136.57, top: 38,
            width: 612, height: 754,
            borderRadius: 12,
            userSelect: "none",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ── Thoughts bento — revamped Figma spec (node 4-2329) ───────────────────────
//
// Row 1: [Label 355px LEFT] [white-card fill RIGHT]
//   Label content at (34,108)
//   White card at (39,-12) w:398 h:199 r:12 → image-305-4c6dee at (0,-3) w:398 h:180
//
// Row 2: [white-card 292px] [white-card fill]
//   Card 1 at (27.5,53.5) w:238 h:199 r:12 → image-305-207ac5 at (20.5,17) w:198 h:156
//   Card 2 at (70,53.5) w:398 h:234 r:12 → image-298 at (48,29) w:302 h:205
//
function ThoughtsBento({
  index, onNavigate, mobile,
}: {
  index: number; onNavigate: () => void; mobile: boolean;
}) {
  if (mobile) {
    return (
      <MobileBento
        title="Thoughts"
        onNavigate={onNavigate}
        images={[
          { src: "/assets/thoughts/image-306.webp", priority: true, height: 200 },
          { src: "/assets/thoughts/image-305-207ac5.webp", height: 150 },
          { src: "/assets/thoughts/image-298.webp", height: 170 },
        ]}
      />
    );
  }

  const cellBg = "rgba(246,246,249,0.92)";
  const cellBase: React.CSSProperties = {
    background: cellBg,
    border: "1px solid rgba(255,255,255,0.68)",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.90)",
    borderRadius: 16,
    position: "relative",
    overflow: "hidden",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24, scale: 0.98, transition: { type: "tween", duration: 0.16, ease: "easeIn" } }}
      transition={{ type: "tween", duration: 0.30, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: "100%",
        height: 511,
        background: "rgba(195,205,225,0.30)",
        backdropFilter: "blur(18px) saturate(140%)",
        WebkitBackdropFilter: "blur(18px) saturate(140%)",
        borderRadius: 20,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      {/* ── Row 1 — flex:1 (~227px) ── */}
      <div style={{ display: "flex", gap: 16, flex: 1 }}>

        {/* Label cell — 355px LEFT */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ y: -6, transition: { type: "tween", duration: 0.20, ease: "easeOut" } }}
          transition={{ type: "tween", duration: 0.22, delay: 0.04 }}
          style={{ ...cellBase, width: 355, flexShrink: 0, cursor: "pointer" }}
        >
          <div style={{
            position: "absolute",
            left: 34, bottom: 24,
            width: 199,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}>
            <motion.button
              onClick={onNavigate}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                width: 98, height: 41,
                borderRadius: 20,
                background: "rgba(255,255,255,0.90)",
                border: "1px solid rgba(0,0,0,0.10)",
                boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.05)",
                cursor: "pointer",
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 14, fontWeight: 400,
                color: "#15151C",
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: 6,
                flexShrink: 0,
              }}
            >
              View <span style={{ fontSize: 14 }}>→</span>
            </motion.button>
            <p style={{
              fontFamily: "'Inria Serif', Georgia, serif",
              fontSize: 34.5, fontWeight: 700,
              color: "#15151C",
              margin: 0, lineHeight: "46px",
              letterSpacing: "-0.01em",
            }}>
              Thoughts
            </p>
          </div>
        </motion.div>

        {/* Image cell — fill RIGHT */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "tween", duration: 0.22, delay: 0.10 }}
          style={{ ...cellBase, flex: 1 }}
        >
          <motion.img
            src="/assets/thoughts/image-306.webp"
            alt="" draggable={false}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ type: "tween", duration: 0.24, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "top center",
              borderRadius: 12, userSelect: "none",
            }}
          />
        </motion.div>
      </div>

      {/* ── Row 2 — flex:1 (~227px) ── */}
      <div style={{ display: "flex", gap: 16, flex: 1 }}>

        {/* White-card image cell — 292px */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "tween", duration: 0.22, delay: 0.18 }}
          style={{ ...cellBase, width: 292, flexShrink: 0 }}
        >
          <div style={{
            position: "absolute",
            left: 27.5, top: 53.5,
            width: 238, height: 199,
            background: "#FEFEFE",
            borderRadius: 12,
            overflow: "hidden",
          }}>
            <motion.img
              src="/assets/thoughts/image-305-207ac5.webp"
              alt="" draggable={false}
              loading="lazy"
              decoding="async"
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ type: "tween", duration: 0.24, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "absolute", left: 20.5, top: 17, width: 198, height: 156, borderRadius: 12, userSelect: "none" }}
            />
          </div>
        </motion.div>

        {/* White-card image cell — fill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "tween", duration: 0.22, delay: 0.24 }}
          style={{ ...cellBase, flex: 1 }}
        >
          <div style={{
            position: "absolute",
            left: 70, top: 53.5,
            width: 398, height: 234,
            background: "#FEFEFE",
            borderRadius: 12,
            overflow: "hidden",
          }}>
            <motion.img
              src="/assets/thoughts/image-298.webp"
              alt="" draggable={false}
              loading="lazy"
              decoding="async"
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ type: "tween", duration: 0.24, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "absolute", left: 48, top: 29, width: 302, height: 205, borderRadius: 12, userSelect: "none" }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Case Studies bento ────────────────────────────────────────────────────────
// ── Case Studies bento — exact Figma spec ─────────────────────────────────────
//
// Container: height 511px, padding 20px, gap 16px, bg rgba(255,255,255,0.5), r:20px
//
// Row 1: [Label 276px] [3.1.png flex:1]
//   Label content at (20,127): "View →" 98×41 + "Case studies" Inria Serif 34.5px
//   3.1 image: absolute left:44 top:-112 w:467 h:303 bg:#fff r:7.52px shadow
//
// Row 2: [image-293 flex:1] [Component61 276px]
//   image-293: absolute left:62 top:45.5 w:451 h:330
//   Component 61: absolute left:48 top:43 w:180 h:218 heavy shadow
//
function CaseStudiesBento({
  index, onNavigate, mobile,
}: {
  index: number; onNavigate: () => void; mobile: boolean;
}) {
  if (mobile) {
    return (
      <MobileBento
        title="Case studies"
        onNavigate={onNavigate}
        images={[
          { src: "/assets/case-studies/3.1.webp", priority: true, height: 170 },
          { src: "/assets/case-studies/image-293.webp", height: 180 },
          { src: "/assets/case-studies/component-61.webp", height: 200 },
        ]}
      />
    );
  }

  const cellBg = "rgba(246,246,249,0.92)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24, scale: 0.98, transition: { type: "tween", duration: 0.16, ease: "easeIn" } }}
      transition={{ type: "tween", duration: 0.30, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: "100%",
        height: 511,
        background: "rgba(195,205,225,0.30)",
        backdropFilter: "blur(18px) saturate(140%)",
        WebkitBackdropFilter: "blur(18px) saturate(140%)",
        borderRadius: 20,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      {/* ── Row 1 ── */}
      <div style={{ display: "flex", gap: 16, flex: 1 }}>

        {/* Label cell — 276px */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ y: -6, transition: { type: "tween", duration: 0.20, ease: "easeOut" } }}
          transition={{ type: "tween", duration: 0.22, delay: 0.04 }}
          onClick={onNavigate}
          style={{
            width: 276, flexShrink: 0,
            background: cellBg,
            border: "1px solid rgba(255,255,255,0.68)",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.90)",
            borderRadius: 16,
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          {/* Label content — positioned per Figma: left:20, top:127 */}
          <div style={{
            position: "absolute",
            left: 24, bottom: 24,
            width: 199,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}>
            {/* "View →" button — 98×41px, r:20, shadow */}
            <motion.button
              onClick={(e) => { e.stopPropagation(); onNavigate(); }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                width: 98, height: 41,
                borderRadius: 20,
                background: "rgba(255,255,255,0.90)",
                border: "1px solid rgba(0,0,0,0.10)",
                boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.05)",
                cursor: "pointer",
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 14, fontWeight: 400,
                color: "#15151C",
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: 6,
                flexShrink: 0,
              }}
            >
              View <span style={{ fontSize: 14 }}>→</span>
            </motion.button>
            {/* "Case studies" — Inria Serif 700 34.5px */}
            <p style={{
              fontFamily: "'Inria Serif', Georgia, serif",
              fontSize: 34.5, fontWeight: 700,
              color: "#15151C",
              margin: 0, lineHeight: "46px",
              letterSpacing: "-0.01em",
            }}>
              Case studies
            </p>
          </div>
        </motion.div>

        {/* 3.1.png cell — flex:1 */}
        <FigmaImageCell
          src="/assets/case-studies/3.1.webp"
          delay={0.10}
          priority
          imgStyle={{
            left: 44, top: -30,
            width: 467, height: 303,
            background: "#ffffff",
            borderRadius: 12,
          }}
          shadow="0px 0.68px 1.35px 0px rgba(0,0,0,0.05)"
        />
      </div>

      {/* ── Row 2 ── */}
      <div style={{ display: "flex", gap: 16, flex: 1 }}>

        {/* image-293 cell — flex:1 */}
        <FigmaImageCell
          src="/assets/case-studies/image-293.webp"
          delay={0.18}
          imgStyle={{ left: 62, top: 45.5, width: 451, height: 330, borderRadius: 12 }}
        />

        {/* Component 61 cell — 276px fixed */}
        <FigmaImageCell
          src="/assets/case-studies/component-61.webp"
          width={276}
          delay={0.26}
          imgStyle={{
            left: 48, top: 43,
            width: 180, height: 218,
            borderRadius: 12,
          }}
          shadow="0px 0.84px 2.52px 0px rgba(0,0,0,0.30), 0px 3.36px 6.72px 2.52px rgba(0,0,0,0.15)"
        />
      </div>
    </motion.div>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface Props {
  label: string;
  index: number;
  theme: Theme;
  mobile: boolean;
  onNavigate: () => void;
}

export function ExpandedSection({ label, index, theme, mobile, onNavigate }: Props) {
  const width = mobile ? "calc(100vw - 40px)" : 880;

  return (
    <motion.div
      key={label}
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      animate={{ opacity: 1, y: 0,  scale: 1    }}
      exit={{
        opacity: 0, y: -24, scale: 0.98,
        transition: { type: "tween", duration: 0.16, ease: "easeIn" },
      }}
      transition={{ type: "tween", duration: 0.30, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12, width }}
    >
      {/* ── Figma-spec bentos ── */}
      {label === "Case Studies" ? (
        <CaseStudiesBento index={index} onNavigate={onNavigate} mobile={mobile} />
      ) : label === "Experiments" ? (
        <ExperimentsBento index={index} onNavigate={onNavigate} mobile={mobile} />
      ) : label === "Handcrafted" ? (
        <HandcraftedBento index={index} onNavigate={onNavigate} mobile={mobile} />
      ) : label === "Caffeinated" ? (
        <CaffeinatedBento index={index} onNavigate={onNavigate} mobile={mobile} />
      ) : label === "Resume" ? (
        <ResumeBento index={index} onNavigate={onNavigate} mobile={mobile} />
      ) : label === "Thoughts" ? (
        <ThoughtsBento index={index} onNavigate={onNavigate} mobile={mobile} />
      ) : (
        // ── All other cards — same container dimensions as Case Studies ──────
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -24, scale: 0.98, transition: { type: "tween", duration: 0.16, ease: "easeIn" } }}
          transition={{ type: "tween", duration: 0.30, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: "100%",
            height: 511,
            background: "rgba(255,255,255,0.50)",
            backdropFilter: "blur(18px) saturate(140%)",
            WebkitBackdropFilter: "blur(18px) saturate(140%)",
            borderRadius: 20,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          {/* Label + CTA inside the container */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "tween", duration: 0.20, delay: 0.06, ease: "easeOut" }}
            style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexShrink: 0 }}
          >
            <div>
              <span style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 12, fontWeight: 400, color: "rgba(25,32,64,0.40)",
                letterSpacing: "0.1em", display: "block", marginBottom: 4,
              }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <p style={{
                fontFamily: "'Inria Serif', 'Playfair Display', Georgia, serif",
                fontSize: mobile ? 24 : 32, fontWeight: 700,
                color: "#15151C", margin: 0,
                letterSpacing: "-0.02em", lineHeight: 1.1,
              }}>
                {label}
              </p>
            </div>
            <motion.button
              onClick={onNavigate}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                height: 41, borderRadius: 20,
                background: "rgba(255,255,255,0.90)",
                border: "1px solid rgba(0,0,0,0.10)",
                boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.05)",
                cursor: "pointer",
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 14, fontWeight: 400, color: "#15151C",
                display: "flex", alignItems: "center", gap: 6,
                padding: "0 18px", flexShrink: 0,
              }}
            >
              View <span style={{ fontSize: 14 }}>→</span>
            </motion.button>
          </motion.div>

          {/* Bento grid fills remaining height */}
          {BENTO[label] && (
            <div style={{
              flex: 1,
              display: "grid",
              gridTemplateAreas: BENTO[label].areas,
              gridTemplateColumns: BENTO[label].cols,
              gridTemplateRows: BENTO[label].rows,
              gap: 10,
            }}>
              {BENTO[label].cells.map((area, i) => (
                <BentoCell key={area} area={area} delay={0.08 + i * 0.04} />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
