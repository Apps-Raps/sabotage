" Sabotage — Dark
" Generated from the Sabotage palette spec. Works in GUI (truecolor) and 256-color terminals.
set background=dark
hi clear
if exists("syntax_on")
  syntax reset
endif
let g:colors_name = "sabotage_dark"

" ── UI ──────────────────────────────────────────────────────────────────────
hi Normal guifg=#e8e8ea guibg=#0d0e11 ctermfg=255 ctermbg=233
hi NormalFloat guifg=#e8e8ea guibg=#1a1c24 ctermfg=255 ctermbg=234
hi ColorColumn guifg=NONE guibg=#22242e ctermfg=NONE ctermbg=235
hi Cursor guifg=#0d0e11 guibg=#dd5040 ctermfg=233 ctermbg=167
hi CursorLine guifg=NONE guibg=#22242e ctermfg=NONE ctermbg=235
hi CursorLineNr guifg=#dd5040 guibg=NONE ctermfg=167 ctermbg=NONE gui=bold cterm=bold
hi LineNr guifg=#5a5b63 guibg=NONE ctermfg=59 ctermbg=NONE
hi SignColumn guifg=NONE guibg=#0d0e11 ctermfg=NONE ctermbg=233
hi VertSplit guifg=#2a2c36 guibg=NONE ctermfg=236 ctermbg=NONE
hi WinSeparator guifg=#2a2c36 guibg=NONE ctermfg=236 ctermbg=NONE
hi Folded guifg=#5a5b63 guibg=#1a1c24 ctermfg=59 ctermbg=234
hi FoldColumn guifg=#5a5b63 guibg=NONE ctermfg=59 ctermbg=NONE
hi Visual guifg=NONE guibg=#2a3a52 ctermfg=NONE ctermbg=237
hi Search guifg=#0d0e11 guibg=#dd5040 ctermfg=233 ctermbg=167
hi IncSearch guifg=#0d0e11 guibg=#ff8a44 ctermfg=233 ctermbg=209
hi MatchParen guifg=#dd5040 guibg=#22242e ctermfg=167 ctermbg=235 gui=bold cterm=bold
hi Pmenu guifg=#e8e8ea guibg=#1a1c24 ctermfg=255 ctermbg=234
hi PmenuSel guifg=#0d0e11 guibg=#dd5040 ctermfg=233 ctermbg=167
hi PmenuSbar guifg=NONE guibg=#1a1c24 ctermfg=NONE ctermbg=234
hi PmenuThumb guifg=NONE guibg=#5a5b63 ctermfg=NONE ctermbg=59
hi StatusLine guifg=#e8e8ea guibg=#1a1c24 ctermfg=255 ctermbg=234
hi StatusLineNC guifg=#5a5b63 guibg=#1a1c24 ctermfg=59 ctermbg=234
hi TabLine guifg=#5a5b63 guibg=#1a1c24 ctermfg=59 ctermbg=234
hi TabLineSel guifg=#e8e8ea guibg=#0d0e11 ctermfg=255 ctermbg=233
hi TabLineFill guifg=NONE guibg=#1a1c24 ctermfg=NONE ctermbg=234
hi Title guifg=#dd5040 guibg=NONE ctermfg=167 ctermbg=NONE gui=bold cterm=bold
hi Directory guifg=#5b8def guibg=NONE ctermfg=69 ctermbg=NONE
hi NonText guifg=#2a2c36 guibg=NONE ctermfg=236 ctermbg=NONE
hi Whitespace guifg=#2a2c36 guibg=NONE ctermfg=236 ctermbg=NONE
hi SpecialKey guifg=#2a2c36 guibg=NONE ctermfg=236 ctermbg=NONE
hi ErrorMsg guifg=#ff5555 guibg=NONE ctermfg=203 ctermbg=NONE
hi WarningMsg guifg=#ffd166 guibg=NONE ctermfg=221 ctermbg=NONE

" ── Syntax ──────────────────────────────────────────────────────────────────
hi Comment guifg=#5a5b63 guibg=NONE ctermfg=59 ctermbg=NONE gui=italic cterm=italic
hi Constant guifg=#ff8a44 guibg=NONE ctermfg=209 ctermbg=NONE
hi String guifg=#2ecc71 guibg=NONE ctermfg=41 ctermbg=NONE
hi Character guifg=#2ecc71 guibg=NONE ctermfg=41 ctermbg=NONE
hi Number guifg=#ff8a44 guibg=NONE ctermfg=209 ctermbg=NONE
hi Boolean guifg=#ff8a44 guibg=NONE ctermfg=209 ctermbg=NONE
hi Float guifg=#ff8a44 guibg=NONE ctermfg=209 ctermbg=NONE
hi Identifier guifg=#e8e8ea guibg=NONE ctermfg=255 ctermbg=NONE
hi Function guifg=#4dd9ff guibg=NONE ctermfg=81 ctermbg=NONE
hi Statement guifg=#dd5040 guibg=NONE ctermfg=167 ctermbg=NONE
hi Conditional guifg=#dd5040 guibg=NONE ctermfg=167 ctermbg=NONE
hi Repeat guifg=#dd5040 guibg=NONE ctermfg=167 ctermbg=NONE
hi Label guifg=#dd5040 guibg=NONE ctermfg=167 ctermbg=NONE
hi Operator guifg=#ff69b4 guibg=NONE ctermfg=205 ctermbg=NONE
hi Keyword guifg=#dd5040 guibg=NONE ctermfg=167 ctermbg=NONE
hi Exception guifg=#dd5040 guibg=NONE ctermfg=167 ctermbg=NONE
hi PreProc guifg=#ff69b4 guibg=NONE ctermfg=205 ctermbg=NONE
hi Include guifg=#dd5040 guibg=NONE ctermfg=167 ctermbg=NONE
hi Define guifg=#dd5040 guibg=NONE ctermfg=167 ctermbg=NONE
hi Macro guifg=#ff69b4 guibg=NONE ctermfg=205 ctermbg=NONE
hi Type guifg=#ffd166 guibg=NONE ctermfg=221 ctermbg=NONE
hi StorageClass guifg=#ffd166 guibg=NONE ctermfg=221 ctermbg=NONE
hi Structure guifg=#ffd166 guibg=NONE ctermfg=221 ctermbg=NONE
hi Typedef guifg=#ffd166 guibg=NONE ctermfg=221 ctermbg=NONE
hi Special guifg=#ff8a44 guibg=NONE ctermfg=209 ctermbg=NONE
hi SpecialChar guifg=#ff8a44 guibg=NONE ctermfg=209 ctermbg=NONE
hi Tag guifg=#dd5040 guibg=NONE ctermfg=167 ctermbg=NONE
hi Delimiter guifg=#a8a9b0 guibg=NONE ctermfg=248 ctermbg=NONE
hi SpecialComment guifg=#5a5b63 guibg=NONE ctermfg=59 ctermbg=NONE gui=italic cterm=italic
hi Underlined guifg=#5b8def guibg=NONE ctermfg=69 ctermbg=NONE gui=underline cterm=underline
hi Error guifg=#ff5555 guibg=NONE ctermfg=203 ctermbg=NONE
hi Todo guifg=#0d0e11 guibg=#ffd166 ctermfg=233 ctermbg=221 gui=bold cterm=bold

" ── Diff / Git ──────────────────────────────────────────────────────────────
hi DiffAdd guifg=#2ecc71 guibg=#1a1c24 ctermfg=41 ctermbg=234
hi DiffChange guifg=#ffd166 guibg=#1a1c24 ctermfg=221 ctermbg=234
hi DiffDelete guifg=#ff5555 guibg=#1a1c24 ctermfg=203 ctermbg=234
hi DiffText guifg=#e8e8ea guibg=#2a3a52 ctermfg=255 ctermbg=237

" ── Treesitter / LSP (Neovim) ───────────────────────────────────────────────
hi! link @comment Comment
hi! link @string String
hi! link @number Number
hi! link @boolean Boolean
hi! link @function Function
hi! link @function.call Function
hi! link @keyword Keyword
hi! link @keyword.operator Operator
hi! link @variable Identifier
hi! link @type Type
hi! link @constant Constant
hi! link @property Identifier
hi! link @tag Tag
hi! link @tag.attribute Special
hi DiagnosticError guifg=#ff5555 guibg=NONE ctermfg=203 ctermbg=NONE
hi DiagnosticWarn guifg=#ffd166 guibg=NONE ctermfg=221 ctermbg=NONE
hi DiagnosticInfo guifg=#4dd9ff guibg=NONE ctermfg=81 ctermbg=NONE
hi DiagnosticHint guifg=#5a5b63 guibg=NONE ctermfg=59 ctermbg=NONE
