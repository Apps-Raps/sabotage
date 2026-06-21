import { hex, cterm256 } from "../lib/color.mjs";

export const meta = { app: "vim", name: "Vim / Neovim", category: "editor", ext: "vim" };

export default function vim(v, m) {
  const { ui: u, ansi: a, syntax: s } = v;
  const dark = v.appearance === "dark";
  const slug = `sabotage_${v.appearance}`;
  const NONE = "NONE";

  // hi <group> guifg=.. guibg=.. ctermfg=.. ctermbg=.. [gui=.. cterm=..]
  const hi = (group, { fg, bg, style } = {}) => {
    const parts = [`hi ${group}`];
    parts.push(`guifg=${fg ? hex(fg) : NONE}`);
    parts.push(`guibg=${bg ? hex(bg) : NONE}`);
    parts.push(`ctermfg=${fg ? cterm256(fg) : NONE}`);
    parts.push(`ctermbg=${bg ? cterm256(bg) : NONE}`);
    if (style) { parts.push(`gui=${style}`); parts.push(`cterm=${style}`); }
    return parts.join(" ");
  };

  return `" ${m.name} — ${dark ? "Dark" : "Light"}
" Generated from the Sabotage palette spec. Works in GUI (truecolor) and 256-color terminals.
set background=${v.appearance}
hi clear
if exists("syntax_on")
  syntax reset
endif
let g:colors_name = "${slug}"

" ── UI ──────────────────────────────────────────────────────────────────────
${hi("Normal", { fg: u.fg, bg: u.bg })}
${hi("NormalFloat", { fg: u.fg, bg: u.bgAlt })}
${hi("ColorColumn", { bg: u.bgHl })}
${hi("Cursor", { fg: u.bg, bg: u.cursor })}
${hi("CursorLine", { bg: u.bgHl })}
${hi("CursorLineNr", { fg: u.accent, style: "bold" })}
${hi("LineNr", { fg: u.comment })}
${hi("SignColumn", { bg: u.bg })}
${hi("VertSplit", { fg: u.border })}
${hi("WinSeparator", { fg: u.border })}
${hi("Folded", { fg: u.comment, bg: u.bgAlt })}
${hi("FoldColumn", { fg: u.comment })}
${hi("Visual", { bg: u.selection })}
${hi("Search", { fg: u.bg, bg: u.accent })}
${hi("IncSearch", { fg: u.bg, bg: v.extra.orange })}
${hi("MatchParen", { fg: u.accent, bg: u.bgHl, style: "bold" })}
${hi("Pmenu", { fg: u.fg, bg: u.bgAlt })}
${hi("PmenuSel", { fg: u.bg, bg: u.accent })}
${hi("PmenuSbar", { bg: u.bgAlt })}
${hi("PmenuThumb", { bg: u.comment })}
${hi("StatusLine", { fg: u.fg, bg: u.bgAlt })}
${hi("StatusLineNC", { fg: u.comment, bg: u.bgAlt })}
${hi("TabLine", { fg: u.comment, bg: u.bgAlt })}
${hi("TabLineSel", { fg: u.fg, bg: u.bg })}
${hi("TabLineFill", { bg: u.bgAlt })}
${hi("Title", { fg: u.accent, style: "bold" })}
${hi("Directory", { fg: a.blue })}
${hi("NonText", { fg: u.border })}
${hi("Whitespace", { fg: u.border })}
${hi("SpecialKey", { fg: u.border })}
${hi("ErrorMsg", { fg: v.extra.error })}
${hi("WarningMsg", { fg: v.extra.warning })}

" ── Syntax ──────────────────────────────────────────────────────────────────
${hi("Comment", { fg: s.comment, style: "italic" })}
${hi("Constant", { fg: s.constant })}
${hi("String", { fg: s.string })}
${hi("Character", { fg: s.string })}
${hi("Number", { fg: s.number })}
${hi("Boolean", { fg: s.constant })}
${hi("Float", { fg: s.number })}
${hi("Identifier", { fg: s.variable })}
${hi("Function", { fg: s.function })}
${hi("Statement", { fg: s.keyword })}
${hi("Conditional", { fg: s.keyword })}
${hi("Repeat", { fg: s.keyword })}
${hi("Label", { fg: s.keyword })}
${hi("Operator", { fg: s.operator })}
${hi("Keyword", { fg: s.keyword })}
${hi("Exception", { fg: s.keyword })}
${hi("PreProc", { fg: v.extra.pink })}
${hi("Include", { fg: s.keyword })}
${hi("Define", { fg: s.keyword })}
${hi("Macro", { fg: v.extra.pink })}
${hi("Type", { fg: s.type })}
${hi("StorageClass", { fg: s.type })}
${hi("Structure", { fg: s.type })}
${hi("Typedef", { fg: s.type })}
${hi("Special", { fg: s.escape })}
${hi("SpecialChar", { fg: s.escape })}
${hi("Tag", { fg: s.tag })}
${hi("Delimiter", { fg: s.punctuation })}
${hi("SpecialComment", { fg: s.comment, style: "italic" })}
${hi("Underlined", { fg: a.blue, style: "underline" })}
${hi("Error", { fg: v.extra.error })}
${hi("Todo", { fg: u.bg, bg: v.extra.warning, style: "bold" })}

" ── Diff / Git ──────────────────────────────────────────────────────────────
${hi("DiffAdd", { fg: v.extra.success, bg: u.bgAlt })}
${hi("DiffChange", { fg: v.extra.warning, bg: u.bgAlt })}
${hi("DiffDelete", { fg: v.extra.error, bg: u.bgAlt })}
${hi("DiffText", { fg: u.fg, bg: u.selection })}

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
${hi("DiagnosticError", { fg: v.extra.error })}
${hi("DiagnosticWarn", { fg: v.extra.warning })}
${hi("DiagnosticInfo", { fg: v.extra.info })}
${hi("DiagnosticHint", { fg: u.comment })}
`;
}
