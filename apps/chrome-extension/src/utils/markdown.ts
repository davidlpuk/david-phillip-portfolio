import { ArticleData } from "./types";

// Generate a URL-friendly slug from the article title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Intelligent markdown post-processing
function postProcessMarkdown(markdown: string): string {
  return markdown
    // Fix excessive blank lines (more than 2 consecutive)
    .replace(/\n{3,}/g, '\n\n')
    // Remove trailing spaces from lines
    .replace(/[ \t]+$/gm, '')
    // Fix broken image tags that might have been mangled
    .replace(/<img([^>]+)style="([^"]*)"([^>]*)\/?> *<\/img>/g, '<img$1style="$2"$3/>')
    // Ensure proper spacing around images
    .replace(/\n*<img([^>]+)>\n*/g, '\n\n<img$1>\n\n')
    // Clean up any remaining HTML artifacts
    .replace(/<\/?span[^>]*>/g, '')
    .replace(/<\/?div[^>]*>/g, '')
    // Fix any double asterisks that might be broken
    .replace(/\*{3,}/g, '**')
    // Ensure consistent line endings
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    // Trim whitespace
    .trim();
}

// Smart excerpt generation
function generateSmartExcerpt(content: string, maxLength: number = 200): string {
  // Remove markdown formatting for excerpt
  const plainText = content
    .replace(/#{1,6}\s*/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[.*?\]\(.*?\)/g, '$1') // Keep link text
    .replace(/<[^>]*>/g, '') // Remove HTML
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  // Find a good break point (end of sentence)
  const truncated = plainText.substring(0, maxLength);
  const lastSentenceEnd = Math.max(
    truncated.lastIndexOf('.'),
    truncated.lastIndexOf('!'),
    truncated.lastIndexOf('?')
  );

  if (lastSentenceEnd > maxLength * 0.7) {
    return truncated.substring(0, lastSentenceEnd + 1);
  }

  // Fallback to word boundary
  const lastSpace = truncated.lastIndexOf(' ');
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
}

// Improved reading time calculation
function calculateReadingTime(content: string): string {
  // Remove markdown formatting and HTML for accurate word count
  const plainText = content
    .replace(/#{1,6}\s*/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[.*?\]\(.*?\)/g, '$1') // Keep link text
    .replace(/<[^>]*>/g, '') // Remove HTML
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  const wordsPerMinute = 200; // Average reading speed
  const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

  return `${minutes} min read`;
}

// Generate table of contents for articles with multiple headings
function generateTableOfContents(content: string): string {
  const lines = content.split('\n');
  const toc: Array<{ level: number; text: string; anchor: string }> = [];

  lines.forEach(line => {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const anchor = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      toc.push({ level, text, anchor });
    }
  });

  // Only generate TOC if there are at least 3 headings
  if (toc.length < 3) {
    return '';
  }

  let tocMarkdown = '## Table of Contents\n\n';
  toc.forEach(item => {
    const indent = '  '.repeat(item.level - 1);
    tocMarkdown += `${indent}- [${item.text}](#${item.anchor})\n`;
  });

  return tocMarkdown + '\n---\n\n';
}

// Auto-detect categories based on content
function detectCategory(content: string, tags: string[]): string {
  const contentLower = content.toLowerCase();

  // Priority-based category detection
  if (contentLower.includes('design') || contentLower.includes('ux') || contentLower.includes('ui')) {
    return 'Design';
  }
  if (contentLower.includes('product') || contentLower.includes('strategy')) {
    return 'Product';
  }
  if (contentLower.includes('ai') || contentLower.includes('artificial intelligence') || contentLower.includes('machine learning')) {
    return 'AI & Technology';
  }
  if (contentLower.includes('leadership') || contentLower.includes('team') || contentLower.includes('management')) {
    return 'Leadership';
  }
  if (contentLower.includes('career') || contentLower.includes('job') || contentLower.includes('professional')) {
    return 'Career';
  }

  // Fallback to first tag or default
  return tags.length > 0 ? tags[0] : 'Article';
}

// Generate Markdown content for an article
export function generateMarkdown(article: ArticleData): string {
  const { title, author, publishDate, readingTime, body, tags, originalUrl } =
    article;

  const date = new Date(publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format date as DD/MM/YYYY for the date field
  const publishDateObj = new Date(publishDate);
  const day = publishDateObj.getDate().toString().padStart(2, '0');
  const month = (publishDateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = publishDateObj.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  // Intelligent content processing
  const processedBody = postProcessMarkdown(body);
  const smartExcerpt = generateSmartExcerpt(processedBody);
  const accurateReadingTime = calculateReadingTime(processedBody);
  const detectedCategory = detectCategory(processedBody, tags);
  const tableOfContents = generateTableOfContents(processedBody);

  const frontmatter = `---
 title: "${title.replace(/"/g, '\\"')}"
 author: "${author}"
 publishDate: "${formattedDate}"
 date: "${formattedDate}"
 readingTime: "${accurateReadingTime}"
 excerpt: "${smartExcerpt.replace(/"/g, '\\"')}"
 category: "${detectedCategory}"
 tags: [${tags.map((t) => `"${t.replace(/"/g, '\\"')}"`).join(", ")}]
 originalUrl: "${originalUrl}"
 ---

`;

  const header = `# ${title}\n\n *By ${author} | ${date} | ${accurateReadingTime}*\n\n ${tags.length > 0 ? `\n**Tags:** ${tags.map((t) => `\`${t}\``).join(" ")}\n` : ""}\n---\n\n ${tableOfContents}${processedBody}\n\n---\n\n *Originally published on LinkedIn. [View original](${originalUrl})*\n`;

  return frontmatter + header;
}
