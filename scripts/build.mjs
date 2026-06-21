#!/usr/bin/env node
// build.mjs — read spec/palette.json, generate every app theme into packs/,
// and emit packs/manifest.json. Zero dependencies.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SPEC = join(ROOT, "spec", "palette.json");
const GEN_DIR = join(__dirname, "generators");
const PACKS = join(ROOT, "packs");

const HEX = /^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/;
const CATEGORIES = ["editor", "terminal", "shell", "chat", "web"];

function fail(msg) {
  console.error(`\x1b[31m✗ ${msg}\x1b[0m`);
  process.exit(1);
}

// ── Load + validate spec ──────────────────────────────────────────────────────
const spec = JSON.parse(readFileSync(SPEC, "utf8"));
if (!spec.variants?.dark || !spec.variants?.light) fail("spec must define variants.dark and variants.light");

const SECTIONS = ["ui", "ansi", "syntax", "extra"];
for (const section of SECTIONS) {
  const dk = Object.keys(spec.variants.dark[section] ?? {}).sort();
  const lk = Object.keys(spec.variants.light[section] ?? {}).sort();
  if (dk.length === 0) fail(`dark.${section} is empty`);
  if (JSON.stringify(dk) !== JSON.stringify(lk)) {
    fail(`role key mismatch in "${section}": dark=[${dk}] light=[${lk}]`);
  }
  for (const variant of ["dark", "light"]) {
    for (const [k, val] of Object.entries(spec.variants[variant][section])) {
      if (!HEX.test(val)) fail(`invalid hex in ${variant}.${section}.${k}: ${val}`);
    }
  }
}

// ── Discover generators ───────────────────────────────────────────────────────
const genFiles = readdirSync(GEN_DIR).filter((f) => f.endsWith(".mjs")).sort();
const generators = [];
for (const f of genFiles) {
  const mod = await import(join(GEN_DIR, f));
  if (!mod.meta || !mod.default) fail(`generator ${f} must export meta and default`);
  generators.push({ ...mod.meta, fn: mod.default });
}

// ── Generate ──────────────────────────────────────────────────────────────────
rmSync(PACKS, { recursive: true, force: true });
mkdirSync(PACKS, { recursive: true });

const fileName = (ext, variant) => (ext ? `sabotage-${variant}.${ext}` : `sabotage-${variant}`);
const manifestApps = [];
const summary = [];

for (const g of generators) {
  const outDir = join(PACKS, g.app);
  mkdirSync(outDir, { recursive: true });

  if (g.multi) {
    // web-style generator: returns [{file, content}], driven by the whole spec
    const files = g.fn(spec.variants ? spec : spec, spec.meta);
    const rel = {};
    for (const { file, content } of files) {
      writeFileSync(join(outDir, file), content);
      rel[file] = `packs/${g.app}/${file}`;
      summary.push([`${g.app}/${file}`, content.length]);
    }
    manifestApps.push({
      id: g.app, name: g.name, category: g.category, multi: true,
      files: rel, docs: `docs/${g.app}.json`, icon: `assets/icons/${g.app}.svg`,
    });
    continue;
  }

  const files = {};
  for (const variant of ["dark", "light"]) {
    const content = g.fn(spec.variants[variant], spec.meta);
    if (typeof content !== "string" || content.length === 0) fail(`${g.app} (${variant}) produced no content`);
    const fn = fileName(g.ext, variant);
    writeFileSync(join(outDir, fn), content);
    files[variant] = `packs/${g.app}/${fn}`;
    summary.push([`${g.app}/${fn}`, content.length]);
  }
  manifestApps.push({
    id: g.app, name: g.name, category: g.category, ext: g.ext,
    files, docs: `docs/${g.app}.json`, icon: `assets/icons/${g.app}.svg`,
  });
}

// stable order by category then name
manifestApps.sort((a, b) => {
  const c = CATEGORIES.indexOf(a.category) - CATEGORIES.indexOf(b.category);
  return c !== 0 ? c : a.name.localeCompare(b.name);
});

const manifest = {
  name: spec.meta.name,
  version: spec.meta.version,
  homepage: spec.meta.homepage,
  generated: new Date().toISOString().slice(0, 10),
  categories: CATEGORIES,
  count: manifestApps.length,
  apps: manifestApps,
};
writeFileSync(join(PACKS, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

// ── Report ────────────────────────────────────────────────────────────────────
console.log(`\x1b[32m✓ Sabotage v${spec.meta.version} — ${manifestApps.length} integrations\x1b[0m`);
for (const [name, bytes] of summary) {
  console.log(`  ${name.padEnd(42)} ${String(bytes).padStart(6)} B`);
}
console.log(`  ${"packs/manifest.json".padEnd(42)} ${String(JSON.stringify(manifest).length).padStart(6)} B`);
