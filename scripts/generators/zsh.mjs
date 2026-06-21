import { hex, sgrTruecolor } from "../lib/color.mjs";

export const meta = { app: "zsh", name: "Zsh", category: "shell", ext: "zsh" };

export default function zsh(v, m) {
  const { ui: u, ansi: a, extra: e } = v;
  const c = (col) => sgrTruecolor(col, 38); // foreground SGR body
  // LS_COLORS — map common file types to palette roles
  const ls = [
    `di=${c(a.blue)}`,            // directory
    `ln=${c(e.purple)}`,          // symlink
    `so=${c(e.pink)}`,            // socket
    `pi=${c(a.yellow)}`,          // pipe
    `ex=${c(a.green)}`,           // executable
    `bd=${c(e.orange)}`,          // block device
    `cd=${c(e.orange)}`,          // char device
    `or=${c(e.error)}`,           // orphan link
    `mi=${c(e.error)}`,           // missing
    `*.tar=${c(e.pink)}`,
    `*.zip=${c(e.pink)}`,
    `*.gz=${c(e.pink)}`,
    `*.jpg=${c(e.purple)}`,
    `*.png=${c(e.purple)}`,
    `*.mp4=${c(e.purple)}`,
    `*.md=${c(a.cyan)}`,
  ].join(":");

  return `# ${m.name} — ${v.appearance === "dark" ? "Dark" : "Light"}
# Sabotage theme for Zsh. Source from ~/.zshrc:  source ~/.config/zsh/sabotage-${v.appearance}.zsh

# ── LS_COLORS (truecolor) ───────────────────────────────────────────────────
export LS_COLORS='${ls}'
zstyle ':completion:*' list-colors \${(s.:.)LS_COLORS}

# ── Minimal prompt (truecolor) ──────────────────────────────────────────────
# %F{#rrggbb} requires a truecolor terminal. Comment out if unsupported.
autoload -Uz vcs_info
zstyle ':vcs_info:git:*' formats ' %F{${hex(e.purple)}}(%b)%f'
precmd() { vcs_info }
setopt prompt_subst
PROMPT='%F{${hex(u.accent)}}%n%f %F{${hex(u.comment)}}in%f %F{${hex(a.cyan)}}%~%f\${vcs_info_msg_0_}
%F{${hex(u.accent)}}❯%f '
RPROMPT='%F{${hex(u.comment)}}%*%f'
`;
}
