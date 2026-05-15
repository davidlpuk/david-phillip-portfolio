import { passwordHashes, type CaseStudySlug } from "./portfolioData";

const encoder = new TextEncoder();

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function unlockKey(slug: CaseStudySlug) {
  return `portfolio-v2:case-study:${slug}:unlocked`;
}

export function isUnlocked(slug: CaseStudySlug) {
  return sessionStorage.getItem(unlockKey(slug)) === "true";
}

export function rememberUnlock(slug: CaseStudySlug) {
  sessionStorage.setItem(unlockKey(slug), "true");
}

export async function verifyCaseStudyPassword(
  slug: CaseStudySlug,
  password: string,
) {
  const hash = await sha256(password.trim());
  return hash === passwordHashes.global || hash === passwordHashes[slug];
}
