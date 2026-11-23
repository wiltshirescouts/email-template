# @wiltshirescouts/email-template

The shared Scouts Wiltshire HTML email design, used by wsj-system, visit-abroad and International-Sign-Ups.
Zero dependencies, plain ESM with types, works in Node and Cloudflare Workers.

```js
import { wrapEmail, paragraph, button, infoPanel, note, link, escapeHtml } from "@wiltshirescouts/email-template";

const html = wrapEmail({
  title: "Thanks for registering",
  logoUrl: `${origin}/brand/scouts-wiltshire-linear-white.png`,
  bodyHtml: paragraph(`Hello ${escapeHtml(name)},`) + button(url, "View my application"),
  footerHtml: "Scouts Wiltshire. Questions? hello@wiltshirescouts.org.uk",
});
```

Values passed to `title`, `orgName`, `preheader` and the helper functions are escaped. `bodyHtml` and `footerHtml` are trusted HTML, so escape user values yourself.

## Logos
Email clients need absolute URLs, so each app hosts its own copy. `assets/scouts-wiltshire-linear-white.png` is the one the header uses (the black one is for white backgrounds). Copy from `node_modules/@wiltshirescouts/email-template/assets/`.

## Installing
Pin to a release tag:
`npm install github:wiltshirescouts/email-template#v1.0.0`
(private repo: the build needs read access, for example a deploy key or token in CI.)

## Changing the design
1. Edit `src/index.js`, run `npm test`.
2. Bump `version` in `package.json`, merge, then tag: `git tag v1.1.0 && git push --tags`.
3. Dependabot opens an update PR in each project. Merge and deploy.

Design rules: sentence case, British English, no emoji, status never by colour alone, primary button at least 48px tall.
