import { hex } from "../lib/color.mjs";

export const meta = { app: "web", name: "Web / CSS", category: "web", multi: true };

// Flatten a variant into a list of [cssVarName, hex] pairs with stable prefixes.
function flatten(variant) {
  const out = [];
  for (const [k, val] of Object.entries(variant.ui)) out.push([`--sb-${kebab(k)}`, hex(val)]);
  for (const [k, val] of Object.entries(variant.ansi)) out.push([`--sb-ansi-${kebab(k)}`, hex(val)]);
  for (const [k, val] of Object.entries(variant.syntax)) out.push([`--sb-syntax-${kebab(k)}`, hex(val)]);
  for (const [k, val] of Object.entries(variant.extra)) out.push([`--sb-${kebab(k)}`, hex(val)]);
  return out;
}

function kebab(s) {
  return s.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function cssBlock(pairs, indent = "  ") {
  return pairs.map(([k, val]) => `${indent}${k}: ${val};`).join("\n");
}

export default function web(spec) {
  const { dark, light } = spec.variants;
  const header = `/* Sabotage — Web design tokens. Generated from spec/palette.json.\n * Light is the default; set data-theme="dark" on <html> (or :root) to flip. */`;

  const css = `${header}
:root {
${cssBlock(flatten(light))}
  --sb-on-accent: #ffffff;
}

[data-theme="dark"] {
${cssBlock(flatten(dark))}
  --sb-on-accent: #ffffff;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${cssBlock(flatten(dark), "    ")}
  }
}
`;

  // SCSS — flat dark vars + a map per variant
  const scssVars = flatten(dark)
    .map(([k, val]) => `$${k.slice(2)}: ${val};`)
    .join("\n");
  const scssMap = (name, variant) =>
    `$sabotage-${name}: (\n` +
    flatten(variant).map(([k, val]) => `  "${k.slice(2)}": ${val},`).join("\n") +
    `\n);`;
  const scss = `// Sabotage — SCSS tokens. Generated from spec/palette.json.
// Flat variables default to the DARK variant.
${scssVars}

${scssMap("dark", dark)}

${scssMap("light", light)}
`;

  // W3C Design Tokens (draft) — grouped, with $value/$type
  const tokenGroup = (variant) => {
    const group = {};
    const add = (cat, obj) => {
      group[cat] = {};
      for (const [k, val] of Object.entries(obj)) group[cat][k] = { $value: hex(val), $type: "color" };
    };
    add("ui", variant.ui);
    add("ansi", variant.ansi);
    add("syntax", variant.syntax);
    add("extra", variant.extra);
    return group;
  };
  const tokens = {
    $schema: "https://design-tokens.github.io/community-group/format/",
    sabotage: {
      $description: "Sabotage color theme tokens",
      dark: tokenGroup(dark),
      light: tokenGroup(light),
    },
  };

  return [
    { file: "sabotage.css", content: css },
    { file: "sabotage.scss", content: scss },
    { file: "sabotage.tokens.json", content: JSON.stringify(tokens, null, 2) + "\n" },
  ];
}
