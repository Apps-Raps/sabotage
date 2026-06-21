" Sabotage — Light
" Generated from the Sabotage palette spec. Works in GUI (truecolor) and 256-color terminals.
set background=light
hi clear
if exists("syntax_on")
  syntax reset
endif
let g:colors_name = "sabotage_light"

" ── UI ──────────────────────────────────────────────────────────────────────
hi Normal guifg=#1a1c24 guibg=#fbfbfd ctermfg=234 ctermbg=231
hi NormalFloat guifg=#1a1c24 guibg=#f1f2f6 ctermfg=234 ctermbg=231
hi ColorColumn guifg=NONE guibg=#e7e8ee ctermfg=NONE ctermbg=255
hi Cursor guifg=#fbfbfd guibg=#dd5040 ctermfg=231 ctermbg=167
hi CursorLine guifg=NONE guibg=#e7e8ee ctermfg=NONE ctermbg=255
hi CursorLineNr guifg=#dd5040 guibg=NONE ctermfg=167 ctermbg=NONE gui=bold cterm=bold
hi LineNr guifg=#9395a0 guibg=NONE ctermfg=246 ctermbg=NONE
hi SignColumn guifg=NONE guibg=#fbfbfd ctermfg=NONE ctermbg=231
hi VertSplit guifg=#dddee6 guibg=NONE ctermfg=254 ctermbg=NONE
hi WinSeparator guifg=#dddee6 guibg=NONE ctermfg=254 ctermbg=NONE
hi Folded guifg=#9395a0 guibg=#f1f2f6 ctermfg=246 ctermbg=231
hi FoldColumn guifg=#9395a0 guibg=NONE ctermfg=246 ctermbg=NONE
hi Visual guifg=NONE guibg=#cfe0f5 ctermfg=NONE ctermbg=189
hi Search guifg=#fbfbfd guibg=#dd5040 ctermfg=231 ctermbg=167
hi IncSearch guifg=#fbfbfd guibg=#c2410c ctermfg=231 ctermbg=130
hi MatchParen guifg=#dd5040 guibg=#e7e8ee ctermfg=167 ctermbg=255 gui=bold cterm=bold
hi Pmenu guifg=#1a1c24 guibg=#f1f2f6 ctermfg=234 ctermbg=231
hi PmenuSel guifg=#fbfbfd guibg=#dd5040 ctermfg=231 ctermbg=167
hi PmenuSbar guifg=NONE guibg=#f1f2f6 ctermfg=NONE ctermbg=231
hi PmenuThumb guifg=NONE guibg=#9395a0 ctermfg=NONE ctermbg=246
hi StatusLine guifg=#1a1c24 guibg=#f1f2f6 ctermfg=234 ctermbg=231
hi StatusLineNC guifg=#9395a0 guibg=#f1f2f6 ctermfg=246 ctermbg=231
hi TabLine guifg=#9395a0 guibg=#f1f2f6 ctermfg=246 ctermbg=231
hi TabLineSel guifg=#1a1c24 guibg=#fbfbfd ctermfg=234 ctermbg=231
hi TabLineFill guifg=NONE guibg=#f1f2f6 ctermfg=NONE ctermbg=231
hi Title guifg=#dd5040 guibg=NONE ctermfg=167 ctermbg=NONE gui=bold cterm=bold
hi Directory guifg=#2563c9 guibg=NONE ctermfg=26 ctermbg=NONE
hi NonText guifg=#dddee6 guibg=NONE ctermfg=254 ctermbg=NONE
hi Whitespace guifg=#dddee6 guibg=NONE ctermfg=254 ctermbg=NONE
hi SpecialKey guifg=#dddee6 guibg=NONE ctermfg=254 ctermbg=NONE
hi ErrorMsg guifg=#d32f2f guibg=NONE ctermfg=160 ctermbg=NONE
hi WarningMsg guifg=#b7791f guibg=NONE ctermfg=136 ctermbg=NONE

" ── Syntax ──────────────────────────────────────────────────────────────────
hi Comment guifg=#9395a0 guibg=NONE ctermfg=246 ctermbg=NONE gui=italic cterm=italic
hi Constant guifg=#c2410c guibg=NONE ctermfg=130 ctermbg=NONE
hi String guifg=#1a9e5a guibg=NONE ctermfg=35 ctermbg=NONE
hi Character guifg=#1a9e5a guibg=NONE ctermfg=35 ctermbg=NONE
hi Number guifg=#c2410c guibg=NONE ctermfg=130 ctermbg=NONE
hi Boolean guifg=#c2410c guibg=NONE ctermfg=130 ctermbg=NONE
hi Float guifg=#c2410c guibg=NONE ctermfg=130 ctermbg=NONE
hi Identifier guifg=#1a1c24 guibg=NONE ctermfg=234 ctermbg=NONE
hi Function guifg=#0e7490 guibg=NONE ctermfg=30 ctermbg=NONE
hi Statement guifg=#c8432f guibg=NONE ctermfg=166 ctermbg=NONE
hi Conditional guifg=#c8432f guibg=NONE ctermfg=166 ctermbg=NONE
hi Repeat guifg=#c8432f guibg=NONE ctermfg=166 ctermbg=NONE
hi Label guifg=#c8432f guibg=NONE ctermfg=166 ctermbg=NONE
hi Operator guifg=#c026a0 guibg=NONE ctermfg=127 ctermbg=NONE
hi Keyword guifg=#c8432f guibg=NONE ctermfg=166 ctermbg=NONE
hi Exception guifg=#c8432f guibg=NONE ctermfg=166 ctermbg=NONE
hi PreProc guifg=#c026a0 guibg=NONE ctermfg=127 ctermbg=NONE
hi Include guifg=#c8432f guibg=NONE ctermfg=166 ctermbg=NONE
hi Define guifg=#c8432f guibg=NONE ctermfg=166 ctermbg=NONE
hi Macro guifg=#c026a0 guibg=NONE ctermfg=127 ctermbg=NONE
hi Type guifg=#b7791f guibg=NONE ctermfg=136 ctermbg=NONE
hi StorageClass guifg=#b7791f guibg=NONE ctermfg=136 ctermbg=NONE
hi Structure guifg=#b7791f guibg=NONE ctermfg=136 ctermbg=NONE
hi Typedef guifg=#b7791f guibg=NONE ctermfg=136 ctermbg=NONE
hi Special guifg=#c2410c guibg=NONE ctermfg=130 ctermbg=NONE
hi SpecialChar guifg=#c2410c guibg=NONE ctermfg=130 ctermbg=NONE
hi Tag guifg=#c8432f guibg=NONE ctermfg=166 ctermbg=NONE
hi Delimiter guifg=#5a5b63 guibg=NONE ctermfg=59 ctermbg=NONE
hi SpecialComment guifg=#9395a0 guibg=NONE ctermfg=246 ctermbg=NONE gui=italic cterm=italic
hi Underlined guifg=#2563c9 guibg=NONE ctermfg=26 ctermbg=NONE gui=underline cterm=underline
hi Error guifg=#d32f2f guibg=NONE ctermfg=160 ctermbg=NONE
hi Todo guifg=#fbfbfd guibg=#b7791f ctermfg=231 ctermbg=136 gui=bold cterm=bold

" ── Diff / Git ──────────────────────────────────────────────────────────────
hi DiffAdd guifg=#1a9e5a guibg=#f1f2f6 ctermfg=35 ctermbg=231
hi DiffChange guifg=#b7791f guibg=#f1f2f6 ctermfg=136 ctermbg=231
hi DiffDelete guifg=#d32f2f guibg=#f1f2f6 ctermfg=160 ctermbg=231
hi DiffText guifg=#1a1c24 guibg=#cfe0f5 ctermfg=234 ctermbg=189

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
hi DiagnosticError guifg=#d32f2f guibg=NONE ctermfg=160 ctermbg=NONE
hi DiagnosticWarn guifg=#b7791f guibg=NONE ctermfg=136 ctermbg=NONE
hi DiagnosticInfo guifg=#0e7490 guibg=NONE ctermfg=30 ctermbg=NONE
hi DiagnosticHint guifg=#9395a0 guibg=NONE ctermfg=246 ctermbg=NONE
