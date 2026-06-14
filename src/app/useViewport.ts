import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export function useViewport() {
  const [viewport, setViewport] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
    mobile: window.innerWidth < MOBILE_BREAKPOINT,
  }));

  useEffect(() => {
    const handler = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
        mobile: window.innerWidth < MOBILE_BREAKPOINT,
      });
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return viewport;
}
