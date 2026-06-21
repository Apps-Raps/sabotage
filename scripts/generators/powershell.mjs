import { hex } from "../lib/color.mjs";

export const meta = { app: "powershell", name: "PowerShell", category: "shell", ext: "ps1" };

export default function powershell(v, m) {
  const { ui: u, syntax: s, extra: e } = v;
  return `# ${m.name} — ${v.appearance === "dark" ? "Dark" : "Light"}
# Sabotage syntax colors for PSReadLine. Add to your $PROFILE:
#   . "$HOME\\sabotage-${v.appearance}.ps1"
# Requires PSReadLine 2.0+ (ships with PowerShell 7 / Windows PowerShell 5.1 + module).

Set-PSReadLineOption -Colors @{
    Command            = '${hex(s.function)}'
    Comment            = '${hex(s.comment)}'
    ContinuationPrompt = '${hex(u.comment)}'
    Default            = '${hex(u.fg)}'
    Emphasis           = '${hex(u.accent)}'
    Error              = '${hex(e.error)}'
    Keyword            = '${hex(s.keyword)}'
    Member             = '${hex(s.property)}'
    Number             = '${hex(s.number)}'
    Operator           = '${hex(s.operator)}'
    Parameter          = '${hex(e.orange)}'
    String             = '${hex(s.string)}'
    Type               = '${hex(s.type)}'
    Variable           = '${hex(s.variable)}'
    InlinePrediction   = '${hex(u.comment)}'
    ListPrediction     = '${hex(u.accent)}'
    Selection          = "\`e[48;2;${parseInt(u.selection.slice(1,3),16)};${parseInt(u.selection.slice(3,5),16)};${parseInt(u.selection.slice(5,7),16)}m"
}

# Tip: pair with the Sabotage Windows Terminal scheme for a fully themed prompt.
`;
}
