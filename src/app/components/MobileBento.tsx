import React from "react";
import { motion } from "motion/react";

const SHELL_STYLE: React.CSSProperties = {
  width: "100%",
  background: "rgba(195,205,225,0.30)",
  backdropFilter: "blur(18px) saturate(140%)",
  WebkitBackdropFilter: "blur(18px) saturate(140%)",
  borderRadius: 20,
  padding: 16,
  display: "flex",
  flexDirection: "column",
  gap: 12,
  flexShrink: 0,
};

const CELL_STYLE: React.CSSProperties = {
  background: "rgba(246,246,249,0.92)",
  border: "1px solid rgba(255,255,255,0.68)",
  boxShadow: "0 1px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.90)",
  borderRadius: 16,
  overflow: "hidden",
};

type ImageItem = {
  src: string;
  delay?: number;
  priority?: boolean;
  height?: number;
};

export function MobileBento({
  title,
  images,
  onNavigate,
  clickableImages = false,
}: {
  title: string;
  images: ImageItem[];
  onNavigate: () => void;
  clickableImages?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98, transition: { type: "tween", duration: 0.16, ease: "easeIn" } }}
      transition={{ type: "tween", duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      data-bento-scroll
      style={{
        ...SHELL_STYLE,
        maxHeight: "calc(100dvh - 280px)",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        touchAction: "pan-y",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "tween", duration: 0.2, delay: 0.04 }}
        onClick={onNavigate}
        style={{ ...CELL_STYLE, padding: "16px 18px", cursor: "pointer" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <motion.button
            onClick={(e) => { e.stopPropagation(); onNavigate(); }}
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
              alignSelf: "flex-start",
            }}
          >
            View <span style={{ fontSize: 14 }}>→</span>
          </motion.button>
          <p style={{
            fontFamily: "'Inria Serif', Georgia, serif",
            fontSize: 28, fontWeight: 700,
            color: "#15151C",
            margin: 0, lineHeight: 1.15,
            letterSpacing: "-0.01em",
          }}>
            {title}
          </p>
        </div>
      </motion.div>

      {images.map((img, i) => (
        <motion.div
          key={img.src}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "tween", duration: 0.22, delay: img.delay ?? 0.08 + i * 0.06, ease: "easeOut" }}
          style={{
            ...CELL_STYLE,
            height: img.height ?? 180,
            position: "relative",
            cursor: clickableImages ? "pointer" : undefined,
          }}
          onClick={clickableImages ? onNavigate : undefined}
        >
          <motion.img
            src={img.src}
            alt=""
            draggable={false}
            loading={img.priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={img.priority ? "high" : "auto"}
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ type: "tween", duration: 0.24, delay: (img.delay ?? 0.08 + i * 0.06) + 0.04, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              userSelect: "none",
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
