import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import type { PageMeta } from "@/rebuild/meta";
import {
  leadershipPillars,
  profile,
  type CaseStudySlug,
  type ProofPoint,
} from "@/rebuild/portfolioData";

/**
 * Audience-specific versions of the home page. Each one shares the design,
 * case studies and references, and changes only the framing. Send the link
 * that matches the role:
 *
 *   /                    financial services (banks, wealth, fintech)
 *   /saas                B2B SaaS, scale-ups and product-led companies
 *   /design-leadership   any sector
 *
 * Once a visitor lands on a version, navigation, "All work" links and the
 * contact copy stay in that version for the rest of their visit.
 */
export type AudienceId = "financial" | "saas" | "general" | "short";

export interface Audience {
  id: AudienceId;
  path: string;
  meta: PageMeta;
  /** Hero headline: lead text, the italic word, then the rest (with its own leading space) */
  headline: { lead: string; emphasis: string; tail: string };
  intro: string;
  lenses: string[];
  heroProof: ProofPoint[];
  caseStudyOrder: CaseStudySlug[];
  relevance: Partial<Record<CaseStudySlug, string>>;
  clientOrder: string[];
  leadershipLede: string;
  pillars: typeof leadershipPillars;
  /** Completes "Open to … roles in ___." in the contact section */
  sectors: string;
}

/** The full portfolio for financial services, at /full. */
const financial: Audience = {
  id: "financial",
  path: "/full",
  meta: {
    title: "Full portfolio · David Phillip, Head of Design & Design Director",
    description:
      "David Phillip is a Head of Design and Design Director in London with 20+ years leading product design for Coutts, HSBC, BlackRock and Cognism. Design leadership for regulated, high-trust financial products.",
  },
  headline: {
    lead: "Design leadership for financial products where",
    emphasis: "trust",
    tail: " is the product.",
  },
  intro: profile.intro,
  lenses: ["Customer", "Business", "Risk", "Technology"],
  heroProof: profile.heroProof,
  caseStudyOrder: ["coutts", "hsbc-kinetic", "cognism", "ux-sidekick"],
  relevance: {},
  clientOrder: profile.clients.map((client) => client.name),
  leadershipLede:
    "My work happens where the answer has to satisfy customers, product, engineering, compliance, risk and the board. Four principles keep it moving.",
  pillars: leadershipPillars,
  sectors: "financial services, fintech and B2B SaaS",
};

const saas: Audience = {
  id: "saas",
  path: "/saas",
  meta: {
    title: "David Phillip · Head of Design for SaaS and Product-Led Teams",
    description:
      "Head of Design who built Cognism’s product design function from zero through 4× ARR growth and turned NPS from −16 to +12. 20+ years leading design teams, design systems and research.",
    image: "/og-image-saas.jpg",
    noindex: true,
  },
  headline: {
    lead: "Design leadership that makes complex SaaS feel",
    emphasis: "simple",
    tail: ".",
  },
  intro:
    "I’m David Phillip, a Head of Design with 20+ years in product and digital. At Cognism I built product design from zero through 4× ARR growth and turned NPS from −16 to +12. I build design teams, the systems they run on, and the evidence that ties UX to retention and revenue.",
  lenses: ["Customer", "Business", "Data", "Technology"],
  heroProof: [
    { value: "−16 → +12", label: "NPS turnaround, ease of use the main driver", context: "Cognism" },
    { value: "4×", label: "ARR growth while building design from zero", context: "Cognism" },
    { value: "100%", label: "Design team retention over two years", context: "Cognism" },
    { value: "5 → 15", label: "Design team scaled", context: "Coutts" },
  ],
  caseStudyOrder: ["cognism", "coutts", "hsbc-kinetic", "ux-sidekick"],
  relevance: {
    cognism: "Building a design function from zero through 4× ARR growth",
    coutts: "Scaling a team from 5 to 15, and the design system behind it",
    "hsbc-kinetic": "Shared patterns and design sprints that cut delivery cycles by 30%",
  },
  clientOrder: ["Cognism", "Coutts", "HSBC", "BlackRock", "Barclays", "Deutsche Bank", "Schroders", "TSB"],
  leadershipLede:
    "My work happens where the answer has to satisfy customers, product, engineering, sales and the board. Four principles keep it moving.",
  pillars: [
    ...leadershipPillars.slice(0, 3),
    {
      title: "One team with Product and Engineering",
      text: "Shared rituals, early engineering input and design that runs ahead of delivery, not behind it.",
      proof: "Cognism’s designers stayed ahead of the agile teams across every feature.",
    },
  ],
  sectors: "B2B SaaS, scale-ups and product-led companies",
};

const general: Audience = {
  id: "general",
  path: "/design-leadership",
  meta: {
    title: "David Phillip · Head of Design & Design Director",
    description:
      "Head of Design and Design Director with 20+ years leading design teams, design systems and research for complex products, from global banks to a fast-growing SaaS business.",
    image: "/og-image-design-leadership.jpg",
    noindex: true,
  },
  headline: {
    lead: "Design leadership for complex products and the teams that",
    emphasis: "build",
    tail: " them.",
  },
  intro:
    "I’m David Phillip, a Head of Design and Design Director with 20+ years leading design for complex products, from global banks to a fast-growing SaaS business. I build design teams, the systems they run on, and the evidence that ties UX to adoption, satisfaction and revenue.",
  lenses: ["Customer", "Business", "Operations", "Technology"],
  heroProof: [
    { value: "5 → 15", label: "Design team scaled", context: "Coutts" },
    { value: "−16 → +12", label: "NPS turnaround", context: "Cognism" },
    { value: "35%", label: "Adoption in 6 months, vs 25% target", context: "HSBC Kinetic" },
    { value: "100%", label: "Design team retention over two years", context: "Cognism" },
  ],
  caseStudyOrder: ["cognism", "coutts", "hsbc-kinetic", "ux-sidekick"],
  relevance: {
    coutts: "Director-level leadership: scaling a team and its standards where the stakes are high",
    "hsbc-kinetic": "Bringing speed and shared patterns to a large organisation’s transformation",
  },
  clientOrder: ["Cognism", "Coutts", "HSBC", "BlackRock", "Barclays", "Deutsche Bank", "Schroders", "TSB"],
  leadershipLede:
    "My work happens where the answer has to satisfy customers, product, engineering, operations and the board. Four principles keep it moving.",
  pillars: [
    ...leadershipPillars.slice(0, 3),
    {
      title: "Constraints as a design partner",
      text: "Bring Legal, Risk, Operations and Engineering in early so constraints shape the work instead of blocking it late.",
      proof: "Coutts mobile app launched with zero security incidents.",
    },
  ],
  sectors: "product companies and digital teams in any sector",
};

/**
 * The main portfolio at /: one short page (views/PortfolioShort.tsx, copy in
 * shortPortfolio.ts). The longer versions stay at /full, /saas and
 * /design-leadership.
 */
const short: Audience = {
  ...general,
  id: "short",
  path: "/",
  meta: {
    title: "David Phillip · Head of Design & Design Director, London",
    description:
      "David Phillip is a Head of Design in London with 20+ years in banking and B2B SaaS, at Coutts, HSBC and Cognism. Selected work, results, references and CV.",
    image: "/og-image-v2.jpg",
  },
};

export const audiences: Record<AudienceId, Audience> = { financial, saas, general, short };

const audienceList = Object.values(audiences);
const storageKey = "dp:audience";

/** The audience whose home page lives at `path`, if any. */
export function audienceForPath(path: string): Audience | undefined {
  const normalised = path.length > 1 ? path.replace(/\/$/, "") : path;
  return audienceList.find((audience) => audience.path === normalised);
}

/**
 * The audience for the current visit. On a home page it comes from the URL,
 * so prerendered HTML is correct. Elsewhere it is restored from the session
 * after hydration, falling back to the main (short) portfolio.
 */
export function useAudience(): Audience {
  const [location] = useLocation();
  const fromPath = audienceForPath(location);
  const [stored, setStored] = useState<Audience>(short);

  useEffect(() => {
    try {
      if (fromPath) {
        window.sessionStorage.setItem(storageKey, fromPath.id);
      } else {
        const id = window.sessionStorage.getItem(storageKey) as AudienceId | null;
        if (id && audiences[id]) setStored(audiences[id]);
      }
    } catch {
      // Storage can be unavailable (private mode); the default still works.
    }
  }, [fromPath]);

  return fromPath ?? stored;
}
