import { hex, rgbaCss } from "../lib/color.mjs";

export const meta = { app: "hyper", name: "Hyper", category: "terminal", ext: "js" };

export default function hyper(v, m) {
  const { ui: u, ansi: a } = v;
  // Hyper uses lightX (not brightX) for the bright set.
  return `// ${m.name} — ${v.appearance === "dark" ? "Dark" : "Light"}
// Sabotage theme. Merge this 'config' fragment into your ~/.hyper.js config object.
module.exports = {
  config: {
    foregroundColor: '${hex(u.fg)}',
    backgroundColor: '${hex(u.bg)}',
    selectionColor: '${rgbaCss(u.selection, 0.99)}',
    borderColor: '${hex(u.border)}',
    cursorColor: '${hex(u.cursor)}',
    cursorAccentColor: '${hex(u.bg)}',
    colors: {
      black: '${hex(a.black)}',
      red: '${hex(a.red)}',
      green: '${hex(a.green)}',
      yellow: '${hex(a.yellow)}',
      blue: '${hex(a.blue)}',
      magenta: '${hex(a.magenta)}',
      cyan: '${hex(a.cyan)}',
      white: '${hex(a.white)}',
      lightBlack: '${hex(a.brightBlack)}',
      lightRed: '${hex(a.brightRed)}',
      lightGreen: '${hex(a.brightGreen)}',
      lightYellow: '${hex(a.brightYellow)}',
      lightBlue: '${hex(a.brightBlue)}',
      lightMagenta: '${hex(a.brightMagenta)}',
      lightCyan: '${hex(a.brightCyan)}',
      lightWhite: '${hex(a.brightWhite)}',
    },
  },
};
`;
}
