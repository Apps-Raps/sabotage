import { rgbFloat } from "../lib/color.mjs";

export const meta = { app: "iterm2", name: "iTerm2", category: "terminal", ext: "itermcolors" };

export default function iterm2(v, m) {
  const { ui: u, ansi: a } = v;
  const colorDict = (key, c) => {
    const { r, g, b } = rgbFloat(c);
    return `	<key>${key}</key>
	<dict>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Red Component</key>
		<real>${r}</real>
		<key>Green Component</key>
		<real>${g}</real>
		<key>Blue Component</key>
		<real>${b}</real>
		<key>Alpha Component</key>
		<real>1</real>
	</dict>`;
  };

  const ansiOrder = [
    a.black, a.red, a.green, a.yellow, a.blue, a.magenta, a.cyan, a.white,
    a.brightBlack, a.brightRed, a.brightGreen, a.brightYellow, a.brightBlue, a.brightMagenta, a.brightCyan, a.brightWhite,
  ];

  const blocks = [];
  ansiOrder.forEach((c, i) => blocks.push(colorDict(`Ansi ${i} Color`, c)));
  blocks.push(colorDict("Background Color", u.bg));
  blocks.push(colorDict("Foreground Color", u.fg));
  blocks.push(colorDict("Bold Color", u.fg));
  blocks.push(colorDict("Cursor Color", u.cursor));
  blocks.push(colorDict("Cursor Text Color", u.bg));
  blocks.push(colorDict("Selection Color", u.selection));
  blocks.push(colorDict("Selected Text Color", u.fg));
  blocks.push(colorDict("Link Color", u.accent));
  blocks.push(colorDict("Cursor Guide Color", u.bgHl));

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
${blocks.join("\n")}
</dict>
</plist>
`;
}
