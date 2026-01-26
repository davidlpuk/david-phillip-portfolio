/**
 * Chrome Extension Type Definitions
 * Type-safe interfaces for Chrome extension APIs
 */

export interface ChromeMessage {
  action: string;
  article?: ArticleData;
  [key: string]: any;
}

export interface ChromeDownloadResult {
  id: number;
  filename?: string;
  url?: string;
  error?: string;
}

export interface ArticleData {
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

export interface ArticleMetadata {
  title: string;
  author: string;
  authorProfileUrl: string;
  publishDate: string;
  readingTime: string;
  tags: string[];
  slug: string;
  originalUrl: string;
  importedAt: string;
}

export interface ImportResponse {
  success: boolean;
  article?: {
    slug: string;
    url: string;
    localPath: string;
  };
  error?: string;
}

export interface DownloadResponse {
  success: boolean;
  filename?: string;
  error?: string;
}

export interface ImportRequestResponse {
  success: boolean;
  url?: string;
  error?: string;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export interface DownloadProgress {
  downloadId: number;
  state: "in_progress" | "complete" | "interrupted";
  bytesReceived?: number;
  totalBytes?: number;
  filename?: string;
}

export interface NotificationOptions {
  type: chrome.notifications.TemplateType;
  iconUrl: string;
  title: string;
  message: string;
}

export interface ExtensionStorage {
  settings: {
    autoImport: boolean;
    defaultDownloadLocation: string;
    notificationsEnabled: boolean;
  };
  history: Array<{
    id: string;
    timestamp: number;
    title: string;
    url: string;
    action: "download" | "import";
  }>;
}
