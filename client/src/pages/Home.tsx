import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SkillsOrchestration from "@/components/SkillsOrchestration";
import WhatIDo from "@/components/WhatIDo.tsx";
import HowIUseAI from "@/components/HowIUseAI";
import SelectedWorkFiltered from "@/components/SelectedWorkFiltered";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import AIAssistant from "@/components/AIAssistant";

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
      const sections = ['about', 'work', 'experience', 'contact'];
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

          <section id="work" aria-label="Selected work and portfolio" role="region">
            <SelectedWorkFiltered />
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
        className="py-8 px-6 md:px-8 border-t border-border"
      >
        <p className="text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} David Phillip. All rights reserved.
        </p>
      </footer>

      {/* Mobile Sticky CTA Button */}
      <MobileStickyCTA />

      {/* AI Assistant - Floating chatbot with clever trigger */}
      <AIAssistant />
    </div>
  );
}
