#!/usr/bin/env node
// docs.mjs — write bilingual (EN/PT) install docs to docs/<id>.json.
// The website fetches these and renders the active language.
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS = join(__dirname, "..", "docs");
mkdirSync(DOCS, { recursive: true });

// Each entry: { en, pt } markdown. Keep it concise and accurate.
const D = {
  vscode: {
    en: `## Installation
The download is a complete VS Code color theme file.

1. Download \`sabotage-dark.json\` (and/or the light variant).
2. Create a local extension folder, e.g. \`~/.vscode/extensions/sabotage/themes/\`, and drop the file inside.
3. Add a \`package.json\` next to \`themes/\`:
\`\`\`json
{ "name": "sabotage", "version": "1.0.0", "engines": { "vscode": "*" },
  "contributes": { "themes": [
    { "label": "Sabotage Dark", "uiTheme": "vs-dark", "path": "./themes/sabotage-dark.json" }
  ] } }
\`\`\`
4. Reload VS Code, then run **Preferences: Color Theme** and pick **Sabotage Dark**.`,
    pt: `## Instalação
O download é um arquivo de tema de cores completo do VS Code.

1. Baixe \`sabotage-dark.json\` (e/ou a variante clara).
2. Crie uma pasta de extensão local, ex. \`~/.vscode/extensions/sabotage/themes/\`, e coloque o arquivo dentro.
3. Adicione um \`package.json\` ao lado de \`themes/\`:
\`\`\`json
{ "name": "sabotage", "version": "1.0.0", "engines": { "vscode": "*" },
  "contributes": { "themes": [
    { "label": "Sabotage Dark", "uiTheme": "vs-dark", "path": "./themes/sabotage-dark.json" }
  ] } }
\`\`\`
4. Recarregue o VS Code, rode **Preferences: Color Theme** e escolha **Sabotage Dark**.`,
  },
  sublime: {
    en: `## Installation
1. Download \`sabotage-dark.sublime-color-scheme\`.
2. In Sublime Text, open **Preferences → Browse Packages…** and put the file in the \`User\` folder.
3. Open **Preferences → Select Color Scheme…** and choose **Sabotage Dark**.`,
    pt: `## Instalação
1. Baixe \`sabotage-dark.sublime-color-scheme\`.
2. No Sublime Text, abra **Preferences → Browse Packages…** e coloque o arquivo na pasta \`User\`.
3. Abra **Preferences → Select Color Scheme…** e escolha **Sabotage Dark**.`,
  },
  jetbrains: {
    en: `## Installation
Works in IntelliJ IDEA, PyCharm, WebStorm, and the rest of the JetBrains IDEs.

1. Download \`sabotage-dark.icls\`.
2. Go to **Settings → Editor → Color Scheme**, click the gear icon → **Import Scheme…** and select the file.
3. Pick **Sabotage Dark** from the scheme dropdown.`,
    pt: `## Instalação
Funciona no IntelliJ IDEA, PyCharm, WebStorm e demais IDEs JetBrains.

1. Baixe \`sabotage-dark.icls\`.
2. Vá em **Settings → Editor → Color Scheme**, clique na engrenagem → **Import Scheme…** e selecione o arquivo.
3. Escolha **Sabotage Dark** na lista de esquemas.`,
  },
  vim: {
    en: `## Installation
Single file with both GUI (truecolor) and 256-color terminal support.

1. Download \`sabotage-dark.vim\`.
2. Copy it to \`~/.vim/colors/\` (Vim) or \`~/.config/nvim/colors/\` (Neovim).
3. Add to your config:
\`\`\`vim
set termguicolors
colorscheme sabotage_dark
\`\`\``,
    pt: `## Instalação
Arquivo único com suporte a GUI (truecolor) e terminais de 256 cores.

1. Baixe \`sabotage-dark.vim\`.
2. Copie para \`~/.vim/colors/\` (Vim) ou \`~/.config/nvim/colors/\` (Neovim).
3. Adicione à sua config:
\`\`\`vim
set termguicolors
colorscheme sabotage_dark
\`\`\``,
  },
  obsidian: {
    en: `## Installation
1. Download \`sabotage-dark.css\`.
2. Put it in your vault under \`.obsidian/snippets/\`.
3. Enable it in **Settings → Appearance → CSS snippets**. The variables track Obsidian's dark/light mode.`,
    pt: `## Instalação
1. Baixe \`sabotage-dark.css\`.
2. Coloque no seu vault em \`.obsidian/snippets/\`.
3. Ative em **Settings → Appearance → CSS snippets**. As variáveis acompanham o modo claro/escuro do Obsidian.`,
  },
  notepadpp: {
    en: `## Installation
1. Download \`sabotage-dark.xml\`.
2. Copy it to \`%APPDATA%\\Notepad++\\themes\\\`.
3. Restart Notepad++, open **Settings → Style Configurator…**, and select **sabotage-dark**.`,
    pt: `## Instalação
1. Baixe \`sabotage-dark.xml\`.
2. Copie para \`%APPDATA%\\Notepad++\\themes\\\`.
3. Reinicie o Notepad++, abra **Settings → Style Configurator…** e selecione **sabotage-dark**.`,
  },
  iterm2: {
    en: `## Installation
1. Download \`sabotage-dark.itermcolors\`.
2. Open **iTerm2 → Settings → Profiles → Colors**.
3. Click **Color Presets… → Import…**, choose the file, then select **sabotage-dark** from the same menu.`,
    pt: `## Instalação
1. Baixe \`sabotage-dark.itermcolors\`.
2. Abra **iTerm2 → Settings → Profiles → Colors**.
3. Clique em **Color Presets… → Import…**, escolha o arquivo e selecione **sabotage-dark** no mesmo menu.`,
  },
  windowsterminal: {
    en: `## Installation
1. Open Windows Terminal → **Settings → Open JSON file**.
2. Copy the contents of \`sabotage-dark.json\` into the \`"schemes": [ ]\` array.
3. In a profile, set \`"colorScheme": "Sabotage Dark"\`.`,
    pt: `## Instalação
1. Abra o Windows Terminal → **Settings → Open JSON file**.
2. Copie o conteúdo de \`sabotage-dark.json\` para o array \`"schemes": [ ]\`.
3. Em um perfil, defina \`"colorScheme": "Sabotage Dark"\`.`,
  },
  alacritty: {
    en: `## Installation
1. Download \`sabotage-dark.toml\` to \`~/.config/alacritty/\`.
2. Import it from your \`alacritty.toml\`:
\`\`\`toml
[general]
import = ["~/.config/alacritty/sabotage-dark.toml"]
\`\`\``,
    pt: `## Instalação
1. Baixe \`sabotage-dark.toml\` para \`~/.config/alacritty/\`.
2. Importe a partir do seu \`alacritty.toml\`:
\`\`\`toml
[general]
import = ["~/.config/alacritty/sabotage-dark.toml"]
\`\`\``,
  },
  kitty: {
    en: `## Installation
1. Download \`sabotage-dark.conf\` to \`~/.config/kitty/\`.
2. Add to \`kitty.conf\`:
\`\`\`conf
include sabotage-dark.conf
\`\`\`
3. Reload with \`ctrl+shift+f5\`.`,
    pt: `## Instalação
1. Baixe \`sabotage-dark.conf\` para \`~/.config/kitty/\`.
2. Adicione ao \`kitty.conf\`:
\`\`\`conf
include sabotage-dark.conf
\`\`\`
3. Recarregue com \`ctrl+shift+f5\`.`,
  },
  ghostty: {
    en: `## Installation
1. Download the file \`sabotage-dark\` (no extension).
2. Copy it to \`$XDG_CONFIG_HOME/ghostty/themes/Sabotage-dark\`.
3. In your Ghostty config set:
\`\`\`
theme = Sabotage-dark
\`\`\``,
    pt: `## Instalação
1. Baixe o arquivo \`sabotage-dark\` (sem extensão).
2. Copie para \`$XDG_CONFIG_HOME/ghostty/themes/Sabotage-dark\`.
3. Na config do Ghostty defina:
\`\`\`
theme = Sabotage-dark
\`\`\``,
  },
  warp: {
    en: `## Installation
1. Download \`sabotage-dark.yaml\`.
2. Copy it to \`~/.warp/themes/\`.
3. Open **Settings → Appearance → Themes** and select **Sabotage Dark**.`,
    pt: `## Instalação
1. Baixe \`sabotage-dark.yaml\`.
2. Copie para \`~/.warp/themes/\`.
3. Abra **Settings → Appearance → Themes** e selecione **Sabotage Dark**.`,
  },
  hyper: {
    en: `## Installation
1. Download \`sabotage-dark.js\`.
2. Open \`~/.hyper.js\` and merge the exported \`config\` color keys (foregroundColor, backgroundColor, colors, …) into your own \`config\` object.
3. Save — Hyper reloads automatically.`,
    pt: `## Instalação
1. Baixe \`sabotage-dark.js\`.
2. Abra \`~/.hyper.js\` e mescle as chaves de cor do \`config\` exportado (foregroundColor, backgroundColor, colors, …) no seu objeto \`config\`.
3. Salve — o Hyper recarrega sozinho.`,
  },
  tmux: {
    en: `## Installation
1. Download \`sabotage-dark.conf\` to \`~/.tmux/\`.
2. Add to \`~/.tmux.conf\`:
\`\`\`tmux
source-file ~/.tmux/sabotage-dark.conf
\`\`\`
3. Reload with \`tmux source-file ~/.tmux.conf\`.`,
    pt: `## Instalação
1. Baixe \`sabotage-dark.conf\` para \`~/.tmux/\`.
2. Adicione ao \`~/.tmux.conf\`:
\`\`\`tmux
source-file ~/.tmux/sabotage-dark.conf
\`\`\`
3. Recarregue com \`tmux source-file ~/.tmux.conf\`.`,
  },
  zsh: {
    en: `## Installation
Includes a truecolor \`LS_COLORS\` set and an optional minimal prompt.

1. Download \`sabotage-dark.zsh\` to \`~/.config/zsh/\`.
2. Add to \`~/.zshrc\`:
\`\`\`zsh
source ~/.config/zsh/sabotage-dark.zsh
\`\`\``,
    pt: `## Instalação
Inclui um conjunto \`LS_COLORS\` truecolor e um prompt mínimo opcional.

1. Baixe \`sabotage-dark.zsh\` para \`~/.config/zsh/\`.
2. Adicione ao \`~/.zshrc\`:
\`\`\`zsh
source ~/.config/zsh/sabotage-dark.zsh
\`\`\``,
  },
  slack: {
    en: `## Installation
1. Copy the theme string (8 comma-separated colors) using the **Copy** button.
2. In Slack open **Preferences → Themes**, scroll to the bottom and click **Create a custom theme**.
3. Paste the string into the **copy & paste** box.`,
    pt: `## Instalação
1. Copie a string do tema (8 cores separadas por vírgula) com o botão **Copiar**.
2. No Slack abra **Preferences → Themes**, role até o fim e clique em **Create a custom theme**.
3. Cole a string no campo **copy & paste**.`,
  },
  beeper: {
    en: `## Installation
For the **Beeper** desktop app (Beeper 4.x).

1. Download \`sabotage-dark.css\` (and/or the light variant).
2. Open **Settings → Appearance → Custom CSS**.
3. Paste the file contents into the Custom CSS box and apply. Reopen a chat to see it take effect.`,
    pt: `## Instalação
Para o app desktop do **Beeper** (Beeper 4.x).

1. Baixe \`sabotage-dark.css\` (e/ou a variante clara).
2. Abra **Settings → Appearance → Custom CSS**.
3. Cole o conteúdo do arquivo na caixa de Custom CSS e aplique. Reabra uma conversa para ver o efeito.`,
  },
  discord: {
    en: `## Installation
Requires **BetterDiscord** (or a compatible client mod like Vencord).

1. Download \`sabotage-dark.theme.css\`.
2. Open **Settings → Themes → Open Themes Folder** and drop the file in.
3. Toggle **Sabotage Dark** on.`,
    pt: `## Instalação
Requer o **BetterDiscord** (ou um mod compatível como o Vencord).

1. Baixe \`sabotage-dark.theme.css\`.
2. Abra **Settings → Themes → Open Themes Folder** e coloque o arquivo dentro.
3. Ative o **Sabotage Dark**.`,
  },
  zed: {
    en: `## Installation
1. Download \`sabotage-dark.json\`.
2. Copy it to \`~/.config/zed/themes/\`.
3. Open the command palette → **theme selector** and pick **Sabotage**.`,
    pt: `## Instalação
1. Baixe \`sabotage-dark.json\`.
2. Copie para \`~/.config/zed/themes/\`.
3. Abra a paleta de comandos → **theme selector** e escolha **Sabotage**.`,
  },
  wezterm: {
    en: `## Installation
1. Download \`sabotage-dark.toml\` to \`~/.config/wezterm/colors/\`.
2. In \`wezterm.lua\`:
\`\`\`lua
config.color_scheme = "Sabotage Dark"
\`\`\``,
    pt: `## Instalação
1. Baixe \`sabotage-dark.toml\` para \`~/.config/wezterm/colors/\`.
2. No \`wezterm.lua\`:
\`\`\`lua
config.color_scheme = "Sabotage Dark"
\`\`\``,
  },
  helix: {
    en: `## Installation
1. Download \`sabotage-dark.toml\` to \`~/.config/helix/themes/\`.
2. In \`~/.config/helix/config.toml\`:
\`\`\`toml
theme = "sabotage-dark"
\`\`\``,
    pt: `## Instalação
1. Baixe \`sabotage-dark.toml\` para \`~/.config/helix/themes/\`.
2. Em \`~/.config/helix/config.toml\`:
\`\`\`toml
theme = "sabotage-dark"
\`\`\``,
  },
  terminalapp: {
    en: `## Installation
1. Download \`sabotage-dark.terminal\` (it's a macOS Terminal profile).
2. Double-click it, or open **Terminal → Settings → Profiles**, click the **⋮ → Import…** menu and choose the file.
3. Select **Sabotage** in the profile list and click **Default** to make it your default.`,
    pt: `## Instalação
1. Baixe \`sabotage-dark.terminal\` (é um perfil do Terminal do macOS).
2. Dê dois cliques nele, ou abra **Terminal → Settings → Profiles**, use o menu **⋮ → Import…** e escolha o arquivo.
3. Selecione **Sabotage** na lista de perfis e clique em **Default** para torná-lo padrão.`,
  },
  gnometerminal: {
    en: `## Installation
The download is a script that creates a GNOME Terminal profile via \`dconf\`.

1. Download \`sabotage-dark.sh\`.
2. Run it: \`bash sabotage-dark.sh\` (needs \`dconf\` and \`uuidgen\`).
3. Open **Preferences**, pick the new **Sabotage** profile, and set it as default if you like.`,
    pt: `## Instalação
O download é um script que cria um perfil do GNOME Terminal via \`dconf\`.

1. Baixe \`sabotage-dark.sh\`.
2. Execute: \`bash sabotage-dark.sh\` (requer \`dconf\` e \`uuidgen\`).
3. Abra as **Preferências**, escolha o novo perfil **Sabotage** e defina como padrão se quiser.`,
  },
  termux: {
    en: `## Installation
1. Download \`sabotage-dark.properties\`.
2. Save it as \`~/.termux/colors.properties\`:
\`\`\`sh
mkdir -p ~/.termux && cp sabotage-dark.properties ~/.termux/colors.properties
\`\`\`
3. Apply with \`termux-reload-settings\`.`,
    pt: `## Instalação
1. Baixe \`sabotage-dark.properties\`.
2. Salve como \`~/.termux/colors.properties\`:
\`\`\`sh
mkdir -p ~/.termux && cp sabotage-dark.properties ~/.termux/colors.properties
\`\`\`
3. Aplique com \`termux-reload-settings\`.`,
  },
  powershell: {
    en: `## Installation
Sabotage syntax colors for **PSReadLine** (PowerShell 7 or Windows PowerShell 5.1 + module).

1. Download \`sabotage-dark.ps1\` to your home folder.
2. Add to your \`$PROFILE\`:
\`\`\`powershell
. "$HOME\\sabotage-dark.ps1"
\`\`\`
3. Open a new session. Pair it with the Sabotage **Windows Terminal** scheme for a fully themed prompt.`,
    pt: `## Instalação
Cores de sintaxe Sabotage para o **PSReadLine** (PowerShell 7 ou Windows PowerShell 5.1 + módulo).

1. Baixe \`sabotage-dark.ps1\` para a sua pasta de usuário.
2. Adicione ao seu \`$PROFILE\`:
\`\`\`powershell
. "$HOME\\sabotage-dark.ps1"
\`\`\`
3. Abra uma nova sessão. Combine com o esquema do **Windows Terminal** para um prompt totalmente temático.`,
  },
  telegram: {
    en: `## Installation
For **Telegram Desktop**.

1. Download \`sabotage-dark.tdesktop-palette\`.
2. In Telegram go to **Settings → Chat Settings → Theme**, open the **⋮** menu and choose **Create new theme** (or import the palette).
3. Load the file and save. Undefined keys fall back to the default theme.`,
    pt: `## Instalação
Para o **Telegram Desktop**.

1. Baixe \`sabotage-dark.tdesktop-palette\`.
2. No Telegram vá em **Settings → Chat Settings → Theme**, abra o menu **⋮** e escolha **Create new theme** (ou importe a paleta).
3. Carregue o arquivo e salve. Chaves não definidas usam o tema padrão.`,
  },
  atom: {
    en: `## Installation
A syntax theme for Atom (works as a package or a pasted stylesheet).

1. Download \`sabotage-dark.less\`.
2. Quick way: open **Atom → Stylesheet…** and paste the contents.
3. As a package: create \`~/.atom/packages/sabotage-syntax/\` with a \`package.json\` and put this file under \`styles/\`, then enable it in **Settings → Themes → Syntax Theme**.`,
    pt: `## Instalação
Um tema de sintaxe para o Atom (funciona como pacote ou folha de estilo colada).

1. Baixe \`sabotage-dark.less\`.
2. Jeito rápido: abra **Atom → Stylesheet…** e cole o conteúdo.
3. Como pacote: crie \`~/.atom/packages/sabotage-syntax/\` com um \`package.json\` e coloque este arquivo em \`styles/\`, depois ative em **Settings → Themes → Syntax Theme**.`,
  },
  web: {
    en: `## Usage
Three exports for your own projects.

- \`sabotage.css\` — CSS custom properties (\`--sb-*\`). Light by default; set \`data-theme="dark"\` on \`<html>\`.
- \`sabotage.scss\` — flat \`$sb-*\` variables plus \`$sabotage-dark\` / \`$sabotage-light\` Sass maps.
- \`sabotage.tokens.json\` — W3C Design Tokens for tooling.

\`\`\`html
<link rel="stylesheet" href="sabotage.css">
<div style="background: var(--sb-bg); color: var(--sb-fg)">Hello</div>
\`\`\``,
    pt: `## Uso
Três exports para os seus projetos.

- \`sabotage.css\` — custom properties CSS (\`--sb-*\`). Claro por padrão; defina \`data-theme="dark"\` no \`<html>\`.
- \`sabotage.scss\` — variáveis \`$sb-*\` planas e mapas Sass \`$sabotage-dark\` / \`$sabotage-light\`.
- \`sabotage.tokens.json\` — W3C Design Tokens para ferramentas.

\`\`\`html
<link rel="stylesheet" href="sabotage.css">
<div style="background: var(--sb-bg); color: var(--sb-fg)">Olá</div>
\`\`\``,
  },
};

let n = 0;
for (const [id, content] of Object.entries(D)) {
  writeFileSync(join(DOCS, `${id}.json`), JSON.stringify(content, null, 2) + "\n");
  n++;
}
console.log(`\x1b[32m✓ wrote ${n} bilingual docs to docs/\x1b[0m`);
