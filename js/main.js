/* Sabotage site — manifest-driven UI, EN/PT toggle, dark/light, copy & download. */
(() => {
  "use strict";

  const LANGS = ["en", "pt"];
  const CAT_LABELS = {
    editor: { en: "Editors", pt: "Editores" },
    terminal: { en: "Terminals", pt: "Terminais" },
    shell: { en: "Shell", pt: "Shell" },
    chat: { en: "Chat", pt: "Chat" },
    web: { en: "Web", pt: "Web" },
  };
  const T = {
    copy: { en: "Copy", pt: "Copiar" },
    copied: { en: "Copied!", pt: "Copiado!" },
    download: { en: "Download", pt: "Baixar" },
    install: { en: "Installation", pt: "Instalação" },
    back: { en: "All themes", pt: "Todos os temas" },
    all: { en: "All", pt: "Todos" },
    preview: { en: "Preview", pt: "Prévia" },
    genericInstall: {
      en: "Copy the snippet above or download the file, then load it in the app's theme/color settings.",
      pt: "Copie o trecho acima ou baixe o arquivo e carregue-o nas configurações de tema/cor do app.",
    },
  };

  let lang = detectLang();
  let theme = localStorage.getItem("sb-theme") || "dark";

  // ── i18n ────────────────────────────────────────────────────────────────
  function detectLang() {
    const saved = localStorage.getItem("sb-lang");
    if (saved && LANGS.includes(saved)) return saved;
    return (navigator.language || "en").toLowerCase().startsWith("pt") ? "pt" : "en";
  }
  function t(key) { return (T[key] || {})[lang] || key; }

  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-en],[data-pt]").forEach((el) => {
      const val = el.getAttribute("data-" + lang);
      if (val == null) return;
      if (val.includes("<")) el.innerHTML = val.replace(/&#10;/g, " ");
      else el.textContent = val;
    });
    document.querySelectorAll("[data-en-placeholder]").forEach((el) => {
      const v = el.getAttribute("data-" + lang + "-placeholder");
      if (v != null) el.placeholder = v;
    });
    document.querySelectorAll("[data-lang]").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    document.dispatchEvent(new CustomEvent("sb:lang"));
  }
  function setLang(l) { lang = l; localStorage.setItem("sb-lang", l); applyLang(); }

  // ── theme ───────────────────────────────────────────────────────────────
  function applyTheme() { document.documentElement.setAttribute("data-theme", theme); }
  function toggleTheme() { theme = theme === "dark" ? "light" : "dark"; localStorage.setItem("sb-theme", theme); applyTheme(); }

  // ── header wiring ─────────────────────────────────────────────────────────
  function wireHeader() {
    document.querySelectorAll("[data-lang]").forEach((b) =>
      b.addEventListener("click", () => setLang(b.dataset.lang)));
    const tt = document.getElementById("themeToggle");
    if (tt) tt.addEventListener("click", toggleTheme);
    const mb = document.getElementById("menuBtn");
    const nav = document.getElementById("nav");
    if (mb && nav) mb.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      mb.setAttribute("aria-expanded", String(open));
    });
  }

  // ── reveal on scroll ──────────────────────────────────────────────────────
  function wireReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((e) => e.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach((e) => io.observe(e));
  }

  // ── swatches (read live CSS vars so they track the theme) ──────────────────
  function renderSwatches() {
    const host = document.getElementById("swatches");
    if (!host) return;
    const roles = [
      ["--sb-accent", "Accent"], ["--sb-bg", "BG"], ["--sb-fg", "FG"],
      ["--sb-syntax-string", "String"], ["--sb-syntax-function", "Func"],
      ["--sb-orange", "Orange"], ["--sb-syntax-operator", "Pink"], ["--sb-purple", "Purple"],
    ];
    const paint = () => {
      const cs = getComputedStyle(document.documentElement);
      host.innerHTML = roles.map(([v, label]) => {
        const hex = cs.getPropertyValue(v).trim();
        return `<div class="swatch"><div class="swatch__chip" style="background:${hex}"></div><div class="swatch__meta"><b>${label}</b><code>${hex}</code></div></div>`;
      }).join("");
    };
    paint();
    new MutationObserver(paint).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }

  // ── helpers ───────────────────────────────────────────────────────────────
  function glyph(app) {
    const initial = app.name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2) || "S";
    return `<div class="glyph">${initial}</div>`;
  }
  async function fetchText(url) { const r = await fetch(url); if (!r.ok) throw new Error(r.status); return r.text(); }

  // ── HOME ────────────────────────────────────────────────────────────────
  async function initHome(manifest) {
    const statApps = document.getElementById("statApps");
    if (statApps) statApps.textContent = String(manifest.count);

    const chipsHost = document.getElementById("chips");
    const grid = document.getElementById("grid");
    const empty = document.getElementById("empty");
    const search = document.getElementById("search");
    if (!grid) return;

    let activeCat = "all";
    let query = "";

    function renderChips() {
      const cats = ["all", ...manifest.categories];
      chipsHost.innerHTML = cats.map((c) => {
        const label = c === "all" ? t("all") : (CAT_LABELS[c]?.[lang] || c);
        return `<button class="chip" data-cat="${c}" aria-pressed="${c === activeCat}">${label}</button>`;
      }).join("");
      chipsHost.querySelectorAll(".chip").forEach((b) =>
        b.addEventListener("click", () => { activeCat = b.dataset.cat; renderChips(); renderGrid(); }));
    }

    function renderGrid() {
      const items = manifest.apps.filter((a) => {
        const okCat = activeCat === "all" || a.category === activeCat;
        const okQ = !query || a.name.toLowerCase().includes(query) || a.id.includes(query) || a.category.includes(query);
        return okCat && okQ;
      });
      empty.hidden = items.length > 0;
      grid.innerHTML = items.map((a) => `
        <a class="card" href="/app.html?app=${a.id}">
          <div class="card__top">${glyph(a)}<div><b>${a.name}</b><div class="card__cat">${CAT_LABELS[a.category]?.[lang] || a.category}</div></div></div>
          <div class="card__foot">
            <span class="tag">dark</span><span class="tag">light</span>
            <svg class="card__arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </div>
        </a>`).join("");
    }

    if (search) search.addEventListener("input", () => { query = search.value.trim().toLowerCase(); renderGrid(); });
    document.addEventListener("sb:lang", () => { renderChips(); renderGrid(); });
    renderChips();
    renderGrid();
  }

  // ── tiny markdown renderer (our own docs, trusted) ────────────────────────
  function md(src) {
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const inline = (s) =>
      esc(s)
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    const lines = src.replace(/\r/g, "").split("\n");
    let html = "", i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (line.startsWith("```")) {
        let code = ""; i++;
        while (i < lines.length && !lines[i].startsWith("```")) { code += lines[i] + "\n"; i++; }
        i++; html += `<pre><code>${esc(code)}</code></pre>`; continue;
      }
      if (/^###\s/.test(line)) { html += `<h3>${inline(line.slice(4))}</h3>`; i++; continue; }
      if (/^##\s/.test(line)) { html += `<h2>${inline(line.slice(3))}</h2>`; i++; continue; }
      if (/^#\s/.test(line)) { html += `<h2>${inline(line.slice(2))}</h2>`; i++; continue; }
      if (/^\s*[-*]\s/.test(line)) {
        html += "<ul>";
        while (i < lines.length && /^\s*[-*]\s/.test(lines[i])) { html += `<li>${inline(lines[i].replace(/^\s*[-*]\s/, ""))}</li>`; i++; }
        html += "</ul>"; continue;
      }
      if (/^\s*\d+\.\s/.test(line)) {
        html += "<ol>";
        while (i < lines.length && /^\s*\d+\.\s/.test(lines[i])) { html += `<li>${inline(lines[i].replace(/^\s*\d+\.\s/, ""))}</li>`; i++; }
        html += "</ol>"; continue;
      }
      if (line.trim() === "") { i++; continue; }
      let para = line; i++;
      while (i < lines.length && lines[i].trim() !== "" && !/^[#\-*`]|^\d+\./.test(lines[i])) { para += " " + lines[i]; i++; }
      html += `<p>${inline(para)}</p>`;
    }
    return html;
  }

  // ── APP PAGE ──────────────────────────────────────────────────────────────
  async function initApp(manifest) {
    const root = document.getElementById("appRoot");
    if (!root) return;
    const id = new URLSearchParams(location.search).get("app");
    const app = manifest.apps.find((a) => a.id === id);
    if (!app) { root.innerHTML = `<div class="wrap"><p class="empty">Not found.</p></div>`; return; }

    document.title = `${app.name} — Sabotage`;
    let variant = "dark";
    const fileFor = (v) => (app.multi ? app.files[Object.keys(app.files)[0]] : app.files[v]);

    function render() {
      const isDark = variant === "dark";
      const dl = app.multi
        ? Object.entries(app.files).map(([f, p]) => `<a class="btn btn--ghost" href="/${p}" download>${t("download")}: ${f}</a>`).join("")
        : `<a class="btn btn--primary" href="/${app.files.dark}" download>${t("download")} · dark</a>
           <a class="btn btn--ghost" href="/${app.files.light}" download>${t("download")} · light</a>`;
      const variantToggle = app.multi ? "" : `
        <div class="toggle" role="group" aria-label="Variant">
          <button type="button" data-variant="dark" aria-pressed="${isDark}">dark</button>
          <button type="button" data-variant="light" aria-pressed="${!isDark}">light</button>
        </div>`;
      root.innerHTML = `
        <div class="wrap app-hero">
          <a class="back" href="/#themes"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg> ${t("back")}</a>
          <div class="app-hero__head">
            ${glyph(app)}
            <div><h1>${app.name}</h1><div class="card__cat">${CAT_LABELS[app.category]?.[lang] || app.category}</div></div>
          </div>
          <div class="app-actions">
            ${variantToggle}
            <button class="btn btn--ghost copy-here" id="copyBtn">${t("copy")}</button>
            ${dl}
          </div>
          <div class="codeblock">
            <button class="copy-btn" id="copyBtn2">${t("copy")}</button>
            <div class="window"><div class="window__bar"><i class="r"></i><i class="y"></i><i class="g"></i><small id="fileName"></small></div><pre class="code" id="snippet">…</pre></div>
          </div>
          <div class="prose" id="docs"></div>
        </div>`;

      root.querySelectorAll("[data-variant]").forEach((b) =>
        b.addEventListener("click", () => { variant = b.dataset.variant; render(); loadSnippet(); }));
      const copy = async () => {
        try {
          await navigator.clipboard.writeText(root.dataset.snippet || "");
          [root.querySelector("#copyBtn"), root.querySelector("#copyBtn2")].forEach((b) => {
            if (!b) return; const o = b.textContent; b.textContent = t("copied"); b.classList.add("copied");
            setTimeout(() => { b.textContent = o; b.classList.remove("copied"); }, 1400);
          });
        } catch { /* clipboard blocked */ }
      };
      root.querySelector("#copyBtn")?.addEventListener("click", copy);
      root.querySelector("#copyBtn2")?.addEventListener("click", copy);
    }

    async function loadSnippet() {
      const path = fileFor(variant);
      const fnEl = root.querySelector("#fileName");
      const snip = root.querySelector("#snippet");
      if (fnEl) fnEl.textContent = path.split("/").pop();
      try {
        const text = await fetchText("/" + path);
        root.dataset.snippet = text;
        const shown = text.length > 2600 ? text.slice(0, 2600) + "\n…" : text;
        if (snip) snip.textContent = shown;
      } catch { if (snip) snip.textContent = "Could not load file."; }
    }

    async function loadDocs() {
      const host = root.querySelector("#docs");
      if (!host) return;
      try {
        const data = JSON.parse(await fetchText("/" + app.docs));
        host.innerHTML = md(data[lang] || data.en);
      } catch {
        host.innerHTML = `<h2>${t("install")}</h2><p>${t("genericInstall")}</p>`;
      }
    }

    render(); loadSnippet(); loadDocs();
    document.addEventListener("sb:lang", () => { render(); loadSnippet(); loadDocs(); });
  }

  // ── SPEC PAGE ─────────────────────────────────────────────────────────────
  async function initSpec() {
    const root = document.getElementById("specRoot");
    if (!root) return;
    let tokens;
    try { tokens = JSON.parse(await fetchText("/packs/web/sabotage.tokens.json")); }
    catch { root.innerHTML = `<p class="empty">Spec unavailable.</p>`; return; }

    function hexToRgbHsl(hex) {
      const n = parseInt(hex.slice(1), 16);
      const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
      const rn = r / 255, gn = g / 255, bn = b / 255;
      const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn); const l = (max + min) / 2;
      let h = 0, s = 0; const d = max - min;
      if (d) { s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        h = max === rn ? (gn - bn) / d + (gn < bn ? 6 : 0) : max === gn ? (bn - rn) / d + 2 : (rn - gn) / d + 4; h /= 6; }
      return { rgb: `${r}, ${g}, ${b}`, hsl: `${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%` };
    }

    function render() {
      const data = tokens.sabotage[document.documentElement.getAttribute("data-theme")] || tokens.sabotage.dark;
      const section = (title, group) => {
        const rows = Object.entries(group).map(([name, tok]) => {
          const hex = tok.$value; const { rgb, hsl } = hexToRgbHsl(hex);
          return `<tr><td><div class="sw" style="background:${hex}"></div></td><td>${name}</td><td>${hex}</td><td>${rgb}</td><td>${hsl}</td></tr>`;
        }).join("");
        return `<h2 class="spec-group">${title}</h2><table class="spec-table"><thead><tr><th></th><th>role</th><th>hex</th><th>rgb</th><th>hsl</th></tr></thead><tbody>${rows}</tbody></table>`;
      };
      root.innerHTML = section("UI", data.ui) + section("ANSI", data.ansi) + section("Syntax", data.syntax) + section("Extra", data.extra);
    }
    render();
    new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }

  // ── boot ────────────────────────────────────────────────────────────────
  async function boot() {
    applyTheme();
    wireHeader();
    applyLang();
    wireReveal();
    renderSwatches();

    const needsManifest = document.getElementById("grid") || document.getElementById("appRoot");
    if (needsManifest) {
      try {
        const manifest = JSON.parse(await fetchText("/packs/manifest.json"));
        await initHome(manifest);
        await initApp(manifest);
      } catch (e) { console.error("manifest load failed", e); }
    }
    await initSpec();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
