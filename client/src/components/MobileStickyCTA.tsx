import { useState, useEffect } from "react";
import { Mail, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Mobile Sticky CTA Button
 * Appears on mobile devices for improved conversion
 * Hides when user scrolls to contact section
 */

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hide when in contact section
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        const isInContact = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(!isInContact && !isDismissed);
      }

      // Also hide if user is at the very top
      const isAtTop = window.scrollY < 100;
      if (isAtTop) {
        setIsVisible(false);
      } else if (!isDismissed) {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          const rect = contactSection.getBoundingClientRect();
          const isInContact = rect.top < window.innerHeight && rect.bottom > 0;
          setIsVisible(!isInContact);
        } else {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 z-50 lg:hidden"
        >
          <div className="relative bg-primary text-brand-dark rounded-2xl shadow-2xl border border-primary/20 overflow-hidden">
            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-brand-dark/10 hover:bg-brand-dark/20 transition-colors"
              aria-label="Dismiss"
            >
              <X size={14} className="text-brand-dark" />
            </button>

            {/* CTA Content */}
            <a
              href="/#contact"
              className="flex items-center gap-3 px-4 py-3 min-h-[56px]"
              onClick={() => {
                // Smooth scroll to contact
                const contact = document.getElementById("contact");
                if (contact) {
                  contact.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <div className="flex-shrink-0 w-10 h-10 bg-brand-dark/10 rounded-xl flex items-center justify-center">
                <Mail size={20} className="text-brand-dark" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans font-bold text-sm text-brand-dark leading-tight">
                  Let's work together
                </p>
                <p className="font-sans text-xs text-brand-dark/70 leading-tight mt-0.5">
                  Get in touch to discuss your project
                </p>
              </div>
            </a>

            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/5 to-primary/0 pointer-events-none"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
