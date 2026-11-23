# Wiltshire Scouts email template

Shared, project-neutral HTML email. Based on the Scouts brand design system (as used in wsj-system).

- `wiltshire-scouts-email.html` is the template. Every project-specific word is a `{{PLACEHOLDER}}`.
- `render.mjs` exports `renderEmail(template, values)`, which fills the placeholders, escapes values and throws if any are missing.
- `brand/` holds the two logo PNGs. Host them publicly and set `LOGO_BASE_URL` (email clients need absolute URLs).
- `preview.html` is a filled example.

Reusing it in a project: copy the template and `render.mjs` in, or keep them in one shared place and import from there.
Delete the sections you don't need (info panel, button, note) by removing the block between the `SECTION:` comments.
For a plain-text alternative, send a short text version alongside the HTML.
