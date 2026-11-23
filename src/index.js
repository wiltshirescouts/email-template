/**
 * Scouts Wiltshire email template. Pure functions, no dependencies, safe in Node, browsers and Cloudflare Workers.
 * Design tokens come from the Scouts brand design system (guidelines v3.3). Change the design here, tag a release, and
 * every project that depends on this package picks it up when it updates.
 */

export const FONT = "'Nunito Sans',Arial,Helvetica,sans-serif";
export const COLOURS = { purple: "#7413dc", purpleDeep: "#4a0d93", purpleTint: "#f3ebfc", teal: "#088486", pink: "#ffb4e5", yellow: "#ffe627", navy: "#003982" };

export const escapeHtml = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const STYLE = `<style>
body,table,td,a{-webkit-text-size-adjust:100%;}
img{border:0;outline:none;text-decoration:none;}
a{color:#7413dc;}
@media screen and (max-width:620px){.container{width:100%!important;}.px{padding-left:20px!important;padding-right:20px!important;}.h1{font-size:28px!important;line-height:34px!important;}.stack{display:block!important;width:100%!important;}}
@media (prefers-color-scheme:dark){.bg-page{background-color:#121018!important;}.bg-card{background-color:#1c1925!important;}.bg-panel{background-color:#2b1c47!important;}.t-body{color:#dcd8e3!important;}.t-head{color:#f3f0f8!important;}.t-muted{color:#b8b2c2!important;}.t-link,.t-link a{color:#c9a2f5!important;}.b-line{border-color:#3b3648!important;}.note-success{background-color:#16301f!important;color:#bfe3cb!important;}.note-warning{background-color:#3a2a14!important;color:#ffd9a8!important;}.note-info{background-color:#12263f!important;color:#bcd4f2!important;}}
[data-ogsc] .bg-page{background-color:#121018!important;}[data-ogsc] .bg-card{background-color:#1c1925!important;}[data-ogsc] .t-body{color:#dcd8e3!important;}
</style>`;

const STRIPE = `<tr><td height="6" style="font-size:0;line-height:0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>${[COLOURS.teal, COLOURS.pink, COLOURS.yellow, COLOURS.navy]
  .map((c) => `<td width="25%" height="6" bgcolor="${c}" style="background-color:${c};font-size:0;line-height:0;">&nbsp;</td>`).join("")}</tr></table></td></tr>`;

/** A paragraph of body copy. `html` is trusted HTML (escape user values with escapeHtml first). */
export const paragraph = (html) =>
  `<p class="t-body" style="margin:0 0 16px 0;font-family:${FONT};font-size:16px;line-height:26px;color:#333333;">${html}</p>`;

/** Link styled for the template. */
export const link = (href, text = href) =>
  `<a href="${escapeHtml(href)}" class="t-link" style="color:#7413dc;word-break:break-all;">${escapeHtml(text)}</a>`;

/** Primary button. Keep the wrapper exactly as is: visit-abroad inserts a note after it. */
export const button = (href, label) =>
  `<p style="margin:24px 0"><a href="${escapeHtml(href)}" style="background:#7413dc;color:#ffffff;padding:12px 32px;font-weight:700;font-size:16px;line-height:24px;text-decoration:none;display:inline-block;border-radius:8px">${escapeHtml(label)}</a></p>`;

/** Key details panel. rows: [[label, value], ...]. Values are escaped. */
export const infoPanel = (title, rows) =>
  `<table role="presentation" class="bg-panel" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3ebfc;border-radius:8px;border-left:4px solid #7413dc;margin:0 0 24px 0;"><tr><td style="padding:20px 24px;font-family:${FONT};"><p class="t-head" style="margin:0 0 12px 0;font-size:13px;line-height:18px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#4a0d93;">${escapeHtml(title)}</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows
    .map(([l, v]) => `<tr><td class="stack t-muted" width="38%" valign="top" style="padding:6px 12px 6px 0;font-size:14px;line-height:22px;font-weight:700;color:#55506a;">${escapeHtml(l)}</td><td class="stack t-body" valign="top" style="padding:6px 0;font-size:15px;line-height:22px;color:#14101c;">${escapeHtml(v)}</td></tr>`)
    .join("")}</table></td></tr></table>`;

const NOTES = {
  info: { bg: "#e6eef8", fg: "#003982", border: "#003982" },
  success: { bg: "#e7f2ec", fg: "#205b41", border: "#205b41" },
  warning: { bg: "#fff1e2", fg: "#7a3b00", border: "#ff912a" },
  danger: { bg: "#fdecea", fg: "#a3260f", border: "#ed3f23" },
};
/** Note box. kind: info | success | warning | danger. Status is always carried by the title text, never colour alone. */
export const note = (kind, title, text) => {
  const n = NOTES[kind] ?? NOTES.info;
  const cls = kind === "danger" ? "note-warning" : `note-${kind in NOTES ? kind : "info"}`;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px 0;"><tr><td class="${cls}" style="background-color:${n.bg};border-left:4px solid ${n.border};border-radius:8px;padding:16px 20px;font-family:${FONT};font-size:15px;line-height:23px;color:${n.fg};"><strong>${escapeHtml(title)}</strong><br>${escapeHtml(text)}</td></tr></table>`;
};

/**
 * The full email: purple header with the white logo, headline, brand stripe, content card, footer.
 * @param {{title:string, bodyHtml:string, logoUrl:string, orgName?:string, footerHtml?:string, preheader?:string, lang?:string}} o
 *  bodyHtml and footerHtml are trusted HTML; title, orgName and preheader are escaped.
 */
export function wrapEmail({ title, bodyHtml, logoUrl, orgName = "Scouts Wiltshire", footerHtml = "", preheader = "", lang = "en-GB" }) {
  const pre = preheader
    ? `<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(preheader)}</div>`
    : "";
  return `<!doctype html>
<html lang="${escapeHtml(lang)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><meta name="supported-color-schemes" content="light dark"><title>${escapeHtml(title)}</title>
${STYLE}
</head>
<body class="bg-page" style="margin:0;padding:0;background-color:#f6f4f9;">${pre}
<table role="presentation" class="bg-page" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f6f4f9;"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">
<tr><td class="px" bgcolor="#7413dc" style="background-color:#7413dc;border-radius:8px 8px 0 0;padding:28px 40px 20px 40px;"><img src="${escapeHtml(logoUrl)}" width="200" alt="${escapeHtml(orgName)}" style="display:block;width:200px;max-width:100%;height:auto;"></td></tr>
<tr><td class="px" bgcolor="#7413dc" style="background-color:#7413dc;padding:8px 40px 32px 40px;"><h1 class="h1" style="margin:0;font-family:${FONT};font-size:32px;line-height:38px;font-weight:900;color:#ffffff;">${escapeHtml(title)}</h1></td></tr>
${STRIPE}
<tr><td class="bg-card px" bgcolor="#ffffff" style="background-color:#ffffff;padding:32px 40px 16px 40px;font-family:${FONT};">${bodyHtml}</td></tr>
<tr><td class="bg-card b-line px" bgcolor="#ffffff" style="background-color:#ffffff;border-top:1px solid #e4e0eb;border-radius:0 0 8px 8px;padding:20px 40px 24px 40px;font-family:${FONT};font-size:13px;line-height:20px;color:#55506a;"><span class="t-muted">${footerHtml}</span></td></tr>
</table></td></tr></table>
</body></html>`;
}
