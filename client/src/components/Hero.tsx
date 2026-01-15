import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Hero Section
 * Design: Institutional Elegance - bold typography, generous whitespace, subtle pattern background
 * Typography: Large Montserrat headlines and body text
 * Color: Off-white background with network pattern, deep charcoal text, gold accents
 * Animation: Fade-in on load, subtle scale effect
 * Features: Client logo strip for social proof
 */

// Client portfolio data with logo paths
const clients = [
  { name: "Coutts", industry: "Private Banking", logo: "/images/logos/logo-coutts.svg" },
  { name: "HSBC", industry: "Global Banking", logo: "/images/logos/logo-hsbc.svg" },
  { name: "Schroders", industry: "Investment Management", logo: "/images/logos/logo-schorders.svg" },
  { name: "Cognism", industry: "B2B SaaS", logo: "/images/logos/logo-cognism.svg" },
  { name: "BlackRock", industry: "Asset Management", logo: "/images/logos/logo-blackrock.svg" },
  { name: "Deutsche Bank", industry: "Global Banking", logo: "/images/logos/logo-deustche-bank.svg" },
  { name: "Barclays", industry: "Financial Services", logo: "/images/logos/logo-barclays.svg" },
];

// Key achievements data
const achievements = [
  { value: "20+", label: "Years in Financial Services" },
  { value: "5→15", label: "Teams Scaled" },
  { value: "4× Revenue Growth (Cognism: $20M→$80M)", label: "Revenue Growth" },
  { value: "BlackRock → Coutts → HSBC → Cognism", label: "Career Path" },
];

// Memoized animation variants
export default function Hero() {
  const container = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }), []);

  const item = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }), []);

  return (
    <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center pt-28 md:pt-32 pb-12 md:pb-16 lg:pb-24 overflow-hidden">
      {/* Background Pattern - Lazy loaded for performance */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/hero-pattern.png"
          alt=""
          role="presentation"
          className="w-full h-full object-cover opacity-40"
          loading="lazy"
          width="1920"
          height="1080"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Decorative Doodles */}
      <div className="absolute top-32 left-8 opacity-60 pointer-events-none">
        <div className="doodle-sparkle animate-pulse"></div>
      </div>
      <div className="absolute top-48 right-12 opacity-40 pointer-events-none">
        <div className="doodle-sparkle w-6 h-6 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
      <div className="absolute bottom-32 left-16 opacity-30 pointer-events-none">
        <div className="doodle-sparkle w-8 h-8 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Energy Sparkles */}
      <div className="absolute top-20 right-20 opacity-50 pointer-events-none">
        <Sparkles className="w-6 h-6 text-primary animate-pulse" style={{ animationDelay: '0.2s' }} />
      </div>
      <div className="absolute bottom-40 right-32 opacity-40 pointer-events-none">
        <Sparkles className="w-4 h-4 text-accent animate-pulse" style={{ animationDelay: '0.8s' }} />
      </div>
      <div className="absolute top-60 left-20 opacity-30 pointer-events-none">
        <Sparkles className="w-5 h-5 text-primary animate-pulse" style={{ animationDelay: '1.2s' }} />
      </div>

      <motion.div
        className="container max-w-6xl px-6 md:px-0"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Section Label */}
        <motion.div variants={item} className="flex items-center gap-2 mb-6">
          <div className="h-px w-8 bg-accent-foreground/30"></div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Design Leader & Head of Design</span>
        </motion.div>

        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 order-2 md:order-1 min-w-0">
            {/* Main Headline */}
            <motion.h1
              variants={item}
              className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-foreground mb-6 leading-tight md:leading-8xl"
            >
              Everyone generates.<br />
              <span className="highlighter-stroke">Few orchestrate.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={item}
              className="font-sans text-lg md:text-xl mb-8 max-w-2xl leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Two decades turning complex financial services challenges into shipped products. Strategy, design, and code — no handoffs, no gaps
            </motion.p>

            {/* Key Stats */}
            <motion.div
              variants={item}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 md:gap-x-16 gap-y-8 md:gap-y-12 mb-8 md:mb-12"
            >
              {achievements.map((stat, idx) => (
                <div key={idx} className="metric-card">
                  <h3 className="metric-value">{stat.value}</h3>
                  <span className="metric-label">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="xl">
                <a href="#work">
                  View Work
                  <ArrowRight size={18} />
                </a>
              </Button>
              <Button asChild variant="outline" size="xl">
                <a href="/cv">
                  View CV
                </a>
              </Button>
            </motion.div>

            {/* Client Logo Strip - Social Proof */}
            <motion.div
              variants={item}
              className="mt-20 pt-10 border-t border-border/30"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-10 text-center md:text-left" style={{ color: 'var(--text-tertiary)' }}>
                Trusted by
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-10 gap-y-12 items-center justify-items-center md:justify-items-start">
                {clients.map((client, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-center h-16 w-full opacity-40 hover:opacity-100 transition-all duration-500 ease-out"
                    title={`${client.name} - ${client.industry}`}
                  >
                    <img
                      src={client.logo}
                      alt={`${client.name} logo`}
                      className="h-12 md:h-14 w-auto max-w-full object-contain filter grayscale brightness-0 dark:brightness-100 dark:invert"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Hero Image */}
          <motion.div variants={item} className="flex-shrink-0 order-1 md:order-2 w-full md:w-auto">
            <div className="w-full max-w-sm sm:max-w-md md:w-72 lg:w-80 xl:w-96 mx-auto md:mx-0">
              <img
                src="/images/hero-image.png"
                alt="David Phillip"
                className="w-full h-auto"
                width="384"
                height="480"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
