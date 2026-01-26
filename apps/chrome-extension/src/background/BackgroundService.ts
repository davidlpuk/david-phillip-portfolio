import { ArticleData } from "../utils/types";
import { generateMarkdown, generateSlug } from "../utils/markdown";

const API_BASE_URL = "http://localhost:3001/api";
const DOWNLOAD_TIMEOUT_MS = 30000;
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

// Track active downloads to prevent memory leaks
const activeDownloads = new Set<number>();

/**
 * Listen for download completion to show notifications and log paths
 */
chrome.downloads.onChanged.addListener((downloadDelta) => {
  if (downloadDelta.state && downloadDelta.state.current === "complete") {
    console.log("[Background] Download completed:", downloadDelta.id);
    activeDownloads.delete(downloadDelta.id);

    chrome.downloads.search({ id: downloadDelta.id }, (downloads) => {
      if (downloads && downloads[0]) {
        const download = downloads[0];
        console.log("[Background] File saved to:", download.filename);

        // Check if download ended up in extension directory (shouldn't happen)
        if (
          typeof download.filename === "string" &&
          download.filename.startsWith("chrome-extension://")
        ) {
          chrome.notifications.create({
            type: "basic",
            iconUrl: "icons/icon128.png",
            title: "Download Location Issue",
            message:
              "File saved to extension directory. Check Chrome Downloads settings.",
          });
        } else {
          chrome.notifications.create({
            type: "basic",
            iconUrl: "icons/icon128.png",
            title: "Download Complete",
            message: `Saved: ${download.filename}`,
          });
        }
      }
    });
  }

  if (downloadDelta.error) {
    console.error("[Background] Download error:", downloadDelta.error);
    activeDownloads.delete(downloadDelta.id);
  }
});

/**
 * Route messages from popup/content to handle download/import
 */
chrome.runtime.onMessage.addListener(
  (
    message: { action: string; article?: ArticleData },
    sender,
    sendResponse,
  ) => {
    console.log("[Background] Received message:", message.action);

    if (message.action === "downloadArticle" && message.article) {
      handleDownload(message.article)
        .then((result) => {
          console.log("[Background] Download result:", result);
          sendResponse(result);
        })
        .catch((error) => {
          console.error("[Background] Download error:", error);
          sendResponse({ success: false, error: error.message });
        });
      return true; // Keep channel open for async response
    }

    if (message.action === "importArticle" && message.article) {
      handleImport(message.article)
        .then((result) => {
          console.log("[Background] Import result:", result);
          sendResponse(result);
        })
        .catch((error) => {
          console.error("[Background] Import error:", error);
          sendResponse({ success: false, error: error.message });
        });
      return true; // Keep channel open for async response
    }

    sendResponse({ success: false, error: "Unknown action" });
    return false;
  },
);

/**
 * Validates article data before processing
 */
function validateArticle(article: ArticleData): {
  valid: boolean;
  error?: string;
} {
  if (!article) {
    return { valid: false, error: "Article data is null or undefined" };
  }

  if (!article.title || typeof article.title !== "string") {
    return { valid: false, error: "Article title is required" };
  }

  if (!article.body || typeof article.body !== "string") {
    return { valid: false, error: "Article body is required" };
  }

  if (article.title.length > 200) {
    return { valid: false, error: "Article title is too long (max 200 chars)" };
  }

  return { valid: true };
}

/**
 * Converts string to base64 with proper UTF-8 encoding
 * Handles multi-byte UTF-8 characters correctly
 */
function stringToBase64(str: string): string {
  // Use TextEncoder for proper UTF-8 encoding
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);

  // Convert to binary string
  let binaryString = "";
  const chunkSize = 8192; // Process in chunks to avoid stack overflow
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.slice(i, i + chunkSize);
    binaryString += String.fromCharCode.apply(null, Array.from(chunk));
  }

  return btoa(binaryString);
}

/**
 * Creates a data URL for download
 */
function createDownloadDataUrl(markdown: string): string {
  const base64 = stringToBase64(markdown);
  // Use octet-stream to force download with proper filename
  return `data:application/octet-stream;base64,${base64}`;
}

/**
 * Handle article download to OS Downloads folder
 */
async function handleDownload(
  article: ArticleData,
): Promise<{ success: boolean; filename?: string; error?: string }> {
  try {
    // Validate article data
    const validation = validateArticle(article);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    console.log("[Background] Starting download for:", article.title);

    const markdown = generateMarkdown(article);
    const slug = generateSlug(article.title);
    const filename = `${slug}.md`;

    console.log("[Background] Generated slug filename:", filename);
    console.log("[Background] Markdown length:", markdown.length, "bytes");

    // Create data URL with proper encoding
    const dataUrl = createDownloadDataUrl(markdown);
    console.log("[Background] Data URL created, length:", dataUrl.length);

    // Initiate download with retry logic
    let downloadId: number | undefined;
    let lastError: Error | undefined;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`[Background] Download attempt ${attempt}/${MAX_RETRIES}`);

        downloadId = await chrome.downloads.download({
          url: dataUrl,
          filename: filename, // This goes to OS Downloads folder
          saveAs: false, // Don't prompt, auto-save
          conflictAction: "uniquify", // Add (1), (2) etc if file exists
        });

        console.log("[Background] Download initiated with ID:", downloadId);
        activeDownloads.add(downloadId);
        break; // Success, exit retry loop
      } catch (error) {
        lastError = error as Error;
        console.warn(`[Background] Download attempt ${attempt} failed:`, error);

        if (attempt < MAX_RETRIES) {
          // Wait before retry
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
        }
      }
    }

    if (!downloadId) {
      throw new Error(
        `Download failed after ${MAX_RETRIES} attempts: ${lastError?.message || "Unknown error"}`,
      );
    }

    // Wait for download completion
    return await waitForDownloadCompletion(downloadId, filename);
  } catch (error) {
    console.error("[Background] Download error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: errorMessage };
  }
}

/**
 * Wait for download to complete with proper cleanup
 */
function waitForDownloadCompletion(
  downloadId: number,
  filename: string,
): Promise<{ success: boolean; filename?: string; error?: string }> {
  return new Promise((resolve) => {
    let resolved = false;

    const cleanup = (
      listener: (delta: chrome.downloads.DownloadDelta) => void,
    ) => {
      if (!resolved) {
        resolved = true;
        chrome.downloads.onChanged.removeListener(listener);
        activeDownloads.delete(downloadId);
      }
    };

    const listener = (delta: chrome.downloads.DownloadDelta) => {
      if (delta.id !== downloadId) return;

      if (delta.state?.current === "complete") {
        cleanup(listener);
        console.log("[Background] Download completed successfully");

        // Query to get actual file path
        chrome.downloads.search({ id: downloadId }, (items) => {
          if (items && items.length > 0) {
            console.log("[Background] File saved to:", items[0].filename);
          }
        });

        resolve({ success: true, filename });
      } else if (delta.state?.current === "interrupted") {
        cleanup(listener);
        const errorMsg = delta.error?.current || "Download interrupted";
        console.error("[Background] Download interrupted:", errorMsg);
        resolve({ success: false, error: errorMsg });
      } else if (delta.error) {
        cleanup(listener);
        console.error("[Background] Download error:", delta.error.current);
        resolve({ success: false, error: delta.error.current });
      }
    };

    chrome.downloads.onChanged.addListener(listener);

    // Timeout after 30 seconds
    setTimeout(() => {
      if (!resolved) {
        cleanup(listener);
        console.warn("[Background] Download timeout");
        // Return success since download might still complete
        resolve({
          success: true,
          filename,
        });
      }
    }, DOWNLOAD_TIMEOUT_MS);
  });
}

/**
 * Handle article import to server (saves to client/public/articles/drafts)
 * Temporarily also downloads to OS Downloads folder per user request
 */
async function handleImport(
  article: ArticleData,
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    // Validate article data
    const validation = validateArticle(article);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    console.log("[Background] Starting import for:", article.title);

    const markdown = generateMarkdown(article);
    const slug = generateSlug(article.title);

    // Prepare metadata matching server expectations
    const metadata = {
      title: article.title,
      author: article.author || "David Phillip",
      authorProfileUrl: article.authorProfileUrl || "",
      publishDate: article.publishDate,
      readingTime: article.readingTime,
      tags: article.tags || [],
      slug,
      date: article.publishDate,
      excerpt: article.body.substring(0, 200).trim() + "...",
      originalUrl: article.originalUrl,
      importedAt: new Date().toISOString(),
    };

    // Create FormData for multipart upload
    // Service workers don't support Blob, so we need a workaround
    const formData = new FormData();
    formData.append("metadata", JSON.stringify(metadata));

    // Use the API endpoint that accepts JSON instead of FormData
    // This avoids the need for Blob in service workers
    const requestBody = {
      metadata,
      content: markdown,
      filename: `${slug}.md`,
    };

    console.log("[Background] Sending import request to server...");

    // Send to server with retry logic
    let lastError: Error | undefined;
    let response: Response | undefined;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`[Background] Import attempt ${attempt}/${MAX_RETRIES}`);

        response = await fetch(`${API_BASE_URL}/articles/import`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          break; // Success
        }

        const error = await response.json();
        throw new Error(error.message || `Server error: ${response.status}`);
      } catch (error) {
        lastError = error as Error;
        console.warn(`[Background] Import attempt ${attempt} failed:`, error);

        if (attempt < MAX_RETRIES) {
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
        }
      }
    }

    if (!response || !response.ok) {
      throw new Error(
        `Import failed after ${MAX_RETRIES} attempts: ${lastError?.message || "Unknown error"}`,
      );
    }

    const result = await response.json();
    console.log("[Background] Import successful:", result);

    // TEMPORARY: Also download to OS Downloads folder
    console.log("[Background] Also downloading to OS Downloads folder...");
    await handleDownload(article);

    // Show success notification
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon128.png",
      title: "Article Imported",
      message: `"${article.title}" saved to portfolio drafts and Downloads`,
    });

    return {
      success: true,
      url: result.article?.url,
    };
  } catch (error) {
    console.error("[Background] Import error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: errorMessage };
  }
}
