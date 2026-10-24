/**
 * Prerender the public portfolio routes to static HTML after `vite build`.
 *
 * Each route in `prerenderRoutes` is rendered with React on the server (via
 * Vite's SSR loader, so aliases and TSX work) and written to
 * dist/public/<route>/index.html with its own title, description, canonical
 * and social tags. The untouched SPA shell is kept as dist/public/spa.html for
 * every other route.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import { cvMarkdownPath, renderCvPdf } from "./cv-pdf.mjs";

process.env.PRERENDER = "1";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "dist", "public");

const escapeHtml = (value) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function setTag(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`Template is missing ${pattern}`);
  return html.replace(pattern, replacement);
}

function withMeta(template, { title, description, image, noindex }, url, siteUrl) {
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  let html = template;
  if (image) {
    html = setTag(html, /(<meta property="og:image" content=")[^"]*(")/, `$1${siteUrl}${image}$2`);
    html = setTag(html, /(<meta name="twitter:image" content=")[^"]*(")/, `$1${siteUrl}${image}$2`);
  }
  if (noindex) {
    html = html.replace("</title>", '</title>\n  <meta name="robots" content="noindex, follow" />');
  }
  html = setTag(html, /<title>[^<]*<\/title>/, `<title>${t}</title>`);
  html = setTag(html, /(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${d}$2`);
  html = setTag(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${t}$2`);
  html = setTag(html, /(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${d}$2`);
  html = setTag(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
  html = setTag(html, /(<meta name="twitter:title" content=")[^"]*(")/, `$1${t}$2`);
  html = setTag(html, /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, `$1${d}$2`);
  html = setTag(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  return html;
}

/** Preload the route's own chunk so hydration doesn't wait on a waterfall. */
function preloadTags(manifest, entries) {
  const files = new Set();
  const visit = (key) => {
    const chunk = manifest[key];
    if (!chunk || files.has(chunk.file)) return;
    files.add(chunk.file);
    (chunk.imports ?? []).forEach(visit);
  };
  entries.forEach(visit);
  return [...files]
    .filter((file) => file.endsWith(".js"))
    .map((file) => `<link rel="modulepreload" crossorigin href="/${file}">`)
    .join("\n  ");
}

const homePaths = new Set(["/", "/saas", "/design-leadership"]);
const routeChunk = (routePath) =>
  homePaths.has(routePath)
    ? "src/views/PortfolioV2.tsx"
    : routePath === "/cv"
      ? "src/views/CV.tsx"
      : routePath === "/articles"
        ? "src/views/LinkedInArticlesView.tsx"
        : "src/views/PortfolioV2CaseStudy.tsx";

// index.html is overwritten below, so a re-run reads the saved shell instead.
const builtIndex = await fs.readFile(path.join(outDir, "index.html"), "utf8");
const template = builtIndex.includes("data-prerendered=")
  ? await fs.readFile(path.join(outDir, "spa.html"), "utf8")
  : builtIndex;
if (template.includes("data-prerendered=")) {
  throw new Error("No clean HTML shell found; run `vite build` first.");
}
const manifest = JSON.parse(
  await fs.readFile(path.join(outDir, ".vite", "manifest.json"), "utf8"),
);
await fs.writeFile(path.join(outDir, "spa.html"), template);

const vite = await createServer({
  configFile: path.join(root, "vite.config.ts"),
  logLevel: "error",
  appType: "custom",
  server: { middlewareMode: true, hmr: false, ws: false },
});

try {
  const { render, prerenderRoutes, SITE_URL, CV_PDF_PATH } = await vite.ssrLoadModule(
    "/src/app/entry-server.tsx",
  );
  const siteUrl = (process.env.SITE_URL || SITE_URL).replace(/\/$/, "");

  const cvSource = await fs.readFile(cvMarkdownPath(root), "utf8");

  for (const route of prerenderRoutes) {
    globalThis.__CV_SOURCE__ = route.path === "/cv" ? cvSource : undefined;
    const appHtml = await render(route.path);
    const url = route.path === "/" ? `${siteUrl}/` : `${siteUrl}${route.path}`;
    let html = withMeta(template, route.meta, url, siteUrl);
    html = setTag(
      html,
      /<div id="root"><\/div>/,
      `<div id="root" data-prerendered="${route.path}">${appHtml}</div>`,
    );
    const preloads = preloadTags(manifest, [routeChunk(route.path)]);
    html = html.replace("</head>", `  ${preloads}\n</head>`);
    if (route.path === "/cv") {
      const embedded = cvSource.replace(/<\/script/gi, "<\\/script");
      html = html.replace(
        "</body>",
        `<script type="text/markdown" id="cv-source">${embedded}</script>\n</body>`,
      );
    }

    const file =
      route.path === "/"
        ? path.join(outDir, "index.html")
        : path.join(outDir, route.path.slice(1), "index.html");
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, html);
    console.log(`prerendered ${route.path} (${Math.round(html.length / 1024)} kB)`);
  }

  const pdf = await renderCvPdf((id) => vite.ssrLoadModule(id), root, cvSource);
  await fs.writeFile(path.join(outDir, CV_PDF_PATH.slice(1)), pdf);
  console.log(`rendered ${CV_PDF_PATH} (${Math.round(pdf.length / 1024)} kB)`);
} finally {
  await vite.close();
}
