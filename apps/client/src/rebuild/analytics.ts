import { inject, type BeforeSendEvent } from "@vercel/analytics";

const REF_KEY = "dp:ref";

/** "Monzo Bank" → "monzo-bank"; anything else is dropped. */
const cleanRef = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

/** The ref from this URL, or the one this visit arrived with. */
function visitRef(url: URL): string | null {
  const fromUrl = cleanRef(url.searchParams.get("ref") ?? "");
  try {
    if (fromUrl) sessionStorage.setItem(REF_KEY, fromUrl);
    return fromUrl || sessionStorage.getItem(REF_KEY);
  } catch {
    return fromUrl || null;
  }
}

/**
 * Links sent with an application carry ?ref=<company>, e.g. /saas?ref=monzo.
 * The ref lasts for the whole visit and is folded into the path Vercel
 * records, so the Pages report reads /ref/monzo/saas,
 * /ref/monzo/case-study/cognism and so on. Paths show on every Vercel plan;
 * query-string and UTM reports don't.
 */
export function withVisitRef(event: BeforeSendEvent): BeforeSendEvent {
  const url = new URL(event.url);
  const ref = visitRef(url);
  if (!ref) return event;
  url.searchParams.delete("ref");
  url.pathname = `/ref/${ref}${url.pathname === "/" ? "" : url.pathname}`;
  return { ...event, url: url.toString() };
}

/** Cookieless Vercel Web Analytics; production builds only. */
export function startAnalytics() {
  if (!import.meta.env.PROD) return;
  inject({ mode: "production", beforeSend: withVisitRef });
}
