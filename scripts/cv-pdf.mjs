/**
 * Render the CV markdown to a PDF with the site's CVPDF component. Used by
 * scripts/prerender.mjs (writes dist/public/David-Phillip-CV.pdf) and by the
 * dev server, so the CV page can link to a real file instead of building the
 * PDF in the visitor's browser.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { createElement } from "react";

export const cvMarkdownPath = (root) =>
  path.join(root, "apps", "client", "public", "docs", "DP CV - Download.md");

let fontsRegistered = false;

/** `loadModule` is a Vite server's ssrLoadModule, so aliases and TSX work. */
export async function renderCvPdf(loadModule, root, markdown) {
  const { renderToBuffer } = await loadModule("@react-pdf/renderer");
  const { CVPDF, registerCvFonts } = await loadModule("/src/features/cv-pdf/CVPDF.tsx");
  if (!fontsRegistered) {
    registerCvFonts(path.join(root, "apps", "client", "public", "fonts", "pdf") + path.sep);
    fontsRegistered = true;
  }
  const source = markdown ?? (await fs.readFile(cvMarkdownPath(root), "utf8"));
  return renderToBuffer(createElement(CVPDF, { markdown: source, updated: new Date() }));
}
