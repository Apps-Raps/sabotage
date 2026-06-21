import { hex } from "../lib/color.mjs";

export const meta = { app: "discord", name: "Discord", category: "chat", ext: "theme.css" };

export default function discord(v, m) {
  const { ui: u, ansi: a, extra: e } = v;
  const dark = v.appearance === "dark";
  const name = `${m.name === "Discord" ? "Sabotage" : m.name} ${dark ? "Dark" : "Light"}`;
  // bg-tertiary should read a touch deeper/lighter than primary
  const tertiary = dark ? "#08090b" : "#eceef3";
  return `/**
 * @name ${name}
 * @author ${m.author}
 * @version ${m.version}
 * @description Sabotage theme for Discord (BetterDiscord / Vencord).
 * @website ${m.homepage}
 */

:root {
  --background-primary: ${hex(u.bg)};
  --background-secondary: ${hex(u.bgAlt)};
  --background-secondary-alt: ${hex(u.bgHl)};
  --background-tertiary: ${tertiary};
  --background-floating: ${hex(u.bgAlt)};
  --background-mobile-primary: ${hex(u.bg)};
  --background-mobile-secondary: ${hex(u.bgAlt)};
  --background-accent: ${hex(u.accent)};
  --background-modifier-hover: ${hex(u.bgHl)};
  --background-modifier-selected: ${hex(u.bgHl)};
  --channeltextarea-background: ${hex(u.bgAlt)};

  --header-primary: ${hex(u.fg)};
  --header-secondary: ${hex(u.fgDim)};
  --text-normal: ${hex(u.fg)};
  --text-muted: ${hex(u.comment)};
  --text-link: ${hex(u.accent)};
  --interactive-normal: ${hex(u.fgDim)};
  --interactive-hover: ${hex(u.fg)};
  --interactive-active: ${hex(u.fg)};
  --interactive-muted: ${hex(u.comment)};

  --brand-experiment: ${hex(u.accent)};
  --brand-experiment-560: ${hex(u.accent)};
  --brand-500: ${hex(u.accent)};
  --button-background: ${hex(u.accent)};
  --control-brand-foreground: ${hex(u.accent)};
  --mention-foreground: ${hex(u.accent)};

  --info-positive-foreground: ${hex(e.success)};
  --info-warning-foreground: ${hex(e.warning)};
  --info-danger-foreground: ${hex(e.error)};
  --text-positive: ${hex(e.success)};
  --text-warning: ${hex(e.warning)};
  --text-danger: ${hex(e.error)};

  --scrollbar-thin-thumb: ${hex(u.border)};
  --scrollbar-auto-thumb: ${hex(u.border)};
  --scrollbar-auto-track: ${hex(u.bg)};
}

.theme-${v.appearance} {
  --background-primary: ${hex(u.bg)};
  --background-secondary: ${hex(u.bgAlt)};
}
`;
}
