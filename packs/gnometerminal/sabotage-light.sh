#!/usr/bin/env bash
# Sabotage — Sabotage Light
# Creates a GNOME Terminal profile and applies the Sabotage palette.
# Requires: dconf, uuidgen.  Run:  bash sabotage-light.sh
set -euo pipefail

PROFILE_NAME="Sabotage Light"
BASE="/org/gnome/terminal/legacy/profiles:"
PROFILE_ID="$(uuidgen)"

existing="$(dconf read $BASE/list 2>/dev/null || true)"
if [ -z "$existing" ] || [ "$existing" = "@as []" ]; then
  dconf write $BASE/list "['$PROFILE_ID']"
else
  dconf write $BASE/list "${existing%]*}, '$PROFILE_ID']"
fi

P="$BASE/:$PROFILE_ID"
dconf write "$P/visible-name"            "'$PROFILE_NAME'"
dconf write "$P/use-theme-colors"        "false"
dconf write "$P/use-theme-transparency"  "false"
dconf write "$P/bold-color-same-as-fg"   "true"
dconf write "$P/foreground-color"        "'#1a1c24'"
dconf write "$P/background-color"         "'#fbfbfd'"
dconf write "$P/bold-color"              "'#1a1c24'"
dconf write "$P/cursor-colors-set"       "true"
dconf write "$P/cursor-background-color" "'#dd5040'"
dconf write "$P/cursor-foreground-color" "'#fbfbfd'"
dconf write "$P/highlight-colors-set"    "true"
dconf write "$P/highlight-background-color" "'#cfe0f5'"
dconf write "$P/highlight-foreground-color" "'#1a1c24'"
dconf write "$P/palette" "['#1a1c24', '#d32f2f', '#1a9e5a', '#b7791f', '#2563c9', '#7c3aed', '#0e7490', '#c8cad2', '#5a5b63', '#e14b4b', '#1fb368', '#cc8f1e', '#3b77e0', '#8b5cf6', '#1395b8', '#fbfbfd']"

echo "✓ Created GNOME Terminal profile: $PROFILE_NAME"
echo "  Select it in Preferences, or set it as default."
