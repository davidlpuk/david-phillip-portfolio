import { linkedInArticles } from "@/shared/constants/linkedin-articles";

export interface WritingEntry {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  readTime: number;
  date: string;
  displayDate: string;
  category: string;
}

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** Curly quotes and apostrophes for straight-quoted LinkedIn text. */
function smarten(text: string) {
  return text
    .replace(/"([^"]*)"/g, "\u201C$1\u201D")
    .replace(/(\w)'(\w)/g, "$1\u2019$2")
    .replace(/'([^']*)'/g, "\u2018$1\u2019");
}

/** Hand-trimmed excerpts where the automatic cut lands badly. */
const excerptOverrides: Record<string, string> = {
  "translation-fatigue":
    "Why has this problem been so resistant to traditional tooling? It’s not a lack of effort; it’s a lack of shared context.",
  "vibe-coding-question":
    "Why non-designers building interfaces isn’t a threat: it’s a shift in where design value gets created.",
};

/** The stored excerpts are cut at a fixed length; end them on a whole word. */
function tidyExcerpt(excerpt: string) {
  const text = excerpt.replace(/\s+/g, " ").trim();
  const sentenceEnd = Math.max(text.lastIndexOf(". "), text.lastIndexOf("? "));
  if (sentenceEnd > 60) return text.slice(0, sentenceEnd + 1);
  const wordEnd = text.lastIndexOf(" ");
  return `${text.slice(0, wordEnd).replace(/[,:;—-]$/, "")}…`;
}

export const writing: WritingEntry[] = [...linkedInArticles]
  .sort((a, b) => b.date.localeCompare(a.date))
  .map((article) => ({
    id: article.id,
    // Drop a leading emoji (a surrogate pair) from LinkedIn-style titles
    title: smarten(article.title.replace(/^[\uD83C-\uDBFF][\uDC00-\uDFFF]\s*/, "")),
    excerpt: smarten(excerptOverrides[article.id] ?? tidyExcerpt(article.excerpt)),
    url: article.url,
    readTime: article.readTime,
    date: article.date,
    displayDate: dateFormat.format(new Date(`${article.date}T00:00:00Z`)),
    category: article.category,
  }));
