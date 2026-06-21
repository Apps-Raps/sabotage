import { rgbFloat } from "../lib/color.mjs";

export const meta = { app: "terminalapp", name: "Terminal.app", category: "terminal", ext: "terminal" };

// macOS .terminal colors are NSKeyedArchiver-encoded NSColor blobs, base64'd
// inside a plist <data>. We build the inner archive as an XML plist (which
// NSKeyedUnarchiver also accepts) and base64-encode it.
function nsColor(c) {
  const { r, g, b } = rgbFloat(c);
  const nsrgb = Buffer.from(`${r} ${g} ${b}\0`, "latin1").toString("base64");
  const inner = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
\t<key>$archiver</key>
\t<string>NSKeyedArchiver</string>
\t<key>$objects</key>
\t<array>
\t\t<string>$null</string>
\t\t<dict>
\t\t\t<key>$class</key>
\t\t\t<dict><key>CF$UID</key><integer>2</integer></dict>
\t\t\t<key>NSColorSpace</key>
\t\t\t<integer>1</integer>
\t\t\t<key>NSRGB</key>
\t\t\t<data>${nsrgb}</data>
\t\t</dict>
\t\t<dict>
\t\t\t<key>$classes</key>
\t\t\t<array><string>NSColor</string><string>NSObject</string></array>
\t\t\t<key>$classname</key>
\t\t\t<string>NSColor</string>
\t\t</dict>
\t</array>
\t<key>$top</key>
\t<dict><key>root</key><dict><key>CF$UID</key><integer>1</integer></dict></dict>
\t<key>$version</key>
\t<integer>100000</integer>
</dict>
</plist>`;
  return Buffer.from(inner, "utf8").toString("base64");
}

export default function terminalapp(v, m) {
  const { ui: u, ansi: a } = v;
  const name = `${m.name === "Terminal.app" ? "Sabotage" : m.name} ${v.appearance === "dark" ? "Dark" : "Light"}`;
  const entry = (key, c) => `\t<key>${key}</key>\n\t<data>\n\t${nsColor(c)}\n\t</data>`;
  const rows = [
    entry("ANSIBlackColor", a.black), entry("ANSIRedColor", a.red), entry("ANSIGreenColor", a.green),
    entry("ANSIYellowColor", a.yellow), entry("ANSIBlueColor", a.blue), entry("ANSIMagentaColor", a.magenta),
    entry("ANSICyanColor", a.cyan), entry("ANSIWhiteColor", a.white),
    entry("ANSIBrightBlackColor", a.brightBlack), entry("ANSIBrightRedColor", a.brightRed),
    entry("ANSIBrightGreenColor", a.brightGreen), entry("ANSIBrightYellowColor", a.brightYellow),
    entry("ANSIBrightBlueColor", a.brightBlue), entry("ANSIBrightMagentaColor", a.brightMagenta),
    entry("ANSIBrightCyanColor", a.brightCyan), entry("ANSIBrightWhiteColor", a.brightWhite),
    entry("BackgroundColor", u.bg), entry("TextColor", u.fg), entry("BoldTextColor", u.fg),
    entry("CursorColor", u.cursor), entry("SelectionColor", u.selection),
  ].join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
\t<key>name</key>
\t<string>${name}</string>
\t<key>type</key>
\t<string>Window Settings</string>
\t<key>ProfileCurrentVersion</key>
\t<real>2.06</real>
${rows}
</dict>
</plist>
`;
}
