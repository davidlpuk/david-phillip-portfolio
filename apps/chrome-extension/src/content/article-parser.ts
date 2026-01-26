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

// Custom rule to keep images as HTML with 100% width and better formatting
turndownService.addRule('images', {
  filter: 'img',
  replacement: function (content, node) {
    const img = node as HTMLImageElement;
    const src = img.getAttribute('src') || img.getAttribute('data-src') || '';
    const alt = img.getAttribute('alt') || '';

    // Skip very small images, LinkedIn icons, or placeholder images
    if (src.includes('1x1') || src.includes('icon') || src.includes('emoji') || src.includes('spacer')) {
      return '';
    }

    // Ensure image URLs are absolute
    let absoluteSrc = src;
    if (src.startsWith('//')) {
      absoluteSrc = 'https:' + src;
    } else if (src.startsWith('/')) {
      absoluteSrc = 'https://www.linkedin.com' + src;
    }

    return `\n\n<img src="${absoluteSrc}" alt="${alt}" style="width: 100%; height: auto; border-radius: 8px; margin: 1.5rem 0;" />\n\n`;
  }
});

// Custom rule for links - clean up LinkedIn tracking URLs
turndownService.addRule('links', {
  filter: 'a',
  replacement: function (content, node) {
    const a = node as HTMLAnchorElement;
    const href = a.getAttribute('href') || '';
    const text = content.trim();

    // Skip empty links or LinkedIn tracking links
    if (!text || href.includes('linkedin.com/li/track') || href.includes('trackingId=')) {
      return text;
    }

    // Clean LinkedIn profile URLs
    let cleanHref = href;
    if (href.includes('linkedin.com/in/') && href.includes('?')) {
      cleanHref = href.split('?')[0];
    }

    return `[${text}](${cleanHref})`;
  }
});

function cleanHtml(html: string): string {
  try {
    if (!html || typeof html !== "string") {
      return "";
    }

    // Input validation and length limits
    if (html.length > 500000) {
      console.warn("[LinkedIn Article] HTML content too large, truncating");
      html = html.substring(0, 500000);
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const selectorsToRemove = [
      ".feed-shared-inline-show-more-text__see-more",
      ".feed-shared-reactions",
      ".feed-shared-comments",
      ".social-actions",
      ".analytics",
      ".article-poster",
      ".feed-shared-actor",
      ".feed-shared-control",
      ".reader-author-info__container",
      ".feed-shared-actor__image",
      ".feed-shared-actor__name",
      ".feed-shared-actor__sub-description",
      ".article-author-byline",
      ".update-components-actor",
      ".reader-author-info",
      ".reader-author-info__inner-container",
      ".reader-author-info__content",
      ".reader-author-info__author-lockup",
      ".reader-actions",
      ".mt4",
      '[role="button"]',
      '[data-test-id="see-more"]',
      '[data-test-id="article-author-name"]',
      '[data-test-id="article-publish-date"]',
      '[data-test-id="article-reading-time"]',
      "script",
      "style",
      "nav",
      "header",
      "footer",
      "iframe",
      "form",
      "input",
      "button",
      "select",
      "textarea",
      // Remove potentially malicious elements
      "object",
      "embed",
      "applet",
      "meta",
      "link[rel=\"import\"]",
    ];

    selectorsToRemove.forEach((selector) => {
      try {
        doc.querySelectorAll(selector).forEach((el) => el.remove());
      } catch (e) {
        console.warn("[LinkedIn Article] Error removing selector:", selector);
      }
    });

    // Remove all event handlers and JavaScript attributes
    doc.querySelectorAll("*").forEach((el) => {
      try {
        Array.from(el.attributes).forEach((attr) => {
          if (
            attr.name.startsWith("data-") ||
            attr.name.startsWith("aria-") ||
            attr.name.startsWith("on") ||
            attr.name === "href" && attr.value.startsWith("javascript:") ||
            attr.name === "src" && (attr.value.startsWith("javascript:") || attr.value.startsWith("data:"))
          ) {
            el.removeAttribute(attr.name);
          }
        });
      } catch (e) {
        // Ignore attribute errors
      }
    });

    // Clean up empty spans and other junk
    doc.querySelectorAll('span[class=""]').forEach((el) => {
      try {
        el.replaceWith(el.textContent || "");
      } catch (e) {
        // Ignore
      }
    });

    // Ensure output is safe
    const result = doc.body.innerHTML || "";
    if (result.length > 200000) {
      console.warn("[LinkedIn Article] Cleaned HTML still too large, truncating");
      return result.substring(0, 200000);
    }

    return result;
  } catch (error) {
    console.error("[LinkedIn Article] Error in cleanHtml:", error);
    // Return a safe fallback
    return html.replace(/<script[^>]*>.*?<\/script>/gi, "")
      .replace(/<style[^>]*>.*?<\/style>/gi, "")
      .replace(/javascript:/gi, "")
      .substring(0, 50000);
  }
}

function normalizeStructure(html: string): string {
  try {
    if (!html || typeof html !== "string") {
      return "";
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Remove empty paragraphs
    doc.querySelectorAll("p").forEach((p) => {
      try {
        if (p.textContent?.trim() === "") {
          p.remove();
        }
      } catch (e) {
        // Ignore
      }
    });

    // Clean up excessive br tags
    doc.querySelectorAll("br").forEach((br, index) => {
      try {
        if (index > 0 && br.previousSibling?.nodeType === Node.TEXT_NODE) {
          br.remove();
        }
      } catch (e) {
        // Ignore
      }
    });

    // Ensure proper spacing between block elements for markdown conversion
    const blockElements = doc.querySelectorAll("p, h1, h2, h3, h4, h5, h6, ul, ol, blockquote, div");
    blockElements.forEach((element, index) => {
      try {
        if (index < blockElements.length - 1) {
          const nextElement = blockElements[index + 1];
          // Add spacing between block elements if not already present
          if (element.nextSibling !== nextElement && !element.nextSibling?.textContent?.trim()) {
            element.after(document.createTextNode("\n\n"));
          }
        }
      } catch (e) {
        // Ignore
      }
    });

    return doc.body.innerHTML || "";
  } catch (error) {
    console.error("[LinkedIn Article] Error in normalizeStructure:", error);
    return html;
  }
}

function extractTitle(): string | null {
  const selectors = [
    "h1.text-heading-xlarge",
    'h1[data-test-id="article-title"]',
    ".article-title",
    "article h1",
    ".feed-shared-inline-show-more-text h2",
    "h1",
  ];

  for (const selector of selectors) {
    try {
      const element = document.querySelector<HTMLElement>(selector);
      if (element) {
        return element.textContent?.trim() || null;
      }
    } catch (e) {
      // Continue to next selector
    }
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
    try {
      const element = document.querySelector<HTMLElement>(selector);
      if (element) {
        const profileLink = element.closest("a");
        return {
          name: element.textContent?.trim() || "Unknown",
          profileUrl: profileLink?.href || "",
        };
      }
    } catch (e) {
      // Continue
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
    try {
      const element = document.querySelector<HTMLElement>(selector);
      if (element) {
        return (
          element.getAttribute("datetime") ||
          element.textContent?.trim() ||
          null
        );
      }
    } catch (e) {
      // Continue
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
    try {
      const element = document.querySelector<HTMLElement>(selector);
      if (element) {
        return element.textContent?.trim() || null;
      }
    } catch (e) {
      // Continue
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
    ".article-content",
    ".main-content",
  ];

  for (const selector of selectors) {
    try {
      const element = document.querySelector<HTMLElement>(selector);
      if (element && element.innerHTML.trim()) {
        console.log(
          "[LinkedIn Article] Found content with selector:",
          selector,
        );
        const clone = element.cloneNode(true) as HTMLElement;

        clone
          .querySelectorAll(".feed-shared-inline-show-more-text__see-more")
          .forEach((btn) => btn.remove());

        const cleanedHtml = cleanHtml(clone.innerHTML);
        const normalizedHtml = normalizeStructure(cleanedHtml);

        if (normalizedHtml.trim()) {
          return turndownService.turndown(normalizedHtml);
        }
      }
    } catch (error) {
      console.warn("[LinkedIn Article] Error with selector:", selector, error);
    }
  }

  console.log("[LinkedIn Article] Trying main/article fallback");
  const mainContent =
    document.querySelector("main") || document.querySelector("article");
  if (mainContent) {
    try {
      const clone = mainContent.cloneNode(true) as HTMLElement;
      clone
        .querySelectorAll(
          'nav, header, footer, .comments, .reactions, [role="navigation"], .feed-shared-actor, .social-actions',
        )
        .forEach((el) => el.remove());

      const cleanedHtml = cleanHtml(clone.innerHTML);
      const normalizedHtml = normalizeStructure(cleanedHtml);

      if (normalizedHtml.trim()) {
        return turndownService.turndown(normalizedHtml);
      }
    } catch (error) {
      console.error("[LinkedIn Article] Error in fallback:", error);
    }
  }

  console.log("[LinkedIn Article] No content found, returning empty string");
  return "";
}

function extractImages(): Array<{ src: string; alt: string }> {
  const images: Array<{ src: string; alt: string }> = [];

  try {
    const articleContainer = document.querySelector(
      ".feed-shared-inline-show-more-text, .article-body, main, article",
    );

    const relevantImages = articleContainer
      ? Array.from(articleContainer.querySelectorAll("img"))
      : Array.from(
        document.querySelectorAll(
          "article img, main img, .feed-shared-update img",
        ),
      );

    relevantImages.forEach((img) => {
      try {
        const src =
          img.getAttribute("src") || img.getAttribute("data-src") || "";
        const alt = img.getAttribute("alt") || "";

        if (
          src &&
          !src.includes("linkedin.com/spice") &&
          !src.includes("placeholder") &&
          src.startsWith("http")
        ) {
          images.push({ src, alt });
        }
      } catch (e) {
        // Ignore image errors
      }
    });
  } catch (error) {
    console.warn("[LinkedIn Article] Error extracting images:", error);
  }

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
    try {
      const elements = document.querySelectorAll<HTMLElement>(selector);
      elements.forEach((el) => {
        const tag = el.textContent?.trim();
        if (tag) {
          tags.push(tag);
        }
      });
    } catch (e) {
      // Continue
    }
  }

  if (tags.length > 0) {
    return tags;
  }

  try {
    const topicLinks = document.querySelectorAll('a[href*="/feed/tag/"]');
    topicLinks.forEach((link) => {
      const tag = link.textContent?.trim();
      if (tag && !tags.includes(tag)) {
        tags.push(tag);
      }
    });
  } catch (e) {
    // Ignore
  }

  return tags;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function parseLinkedInArticle(): ArticleData {
  console.log("[LinkedIn Article] Starting parse...");

  const title = extractTitle();
  console.log("[LinkedIn Article] Title:", title);

  const author = extractAuthor();
  const publishDate = extractPublishDate();
  const readingTime = extractReadingTime();
  const body = extractArticleBody();
  console.log("[LinkedIn Article] Body length:", body.length);
  const images = extractImages();
  const tags = extractTags();

  if (!title) {
    console.log("[LinkedIn Article] No title found");
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
