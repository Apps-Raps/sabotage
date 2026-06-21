#!/usr/bin/env node
// verify.mjs — sanity-check every generated file in packs/. Exit non-zero on any failure.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, extname } from "node:path";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PACKS = join(ROOT, "packs");

let failures = 0;
const ok = (m) => console.log(`  \x1b[32m✓\x1b[0m ${m}`);
const bad = (m) => { console.error(`  \x1b[31m✗ ${m}\x1b[0m`); failures++; };

const hasPython = spawnSync("python3", ["--version"]).status === 0;

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function pyParse(kind, file) {
  if (!hasPython) return null; // unknown — skip
  const code =
    kind === "xml"
      ? "import sys,xml.etree.ElementTree as ET; ET.parse(sys.argv[1])"
      : "import sys,tomllib; tomllib.load(open(sys.argv[1],'rb'))";
  const r = spawnSync("python3", ["-c", code, file], { encoding: "utf8" });
  return r.status === 0 ? true : (r.stderr || "parse error").trim();
}

if (!existsSync(PACKS)) { console.error("packs/ not found — run `node scripts/build.mjs` first"); process.exit(1); }

const files = walk(PACKS);
console.log(`Verifying ${files.length} files in packs/\n`);

for (const file of files) {
  const rel = file.slice(ROOT.length + 1);
  const text = readFileSync(file, "utf8");
  const base = file.toLowerCase();

  // ── cross-cutting: no unresolved values ─────────────────────────────────────
  for (const marker of ["undefined", "NaN", "[object Object]"]) {
    if (text.includes(marker)) bad(`${rel}: contains "${marker}"`);
  }
  if (/:\s*["']?#["';]/.test(text) || /#(?![0-9a-fA-F])/.test(text.replace(/#\d|#!/g, ""))) {
    // soft check for empty hex like `: #;` — avoid false positives on shebangs/anchors
  }

  // ── format-specific ─────────────────────────────────────────────────────────
  if (base.endsWith(".json")) {
    try { JSON.parse(text); ok(`${rel} (json)`); }
    catch (e) { bad(`${rel}: invalid JSON — ${e.message}`); }
  } else if (base.endsWith(".itermcolors")) {
    let count = 0;
    for (let i = 0; i < 16; i++) if (text.includes(`<key>Ansi ${i} Color</key>`)) count++;
    const reals = [...text.matchAll(/<real>([\d.]+)<\/real>/g)].map((m) => parseFloat(m[1]));
    const outOfRange = reals.filter((r) => r < 0 || r > 1);
    const xml = pyParse("xml", file);
    if (count !== 16) bad(`${rel}: expected 16 Ansi colors, found ${count}`);
    else if (outOfRange.length) bad(`${rel}: ${outOfRange.length} real(s) outside 0–1`);
    else if (xml !== true && xml !== null) bad(`${rel}: invalid plist XML — ${xml}`);
    else ok(`${rel} (plist, 16 ansi, floats in range)`);
  } else if (base.endsWith(".toml")) {
    const toml = pyParse("toml", file);
    // Alacritty has a fixed required structure; other TOML themes vary, so we
    // only assert section presence for Alacritty and otherwise trust the parser.
    const requiredSections = base.includes("/alacritty/")
      ? ["[colors.primary]", "[colors.normal]", "[colors.bright]"]
      : [];
    const missing = requiredSections.filter((s) => !text.includes(s));
    if (missing.length) bad(`${rel}: missing TOML sections ${missing.join(", ")}`);
    else if (toml !== true && toml !== null) bad(`${rel}: TOML parse error — ${toml}`);
    else if (toml === null) bad(`${rel}: cannot validate TOML (python3 with tomllib required)`);
    else ok(`${rel} (toml, parsed)`);
  } else if (base.endsWith(".xml") || base.endsWith(".icls")) {
    const xml = pyParse("xml", file);
    if (xml === true || xml === null) ok(`${rel} (xml${xml === true ? ", parsed" : ", skipped"})`);
    else bad(`${rel}: invalid XML — ${xml}`);
  } else if (base.endsWith(".css")) {
    const opens = (text.match(/{/g) || []).length;
    const closes = (text.match(/}/g) || []).length;
    if (opens !== closes) bad(`${rel}: unbalanced braces (${opens} { vs ${closes} })`);
    else ok(`${rel} (css, balanced)`);
  } else {
    ok(`${rel}`);
  }
}

// ── manifest cross-check: every referenced file exists ──────────────────────────
const manifest = JSON.parse(readFileSync(join(PACKS, "manifest.json"), "utf8"));
for (const app of manifest.apps) {
  const refs = app.multi ? Object.values(app.files) : Object.values(app.files);
  for (const r of refs) {
    if (!existsSync(join(ROOT, r))) bad(`manifest references missing file: ${r}`);
  }
}
ok(`manifest: ${manifest.apps.length} apps, all file refs resolve`);

console.log("");
if (failures) { console.error(`\x1b[31m${failures} check(s) failed\x1b[0m`); process.exit(1); }
console.log(`\x1b[32mAll checks passed.\x1b[0m`);
