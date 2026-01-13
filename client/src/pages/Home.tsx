import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

/**
 * Portfolio Home Page - Refactored Design
 * Based on: https://noble-cause-027906.framer.app
 *
 * Design System:
 * - Background: #FAF5E6 (cream/beige)
 * - Text: Black with subtle grays
 * - Typography: Manrope Variable (headings), Inter (body), EB Garamond (accents)
 * - Layout: 1200px max width, centered
 * - Animations: Fade in on scroll, ticker for logos
 */

// Metric Card Component with fade-in animation
function MetricCard({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col gap-2"
    >
      <h2 className="text-3xl md:text-4xl font-semibold text-[#52504B]" style={{ fontFamily: "Manrope, sans-serif" }}>
        {value}
      </h2>
      <p className="text-base opacity-70" style={{ fontFamily: "Inter, sans-serif" }}>
        {label}
      </p>
    </motion.div>
  );
}

// Service Card Component
function ServiceCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-gradient-to-b from-[#D6D2C7] to-transparent p-6 rounded-lg">
      <h5 className="text-xl font-semibold mb-3" style={{ fontFamily: "Mona Sans, sans-serif" }}>
        {title}
      </h5>
      <p className="text-sm leading-relaxed opacity-90" style={{ fontFamily: "Inter, sans-serif" }}>
        {description}
      </p>
    </div>
  );
}

// Tag Component
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center px-4 py-2 rounded-full bg-black/6 text-sm" style={{ fontFamily: "Mona Sans, sans-serif" }}>
      {children}
    </div>
  );
}

// Case Study Card Component
function CaseStudyCard({
  logo,
  company,
  title,
  role,
  tags,
  image,
  challenge,
  myRole,
  outcome,
  bgColor = "bg-gradient-to-b from-[#F7F3E9] to-[#D6D2C7]"
}: {
  logo: string;
  company: string;
  title: string;
  role: string;
  tags: string[];
  image: string;
  challenge: string;
  myRole: string;
  outcome: string;
  bgColor?: string;
}) {
  return (
    <div className={`lg:sticky top-0 ${bgColor} px-6 md:px-12 lg:px-16 py-16 md:py-24 lg:py-32`}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-10">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="space-y-4">
            <img src={logo} alt={`${company} logo`} className="h-8 md:h-10 opacity-70" />
            <p className="text-sm opacity-70" style={{ fontFamily: "Inter, sans-serif" }}>{company}</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl leading-tight text-black" style={{ fontFamily: "EB Garamond, serif" }}>
              {title}
            </h2>
          </div>

          <p className="text-sm opacity-70" style={{ fontFamily: "Inter, sans-serif" }}>{role}</p>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <Tag key={idx}>{tag}</Tag>
            ))}
          </div>

          <div className="w-full h-48 md:h-64 rounded-lg overflow-hidden">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 md:space-y-8">
          <div className="space-y-3">
            <h3 className="text-lg md:text-xl font-medium" style={{ fontFamily: "Manrope, sans-serif" }}>The Challenge</h3>
            <p className="text-sm md:text-base leading-relaxed opacity-90" style={{ fontFamily: "Inter, sans-serif" }}>
              {challenge}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg md:text-xl font-medium" style={{ fontFamily: "Manrope, sans-serif" }}>My Role</h3>
            <p className="text-sm md:text-base leading-relaxed opacity-90" style={{ fontFamily: "Inter, sans-serif" }}>
              {myRole}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg md:text-xl font-medium" style={{ fontFamily: "Manrope, sans-serif" }}>The Outcome</h3>
            <p className="text-sm md:text-base leading-relaxed opacity-90" style={{ fontFamily: "Inter, sans-serif" }}>
              {outcome}
            </p>
          </div>

          <Button variant="outline" className="border border-black bg-transparent hover:bg-black/5 w-full sm:w-auto">
            View Case Study
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF5E6] text-black">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#FAF5E6]/95 backdrop-blur border-b border-black/10">
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex items-center justify-between h-20">
          <div className="font-bold text-2xl" style={{ fontFamily: "Mona Sans, sans-serif", letterSpacing: "0.02em" }}>
            DavidUX
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-12">
            <a href="#home" className="text-lg font-semibold opacity-40 hover:opacity-100 transition-opacity border-b-4 border-black" style={{ fontFamily: "Manrope, sans-serif" }}>
              Home
            </a>
            <a href="#about" className="text-lg font-semibold hover:opacity-100 transition-opacity" style={{ fontFamily: "Manrope, sans-serif" }}>
              About
            </a>
            <a href="#work" className="text-lg font-semibold hover:opacity-100 transition-opacity" style={{ fontFamily: "Manrope, sans-serif" }}>
              Case Studies
            </a>
            <a href="#contact" className="text-lg font-semibold hover:opacity-100 transition-opacity" style={{ fontFamily: "Manrope, sans-serif" }}>
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 hover:bg-black/5 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={closeMobileMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-[#FAF5E6] border-l border-black/10 z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Close Button */}
                <div className="flex justify-end p-6">
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Menu Items */}
                <nav className="flex flex-col gap-2 px-6">
                  <a
                    href="#home"
                    onClick={closeMobileMenu}
                    className="text-xl font-semibold py-4 border-b border-black/10 hover:bg-black/5 px-4 rounded-lg transition-colors"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    Home
                  </a>
                  <a
                    href="#about"
                    onClick={closeMobileMenu}
                    className="text-xl font-semibold py-4 border-b border-black/10 hover:bg-black/5 px-4 rounded-lg transition-colors"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    About
                  </a>
                  <a
                    href="#work"
                    onClick={closeMobileMenu}
                    className="text-xl font-semibold py-4 border-b border-black/10 hover:bg-black/5 px-4 rounded-lg transition-colors"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    Case Studies
                  </a>
                  <a
                    href="#contact"
                    onClick={closeMobileMenu}
                    className="text-xl font-semibold py-4 hover:bg-black/5 px-4 rounded-lg transition-colors"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    Contact
                  </a>
                </nav>

                {/* CTA Buttons in Mobile Menu */}
                <div className="mt-auto p-6 space-y-3 border-t border-black/10">
                  <Button className="w-full bg-black text-white hover:bg-black/90 py-6">
                    View Work
                  </Button>
                  <Button variant="outline" className="w-full border border-black bg-transparent hover:bg-black/5 py-6">
                    Download CV
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-[#D6D2C7] to-transparent">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left: Content */}
            <div className="space-y-8 md:space-y-10">
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight" style={{ fontFamily: "Manrope Variable, sans-serif", fontWeight: 372, letterSpacing: "-0.03em" }}>
                  I build products from <span style={{ fontWeight: 800, letterSpacing: "-0.05em" }}>strategy</span> to <span style={{ fontWeight: 800, letterSpacing: "-0.05em" }}>shipped</span>
                </h1>

                <p className="text-xl md:text-2xl leading-relaxed text-[#6B6963]" style={{ fontFamily: "EB Garamond, serif" }}>
                  Extensive FinTech experience. <br className="hidden sm:block" />
                  Now designing, coding, and deploying complete solutions — powered by AI, guided by experience.
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-6 md:gap-8">
                <MetricCard value="20+" label="Years in FinTech" delay={0} />
                <MetricCard value="5" label="Sectors deep" delay={0.1} />
                <MetricCard value="End-to-End" label="Strategy to Deploy" delay={0.2} />
                <MetricCard value="AI" label="Embedded AI in Design" delay={0.3} />
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button className="bg-black text-white hover:bg-black/90 px-6 md:px-8 py-5 md:py-6 text-base md:text-lg w-full sm:w-auto">
                  View Work
                </Button>
                <Button variant="outline" className="border border-black bg-transparent hover:bg-black/5 px-6 md:px-8 py-5 md:py-6 text-base md:text-lg w-full sm:w-auto">
                  Download CV
                </Button>
              </div>
            </div>

            {/* Right: Hero Image - Placeholder */}
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] order-first lg:order-last">
              <img
                src="/images/hero-david-workspace.jpg"
                alt="David Phillip workspace"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Section with Logo Ticker */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <h3 className="text-center text-xs md:text-sm uppercase tracking-wider mb-6 md:mb-8 opacity-70" style={{ fontFamily: "Inter, sans-serif" }}>
            Trusted by Industry Leaders
          </h3>

          {/* Logo Ticker - Simplified */}
          <div className="flex items-center justify-center gap-6 md:gap-12 flex-wrap opacity-70">
            {["Cognism", "Coutts", "Schroders", "HSBC", "NatWest", "Deutsche Bank", "BlackRock", "Barclays", "TSB"].map((company, idx) => (
              <div key={idx} className="text-sm md:text-lg font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-[#D6D2C7] to-white">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="mb-8 md:mb-12 space-y-3 md:space-y-4">
            <p className="text-xs md:text-sm opacity-70" style={{ fontFamily: "Inter, sans-serif" }}>What I do</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#6B6963]" style={{ fontFamily: "EB Garamond, serif" }}>
              The full stack — from problem to production
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            <ServiceCard
              title="Strategy & Research"
              description="Defining the right problem. User research, market analysis, and product strategy grounded in two decades of financial services reality."
            />
            <ServiceCard
              title="Product & UX Design"
              description="Journeys, wireframes, prototypes, and polished UI. Designing for complex financial workflows that actually work for real users."
            />
            <ServiceCard
              title="Code & Deployment"
              description="Building and shipping functional applications. AI-augmented development that turns concepts into working products, fast."
            />
          </div>

          {/* Quote Section */}
          <div className="bg-white p-6 md:p-10 rounded-lg">
            <h3 className="text-xl md:text-2xl lg:text-3xl leading-relaxed" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, letterSpacing: "-0.02em" }}>
              <strong>Everyone can generate.</strong><br /><br />
              <strong>Few can orchestrate.</strong><br /><br />
              <strong>My value isn't just making things—</strong> <em>it's knowing what to build</em>, why it matters, and how to ship it properly. Domain expertise + AI fluency + end-to-end ownership.
            </h3>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="work" className="relative">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
          <div className="space-y-3 mb-8 md:mb-12">
            <p className="text-xs md:text-sm opacity-70" style={{ fontFamily: "Inter, sans-serif" }}>Selected Work</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold" style={{ fontFamily: "Mona Sans, sans-serif", letterSpacing: "-0.02em" }}>
              Building for finance's most demanding clients
            </h1>
          </div>
        </div>

        {/* HSBC Case Study */}
        <CaseStudyCard
          logo="/images/hsbc-logo.png"
          company="HSBC"
          title="Small Business App helping companies run their businesses"
          role="Design Lead — Team Management"
          tags={["Mobile App", "Commercial Banking", "Team Leadership"]}
          image="/images/team-collaboration.jpg"
          challenge="HSBC needed a digital-first business banking proposition to compete with challenger banks. The app had to serve small business owners with complex needs while maintaining the trust and reliability expected of a global bank."
          myRole="Led the design team through the full product lifecycle. Managed designers, coordinated with engineering, and drove the experience strategy from initial concepts through to launch."
          outcome="Delivered an award-winning application that set a new standard for business banking experiences."
          bgColor="bg-gradient-to-b from-[#F7F3E9] to-[#D6D2C7]"
        />

        {/* Coutts Case Study */}
        <CaseStudyCard
          logo="/images/coutts-logo.png"
          company="Coutts"
          title="Wealth Management App"
          role="Director (Product Design Lead)"
          tags={["Private Banking", "Wealth Management", "Mobile"]}
          image="/images/metric-cards-background.jpg"
          challenge="Coutts — the private bank to the Royal Family — needed a digital wealth experience that matched the exclusivity and sophistication of their service. The bar for quality was exceptionally high."
          myRole="Designed the wealth management application experience. Balanced the complexity of portfolio visualisation and financial data with the elegance expected by ultra-high-net-worth clients."
          outcome="A refined digital experience that translated Coutts' premium service into an intuitive mobile product."
          bgColor="bg-[#D6D2C7]"
        />

        {/* Schroders Case Study */}
        <CaseStudyCard
          logo="/images/schroders-logo.png"
          company="Schroders Investments & Private Banking"
          title="Private Banking Digital Transformation"
          role="Consultants for End-to-End Digital Transformation"
          tags={["Mobile App", "Commercial Banking", "Team Leadership"]}
          image="/images/hero-david-workspace.jpg"
          challenge="Schroders' Private Banking division needed a complete overhaul of their customer-facing digital presence. Legacy systems and fragmented experiences were undermining the premium service proposition."
          myRole="Worked across two parts of the business before moving into Private Banking to lead the end-to-end digital transformation. Owned the complete journey from strategy through to delivery."
          outcome="Transformed the entire online digital presence for private banking customers. Created a cohesive, modern experience that aligned with Schroders' investment expertise and client expectations."
          bgColor="bg-gradient-to-b from-[#D6D2C7] to-[#96948C]"
        />
      </section>

      {/* Footer CTA */}
      <section id="contact" className="bg-black text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <h2 className="text-3xl md:text-4xl font-semibold" style={{ fontFamily: "Manrope, sans-serif" }}>
              Looking for someone who can <span className="font-extrabold">think</span> and <span className="font-extrabold">ship</span>?
            </h2>
            <Button variant="outline" className="border border-white text-white bg-transparent hover:bg-white/10 px-6 md:px-8 py-5 md:py-6 text-base md:text-lg w-full md:w-auto shrink-0">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
