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
