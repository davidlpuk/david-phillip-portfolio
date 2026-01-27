import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Lock, TrendingUp, Users, Target, Star, Play, Pause } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/shared/components/ui/carousel";

/**
 * Selected Work Section - Expert UX/UI Redesign
 */

interface CaseStudy {
  slug: string;
  company: string;
  title: string;
  role: string;
  description: string;
  metrics: readonly { value: string; label: string; icon?: "trending" | "users" | "target" | "star" }[];
  thumbnail: string;
  gradient: string;
}

const caseStudies: readonly CaseStudy[] = [
  {
    slug: "coutts", company: "Coutts", title: "Coutts: Wealth Management App",
    role: "Director · Private Banking",
    description: "Launched 4.2+ rated private banking app with zero security incidents, +22 NPS improvement and 30% digital adoption.",
    metrics: [{ value: "+22pts", label: "NPS", icon: "trending" }, { value: "30%", label: "Digital Adoption", icon: "users" }, { value: "5→15", label: "Team Size", icon: "users" }],
    thumbnail: "/images/case-study-coutts-hero.png", gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
  },

  {
    slug: "cognism", company: "Cognism", title: "Cognism: Scaling B2B SaaS Design Ops & Revenue Velocity",
    role: "Head of UX · B2B SaaS Scale-up",
    description: "Built the first product design team from scratch, lifting NPS from -16 to +12 during £20M→£80M ARR growth.",
    metrics: [{ value: "-16→+12", label: "NPS", icon: "trending" }, { value: "4x", label: "ARR Growth", icon: "star" }, { value: "0→4", label: "Team Built", icon: "users" }],
    thumbnail: "/images/case-study-hero-cognism.png", gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
  },
  {
    slug: "hsbc-kinetic", company: "HSBC Kinetic", title: "HSBC Kinetic: Transforming Small Business Lending",
    role: "Strategic UX Lead | SME Banking",
    description: "Led design strategy for a £14B initiative, establishing a high-velocity pod to deliver 5 core products and achieve 35% adoption.",
    metrics: [{ value: "35%", label: "Adoption", icon: "trending" }, { value: "5", label: "Products", icon: "target" }, { value: "30%", label: "Cycle Time", icon: "target" }],
    thumbnail: "/images/case-study-hero-hsbc.png", gradient: "from-red-500/20 via-pink-500/10 to-transparent",
  },
  {
    slug: "hsbc", company: "HSBC", title: "Small Business App",
    role: "Design Lead · Commercial Banking",
    description: "Revamped business banking platform, improving task completion from 62% to 81% with 85% design system adoption.",
    metrics: [{ value: "81%", label: "Task Complete", icon: "target" }, { value: "+32%", label: "Mobile", icon: "trending" }, { value: "85%", label: "Design System", icon: "star" }],
    thumbnail: "/images/fintech-abstract-1.png", gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
  },

  {
    slug: "schroders", company: "Schroders", title: "Schroders: Private Banking Digital Transformation",
    role: "UX Lead · Wealth Management",
    description: "Unified 12 legacy systems into one platform, delivering 65% engagement increase and 3x digital transactions.",
    metrics: [{ value: "+65%", label: "Engagement", icon: "trending" }, { value: "3x", label: "Transactions", icon: "star" }, { value: "94%", label: "Retention", icon: "target" }],
    thumbnail: "/images/regulatory-collaboration.png", gradient: "from-indigo-500/20 via-blue-500/10 to-transparent",
  },
] as const;

const isProtected = (slug: string): boolean => ["coutts", "hsbc", "schroders", "hsbc-kinetic", "cognism"].includes(slug);

const getIcon = (icon?: string) => {
  switch (icon) {
    case "trending": return <TrendingUp size={14} />;
    case "users": return <Users size={14} />;
    case "target": return <Target size={14} />;
    case "star": return <Star size={14} />;
    default: return <Star size={14} />;
  }
};

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <div className="h-full">
      <a href={`/case-study/${study.slug}`} className="block relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-accent/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full group focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none">
        <div className="relative h-48 md:h-56 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${study.gradient} opacity-50`} />
          <img src={study.thumbnail} alt={`${study.company} project`} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-foreground rounded-full text-xs font-bold">{study.company}</span>
            {isProtected(study.slug) && <span className="px-2 py-1 bg-accent/90 text-accent-foreground rounded-full text-xs font-medium flex items-center gap-1"><Lock size={10} />Private</span>}
          </div>
        </div>
        <div className="p-5 md:p-6">
          <h3 className="font-display text-xl md:text-2xl font-bold text-foreground leading-tight mb-2 group-hover:text-accent-foreground transition-colors">{study.title}</h3>
          <p className="font-sans text-sm text-muted-foreground font-medium mb-4">{study.role}</p>
          <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-2">{study.description}</p>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {study.metrics.map((m, i) => (
              <div key={i} className="text-center py-3 px-2 rounded-xl bg-secondary/50">
                <div className="flex items-center justify-center gap-1 mb-1 text-accent">{getIcon(m.icon)}</div>
                <div className="font-display text-lg font-bold text-foreground">{m.value}</div>
                <div className="font-sans text-[10px] text-muted-foreground uppercase tracking-wider">{m.label}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <span className="flex items-center gap-2 text-accent-foreground font-sans text-sm font-semibold group-hover:gap-3 transition-all">
              {isProtected(study.slug) ? "Unlock Case Study" : "View Case Study"}<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
            <div className="w-2 h-2 rounded-full bg-accent" />
          </div>
        </div>
      </a>
    </div>
  );
}

function SectionHeader({ isAutoPlaying, onToggleAutoPlay }: { isAutoPlaying: boolean; onToggleAutoPlay: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="mb-10 md:mb-12 text-center px-4">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-px w-8 md:w-12 bg-accent/30" />
        <span className="text-xs font-medium text-accent-foreground uppercase tracking-widest">Portfolio</span>
        <div className="h-px w-8 md:w-12 bg-accent/30" />
      </div>
      <div className="flex items-center justify-center gap-4 mb-4">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">Selected Work</h2>
        <button
          onClick={onToggleAutoPlay}
          className="p-2 rounded-full border border-border bg-card hover:bg-secondary hover:border-accent/30 transition-all focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label={isAutoPlaying ? "Pause auto-play" : "Play auto-play"}
          title={isAutoPlaying ? "Pause carousel" : "Resume carousel"}
        >
          {isAutoPlaying ? <Pause size={16} className="text-accent-foreground" /> : <Play size={16} className="text-accent-foreground" />}
        </button>
      </div>
      {isAutoPlaying && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="font-sans text-xs text-muted-foreground mb-2 flex items-center justify-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Auto-playing every 6 seconds
        </motion.p>
      )}
      <p className="font-sans text-base md:text-lg text-muted-foreground max-w-xl mx-auto">Design leadership across fintech, wealth management, and enterprise platforms</p>
    </motion.div>
  );
}

function SelectedWork() {
  const [api, setApi] = useState<CarouselApi | undefined>(undefined);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Empty state check
  if (caseStudies.length === 0) {
    return (
      <section id="work" className="py-16 md:py-20 lg:py-32 bg-background border-t border-border">
        <div className="container max-w-5xl">
          <SectionHeader isAutoPlaying={false} onToggleAutoPlay={() => { }} />
          <div className="text-center py-20">
            <p className="font-sans text-lg text-muted-foreground">No case studies available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (isAutoPlaying && api) {
      autoPlayRef.current = setInterval(() => {
        api.scrollNext();
      }, 6000);
    } else {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    }
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [isAutoPlaying, api]);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(prev => !prev);
  }, []);

  return (
    <section id="work" className="py-16 md:py-20 lg:py-32 bg-background border-t border-border overflow-hidden">
      <div className="container max-w-5xl">
        <SectionHeader isAutoPlaying={isAutoPlaying} onToggleAutoPlay={toggleAutoPlay} />
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
            containScroll: "trimSnaps",
          }}
          className="w-full"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <CarouselContent>
            {caseStudies.map((study) => (
              <CarouselItem key={study.slug} className="!basis-auto flex-shrink-0 w-full md:w-[85%] lg:w-[75%] pr-6">
                <CaseStudyCard study={study} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {count > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button onClick={() => api?.scrollPrev()} className="p-3 rounded-full border border-border bg-card hover:bg-secondary hover:border-accent/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-accent" aria-label="Previous">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: count }).map((_, i) => (
                <button key={i} onClick={() => api?.scrollTo(i)} className={`w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-accent ${i === current ? "w-8 bg-accent-foreground" : "bg-border hover:bg-accent-foreground/50"}`} aria-label={`Go to slide ${i + 1}`} />
              ))}
            </div>
            <button onClick={() => api?.scrollNext()} className="p-3 rounded-full border border-border bg-card hover:bg-secondary hover:border-accent/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-accent" aria-label="Next">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default SelectedWork;
