import { useState, useEffect, useCallback } from "react";
import Header from "@/shared/components/Header";
import Hero from "@/features/hero/Hero";
import SkillsOrchestration from "@/features/skills-orchestration/SkillsOrchestration";
import WhatIDo from "@/features/portfolio/WhatIDo";
import HowIUseAI from "@/features/skills-orchestration/HowIUseAI";
import SelectedWorkFiltered from "@/features/portfolio/SelectedWorkFiltered";
import About from "@/features/about/About";
import Experience from "@/features/experience/Experience";
import Testimonials from "@/features/testimonials/Testimonials";
import Contact from "@/features/contact/Contact";

/**
 * Home Page - David Phillip Portfolio
 *
 * ACCESSIBILITY IMPROVEMENTS APPLIED:
 * 1. Skip Link: Added keyboard-accessible skip to main content
 * 2. ARIA Landmarks: Proper region and section labels
 * 3. Focus Management: Visible focus rings on all interactive elements
 * 4. Semantic HTML: Correct heading hierarchy (h1 → h2 → h3)
 * 5. Reduced Motion: Respects user motion preferences
 *
 * Design System: Institutional Elegance
 * Typography: Playfair Display (serif) + Inter (sans-serif)
 * Color: Off-white background, deep charcoal text, gold accents
 * Aesthetic: Premium minimal, Swiss modernism, sophisticated restraint
 */

export default function Home() {
  const [currentSection, setCurrentSection] = useState<string>('');


  // Detect current section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['work', 'about', 'experience', 'contact'];
      const scrollY = window.scrollY + 100; // offset for header

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setCurrentSection(section);
            return;
          }
        }
      }
      setCurrentSection('hero');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    // WCAG 2.1 AA: High contrast text (4.5:1 ratio minimum)
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden w-full">
      {/* ACCESSIBILITY: Skip link for keyboard users to bypass navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-foreground focus:text-background focus:font-medium focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      <Header />

      {/* ACCESSIBILITY: Main landmark with proper label */}
      <main id="main-content" className="focus:outline-none" tabIndex={-1} role="main" aria-label="Main content">
        <div className="w-full">
          {/* ACCESSIBILITY: Section regions with descriptive labels */}
          <section aria-label="Introduction and hero section" role="region">
            <Hero />
          </section>

          <section id="work" aria-label="Selected work and portfolio" role="region">
            <SelectedWorkFiltered />
          </section>

          {/* Skills Orchestration - Animated Capabilities Showcase */}
          <SkillsOrchestration />

          <section id="about" aria-label="About me and leadership philosophy" role="region">
            <About />
          </section>

          {/* ACCESSIBILITY: Optimized spacing between sections for better visual flow */}
          <section aria-label="What I do - capabilities and services" role="region">
            <WhatIDo />
          </section>

          <section aria-label="How I use AI in my workflow" role="region">
            <HowIUseAI />
          </section>

          <section id="experience" aria-label="Professional experience and background" role="region">
            <Experience />
          </section>

          <section aria-label="Client testimonials and reviews" role="region">
            <Testimonials />
          </section>

          <section id="contact" aria-label="Contact information and get in touch" role="region">
            <Contact />
          </section>
        </div>
      </main>

      {/* ACCESSIBILITY: Footer with proper semantic structure */}
      <footer
        role="contentinfo"
        aria-label="Footer"
        className="py-12 px-6 md:px-8 border-t border-border"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-10">
            <div className="max-w-sm">
              <p className="font-display text-lg font-bold text-foreground mb-2">David Phillip</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Head of Product Design — building and scaling design teams for
                regulated fintech. Based in London, open to leadership roles.
              </p>
            </div>
            <nav aria-label="Footer navigation" className="flex flex-col gap-3 text-sm">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Explore</span>
              <a href="#work" className="text-foreground/80 hover:text-foreground hover:underline underline-offset-4 transition-colors">Work</a>
              <a href="#about" className="text-foreground/80 hover:text-foreground hover:underline underline-offset-4 transition-colors">About</a>
              <a href="#experience" className="text-foreground/80 hover:text-foreground hover:underline underline-offset-4 transition-colors">Experience</a>
              <a href="/articles" className="text-foreground/80 hover:text-foreground hover:underline underline-offset-4 transition-colors">Articles</a>
              <a href="/cv" className="text-foreground/80 hover:text-foreground hover:underline underline-offset-4 transition-colors">CV</a>
            </nav>
            <div className="flex flex-col gap-3 text-sm">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Connect</span>
              <a
                href="https://www.linkedin.com/in/davidphillip/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground hover:underline underline-offset-4 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="mailto:david.phillip@gmail.com"
                className="text-foreground/80 hover:text-foreground hover:underline underline-offset-4 transition-colors"
              >
                david.phillip@gmail.com
              </a>
              <a
                href="https://calendly.com/david-phillip/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground hover:underline underline-offset-4 transition-colors"
              >
                Book a 15 min call
              </a>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center pt-8 border-t border-border/50">
            © {new Date().getFullYear()} David Phillip. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
