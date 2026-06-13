import { useEffect, useState } from "react";

const SEQUENCE = ["Architect", "Visualizer", "Researcher", "Strategiser", "Thinker", "Designer"];
const TYPE_MS = 45;   // ms per letter typed
const ERASE_MS = 28;  // ms per letter erased
const HOLD_MS = 520;  // pause after fully typed before erasing
const FINAL_HOLD = 0; // no erase on last word — stay

export function TypedWord({ style }: { style?: React.CSSProperties }) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "holding" | "erasing">("typing");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;

    const word = SEQUENCE[wordIdx];
    const isFinal = wordIdx === SEQUENCE.length - 1;

    if (phase === "typing") {
      if (display.length < word.length) {
        const id = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), TYPE_MS);
        return () => clearTimeout(id);
      } else {
        if (isFinal) { setDone(true); return; }
        const id = setTimeout(() => setPhase("holding"), HOLD_MS);
        return () => clearTimeout(id);
      }
    }

    if (phase === "holding") {
      const id = setTimeout(() => setPhase("erasing"), 0);
      return () => clearTimeout(id);
    }

    if (phase === "erasing") {
      if (display.length > 0) {
        const id = setTimeout(() => setDisplay(d => d.slice(0, -1)), ERASE_MS);
        return () => clearTimeout(id);
      } else {
        setWordIdx(i => i + 1);
        setPhase("typing");
      }
    }
  }, [display, phase, wordIdx, done]);

  return (
    <span style={style}>
      {display}
      {!done && (
        <span style={{
          display: "inline-block",
          width: "2px",
          height: "0.85em",
          background: "currentColor",
          marginLeft: "2px",
          verticalAlign: "middle",
          animation: "blink 0.7s step-end infinite",
        }} />
      )}
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  );
}
