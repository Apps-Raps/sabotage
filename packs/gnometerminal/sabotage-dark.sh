#!/usr/bin/env bash
# Sabotage — Sabotage Dark
# Creates a GNOME Terminal profile and applies the Sabotage palette.
# Requires: dconf, uuidgen.  Run:  bash sabotage-dark.sh
set -euo pipefail

PROFILE_NAME="Sabotage Dark"
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
dconf write "$P/foreground-color"        "'#e8e8ea'"
dconf write "$P/background-color"         "'#0d0e11'"
dconf write "$P/bold-color"              "'#e8e8ea'"
dconf write "$P/cursor-colors-set"       "true"
dconf write "$P/cursor-background-color" "'#dd5040'"
dconf write "$P/cursor-foreground-color" "'#0d0e11'"
dconf write "$P/highlight-colors-set"    "true"
dconf write "$P/highlight-background-color" "'#2a3a52'"
dconf write "$P/highlight-foreground-color" "'#e8e8ea'"
dconf write "$P/palette" "['#1a1c24', '#ff5555', '#2ecc71', '#ffd166', '#5b8def', '#8b5cf6', '#4dd9ff', '#e8e8ea', '#5a5b63', '#ff6e6e', '#54e08c', '#ffdd8a', '#7faaf5', '#a78bfa', '#7ae4ff', '#ffffff']"

echo "✓ Created GNOME Terminal profile: $PROFILE_NAME"
echo "  Select it in Preferences, or set it as default."
