# Sabotage — Dark
# Sabotage theme for Zsh. Source from ~/.zshrc:  source ~/.config/zsh/sabotage-dark.zsh

# ── LS_COLORS (truecolor) ───────────────────────────────────────────────────
export LS_COLORS='di=38;2;91;141;239:ln=38;2;139;92;246:so=38;2;255;105;180:pi=38;2;255;209;102:ex=38;2;46;204;113:bd=38;2;255;138;68:cd=38;2;255;138;68:or=38;2;255;85;85:mi=38;2;255;85;85:*.tar=38;2;255;105;180:*.zip=38;2;255;105;180:*.gz=38;2;255;105;180:*.jpg=38;2;139;92;246:*.png=38;2;139;92;246:*.mp4=38;2;139;92;246:*.md=38;2;77;217;255'
zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}

# ── Minimal prompt (truecolor) ──────────────────────────────────────────────
# %F{#rrggbb} requires a truecolor terminal. Comment out if unsupported.
autoload -Uz vcs_info
zstyle ':vcs_info:git:*' formats ' %F{#8b5cf6}(%b)%f'
precmd() { vcs_info }
setopt prompt_subst
PROMPT='%F{#dd5040}%n%f %F{#5a5b63}in%f %F{#4dd9ff}%~%f${vcs_info_msg_0_}
%F{#dd5040}❯%f '
RPROMPT='%F{#5a5b63}%*%f'
