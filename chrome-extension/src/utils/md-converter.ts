import { ArticleData } from './types';

export function generateMarkdown(article: ArticleData): string {
  const { title, author, publishDate, readingTime, body, tags, originalUrl } = article;

  const date = new Date(publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
author: "${author}"
publishDate: "${date}"
readingTime: "${readingTime}"
tags: [${tags.map((t) => `"${t}"`).join(', ')}]
originalUrl: "${originalUrl}"
---

`;

  const header = `# ${title}

*By ${author} | ${date} | ${readingTime}*

${tags.length > 0 ? `\n**Tags:** ${tags.map((t) => `\`${t}\``).join(' ')}\n` : ''}

---

${body}

---

*Originally published on LinkedIn. [View original](${originalUrl})*
`;

  return frontmatter + header;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
