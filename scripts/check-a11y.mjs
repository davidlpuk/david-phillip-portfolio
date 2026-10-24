/**
 * Accessibility check (axe-core, WCAG 2.2 AA plus best practices) on the
 * built site at desktop and phone widths. Run after `pnpm build`:
 *   pnpm check:a11y
 * Needs Chromium: `pnpm exec playwright-core install chromium` once.
 */
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "dist", "public");
const axeSource = fs.readFileSync(createRequire(import.meta.url).resolve("axe-core/axe.min.js"), "utf8");

const pages = [
  "/",
  "/saas",
  "/design-leadership",
  "/case-study/coutts",
  "/case-study/hsbc-kinetic",
  "/case-study/cognism",
  "/case-study/ux-sidekick",
  "/cv",
  "/articles",
  "/missing-page",
];
const widths = [1440, 390];

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
  ".md": "text/markdown; charset=utf-8",
};

// Same lookup as Vercel: the file, then <path>/index.html, then the SPA shell
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  const candidates = [path.join(outDir, pathname), path.join(outDir, pathname, "index.html")];
  const file =
    candidates.find((f) => f.startsWith(outDir) && fs.existsSync(f) && fs.statSync(f).isFile()) ??
    path.join(outDir, "spa.html");
  res.writeHead(200, { "content-type": types[path.extname(file)] ?? "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch();
let failures = 0;
try {
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
    for (const pagePath of pages) {
      const page = await context.newPage();
      await page.goto(origin + pagePath, { waitUntil: "networkidle" });
      await page.addScriptTag({ content: axeSource });
      const violations = await page.evaluate(async () => {
        const result = await window.axe.run(document, {
          runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"],
        });
        return result.violations.map((v) => `${v.id} (${v.nodes.length}): ${v.help}`);
      });
      if (violations.length) {
        failures += violations.length;
        console.error(`✗ ${pagePath} @${width}px\n  ${violations.join("\n  ")}`);
      } else {
        console.log(`✓ ${pagePath} @${width}px`);
      }
      await page.close();
    }
    await context.close();
  }
} finally {
  await browser.close();
  server.close();
}

if (failures) {
  console.error(`${failures} accessibility violation(s)`);
  process.exit(1);
}
