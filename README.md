<div align="center">

# Sabotage

**One warm, high-contrast color theme for every platform.**
Built around the accent `#dd5040` — dark & light, generated from a single spec.

[**sabotage.nosso.top**](https://sabotage.nosso.top) · [Palette spec](https://sabotage.nosso.top/spec.html) · [Português](./README.pt-BR.md)

</div>

---

Sabotage is a color theme distributed as **real, installable files** for 21+ apps —
editors, terminals, shells, and chat clients — plus web design tokens. Every
integration is generated from one source of truth, so the colors never drift.

## Palette

| Role | Dark | Light |
|------|------|-------|
| Background | `#0D0E11` | `#FBFBFD` |
| Foreground | `#E8E8EA` | `#1A1C24` |
| Comment | `#5A5B63` | `#9395A0` |
| **Accent** | `#dd5040` | `#dd5040` |
| Orange | `#FF8A44` | `#C2410C` |
| Yellow | `#FFD166` | `#B7791F` |
| Green | `#2ECC71` | `#1A9E5A` |
| Cyan | `#4DD9FF` | `#0E7490` |
| Purple | `#8B5CF6` | `#7C3AED` |
| Pink | `#FF69B4` | `#C026A0` |

The full specification (UI, ANSI, and syntax roles with hex/RGB/HSL) lives in
[`spec/palette.json`](./spec/palette.json) and is browsable at
[sabotage.nosso.top/spec.html](https://sabotage.nosso.top/spec.html).

## Integrations

**Editors** — VS Code · Sublime Text · JetBrains · Vim/Neovim · Zed · Helix · Obsidian · Notepad++
**Terminals** — iTerm2 · Windows Terminal · Alacritty · Kitty · Ghostty · WezTerm · Warp · Hyper
**Shell** — tmux · Zsh
**Chat** — Slack · Discord
**Web** — CSS variables · SCSS · W3C design tokens

Browse them all at [sabotage.nosso.top](https://sabotage.nosso.top), where each app
has install steps and copy/download for both variants. Generated files live in
[`packs/`](./packs).

## How it works

```
spec/palette.json   ── single source of truth (dark + light)
        │
   scripts/build.mjs ── zero-dependency generator
        │
   packs/<app>/sabotage-{dark,light}.<ext>   +   packs/manifest.json
```

One `palette.json` defines every role. A small generator renders it into each
app's native format using one tiny template per app. There are no runtime
dependencies — just Node.

## Develop

```bash
npm run build     # regenerate packs/ + docs/ from the spec
npm run verify    # validate every generated file (JSON, plist, TOML, XML, CSS)
npm run serve     # serve the site locally on :8080
```

### Add an app

1. Create `scripts/generators/<app>.mjs` exporting `meta` and a default
   `(variant, meta) => string` function. Reference roles via `variant.ui`,
   `variant.ansi`, `variant.syntax` — never raw hex.
2. Run `npm run build`. The app is picked up automatically and added to the
   manifest, the website grid, and `packs/`.
3. Add install notes in `scripts/docs.mjs`.

## Structure

```
spec/         palette.json (+ JSON schema)
scripts/      build.mjs · verify.mjs · docs.mjs · lib/color.mjs · generators/*
packs/        generated theme files + manifest.json + web tokens
docs/         bilingual install instructions (JSON, EN/PT)
index.html app.html spec.html · css/ · js/   the website
```

## License

[MIT](./LICENSE) © nosso.top
