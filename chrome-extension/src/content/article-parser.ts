import TurndownService from "turndown";
import { ArticleData } from "../utils/types";

const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
  emDelimiter: "*",
  strongDelimiter: "**",
  linkStyle: "inlined",
});

function cleanHtml(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  doc
    .querySelectorAll(
      ".feed-shared-inline-show-more-text__see-more, .feed-shared-reactions, .feed-shared-comments, " +
        ".social-actions, .analytics, .article-poster, .feed-shared-actor, .feed-shared-control, " +
        '[role="button"], [data-test-id="see-more"], script, style, nav, header, footer, iframe',
    )
    .forEach((el) => el.remove());

  doc.querySelectorAll("[data-*], [aria-*]").forEach((el) => {
    Array.from(el.attributes).forEach((attr) => {
      if (attr.name.startsWith("data-") || attr.name.startsWith("aria-")) {
        el.removeAttribute(attr.name);
      }
    });
  });

  doc.querySelectorAll('span[class=""]').forEach((el) => {
    el.replaceWith(el.textContent || "");
  });

  return doc.body.innerHTML;
}

function normalizeStructure(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  doc.querySelectorAll("p").forEach((p) => {
    if (p.textContent?.trim() === "") {
      p.remove();
    }
  });

  doc.querySelectorAll("br").forEach((br, index) => {
    if (index > 0 && br.previousSibling?.nodeType === Node.TEXT_NODE) {
      br.remove();
    }
  });

  return doc.body.innerHTML;
}

function extractTitle(): string | null {
  const selectors = [
    "h1.text-heading-xlarge",
    'h1[data-test-id="article-title"]',
    ".article-title",
    "article h1",
    ".feed-shared-inline-show-more-text h2",
  ];

  for (const selector of selectors) {
    const element = document.querySelector<HTMLElement>(selector);
    if (element) {
      return element.textContent?.trim() || null;
    }
  }

  const h1 = document.querySelector("h1");
  if (h1) {
    return h1.textContent?.trim() || null;
  }

  return null;
}

function extractAuthor(): { name: string; profileUrl: string } | null {
  const selectors = [
    ".feed-shared-actor__name",
    ".article-author-byline__name",
    ".update-components-actor__name",
    '[data-test-id="article-author-name"]',
  ];

  for (const selector of selectors) {
    const element = document.querySelector<HTMLElement>(selector);
    if (element) {
      const profileLink = element.closest("a");
      return {
        name: element.textContent?.trim() || "Unknown",
        profileUrl: profileLink?.href || "",
      };
    }
  }

  return null;
}

function extractPublishDate(): string | null {
  const selectors = [
    ".feed-shared-actor__sub-description time",
    ".article-author-byline__time",
    ".update-components-actor__sub-description time",
    '[data-test-id="article-publish-date"]',
    "time[datetime]",
  ];

  for (const selector of selectors) {
    const element = document.querySelector<HTMLElement>(selector);
    if (element) {
      return (
        element.getAttribute("datetime") || element.textContent?.trim() || null
      );
    }
  }

  return null;
}

function extractReadingTime(): string | null {
  const selectors = [
    ".article-author-byline__reading-time",
    ".feed-shared-article__reading-time",
    '[data-test-id="article-reading-time"]',
  ];

  for (const selector of selectors) {
    const element = document.querySelector<HTMLElement>(selector);
    if (element) {
      return element.textContent?.trim() || null;
    }
  }

  return null;
}

function extractArticleBody(): string {
  const selectors = [
    ".feed-shared-inline-show-more-text",
    ".article-body",
    ".feed-shared-article__article-body",
    '[data-test-id="article-content"]',
    ".update-components-text",
    ".feed-shared-text",
  ];

  for (const selector of selectors) {
    const element = document.querySelector<HTMLElement>(selector);
    if (element) {
      const clone = element.cloneNode(true) as HTMLElement;

      clone
        .querySelectorAll(".feed-shared-inline-show-more-text__see-more")
        .forEach((btn) => btn.remove());

      const cleanedHtml = cleanHtml(clone.innerHTML);
      const normalizedHtml = normalizeStructure(cleanedHtml);

      return turndownService.turndown(normalizedHtml);
    }
  }

  const mainContent =
    document.querySelector("main") || document.querySelector("article");
  if (mainContent) {
    const clone = mainContent.cloneNode(true) as HTMLElement;
    clone
      .querySelectorAll(
        'nav, header, footer, .comments, .reactions, [role="navigation"]',
      )
      .forEach((el) => el.remove());

    const cleanedHtml = cleanHtml(clone.innerHTML);
    const normalizedHtml = normalizeStructure(cleanedHtml);

    return turndownService.turndown(normalizedHtml);
  }

  return "";
}

function extractImages(): Array<{ src: string; alt: string }> {
  const images: Array<{ src: string; alt: string }> = [];

  const articleContainer = document.querySelector(
    ".feed-shared-inline-show-more-text, .article-body, main",
  );

  const relevantImages = articleContainer
    ? Array.from(articleContainer.querySelectorAll("img"))
    : Array.from(
        document.querySelectorAll(
          "article img, main img, .feed-shared-update img",
        ),
      );

  relevantImages.forEach((img) => {
    const src = img.getAttribute("src") || img.getAttribute("data-src") || "";
    const alt = img.getAttribute("alt") || "";

    if (
      src &&
      !src.includes("linkedin.com/spice") &&
      !src.includes("placeholder")
    ) {
      images.push({ src, alt });
    }
  });

  return images;
}

function extractTags(): string[] {
  const tags: string[] = [];

  const selectors = [
    ".article-tags__tag",
    ".feed-shared-article__tags",
    '[data-test-id="article-tags"]',
    ".topic-tag",
  ];

  for (const selector of selectors) {
    const elements = document.querySelectorAll<HTMLElement>(selector);
    elements.forEach((el) => {
      const tag = el.textContent?.trim();
      if (tag) {
        tags.push(tag);
      }
    });
  }

  if (tags.length > 0) {
    return tags;
  }

  const topicLinks = document.querySelectorAll('a[href*="/feed/tag/"]');
  topicLinks.forEach((link) => {
    const tag = link.textContent?.trim();
    if (tag && !tags.includes(tag)) {
      tags.push(tag);
    }
  });

  return tags;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function parseLinkedInArticle(): ArticleData {
  const title = extractTitle();
  const author = extractAuthor();
  const publishDate = extractPublishDate();
  const readingTime = extractReadingTime();
  const body = extractArticleBody();
  const images = extractImages();
  const tags = extractTags();

  if (!title) {
    throw new Error("Could not extract article title");
  }

  return {
    title,
    author: author?.name || "David Phillip",
    authorProfileUrl: author?.profileUrl || "",
    publishDate: publishDate || new Date().toISOString(),
    readingTime: readingTime || "5 min read",
    body,
    images,
    tags,
    slug: generateSlug(title),
    originalUrl: window.location.href,
  };
}
