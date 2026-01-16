import { ArticleData } from "./types";

export function generateMarkdown(article: ArticleData): string {
  const { title, author, publishDate, readingTime, body, tags, originalUrl } =
    article;

  const date = new Date(publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
author: "${author}"
publishDate: "${date}"
readingTime: "${readingTime}"
tags: [${tags.map((t) => `"${t}"`).join(", ")}]
originalUrl: "${originalUrl}"
---

`;

  const header = `# ${title}

*By ${author} | ${date} | ${readingTime}*

${tags.length > 0 ? `\n**Tags:** ${tags.map((t) => `\`${t}\``).join(" ")}\n` : ""}

---

${body}

---

*Originally published on LinkedIn. [View original](${originalUrl})*
`;

  return postProcessMarkdown(frontmatter + header);
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function postProcessMarkdown(markdown: string): string {
  let result = markdown;

  result = removeExcessiveNewlines(result);
  result = normalizeListSpacing(result);
  result = normalizeHeaderSpacing(result);
  result = normalizeCodeBlocks(result);
  result = fixListMarkers(result);
  result = normalizeBlockquotes(result);
  result = normalizeLinks(result);
  result = trimTrailingWhitespace(result);

  return result.trim();
}

function removeExcessiveNewlines(markdown: string): string {
  return markdown.replace(/\n{4,}/g, "\n\n\n").replace(/(\n\n)\n+(?=#)/g, "$1");
}

function normalizeListSpacing(markdown: string): string {
  return markdown
    .replace(/(\n[-*+]\s)/g, "\n$1")
    .replace(/(\n\s{2,}[-*+]\s)/g, "\n$1")
    .replace(/(\n[-*+]\s.*)\n\n(?=\n[-*+]\s)/g, "$1\n");
}

function normalizeHeaderSpacing(markdown: string): string {
  return markdown
    .replace(/(#{1,6}\s.+)\n{2,}(?=#{1,6}\s)/g, "$1\n")
    .replace(/(#{1,6}\s.+)\n+(?=[^*])/g, "$1\n\n");
}

function normalizeCodeBlocks(markdown: string): string {
  return markdown
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const trimmedCode = code.trim();
      return `\`\`\`${lang}\n${trimmedCode}\n\`\`\``;
    })
    .replace(/`([^`]+)`/g, (_, code) => {
      return `\`${code.trim()}\``;
    });
}

function fixListMarkers(markdown: string): string {
  return markdown
    .replace(/^\*\s+/gm, "- ")
    .replace(/^\+\s+/gm, "- ")
    .replace(/^-\s+/gm, "- ");
}

function normalizeBlockquotes(markdown: string): string {
  return markdown
    .replace(/>\s*>\s*/g, ">")
    .replace(/>\s*\n/g, ">\n")
    .replace(/(>{1,6}\s)([^\n>]+)/g, (_, marker, content) => {
      return `${marker}${content.trim()}`;
    });
}

function normalizeLinks(markdown: string): string {
  return markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
    const trimmedText = text.trim();
    const trimmedUrl = url.trim();
    return `[${trimmedText}](${trimmedUrl})`;
  });
}

function trimTrailingWhitespace(markdown: string): string {
  return markdown
    .split("\n")
    .map((line) => line.replace(/\s+$/, ""))
    .join("\n");
}
