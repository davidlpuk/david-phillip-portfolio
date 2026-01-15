import { useState, useEffect, useRef, useMemo } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "@/components/ThemeSwitcher";

/**
 * Header Component
 * Design: Institutional Elegance - minimal navigation with active state indicators
 * Typography: Montserrat for logo and nav items
 * Color: Off-white background, deep charcoal text, gold accent
 */

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { scrollProgress } = useScrollProgress();
  const { reducedMotion: shouldReduceMotion } = useTheme();
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement | null>(null);
  const lastMenuItemRef = useRef<HTMLAnchorElement | null>(null);

  const navItems = [
    { label: "Work", href: "/#work", hash: "#work" },
    { label: "About", href: "/#about", hash: "#about" },
    { label: "Experience", href: "/#experience", hash: "#experience" },
    { label: "Articles", href: "/articles", hash: "/articles" },
    { label: "Contact", href: "/#contact", hash: "#contact" },
  ];

  // Get the correct href based on current location
  // When on CV or case study pages, navigate to home with hash anchor; otherwise use hash directly
  const getNavHref = (item: (typeof navItems)[0]) => {
    if (location === "/cv" || location.startsWith("/case-study/")) {
      return item.href; // e.g., /#work
    }
    return item.hash; // e.g., #work
  };

  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Focus management for mobile menu
  useEffect(() => {
    if (!isOpen) {
      // Return focus to toggle button when menu closes
      toggleButtonRef.current?.focus();
    } else {
      // Move focus to first menu item or close button when menu opens
      if (firstMenuItemRef.current) {
        firstMenuItemRef.current.focus();
      }
    }
  }, [isOpen]);

  // Trap focus in mobile menu
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === "Tab") {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstMenuItemRef.current) {
          e.preventDefault();
          lastMenuItemRef.current?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastMenuItemRef.current) {
          e.preventDefault();
          firstMenuItemRef.current?.focus();
        }
      }
    }

    // Close on Escape
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Animation values based on reduced motion preference (memoized)
  const animationValues = useMemo(() => {
    if (shouldReduceMotion) {
      return {
        transition: { duration: 0.01 },
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
      };
    }
    return {
      transition: { duration: 0.3, ease: "easeOut" },
      initial: { opacity: 0, scale: 0.95, y: -10 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95, y: -10 },
    };
  }, [shouldReduceMotion]);

  const { transition, initial, animate, exit } = animationValues;

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:font-medium focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>

      <header className="fixed top-0 w-full z-50">
        {/* Header Background & Border */}
        <div className="absolute top-0 left-0 w-full h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-0" />

        {/* Scroll Progress Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/20 z-20">
          <div
            className="h-full bg-primary transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Brand Name */}
          <a href="/" className="flex items-center">
            <span className="font-display text-xl font-bold tracking-tight">
              David Phillip
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = location === item.hash;
              const navHref = getNavHref(item);
              return (
                <a
                  key={item.label}
                  href={navHref}
                  className={`hover:text-gray-900 dark:hover:text-white hover:underline underline-offset-4 decoration-2 transition-all ${isActive ? "text-primary font-bold" : "text-slate-600 dark:text-slate-400"}`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Side Controls - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/cv"
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full font-sans text-sm font-medium hover:bg-secondary/80 transition-colors"
            >
              View CV
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            ref={toggleButtonRef}
            className="md:hidden p-3 hover:bg-secondary rounded-sm transition-colors duration-200 -mr-3"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              ref={mobileMenuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={initial}
              animate={animate}
              exit={exit}
              transition={transition}
              className="md:hidden fixed top-20 left-0 right-0 bottom-0 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-40 overflow-y-auto"
              onKeyDown={handleKeyDown}
            >
              <nav className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-6">
                {navItems.map((item, index) => {
                  const isActive = location === item.hash;
                  const navHref = getNavHref(item);
                  const ref =
                    index === 0
                      ? firstMenuItemRef
                      : index === navItems.length - 1
                        ? lastMenuItemRef
                        : undefined;
                  return (
                    <a
                      key={item.label}
                      ref={ref}
                      href={navHref}
                      className={`text-xl font-semibold transition-colors ${isActive ? "text-primary" : "text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white"}`}
                    >
                      {item.label}
                    </a>
                  );
                })}
                <div className="flex flex-col gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                  <a
                    href="/cv"
                    className="px-6 py-4 bg-secondary text-secondary-foreground rounded-full font-bold text-center hover:bg-secondary/80 transition-colors"
                  >
                    View my CV
                  </a>
                  <a
                    href={location === "/cv" ? "/#contact" : "#contact"}
                    className="px-6 py-4 bg-primary text-primary-foreground rounded-full font-bold text-center hover:bg-primary/90 transition-colors"
                  >
                    Get in Touch
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
