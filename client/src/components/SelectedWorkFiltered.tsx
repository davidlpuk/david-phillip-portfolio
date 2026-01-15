import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Lock, TrendingUp, Users, Target, Star } from "lucide-react";

/**
 * Selected Work Section - Grid Layout
 *
 * Features:
 * - Grid layout (2 cols desktop, 1 col mobile)
 * - Smooth fade transitions
 * - Keyboard accessible
 * - Luxury editorial aesthetic
 */

// ============================================================================
// Types & Data
// ============================================================================

interface CaseStudy {
  slug: string;
  company: string;
  title: string;
  role: string;
  category: "Fintech" | "SaaS" | "Enterprise" | "Wealth Management";
  description: string;
  metrics: readonly { value: string; label: string; icon?: "trending" | "users" | "target" | "star" }[];
  thumbnail: string;
  gradient: string;
}

const caseStudies: readonly CaseStudy[] = [
  {
    slug: "coutts",
    company: "Coutts",
    title: "Wealth Management App",
    role: "Director · Private Banking",
    category: "Wealth Management",
    description: "Launched 4.2+ rated private banking app with zero security incidents, +22 NPS improvement and 30% digital adoption.",
    metrics: [
      { value: "+22pts", label: "NPS", icon: "trending" },
      { value: "30%", label: "Digital Adoption", icon: "users" },
      { value: "5→15", label: "Team Size", icon: "users" }
    ],
    thumbnail: "/images/case-study-coutts-hero.png",
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
  },
  {
    slug: "cognism",
    company: "Cognism",
    title: "Scaling Design for 4x Growth",
    role: "Head of UX · B2B SaaS Scale-up",
    category: "SaaS",
    description: "Built the first product design team from scratch, lifting NPS from -16 to +12 during £20M→£80M ARR growth.",
    metrics: [
      { value: "-16→+12", label: "NPS", icon: "trending" },
      { value: "4x", label: "ARR Growth", icon: "star" },
      { value: "0→4", label: "Team Built", icon: "users" }
    ],
    thumbnail: "/images/case-study-hero-cognism.png",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
  },
  {
    slug: "hsbc",
    company: "HSBC",
    title: "Small Business App",
    role: "Design Lead · Commercial Banking",
    category: "Enterprise",
    description: "Revamped business banking platform, improving task completion from 62% to 81% with 85% design system adoption.",
    metrics: [
      { value: "81%", label: "Task Complete", icon: "target" },
      { value: "+32%", label: "Mobile", icon: "trending" },
      { value: "85%", label: "Design System", icon: "star" }
    ],
    thumbnail: "/images/case-study-hero-hsbc.png",
    gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
  },
  {
    slug: "ux-sidekick",
    company: "UX Sidekick",
    title: "AI-Powered Design Feedback Platform",
    role: "Full-Stack Developer & Product Designer",
    category: "SaaS",
    description: "Built an AI platform providing PhD-level UX feedback in 30 seconds, with spatial annotation and Tailwind code solutions.",
    metrics: [
      { value: "30s", label: "Analysis", icon: "trending" },
      { value: "95%", label: "Coverage", icon: "target" },
      { value: "6-8", label: "Avg Issues", icon: "star" }
    ],
    thumbnail: "/images/case-study-uxsidekick-hero.png",
    gradient: "from-blue-500/20 via-purple-500/10 to-transparent",
  },
] as const;

// Protected case studies require password
const isProtected = (slug: string): boolean =>
  ["coutts", "hsbc", "schroders", "hsbc-kinetic", "cognism"].includes(slug);

// ============================================================================
// Icon Helper - Memoized for performance
// ============================================================================

const iconComponents = {
  trending: <TrendingUp size={14} />,
  users: <Users size={14} />,
  target: <Target size={14} />,
  star: <Star size={14} />,
} as const;

const getIcon = (icon?: string) => {
  return iconComponents[icon as keyof typeof iconComponents] || iconComponents.star;
};

// ============================================================================
// Case Study Card Component - Memoized
// ============================================================================

interface CaseStudyCardProps {
  study: CaseStudy;
}

const CaseStudyCard = memo(function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <a
        href={`/case-study/${study.slug}`}
        className="block relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-border hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full group focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-none"
      >
        {/* Thumbnail */}
        <div className="relative h-56 md:h-64 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${study.gradient} opacity-50`} />
          <img
            src={study.thumbnail}
            alt={`${study.company} project`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Company Badge & Privacy Label */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-foreground rounded-full text-xs font-bold">
              {study.company}
            </span>
            {isProtected(study.slug) && (
              <span className="px-2 py-1 bg-foreground/90 text-background rounded-full text-xs font-medium flex items-center gap-1">
                <Lock size={10} />
                Private
              </span>
            )}
          </div>

          {/* Category Tag */}
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-white rounded-full text-xs font-medium">
              {study.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display text-xl md:text-2xl font-bold text-foreground leading-tight mb-2 group-hover:text-foreground transition-colors">
            {study.title}
          </h3>
          <p className="font-sans text-sm text-muted-foreground font-medium mb-4">
            {study.role}
          </p>
          <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-2">
            {study.description}
          </p>

          {/* CTA */}
          <div className="flex items-center pt-4 border-t border-border/50">
            <span className="flex items-center gap-2 text-foreground font-sans text-sm font-semibold group-hover:gap-3 transition-all">
              {isProtected(study.slug) ? "Unlock Case Study" : "View Case Study"}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </a>
    </motion.div>
  );
});

// ============================================================================
// Section Header Component - Memoized
// ============================================================================

const SectionHeader = memo(function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mb-10 md:mb-12 text-center"
    >
      {/* Section Label */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-px w-8 md:w-12 bg-accent/30" />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
          Portfolio
        </span>
        <div className="h-px w-8 md:w-12 bg-accent/30" />
      </div>

      {/* Heading */}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
        Selected Work
      </h2>

      {/* Description */}
      <p className="font-sans text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
        Design leadership across fintech, wealth management, and enterprise platforms
      </p>
    </motion.div>
  );
});

// ============================================================================
// Main Component - Optimized
// ============================================================================

export default function SelectedWorkFiltered() {
  // Empty state check
  if (caseStudies.length === 0) {
    return (
      <section id="work" className="py-16 md:py-20 lg:py-32 bg-background border-t border-border">
        <div className="container max-w-6xl">
          <SectionHeader />
          <div className="text-center py-20">
            <p className="font-sans text-lg text-muted-foreground">
              No case studies available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="work" className="py-16 md:py-20 lg:py-32 bg-background border-t border-border">
      <div className="container max-w-6xl">
        <SectionHeader />

        {/* Case Studies Grid */}
        <motion.div
          id="case-studies-grid"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
