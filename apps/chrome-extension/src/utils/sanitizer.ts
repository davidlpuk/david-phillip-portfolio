/**
 * Content Sanitization and Validation Utilities
 * Ensures safe handling of user-generated content
 */

export interface SanitizationOptions {
  allowedTags?: string[];
  allowedAttributes?: { [tag: string]: string[] };
  maxLength?: number;
  removeScripts?: boolean;
  removeStyles?: boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Sanitizes HTML content by removing dangerous elements and attributes
 */
export function sanitizeHtml(
  html: string,
  options: SanitizationOptions = {},
): string {
  const {
    allowedTags = [
      "p",
      "br",
      "strong",
      "em",
      "ul",
      "ol",
      "li",
      "a",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "blockquote",
      "code",
      "pre",
    ],
    allowedAttributes = {
      a: ["href", "title"],
      img: ["src", "alt", "title"],
    },
    maxLength = 500000,
    removeScripts = true,
    removeStyles = true,
  } = options;

  if (!html || typeof html !== "string") {
    return "";
  }

  if (html.length > maxLength) {
    console.warn(
      `[Sanitization] Content too large (${html.length} chars), truncating to ${maxLength}`,
    );
    html = html.substring(0, maxLength);
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Remove dangerous elements
    const dangerousSelectors = [
      "script",
      "style",
      "iframe",
      "object",
      "embed",
      "applet",
      "form",
      "input",
      "textarea",
      "select",
      "button",
      "meta",
      'link[rel="import"]',
      "[onclick]",
      "[onerror]",
      "[onload]",
      "javascript:",
      "data:text/html",
    ];

    dangerousSelectors.forEach((selector) => {
      try {
        const elements = doc.querySelectorAll(selector);
        elements.forEach((el) => el.remove());
      } catch (e) {
        console.warn(`[Sanitization] Error removing selector ${selector}:`, e);
      }
    });

    // Remove event handlers and dangerous attributes
    doc.querySelectorAll("*").forEach((el) => {
      const attributesToRemove: string[] = [];

      el.getAttributeNames().forEach((attr) => {
        const lowerAttr = attr.toLowerCase();

        // Remove event handlers
        if (lowerAttr.startsWith("on")) {
          attributesToRemove.push(attr);
          return;
        }

        // Remove javascript: URLs
        const attrValue = el.getAttribute(attr);
        if (attrValue && typeof attrValue === "string") {
          if (
            attrValue.toLowerCase().startsWith("javascript:") ||
            attrValue.includes("data:text/html")
          ) {
            attributesToRemove.push(attr);
            return;
          }
        }

        // Remove data-* attributes (except data-*)
        if (lowerAttr.startsWith("data-")) {
          attributesToRemove.push(attr);
          return;
        }
      });

      attributesToRemove.forEach((attr) => el.removeAttribute(attr));
    });

    // Clean up empty elements
    doc.querySelectorAll("p:empty, div:empty, span:empty").forEach((el) => {
      el.remove();
    });

    return doc.body.innerHTML || "";
  } catch (error) {
    console.error("[Sanitization] Error sanitizing HTML:", error);
    // Fallback: remove script tags and return
    return html
      .replace(/<script[^>]*>.*?<\/script>/gis, "")
      .replace(/<style[^>]*>.*?<\/style>/gis, "")
      .replace(/javascript:/gi, "")
      .substring(0, maxLength);
  }
}

/**
 * Validates article data
 */
export function validateArticleData(article: any): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required fields
  if (!article) {
    errors.push("Article data is null or undefined");
    return { valid: false, errors, warnings };
  }

  if (!article.title || typeof article.title !== "string") {
    errors.push("Article title is required and must be a string");
  } else {
    if (article.title.trim().length === 0) {
      errors.push("Article title cannot be empty");
    }
    if (article.title.length > 200) {
      warnings.push(
        "Article title is very long (max 200 characters recommended)",
      );
    }
  }

  if (!article.body || typeof article.body !== "string") {
    errors.push("Article body is required and must be a string");
  } else {
    if (article.body.trim().length === 0) {
      errors.push("Article body cannot be empty");
    }
    if (article.body.length > 1000000) {
      warnings.push("Article body is very large (max 1MB recommended)");
    }
  }

  if (!article.author || typeof article.author !== "string") {
    warnings.push("Article author is missing");
  }

  if (!article.originalUrl || typeof article.originalUrl !== "string") {
    warnings.push("Article original URL is missing");
  } else {
    try {
      new URL(article.originalUrl);
    } catch {
      errors.push("Article original URL is not a valid URL");
    }
  }

  // Check publish date format
  if (article.publishDate && typeof article.publishDate === "string") {
    try {
      const date = new Date(article.publishDate);
      if (isNaN(date.getTime())) {
        warnings.push("Article publish date is not a valid date");
      }
    } catch {
      warnings.push("Article publish date is invalid");
    }
  }

  // Check tags
  if (article.tags && !Array.isArray(article.tags)) {
    warnings.push("Article tags should be an array");
  }

  // Check images
  if (article.images && !Array.isArray(article.images)) {
    warnings.push("Article images should be an array");
  } else if (article.images) {
    article.images.forEach((img: any, index: number) => {
      if (!img.src || typeof img.src !== "string") {
        warnings.push(`Image ${index} is missing src attribute`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Sanitizes a URL to prevent XSS
 */
export function sanitizeUrl(url: string): string {
  if (!url || typeof url !== "string") {
    return "";
  }

  try {
    const parsed = new URL(url);

    // Prevent javascript: and data: URLs
    if (parsed.protocol === "javascript:" || parsed.protocol === "data:") {
      console.warn(
        `[Sanitization] Blocked dangerous URL protocol: ${parsed.protocol}`,
      );
      return "";
    }

    // Allow only safe protocols
    const safeProtocols = ["http:", "https:", "mailto:", "tel:"];
    if (!safeProtocols.includes(parsed.protocol)) {
      console.warn(
        `[Sanitization] Blocked unsafe protocol: ${parsed.protocol}`,
      );
      return "";
    }

    return parsed.href;
  } catch {
    console.warn(`[Sanitization] Invalid URL: ${url}`);
    return "";
  }
}

/**
 * Sanitizes markdown content
 */
export function sanitizeMarkdown(markdown: string): string {
  if (!markdown || typeof markdown !== "string") {
    return "";
  }

  try {
    // Remove potential script tags in HTML within markdown
    let sanitized = markdown.replace(/<script[^>]*>.*?<\/script>/gis, "");
    sanitized = sanitized.replace(/javascript:/gi, "");
    sanitized = sanitized.replace(/data:text\/html/gi, "");

    // Remove excessive whitespace
    sanitized = sanitized.replace(/\n{4,}/g, "\n\n\n");

    return sanitized;
  } catch (error) {
    console.error("[Sanitization] Error sanitizing markdown:", error);
    return markdown;
  }
}

/**
 * Truncates text to a maximum length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || typeof text !== "string") {
    return "";
  }

  if (text.length <= maxLength) {
    return text;
  }

  // Try to break at a word boundary
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace > maxLength * 0.7) {
    return truncated.substring(0, lastSpace) + "...";
  }

  return truncated + "...";
}
