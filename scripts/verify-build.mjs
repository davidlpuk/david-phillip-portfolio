/**
 * Fail the build if the output in dist/public isn't safe to publish. Runs as
 * part of `pnpm build`, so a broken build never replaces the live site on
 * Vercel (it keeps serving the last good deployment).
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

process.env.PRERENDER = "1";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "dist", "public");
const problems = [];
const read = (file) => fs.readFile(path.join(outDir, file), "utf8").catch(() => null);

const vite = await createServer({
  configFile: path.join(root, "vite.config.ts"),
  logLevel: "error",
  appType: "custom",
  server: { middlewareMode: true, hmr: false, ws: false },
  // Only meta.ts is loaded; skip the client dependency scan
  optimizeDeps: { noDiscovery: true, include: [] },
});
const { prerenderRoutes, CV_PDF_PATH } = await vite
  .ssrLoadModule("/src/rebuild/meta.ts")
  .finally(() => vite.close());

// Every public page is prerendered with its own content and tags
for (const { path: route, meta } of prerenderRoutes) {
  const file = route === "/" ? "index.html" : `${route.slice(1)}/index.html`;
  const html = await read(file);
  if (!html) {
    problems.push(`${route}: ${file} is missing`);
    continue;
  }
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  const expected = meta.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  if (title !== expected) problems.push(`${route}: title is "${title}"`);
  if (!html.includes(`data-prerendered="${route}"`)) problems.push(`${route}: not prerendered`);
  if (!html.includes('id="main-content"')) problems.push(`${route}: page content didn't render`);
  if (!/<link rel="canonical" href="https:\/\/[^"]+"/.test(html)) problems.push(`${route}: no canonical link`);
  if (meta.image && !(await fs.stat(path.join(outDir, meta.image)).catch(() => null))) {
    problems.push(`${route}: share image ${meta.image} is missing`);
  }
  if (Boolean(meta.noindex) !== html.includes('name="robots" content="noindex')) {
    problems.push(`${route}: robots noindex doesn't match its meta`);
  }
}

// The SPA shell for every other route must be the untouched template
const spa = await read("spa.html");
if (!spa) problems.push("spa.html is missing");
else if (spa.includes("data-prerendered=")) problems.push("spa.html contains a prerendered page");

// The CV download
const pdf = await fs.readFile(path.join(outDir, CV_PDF_PATH.slice(1))).catch(() => null);
if (!pdf || pdf.subarray(0, 5).toString() !== "%PDF-" || pdf.length < 20_000) {
  problems.push(`${CV_PDF_PATH} is missing or too small`);
}

// Nothing private or local-only in the public bundle
const jsFiles = await fs.readdir(path.join(outDir, "js"));
const adminChunk = jsFiles.find((f) => /^(CVLab|CVBuilder|ArticleGenerator|ArticleManager|ExecutiveExplorer)-/.test(f));
if (adminChunk) problems.push(`admin page shipped in the public build: js/${adminChunk}`);
for (const file of jsFiles) {
  const code = await read(`js/${file}`);
  if (code?.includes("localhost:3001")) problems.push(`js/${file} calls localhost:3001`);
}

for (const file of ["robots.txt", "sitemap.xml", "og-image.jpg"]) {
  if ((await read(file)) === null) problems.push(`${file} is missing`);
}

if (problems.length) {
  console.error(`Build check failed:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log(`build check passed (${prerenderRoutes.length} pages, CV PDF, bundle)`);
