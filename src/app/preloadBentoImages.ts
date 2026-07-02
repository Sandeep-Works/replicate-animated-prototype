/** Case Studies — shown on first scroll step. */
const PRIORITY = [
  "/assets/case-studies/3.1.webp",
  "/assets/case-studies/ai-panel-1260.webp",
  "/assets/case-studies/image-168-260a96.webp",
];

/** Remaining bento images — fetched during idle time. */
const DEFERRED = [
  "/assets/experiments/velo-app.webp",
  "/assets/experiments/release-popups-frame.webp",
  "/assets/experiments/bottom-right-cell.webp",
  "/assets/thoughts/image-313.webp",
  "/assets/thoughts/image-314.webp",
  "/assets/thoughts/image-317-489cd7.webp",
  "/assets/handcrafted/image-298-72cb62.webp",
  "/assets/handcrafted/IMG_2143-722b60.webp",
  "/assets/caffeinated/image-318-748f8f.webp",
  "/assets/resume/resume-doc.webp",
];

function preload(url: string) {
  const img = new Image();
  img.decoding = "async";
  img.src = url;
}

/** Warm the cache for bento images so scroll steps feel instant. */
export function preloadBentoImages() {
  PRIORITY.forEach(preload);

  const loadRest = () => DEFERRED.forEach(preload);
  if ("requestIdleCallback" in window) {
    requestIdleCallback(loadRest, { timeout: 3000 });
  } else {
    setTimeout(loadRest, 1200);
  }
}
