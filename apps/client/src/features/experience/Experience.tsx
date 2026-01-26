import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, TrendingUp, Crown, Building2, Landmark, BarChart, BriefcaseMedical, ArrowRight, Lock } from "lucide-react";

/**
 * Experience Section
 * Design: Institutional Elegance - enhanced vertical timeline layout
 * Typography: Montserrat for company names and descriptions
 * Color: Subtle borders, deep charcoal text, accent highlights
 * Animation: Staggered entrance on scroll with enhanced hover effects
 */

// Memoized helper function to format period with dynamic end year
const formatPeriod = (startYear: number, endYear: number | "present"): string => {
  const currentYear = new Date().getFullYear();
  const actualEndYear = endYear === "present" ? currentYear : endYear;
  return `${startYear}–${actualEndYear.toString().slice(-2)}`;
};

// Memoized animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

// Memoized experience data
const experiences = [
  {
    company: "Cognism",
    role: "Head of UX - Product Design",
    startYear: 2022,
    endYear: 2024,
    description:
      "Built first Product Design function during 4x growth ($20M→$80M ARR). Improved NPS from -16 to +12 (ease of use cited as main driver) and achieved 100% team retention over two years.",
    icon: TrendingUp,
    color: "from-neutral-800 to-neutral-950",
    caseStudySlug: "cognism",
  },
  {
    company: "Coutts",
    role: "Design Director",
    startYear: 2020,
    endYear: 2022 as const,
    description:
      "Directed Digital Experience for a 320-year-old private bank. Scaled team 5→15 specialists and directed the launch of the 4.2★ rated mobile app. Saved £400K+ annually via Figma transformation across 280+ designers.",
    icon: Crown,
    color: "from-neutral-800 to-neutral-950",
    caseStudySlug: "coutts",
  },
  {
    company: "HSBC Kinetic",
    role: "UX Lead / Product Design (Contract)",
    startYear: 2019,
    endYear: 2019 as const,
    description:
      "Led design for multi-billion pound transformation. Scaled UX/UI team across 5 lending products and achieved 35% adoption in 6 months (target was 25%). Integrated shared pattern library with 80%+ reuse.",
    icon: Building2,
    color: "from-neutral-800 to-neutral-950",
    caseStudySlug: "hsbc-kinetic",
  },
  {
    company: "Schroders",
    role: "UX Lead - Wealth & Investments",
    startYear: 2016,
    endYear: 2019 as const,
    description:
      "Led digital transformation for Private Banking and global UX projects. Unified 3 legacy systems into a single platform and increased customer engagement/retention for HNWI clients.",
    icon: Landmark,
    color: "from-neutral-800 to-neutral-950",
  },
  {
    company: "Deutsche Bank",
    role: "UX Lead",
    startYear: 2016,
    endYear: 2016 as const,
    description:
      "Led design of global HR intranet and established mobile UX laboratories in UK and Germany. Evangelised UX best practices to 200+ stakeholders.",
    icon: Briefcase,
    color: "from-slate-500 to-slate-700",
  },
  {
    company: "TSB Bank",
    role: "UX Lead",
    startYear: 2013,
    endYear: 2015 as const,
    description:
      "Delivered branch locator and digital-only current account. Established UX practice within the digital transformation programme and drove customer acquisition via multi-million pound campaigns.",
    icon: Landmark,
    color: "from-slate-500 to-slate-700",
  },
  {
    company: "Barclays Wealth",
    role: "UX Lead",
    startYear: 2012,
    endYear: 2013 as const,
    description:
      "Optimised conversion through A/B testing and CRO. Managed customer journeys across international banking platforms and built a foundation in analytics-driven design.",
    icon: BriefcaseMedical,
    color: "from-slate-500 to-slate-700",
  },
  {
    company: "HSBC",
    role: "Senior UX Designer",
    startYear: 2008,
    endYear: 2012 as const,
    description:
      "Managed UK commercial digital presence (34M+ annual visits). Optimized conversion rates through MVT/AB testing and produced new customer journeys for key products.",
    icon: Building2,
    color: "from-slate-500 to-slate-700",
  },
  {
    company: "BlackRock",
    role: "AVP – Senior Intl. Digital Marketing Manager",
    startYear: 2006,
    endYear: 2008 as const,
    description:
      "Managed digital transformation across 21 countries (EMEA, APAC, and LATAM). Established global design standards and WCAG accessibility frameworks at scale.",
    icon: BarChart,
    color: "from-neutral-800 to-neutral-950",
  },
];

function Experience() {
  return (
    <section id="experience" className="py-20 md:py-32 bg-background border-t border-border">
      <div className="container max-w-4xl px-6 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          {/* Section Label */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-accent-foreground/30"></div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Background</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Experience
          </h2>
          <p className="font-sans text-lg text-muted-foreground">
            20+ years building design leadership in financial services and B2B SaaS
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-0"
        >
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative pl-8 pb-12 last:pb-0 border-l-2 border-border last:border-l-0"
              >
                {/* Timeline Dot with Icon */}
                <div className="absolute left-0 top-0 -translate-x-[calc(50%+1px)] w-8 h-8 bg-card rounded-full border-2 border-border flex items-center justify-center z-10">
                  <Icon size={16} className="text-accent-foreground" />
                </div>

                {/* Connecting Line */}
                <div className="absolute left-0 top-8 -translate-x-[calc(50%+1px)] w-0.5 h-full bg-border" />

                {/* Content Card */}
                <div className="relative bg-card p-6 rounded-xl border border-border hover:border-accent-foreground/30 hover:shadow-lg transition-all duration-500 focus-visible:ring-2 focus-visible:ring-accent-foreground/30 focus-visible:outline-none">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="font-serif font-bold text-foreground">
                        {exp.company}
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-muted-foreground bg-secondary px-3 py-1.5 rounded-full w-fit">
                      <Calendar size={12} />
                      {formatPeriod(exp.startYear, exp.endYear)}
                    </span>
                  </div>
                  <h4 className="font-sans text-sm md:text-base font-semibold text-accent-foreground mb-3 flex items-center gap-2">
                    <Briefcase size={14} />
                    {exp.role}
                  </h4>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                  {exp.caseStudySlug && (
                    <a
                      href={`/case-study/${exp.caseStudySlug}`}
                      className="inline-flex items-center gap-2 text-sm font-sans font-medium text-foreground hover:text-accent-foreground transition-colors duration-200 mt-4 group focus-visible:ring-2 focus-visible:ring-accent-foreground/50 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm"
                      aria-label={`Unlock case study for ${exp.company}`}
                    >
                      <Lock size={14} className="text-muted-foreground group-hover:text-accent-foreground transition-colors" />
                      <span className="underline decoration-muted-foreground/30 hover:decoration-accent-foreground underline-offset-4 transition-all">Unlock Case Study</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default React.memo(Experience);
