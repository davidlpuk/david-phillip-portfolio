import { Router, Request, Response } from "express";

const router = Router();

interface ScrapeRequest {
  url: string;
}

interface SaveJobRequest {
  user_id: string;
  jobs: Array<{
    title: string;
    company: string;
    location: string | null;
    url: string;
    salary_range: string | null;
    description: string | null;
    source: string;
    status: "wishlist" | "applied";
    applied_date?: string;
    notes?: string;
    tags: string[];
  }>;
}

async function scrapeJobFromUrl(url: string): Promise<{
  title: string;
  company: string;
  location: string | null;
  url: string;
  salary_range: string | null;
  description: string | null;
  source: string;
} | null> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; CandidateOS Job Scraper)",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Detect platform and extract accordingly
    let source = "generic";
    if (url.includes("ashbyhq.com")) source = "ashby";
    else if (url.includes("lever.co")) source = "lever";
    else if (url.includes("greenhouse.io")) source = "greenhouse";
    else if (url.includes("workable.com")) source = "workable";
    else if (url.includes("linkedin.com")) source = "linkedin";

    // Try to extract job details
    const title = extractTitle(doc, source);
    const company = extractCompany(doc, source);
    const location = extractLocation(doc, source);
    const description = extractDescription(doc, source);
    const salary_range = extractSalary(doc.body?.textContent || "");

    if (!title) {
      return null;
    }

    return {
      title,
      company,
      location,
      url,
      salary_range,
      description,
      source,
    };
  } catch (error) {
    console.error("Error scraping job:", error);
    return null;
  }
}

function extractTitle(doc: Document, source: string): string {
  const selectors: Record<string, string[]> = {
    ashby: ["h1", '[data-testid="job-title"]', '[class*="title"]'],
    lever: ["h1", ".posting-title", '[class*="title"]'],
    greenhouse: ["h1", ".job-title", '[class*="title"]'],
    workable: ["h1", ".job-header-title", '[class*="title"]'],
    linkedin: ["h1", "[data-test-job-title]"],
    generic: ["h1", '[role="heading"]', '[class*="title"]'],
  };

  for (const selector of selectors[source] || selectors.generic) {
    const el = doc.querySelector<HTMLElement>(selector);
    if (el?.textContent?.trim()) {
      return el.textContent.trim();
    }
  }

  return "";
}

function extractCompany(doc: Document, source: string): string {
  const selectors: Record<string, string[]> = {
    ashby: ['[data-testid="company-name"]', '[class*="company"]'],
    lever: [".posting-company", '[class*="company"]'],
    greenhouse: [".company-name", '[class*="company"]'],
    workable: [".company-name", '[class*="company"]'],
    linkedin: ["[data-test-company-name]", ".jobs-details__company-name"],
    generic: ['meta[name="application-name"]', '[class*="company"]'],
  };

  for (const selector of selectors[source] || selectors.generic) {
    const el = doc.querySelector<HTMLElement>(selector);
    if (el?.textContent?.trim()) {
      return el.textContent.trim();
    }
  }

  return "";
}

function extractLocation(doc: Document, source: string): string | null {
  const selectors: Record<string, string[]> = {
    ashby: ['[data-testid="location"]', '[class*="location"]'],
    lever: [".posting-location", '[class*="location"]'],
    greenhouse: [".location", '[class*="location"]'],
    workable: [".location", '[class*="location"]'],
    linkedin: ["[data-test-job-location]"],
    generic: ['[class*="location"]', '[class*="city"]'],
  };

  for (const selector of selectors[source] || selectors.generic) {
    const el = doc.querySelector<HTMLElement>(selector);
    if (el?.textContent?.trim()) {
      return el.textContent.trim();
    }
  }

  return null;
}

function extractDescription(doc: Document, source: string): string | null {
  const selectors: Record<string, string[]> = {
    ashby: ['[data-testid="description"]', '[class*="description"]', "article"],
    lever: [".posting-description", '[class*="description"]'],
    greenhouse: [".job-description", '[class*="description"]'],
    workable: [".job-description", '[class*="description"]'],
    linkedin: ["[data-test-job-description]"],
    generic: ['[class*="description"]', "article", "main"],
  };

  for (const selector of selectors[source] || selectors.generic) {
    const el = doc.querySelector<HTMLElement>(selector);
    if (el?.textContent?.trim()) {
      return el.textContent.slice(0, 2000);
    }
  }

  return null;
}

function extractSalary(text: string): string | null {
  const patterns = [
    /\$[\d,]+k?\s*-\s*\$[\d,]+k?/gi,
    /£[\d,]+k?\s*-\s*£[\d,]+k?/gi,
    /€[\d,]+k?\s*-\s*€[\d,]+k?/gi,
    /\$[\d,]+(?:\s*-\s*\$[\d,]+)?(?:\s*k)?/gi,
    /[\d,]+(?:\s*-\s*[\d,]+)?\s*(?:k|K)?\s*(?:per year|\/year|annually)?/gi,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      return match[0];
    }
  }

  return null;
}

router.post("/scrape", async (req: Request, res: Response) => {
  try {
    const { url }: ScrapeRequest = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const job = await scrapeJobFromUrl(url);

    if (!job) {
      return res
        .status(422)
        .json({ error: "Could not extract job data from URL" });
    }

    res.json({ job: { ...job, status: "wishlist", tags: [] } });
  } catch (error) {
    console.error("Error in /api/scrape:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/jobs/save", async (req: Request, res: Response) => {
  try {
    const { user_id, job } = req.body;

    if (!user_id || !job) {
      return res.status(400).json({ error: "user_id and job are required" });
    }

    // This would normally save to Supabase
    // For now, return success
    res.json({
      success: true,
      job_id: `job_${Date.now()}`,
      message: "Job saved successfully",
    });
  } catch (error) {
    console.error("Error saving job:", error);
    res.status(500).json({ error: "Failed to save job" });
  }
});

router.post("/jobs/batch", async (req: Request, res: Response) => {
  try {
    const { user_id, jobs }: SaveJobRequest = req.body;

    if (!user_id || !jobs || !Array.isArray(jobs)) {
      return res
        .status(400)
        .json({ error: "user_id and jobs array are required" });
    }

    // This would normally save batch to Supabase
    // For now, return success
    res.json({
      success: true,
      jobs: jobs.map((job, index) => ({
        id: `job_${Date.now()}_${index}`,
        ...job,
      })),
      message: `${jobs.length} jobs saved successfully`,
    });
  } catch (error) {
    console.error("Error saving batch:", error);
    res.status(500).json({ error: "Failed to save jobs" });
  }
});

export default router;
