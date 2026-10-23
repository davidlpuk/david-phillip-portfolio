import { PassThrough } from "node:stream";
import { prerenderToNodeStream } from "react-dom/static";
import App from "./App";

export { prerenderRoutes, SITE_URL } from "@/rebuild/meta";

/** Render one route to HTML at build time, waiting for lazy pages to load. */
export async function render(path: string): Promise<string> {
  // An unlimited chunk size keeps each page inline instead of streaming a
  // loading fallback that an inline script later swaps for the content.
  const { prelude } = await prerenderToNodeStream(<App ssrPath={path} />, {
    progressiveChunkSize: Number.POSITIVE_INFINITY,
  });
  const chunks: Buffer[] = [];
  for await (const chunk of prelude.pipe(new PassThrough())) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf8");
}
