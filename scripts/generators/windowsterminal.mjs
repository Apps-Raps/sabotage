import { hex } from "../lib/color.mjs";

export const meta = { app: "windowsterminal", name: "Windows Terminal", category: "terminal", ext: "json" };

export default function windowsterminal(v, m) {
  const { ui: u, ansi: a } = v;
  // Note: Windows Terminal uses "purple"/"brightPurple" (not magenta).
  const scheme = {
    name: `${m.name} ${v.appearance === "dark" ? "Dark" : "Light"}`,
    background: hex(u.bg),
    foreground: hex(u.fg),
    cursorColor: hex(u.cursor),
    selectionBackground: hex(u.selection),
    black: hex(a.black),
    red: hex(a.red),
    green: hex(a.green),
    yellow: hex(a.yellow),
    blue: hex(a.blue),
    purple: hex(a.magenta),
    cyan: hex(a.cyan),
    white: hex(a.white),
    brightBlack: hex(a.brightBlack),
    brightRed: hex(a.brightRed),
    brightGreen: hex(a.brightGreen),
    brightYellow: hex(a.brightYellow),
    brightBlue: hex(a.brightBlue),
    brightPurple: hex(a.brightMagenta),
    brightCyan: hex(a.brightCyan),
    brightWhite: hex(a.brightWhite),
  };
  return JSON.stringify(scheme, null, 4) + "\n";
}
