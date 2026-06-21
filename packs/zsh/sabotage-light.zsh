# Sabotage — Light
# Sabotage theme for Zsh. Source from ~/.zshrc:  source ~/.config/zsh/sabotage-light.zsh

# ── LS_COLORS (truecolor) ───────────────────────────────────────────────────
export LS_COLORS='di=38;2;37;99;201:ln=38;2;124;58;237:so=38;2;192;38;160:pi=38;2;183;121;31:ex=38;2;26;158;90:bd=38;2;194;65;12:cd=38;2;194;65;12:or=38;2;211;47;47:mi=38;2;211;47;47:*.tar=38;2;192;38;160:*.zip=38;2;192;38;160:*.gz=38;2;192;38;160:*.jpg=38;2;124;58;237:*.png=38;2;124;58;237:*.mp4=38;2;124;58;237:*.md=38;2;14;116;144'
zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}

# ── Minimal prompt (truecolor) ──────────────────────────────────────────────
# %F{#rrggbb} requires a truecolor terminal. Comment out if unsupported.
autoload -Uz vcs_info
zstyle ':vcs_info:git:*' formats ' %F{#7c3aed}(%b)%f'
precmd() { vcs_info }
setopt prompt_subst
PROMPT='%F{#dd5040}%n%f %F{#9395a0}in%f %F{#0e7490}%~%f${vcs_info_msg_0_}
%F{#dd5040}❯%f '
RPROMPT='%F{#9395a0}%*%f'
