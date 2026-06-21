import { hex } from "../lib/color.mjs";

export const meta = { app: "ghostty", name: "Ghostty", category: "terminal", ext: "" };

export default function ghostty(v, m) {
  const { ui: u, ansi: a } = v;
  const ansiOrder = [
    a.black, a.red, a.green, a.yellow, a.blue, a.magenta, a.cyan, a.white,
    a.brightBlack, a.brightRed, a.brightGreen, a.brightYellow, a.brightBlue, a.brightMagenta, a.brightCyan, a.brightWhite,
  ];
  const palette = ansiOrder.map((c, i) => `palette = ${i}=${hex(c)}`).join("\n");
  return `# ${m.name} — ${v.appearance === "dark" ? "Dark" : "Light"}
# Sabotage theme. Copy to $XDG_CONFIG_HOME/ghostty/themes/Sabotage-${v.appearance}
# then set: theme = Sabotage-${v.appearance}

background = ${hex(u.bg)}
foreground = ${hex(u.fg)}
cursor-color = ${hex(u.cursor)}
cursor-text = ${hex(u.bg)}
selection-background = ${hex(u.selection)}
selection-foreground = ${hex(u.fg)}
${palette}
`;
}
