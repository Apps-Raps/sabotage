import { hex } from "../lib/color.mjs";

export const meta = { app: "termux", name: "Termux", category: "terminal", ext: "properties" };

export default function termux(v, m) {
  const { ui: u, ansi: a } = v;
  const order = [
    a.black, a.red, a.green, a.yellow, a.blue, a.magenta, a.cyan, a.white,
    a.brightBlack, a.brightRed, a.brightGreen, a.brightYellow, a.brightBlue, a.brightMagenta, a.brightCyan, a.brightWhite,
  ];
  const colors = order.map((c, i) => `color${i}=${hex(c)}`).join("\n");
  return `# ${m.name} — ${v.appearance === "dark" ? "Dark" : "Light"}
# Sabotage theme. Save as ~/.termux/colors.properties then run: termux-reload-settings

background=${hex(u.bg)}
foreground=${hex(u.fg)}
cursor=${hex(u.cursor)}
${colors}
`;
}
