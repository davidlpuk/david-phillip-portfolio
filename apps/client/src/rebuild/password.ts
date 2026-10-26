import { caseStudies, passwordHashes, type CaseStudySlug } from "./portfolioData";

const encoder = new TextEncoder();

/** Fired on window when case studies are unlocked from a ?key= link. */
export const UNLOCK_EVENT = "dp:unlock";

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function unlockKey(slug: CaseStudySlug) {
  return `portfolio-v2:case-study:${slug}:unlocked`;
}

// Kept in localStorage so an unlock survives new tabs and return visits.
export function isUnlocked(slug: CaseStudySlug) {
  try {
    return localStorage.getItem(unlockKey(slug)) === "true";
  } catch {
    return false;
  }
}

export function rememberUnlock(slug: CaseStudySlug) {
  try {
    localStorage.setItem(unlockKey(slug), "true");
  } catch {
    // Storage blocked: the study stays open until the page is left.
  }
}

/**
 * Checks a password. The shared password opens every protected case study
 * at once; a study's own password opens just that one.
 */
export async function unlockWithPassword(slug: CaseStudySlug | null, password: string) {
  const hash = await sha256(password.trim());
  if (hash === passwordHashes.global) {
    caseStudies.filter((study) => study.protected).forEach((study) => rememberUnlock(study.slug));
    return true;
  }
  if (slug && hash === passwordHashes[slug]) {
    rememberUnlock(slug);
    return true;
  }
  return false;
}

/**
 * Links sent with an application can carry the shared password as ?key=, so
 * the reader never sees a password box. The key is removed from the address
 * bar once read.
 */
export async function unlockFromUrl() {
  const url = new URL(window.location.href);
  const key = url.searchParams.get("key");
  if (!key) return;
  url.searchParams.delete("key");
  window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
  if (await unlockWithPassword(null, key)) {
    window.dispatchEvent(new Event(UNLOCK_EVENT));
  }
}
