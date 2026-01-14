import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import ChatBot from "./ChatBot";

/**
 * AI Assistant - Clever, subtle chatbot trigger
 *
 * Design Philosophy:
 * - Appears as a floating "digital twin" sparkle near the hero image
 * - Pulses subtly to hint at interactivity without being intrusive
 * - Keyboard shortcut (Cmd/Ctrl + K) for power users
 * - Smooth modal transition when opened
 * - Context-aware welcome based on scroll position
 */

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState<string>("");
  const [showPulse, setShowPulse] = useState(true);

  // Keyboard shortcut: Cmd/Ctrl + K to open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Detect scroll position for context-aware greeting
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "hero", name: "introduction" },
        { id: "what-i-do", name: "capabilities" },
        { id: "work", name: "case studies" },
        { id: "about", name: "leadership approach" },
        { id: "experience", name: "career history" },
        { id: "testimonials", name: "testimonials" },
        { id: "contact", name: "contact information" },
      ];

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setContext(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide pulse after first interaction
  const handleOpen = () => {
    setIsOpen(true);
    setShowPulse(false);
  };

  return (
    <>
      {/* Floating AI Assistant Button - HIDDEN PER REQUEST */}
      {/* 
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={handleOpen}
            className="group fixed bottom-6 right-6 z-40 flex items-center gap-3 px-4 py-3 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground rounded-full shadow-2xl"
            aria-label="Open AI Assistant"
          >
            <Sparkles className="w-5 h-5" />
            <span className="hidden sm:inline-block font-medium text-sm whitespace-nowrap">
              Ask David's AI
            </span>
          </motion.button>
        )}
      </AnimatePresence>
      */}

      {/* Chatbot Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop - Lighter for better accessibility */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Chat Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-4 sm:inset-auto sm:bottom-6 sm:right-6 sm:top-auto sm:w-[440px] sm:max-w-[calc(100vw-48px)] z-50 flex flex-col"
            >
              {/* Close button (mobile only, positioned outside chat) */}
              <button
                onClick={() => setIsOpen(false)}
                className="sm:hidden absolute -top-12 right-0 p-2 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 text-foreground hover:bg-accent/50 transition-colors"
                aria-label="Close AI Assistant"
              >
                <X className="w-5 h-5" />
              </button>

              {/* ChatBot Component */}
              <div className="h-full sm:h-auto">
                <ChatBot onClose={() => setIsOpen(false)} context={context} />
              </div>

              {/* Keyboard hint (desktop only) */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="hidden sm:block mt-2 text-center"
              >
                <p className="text-xs text-muted-foreground">
                  Press{" "}
                  <kbd className="px-1.5 py-0.5 rounded bg-background border border-border text-xs font-mono">
                    {typeof navigator !== "undefined" && navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}
                  </kbd>
                  {" + "}
                  <kbd className="px-1.5 py-0.5 rounded bg-background border border-border text-xs font-mono">
                    K
                  </kbd>
                  {" "}to toggle
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
