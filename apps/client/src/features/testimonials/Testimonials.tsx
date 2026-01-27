import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

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
      "I’ve had the pleasure of working under Dave’s leadership, and one of his standout qualities is his ability to make people feel heard and valued. He fosters a safe and supportive environment where team members can voice their thoughts and feel confident exploring new ideas. Dave’s collaborative nature and vast design knowledge make him an invaluable leader, especially in fast-paced environments.",
    author: "André Louro Martins",
    title: "Design Lead",
    company: "Cognism",
    image: "/images/testimonial-andre-martins.png",
  },
  {
    quote:
      "I had the pleasure of working with David at Cognism, and he had a big impact on my career. As Head of Design, he not only set up great processes but also created a really positive and collaborative work culture. He genuinely cares about the people he works with and always pushed me to be my best. Thanks to his guidance, I grew a lot as a designer.",
    author: "Ljupcho Krstevski",
    title: "Senior Product Designer",
    company: "Cognism",
    image: "/images/testimonial-ljupcho-krstevski.png",
  },
  {
    quote:
      "David's human-centered approach set him apart as a leader who prioritised people above all else. His favorite saying, 'It's not about the pixels, it's about the people,' perfectly encapsulates his philosophy. David's influence extended beyond design; he empowered individuals, nurtured creativity, and championed a culture of inclusivity and open communication. His ability to inspire and mentor the team was unparalleled.",
    author: "Biljana Galapcheva",
    title: "Senior Product Designer",
    company: "Cognism",
    image: "/images/testimonial-biljana-galapcheva.png",
  },
  {
    quote:
      "When David came into the organization, the UX organization consisted of 1.5 spread thin resources without solid processes. David built the team and instituted all the design processes that helped to lift our product from a -16 NPS to a positive 12. The designers were ahead of our agile teams across all features and were able to leverage the beginning of a design system to ensure alignment.",
    author: "Michelle Bradbury (Slezak)",
    title: "Chief Product Officer",
    company: "Cognism",
    image: "/images/testimonial-michelle-bradbury.png",
  },
  {
    quote:
      "I worked for David for almost a year at Coutts bank and found him to be one of the most thoughtful managers I have known. He really goes above and beyond to create a great work environment. In addition to being a great manager, David is a smart designer with a deep knowledge of all levels of the UX process.",
    author: "Kiri Martin",
    title: "UX Designer",
    company: "Coutts",
    image: "/images/testimonial-kiri-martin.png",
  },
  {
    quote:
      "It was a pleasure to work with David as my manager at Coutts. David excelled in organising and hiring for a very fast growing team, working hard to improve the teams ways of working and processes. David helped to support me as I moved into a lead UI position with empathy and patience. The team flourished under his leadership.",
    author: "Jacqui Chadwick",
    title: "Lead Product Designer",
    company: "Coutts",
    image: "/images/testimonial-jacqui-chadwick.png",
  },
  {
    quote:
      "David was able to grasp any business requirement quickly and come up with creative ways of visualising it, extremely competent UX lead, with a similarly expert understanding on design. David’s work on balancing the best experience for the user with technical constrains is exceptional, whilst ensuring quality is not compromised.",
    author: "Usha Sanku",
    title: "Product Consultant",
    company: "HSBC Commercial Banking",
    image: "/images/testimonial-usha-sanku.png",
  },
  {
    quote:
      "David is a very inspirational senior UX lead. David's focus on the customer, paired with a deep understanding of UX and business objectives, meant we were not only able to orchestrate a highly compelling digital presence, but also optimise our performance post-live. David is a fantastic senior expert and I'd hope to work alongside him again in the near future.",
    author: "Jana Lowe",
    title: "Global Head of Digital Sales",
    company: "HSBC",
    image: "/images/testimonial-jana-lowe.png",
  },
  {
    quote:
      "David is commercially astute in the field of UX testing, design and customer journeys. Having worked with David for almost 2 years, I would not hesitate to recommend him. David is professional, creative, diligent and tenacious. He established an excellent reputation for himself and is quickly able to identify solutions to problems.",
    author: "Mnveer Arkan",
    title: "CMO Advisory Board Member",
    company: "",
    image: "/images/testimonial-mnveer-arkan.png",
  },
  {
    quote:
      "There are few people who you can comfortably call indispensable and consummate digital professional, but David comes damned close. At HSBC. He had a great understanding for matching business needs with customer satisfaction. I had an excellent relationship with David and would recommend him for any future management position.",
    author: "Phillip Probert",
    title: "Agile Delivery Manager",
    company: "HSBC",
    image: "/images/testimonial-phillip-probert.png",
  },
  {
    quote:
      "I had the pleasure of working with David at HSBC where we both managed the SEO of our respected SBUs. David's insight into the industry and desire to achieve results make him a key member of any marketing team. I found David very dedicated and passionate about his role.",
    author: "John Crossland",
    title: "Digital Strategy Lead",
    company: "HSBC",
    image: "/images/testimonial-john-crossland.png",
  },
  {
    quote:
      "David is a true professional with a huge amount of knowledge and passion for all things digital. He has an impressive track record of developing and delivering great ideas, with a focus on great customer experience. He's got great ability to engage others and is a fantastic team player.",
    author: "Chris Joannou",
    title: "Head of Digital",
    company: "Santander Consumer Finance",
    image: "/images/testimonial-chris-joannou.png",
  },
  {
    quote:
      "David was my direct contact and decision maker on the Business HSBC search engine strategy. It was a pleasure to work with him on this account and together we managed to achieve some good results. Particularly, David’s management of the resources and communication enabled fast and smooth solution to any occurring technical problems.",
    author: "Tatiana Siddle",
    title: "Digital Marketing Manager",
    company: "Apple (ex-agency for HSBC)",
    image: "/images/testimonial-tatiana-siddle.png",
  },
  {
    quote:
      "I worked with David as part of a multi-entity project and found him to be very knowledgeable in all aspects of Digital Marketing. SEO and web analytics were a key focus of our work and David proved to be an expert in both. David is a good team player who delivers on his promises, I would happily work with him again in any capacity.",
    author: "Sam Lempriere",
    title: "Head of Health Intelligence",
    company: "Government of Jersey",
    image: "/images/testimonial-sam-lempriere.png",
  },
];

export default function Testimonials() {
  const [showAll, setShowAll] = useState(false);

  // Show first 6 by default, or all if toggled
  const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, 6);

  return (
    <section className="py-20 md:py-32 bg-background border-t border-border">
      <div className="container max-w-6xl px-6 md:px-0">
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
          <AnimatePresence mode='popLayout'>
            {displayedTestimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.author}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-card p-8 rounded-xl border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300 group flex flex-col h-full"
              >
                {/* Clean quote layout */}
                <blockquote className="mb-6 flex-grow">
                  <p className="font-sans text-foreground leading-relaxed text-base italic">
                    "{testimonial.quote}"
                  </p>
                </blockquote>

                {/* Author info - clean and minimal */}
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border/50">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-border group-hover:border-accent transition-colors"
                  />
                  <div>
                    <cite className="font-sans font-semibold text-foreground text-sm not-italic block">
                      {testimonial.author}
                    </cite>
                    <p className="font-sans text-xs text-muted-foreground mt-0.5 font-medium">
                      {testimonial.title}
                    </p>
                    {testimonial.company && (
                      <p className="font-sans text-xs text-muted-foreground/80">
                        {testimonial.company}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {testimonials.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-all duration-300 font-medium text-sm border border-border"
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                </>
              ) : (
                <>
                  View All ({testimonials.length}) <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

