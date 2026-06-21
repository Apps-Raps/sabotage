import { hex } from "../lib/color.mjs";

export const meta = { app: "atom", name: "Atom", category: "editor", ext: "less" };

export default function atom(v, m) {
  const { ui: u, syntax: s, extra: e } = v;
  return `// ${m.name} — ${v.appearance === "dark" ? "Dark" : "Light"}
// Sabotage syntax theme for Atom.
// Use as a syntax-theme package: place in styles/ as colors.less + base.less,
// or paste into your stylesheet (Atom → Stylesheet…).

// ── Syntax variables ─────────────────────────────────────────────────────────
@syntax-text-color:           ${hex(u.fg)};
@syntax-cursor-color:         ${hex(u.cursor)};
@syntax-selection-color:      ${hex(u.selection)};
@syntax-selection-flash-color:${hex(u.accent)};
@syntax-background-color:     ${hex(u.bg)};

@syntax-wrap-guide-color:        ${hex(u.border)};
@syntax-indent-guide-color:      ${hex(u.border)};
@syntax-invisible-character-color:${hex(u.border)};

@syntax-result-marker-color:         ${hex(u.comment)};
@syntax-result-marker-color-selected:${hex(u.accent)};

@syntax-gutter-text-color:               ${hex(u.comment)};
@syntax-gutter-text-color-selected:      ${hex(u.fg)};
@syntax-gutter-background-color:         ${hex(u.bg)};
@syntax-gutter-background-color-selected:${hex(u.bgHl)};

@syntax-color-renamed:  ${hex(e.info)};
@syntax-color-added:    ${hex(e.success)};
@syntax-color-modified: ${hex(e.warning)};
@syntax-color-removed:  ${hex(e.error)};

// ── Editor + tokens ──────────────────────────────────────────────────────────
atom-text-editor {
  background-color: @syntax-background-color;
  color: @syntax-text-color;

  .line.cursor-line { background-color: ${hex(u.bgHl)}; }
  .cursor { border-color: @syntax-cursor-color; }
  .selection .region { background-color: @syntax-selection-color; }

  .syntax--comment { color: ${hex(s.comment)}; font-style: italic; }
  .syntax--string { color: ${hex(s.string)}; }
  .syntax--string.syntax--regexp { color: ${hex(s.regex)}; }
  .syntax--constant.syntax--character.syntax--escape { color: ${hex(s.escape)}; }
  .syntax--constant.syntax--numeric { color: ${hex(s.number)}; }
  .syntax--constant { color: ${hex(s.constant)}; }
  .syntax--keyword { color: ${hex(s.keyword)}; }
  .syntax--keyword.syntax--operator { color: ${hex(s.operator)}; }
  .syntax--storage { color: ${hex(s.keyword)}; }
  .syntax--storage.syntax--type { color: ${hex(s.type)}; }
  .syntax--variable { color: ${hex(s.variable)}; }
  .syntax--variable.syntax--parameter { color: ${hex(s.variable)}; }
  .syntax--entity.syntax--name.syntax--function { color: ${hex(s.function)}; }
  .syntax--support.syntax--function { color: ${hex(s.function)}; }
  .syntax--entity.syntax--name.syntax--type,
  .syntax--entity.syntax--name.syntax--class,
  .syntax--support.syntax--type,
  .syntax--support.syntax--class { color: ${hex(s.type)}; }
  .syntax--entity.syntax--name.syntax--tag { color: ${hex(s.tag)}; }
  .syntax--entity.syntax--other.syntax--attribute-name { color: ${hex(s.attribute)}; }
  .syntax--punctuation { color: ${hex(s.punctuation)}; }
  .syntax--invalid.syntax--illegal { color: ${hex(u.bg)}; background-color: ${hex(s.invalid)}; }
}
`;
}
