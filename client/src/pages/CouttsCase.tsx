import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

/**
 * COUTTS CASE STUDY PAGE
 * Design Philosophy: Sophisticated Minimalism with Data Narrative
 * Showcases David's ability to lead design in luxury/premium contexts
 */

export default function CouttsCase() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl text-foreground hover:text-accent transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
            David Phillip
          </Link>
          <div className="hidden md:flex gap-8">
            <Link href="/#about" className="text-sm hover:text-accent transition-colors">
              About
            </Link>
            <Link href="/#work" className="text-sm hover:text-accent transition-colors">
              Work
            </Link>
            <Link href="/#contact" className="text-sm hover:text-accent transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Back Button */}
      <div className="container pt-8">
        <Link href="/#work" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" />
          Back to Work
        </Link>
      </div>

      {/* Hero Section */}
      <section className="container py-12 md:py-20">
        <div className="max-w-4xl">
          <div className="space-y-6 mb-12">
            <p className="text-sm text-accent font-semibold">Case Study</p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Wealth Management App
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              How we built an elegant, intuitive app that made managing ultra-high-net-worth portfolios feel effortless.
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden mb-12">
            <img
              src="/images/coutts-entrance.jpg"
              alt="Coutts Bank Entrance - 330 Years of Private Banking Excellence"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent rounded-lg" />
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="container py-12 md:py-20 border-t border-border">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Challenge */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-accent uppercase tracking-wide">Challenge</h3>
            <p className="text-foreground leading-relaxed">
              A 330-year-old private bank serving Britain's wealthiest families. But their digital experience was stuck in the 2000s. Clients managing eight-figure portfolios used clunky legacy portals while competitors won younger prospects with modern apps. 40% of prospects under 50 cited outdated digital tools as their reason for choosing competitors.
            </p>
          </div>

          {/* Approach */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-accent uppercase tracking-wide">Approach</h3>
            <p className="text-foreground leading-relaxed">
              I scaled the design team from 5 to 15 specialists, established Coutts' first dedicated UX research practice, and embedded regulatory teams as co-creators in the design process. We designed a modern native mobile app built on Quiet Confidence—clarity and discretion without gamification.
            </p>
          </div>

          {/* Outcome */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-accent uppercase tracking-wide">Outcome</h3>
            <p className="text-foreground leading-relaxed">
              Shipped a 4.2+ rated app with zero security incidents. Contributed millions in new assets. Transformed Coutts' design capability from a service layer to a strategic business function. 100% team retention throughout the engagement.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="container py-12 md:py-20">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Problem
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Coutts' private banking clients are among the most sophisticated investors in the world. They manage complex portfolios across multiple asset classes, jurisdictions, and currencies. Yet their digital experience was fragmented and outdated.
            </p>
            <p>
              The existing app felt like it was designed for retail investors, not UHNW clients. Information was buried behind multiple taps. Performance data wasn't presented in a way that matched their mental models. And the overall aesthetic didn't reflect the premium service they received in person.
            </p>
            <p>
              Coutts was losing ground to fintech competitors who understood that wealthy clients want elegance alongside functionality. They needed a digital experience that matched the caliber of their advisory relationship.
            </p>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section className="container py-12 md:py-20 bg-muted/30 -mx-4 md:-mx-8 px-4 md:px-8">
        <div className="max-w-3xl pl-4 md:pl-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
            Research & Discovery
          </h2>

          <div className="space-y-12">
            {/* Research Method 1 */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                In-Depth Client Interviews
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We conducted 15 interviews with UHNW clients to understand their needs, frustrations, and expectations. Key insights:
              </p>
              <ul className="space-y-3 mt-4">
                {[
                  "Simplicity matters more than feature density. They want to see what matters, not everything.",
                  "Trust is paramount. They need confidence that their data is secure and their advisor is always available.",
                  "Aesthetic quality signals competence. A premium experience reinforces their confidence in Coutts.",
                  "Mobile-first is essential. They manage portfolios on the go, between meetings and travel.",
                ].map((insight, idx) => (
                  <li key={idx} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Research Method 2 */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Competitive Analysis
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We analyzed wealth management apps from Fidelity, Schwab, and fintech competitors. We found that most prioritized feature completeness over elegance. There was a gap in the market for a truly premium experience.
              </p>
            </div>

            {/* Research Method 3 */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Advisor Feedback
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We interviewed Coutts advisors to understand how clients used the existing app and where they got stuck. Advisors emphasized that clients wanted to feel in control, not overwhelmed. They wanted to understand their portfolio at a glance, then dive deeper if needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Design Solution Section */}
      <section className="container py-12 md:py-20">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Design Solution
          </h2>

          <div className="space-y-12">
            {/* Principle 1 */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-accent" style={{ fontFamily: "'Playfair Display', serif" }}>
                Progressive Disclosure
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We designed the app to show what matters at a glance, then reveal complexity on demand. The dashboard displays portfolio value, key performance metrics, and recent activity. Clients can tap to drill into asset allocation, individual holdings, or performance analytics.
              </p>
            </div>

            {/* Principle 2 */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-accent" style={{ fontFamily: "'Playfair Display', serif" }}>
                Elegance Through Restraint
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We used a refined color palette (deep navy, gold accents, white space) and premium typography to signal quality. Every element served a purpose. We removed visual clutter and unnecessary animations. The result feels calm and authoritative.
              </p>
            </div>

            {/* Principle 3 */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-accent" style={{ fontFamily: "'Playfair Display', serif" }}>
                Data Visualization for Insight
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We invested heavily in custom charts and visualizations that help clients understand their portfolio at a glance. Performance is shown in multiple timeframes. Asset allocation is presented clearly. Risk metrics are explained in plain language.
              </p>
            </div>

            {/* Principle 4 */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-accent" style={{ fontFamily: "'Playfair Display', serif" }}>
                Advisor Integration
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The app seamlessly connects clients to their advisors. They can request a meeting, send a message, or schedule a call directly from the app. This reinforces that Coutts' value is the relationship, not just the technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="container py-12 md:py-20 bg-muted/30 -mx-4 md:-mx-8 px-4 md:px-8">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
            Results
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                metric: "4.2+",
                description: "App Store rating with zero security incidents",
              },
              {
                metric: "Millions",
                description: "Contributed to net new assets",
              },
              {
                metric: "30%",
                description: "Increase in digital adoption",
              },
              {
                metric: "+22 pts",
                description: "NPS improvement",
              },
            ].map((result, idx) => (
              <div key={idx} className="space-y-2">
                <p className="text-4xl font-bold text-accent" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {result.metric}
                </p>
                <p className="text-muted-foreground leading-relaxed">{result.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-lg text-foreground leading-relaxed">
              Most importantly, the app became a key differentiator in Coutts' competitive positioning. Clients praised the elegance and ease of use. Advisors reported that clients felt more in control of their portfolios. And Coutts attracted new clients who specifically chose them for the digital experience.
            </p>
          </div>
        </div>
      </section>

      {/* My Role Section */}
      <section className="container py-12 md:py-20">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            My Role
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            I led as Design Lead - Director from 2020-2022, scaling the team from 5 to 15 specialists and managing stakeholders across Product, Engineering, Compliance, Legal, Risk, and the Executive Committee. My responsibilities included:
          </p>
          <ul className="space-y-3">
            {[
              "Scaled design team from 5 to 15 specialists (UX, UI, Research, Operations) with 100% retention",
              "Established Coutts' first dedicated UX Research practice with quarterly research cycles",
              "Led group-wide Figma migration across NatWest Group (4 brands, 280+ designers)",
              "Embedded regulatory teams in design sprints as co-creators rather than gatekeepers",
              "Designed and launched Coutts' first modern native mobile app (iOS and Android)",
              "Established cross-brand design system governance and audit trail for Compliance",
              "Transformed stakeholder dynamics by baking regulatory requirements into the design process",
            ].map((responsibility, idx) => (
              <li key={idx} className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{responsibility}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Key Learnings Section */}
      <section className="container py-12 md:py-20 bg-muted/30 -mx-4 md:-mx-8 px-4 md:px-8">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Key Learnings
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">Elegance is a feature.</strong> For premium clients, the aesthetic quality of the experience directly impacts their confidence in the product. We didn't add visual complexity—we removed it. The result was more powerful than any feature we could have added.
            </p>
            <p>
              <strong className="text-foreground">Simplicity requires discipline.</strong> Building a simple app is harder than building a complex one. Every element had to justify its existence. We had to say "no" to features that seemed valuable but added clutter.
            </p>
            <p>
              <strong className="text-foreground">Context matters.</strong> Wealth management is deeply personal. Clients want to feel that their advisor is always available. The app needed to reinforce the relationship, not replace it. We designed for that relationship.
            </p>
            <p>
              <strong className="text-foreground">Data visualization is design.</strong> How you present information is as important as what information you present. We invested heavily in custom charts and visualizations that helped clients understand their portfolio at a glance.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-12 md:py-20">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Interested in working together?
          </h2>
          <p className="text-lg text-muted-foreground">
            I'm always interested in conversations about building premium digital experiences and leading design in regulated industries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-base">
              Get in Touch
            </Button>
            <Link href="/#work" className="inline-flex items-center justify-center px-8 py-6 border border-border rounded-md hover:bg-muted transition-colors text-base">
              View Other Work
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
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
