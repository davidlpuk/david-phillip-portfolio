import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/rebuild/portfolioData";
import { writing, type WritingEntry } from "@/rebuild/writing";
import { pageMeta } from "@/rebuild/meta";
import {
  ButtonLink,
  ContactSection,
  Eyebrow,
  Reveal,
  SiteShell,
  useDocumentMeta,
  useInitialScroll,
} from "@/rebuild/site";

const themes = {
  "AI and design practice": [
    "AI & Prototyping",
    "AI Strategy",
    "AI & Careers",
    "AI & Product",
    "Vibe Coding",
    "Automation",
    "Ethics & AI",
  ],
  "Leadership and strategy": ["UX Leadership", "Career Growth", "Design Strategy"],
  "Process and craft": ["Design Process", "Design Philosophy", "Development", "Research"],
} as const;

type Theme = keyof typeof themes;

function themeOf(entry: WritingEntry): Theme | undefined {
  return (Object.keys(themes) as Theme[]).find((theme) =>
    (themes[theme] as readonly string[]).includes(entry.category),
  );
}

export default function LinkedInArticlesView() {
  const [theme, setTheme] = useState<Theme | "All">("All");

  useDocumentMeta(pageMeta.writing);
  useInitialScroll();

  const byYear = useMemo(() => {
    const filtered =
      theme === "All" ? writing : writing.filter((entry) => themeOf(entry) === theme);
    const groups = new Map<string, WritingEntry[]>();
    for (const entry of filtered) {
      const year = entry.date.slice(0, 4);
      groups.set(year, [...(groups.get(year) ?? []), entry]);
    }
    return Array.from(groups.entries());
  }, [theme]);

  const filters: Array<Theme | "All"> = ["All", ...(Object.keys(themes) as Theme[])];

  return (
    <SiteShell>
      <main id="main-content">
        <header className="mx-auto max-w-6xl px-5 pt-28 md:px-8 md:pt-36">
          <div className="hero-rise">
            <Eyebrow>Writing</Eyebrow>
            <h1 className="type-hero mt-6 max-w-4xl text-[clamp(2.75rem,6vw,5.5rem)] text-ink">
              Essays on design, AI and{" "}
              <em className="italic text-cobalt">leadership.</em>
            </h1>
            <p className="type-lede mt-8 max-w-2xl text-stone">
              {writing.length} pieces on where design value is moving, how AI
              changes the work, and what that means for design teams. Originally
              published on LinkedIn.
            </p>
            <div className="mt-8">
              <ButtonLink href={profile.linkedinUrl} variant="outline" icon="external">
                Follow on LinkedIn
              </ButtonLink>
            </div>
          </div>

          <div
            role="group"
            aria-label="Filter essays by theme"
            className="mt-14 flex flex-wrap gap-2"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                aria-pressed={theme === filter}
                onClick={() => setTheme(filter)}
                className={`h-10 rounded-full border px-4 text-sm font-medium transition ${
                  theme === filter
                    ? "border-ink bg-ink text-bone"
                    : "border-ink/15 text-ink hover:border-ink/40"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-5 pb-24 pt-10 md:px-8 md:pb-32">
          {byYear.map(([year, entries]) => (
            <section key={year} aria-labelledby={`year-${year}`} className="mt-10">
              <h2 id={`year-${year}`} className="type-label text-stone">
                {year}
              </h2>
              <ol className="mt-4 border-b border-ink/10">
                {entries.map((entry, index) => (
                  <Reveal key={entry.id} as="li" delay={Math.min(index, 4) * 0.03}>
                    <a
                      href={entry.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group grid gap-3 border-t border-ink/10 py-7 md:grid-cols-12 md:gap-8"
                    >
                      <p className="type-label text-stone md:col-span-3">
                        <time dateTime={entry.date}>{entry.displayDate}</time>
                        <span className="mt-1 block text-cobalt">{entry.category}</span>
                      </p>
                      <div className="md:col-span-8">
                        <h3 className="font-editorial text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.1] text-ink decoration-ink/30 underline-offset-[6px] group-hover:underline">
                          {entry.title}
                        </h3>
                        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-stone">
                          {entry.excerpt}
                        </p>
                        <p className="mt-3 text-sm text-stone">
                          {entry.readTime} min read
                          <span className="sr-only"> on LinkedIn (opens in a new tab)</span>
                        </p>
                      </div>
                      <span className="hidden h-11 w-11 place-items-center justify-self-end rounded-full border border-ink/15 text-ink transition group-hover:border-ink group-hover:bg-ink group-hover:text-bone md:col-span-1 md:grid">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </a>
                  </Reveal>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <ContactSection compact />
      </main>
    </SiteShell>
  );
}
