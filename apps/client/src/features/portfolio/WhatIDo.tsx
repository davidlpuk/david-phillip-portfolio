import { Lightbulb, Palette, Code, Sparkles, Target, Layers, Zap, Brain, Shield, Users, Settings, Globe } from "lucide-react";

/**
 * What I Do Section
 * Updated with new content structure
 */

const pillars = [
  {
    icon: Lightbulb,
    title: "Strategy & Research",
    description:
      "Finding the right problem before designing the wrong solution. User research, analytics, and market context—grounded in financial services reality.",
  },
  {
    icon: Palette,
    title: "Product & UX Design",
    description:
      "End-to-end design for complex systems. Multi-persona workflows, permissions, regulatory constraints. Real users, real contexts.",
  },
  {
    icon: Code,
    title: "Code & Deployment",
    description:
      "I build and ship. Technical fluency means I prototype faster than most teams can brief.",
  },
];

const expertiseTags = [
  { icon: Target, label: "Domain expertise" },
  { icon: Sparkles, label: "AI fluency" },
  { icon: Layers, label: "End-to-end ownership" },
];

export default function WhatIDo() {
  return (
    <section
      className="py-16 md:py-20 lg:py-32 bg-background border-t border-border relative overflow-hidden"
    >
      {/* Decorative Doodles */}
      <div className="absolute top-16 right-8 opacity-30 pointer-events-none">
        <Sparkles className="w-5 h-5 text-accent animate-pulse" style={{ animationDelay: '0.3s' }} />
      </div>
      <div className="absolute bottom-20 left-12 opacity-25 pointer-events-none">
        <div className="doodle-sparkle w-4 h-4 animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container max-w-5xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="font-sans text-sm font-bold uppercase tracking-widest mb-4 block text-slate-500 dark:text-slate-400">
            From Problem to Production
          </span>
          <h2 className="font-display text-7xl font-bold text-foreground mb-4 leading-7xl">
            What I <span className="highlighter-stroke">Do</span>
          </h2>
          <p className="font-sans text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            From Problem to Production<br />
            Most practitioners hand off. I ship.<br />
            Most leaders delegate. I orchestrate.
            <br /><br />
            Technical fluency + AI workflows + regulatory expertise =<br /> end-to-end ownership from strategy to shipped code.
          </p>
        </div>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 md:p-8 rounded-xl bg-card border border-border hover:border-accent/50 transition-colors cursor-default focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:outline-none"
                tabIndex={0}
                role="region"
                aria-label={pillar.title}
              >
                <div className="relative mb-6 mt-2">
                  <div className="w-14 h-14 md:w-12 md:h-12 rounded-xl bg-primary/50 flex items-center justify-center">
                    <Icon size={28} className="text-accent-foreground" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-4">
                  {pillar.title}
                </h3>
                <p className="font-sans text-base md:text-base text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Tagline */}
        <div className="p-8 md:p-10 lg:p-14 bg-card border border-border rounded-xl text-center">
          <h4 className="font-display text-6xl font-bold text-foreground mb-4 leading-6xl">
            My edge isn't output.<br />
            It's knowing what to build, why it matters, and how to ship it properly.
          </h4>
          <p className="font-sans text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
            I combine strategic thinking with hands-on execution to deliver solutions that work in the real world.
          </p>

          {/* Expertise tags */}
          <div className="flex flex-wrap items-center justify-center gap-3" role="list" aria-label="Key expertise areas">
            {expertiseTags.map((tag, index) => {
              const TagIcon = tag.icon;
              return (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/50 text-sm font-sans text-accent-foreground font-medium tracking-wide"
                  role="listitem"
                >
                  <TagIcon size={14} aria-hidden="true" />
                  {tag.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
