import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { ReactNode } from "react";

/**
 * Page Transition Wrapper
 * Adds smooth fade + slide animations between route changes
 */

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const [location] = useLocation();

  return (
    // initial={false}: the first page (often prerendered HTML) shows without
    // a fade; later route changes still animate.
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1], // Elegant easing
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
