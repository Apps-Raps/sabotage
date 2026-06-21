import { hex } from "../lib/color.mjs";

export const meta = { app: "sublime", name: "Sublime Text", category: "editor", ext: "sublime-color-scheme" };

export default function sublime(v, m) {
  const { ui: u, ansi: a, syntax: s } = v;
  const name = `${m.name} ${v.appearance === "dark" ? "Dark" : "Light"}`;
  const rule = (scope, foreground, font_style) =>
    font_style ? { scope, foreground: hex(foreground), font_style } : { scope, foreground: hex(foreground) };

  const scheme = {
    name,
    author: m.author,
    variables: {},
    globals: {
      background: hex(u.bg),
      foreground: hex(u.fg),
      caret: hex(u.cursor),
      block_caret: hex(u.cursor),
      line_highlight: hex(u.bgHl),
      selection: hex(u.selection),
      selection_border: hex(u.accent),
      inactive_selection: hex(u.bgHl),
      misspelling: hex(v.extra.error),
      gutter: hex(u.bgAlt),
      gutter_foreground: hex(u.comment),
      invisibles: hex(u.border),
      guide: hex(u.border),
      active_guide: hex(u.comment),
      find_highlight: hex(u.accent),
      find_highlight_foreground: hex(u.bg),
      accent: hex(u.accent),
    },
    rules: [
      rule("comment", s.comment, "italic"),
      rule("string", s.string),
      rule("string.regexp", s.regex),
      rule("constant.character.escape", s.escape),
      rule("constant.numeric", s.number),
      rule("constant.language", s.constant),
      rule("constant.other", s.constant),
      rule("keyword", s.keyword),
      rule("keyword.operator", s.operator),
      rule("storage", s.keyword),
      rule("storage.type", s.type),
      rule("variable", s.variable),
      rule("variable.parameter", s.variable, "italic"),
      rule("variable.function", s.function),
      rule("entity.name.function", s.function),
      rule("support.function", s.function),
      rule("entity.name.class", s.type),
      rule("entity.name.type", s.type),
      rule("support.type", s.type),
      rule("support.class", s.type),
      rule("entity.name.tag", s.tag),
      rule("entity.other.attribute-name", s.attribute),
      rule("punctuation", s.punctuation),
      rule("invalid", s.invalid),
    ],
  };
  return JSON.stringify(scheme, null, 2) + "\n";
}
