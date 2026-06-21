import { hex } from "../lib/color.mjs";

export const meta = { app: "helix", name: "Helix", category: "editor", ext: "toml" };

export default function helix(v, m) {
  const { ui: u, ansi: a, syntax: s, extra: e } = v;
  const q = (c) => `"${hex(c)}"`;
  return `# ${m.name} — ${v.appearance === "dark" ? "Dark" : "Light"}
# Sabotage theme. Copy to ~/.config/helix/themes/sabotage-${v.appearance}.toml
# then set in config.toml:  theme = "sabotage-${v.appearance}"

# ── Syntax ──────────────────────────────────────────────────────────────────
"comment" = { fg = ${q(s.comment)}, modifiers = ["italic"] }
"keyword" = ${q(s.keyword)}
"keyword.control" = ${q(s.keyword)}
"keyword.operator" = ${q(s.operator)}
"operator" = ${q(s.operator)}
"string" = ${q(s.string)}
"string.regexp" = ${q(s.regex)}
"constant.character.escape" = ${q(s.escape)}
"constant.numeric" = ${q(s.number)}
"constant" = ${q(s.constant)}
"constant.builtin" = ${q(s.constant)}
"variable" = ${q(s.variable)}
"variable.parameter" = ${q(s.variable)}
"variable.builtin" = ${q(s.keyword)}
"function" = ${q(s.function)}
"function.builtin" = ${q(s.function)}
"function.macro" = ${q(e.pink)}
"type" = ${q(s.type)}
"type.builtin" = ${q(s.type)}
"constructor" = ${q(s.type)}
"label" = ${q(s.keyword)}
"namespace" = ${q(s.type)}
"punctuation" = ${q(s.punctuation)}
"punctuation.delimiter" = ${q(s.punctuation)}
"punctuation.bracket" = ${q(s.punctuation)}
"tag" = ${q(s.tag)}
"attribute" = ${q(s.attribute)}
"markup.heading" = { fg = ${q(s.keyword)}, modifiers = ["bold"] }
"markup.bold" = { modifiers = ["bold"] }
"markup.italic" = { modifiers = ["italic"] }
"markup.link.url" = { fg = ${q(e.info)}, modifiers = ["underlined"] }
"markup.raw" = ${q(s.string)}
"diff.plus" = ${q(e.success)}
"diff.delta" = ${q(e.warning)}
"diff.minus" = ${q(e.error)}

# ── UI ──────────────────────────────────────────────────────────────────────
"ui.background" = { bg = ${q(u.bg)} }
"ui.text" = ${q(u.fg)}
"ui.text.focus" = ${q(u.fg)}
"ui.cursor" = { fg = ${q(u.bg)}, bg = ${q(u.cursor)} }
"ui.cursor.primary" = { fg = ${q(u.bg)}, bg = ${q(u.cursor)} }
"ui.cursorline.primary" = { bg = ${q(u.bgHl)} }
"ui.linenr" = ${q(u.comment)}
"ui.linenr.selected" = ${q(u.fg)}
"ui.selection" = { bg = ${q(u.selection)} }
"ui.statusline" = { fg = ${q(u.fg)}, bg = ${q(u.bgAlt)} }
"ui.statusline.inactive" = { fg = ${q(u.comment)}, bg = ${q(u.bgAlt)} }
"ui.help" = { fg = ${q(u.fg)}, bg = ${q(u.bgAlt)} }
"ui.popup" = { fg = ${q(u.fg)}, bg = ${q(u.bgAlt)} }
"ui.window" = ${q(u.border)}
"ui.menu" = { fg = ${q(u.fg)}, bg = ${q(u.bgAlt)} }
"ui.menu.selected" = { fg = ${q(u.bg)}, bg = ${q(u.accent)} }
"ui.virtual.whitespace" = ${q(u.border)}
"ui.virtual.ruler" = { bg = ${q(u.bgAlt)} }
"ui.virtual.inlay-hint" = { fg = ${q(u.comment)}, bg = ${q(u.bgAlt)} }
"hint" = ${q(u.comment)}
"info" = ${q(e.info)}
"warning" = ${q(e.warning)}
"error" = ${q(e.error)}
"diagnostic" = { underline = { color = ${q(e.error)}, style = "curl" } }
`;
}
