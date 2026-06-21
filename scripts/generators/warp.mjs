import { hex } from "../lib/color.mjs";

export const meta = { app: "warp", name: "Warp", category: "terminal", ext: "yaml" };

export default function warp(v, m) {
  const { ui: u, ansi: a } = v;
  const q = (c) => `"${hex(c)}"`;
  return `# ${m.name} — ${v.appearance === "dark" ? "Dark" : "Light"}
# Sabotage theme. Copy to ~/.warp/themes/ and select it in Warp settings.
name: ${m.name} ${v.appearance === "dark" ? "Dark" : "Light"}
accent: ${q(u.accent)}
cursor: ${q(u.cursor)}
background: ${q(u.bg)}
foreground: ${q(u.fg)}
details: ${v.appearance === "dark" ? "darker" : "lighter"}
terminal_colors:
  normal:
    black: ${q(a.black)}
    red: ${q(a.red)}
    green: ${q(a.green)}
    yellow: ${q(a.yellow)}
    blue: ${q(a.blue)}
    magenta: ${q(a.magenta)}
    cyan: ${q(a.cyan)}
    white: ${q(a.white)}
  bright:
    black: ${q(a.brightBlack)}
    red: ${q(a.brightRed)}
    green: ${q(a.brightGreen)}
    yellow: ${q(a.brightYellow)}
    blue: ${q(a.brightBlue)}
    magenta: ${q(a.brightMagenta)}
    cyan: ${q(a.brightCyan)}
    white: ${q(a.brightWhite)}
`;
}
