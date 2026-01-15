interface ArticleData {
  title: string;
  author: string;
  authorProfileUrl: string;
  publishDate: string;
  readingTime: string;
  body: string;
  images: Array<{ src: string; alt: string }>;
  tags: string[];
  slug: string;
  originalUrl: string;
}

function generateMarkdown(article: ArticleData): string {
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

  return frontmatter + header;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const API_BASE_URL = "http://localhost:3001/api";

chrome.runtime.onMessage.addListener(
  (
    message: { action: string; article: ArticleData },
    sender: any,
    sendResponse: (response: any) => void,
  ) => {
    if (message.action === "downloadArticle") {
      handleDownload(message.article)
        .then((result) => sendResponse(result))
        .catch((error) =>
          sendResponse({ success: false, error: error.message }),
        );
      return true;
    }

    if (message.action === "importArticle") {
      handleImport(message.article)
        .then((result) => sendResponse(result))
        .catch((error) =>
          sendResponse({ success: false, error: error.message }),
        );
      return true;
    }
  },
);

async function handleDownload(
  article: ArticleData,
): Promise<{ success: boolean; filename?: string; error?: string }> {
  try {
    const markdown = generateMarkdown(article);
    const slug = generateSlug(article.title);
    const filename = `${slug}.md`;

    const blob = new Blob([markdown], { type: "text/markdown" });

    await chrome.downloads.download({
      url: URL.createObjectURL(blob),
      filename: filename,
      saveAs: true,
    });

    return { success: true, filename };
  } catch (error) {
    console.error("[Background] Download error:", error);
    return { success: false, error: (error as Error).message };
  }
}

async function handleImport(
  article: ArticleData,
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const markdown = generateMarkdown(article);
    const slug = generateSlug(article.title);

    const metadata = {
      title: article.title,
      author: article.author,
      authorProfileUrl: article.authorProfileUrl,
      publishDate: article.publishDate,
      readingTime: article.readingTime,
      tags: article.tags,
      slug,
      originalUrl: article.originalUrl,
      importedAt: new Date().toISOString(),
    };

    const formData = new FormData();
    formData.append("metadata", JSON.stringify(metadata));

    const blob = new Blob([markdown], { type: "text/markdown" });
    formData.append("file", blob, `${slug}.md`);

    const response = await fetch(`${API_BASE_URL}/articles/import`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to import article");
    }

    const result = await response.json();

    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon128.png",
      title: "Article Imported",
      message: `"${article.title}" has been saved to your drafts`,
    });

    return { success: true, url: result.article?.url };
  } catch (error) {
    console.error("[Background] Import error:", error);
    return { success: false, error: (error as Error).message };
  }
}
