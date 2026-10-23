import { caseStudies, caseStudyBySlug, type CaseStudySlug } from "@/rebuild/portfolioData";

/** Canonical origin used for prerendered tags; the browser uses its own origin. */
export const SITE_URL = "https://david-phillip-portfolio.vercel.app";

export interface PageMeta {
  title: string;
  description: string;
}

const defaultDescription =
  "David Phillip is a Head of Design and Design Director in London with 20+ years leading product design for Coutts, HSBC, BlackRock and Cognism. Design leadership for regulated, high-trust financial products.";

export const pageMeta = {
  home: {
    title: "David Phillip · Head of Design & Design Director, London",
    description: defaultDescription,
  },
  cv: {
    title: "CV · David Phillip, Head of Design & Design Director",
    description:
      "The CV of David Phillip: Head of Design and Design Director with 20+ years in financial services and B2B SaaS. Download a PDF or read online.",
  },
  writing: {
    title: "Writing · David Phillip",
    description:
      "Essays by David Phillip on design leadership, AI in product design and how design teams should adapt. Originally published on LinkedIn.",
  },
  notFound: {
    title: "Page not found · David Phillip",
    description: defaultDescription,
  },
} satisfies Record<string, PageMeta>;

export function caseStudyMeta(slug: string | undefined): PageMeta {
  const study = slug ? caseStudyBySlug.get(slug as CaseStudySlug) : undefined;
  if (!study) {
    return { title: "Case study not found · David Phillip", description: defaultDescription };
  }
  return {
    title: `${study.company}: ${study.title} · David Phillip`,
    description: study.summary,
  };
}

/** Public routes rendered to static HTML at build time. */
export const prerenderRoutes: Array<{ path: string; meta: PageMeta }> = [
  { path: "/", meta: pageMeta.home },
  { path: "/cv", meta: pageMeta.cv },
  { path: "/articles", meta: pageMeta.writing },
  ...caseStudies.map((study) => ({
    path: `/case-study/${study.slug}`,
    meta: caseStudyMeta(study.slug),
  })),
];
