import { hex } from "../lib/color.mjs";

export const meta = { app: "kitty", name: "Kitty", category: "terminal", ext: "conf" };

export default function kitty(v, m) {
  const { ui: u, ansi: a } = v;
  const ansiOrder = [
    a.black, a.red, a.green, a.yellow, a.blue, a.magenta, a.cyan, a.white,
    a.brightBlack, a.brightRed, a.brightGreen, a.brightYellow, a.brightBlue, a.brightMagenta, a.brightCyan, a.brightWhite,
  ];
  const colors = ansiOrder.map((c, i) => `color${i} ${hex(c)}`).join("\n");
  return `# ${m.name} — ${v.appearance === "dark" ? "Dark" : "Light"}
# Sabotage theme. Install: include sabotage-${v.appearance}.conf in kitty.conf
# or copy to ~/.config/kitty/ and run: kitty +kitten themes

background ${hex(u.bg)}
foreground ${hex(u.fg)}
selection_background ${hex(u.selection)}
selection_foreground ${hex(u.fg)}
cursor ${hex(u.cursor)}
cursor_text_color ${hex(u.bg)}
url_color ${hex(u.accent)}

active_border_color ${hex(u.accent)}
inactive_border_color ${hex(u.border)}
active_tab_background ${hex(u.accent)}
active_tab_foreground ${hex(u.bg)}
inactive_tab_background ${hex(u.bgAlt)}
inactive_tab_foreground ${hex(u.comment)}

${colors}
`;
}
