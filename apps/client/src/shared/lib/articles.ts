import type {
  Article,
  ArticleMetadata,
  ArticleFrontmatter,
} from "@/shared/types/article";

const articlesCache = new Map<string, Article | ArticleMetadata[]>();

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function parseFrontmatter(frontmatterStr: string): ArticleFrontmatter {
  const data: any = {};
  const lines = frontmatterStr.trim().split('\n');
  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      let parsedValue: any = value;
      if (value.startsWith('"') && value.endsWith('"')) {
        parsedValue = value.slice(1, -1);
      } else if (value === 'true') {
        parsedValue = true;
      } else if (value === 'false') {
        parsedValue = false;
      } else if (!isNaN(Number(value))) {
        parsedValue = Number(value);
      }
      data[key.trim()] = parsedValue;
    }
  }
  return data as ArticleFrontmatter;
}

function parseArticle(
  id: string,
  slug: string,
  rawContent: string,
  includeContent = false,
): Article | ArticleMetadata {
  const parts = rawContent.split('---');
  let frontmatterStr = '';
  let content = '';
  if (parts.length >= 3) {
    frontmatterStr = parts[1];
    content = parts.slice(2).join('---').trim();
  } else {
    // No frontmatter, assume all is content
    content = rawContent;
  }

  const data = parseFrontmatter(frontmatterStr);

  const base = {
    id,
    slug: data.slug || slug,
    title: data.title,
    excerpt: data.excerpt,
    category: data.category,
    date: data.date,
    formattedDate: formatDate(data.date),
    readTime: data.readTime || 5,
    thumbnail: data.thumbnail,
    featured: data.featured || false,
    status: data.status || 'published',
  };

  if (includeContent) {
    return {
      ...base,
      content,
    } as Article;
  }

  return base as ArticleMetadata;
}

const articleModules = import.meta.glob("../articles/*.md", { eager: true });

type ArticleModule = { default: string };

async function loadArticleContent(slug: string): Promise<string | null> {
  const path = `../articles/${slug}.md`;
  const matchedPath = Object.keys(articleModules).find((p) =>
    p.endsWith(`/${slug}.md`),
  );

  if (!matchedPath) {
    return null;
  }

  const module = articleModules[matchedPath] as ArticleModule;
  return module.default;
}

export async function getAllArticles(includeDrafts = false): Promise<ArticleMetadata[]> {
  const cacheKey = includeDrafts ? "all-articles-admin" : "all-articles";
  if (articlesCache.has(cacheKey)) {
    return articlesCache.get(cacheKey) as ArticleMetadata[];
  }

  try {
    const articles: ArticleMetadata[] = [];

    for (const path of Object.keys(articleModules)) {
      try {
        const slug = path.split("/").pop()?.replace(".md", "") || "";
        const content = await loadArticleContent(slug);
        if (content) {
          const article = parseArticle(path, slug, content, false);
          if (includeDrafts || article.status === 'published') {
            articles.push(article);
          }
        }
      } catch (error) {
        console.error(`Failed to load article at ${path}:`, error);
      }
    }

    const sorted = articles.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    articlesCache.set(cacheKey, sorted);
    return sorted;
  } catch (error) {
    console.error("Failed to load articles:", error);
    return [];
  }
}

export async function getArticle(slug: string): Promise<Article | null> {
  const cacheKey = `article-${slug}`;
  if (articlesCache.has(cacheKey)) {
    return articlesCache.get(cacheKey) as Article;
  }

  try {
    // First try to load from src/articles/ (bundled articles)
    const content = await loadArticleContent(slug);
    if (content) {
      const path = `../articles/${slug}.md`;
      const article = parseArticle(path, slug, content, true) as Article;
      articlesCache.set(cacheKey, article);
      return article;
    }

    // If not found, try to load from server (public/articles/)
    try {
      const response = await fetch(`http://localhost:3001/api/articles/published/${slug}`);
      if (response.ok) {
        const data = await response.json();
        if (data.markdown) {
          const article: Article = {
            id: data.slug,
            slug: data.slug,
            title: data.title,
            excerpt: data.excerpt || data.title,
            category: data.category || 'Article',
            date: data.date,
            formattedDate: formatDate(data.date),
            readTime: data.readingTime || 5,
            thumbnail: data.thumbnail || null,
            featured: data.featured || false,
            status: 'published',
            content: data.markdown,
          };
          articlesCache.set(cacheKey, article);
          return article;
        }
      }
    } catch (serverError) {
      console.warn(`Failed to load article ${slug} from server:`, serverError);
    }

    return null;
  } catch (error) {
    console.error(`Failed to load article ${slug}:`, error);
    return null;
  }
}

export async function getAllArticlesAdmin(): Promise<ArticleMetadata[]> {
  try {
    // Get regular articles (including drafts from src/articles/)
    const regularArticles = await getAllArticles(true);

    // Get drafts from the server API (Chrome extension imports)
    const draftsResponse = await fetch('http://localhost:3001/api/articles/drafts');
    let draftArticles: ArticleMetadata[] = [];
    if (draftsResponse.ok) {
      const draftsData = await draftsResponse.json();
      draftArticles = draftsData.drafts.map((draft: any) => ({
        id: draft.slug,
        slug: draft.slug,
        title: draft.title,
        excerpt: draft.excerpt || draft.title,
        category: draft.tags?.[0] || 'Imported',
        date: draft.importedAt || draft.publishDate,
        formattedDate: formatDate(draft.importedAt || draft.publishDate),
        readTime: draft.readingTime || 5,
        thumbnail: null,
        featured: false,
        status: draft.status || 'draft',
      }));
    }

    // Get published articles from client/public/articles/
    const publishedResponse = await fetch('http://localhost:3001/api/articles/published');
    let publishedArticles: ArticleMetadata[] = [];
    if (publishedResponse.ok) {
      const publishedData = await publishedResponse.json();
      publishedArticles = publishedData.articles.map((article: any) => ({
        id: article.slug,
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt || article.title,
        category: article.category || 'Article',
        date: article.date,
        formattedDate: formatDate(article.date),
        readTime: article.readingTime || 5,
        thumbnail: null,
        featured: article.featured || false,
        status: 'published',
      }));
    }

    // Combine regular articles, drafts, and published articles
    const allArticles = [...regularArticles, ...draftArticles, ...publishedArticles];

    // Sort by date (newest first)
    return allArticles.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  } catch (error) {
    console.warn('Failed to load articles from server, using regular articles only:', error);
    return getAllArticles(true);
  }
}

export async function getFeaturedArticles(
  limit = 2,
): Promise<ArticleMetadata[]> {
  const all = await getAllArticles();
  return all.filter((a) => a.featured).slice(0, limit);
}

export async function getArticlesByCategory(
  category: string,
): Promise<ArticleMetadata[]> {
  const all = await getAllArticles();
  return all.filter((a) => a.category.toLowerCase() === category.toLowerCase());
}

export function clearArticlesCache(): void {
  articlesCache.clear();
}
