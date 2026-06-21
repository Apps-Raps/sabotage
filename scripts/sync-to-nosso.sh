#!/usr/bin/env bash
# sync-to-nosso.sh — copy the deployable static site from this public repo into
# the nosso monorepo so it ships to sabotage.nosso.top via the existing pipeline.
#
# Usage: scripts/sync-to-nosso.sh [DEST]
#   DEST defaults to /root/nosso/projects/sites/sabotage
#
# It rebuilds packs/ + docs/ first, then rsyncs only what nginx needs to serve.
set -euo pipefail

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST="${1:-/root/nosso/projects/sites/sabotage}"

echo "▶ Building from spec…"
( cd "$SRC" && node scripts/build.mjs && node scripts/docs.mjs && node scripts/verify.mjs )

echo "▶ Syncing site → $DEST"
mkdir -p "$DEST"
rsync -a --delete \
  --include="index.html" --include="app.html" --include="spec.html" \
  --include="Dockerfile" --include="nginx.conf" --include="site.json" --include="preview.jpg" \
  --include="css/***" --include="js/***" --include="assets/***" \
  --include="packs/***" --include="docs/***" \
  --exclude="*" \
  "$SRC"/ "$DEST"/

echo "✓ Synced. Commit the monorepo and open a PR to deploy:"
echo "    cd $(dirname "$(dirname "$DEST")") && git add sites/sabotage && git commit && gh pr create"
