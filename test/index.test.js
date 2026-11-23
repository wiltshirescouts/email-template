import test from "node:test";
import assert from "node:assert/strict";
import { wrapEmail, paragraph, button, infoPanel, note, escapeHtml, link } from "../src/index.js";

test("wrapEmail builds the branded shell and escapes title", () => {
  const html = wrapEmail({ title: "<b>Hi</b>", bodyHtml: paragraph("x"), logoUrl: "https://e.org/l.png", footerHtml: "f" });
  assert.match(html, /^<!doctype html>/);
  assert.ok(html.includes("&lt;b&gt;Hi&lt;/b&gt;"));
  assert.ok(html.includes('src="https://e.org/l.png"'));
  assert.ok(html.includes("#7413dc") && html.includes("prefers-color-scheme:dark"));
  assert.ok(!html.includes("<b>Hi</b>"));
});
test("button keeps its wrapper and escapes", () => {
  assert.match(button('https://a/?x=1&y="2"', "Go"), /^<p style="margin:24px 0"><a href="https:\/\/a\/\?x=1&amp;y=&quot;2&quot;"/);
});
test("infoPanel and note escape values", () => {
  assert.ok(infoPanel("T", [["a", "<s>"]]).includes("&lt;s&gt;"));
  assert.ok(note("warning", "Due", "<x>").includes("&lt;x&gt;"));
});
test("link and escapeHtml", () => {
  assert.ok(link("https://a/b").includes('class="t-link"'));
  assert.equal(escapeHtml(`&<>"'`), "&amp;&lt;&gt;&quot;&#39;");
});
