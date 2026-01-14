import { Check, Sparkles, Shield, Globe, ArrowRight, Target, Unlock, Heart, TrendingUp, Cpu, Globe2, Scale, Zap, Brain, ShieldCheck, Users2, Settings, Building2 } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * About / Leadership Section
 * Updated with new content structure
 */

const capabilityGroups = [
  {
    title: "Strategy & Leadership",
    icon: Sparkles,
    capabilities: [
      "Design strategy aligned with business objectives",
      "Building and scaling high-performing teams",
      "Stakeholder navigation in regulated industries",
      "AI strategy and team enablement",
    ],
  },
  {
    title: "Design & Research",
    icon: Globe,
    capabilities: [
      "Complex B2B/enterprise systems",
      "Data-informed design using product analytics",
      "Inclusive design and accessibility",
      "Design system creation and governance",
    ],
  },
  {
    title: "Technical & Delivery",
    icon: Shield,
    capabilities: [
      "Technical fluency (APIs, microservices, security)",
      "Regulated industry compliance",
      "Cross-functional leadership",
      "Agile methodology and rapid iteration",
    ],
  },
];

const principles = [
  {
    title: "Clarity",
    description: "Every designer knows the metric they're moving. No ambiguity about what success looks like.",
    icon: Target,
    color: "from-neutral-800 to-neutral-950",
    bgGlow: "bg-neutral-700/20",
  },
  {
    title: "Autonomy",
    description: "I hire adults. Align on outcomes, then get out of the way. Coach and unblock—don't art-direct.",
    icon: Unlock,
    color: "from-neutral-800 to-neutral-950",
    bgGlow: "bg-neutral-700/20",
  },
  {
    title: "Safety",
    description: "Share failures openly. Learn fast. 100% retention at Cognism over two years.",
    icon: Heart,
    color: "from-neutral-800 to-neutral-950",
    bgGlow: "bg-neutral-700/20",
  },
  {
    title: "Growth",
    description: "Match projects to stretch skills. People stay when they're growing.",
    icon: TrendingUp,
    color: "from-neutral-800 to-neutral-950",
    bgGlow: "bg-neutral-700/20",
  },
];

export default function About() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress for dark section
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('about');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - windowHeight)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="about" className="bg-brand-dark relative overflow-hidden">
      {/* Scroll Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-neutral-800 to-neutral-950 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Decorative Doodles */}
      <div className="absolute top-20 left-8 opacity-20 pointer-events-none hidden md:block">
        <div className="doodle-sparkle w-6 h-6 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
      <div className="absolute top-40 right-16 opacity-15 pointer-events-none hidden md:block">
        <Sparkles className="w-4 h-4 text-white/30 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Full-width color block */}
      <div className="w-full">
        {/* Intro */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20 lg:py-28">
          <div className="mb-12 md:mb-16 max-w-3xl mx-auto text-center px-4 md:px-0">
            {/* Section Label */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px w-6 md:w-8 bg-white/30"></div>
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--text-inverse-quaternary)' }}>I Build Teams That Ship</span>
              <div className="h-px w-6 md:w-8 bg-white/30"></div>
            </div>
            <h2 className="font-display text-7xl font-bold mb-6 leading-7xl" style={{ color: 'var(--text-inverse-primary)' }}>
              I Build <span className="highlighter-stroke text-primary">Teams That Ship</span>
            </h2>
            <p className="font-sans text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-inverse-secondary)' }}>
              I've spent 20 years building design teams in financial services—from scaling a 15-person org to shipping production code myself. Most leaders pick a lane: strategy or craft. I do both, and I hire people who can too. What I've learned is that great design leadership comes down to clarity—knowing what to build, getting the right people aligned, and moving fast from insight to shipped product.
            </p>
          </div>
        </div>
      </div>

      {/* Organic Divider */}
      <div className="organic-divider">
        <svg className="stroke-primary" fill="none" height="20" strokeLinecap="round" strokeWidth="3" viewBox="0 0 120 20" width="120">
          <path d="M5 10C20 10 25 5 40 5C55 5 60 10 75 10C90 10 95 5 115 5"></path>
        </svg>
      </div>

      {/* Photo and Capabilities Section */}
      <div className="w-full bg-brand-dark">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20 xl:py-24">
          {/* Photo and Capabilities - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-16 md:mb-24">
            {/* Photo - Left on Desktop */}
            <div>
              <div className="relative rounded-xl overflow-hidden bg-brand-darker aspect-[4/5]">
                <img
                  src="/images/about-david.png"
                  alt="David Phillip - Product Leader"
                  className="w-full h-full object-cover"
                  width="320"
                  height="400"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent"
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <p className="font-sans text-base md:text-lg font-semibold mb-1" style={{ color: 'var(--text-inverse-primary)' }}>
                    David Phillip
                  </p>
                  <p className="font-sans text-sm" style={{ color: 'var(--text-inverse-secondary)' }}>
                    Product Leader & UX Director
                  </p>
                </div>
              </div>
            </div>

            {/* Capabilities - Right on Desktop */}
            <div>
              <h3 className="font-display text-6xl font-bold mb-6 leading-6xl" style={{ color: 'var(--text-inverse-primary)' }}>
                Core Capabilities
              </h3>
              <div className="space-y-8">
                {capabilityGroups.map((group, groupIdx) => (
                  <div key={groupIdx} className="group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-brand-darker flex items-center justify-center group-hover:bg-primary/40 transition-colors duration-300">
                        <group.icon size={18} style={{ color: 'var(--text-inverse-primary)' }} />
                      </div>
                      <h4 className="font-sans font-semibold text-base md:text-lg" style={{ color: 'var(--text-inverse-primary)' }}>
                        {group.title}
                      </h4>
                    </div>
                    <ul className="space-y-3 ml-11">
                      {group.capabilities.map((capability, capIdx) => (
                        <li key={capIdx} className="flex items-start gap-3">
                          <Check size={16} className="flex-shrink-0 mt-1" style={{ color: 'var(--text-inverse-secondary)' }} />
                          <span className="font-sans text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-inverse-secondary)' }}>
                            {capability}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* What Sets Me Apart */}
          <div className="mb-16 md:mb-24">
            <div className="flex items-center gap-2 mb-8 justify-center">
              <div className="h-px w-6 md:w-8 bg-white/30"></div>
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--text-inverse-quaternary)' }}>What Sets Me Apart</span>
              <div className="h-px w-6 md:w-8 bg-white/30"></div>
            </div>
            <h3 className="font-display text-6xl font-bold mb-10 md:mb-12 text-center leading-6xl" style={{ color: 'var(--text-inverse-primary)' }}>
              What Sets Me Apart
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  icon: Brain,
                  title: "AI Fluency",
                  description: "I design workflows where small teams outperform large ones—without sacrificing quality or governance.",
                  color: "from-neutral-800 to-neutral-950",
                  bgGlow: "bg-neutral-700/20",
                },
                {
                  icon: ShieldCheck,
                  title: "Regulated Industries",
                  description: "Twenty years in finance. I ship faster in environments where others slow down.",
                  color: "from-neutral-800 to-neutral-950",
                  bgGlow: "bg-neutral-700/20",
                },
                {
                  icon: Building2,
                  title: "Global Scale",
                  description: "Led design across 21 countries at BlackRock. I know how to deliver across cultures and regulatory frameworks.",
                  color: "from-neutral-800 to-neutral-950",
                  bgGlow: "bg-neutral-700/20",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group relative p-6 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
                >
                  {/* Gradient Accent Line */}
                  <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.color} opacity-60 group-hover:opacity-100 transition-opacity`}></div>

                  {/* Icon Container */}
                  <div className="relative mb-5">
                    <div className={`w-12 h-12 rounded-xl ${item.bgGlow} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon size={22} style={{ color: 'var(--text-inverse-primary)' }} />
                    </div>
                    {/* Subtle glow effect */}
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 blur-lg -z-10 transition-opacity duration-300`}></div>
                  </div>

                  <h4 className="font-sans font-semibold mb-2 transition-colors" style={{ color: 'var(--text-inverse-primary)' }}>
                    {item.title}
                  </h4>
                  <p className="font-sans text-sm leading-relaxed transition-colors" style={{ color: 'var(--text-inverse-secondary)' }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Principles Section */}
      <div className="w-full bg-brand-dark/50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-6 md:w-8 bg-white/30"></div>
                <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--text-inverse-quaternary)' }}>How I Lead</span>
              </div>
              <h3 className="font-display text-6xl font-bold leading-6xl" style={{ color: 'var(--text-inverse-primary)' }}>
                How I Lead
              </h3>
              <p className="font-sans text-sm md:text-base mt-4 leading-relaxed" style={{ color: 'var(--text-inverse-secondary)' }}>
                Great design comes from great teams. These principles shape how I hire, coach, and create conditions for people to do their best work.
              </p>
            </div>
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-2.5 bg-white text-brand-dark rounded-lg font-medium text-sm hover:bg-white/90 transition-all duration-200"
            >
              Let's work together
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Principles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {principles.map((principle, idx) => (
              <div
                key={idx}
                className="group relative p-4 md:p-5 lg:p-6 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
              >
                {/* Gradient Accent Line */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${principle.color} opacity-60 group-hover:opacity-100 transition-opacity`}></div>

                {/* Icon Container */}
                <div className="relative mb-5">
                  <div className={`w-12 h-12 rounded-xl ${principle.bgGlow} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <principle.icon size={22} style={{ color: 'var(--text-inverse-primary)' }} />
                  </div>
                  {/* Subtle glow effect */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${principle.color} opacity-0 group-hover:opacity-20 blur-lg -z-10 transition-opacity duration-300`}></div>
                </div>

                <h4 className="font-display text-2xl font-bold mb-3 transition-colors leading-tight" style={{ color: 'var(--text-inverse-primary)' }}>
                  {principle.title}
                </h4>
                <p className="font-sans text-sm leading-relaxed transition-colors" style={{ color: 'var(--text-inverse-secondary)' }}>
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
