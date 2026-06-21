import { hex } from "../lib/color.mjs";

export const meta = { app: "alacritty", name: "Alacritty", category: "terminal", ext: "toml" };

export default function alacritty(v, m) {
  const { ui: u, ansi: a } = v;
  const q = (c) => `"${hex(c)}"`;
  return `# ${m.name} — ${v.appearance === "dark" ? "Dark" : "Light"}
# Sabotage theme. Import via: general.import = ["~/.config/alacritty/sabotage-${v.appearance}.toml"]

[colors.primary]
background = ${q(u.bg)}
foreground = ${q(u.fg)}

[colors.cursor]
cursor = ${q(u.cursor)}
text = ${q(u.bg)}

[colors.selection]
background = ${q(u.selection)}
text = ${q(u.fg)}

[colors.normal]
black = ${q(a.black)}
red = ${q(a.red)}
green = ${q(a.green)}
yellow = ${q(a.yellow)}
blue = ${q(a.blue)}
magenta = ${q(a.magenta)}
cyan = ${q(a.cyan)}
white = ${q(a.white)}

[colors.bright]
black = ${q(a.brightBlack)}
red = ${q(a.brightRed)}
green = ${q(a.brightGreen)}
yellow = ${q(a.brightYellow)}
blue = ${q(a.brightBlue)}
magenta = ${q(a.brightMagenta)}
cyan = ${q(a.brightCyan)}
white = ${q(a.brightWhite)}
`;
}
