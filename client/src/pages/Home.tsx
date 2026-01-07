import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Users, TrendingUp, Star } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * DESIGN PHILOSOPHY: Sophisticated Minimalism with Data Narrative
 * - Clean geometric grids with strategic data storytelling
 * - Neutral palette (off-white, charcoal, deep slate) with accent color
 * - Typography: Playfair Display (headlines) + Outfit (body)
 * - Metrics are the visual hero; whitespace is a design material
 */

// Counter animation component
function Counter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}</span>;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="font-bold text-xl text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            David Phillip
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#about" className="text-sm hover:text-accent transition-colors">
              About
            </a>
            <a href="#work" className="text-sm hover:text-accent transition-colors">
              Work
            </a>
            <a href="#contact" className="text-sm hover:text-accent transition-colors">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                I build teams that ship products that matter
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md">
                20 years in FinTech. I combine strategic thinking, design leadership, and hands-on execution to build products that drive measurable business results.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto">
                  View My Work <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button variant="outline" className="w-full sm:w-auto">
                  Download CV
                </Button>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative h-64 sm:h-80 md:h-full rounded-lg overflow-hidden">
              <img
                src="/images/hero-david-workspace.jpg"
                alt="David Phillip in his workspace"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-12 md:py-24 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {/* Metric: Years in FinTech */}
            <div className="metric-card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Years in FinTech</p>
                  <p className="text-4xl font-bold text-accent" style={{ fontFamily: "'Playfair Display', serif" }}>
                    <Counter target={20} />+
                  </p>
                </div>
                <Briefcase className="w-5 h-5 text-accent/60" />
              </div>
              <p className="text-xs text-muted-foreground">Strategic expertise across regulated industries</p>
            </div>

            {/* Metric: NPS Improvement */}
            <div className="metric-card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">NPS Improvement</p>
                  <p className="text-4xl font-bold text-accent" style={{ fontFamily: "'Playfair Display', serif" }}>
                    +<Counter target={28} />
                  </p>
                </div>
                <TrendingUp className="w-5 h-5 text-accent/60" />
              </div>
              <p className="text-xs text-muted-foreground">From -16 to +12 at Cognism</p>
            </div>

            {/* Metric: Team Retention */}
            <div className="metric-card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Team Retention</p>
                  <p className="text-4xl font-bold text-accent" style={{ fontFamily: "'Playfair Display', serif" }}>
                    <Counter target={100} />%
                  </p>
                </div>
                <Users className="w-5 h-5 text-accent/60" />
              </div>
              <p className="text-xs text-muted-foreground">Over 2 years at Cognism</p>
            </div>

            {/* Metric: ARR Growth */}
            <div className="metric-card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">ARR Growth</p>
                  <p className="text-4xl font-bold text-accent" style={{ fontFamily: "'Playfair Display', serif" }}>
                    4x
                  </p>
                </div>
                <Star className="w-5 h-5 text-accent/60" />
              </div>
              <p className="text-xs text-muted-foreground">$20M to $80M during tenure</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Philosophy Section */}
      <section id="about" className="py-12 md:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
              Great products come from great teams
            </h2>

            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              I've learned that the best design leaders aren't the ones with perfect pixels—they're the ones who build teams that trust each other, take ownership, and grow. That's what I do.
            </p>

            {/* Four Principles Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {[
                {
                  title: "Clarity",
                  description: "Your work connects to revenue, risk, and real users. No busy work.",
                },
                {
                  title: "Autonomy",
                  description: "We align on outcomes. Then I step back and unblock, not micromanage.",
                },
                {
                  title: "Safety",
                  description: "We share failures openly. That's why 100% of my team stayed at Cognism.",
                },
                {
                  title: "Growth",
                  description: "Stretch projects matched to your skills. People stay because they're growing.",
                },
              ].map((principle, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-2xl font-semibold text-accent" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {principle.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="section-divider my-12" />

            {/* Skills Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Core Capabilities</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "AI Strategy & Team Enablement",
                  "AI Coding & Deployment",
                  "UX Leadership & Design Operations",
                  "Strategic Planning & Commercial Acumen",
                  "Building & Optimising Teams",
                  "Stakeholder Management",
                  "Regulated Industries Expertise",
                  "Cross-Functional Collaboration",
                ].map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-foreground">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="work" className="py-20 md:py-32 bg-muted/30">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>
            Selected Work
          </h2>

          <div className="space-y-16">
            {/* HSBC Case Study */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm text-accent font-semibold">HSBC</p>
                  <h3 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Small Business Banking App
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  HSBC needed a business banking app to compete with challenger banks. Small business owners have complex needs—they needed a solution that was both powerful and simple. I built and led the design team from zero to launch.
                </p>
                <p className="text-sm font-semibold text-foreground">
                  Result: Award-winning application that helped HSBC capture market share in a crowded space.
                </p>
                <Button variant="outline" className="w-fit">
                  View Case Study <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              <div className="h-64 md:h-80 bg-muted rounded-lg overflow-hidden">
                <img
                  src="/images/team-collaboration.jpg"
                  alt="HSBC case study"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Coutts Case Study */}
            <div className="grid md:grid-cols-2 gap-12 items-center md:grid-flow-dense">
              <div className="h-64 md:h-80 bg-muted rounded-lg overflow-hidden">
                <img
                  src="/images/metric-cards-background.jpg"
                  alt="Coutts case study"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm text-accent font-semibold">Coutts</p>
                  <h3 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Wealth Management App
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Coutts needed a wealth app for ultra-high-net-worth clients. The bar was impossibly high—every interaction had to feel premium. I led the design team to balance complex financial data with the elegance their clients expected.
                </p>
                <p className="text-sm font-semibold text-foreground">
                  Result: A product that made managing millions feel intuitive.
                </p>
                <a href="/case-study/coutts">
                  <Button variant="outline" className="w-fit">
                    View Case Study <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>

            {/* Schroders Case Study */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm text-accent font-semibold">Schroders</p>
                  <h3 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Private Banking Digital Transformation
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Schroders' Private Banking division was fragmented—legacy systems, inconsistent experiences, and a digital presence that didn't match their premium service. I led the end-to-end transformation: strategy, design, and delivery.
                </p>
                <p className="text-sm font-semibold text-foreground">
                  Result: Unified experience across all touchpoints with a digital presence that reflects their expertise.
                </p>
                <Button variant="outline" className="w-fit">
                  View Case Study <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              <div className="h-64 md:h-80 bg-muted rounded-lg overflow-hidden">
                <img
                  src="/images/hero-david-workspace.jpg"
                  alt="Schroders case study"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>
            Trusted by Leaders
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  "David built the team and instituted all the design processes that lifted our product from -16 NPS to +12 NPS. Ease of use was cited as the main highlight by all users.",
                author: "Michelle Bradbury",
                title: "Chief Product Officer",
                company: "Cognism",
              },
              {
                quote:
                  "Extremely competent UX lead with similarly expert understanding on design. Exceptional at balancing user experience with technical constraints whilst ensuring quality is not compromised.",
                author: "Usha Sanku",
                title: "Product Consultant",
                company: "HSBC Kinetic",
              },
              {
                quote:
                  "His impact on the team and company culture was truly transformative. David's human-centered approach set him apart as a leader who prioritises people above all else.",
                author: "Biljana Galapcheva",
                title: "Senior Product Designer",
                company: "Cognism",
              },
              {
                quote:
                  "One of the most thoughtful managers I have known. Goes above and beyond to create a great work environment. Smart designer with deep knowledge of all levels of the UX process.",
                author: "Kiri Romero",
                title: "UX Designer",
                company: "Coutts",
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="testimonial-block">
                <p className="text-foreground mb-4 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.title} at {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              About
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Based in East London. I'm always up for conversations about FinTech challenges, building great teams, or the best routes around the city. Coffee optional.
              </p>
              <p>
                My expertise spans from early-stage startups to global financial institutions. I've worked with teams across Asia Pacific, EMEA, and LATAM, leading digital transformations and building design practices that drive business results.
              </p>
              <p>
                I'm particularly passionate about regulated industries—where design excellence and business acumen must work together. I speak the language of risk, compliance, and revenue while maintaining an unwavering focus on user experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 md:py-32">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ready to talk?
            </h2>
            <p className="text-lg text-muted-foreground">
              I'm always interested in conversations about building great teams, shipping products that matter, and the challenges of leading design in regulated industries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-base">
                Get in Touch
              </Button>
              <Button variant="outline" className="px-8 py-6 text-base">
                View on LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container flex items-center justify-between text-sm text-muted-foreground">
          <p>&copy; 2024 David Phillip. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              LinkedIn
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
