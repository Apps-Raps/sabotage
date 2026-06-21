import { hex, darken } from "../lib/color.mjs";

export const meta = { app: "telegram", name: "Telegram", category: "chat", ext: "tdesktop-palette" };

export default function telegram(v, m) {
  const { ui: u, ansi: a, extra: e } = v;
  const accent2 = darken(u.accent, 0.15);
  const on = "#ffffff";
  // Telegram Desktop palette. Undefined keys fall back to the default theme.
  const lines = [
    ["windowBg", u.bg], ["windowFg", u.fg],
    ["windowBgOver", u.bgHl], ["windowBgRipple", u.bgHl],
    ["windowFgOver", u.fg], ["windowSubTextFg", u.fgDim], ["windowSubTextFgOver", u.fgDim],
    ["windowBoldFg", u.fg], ["windowBoldFgOver", u.fg],
    ["windowActiveTextFg", u.accent], ["windowActiveTextFgOver", u.accent],
    ["windowBgActive", u.accent], ["windowFgActive", on],
    ["activeButtonBg", u.accent], ["activeButtonBgOver", accent2],
    ["activeButtonFg", on], ["activeButtonFgOver", on], ["activeButtonSecondaryFg", on],
    ["lightButtonBg", u.bgHl], ["lightButtonBgOver", u.border], ["lightButtonFg", u.accent],
    ["scrollBg", u.bgAlt], ["scrollBgOver", u.bgHl], ["scrollBarBg", u.border], ["scrollBarBgOver", u.comment],
    ["titleBg", u.bgAlt], ["titleFg", u.fgDim], ["titleFgActive", u.fg],
    ["menuBg", u.bgAlt], ["menuBgOver", u.bgHl], ["menuFg", u.fg], ["menuFgOver", u.fg],
    ["menuIconFg", u.fgDim], ["menuIconFgOver", u.accent],
    ["dialogsBg", u.bg], ["dialogsBgOver", u.bgHl],
    ["dialogsNameFg", u.fg], ["dialogsNameFgOver", u.fg],
    ["dialogsChatFg", u.fgDim], ["dialogsTextFg", u.fgDim], ["dialogsTextFgOver", u.fgDim],
    ["dialogsDateFg", u.comment],
    ["dialogsBgActive", u.accent], ["dialogsNameFgActive", on], ["dialogsTextFgActive", on],
    ["dialogsDateFgActive", on], ["dialogsChatFgActive", on],
    ["dialogsUnreadBg", u.accent], ["dialogsUnreadBgActive", on], ["dialogsUnreadFg", on],
    ["dialogsUnreadBgMuted", u.border], ["dialogsUnreadFgMuted", u.fgDim],
    ["historyTextInFg", u.fg], ["historyTextOutFg", u.fg],
    ["msgInBg", u.bgAlt], ["msgInBgSelected", u.selection],
    ["msgOutBg", "#361612"], ["msgOutBgSelected", "#4a201a"],
    ["msgInDateFg", u.comment], ["msgOutDateFg", u.fgDim],
    ["msgServiceBg", u.bgAlt], ["msgServiceFg", u.fgDim],
    ["msgInShadow", "#00000000"], ["msgOutShadow", "#00000000"],
    ["msgInReplyBarColor", u.accent], ["msgOutReplyBarColor", e.orange],
    ["msgFileThumbLinkInFg", u.accent], ["msgFileThumbLinkOutFg", e.orange],
    ["historyLinkInFg", u.accent], ["historyLinkOutFg", e.orange],
    ["historyComposeAreaBg", u.bgAlt], ["historyComposeAreaFg", u.fg],
    ["historyComposeAreaFgService", u.comment], ["historyComposeIconFg", u.fgDim],
    ["historyComposeIconFgOver", u.accent], ["historySendIconFg", u.accent],
    ["chatListBg", u.bg], ["introBg", u.bg],
    ["sliderColor", u.accent], ["radialFg", u.accent],
    ["checkboxFg", u.border], ["filterInputActiveBg", u.bgAlt],
  ];
  // hex() drops alpha, so keep raw 8-digit values for the transparent shadow keys
  const out = lines.map(([k, c]) => `${k}: ${/^#[0-9a-fA-F]{8}$/.test(c) ? c : hex(c)};`).join("\n");

  return `// ${m.name} — ${v.appearance === "dark" ? "Dark" : "Light"}
// Sabotage palette for Telegram Desktop.
// Apply: Settings → Chat Settings → Theme → ⋮ → Create new theme (or import this .tdesktop-palette).
${out}
`;
}
