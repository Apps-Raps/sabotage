import { hexNoHash } from "../lib/color.mjs";

export const meta = { app: "jetbrains", name: "JetBrains", category: "editor", ext: "icls" };

export default function jetbrains(v, m) {
  const { ui: u, ansi: a, syntax: s } = v;
  const dark = v.appearance === "dark";
  const name = `${m.name} ${dark ? "Dark" : "Light"}`;
  const parent = dark ? "Darcula" : "Default";
  const h = hexNoHash;

  const color = (n, val) => `    <option name="${n}" value="${h(val)}" />`;
  // attribute block: TEXT-style option with FOREGROUND (+ optional BACKGROUND / font)
  const attr = (n, fg, opts = {}) => {
    const lines = [`    <option name="${n}">`, `      <value>`];
    if (fg) lines.push(`        <option name="FOREGROUND" value="${h(fg)}" />`);
    if (opts.bg) lines.push(`        <option name="BACKGROUND" value="${h(opts.bg)}" />`);
    if (opts.fontType !== undefined) lines.push(`        <option name="FONT_TYPE" value="${opts.fontType}" />`);
    lines.push(`      </value>`, `    </option>`);
    return lines.join("\n");
  };

  return `<scheme name="${name}" version="142" parent_scheme="${parent}">
  <metaInfo>
    <property name="created">Sabotage</property>
    <property name="ide">idea</property>
  </metaInfo>
  <colors>
${color("CARET_COLOR", u.cursor)}
${color("CARET_ROW_COLOR", u.bgHl)}
${color("CONSOLE_BACKGROUND_KEY", u.bg)}
${color("GUTTER_BACKGROUND", u.bgAlt)}
${color("INDENT_GUIDE", u.border)}
${color("LINE_NUMBERS_COLOR", u.comment)}
${color("LINE_NUMBER_ON_CARET_ROW_COLOR", u.fg)}
${color("SELECTION_BACKGROUND", u.selection)}
${color("SELECTION_FOREGROUND", u.fg)}
${color("TEARLINE_COLOR", u.border)}
${color("WHITESPACES", u.border)}
  </colors>
  <attributes>
${attr("TEXT", u.fg, { bg: u.bg })}
${attr("DEFAULT_KEYWORD", s.keyword, { fontType: 1 })}
${attr("DEFAULT_STRING", s.string)}
${attr("DEFAULT_VALID_STRING_ESCAPE", s.escape)}
${attr("DEFAULT_LINE_COMMENT", s.comment, { fontType: 2 })}
${attr("DEFAULT_BLOCK_COMMENT", s.comment, { fontType: 2 })}
${attr("DEFAULT_DOC_COMMENT", s.comment, { fontType: 2 })}
${attr("DEFAULT_NUMBER", s.number)}
${attr("DEFAULT_CONSTANT", s.constant)}
${attr("DEFAULT_FUNCTION_DECLARATION", s.function)}
${attr("DEFAULT_FUNCTION_CALL", s.function)}
${attr("DEFAULT_CLASS_NAME", s.type)}
${attr("DEFAULT_CLASS_REFERENCE", s.type)}
${attr("DEFAULT_INTERFACE_NAME", s.type)}
${attr("DEFAULT_INSTANCE_FIELD", s.property)}
${attr("DEFAULT_STATIC_FIELD", s.property)}
${attr("DEFAULT_LOCAL_VARIABLE", s.variable)}
${attr("DEFAULT_PARAMETER", s.variable)}
${attr("DEFAULT_IDENTIFIER", s.variable)}
${attr("DEFAULT_OPERATION_SIGN", s.operator)}
${attr("DEFAULT_BRACES", s.punctuation)}
${attr("DEFAULT_BRACKETS", s.punctuation)}
${attr("DEFAULT_COMMA", s.punctuation)}
${attr("DEFAULT_DOT", s.punctuation)}
${attr("DEFAULT_SEMICOLON", s.punctuation)}
${attr("DEFAULT_TAG", s.tag)}
${attr("DEFAULT_ATTRIBUTE", s.attribute)}
${attr("BAD_CHARACTER", s.invalid)}
${attr("CONSOLE_BLACK_OUTPUT", a.black)}
${attr("CONSOLE_RED_OUTPUT", a.red)}
${attr("CONSOLE_GREEN_OUTPUT", a.green)}
${attr("CONSOLE_YELLOW_OUTPUT", a.yellow)}
${attr("CONSOLE_BLUE_OUTPUT", a.blue)}
${attr("CONSOLE_MAGENTA_OUTPUT", a.magenta)}
${attr("CONSOLE_CYAN_OUTPUT", a.cyan)}
${attr("CONSOLE_GRAY_OUTPUT", a.white)}
${attr("CONSOLE_DARKGRAY_OUTPUT", a.brightBlack)}
${attr("CONSOLE_RED_BRIGHT_OUTPUT", a.brightRed)}
${attr("CONSOLE_GREEN_BRIGHT_OUTPUT", a.brightGreen)}
${attr("CONSOLE_YELLOW_BRIGHT_OUTPUT", a.brightYellow)}
${attr("CONSOLE_BLUE_BRIGHT_OUTPUT", a.brightBlue)}
${attr("CONSOLE_MAGENTA_BRIGHT_OUTPUT", a.brightMagenta)}
${attr("CONSOLE_CYAN_BRIGHT_OUTPUT", a.brightCyan)}
${attr("CONSOLE_WHITE_OUTPUT", a.brightWhite)}
  </attributes>
</scheme>
`;
}
