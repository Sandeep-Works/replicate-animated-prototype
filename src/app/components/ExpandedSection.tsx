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

// ── Per-category cell tint colors ─────────────────────────────────────────────
const TINT: Record<string, string> = {
  "Case Studies": "rgba(255, 232, 207, 0.5)",
  "Experiments":  "rgba(198, 237, 241, 0.5)",
  "Thoughts":     "rgba(255, 238, 251, 0.7)",
  "Handcrafted":  "rgba(255, 241, 238, 0.8)",
  "Caffeinated":  "rgba(234, 227, 220, 0.7)",
  "Resume":       "rgba(220, 221, 234, 0.7)",
  "FAQs":         "rgba(220, 231, 234, 0.7)",
};

// ── Per-category descriptions ─────────────────────────────────────────────────
const DESC: Record<string, string> = {
  "Case Studies": "A curated collection of some of my ongoing and built works, across enterprise AI, product strategy, user adoption and engagement.",
  "Experiments":  "Hey! Welcome to my experimental playground, where I build, test, explore ideas. Take a look around, share a thought, or join in and make something even better.",
  "Thoughts":     "Design is more than problem solving. It's a way of thinking, questioning, and seeing the world. The work I create is simply a reflection of how I share my thoughts.",
  "Handcrafted":  "Away from work, I trade pixels for clay and canvas - making pottery, painting, and endlessly sketching whatever I see & envision on my iPad.",
  "Caffeinated":  "A coffee enthusiast at heart. I enjoy exploring cafés, trying new brews, and creating content inspired by coffee, one cup at a time.",
};

// ── FAQ items ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    n: "01",
    q: "Why should I hire you over someone with more years?",
    a: "Years of experience and design education have shaped my perspective, but they don't define it. I enjoy questioning assumptions, exploring new tools and building with AI, thereby constantly evolving the way I design, collaborate, and solve problems.",
  },
  {
    n: "02",
    q: "What does \"AI-first\" actually mean in your workflow?",
    a: "AI is an integral part of my workflow - not a shortcut, but as a collaborator. It accelerates research, streamlines prototyping, and supports rapid iteration, allowing me to dedicate more time to strategy, creativity, and user-centered thinking.",
  },
  {
    n: "03",
    q: "Do you design for mobile or desktop?",
    a: "The best experiences don't start with a device - they start with the person using it. I focus on creating experiences that reduce friction when users need them most.",
  },
  {
    n: "04",
    q: "How do you handle disagreements with stakeholders?",
    a: "I don't defend opinions - I defend outcomes. Every recommendation I make is rooted in user behaviour, research, and business goals. And when new evidence emerges, I'm happy to change course.",
  },
  {
    n: "05",
    q: "Why enterprise UX?",
    a: "Complexity is where great design happens. Building enterprise products means thinking beyond interfaces to systems, workflows, scalability, edge cases, and real business impact.",
  },
  {
    n: "06",
    q: "What kind of work excites you?",
    a: "I thrive in products where design has measurable impact. Whether it's AI, enterprise software, or workflow automation, I'm motivated by solving complex problems where small design choices can influence user behavior and business outcomes.",
  },
];

// ── Shared outer container ────────────────────────────────────────────────────
function BentoShell({
  children, onNavigate,
}: {
  children: React.ReactNode;
  onNavigate?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24, scale: 0.98, transition: { type: "tween", duration: 0.16, ease: "easeIn" } }}
      transition={{ type: "tween", duration: 0.30, ease: [0.22, 1, 0.36, 1] }}
      onClick={onNavigate}
      style={{
        width: "100%",
        height: 511,
        background: "rgba(255, 255, 255, 0.5)",
        borderRadius: 20,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        flexShrink: 0,
        overflow: "hidden",
        cursor: onNavigate ? "pointer" : "default",
      }}
    >
      {children}
    </motion.div>
  );
}

// ── Generic tinted cell ───────────────────────────────────────────────────────
function TintCell({
  tint, width, height, delay = 0, onClick, children,
}: {
  tint: string;
  width?: number;
  height?: number;
  delay?: number;
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "tween", duration: 0.22, delay }}
      onClick={onClick}
      style={{
        background: tint,
        borderRadius: 16,
        position: "relative",
        overflow: "hidden",
        cursor: onClick ? "pointer" : undefined,
        ...(width !== undefined ? { width, flexShrink: 0 } : { flex: 1 }),
        ...(height !== undefined ? { height, flexShrink: 0 } : {}),
      }}
    >
      {children}
    </motion.div>
  );
}

// ── View button ───────────────────────────────────────────────────────────────
function ViewBtn({ label, onNavigate }: { label: string; onNavigate: () => void }) {
  const isShort = label === "Handcrafted" || label === "Caffeinated";
  return (
    <motion.button
      onClick={(e) => { e.stopPropagation(); onNavigate(); }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{
        width: isShort ? 86 : 100,
        height: 26,
        borderRadius: 60,
        background: "#F1F1F2",
        border: "1px solid #FAFAFA",
        boxShadow: "0px 2px 25px 0px rgba(0,0,0,0.10)",
        cursor: "pointer",
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: 12, fontWeight: 400,
        color: "#192040",
        letterSpacing: "0.0571em",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: 0.8,
        flexShrink: 0,
      }}
    >
      {isShort ? "View  →" : "View all  →"}
    </motion.button>
  );
}

// ── Label content inside a tinted cell ────────────────────────────────────────
function LabelContent({
  label, onNavigate, contentWidth = 270, top = 14.5,
}: {
  label: string;
  onNavigate: () => void;
  contentWidth?: number;
  top?: number;
}) {
  return (
    <>
      {/* Title + description anchored to top */}
      <div
        style={{
          position: "absolute",
          left: 30, top,
          width: contentWidth,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          pointerEvents: "none",
        }}
      >
        <p style={{
          fontFamily: "'Inria Serif', Georgia, serif",
          fontSize: 34.5, fontWeight: 700,
          color: "#15151C",
          margin: 0, lineHeight: "46px",
          letterSpacing: "-0.01em",
        }}>
          {label}
        </p>
        {DESC[label] && (
          <p style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 13, fontWeight: 400,
            color: "#192040",
            margin: 0, lineHeight: 1.55,
            letterSpacing: "0.0571em",
          }}>
            {DESC[label]}
          </p>
        )}
      </div>
      {/* Button pinned to bottom — always 16px from cell edge */}
      <div style={{ position: "absolute", left: 30, bottom: 16, pointerEvents: "auto" }}>
        <ViewBtn label={label} onNavigate={onNavigate} />
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CASE STUDIES BENTO
// Container: rgba(255,255,255,0.5), h:511, p:20, gap:16, r:20
// Cell tint: rgba(255,232,207,0.5)
// Row 1 (flex:1): [Label 336px] + [3.1 dashboard fill]
// Row 2 (flex:1): [AI panel 554px] + [phone mockup 276px]
// ═══════════════════════════════════════════════════════════════════════════════
function CaseStudiesBento({ onNavigate, mobile }: { onNavigate: () => void; mobile: boolean }) {
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
  const tint = TINT["Case Studies"];
  return (
    <BentoShell>
      {/* Row 1 */}
      <div style={{ display: "flex", gap: 16, flex: 1 }}>

        {/* Label cell — 336px */}
        <TintCell tint={tint} width={336} delay={0.04} onClick={onNavigate}>
          <LabelContent label="Case Studies" onNavigate={onNavigate} contentWidth={270} top={16.5} />
        </TintCell>

        {/* 3.1 dashboard cell — fill */}
        <TintCell tint={tint} delay={0.10}>
          <motion.img
            src="/assets/case-studies/3.1.webp"
            alt="" draggable={false} loading="eager" decoding="async"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ type: "tween", duration: 0.24, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              left: 44, top: -24,
              width: 407, height: 264,
              borderRadius: 10.46,
              boxShadow: "0px 1.74px 26.14px rgba(0,0,0,0.15)",
              userSelect: "none",
            }}
          />
        </TintCell>
      </div>

      {/* Row 2 */}
      <div style={{ display: "flex", gap: 16, flex: 1 }}>

        {/* AI panel — 554px */}
        <TintCell tint={tint} width={554} delay={0.16}>
          {/* White card frame */}
          <div style={{
            position: "absolute",
            left: 62, top: 45.5,
            width: 408.91, height: 249.89,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0px -3px 30px rgba(0,0,0,0.15)",
            overflow: "hidden",
          }}>
            <img
              src="/assets/case-studies/ai-panel-1260.png"
              alt="" draggable={false} loading="lazy" decoding="async"
              style={{ width: "100%", height: "100%", objectFit: "cover", userSelect: "none" }}
            />
          </div>
        </TintCell>

        {/* Phone mockup — 276px */}
        <TintCell tint={tint} width={276} delay={0.24}>
          {/* White card frame */}
          <div style={{
            position: "absolute",
            left: 50.78, top: 44.16,
            width: 174.77, height: 380.8,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0px -2px 30px rgba(0,0,0,0.10)",
            overflow: "hidden",
          }}>
            <img
              src="/assets/case-studies/image-168-260a96.png"
              alt="" draggable={false} loading="lazy" decoding="async"
              style={{ width: "100%", height: "100%", objectFit: "cover", userSelect: "none" }}
            />
          </div>
        </TintCell>
      </div>
    </BentoShell>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPERIMENTS BENTO
// Cell tint: rgba(198,237,241,0.5) (teal)
// Row 1 (fill, ~227px): [Velo app fill] + [Label 325px]
// Row 2 (fill): [Release Popups 276px] + [image-280 fill]
// ═══════════════════════════════════════════════════════════════════════════════
function ExperimentsBento({ onNavigate, mobile }: { onNavigate: () => void; mobile: boolean }) {
  if (mobile) {
    return (
      <MobileBento
        title="Experiments"
        onNavigate={onNavigate}
        clickableImages
        images={[
          { src: "/assets/experiments/image-280-531815.webp", priority: true, height: 160 },
          { src: "/assets/experiments/component-release-popups.webp", height: 200 },
          { src: "/assets/experiments/image-297.webp", height: 220 },
        ]}
      />
    );
  }
  const tint = TINT["Experiments"];
  return (
    <BentoShell onNavigate={onNavigate}>
      {/* Row 1 */}
      <div style={{ display: "flex", gap: 16, flex: 1 }}>

        {/* Velo app — fill */}
        <TintCell tint={tint} delay={0.04}>
          <motion.img
            src="/assets/experiments/velo-app.png"
            alt="" draggable={false} loading="eager" decoding="async"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ type: "tween", duration: 0.24, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              left: 40, top: -83,
              width: 423, height: 274,
              borderRadius: 12,
              boxShadow: "0px 2px 30px rgba(0,0,0,0.15)",
              userSelect: "none",
            }}
          />
        </TintCell>

        {/* Label cell — 325px */}
        <TintCell tint={tint} width={325} delay={0.10} onClick={onNavigate}>
          <LabelContent label="Experiments" onNavigate={onNavigate} contentWidth={270} />
        </TintCell>
      </div>

      {/* Row 2 */}
      <div style={{ display: "flex", gap: 16, flex: 1 }}>

        {/* Release Popups — 276px */}
        <TintCell tint={tint} width={276} delay={0.18}>
          <motion.img
            src="/assets/experiments/release-popups-frame.png"
            alt="" draggable={false} loading="lazy" decoding="async"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ type: "tween", duration: 0.24, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              left: 51.61, top: 57.13,
              width: 173.11, height: 310.85,
              borderRadius: 11.17,
              boxShadow: "0px 0.41px 0.81px -0.41px rgba(0,0,0,0.10), 0px 0.41px 1.22px rgba(0,0,0,0.10)",
              userSelect: "none",
            }}
          />
        </TintCell>

        {/* bottom-right — flat Figma render, exact match */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "tween", duration: 0.22, delay: 0.26 }}
          style={{ flex: 1, borderRadius: 16, overflow: "hidden", position: "relative", flexShrink: 0 }}
        >
          <img
            src="/assets/experiments/bottom-right-cell.png"
            alt="" draggable={false} loading="lazy" decoding="async"
            style={{ width: "100%", height: "100%", objectFit: "cover", userSelect: "none" }}
          />
        </motion.div>
      </div>
    </BentoShell>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// THOUGHTS BENTO
// Cell tint: rgba(255,238,251,0.7) (pink/rose)
// Row 1 (fill, ~227px): [Label 325px] + [image-313 fill]
// Row 2 (fill): [image-314, 554px] + [image-317, 276px]
// ═══════════════════════════════════════════════════════════════════════════════
function ThoughtsBento({ onNavigate, mobile }: { onNavigate: () => void; mobile: boolean }) {
  if (mobile) {
    return (
      <MobileBento
        title="Thoughts"
        onNavigate={onNavigate}
        clickableImages
        images={[
          { src: "/assets/thoughts/image-306.webp", priority: true, height: 200 },
          { src: "/assets/thoughts/image-305-207ac5.webp", height: 150 },
          { src: "/assets/thoughts/image-298.webp", height: 170 },
        ]}
      />
    );
  }
  const tint = TINT["Thoughts"];
  return (
    <BentoShell onNavigate={onNavigate}>
      {/* Row 1 */}
      <div style={{ display: "flex", gap: 16, flex: 1 }}>

        {/* Label cell — 325px */}
        <TintCell tint={tint} width={325} delay={0.04} onClick={onNavigate}>
          <LabelContent label="Thoughts" onNavigate={onNavigate} contentWidth={270} />
        </TintCell>

        {/* image-313 — fill */}
        <TintCell tint={tint} delay={0.10}>
          {/* Shadow frame at x:60, y:-86, w:383, h:248.5 */}
          <div style={{
            position: "absolute",
            left: 60, top: -86,
            width: 383, height: 248.5,
            borderRadius: 9.84,
            boxShadow: "0px 1.64px 24.6px rgba(0,0,0,0.15)",
            overflow: "hidden",
          }}>
            <img
              src="/assets/thoughts/image-313.png"
              alt="" draggable={false} loading="eager" decoding="async"
              style={{
                position: "absolute",
                left: 0, top: 85.29,
                width: 383.27, height: 302.41,
                userSelect: "none",
              }}
            />
          </div>
        </TintCell>
      </div>

      {/* Row 2 */}
      <div style={{ display: "flex", gap: 16, flex: 1 }}>

        {/* image-314 — 554px */}
        <TintCell tint={tint} width={554} delay={0.18}>
          <motion.img
            src="/assets/thoughts/image-314.png"
            alt="" draggable={false} loading="lazy" decoding="async"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ type: "tween", duration: 0.24, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              left: 66, top: 57.5,
              width: 422, height: 319,
              borderRadius: 12,
              userSelect: "none",
            }}
          />
        </TintCell>

        {/* image-317 — 276px */}
        <TintCell tint={tint} width={276} delay={0.26}>
          {/* Inner frame at x:54.66, y:57.5, w:167, h:246 */}
          <div style={{
            position: "absolute",
            left: 54.66, top: 57.5,
            width: 167, height: 246,
            borderRadius: 12,
            overflow: "hidden",
          }}>
            <img
              src="/assets/thoughts/image-317-489cd7.png"
              alt="" draggable={false} loading="lazy" decoding="async"
              style={{
                position: "absolute",
                left: 0, top: -0.06,
                width: 167, height: 246,
                userSelect: "none",
              }}
            />
          </div>
        </TintCell>
      </div>
    </BentoShell>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HANDCRAFTED BENTO
// Cell tint: rgba(255,241,238,0.8) (peach)
// Row 1 (h:227.5): [img-2142 fill] + [image-298 fill] + [Label 273px]
//   Each image cell inner frame: x:41.33, y:1, w:186, h:190, r: 0 0 12 12
// Row 2 (fill): [img-2146 fill] + [img-2141 fill] + [IMG_2143 fill]
//   Each image cell inner frame: x:54, y:38, w:170, h:188, r: 12 12 0 0
// ═══════════════════════════════════════════════════════════════════════════════
function HandcraftedBento({ onNavigate, mobile }: { onNavigate: () => void; mobile: boolean }) {
  if (mobile) {
    return (
      <MobileBento
        title="Handcrafted"
        onNavigate={onNavigate}
        clickableImages
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
  const tint = TINT["Handcrafted"];

  function Row1ImgCell({ src, imgX, imgW, imgH, delay }: { src: string; imgX?: number; imgW: number; imgH: number; delay: number }) {
    return (
      <TintCell tint={tint} height={227.5} delay={delay}>
        {/* Inner frame: x:41.33, y:1, w:186, h:190, r: 0 0 12px 12px */}
        <div style={{
          position: "absolute",
          left: 41.33, top: 1,
          width: 186, height: 190,
          borderRadius: "0px 0px 12px 12px",
          overflow: "hidden",
        }}>
          <img
            src={src}
            alt="" draggable={false} loading="lazy" decoding="async"
            style={{
              position: "absolute",
              left: imgX ?? 0, top: 0,
              width: imgW, height: imgH,
              objectFit: "cover",
              userSelect: "none",
            }}
          />
        </div>
      </TintCell>
    );
  }

  function Row2ImgCell({ src, imgX, imgY, imgW, imgH, delay }: { src: string; imgX?: number; imgY?: number; imgW: number; imgH: number; delay: number }) {
    return (
      <TintCell tint={tint} delay={delay}>
        {/* Inner frame: x:54, y:38, w:170, h:188, r: 12px 12px 0 0 */}
        <div style={{
          position: "absolute",
          left: 54, top: 38,
          width: 170, height: 188,
          borderRadius: "12px 12px 0px 0px",
          overflow: "hidden",
        }}>
          <img
            src={src}
            alt="" draggable={false} loading="lazy" decoding="async"
            style={{
              position: "absolute",
              left: imgX ?? 0, top: imgY ?? 0,
              width: imgW, height: imgH,
              objectFit: "cover",
              userSelect: "none",
            }}
          />
        </div>
      </TintCell>
    );
  }

  return (
    <BentoShell onNavigate={onNavigate}>
      {/* Row 1 — fixed height 227.5px */}
      <div style={{ display: "flex", gap: 16, flexShrink: 0 }}>
        <Row1ImgCell src="/assets/handcrafted/img-2142.webp"      imgX={0.33}  imgW={185} imgH={234} delay={0.04} />
        <Row1ImgCell src="/assets/handcrafted/image-298-72cb62.png" imgX={-15} imgW={216} imgH={235} delay={0.08} />

        {/* Label cell — 273px */}
        <TintCell tint={tint} width={273} height={227.5} delay={0.12} onClick={onNavigate}>
          <LabelContent label="Handcrafted" onNavigate={onNavigate} contentWidth={225} />
        </TintCell>
      </div>

      {/* Row 2 — fill */}
      <div style={{ display: "flex", gap: 16, flex: 1 }}>
        <Row2ImgCell src="/assets/handcrafted/img-2146.webp"       imgX={0}      imgY={-1}    imgW={166} imgH={217} delay={0.18} />
        <Row2ImgCell src="/assets/handcrafted/img-2141.webp"       imgX={-19.91} imgY={-28}   imgW={209.14} imgH={244} delay={0.22} />
        <Row2ImgCell src="/assets/handcrafted/IMG_2143-722b60.png" imgX={0.33}   imgY={-9.5}  imgW={171} imgH={225} delay={0.26} />
      </div>
    </BentoShell>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CAFFEINATED BENTO
// Cell tint: rgba(234,227,220,0.7) (warm beige)
// Row 1 (h:227.5): [Label 273px] + [img-278 fill] + [img-277-6a1602 fill]
//   Image cells inner frame: x:41.33, y:1, w:186, h:190, r: 0 0 12 12
// Row 2 (fill): [img-276 fill] + [img-277-7c6c1e fill] + [image-318 fill]
//   Image cells inner frame: x:54, y:38, w:170, h:188, r: 12 12 0 0
// ═══════════════════════════════════════════════════════════════════════════════
function CaffeinatedBento({ onNavigate, mobile }: { onNavigate: () => void; mobile: boolean }) {
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
  const tint = TINT["Caffeinated"];

  function Row1ImgCell({ src, imgX, imgY, imgW, imgH, delay }: { src: string; imgX?: number; imgY?: number; imgW: number; imgH: number; delay: number }) {
    return (
      <TintCell tint={tint} height={227.5} delay={delay}>
        <div style={{
          position: "absolute",
          left: 41.33, top: 1,
          width: 186, height: 190,
          borderRadius: "0px 0px 12px 12px",
          overflow: "hidden",
        }}>
          <img
            src={src}
            alt="" draggable={false} loading="lazy" decoding="async"
            style={{
              position: "absolute",
              left: imgX ?? 0, top: imgY ?? 0,
              width: imgW, height: imgH,
              objectFit: "cover",
              userSelect: "none",
            }}
          />
        </div>
      </TintCell>
    );
  }

  function Row2ImgCell({ src, imgX, imgY, imgW, imgH, delay }: { src: string; imgX?: number; imgY?: number; imgW: number; imgH: number; delay: number }) {
    return (
      <TintCell tint={tint} delay={delay}>
        <div style={{
          position: "absolute",
          left: 54, top: 38,
          width: 170, height: 188,
          borderRadius: "12px 12px 0px 0px",
          overflow: "hidden",
        }}>
          <img
            src={src}
            alt="" draggable={false} loading="lazy" decoding="async"
            style={{
              position: "absolute",
              left: imgX ?? 0, top: imgY ?? 0,
              width: imgW, height: imgH,
              objectFit: "cover",
              userSelect: "none",
            }}
          />
        </div>
      </TintCell>
    );
  }

  return (
    <BentoShell onNavigate={onNavigate}>
      {/* Row 1 — fixed height 227.5px */}
      <div style={{ display: "flex", gap: 16, flexShrink: 0 }}>

        {/* Label cell — 273px */}
        <TintCell tint={tint} width={273} height={227.5} delay={0.04} onClick={onNavigate}>
          <LabelContent label="Caffeinated" onNavigate={onNavigate} contentWidth={225} />
        </TintCell>

        <Row1ImgCell src="/assets/caffeinated/img-278-570c3b.webp" imgX={0.67} imgY={0}   imgW={185} imgH={240} delay={0.08} />
        <Row1ImgCell src="/assets/caffeinated/img-277-6a1602.webp" imgX={0}    imgY={-35} imgW={186} imgH={225} delay={0.12} />
      </div>

      {/* Row 2 — fill */}
      <div style={{ display: "flex", gap: 16, flex: 1 }}>
        <Row2ImgCell src="/assets/caffeinated/img-276-e797b2.webp"    imgX={0}     imgY={-0.5}  imgW={171} imgH={216} delay={0.18} />
        <Row2ImgCell src="/assets/caffeinated/img-277-7c6c1e.webp"    imgX={-0.33} imgY={-0.5}  imgW={170} imgH={218} delay={0.22} />
        <Row2ImgCell src="/assets/caffeinated/image-318-748f8f.png"   imgX={10.33} imgY={-99.5} imgW={160} imgH={287} delay={0.26} />
      </div>
    </BentoShell>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// RESUME BENTO
// Cell tint: rgba(220,221,234,0.7) (blue-grey)
// Single fill×fill cell
// "Resume" title at x:84, y:30 (absolutely positioned)
// Resume doc at x:83.84, y:107, w:679.32, h:854 with shadow
// ═══════════════════════════════════════════════════════════════════════════════
function ResumeBento({ onNavigate, mobile }: { onNavigate: () => void; mobile: boolean }) {
  if (mobile) {
    return (
      <MobileBento
        title="Resume"
        onNavigate={onNavigate}
        clickableImages
        images={[
          { src: "/assets/resume/resume-doc.webp", priority: true, height: 280 },
        ]}
      />
    );
  }
  const tint = TINT["Resume"];
  return (
    <BentoShell onNavigate={onNavigate}>
      {/* Single full-height cell */}
      <TintCell tint={tint} delay={0.04} onClick={onNavigate}>
        {/* Title */}
        <p style={{
          position: "absolute",
          left: 84, top: 30,
          margin: 0,
          fontFamily: "'Inria Serif', Georgia, serif",
          fontSize: 34.5, fontWeight: 700,
          color: "#15151C",
          lineHeight: "46px",
          letterSpacing: "-0.01em",
          pointerEvents: "none",
        }}>
          Resume
        </p>

        {/* Resume document */}
        <motion.img
          src="/assets/resume/resume-doc.webp"
          alt="" draggable={false} loading="eager" decoding="async"
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ type: "tween", duration: 0.28, delay: 0.10, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            left: 83.84, top: 107,
            width: 679.32, height: 854,
            background: "#fff",
            borderRadius: 20.9,
            boxShadow: "0px 4px 30px rgba(0,0,0,0.10)",
            userSelect: "none",
          }}
        />
      </TintCell>
    </BentoShell>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FAQ BENTO
// ═══════════════════════════════════════════════════════════════════════════════
function FAQBento({ mobile }: { mobile: boolean }) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [atTop, setAtTop] = React.useState(true);
  const [atBottom, setAtBottom] = React.useState(false);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtTop(el.scrollTop <= 4);
    setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 6);
  };

  const scrollUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    scrollRef.current?.scrollBy({ top: -160, behavior: "smooth" });
  };

  const scrollDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    scrollRef.current?.scrollBy({ top: 160, behavior: "smooth" });
  };

  if (mobile) {
    return (
      <div style={{
        background: "rgba(220,231,234,0.7)",
        borderRadius: 20,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}>
        <p style={{ fontFamily: "'Inria Serif', Georgia, serif", fontSize: 28, fontWeight: 700, color: "#15151C", margin: 0 }}>FAQs</p>
        {FAQS.map((faq) => (
          <div key={faq.n} style={{ borderBottom: "1px solid rgba(0,0,0,0.08)", paddingBottom: 12 }}>
            <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 14, fontWeight: 500, color: "#101828", margin: "0 0 4px" }}>{faq.q}</p>
            <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 13, fontWeight: 400, color: "#6A7282", margin: 0, lineHeight: 1.5 }}>{faq.a}</p>
          </div>
        ))}
      </div>
    );
  }

  const tint = TINT["FAQs"];
  // BentoShell: h:511, padding:20 → TintCell h:471. Block top:109, bottom gap:20 → scroll area h:342
  const SCROLL_H = 342;

  return (
    <BentoShell>
      <style>{`.faq-scroll::-webkit-scrollbar{display:none}.faq-scroll{-ms-overflow-style:none;scrollbar-width:none}`}</style>

      <TintCell tint={tint} delay={0.04}>
        {/* Title */}
        <p style={{
          position: "absolute",
          left: 82, top: 30,
          margin: 0,
          fontFamily: "'Inria Serif', Georgia, serif",
          fontSize: 34.5, fontWeight: 700,
          color: "#15151C",
          lineHeight: "46px",
          letterSpacing: "-0.01em",
        }}>
          FAQs
        </p>

        {/* Scrollable white FAQ block */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="faq-scroll"
          style={{
            position: "absolute",
            left: 82, top: 109,
            width: 681.5,
            height: SCROLL_H,
            overflowY: "auto",
            background: "#fff",
            borderRadius: 15.38,
            boxShadow: "0px 4px 30px rgba(0,0,0,0.10)",
            padding: "15.38px",
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {FAQS.map((faq, i) => (
            <React.Fragment key={faq.n}>
              <div style={{ display: "flex", gap: 24.61, paddingTop: 12.31, paddingBottom: 12.31 }}>
                <div style={{ width: 18.46, paddingTop: 3.08, flexShrink: 0 }}>
                  <span style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 10.77, fontWeight: 400,
                    color: "#99A1AF",
                    lineHeight: "12.31px",
                  }}>
                    {faq.n}
                  </span>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 9.23 }}>
                  <p style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 13.85, fontWeight: 500,
                    color: "#101828",
                    margin: 0, lineHeight: "14.81px",
                  }}>
                    {faq.q}
                  </p>
                  <p style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 13.85, fontWeight: 400,
                    color: "#6A7282",
                    margin: 0, lineHeight: "18.46px",
                  }}>
                    {faq.a}
                  </p>
                </div>
              </div>
              {i < FAQS.length - 1 && (
                <div style={{ height: 1, background: "#F3F4F6", marginLeft: 18.46 + 24.61, flexShrink: 0 }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Up / down chevrons stacked at bottom-right */}
        <div style={{ position: "absolute", right: 24, bottom: 24, display: "flex", flexDirection: "column", gap: 6 }}>
          <motion.button
            onClick={scrollUp}
            animate={{ opacity: atTop ? 0 : 1, pointerEvents: atTop ? "none" : "auto" }}
            transition={{ duration: 0.2 }}
            style={{
              width: 34, height: 34, borderRadius: 10,
              background: "rgba(255,255,255,0.92)",
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0px 2px 10px rgba(0,0,0,0.10)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", backdropFilter: "blur(4px)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3.5 10L8 5.5L12.5 10" stroke="#192040" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
          <motion.button
            onClick={scrollDown}
            animate={{ opacity: atBottom ? 0 : 1, pointerEvents: atBottom ? "none" : "auto" }}
            transition={{ duration: 0.2 }}
            style={{
              width: 34, height: 34, borderRadius: 10,
              background: "rgba(255,255,255,0.92)",
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0px 2px 10px rgba(0,0,0,0.10)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", backdropFilter: "blur(4px)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3.5 6L8 10.5L12.5 6" stroke="#192040" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </div>
      </TintCell>
    </BentoShell>
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
  const width = mobile ? "calc(100vw - 40px)" : 886;

  return (
    <motion.div
      key={label}
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        opacity: 0, y: -24, scale: 0.98,
        transition: { type: "tween", duration: 0.16, ease: "easeIn" },
      }}
      transition={{ type: "tween", duration: 0.30, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12, width }}
    >
      {label === "Case Studies" ? (
        <CaseStudiesBento onNavigate={onNavigate} mobile={mobile} />
      ) : label === "Experiments" ? (
        <ExperimentsBento onNavigate={onNavigate} mobile={mobile} />
      ) : label === "Thoughts" ? (
        <ThoughtsBento onNavigate={onNavigate} mobile={mobile} />
      ) : label === "Handcrafted" ? (
        <HandcraftedBento onNavigate={onNavigate} mobile={mobile} />
      ) : label === "Caffeinated" ? (
        <CaffeinatedBento onNavigate={onNavigate} mobile={mobile} />
      ) : label === "Resume" ? (
        <ResumeBento onNavigate={onNavigate} mobile={mobile} />
      ) : label === "FAQs" ? (
        <FAQBento mobile={mobile} />
      ) : null}
    </motion.div>
  );
}
