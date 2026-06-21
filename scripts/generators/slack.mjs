import { slackString } from "../lib/color.mjs";

export const meta = { app: "slack", name: "Slack", category: "chat", ext: "txt" };

export default function slack(v, m) {
  // Slack sidebar themes = 8 comma-separated hex colors. Paste into
  // Preferences → Themes → Create a custom theme → "copy & paste".
  return slackString(v) + "\n";
}
