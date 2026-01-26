import { ArticleData, ArticleMetadata, ImportResponse } from './types';
import { generateMarkdown, generateSlug } from './md-converter';

const API_BASE_URL = 'http://localhost:3001/api';

export async function importArticle(article: ArticleData): Promise<ImportResponse> {
  const markdown = generateMarkdown(article);
  const slug = generateSlug(article.title);

  const metadata: ArticleMetadata = {
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
  formData.append('metadata', JSON.stringify(metadata));
  
  const blob = new Blob([markdown], { type: 'text/markdown' });
  formData.append('file', blob, `${slug}.md`);

  try {
    const response = await fetch(`${API_BASE_URL}/articles/import`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to import article');
    }

    return await response.json();
  } catch (error) {
    console.error('[API] Error importing article:', error);
    throw error;
  }
}
