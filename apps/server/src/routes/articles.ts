import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

interface ArticleMetadata {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tags: string[];
  author?: string;
  authorProfileUrl?: string;
  originalUrl: string;
  importedAt: string;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-z0-9\-_.]/gi, "_").replace(/_{2,}/g, "_");
}

function getProjectRoot(): string {
  const currentFile = fileURLToPath(import.meta.url);
  const routesDir = path.dirname(currentFile);
  const serverSrcDir = path.dirname(routesDir);
  const serverDir = path.dirname(serverSrcDir);
  const appsDir = path.dirname(serverDir);
  return path.dirname(appsDir);
}

function getDraftsPath(): string {
  return path.join(getProjectRoot(), "apps", "client", "public", "articles", "drafts");
}

router.post(
  "/import",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      let metadata: ArticleMetadata;
      try {
        metadata = JSON.parse(req.body.metadata);
      } catch {
        return res.status(400).json({ error: "Invalid metadata format" });
      }

      if (!metadata.slug) {
        metadata.slug = generateSlug(metadata.title);
      }

      const draftsPath = getDraftsPath();

      if (!fs.existsSync(draftsPath)) {
        fs.mkdirSync(draftsPath, { recursive: true });
      }

      const sanitizedFilename = sanitizeFilename(`${metadata.slug}.md`);
      const filePath = path.join(draftsPath, sanitizedFilename);

      fs.writeFileSync(filePath, req.file.buffer, "utf8");

      const metadataPath = path.join(draftsPath, `${metadata.slug}.json`);
      const metadataContent = {
        ...metadata,
        localPath: `articles/drafts/${sanitizedFilename}`,
        status: "draft",
        importedAt: metadata.importedAt || new Date().toISOString(),
        author: metadata.author || "David Phillip",
        authorProfileUrl: metadata.authorProfileUrl || "",
      };
      fs.writeFileSync(
        metadataPath,
        JSON.stringify(metadataContent, null, 2),
        "utf8",
      );

      res.json({
        success: true,
        article: {
          slug: metadata.slug,
          url: `/articles/drafts/${sanitizedFilename}`,
          localPath: filePath,
        },
      });
    } catch (error) {
      console.error("Error importing article:", error);
      res.status(500).json({ error: "Failed to import article" });
    }
  },
);

router.get("/drafts", (req: Request, res: Response) => {
  try {
    const draftsPath = getDraftsPath();

    if (!fs.existsSync(draftsPath)) {
      return res.json({ drafts: [] });
    }

    const files = fs.readdirSync(draftsPath).filter((f) => f.endsWith(".json"));
    const drafts = files.map((filename) => {
      const content = fs.readFileSync(path.join(draftsPath, filename), "utf8");
      return JSON.parse(content);
    });

    res.json({ drafts });
  } catch (error) {
    console.error("Error listing drafts:", error);
    res.status(500).json({ error: "Failed to list drafts" });
  }
});

function getArticlesPath(): string {
  return path.join(getProjectRoot(), "apps", "client", "public", "articles");
}

router.get("/published", (req: Request, res: Response) => {
  try {
    const articlesPath = getArticlesPath();

    if (!fs.existsSync(articlesPath)) {
      return res.json({ articles: [] });
    }

    const files = fs.readdirSync(articlesPath).filter((f) => f.endsWith(".md"));
    const articles = files.map((filename) => {
      const filePath = path.join(articlesPath, filename);
      const content = fs.readFileSync(filePath, "utf8");

      // Parse frontmatter
      const parts = content.split('---');
      let frontmatterStr = '';
      if (parts.length >= 3) {
        frontmatterStr = parts[1];
      }

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

      return {
        slug: filename.replace('.md', ''),
        title: data.title || filename.replace('.md', ''),
        excerpt: data.excerpt || data.title || '',
        date: data.date || new Date().toISOString(),
        category: data.category || 'Article',
        tags: data.tags || [],
        status: 'published',
        readingTime: data.readingTime || data.readTime || 5,
        featured: data.featured || false,
        localPath: `articles/${filename}`,
      };
    });

    res.json({ articles });
  } catch (error) {
    console.error("Error listing published articles:", error);
    res.status(500).json({ error: "Failed to list published articles" });
  }
});

router.get("/published/:slug", (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const articlesPath = getArticlesPath();
    const filePath = path.join(articlesPath, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Article not found" });
    }

    const content = fs.readFileSync(filePath, "utf8");

    // Parse frontmatter
    const parts = content.split('---');
    let frontmatterStr = '';
    let markdown = content;
    if (parts.length >= 3) {
      frontmatterStr = parts[1];
      markdown = parts.slice(2).join('---').trim();
    }

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

    res.json({
      slug,
      title: data.title || slug,
      excerpt: data.excerpt || data.title || '',
      date: data.date || new Date().toISOString(),
      category: data.category || 'Article',
      tags: data.tags || [],
      status: 'published',
      readingTime: data.readingTime || data.readTime || 5,
      featured: data.featured || false,
      markdown,
    });
  } catch (error) {
    console.error("Error fetching published article:", error);
    res.status(500).json({ error: "Failed to fetch article" });
  }
});

router.get("/drafts/:slug", (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const draftsPath = getDraftsPath();
    const metadataPath = path.join(draftsPath, `${slug}.json`);
    const mdPath = path.join(draftsPath, `${slug}.md`);

    if (!fs.existsSync(metadataPath)) {
      return res.status(404).json({ error: "Draft not found" });
    }

    const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
    const markdown = fs.existsSync(mdPath)
      ? fs.readFileSync(mdPath, "utf8")
      : null;

    res.json({
      ...metadata,
      markdown,
    });
  } catch (error) {
    console.error("Error fetching draft:", error);
    res.status(500).json({ error: "Failed to fetch draft" });
  }
});

// Update draft status (publish/unpublish)
router.patch("/drafts/:slug/status", (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const { status } = req.body;

    if (!status || !['draft', 'published'].includes(status)) {
      return res.status(400).json({ error: 'Valid status is required' });
    }

    const draftsPath = getDraftsPath();
    const metadataPath = path.join(draftsPath, `${slug}.json`);

    if (!fs.existsSync(metadataPath)) {
      return res.status(404).json({ error: 'Draft not found' });
    }

    // Read current metadata
    const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));

    if (status === 'published') {
      // Move from drafts to published articles
      const articlesPath = path.join(getProjectRoot(), "apps", "client", "src", "features", "articles");
      const mdPath = path.join(draftsPath, `${slug}.md`);

      if (!fs.existsSync(articlesPath)) {
        fs.mkdirSync(articlesPath, { recursive: true });
      }

      if (fs.existsSync(mdPath)) {
        // Read the markdown content
        const markdown = fs.readFileSync(mdPath, "utf8");

        // Create frontmatter for published article
        const frontmatter = `---
title: "${metadata.title.replace(/"/g, '\\"')}"
excerpt: "${(metadata.excerpt || metadata.title).replace(/"/g, '\\"')}"
date: "${metadata.importedAt || metadata.publishDate || new Date().toISOString()}"
category: "${metadata.tags?.[0] || 'Imported'}"
status: "published"
featured: false
readTime: ${metadata.readingTime || 5}
thumbnail: ""
---

`;

        // Write to articles folder
        const publishedPath = path.join(articlesPath, `${slug}.md`);
        fs.writeFileSync(publishedPath, frontmatter + markdown, 'utf8');

        // Delete from drafts
        fs.unlinkSync(metadataPath);
        fs.unlinkSync(mdPath);

        res.json({ success: true, message: `Article published successfully` });
      } else {
        return res.status(404).json({ error: 'Draft markdown file not found' });
      }
    } else {
      // Keep as draft - just update status
      metadata.status = status;
      fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), "utf8");
      res.json({ success: true, message: `Draft status updated to ${status}` });
    }
  } catch (error) {
    console.error("Error updating draft status:", error);
    res.status(500).json({ error: "Failed to update draft status" });
  }
});

// Delete draft
router.delete("/drafts/:slug", (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const draftsPath = getDraftsPath();
    const metadataPath = path.join(draftsPath, `${slug}.json`);
    const mdPath = path.join(draftsPath, `${slug}.md`);

    if (!fs.existsSync(metadataPath)) {
      return res.status(404).json({ error: 'Draft not found' });
    }

    // Delete both files
    if (fs.existsSync(metadataPath)) fs.unlinkSync(metadataPath);
    if (fs.existsSync(mdPath)) fs.unlinkSync(mdPath);

    res.json({ success: true, message: 'Draft deleted successfully' });
  } catch (error) {
    console.error("Error deleting draft:", error);
    res.status(500).json({ error: "Failed to delete draft" });
  }
});

// Save or update article
router.post("/save", (req: Request, res: Response) => {
  try {
    const { content, filename, isEdit, originalSlug } = req.body;

    if (!content || !filename) {
      return res.status(400).json({ error: "Content and filename are required" });
    }

    // Parse frontmatter to get metadata
    const parts = content.split('---');
    if (parts.length < 3) {
      return res.status(400).json({ error: "Invalid markdown format - missing frontmatter" });
    }

    const frontmatterStr = parts[1];
    const markdownContent = parts.slice(2).join('---').trim();

    // Parse frontmatter
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

    const slug = data.slug || filename.replace('.md', '');
    const status = data.status || 'draft';

    if (status === 'published') {
      // Save to published articles (client/src/articles/)
      const articlesPath = path.join(getProjectRoot(), "apps", "client", "src", "features", "articles");

      if (!fs.existsSync(articlesPath)) {
        fs.mkdirSync(articlesPath, { recursive: true });
      }

      // If editing and slug changed, remove old file
      if (isEdit && originalSlug && originalSlug !== slug) {
        const oldPath = path.join(articlesPath, `${originalSlug}.md`);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      const filePath = path.join(articlesPath, `${slug}.md`);
      fs.writeFileSync(filePath, content, 'utf8');

      res.json({
        success: true,
        message: `Article ${isEdit ? 'updated' : 'saved'} successfully`,
        slug
      });
    } else {
      // Save to drafts
      const draftsPath = getDraftsPath();

      if (!fs.existsSync(draftsPath)) {
        fs.mkdirSync(draftsPath, { recursive: true });
      }

      // If editing and slug changed, remove old files
      if (isEdit && originalSlug && originalSlug !== slug) {
        const oldMetadataPath = path.join(draftsPath, `${originalSlug}.json`);
        const oldMdPath = path.join(draftsPath, `${originalSlug}.md`);
        if (fs.existsSync(oldMetadataPath)) fs.unlinkSync(oldMetadataPath);
        if (fs.existsSync(oldMdPath)) fs.unlinkSync(oldMdPath);
      }

      // Save markdown
      const mdPath = path.join(draftsPath, `${slug}.md`);
      fs.writeFileSync(mdPath, markdownContent, 'utf8');

      // Save metadata
      const metadataPath = path.join(draftsPath, `${slug}.json`);
      const metadata = {
        title: data.title || '',
        slug,
        excerpt: data.excerpt || '',
        date: data.date || new Date().toISOString(),
        category: data.category || 'Article',
        tags: data.tags || [],
        status: 'draft',
        readingTime: data.readTime || data.readingTime || 5,
        featured: data.featured || false,
        thumbnail: data.thumbnail || '',
        importedAt: data.date || new Date().toISOString(),
        originalUrl: data.originalUrl || '',
        author: data.author || 'David Phillip',
        authorProfileUrl: data.authorProfileUrl || '',
        localPath: `articles/drafts/${slug}.md`,
      };
      fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), 'utf8');

      res.json({
        success: true,
        message: `Draft ${isEdit ? 'updated' : 'saved'} successfully`,
        slug
      });
    }
  } catch (error) {
    console.error("Error saving article:", error);
    res.status(500).json({ error: "Failed to save article" });
  }
});

export default router;
