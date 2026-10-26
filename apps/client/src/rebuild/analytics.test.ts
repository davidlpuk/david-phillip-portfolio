import { beforeEach, describe, expect, it } from "vitest";
import { withVisitRef } from "./analytics";

const store = new Map<string, string>();
globalThis.sessionStorage = {
  getItem: (key: string) => store.get(key) ?? null,
  setItem: (key: string, value: string) => void store.set(key, value),
} as Storage;

const view = (url: string) => withVisitRef({ type: "pageview", url }).url;

describe("withVisitRef", () => {
  beforeEach(() => store.clear());

  it("leaves visits without a ref alone", () => {
    expect(view("https://x.dev/saas")).toBe("https://x.dev/saas");
  });

  it("folds the ref into the path and keeps it for the visit", () => {
    expect(view("https://x.dev/saas?ref=Monzo%20Bank")).toBe("https://x.dev/ref/monzo-bank/saas");
    expect(view("https://x.dev/case-study/cognism")).toBe(
      "https://x.dev/ref/monzo-bank/case-study/cognism",
    );
    expect(view("https://x.dev/")).toBe("https://x.dev/ref/monzo-bank");
  });

  it("never records the case-study key", () => {
    expect(view("https://x.dev/?key=secret")).toBe("https://x.dev/");
    expect(view("https://x.dev/v?ref=acme&key=secret")).toBe("https://x.dev/ref/acme/v");
  });

  it("keeps other query parameters and drops unusable refs", () => {
    expect(view("https://x.dev/cv?ref=acme&utm_source=li")).toBe(
      "https://x.dev/ref/acme/cv?utm_source=li",
    );
    store.clear();
    expect(view("https://x.dev/cv?ref=%2F%2F..")).toBe("https://x.dev/cv?ref=%2F%2F..");
  });
});
