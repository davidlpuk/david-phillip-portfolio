/**
 * Make the social share image for each case study (public/og-case-<slug>.jpg),
 * from its title, sector and lead metric in rebuild/portfolioData.ts.
 * Re-run after changing a case study:
 *   node scripts/make-share-images.mjs
 * Needs Chromium: `pnpm exec playwright-core install chromium` once.
 */
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { createServer } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "apps", "client", "public");

const vite = await createServer({
  configFile: path.join(root, "vite.config.ts"),
  logLevel: "error",
  appType: "custom",
  server: { middlewareMode: true, hmr: false, ws: false },
  optimizeDeps: { noDiscovery: true, include: [] },
});
const { caseStudies } = await vite
  .ssrLoadModule("/src/rebuild/portfolioData.ts")
  .finally(() => vite.close());

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
// Instrument Serif has no arrow, so it borrows Geist's
const metric = (v) => esc(v).replace(/→/g, '<span class="arrow">→</span>');

const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "share-images-"));
const browser = await chromium.launch();
try {
  for (const [i, s] of caseStudies.entries()) {
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Geist;font-weight:100 900;src:url(file://${publicDir}/fonts/geist-latin.woff2)}
@font-face{font-family:'Geist Mono';font-weight:100 900;src:url(file://${publicDir}/fonts/geist-mono-latin.woff2)}
@font-face{font-family:'Instrument Serif';src:url(file://${publicDir}/fonts/instrument-serif-latin.woff2)}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#0c0e12;color:#fbfaf7;font-family:Geist,sans-serif;position:relative;overflow:hidden}
.grid{position:absolute;inset:0;background-image:linear-gradient(to right,rgb(255 255 255/.045) 1px,transparent 1px),linear-gradient(to bottom,rgb(255 255 255/.045) 1px,transparent 1px);background-size:72px 72px}
.glow{position:absolute;left:-220px;top:160px;width:620px;height:620px;border-radius:50%;background:rgb(42 75 216/.32);filter:blur(140px)}
.left{position:absolute;left:72px;top:64px;bottom:64px;width:548px;display:flex;flex-direction:column}
.label{font-family:'Geist Mono',monospace;font-size:15px;letter-spacing:.1em;text-transform:uppercase;color:#8aa2ff}
.label b{color:#a3a9b4;font-weight:500}
h1{font-family:'Instrument Serif',serif;font-weight:400;font-size:54px;line-height:1.02;letter-spacing:-.015em;margin-top:26px}
.metric{display:flex;align-items:baseline;gap:18px;margin-top:auto;padding-top:22px;border-top:1px solid rgb(255 255 255/.12)}
.value{font-family:'Instrument Serif',serif;font-size:64px;line-height:1;color:#8aa2ff;white-space:nowrap}
.arrow{font-family:Geist,sans-serif;font-size:44px;vertical-align:.12em;margin:0 .08em}
.mlabel{font-size:19px;color:#c9ced6;line-height:1.3}
.by{display:flex;flex-direction:column;gap:6px;margin-top:24px}
.name{font-size:21px;font-weight:500}
.role{font-family:'Geist Mono',monospace;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#a3a9b4}
.photo{position:absolute;right:56px;top:50%;transform:translateY(-50%);width:492px;aspect-ratio:3/2;border-radius:20px;box-shadow:0 30px 80px rgb(0 0 0/.45);overflow:hidden;border:1px solid rgb(255 255 255/.12);background:#15181e}
.photo img{width:100%;height:100%;object-fit:cover;object-position:50% 0%}
</style></head><body><div class="grid"></div><div class="glow"></div>
<div class="left">
  <p class="label">Case study 0${i + 1} · ${esc(s.company)} <b>/ ${esc(s.sector)}</b></p>
  <h1>${esc(s.title)}</h1>
  <div class="metric"><span class="value">${metric(s.proof[0].value)}</span><span class="mlabel">${esc(s.proof[0].label)}</span></div>
  <div class="by"><span class="name">David Phillip</span><span class="role">Head of Design · Design Director</span></div>
</div>
<div class="photo"><img src="file://${publicDir}${s.image}"></div>
</body></html>`;

    const htmlFile = path.join(tmp, `${s.slug}.html`);
    await fs.writeFile(htmlFile, html);
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
    await page.goto(`file://${htmlFile}`, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    const out = path.join(publicDir, `og-case-${s.slug}.jpg`);
    await page.screenshot({ path: out, type: "jpeg", quality: 86 });
    await page.close();
    console.log(`wrote ${path.relative(root, out)}`);
  }
} finally {
  await browser.close();
  await fs.rm(tmp, { recursive: true, force: true });
}
