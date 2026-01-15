export interface ArticleFrontmatter {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  thumbnail: string;
  slug: string;
  featured?: boolean;
  status?: 'draft' | 'published';
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  formattedDate: string;
  readTime: number;
  thumbnail: string;
  featured: boolean;
  status: 'draft' | 'published';
  content: string;
}

export interface ArticleMetadata {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  formattedDate: string;
  readTime: number;
  thumbnail: string;
  featured: boolean;
  status: 'draft' | 'published';
}
