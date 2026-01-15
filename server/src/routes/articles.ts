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
  return path.dirname(serverDir);
}

function getDraftsPath(): string {
  return path.join(getProjectRoot(), "client", "public", "articles", "drafts");
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
      console.log("Saving drafts to:", draftsPath);

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
    console.log("Reading drafts from:", draftsPath);

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

export default router;
