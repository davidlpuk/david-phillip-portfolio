import { createHash } from "node:crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";

const hash = (value: string) => createHash("sha256").update(value).digest("hex");

vi.mock("./portfolioData", () => ({
  caseStudies: [
    { slug: "coutts", protected: true },
    { slug: "cognism", protected: true },
    { slug: "ux-sidekick", protected: false },
  ],
  passwordHashes: { global: hash("shared-pass"), coutts: hash("coutts-pass") },
}));

const { isUnlocked, unlockWithPassword } = await import("./password");

const store = new Map<string, string>();
globalThis.localStorage = {
  getItem: (key: string) => store.get(key) ?? null,
  setItem: (key: string, value: string) => void store.set(key, value),
} as Storage;

describe("unlockWithPassword", () => {
  beforeEach(() => store.clear());

  it("opens every protected case study with the shared password", async () => {
    expect(await unlockWithPassword("coutts", " shared-pass ")).toBe(true);
    expect(isUnlocked("coutts")).toBe(true);
    expect(isUnlocked("cognism")).toBe(true);
  });

  it("opens only one study with that study's own password", async () => {
    expect(await unlockWithPassword("coutts", "coutts-pass")).toBe(true);
    expect(isUnlocked("coutts")).toBe(true);
    expect(isUnlocked("cognism")).toBe(false);
  });

  it("rejects wrong passwords and study passwords used without a study", async () => {
    expect(await unlockWithPassword("coutts", "nope")).toBe(false);
    expect(await unlockWithPassword(null, "coutts-pass")).toBe(false);
    expect(isUnlocked("coutts")).toBe(false);
  });
});
