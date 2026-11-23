// Fills {{PLACEHOLDERS}} in the Wiltshire Scouts email template. Works in Node and Cloudflare Workers
// (import the template as text). Values are HTML-escaped unless the key ends in _HTML.
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function renderEmail(template, values) {
  const missing = [];
  const html = template.replace(/\{\{([A-Z0-9_]+)\}\}/g, (_, key) => {
    if (!(key in values)) { missing.push(key); return ""; }
    return key.endsWith("_HTML") ? String(values[key]) : esc(values[key]);
  });
  if (missing.length) throw new Error("Missing email values: " + missing.join(", "));
  return html;
}
