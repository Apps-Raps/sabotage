import { hex } from "../lib/color.mjs";

export const meta = { app: "wezterm", name: "WezTerm", category: "terminal", ext: "toml" };

export default function wezterm(v, m) {
  const { ui: u, ansi: a } = v;
  const q = (c) => `"${hex(c)}"`;
  const normal = [a.black, a.red, a.green, a.yellow, a.blue, a.magenta, a.cyan, a.white].map((c) => q(c)).join(", ");
  const bright = [a.brightBlack, a.brightRed, a.brightGreen, a.brightYellow, a.brightBlue, a.brightMagenta, a.brightCyan, a.brightWhite].map((c) => q(c)).join(", ");
  return `# ${m.name} — ${v.appearance === "dark" ? "Dark" : "Light"}
# Sabotage color scheme. Copy to ~/.config/wezterm/colors/sabotage-${v.appearance}.toml
# then in wezterm.lua:  config.color_scheme = "Sabotage ${v.appearance === "dark" ? "Dark" : "Light"}"

[metadata]
name = "Sabotage ${v.appearance === "dark" ? "Dark" : "Light"}"
author = "${m.author}"

[colors]
foreground = ${q(u.fg)}
background = ${q(u.bg)}
cursor_bg = ${q(u.cursor)}
cursor_fg = ${q(u.bg)}
cursor_border = ${q(u.cursor)}
selection_bg = ${q(u.selection)}
selection_fg = ${q(u.fg)}
scrollbar_thumb = ${q(u.border)}
split = ${q(u.border)}
ansi = [${normal}]
brights = [${bright}]
`;
}
