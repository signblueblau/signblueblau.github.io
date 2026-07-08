#!/usr/bin/env node
/**
 * Deterministic WCAG contrast gate for the design loop.
 * Parses oklch() custom properties from src/styles.css (:root and .dark)
 * and fails (exit 1) if any required pair is below its minimum ratio.
 * The evaluator agent must run this; it cannot be argued with.
 */
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../src/styles.css", import.meta.url), "utf8");

// pair: [fg token, bg token, minimum ratio, label]
const REQUIRED_PAIRS = [
  ["foreground", "background", 7, "body text"],
  ["card-foreground", "card", 7, "card text"],
  ["muted-foreground", "background", 4.5, "muted/meta text"],
  ["primary", "background", 4.5, "links/accent on page"],
  ["primary-foreground", "primary", 4.5, "text on accent buttons"],
  ["secondary-foreground", "secondary", 4.5, "text on secondary chips"],
  ["accent-foreground", "accent", 4.5, "text on accent surfaces"],
];

function extractBlock(source, selector) {
  const start = source.indexOf(`${selector} {`);
  if (start === -1) return "";
  const end = source.indexOf("}", start);
  return source.slice(start, end);
}

function parseTokens(block) {
  const tokens = {};
  const re = /--([a-z-]+):\s*oklch\(([^)]+)\)/g;
  let m;
  while ((m = re.exec(block))) {
    const parts = m[2].split("/")[0].trim().split(/\s+/).map(Number);
    if (parts.length >= 3 && parts.every((n) => !Number.isNaN(n))) {
      tokens[m[1]] = parts;
    }
  }
  return tokens;
}

// oklch -> linear sRGB (via OKLab), then WCAG relative luminance
function oklchToLuminance([L, C, H]) {
  const hRad = (H * Math.PI) / 180;
  const a = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;
  let r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  let bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  const clamp = (x) => Math.min(1, Math.max(0, x));
  r = clamp(r);
  g = clamp(g);
  bl = clamp(bl);
  return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
}

function contrast(fg, bg) {
  const y1 = oklchToLuminance(fg);
  const y2 = oklchToLuminance(bg);
  const [hi, lo] = y1 > y2 ? [y1, y2] : [y2, y1];
  return (hi + 0.05) / (lo + 0.05);
}

let failures = 0;
for (const [mode, selector] of [
  ["light", ":root"],
  ["dark", ".dark"],
]) {
  const tokens = parseTokens(extractBlock(css, selector));
  console.log(`\n[${mode} mode]`);
  for (const [fg, bg, min, label] of REQUIRED_PAIRS) {
    if (!tokens[fg] || !tokens[bg]) {
      console.log(`  SKIP ${fg} on ${bg} (token missing or not oklch)`);
      continue;
    }
    const ratio = contrast(tokens[fg], tokens[bg]);
    const ok = ratio >= min;
    if (!ok) failures++;
    console.log(
      `  ${ok ? "PASS" : "FAIL"} ${fg} on ${bg} (${label}): ${ratio.toFixed(2)}:1 (min ${min}:1)`,
    );
  }
}

if (failures > 0) {
  console.error(`\n${failures} contrast pair(s) below minimum. Gate: FAIL`);
  process.exit(1);
}
console.log("\nAll contrast pairs pass. Gate: PASS");
