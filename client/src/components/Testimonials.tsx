import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Professional Testimonials Grid
 * Design: Clean, modern layout with focus on content
 * Typography: Clear hierarchy with readable quotes
 * Layout: Responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
 * Features: Staggered animations, professional spacing
 */

const testimonials = [
  {
    quote:
      "David built the team and instituted all the design processes that helped lift our product from a -16 NPS to a positive 12. The designers were ahead of our agile teams and leveraged a design system for alignment. David is a skilled designer and amazing manager.",
    author: "Michelle Bradbury",
    title: "Chief Product Officer",
    company: "Cognism",
    image: "/images/testimonial-michelle-bradbury.png",
  },
  {
    quote:
      "David is extremely competent UX lead with expert understanding of design. His work balancing user experience with technical constraints is exceptional while ensuring quality is not compromised.",
    author: "Usha Sanku",
    title: "Product Consultant",
    company: "HSBC Kinetic",
    image: "/images/testimonial-usha-sanku.png",
  },
  {
    quote:
      "David's human-centered approach set him apart as a leader who prioritizes people above all else. His philosophy 'It's not about the pixels, it's about the people' perfectly encapsulates his dedication to team well-being.",
    author: "Biljana Galapcheva",
    title: "Senior Product Designer",
    company: "Cognism",
    image: "/images/testimonial-biljana-galapcheva.png",
  },
  {
    quote:
      "He had a big impact on my career. As Head of Design, he set up great processes and created a positive, collaborative work culture. He genuinely cares about people and always pushed me to be my best.",
    author: "Ljupcho Krstevski",
    title: "Senior Product Designer",
    company: "Cognism",
    image: "/images/testimonial-ljupcho-krstevski.png",
  },
  {
    quote:
      "David is one of the most thoughtful managers I've known. He goes above and beyond to create a great work environment. In addition to being a great manager, David is a smart designer with deep UX knowledge.",
    author: "Kiri Romero",
    title: "UX Designer",
    company: "Coutts",
    image: "/images/testimonial-kiri-romero.png",
  },
  {
    quote:
      "Dave's standout quality is his ability to make people feel heard and valued. He fosters a safe environment for exploring ideas. His collaborative nature and design knowledge make him invaluable in fast-paced environments.",
    author: "Andre Martins",
    title: "Design Lead",
    company: "Cognism",
    image: "/images/testimonial-andre-martins.png",
  },
];

export default function Testimonials() {
  // Load testimonials immediately without artificial delay
  const [loadedTestimonials] = useState<typeof testimonials>(testimonials);
  const isLoading = false;

  // Empty state check
  if (loadedTestimonials.length === 0 && !isLoading) {
    return (
      <section className="py-20 md:py-32 bg-background border-t border-border">
        <div className="container max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Testimonials
            </h2>
            <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
              No testimonials available at the moment.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="py-20 md:py-32 bg-background border-t border-border">
        <div className="container max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Testimonials
            </h2>
            <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
              What colleagues and leaders have to say
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card p-8 rounded-xl border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-secondary rounded-full animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 bg-secondary rounded w-24 animate-pulse" />
                    <div className="h-3 bg-secondary rounded w-32 animate-pulse" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-secondary rounded animate-pulse" />
                  <div className="h-4 bg-secondary rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-secondary rounded w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-32 bg-background border-t border-border">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-accent/30" />
            <span className="text-xs font-medium text-accent-foreground uppercase tracking-widest">Endorsements</span>
            <div className="h-px w-12 bg-accent/30" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Testimonials
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            What colleagues and leaders have to say
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loadedTestimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-xl border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Clean quote layout */}
              <blockquote className="mb-6">
                <p className="font-sans text-foreground leading-relaxed text-base italic">
                  "{testimonial.quote}"
                </p>
              </blockquote>

              {/* Author info - clean and minimal */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-border group-hover:border-accent transition-colors"
                />
                <div>
                  <cite className="font-sans font-semibold text-foreground text-sm not-italic">
                    {testimonial.author}
                  </cite>
                  <p className="font-sans text-xs text-muted-foreground mt-0.5">
                    {testimonial.title}
                  </p>
                  <p className="font-sans text-xs text-muted-foreground">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
