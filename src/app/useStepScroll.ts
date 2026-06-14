import { useCallback, useEffect, useRef } from "react";

export function useStepScroll(
  onStep: (direction: 1 | -1) => void,
  cooldownMs = 550,
) {
  const cooldown = useRef(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  const bump = useCallback(
    (direction: 1 | -1) => {
      if (cooldown.current) return;
      cooldown.current = true;
      setTimeout(() => {
        cooldown.current = false;
      }, cooldownMs);
      onStep(direction);
    },
    [onStep, cooldownMs],
  );

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      bump(e.deltaY > 0 ? 1 : -1);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchStartY.current - e.changedTouches[0].clientY;
      const dx = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(dy) < Math.abs(dx) || Math.abs(dy) < 40) return;
      bump(dy > 0 ? 1 : -1);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [bump]);
}
