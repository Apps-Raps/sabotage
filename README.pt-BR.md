<div align="center">

# Sabotage

**Um tema de cores quente e de alto contraste para toda plataforma.**
Construído em torno do destaque `#dd5040` — escuro e claro, gerado de uma única spec.

[**sabotage.nosso.top**](https://sabotage.nosso.top) · [Paleta](https://sabotage.nosso.top/spec.html) · [English](./README.md)

</div>

---

Sabotage é um tema de cores distribuído como **arquivos reais e instaláveis** para
21+ apps — editores, terminais, shells e clientes de chat — além de design tokens
para web. Cada integração é gerada de uma única fonte da verdade, então as cores
nunca divergem.

## Paleta

| Papel | Escuro | Claro |
|-------|--------|-------|
| Fundo | `#0D0E11` | `#FBFBFD` |
| Texto | `#E8E8EA` | `#1A1C24` |
| Comentário | `#5A5B63` | `#9395A0` |
| **Destaque** | `#dd5040` | `#dd5040` |
| Laranja | `#FF8A44` | `#C2410C` |
| Amarelo | `#FFD166` | `#B7791F` |
| Verde | `#2ECC71` | `#1A9E5A` |
| Ciano | `#4DD9FF` | `#0E7490` |
| Roxo | `#8B5CF6` | `#7C3AED` |
| Rosa | `#FF69B4` | `#C026A0` |

A especificação completa (papéis de UI, ANSI e sintaxe com hex/RGB/HSL) está em
[`spec/palette.json`](./spec/palette.json) e pode ser navegada em
[sabotage.nosso.top/spec.html](https://sabotage.nosso.top/spec.html).

## Integrações

**Editores** — VS Code · Sublime Text · JetBrains · Vim/Neovim · Zed · Helix · Obsidian · Notepad++
**Terminais** — iTerm2 · Windows Terminal · Alacritty · Kitty · Ghostty · WezTerm · Warp · Hyper
**Shell** — tmux · Zsh
**Chat** — Slack · Discord
**Web** — variáveis CSS · SCSS · design tokens W3C

Veja todas em [sabotage.nosso.top](https://sabotage.nosso.top), onde cada app tem
passos de instalação e copiar/baixar nas duas variantes. Os arquivos gerados ficam
em [`packs/`](./packs).

## Como funciona

```
spec/palette.json   ── fonte única da verdade (escuro + claro)
        │
   scripts/build.mjs ── gerador sem dependências
        │
   packs/<app>/sabotage-{dark,light}.<ext>   +   packs/manifest.json
```

Um `palette.json` define cada papel. Um pequeno gerador o transforma no formato
nativo de cada app usando um template minúsculo por app. Sem dependências de
runtime — só Node.

## Desenvolvimento

```bash
npm run build     # regenera packs/ + docs/ a partir da spec
npm run verify    # valida cada arquivo gerado (JSON, plist, TOML, XML, CSS)
npm run serve     # serve o site localmente na :8080
```

### Adicionar um app

1. Crie `scripts/generators/<app>.mjs` exportando `meta` e uma função padrão
   `(variant, meta) => string`. Use os papéis via `variant.ui`, `variant.ansi`,
   `variant.syntax` — nunca hex cru.
2. Rode `npm run build`. O app é detectado automaticamente e adicionado ao
   manifest, à grade do site e ao `packs/`.
3. Adicione as instruções em `scripts/docs.mjs`.

## Estrutura

```
spec/         palette.json (+ JSON schema)
scripts/      build.mjs · verify.mjs · docs.mjs · lib/color.mjs · generators/*
packs/        arquivos de tema gerados + manifest.json + tokens web
docs/         instruções de instalação bilíngues (JSON, EN/PT)
index.html app.html spec.html · css/ · js/   o site
```

## Licença

[MIT](./LICENSE) © nosso.top
