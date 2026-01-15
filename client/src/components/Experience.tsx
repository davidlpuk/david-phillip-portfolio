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
    role: "Head of UX",
    startYear: 2022,
    endYear: 2024,
    description:
      "Built first product design team from scratch during 4x growth ($20M→$80M ARR). Lifted NPS from -16 to +12 with ease of use cited as main highlight. Established design system and research practice that enabled designers to stay ahead of agile teams across all features.",
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
      "Scaled team 200% (5→15 specialists). Launched 4.2+ rated mobile app with zero security incidents. Established first UX Research practice. Led Figma migration across 280+ designers at NatWest Group, delivering estimated £400K+ annual savings.",
    icon: Crown,
    color: "from-neutral-800 to-neutral-950",
    caseStudySlug: "coutts",
  },
  {
    company: "HSBC",
    role: "UX Lead",
    startYear: 2018,
    endYear: 2020 as const,
    description:
      "Led onboarding transformation for HSBC Kinetic small business banking app, contributing to significant revenue impact. Balanced user experience with technical constraints and compliance requirements.",
    icon: Building2,
    color: "from-neutral-800 to-neutral-950",
    caseStudySlug: "hsbc-kinetic",
  },
  {
    company: "Schroders",
    role: "UX Lead",
    startYear: 2016,
    endYear: 2018 as const,
    description:
      "Modernised wealth management platforms for high-net-worth clients. Led zero-to-one digital transformation across Private Banking division.",
    icon: Landmark,
    color: "from-neutral-800 to-neutral-950",
    caseStudySlug: "schroders",
  },
  {
    company: "BlackRock",
    role: "AVP, Digital Int. Marketing Manager",
    startYear: 2012,
    endYear: 2016 as const,
    description:
      "High-profile global rebrands and UX work covering 21 countries across Asia Pacific, EMEA, and LATAM. Developed cross-cultural design sensibility and understanding of global regulatory frameworks.",
    icon: BarChart,
    color: "from-neutral-800 to-neutral-950",
  },
  {
    company: "Deutsche Bank, Barclays",
    role: "UX Lead",
    startYear: 2004,
    endYear: 2012 as const,
    description:
      "Early career foundation in complex financial services UX. Developed skills in digital strategy, backend databases, and frontend coding that inform my technical fluency today.",
    icon: BriefcaseMedical,
    color: "from-slate-500 to-slate-700",
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
