import { hex, rgbCss } from "../lib/color.mjs";

export const meta = { app: "obsidian", name: "Obsidian", category: "editor", ext: "css" };

export default function obsidian(v, m) {
  const { ui: u, syntax: s, extra: e } = v;
  const sel = `.theme-${v.appearance}`;
  return `/* ${m.name} — ${v.appearance === "dark" ? "Dark" : "Light"}
 * Sabotage theme snippet. Drop into .obsidian/snippets/ and enable it,
 * or use as a full theme. Variables follow the Obsidian app CSS API.
 */
${sel} {
  --background-primary: ${hex(u.bg)};
  --background-primary-alt: ${hex(u.bgAlt)};
  --background-secondary: ${hex(u.bgAlt)};
  --background-secondary-alt: ${hex(u.bgHl)};
  --background-modifier-border: ${hex(u.border)};
  --background-modifier-border-hover: ${hex(u.comment)};
  --background-modifier-hover: ${hex(u.bgHl)};
  --background-modifier-active-hover: ${hex(u.bgHl)};
  --background-modifier-form-field: ${hex(u.bg)};

  --text-normal: ${hex(u.fg)};
  --text-muted: ${hex(u.fgDim)};
  --text-faint: ${hex(u.comment)};
  --text-on-accent: #ffffff;
  --text-accent: ${hex(u.accent)};
  --text-accent-hover: ${hex(e.orange)};
  --text-selection: ${rgbCss(u.selection)};
  --text-highlight-bg: ${hex(u.selection)};
  --text-error: ${hex(e.error)};

  --interactive-normal: ${hex(u.bgAlt)};
  --interactive-hover: ${hex(u.bgHl)};
  --interactive-accent: ${hex(u.accent)};
  --interactive-accent-hover: ${hex(e.orange)};

  --caret-color: ${hex(u.cursor)};
  --link-color: ${hex(u.accent)};
  --link-external-color: ${hex(e.info)};
  --hr-color: ${hex(u.border)};
  --blockquote-border-color: ${hex(u.accent)};
  --tag-color: ${hex(u.accent)};
  --tag-background: ${rgbCss(u.bgHl)};

  /* code blocks (Prism token classes) */
  --code-background: ${hex(u.bgAlt)};
  --code-normal: ${hex(u.fg)};
  --code-comment: ${hex(s.comment)};
  --code-keyword: ${hex(s.keyword)};
  --code-string: ${hex(s.string)};
  --code-function: ${hex(s.function)};
  --code-property: ${hex(s.property)};
  --code-operator: ${hex(s.operator)};
  --code-punctuation: ${hex(s.punctuation)};
  --code-value: ${hex(s.number)};
  --code-tag: ${hex(s.tag)};
  --code-important: ${hex(e.error)};
}

${sel} .token.comment { color: ${hex(s.comment)}; font-style: italic; }
${sel} .token.keyword { color: ${hex(s.keyword)}; }
${sel} .token.string { color: ${hex(s.string)}; }
${sel} .token.number { color: ${hex(s.number)}; }
${sel} .token.function { color: ${hex(s.function)}; }
${sel} .token.operator { color: ${hex(s.operator)}; }
${sel} .token.tag { color: ${hex(s.tag)}; }
${sel} .token.attr-name { color: ${hex(s.attribute)}; }
${sel} .token.punctuation { color: ${hex(s.punctuation)}; }
`;
}
