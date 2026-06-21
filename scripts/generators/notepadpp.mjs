import { hexNoHashUpper } from "../lib/color.mjs";

export const meta = { app: "notepadpp", name: "Notepad++", category: "editor", ext: "xml" };

export default function notepadpp(v, m) {
  const { ui: u, syntax: s } = v;
  const H = hexNoHashUpper;
  const dark = v.appearance === "dark";

  const widget = (name, fg, bg) =>
    `        <WidgetStyle name="${name}" styleID="0"${fg ? ` fgColor="${H(fg)}"` : ""}${bg ? ` bgColor="${H(bg)}"` : ""} />`;
  const words = (name, id, fg, bg, fontStyle) =>
    `        <WordsStyle name="${name}" styleID="${id}" fgColor="${H(fg)}" bgColor="${H(bg)}" fontName="" fontStyle="${fontStyle ?? 0}" fontSize="" />`;

  return `<?xml version="1.0" encoding="UTF-8" ?>
<NotepadPlus>
    <LexerStyles>
        <LexerType name="searchResult" desc="Search result" excluded="no">
            <WordsStyle name="Default" styleID="41" fgColor="${H(u.fg)}" bgColor="${H(u.bg)}" />
        </LexerType>
    </LexerStyles>
    <GlobalStyles>
${widget("Global override", u.fg, u.bg)}
${widget("Default Style", u.fg, u.bg)}
${widget("Indent guideline style", u.border, u.bg)}
${widget("Brace highlight style", u.accent, u.bgHl)}
${widget("Bad brace colour", s.invalid, u.bg)}
${widget("Current line background colour", null, u.bgHl)}
${widget("Selected text colour", null, u.selection)}
${widget("Caret colour", u.cursor, null)}
${widget("Edge colour", u.border, null)}
${widget("Line number margin", u.comment, u.bgAlt)}
${widget("Fold", u.comment, u.bgAlt)}
${widget("Fold active", u.accent, u.bgAlt)}
${widget("Fold margin", u.bgAlt, u.bg)}
${widget("White space symbol", u.border, u.bg)}
${widget("Smart HighLighting", null, u.bgHl)}
${widget("Mark Style 1", null, u.selection)}
${widget("URL hovered", u.accent, null)}
${words("Comment", 1, s.comment, u.bg, 2)}
${words("Number", 2, s.number, u.bg)}
${words("Keyword", 3, s.keyword, u.bg, 1)}
${words("String", 4, s.string, u.bg)}
${words("Operator", 5, s.operator, u.bg)}
${words("Identifier", 6, s.variable, u.bg)}
${words("Type", 7, s.type, u.bg)}
${words("Function", 8, s.function, u.bg)}
    </GlobalStyles>
</NotepadPlus>
`;
}
