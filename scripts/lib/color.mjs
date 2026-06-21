// color.mjs — pure color helpers. Hex (#rrggbb[aa]) is the only input form;
// every app-specific representation is derived here so nothing drifts.

const HEX_RE = /^#?([0-9a-fA-F]{6})([0-9a-fA-F]{2})?$/;

function parse(c) {
  const m = String(c).match(HEX_RE);
  if (!m) throw new Error(`Invalid hex color: ${JSON.stringify(c)}`);
  const n = parseInt(m[1], 16);
  return {
    r: (n >> 16) & 0xff,
    g: (n >> 8) & 0xff,
    b: n & 0xff,
    a: m[2] === undefined ? 255 : parseInt(m[2], 16),
  };
}

/** "#dd5040" — normalized, lowercase, always with leading #. Drops alpha. */
export function hex(c) {
  const { r, g, b } = parse(c);
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

/** "dd5040" — no leading #, lowercase. */
export function hexNoHash(c) {
  return hex(c).slice(1);
}

/** "DD5040" — no leading #, uppercase (Notepad++ convention). */
export function hexNoHashUpper(c) {
  return hexNoHash(c).toUpperCase();
}

/** "0xdd5040" — Hyper / some configs. */
export function hex0x(c) {
  return "0x" + hexNoHash(c);
}

/** { r, g, b } in 0–255. */
export function rgb(c) {
  const { r, g, b } = parse(c);
  return { r, g, b };
}

/** { r, g, b } in 0–1 with 6-decimal precision (iTerm2 plist). */
export function rgbFloat(c) {
  const { r, g, b } = parse(c);
  const f = (v) => +(v / 255).toFixed(6);
  return { r: f(r), g: f(g), b: f(b) };
}

/** "rgb(221, 80, 64)" */
export function rgbCss(c) {
  const { r, g, b } = parse(c);
  return `rgb(${r}, ${g}, ${b})`;
}

/** "rgba(221, 80, 64, 0.3)" */
export function rgbaCss(c, alpha) {
  const { r, g, b } = parse(c);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** { h, s, l } — h in 0–360, s/l in 0–100 (rounded). */
export function hsl(c) {
  const { r, g, b } = parse(c);
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  const d = max - min;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn: h = (gn - bn) / d + (gn < bn ? 6 : 0); break;
      case gn: h = (bn - rn) / d + 2; break;
      default: h = (rn - gn) / d + 4;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

/** "38;2;221;80;64" — truecolor SGR body (Zsh LS_COLORS / prompts). */
export function sgrTruecolor(c, layer = 38) {
  const { r, g, b } = parse(c);
  return `${layer};2;${r};${g};${b}`;
}

// ── xterm-256 nearest index (Vim cterm fallback) ──────────────────────────────
const CUBE = [0, 95, 135, 175, 215, 255];

function nearestCubeComponent(v) {
  let best = 0, bestD = Infinity;
  for (let i = 0; i < CUBE.length; i++) {
    const d = Math.abs(CUBE[i] - v);
    if (d < bestD) { bestD = d; best = i; }
  }
  return best;
}

function dist2(a, b) {
  return (a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2;
}

/** Nearest xterm-256 color index (16–255). */
export function cterm256(c) {
  const { r, g, b } = parse(c);
  // candidate from the 6x6x6 color cube
  const ci = nearestCubeComponent(r), cj = nearestCubeComponent(g), ck = nearestCubeComponent(b);
  const cubeIdx = 16 + 36 * ci + 6 * cj + ck;
  const cubeRGB = { r: CUBE[ci], g: CUBE[cj], b: CUBE[ck] };
  // candidate from the grayscale ramp (232–255)
  const gray = Math.round((r + g + b) / 3);
  let grayIdx, grayRGB;
  if (gray < 8) { grayIdx = 16; grayRGB = { r: 0, g: 0, b: 0 }; }
  else if (gray > 238) { grayIdx = 231; grayRGB = { r: 255, g: 255, b: 255 }; }
  else {
    const step = Math.round((gray - 8) / 10);
    grayIdx = 232 + step;
    const gv = 8 + step * 10;
    grayRGB = { r: gv, g: gv, b: gv };
  }
  const target = { r, g, b };
  return dist2(cubeRGB, target) <= dist2(grayRGB, target) ? cubeIdx : grayIdx;
}

/** Slack sidebar theme string: 8 comma-separated hex values (with #). */
export function slackString(v) {
  return [
    v.ui.bgAlt,      // Column BG
    v.ui.bgHl,       // Menu BG Hover
    v.ui.accent,     // Active Item
    "#FFFFFF",       // Active Item Text
    v.ui.bgHl,       // Hover Item
    v.ui.fg,         // Text Color
    v.extra.success, // Active Presence
    v.extra.error,   // Mention Badge
  ].map(hex).join(",");
}
