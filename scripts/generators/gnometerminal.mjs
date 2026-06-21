import { hex } from "../lib/color.mjs";

export const meta = { app: "gnometerminal", name: "GNOME Terminal", category: "terminal", ext: "sh" };

export default function gnometerminal(v, m) {
  const { ui: u, ansi: a } = v;
  const name = `Sabotage ${v.appearance === "dark" ? "Dark" : "Light"}`;
  const palette = [
    a.black, a.red, a.green, a.yellow, a.blue, a.magenta, a.cyan, a.white,
    a.brightBlack, a.brightRed, a.brightGreen, a.brightYellow, a.brightBlue, a.brightMagenta, a.brightCyan, a.brightWhite,
  ].map((c) => `'${hex(c)}'`).join(", ");

  // $-vars below are bash, not JS — only \${...} is escaped to survive templating.
  return `#!/usr/bin/env bash
# ${m.name} — ${name}
# Creates a GNOME Terminal profile and applies the Sabotage palette.
# Requires: dconf, uuidgen.  Run:  bash sabotage-${v.appearance}.sh
set -euo pipefail

PROFILE_NAME="${name}"
BASE="/org/gnome/terminal/legacy/profiles:"
PROFILE_ID="$(uuidgen)"

existing="$(dconf read $BASE/list 2>/dev/null || true)"
if [ -z "$existing" ] || [ "$existing" = "@as []" ]; then
  dconf write $BASE/list "['$PROFILE_ID']"
else
  dconf write $BASE/list "\${existing%]*}, '$PROFILE_ID']"
fi

P="$BASE/:$PROFILE_ID"
dconf write "$P/visible-name"            "'$PROFILE_NAME'"
dconf write "$P/use-theme-colors"        "false"
dconf write "$P/use-theme-transparency"  "false"
dconf write "$P/bold-color-same-as-fg"   "true"
dconf write "$P/foreground-color"        "'${hex(u.fg)}'"
dconf write "$P/background-color"         "'${hex(u.bg)}'"
dconf write "$P/bold-color"              "'${hex(u.fg)}'"
dconf write "$P/cursor-colors-set"       "true"
dconf write "$P/cursor-background-color" "'${hex(u.cursor)}'"
dconf write "$P/cursor-foreground-color" "'${hex(u.bg)}'"
dconf write "$P/highlight-colors-set"    "true"
dconf write "$P/highlight-background-color" "'${hex(u.selection)}'"
dconf write "$P/highlight-foreground-color" "'${hex(u.fg)}'"
dconf write "$P/palette" "[${palette}]"

echo "✓ Created GNOME Terminal profile: $PROFILE_NAME"
echo "  Select it in Preferences, or set it as default."
`;
}
