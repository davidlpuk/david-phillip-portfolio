import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useMobile";
import { Button } from "@/components/ui/button";

/**
 * Skills Orchestration Section - REVISED v2.0
 * Animated rotating capability pillars showcasing hybrid design leadership
 *
 * UPDATES:
 * - New static headline: "Design leadership that ships"
 * - Extended timing: 9 seconds dwell time (was 5s)
 * - Longer transitions: 750ms fade (was 400ms)
 * - Hybrid interaction: Auto-play disabled after user interaction
 * - Navigation controls: Previous/Next arrows + Play/Pause toggle
 * - Mobile: Swipeable with NO auto-play
 * - Enhanced accessibility: Space bar pause, better ARIA labels
 *
 * Design: Playfair Display + Inter (matching existing site fonts)
 * Colors: Uses existing design token system (--primary, --foreground, etc.)
 */

interface Pillar {
  id: number;
  subheadline: string;
  body: string;
}

const pillars: Pillar[] = [
  {
    id: 1,
    subheadline: "I compress insight-to-shipped cycles",
    body: "While others treat AI as a tool, I architect workflows that accelerate research synthesis, prototyping, and validation—without sacrificing craft or governance.",
  },
  {
    id: 2,
    subheadline: "I ship code and design systems at scale",
    body: "I've written production React. Built multi branded design systems. Led 15 designers. This isn't 'T-shaped'—it's full-stack design leadership.",
  },
  {
    id: 3,
    subheadline: "I lead with clarity in ambiguity",
    body: "Great design leadership isn't about decks or process theatre. It's about aligning teams, making smart tradeoffs, and shipping quality software on compressed timelines.",
  },
];

const pillarTitles = [
  "AI-Native Orchestration",
  "Technical Fluency + Exceptional Craft",
  "Strategic Execution Velocity",
];

export default function SkillsOrchestration() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Disable auto-play on mobile or after user interaction
  const shouldAutoPlay = !isMobile && isPlaying && !hasInteracted && !reducedMotion;

  // Auto-rotate every 9 seconds (increased from 5s)
  useEffect(() => {
    if (!shouldAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % pillars.length);
    }, 9000); // 9 seconds dwell time

    return () => clearInterval(interval);
  }, [shouldAutoPlay]);

  // Navigate to specific pillar
  const navigateTo = (index: number) => {
    setHasInteracted(true);
    setIsPlaying(false);
    setCurrentIndex(index);
  };

  // Previous pillar
  const handlePrevious = () => {
    setHasInteracted(true);
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + pillars.length) % pillars.length);
  };

  // Next pillar
  const handleNext = () => {
    setHasInteracted(true);
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % pillars.length);
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
    setHasInteracted(true);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      handlePrevious();
    } else if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      togglePlayPause();
    }
  };

  // Touch/swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentPillar = pillars[currentIndex];

  return (
    <section
      className="py-16 md:py-20 lg:py-24 bg-background relative overflow-hidden"
      aria-label="Skills and capabilities showcase"
    >
      {/* Decorative sparkles */}
      <div className="absolute top-12 right-16 opacity-40 pointer-events-none">
        <div className="doodle-sparkle w-5 h-5 animate-pulse" style={{ animationDelay: "0.5s" }} />
      </div>
      <div className="absolute bottom-16 left-20 opacity-30 pointer-events-none">
        <div className="doodle-sparkle w-6 h-6 animate-pulse" style={{ animationDelay: "1.2s" }} />
      </div>

      <div className="container max-w-6xl">
        {/* NEW Static Headline - "Design leadership that ships" */}
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-16 md:mb-20 text-center leading-tight">
          Design leadership{" "}
          <span className="highlighter-stroke">that ships</span>
        </h2>

        {/* Rotating Content Container with Touch Support */}
        <div
          className="relative min-h-[320px] md:min-h-[280px] flex flex-col items-center justify-center mb-8"
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          tabIndex={0}
          role="region"
          aria-label="Rotating capabilities showcase. Use arrow keys or swipe to navigate. Press space to pause."
          aria-live="polite"
          aria-atomic="true"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPillar.id}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -20 }}
              transition={{ duration: reducedMotion ? 0.01 : 0.75, ease: "easeInOut" }}
              className="text-center max-w-3xl px-4 md:px-6"
            >
              {/* Pillar Title Label */}
              <div className="mb-6 md:mb-8">
                <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-xs font-sans font-bold uppercase tracking-widest text-foreground">
                  {pillarTitles[currentIndex]}
                </span>
              </div>

              {/* Rotating Subheadline - Inter Bold (DM Sans equivalent) */}
              <h3 className="font-sans font-bold text-xl md:text-2xl lg:text-3xl text-foreground mb-6 leading-snug">
                {currentPillar.subheadline}
              </h3>

              {/* Rotating Body Text - Inter Regular (DM Sans equivalent) */}
              <p
                className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed max-w-[60ch] mx-auto"
                style={{ lineHeight: 1.6 }}
              >
                {currentPillar.body}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Previous/Next Navigation Arrows */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between items-center pointer-events-none px-4 md:px-0">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              className="pointer-events-auto rounded-full bg-background/80 backdrop-blur-sm border-border hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all"
              aria-label="Previous capability"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="pointer-events-auto rounded-full bg-background/80 backdrop-blur-sm border-border hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all"
              aria-label="Next capability"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Controls Row: Progress Indicators + Play/Pause */}
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {/* Progress Indicator Dots */}
          <div
            className="flex items-center justify-center gap-3"
            role="tablist"
            aria-label="Capability indicators"
          >
            {pillars.map((pillar, index) => (
              <button
                key={pillar.id}
                onClick={() => navigateTo(index)}
                className={`
                  h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                  ${index === currentIndex
                    ? "w-12 bg-primary"
                    : "w-2 bg-border hover:bg-muted-foreground"
                  }
                `}
                aria-label={`View ${pillarTitles[index]}`}
                aria-current={index === currentIndex ? "true" : "false"}
                role="tab"
                aria-selected={index === currentIndex}
              />
            ))}
          </div>

          {/* Play/Pause Toggle (desktop only - no auto-play on mobile) */}
          {!isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlayPause}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={isPlaying ? "Pause auto-rotation" : "Resume auto-rotation"}
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Play
                </>
              )}
            </Button>
          )}
        </div>

        {/* Mobile Hint */}
        {isMobile && (
          <p className="text-xs text-muted-foreground text-center mt-4">
            Swipe or use arrows to navigate
          </p>
        )}

        {/* Accessibility hints */}
        <div className="sr-only" aria-live="polite">
          Showing {pillarTitles[currentIndex]}, {currentIndex + 1} of {pillars.length}.
          Use arrow keys to navigate or space bar to {isPlaying ? "pause" : "resume"}.
        </div>
      </div>
    </section>
  );
}
