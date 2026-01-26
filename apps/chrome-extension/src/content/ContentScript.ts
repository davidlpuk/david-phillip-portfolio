import { ArticleData } from "../utils/types";
import { parseLinkedInArticle } from "./article-parser";

console.log("[LinkedIn Article to Markdown] Content script loaded");

function isLinkedInArticlePage(): boolean {
  const url = window.location.href;
  return url.includes("/feed/update/") || url.includes("/pulse/");
}

async function extractArticle(): Promise<ArticleData | null> {
  if (!isLinkedInArticlePage()) {
    return null;
  }

  try {
    const article = parseLinkedInArticle();
    return article;
  } catch (error) {
    console.error(
      "[LinkedIn Article to Markdown] Error parsing article:",
      error,
    );
    return null;
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "extractArticle") {
    extractArticle().then((article) => {
      sendResponse({ success: true, article });
    });
    return true;
  }
});

export {};
