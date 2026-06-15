import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const ASSETS = path.join(ROOT, "public", "assets");

// Max output dimensions at 2× displayed size (retina)
const TARGETS = {
  "experiments/image-280-531815.png": { w: 842, h: 534 },
  "experiments/component-release-popups.png": { w: 296, h: 636 },
  "experiments/image-297.png": { w: 812, h: 1018 },
  "handcrafted/img-2146.png": { w: 370, h: 484 },
  "handcrafted/img-2144.png": { w: 322, h: 398 },
  "handcrafted/img-2140-152c46.png": { w: 502, h: 536 },
  "handcrafted/img-2142.png": { w: 350, h: 440 },
  "handcrafted/img-2141.png": { w: 360, h: 420 },
  "caffeinated/img-278-570c3b.png": { w: 346, h: 448 },
  "caffeinated/img-277-1cbcaa.png": { w: 260, h: 346 },
  "caffeinated/img-276-e797b2.png": { w: 354, h: 444 },
  "caffeinated/img-277-7c6c1e.png": { w: 356, h: 456 },
  "caffeinated/img-277-6a1602.png": { w: 334, h: 406 },
  "resume/resume-doc.png": { w: 900, h: 1108 },
  "resume/resume-card-1.png": { w: 400, h: 400 },
  "resume/resume-card-2.png": { w: 400, h: 400 },
  "resume/resume-card-3.png": { w: 400, h: 400 },
  "resume/image-293-5ae191.png": { w: 196, h: 82 },
  "thoughts/image-306.png": { w: 796, h: 498 },
  "thoughts/image-305-207ac5.png": { w: 396, h: 312 },
  "thoughts/image-298.png": { w: 604, h: 410 },
  "thoughts/image-305-1e3c9d.png": { w: 400, h: 300 },
  "thoughts/image-305-4c6dee.png": { w: 796, h: 360 },
  "thoughts/image-305-79794c.png": { w: 400, h: 300 },
  "thoughts/image-293-5ae191.png": { w: 196, h: 82 },
  "case-studies/3.1.png": { w: 934, h: 606 },
  "case-studies/image-293.png": { w: 902, h: 660 },
  "case-studies/component-61.png": { w: 360, h: 436 },
  "handcrafted/img-2140.png": { w: 502, h: 536 },
};

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((e) => {
    const full = path.join(dir, e.name);
    return e.isDirectory() ? walk(full) : [full];
  });
}

async function optimizeFile(absPath) {
  const rel = path.relative(ASSETS, absPath).replace(/\\/g, "/");
  if (!rel.endsWith(".png")) return null;

  const target = TARGETS[rel] ?? { w: 900, h: 900 };
  const outPath = absPath.replace(/\.png$/i, ".webp");
  const before = fs.statSync(absPath).size;

  let pipeline = sharp(absPath).rotate();
  const meta = await pipeline.metadata();
  const needsResize =
    (meta.width && meta.width > target.w) || (meta.height && meta.height > target.h);

  if (needsResize) {
    pipeline = pipeline.resize({
      width: target.w,
      height: target.h,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  await pipeline.webp({ quality: 82, effort: 4 }).toFile(outPath);

  const after = fs.statSync(outPath).size;
  fs.unlinkSync(absPath);
  return { rel, before, after, out: path.relative(ROOT, outPath) };
}

const files = walk(ASSETS).filter((f) => f.endsWith(".png"));
const results = [];

for (const file of files) {
  results.push(await optimizeFile(file));
}

const totalBefore = results.reduce((s, r) => s + (r?.before ?? 0), 0);
const totalAfter = results.reduce((s, r) => s + (r?.after ?? 0), 0);

console.log(`Optimized ${results.length} images`);
console.log(`Before: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
console.log(`After:  ${(totalAfter / 1024 / 1024).toFixed(2)} MB WebP`);
console.log(`Saved:  ${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%`);

for (const r of results.sort((a, b) => b.before - a.before).slice(0, 8)) {
  console.log(`  ${r.rel}: ${(r.before / 1024).toFixed(0)}KB → ${(r.after / 1024).toFixed(0)}KB`);
}
