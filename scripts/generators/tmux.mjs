import { hex } from "../lib/color.mjs";

export const meta = { app: "tmux", name: "tmux", category: "shell", ext: "conf" };

export default function tmux(v, m) {
  const { ui: u, extra: e } = v;
  return `# ${m.name} — ${v.appearance === "dark" ? "Dark" : "Light"}
# Sabotage theme. Add to ~/.tmux.conf:  source-file ~/.tmux/sabotage-${v.appearance}.conf

set -g status on
set -g status-style "bg=${hex(u.bgAlt)},fg=${hex(u.fg)}"
set -g status-left-length 30
set -g status-left "#[bg=${hex(u.accent)},fg=${hex(u.bg)},bold] #S #[bg=${hex(u.bgAlt)},fg=${hex(u.bgAlt)}] "
set -g status-right "#[fg=${hex(u.fgDim)}] %Y-%m-%d #[fg=${hex(u.accent)}]%H:%M "

setw -g window-status-format "#[fg=${hex(u.comment)}] #I:#W "
setw -g window-status-current-format "#[bg=${hex(u.bgHl)},fg=${hex(u.accent)},bold] #I:#W "
setw -g window-status-activity-style "fg=${hex(e.warning)}"

set -g pane-border-style "fg=${hex(u.border)}"
set -g pane-active-border-style "fg=${hex(u.accent)}"

set -g message-style "bg=${hex(u.accent)},fg=${hex(u.bg)}"
set -g message-command-style "bg=${hex(u.bgAlt)},fg=${hex(u.fg)}"
set -g mode-style "bg=${hex(u.selection)},fg=${hex(u.fg)}"
set -g display-panes-active-colour "${hex(u.accent)}"
set -g display-panes-colour "${hex(u.comment)}"
set -g clock-mode-colour "${hex(u.accent)}"
`;
}
