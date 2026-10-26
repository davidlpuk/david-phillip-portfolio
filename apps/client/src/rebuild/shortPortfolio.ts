import type { CaseStudySlug } from "@/rebuild/portfolioData";

/**
 * Copy for the main portfolio at /: one page a hiring manager can read in
 * about two minutes. Facts and metrics come from portfolioData.ts and the CV;
 * keep them in step.
 */

export const shortHero = {
  seeking: "Looking for Head of Design or Design Director roles",
  headline: "I build design teams that make complex financial and SaaS products",
  emphasis: "simple",
  tail: " to use.",
  intro:
    "Head of Design with 20+ years in banking and B2B SaaS, at Coutts, HSBC and Cognism. I hire and grow teams, set up the systems they work in, and tie design to adoption, NPS and revenue.",
  proof: [
    { value: "5 → 15", label: "Design team grown at Coutts" },
    { value: "100%", label: "Team retention over two years at Cognism" },
    { value: "£400K+", label: "Saved a year moving 280+ NatWest Group designers to Figma" },
  ],
};

export interface ShortProject {
  slug: CaseStudySlug;
  company: string;
  role: string;
  period: string;
  title: string;
  /** Company stage, the brief and David's remit */
  mandate: string;
  problem: string;
  action: string;
  result: string;
  metric: { value: string; label: string };
  image: string;
  imageSmall?: string;
  imageAlt: string;
}

export const shortProjects: ShortProject[] = [
  {
    slug: "cognism",
    company: "Cognism",
    role: "Head of UX",
    period: "2022 – 2024",
    title: "Built product design from zero through 4× growth",
    mandate: "B2B SaaS scale-up growing 4×. First design hire, reporting to the CPO with full budget responsibility.",
    problem: "Inconsistent workflows and an NPS of −16 had become a commercial risk.",
    action: "Hired the team, created career pathways, set up DesignOps and redesigned the most-used workflows.",
    result: "NPS turned positive, with ease of use the main driver, while ARR grew from $20M to $80M.",
    metric: { value: "−16 → +12", label: "NPS" },
    image: "/images/site/cover-cognism.webp",
    imageAlt: "Cognism usage dashboard showing credits remaining, active users and a bar chart of profile views",
  },
  {
    slug: "coutts",
    company: "Coutts",
    role: "Design Director",
    period: "2020 – 2022",
    title: "Modernised private banking without losing its quiet confidence",
    mandate: "Digital transformation at a 320-year-old private bank. Design Director across four brands with full budget responsibility.",
    problem: "Younger clients wanted modern mobile banking. Existing clients needed reassurance.",
    action: "Scaled the team, set up UX research and directed the new mobile app.",
    result: "Digital adoption up 30% in six months. The app launched at 4.2★ with zero security incidents.",
    metric: { value: "+30%", label: "Digital adoption" },
    image: "/images/site/cover-coutts.webp",
    imageSmall: "/images/site/cover-coutts-800.webp",
    imageAlt: "Coutts mobile banking screens showing a personalised welcome, account balances and Coutts Rewards",
  },
  {
    slug: "hsbc-kinetic",
    company: "HSBC Kinetic",
    role: "UX Lead (contract)",
    period: "2019",
    title: "Made SME lending fast enough for a mobile-first bank",
    mandate: "New mobile-first venture inside a global bank, part of a multi-billion-pound initiative. UX lead across five lending products.",
    problem: "Five separate lending journeys had to become one fast, compliant mobile product.",
    action: "Led UX across lending and integration, aligning Product, Engineering, Risk and Compliance on shared patterns.",
    result: "35% adoption in six months against a 25% target, with 30% faster development cycles.",
    metric: { value: "35%", label: "Adoption, target 25%" },
    image: "/images/site/cover-hsbc-kinetic.webp",
    imageAlt: "HSBC Kinetic app on a phone with the line ‘Let’s do business’ over a red wave graphic",
  },
];

/** What David is doing now, shown under the hero so the 2024 – now line is explained. */
export const shortNow = {
  slug: "ux-sidekick" as CaseStudySlug,
  text: "Designing and building AI tools for design teams. Latest: UX Sidekick, which critiques a screen in about 30 seconds.",
  link: "See how I built it",
};

/** Wording from leadershipPillars in portfolioData.ts. */
export const shortPrinciples = [
  {
    title: "People before pixels",
    text: "Hire for trajectory, grow people with clear career paths and honest critique, and protect the team’s focus.",
  },
  {
    title: "Systems that scale quality",
    text: "Design systems, tooling and DesignOps so quality doesn’t depend on a few heroic individuals.",
  },
  {
    title: "Evidence over opinion",
    text: "Research cadences, usability testing and product metrics that turn debates into decisions.",
  },
];

/** Short leadership scenarios, from David's own account (October 2026). */
export const shortStories = [
  {
    label: "With the CEO · Cognism",
    title: "Took a new AI product from CEO brief to an agreed concept in a week",
    text: "Cognism’s CEO wanted an AI tool, Jewel. I worked through the requirements with him, pulled evidence from customer calls recorded in Gong, and built a branded end-to-end journey with a working Figma prototype.",
    result: "The concept was agreed, then built, tested and iterated. Its AI features went into the flagship product, made it more competitive and were well received by customers and sales.",
  },
  {
    label: "Hiring · Cognism",
    title: "Hired a design team before the company had a design reputation",
    text: "As a young SaaS company, Cognism had no design brand to recruit on. I wrote a hiring pack covering the company, the vision for design, career progression across Design and Product, why UX mattered to the business, and the challenges a new designer would take on.",
    result: "It helped build the team from zero to four, with 100% retention over two years.",
  },
];

/** Complete sentences only, quoted exactly from the references in portfolioData.ts. */
export const shortReferences = [
  {
    quote:
      "David built the team and instituted all the design processes that helped to lift our product from a −16 NPS to a positive 12.",
    author: "Michelle Bradbury",
    role: "Chief Product Officer, Cognism",
    relationship: "David’s manager",
  },
  {
    quote: "The team flourished under his leadership.",
    author: "Jacqui Chadwick",
    role: "Lead Product Designer, Coutts",
    relationship: "Reported to David",
  },
  {
    quote:
      "His work balancing the best experience for the user with technical constraints is exceptional, whilst ensuring quality is not compromised.",
    author: "Usha Sanku",
    role: "Product Consultant, HSBC Commercial Banking",
    relationship: "Product partner",
  },
];

export const shortExperience = [
  { period: "2024 – now", role: "Designing and building AI products", company: "Independent" },
  { period: "2022 – 2024", role: "Head of UX, Product Design", company: "Cognism" },
  { period: "2020 – 2022", role: "Design Director", company: "Coutts · NatWest Group" },
  { period: "2019", role: "UX Lead, Product Design (contract)", company: "HSBC Kinetic" },
  { period: "2016 – 2019", role: "UX Lead, Wealth & Investments", company: "Schroders" },
];

// The £2M budget was a Barclays contract and not a design budget; keep it worded that way.
export const shortEarlierCareer =
  "Earlier: Deutsche Bank, TSB, Barclays Wealth, HSBC and BlackRock (2006 – 2016). At Barclays I was responsible for a budget of up to £2M.";
