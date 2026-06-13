import { motion } from "motion/react";

interface Props { visible: boolean }

export function DesignBackground({ visible }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      style={{
        position: "absolute",
        left: 0, right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 48px",
        textAlign: "center",
        gap: 28,
      }}
    >
      {/* Main headline */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 24 }}
        transition={{ duration: 0.60, ease: [0.22, 1, 0.36, 1], delay: visible ? 0.12 : 0 }}
      >
        <p style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(32px, 4.5vw, 62px)",
          fontWeight: 700,
          color: "#192040",
          margin: 0,
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          maxWidth: 780,
        }}>
          Enjoyed what you saw, let's build{" "}
          <span style={{ fontStyle: "italic", fontWeight: 400 }}>
            something meaningful
          </span>{" "}
          together.
        </p>
      </motion.div>

      {/* Contact line */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
        transition={{ duration: 0.55, ease: "easeOut", delay: visible ? 0.28 : 0 }}
        style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}
      >
        <p style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: "clamp(13px, 1.4vw, 17px)",
          fontWeight: 400,
          color: "rgba(25,32,64,0.55)",
          margin: 0,
          lineHeight: 1.6,
          letterSpacing: "0.01em",
        }}>
          Reach out at{" "}
          <span style={{ color: "#192040", fontWeight: 500 }}>sandeep.uxdesign@gmail.com</span>
          {" "}or{" "}
          <span style={{ color: "#192040", fontWeight: 500 }}>ar.sandeepmajumder@gmail.com</span>
        </p>

        {/* Coffee line */}
        <p style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          fontSize: "clamp(13px, 1.3vw, 16px)",
          fontWeight: 400,
          color: "rgba(25,32,64,0.40)",
          margin: 0,
          lineHeight: 1.6,
        }}>
          Or, if you're in Bangalore, let's continue the conversation over a cup of coffee.
        </p>
      </motion.div>
    </motion.div>
  );
}
