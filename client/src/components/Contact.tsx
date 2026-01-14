import { useMemo } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Contact / Footer Section
 * Design: Institutional Elegance - centered CTA with social links
 * Typography: Montserrat for headline and body
 * Color: Off-white background, deep charcoal text, accent highlights
 * Animation: Fade-in on scroll
 */

export default function Contact() {
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }), []);

  return (
    <section id="contact" className="py-20 md:py-32 bg-background border-t border-border">
      <div className="container max-w-3xl text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Section Label */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-accent-foreground/30"></div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Get in Touch</span>
            <div className="h-px w-8 bg-accent-foreground/30"></div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Looking for someone who can think and ship?
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-lg mb-12 max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Based in East London. Cycling enthusiast (Brompton devotee). Always up for coffee chats about fintech challenges, team scaling, or the best routes around the city.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="xl">
              <a href="mailto:david.phillip@gmail.com">
                <Mail size={18} />
                Get in Touch
                <ArrowRight size={18} />
              </a>
            </Button>
            <Button asChild variant="outline" size="xl">
              <a href="/cv">
                Download CV
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
