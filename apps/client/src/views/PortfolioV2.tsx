import { ArrowRight, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import {
  capabilityHighlights,
  caseStudies,
  credibilitySignals,
  principles,
  profile,
  services,
} from "@/rebuild/portfolioData";

const page = {
  shell: "bg-[#f6f7f1] text-[#11140f]",
  ink: "text-[#11140f]",
  muted: "text-[#5d675f]",
  line: "border-[#11140f]/12",
  dark: "bg-[#11140f] text-[#f6f7f1]",
  accent: "bg-[#d7ff38] text-[#11140f]",
  cyan: "text-[#4ecdc4]",
};

function SectionHeader({
  eyebrow,
  title,
  text,
  invert = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  invert?: boolean;
}) {
  return (
    <div className="mb-8 grid gap-5 md:mb-12 md:grid-cols-[0.36fr_0.64fr] md:items-end">
      <p
        className={`text-xs font-semibold uppercase ${
          invert ? "text-[#d7ff38]" : "text-[#5d675f]"
        }`}
      >
        {eyebrow}
      </p>
      <div>
        <h2
          className={`max-w-4xl text-4xl font-semibold leading-tight md:text-6xl ${
            invert ? "text-[#f6f7f1]" : page.ink
          }`}
        >
          {title}
        </h2>
        {text ? (
          <p
            className={`mt-5 max-w-2xl text-base leading-7 md:text-lg ${
              invert ? "text-[#f6f7f1]/70" : page.muted
            }`}
          >
            {text}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function ArrowLink({
  href,
  children,
  variant = "dark",
}: {
  href: string;
  children: string;
  variant?: "dark" | "light" | "accent";
}) {
  const styles = {
    dark: "bg-[#11140f] text-[#f6f7f1] hover:bg-[#263027]",
    light:
      "border border-[#f6f7f1]/35 text-[#f6f7f1] hover:border-[#d7ff38] hover:text-[#d7ff38]",
    accent: "bg-[#d7ff38] text-[#11140f] hover:bg-[#c8f02f]",
  };

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold transition ${styles[variant]}`}
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

export default function PortfolioV2() {
  return (
    <div className={`min-h-screen ${page.shell}`}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[#d7ff38] focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-[#11140f]"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#11140f]/82 text-[#f6f7f1] backdrop-blur-xl">
        <nav
          aria-label="Portfolio v2 navigation"
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8"
        >
          <Link href="/portfolio-v2" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-[#d7ff38] text-xs font-semibold text-[#11140f]">
              DP
            </span>
            <span className="hidden text-sm font-semibold sm:inline">
              David Phillip
            </span>
          </Link>
          <div className="flex items-center gap-4 text-sm font-medium text-[#f6f7f1]/72">
            <a href="#work" className="hidden hover:text-[#f6f7f1] sm:inline">
              Work
            </a>
            <a
              href="#proof"
              className="hidden hover:text-[#f6f7f1] sm:inline"
            >
              Proof
            </a>
            <a
              href={profile.calendlyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-[#f6f7f1]/25 px-4 py-2 text-[#f6f7f1] transition hover:border-[#d7ff38] hover:text-[#d7ff38]"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Contact
            </a>
          </div>
        </nav>
      </header>

      <main id="main">
        <section className="relative min-h-[88svh] overflow-hidden bg-[#11140f] text-[#f6f7f1]">
          <img
            src="/images/hero-image.png"
            alt="David Phillip"
            className="absolute inset-0 h-full w-full object-cover object-[58%_22%] opacity-62 mix-blend-luminosity md:object-center"
            width="1600"
            height="1800"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,20,15,0.96)_0%,rgba(17,20,15,0.78)_42%,rgba(17,20,15,0.28)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(180deg,rgba(17,20,15,0)_0%,#f6f7f1_100%)]" />

          <div className="relative mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 md:px-8 md:pb-20">
            <div className="max-w-4xl">
              <div className="mb-7 flex flex-wrap gap-2">
                <span className="rounded-md bg-[#d7ff38] px-3 py-1 text-xs font-semibold text-[#11140f]">
                  {profile.location}
                </span>
                {profile.positioningBadges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-md border border-[#f6f7f1]/22 bg-[#f6f7f1]/8 px-3 py-1 text-xs font-semibold text-[#f6f7f1]/78"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <h1 className="text-6xl font-semibold leading-none sm:text-7xl md:text-8xl">
                David Phillip
              </h1>
              <p className="mt-5 max-w-3xl text-2xl font-medium leading-snug text-[#f6f7f1]/88 md:text-4xl">
                {profile.headline}
              </p>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#f6f7f1]/68 md:text-lg">
                {profile.intro}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ArrowLink href="#work" variant="accent">
                  View case studies
                </ArrowLink>
                <ArrowLink href="/cv" variant="light">
                  View CV
                </ArrowLink>
                <ArrowLink
                  href={profile.calendlyUrl}
                  variant="light"
                >
                  Request access
                </ArrowLink>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#11140f]/12 bg-[#f6f7f1]">
          <div className="mx-auto grid max-w-7xl gap-px border-x border-[#11140f]/12 bg-[#11140f]/12 md:grid-cols-4">
            {profile.proof.map((item) => (
              <div key={item.label} className="bg-[#f6f7f1] p-5 md:p-7">
                <p className="text-4xl font-semibold leading-none text-[#11140f]">
                  {item.value}
                </p>
                <p className="mt-3 text-sm font-medium leading-5 text-[#5d675f]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-[#11140f]/12 bg-[#f6f7f1] py-5">
          <div className="mx-auto flex max-w-7xl items-center gap-7 overflow-x-auto px-4 md:px-8">
            <span className="shrink-0 text-xs font-semibold uppercase text-[#5d675f]">
              Trusted contexts
            </span>
            {profile.clients.map((client) => (
              <span
                key={client}
                className="shrink-0 text-sm font-semibold text-[#11140f]"
              >
                {client}
              </span>
            ))}
          </div>
        </section>

        <section id="proof" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <SectionHeader
            eyebrow="Leadership evidence"
            title="A design leader for teams moving through complexity."
            text="I bring structure to complex product environments: clarifying responsibility, shaping the operating model and connecting design work to measurable product performance."
          />
          <div className="grid gap-px overflow-hidden rounded-lg border border-[#11140f]/12 bg-[#11140f]/12 md:grid-cols-3">
            {profile.leadershipEvidence.map((item, index) => (
              <div key={item.title} className="bg-white p-6 md:p-8">
                <p className="text-sm font-semibold text-[#4b6bff]">
                  0{index + 1}
                </p>
                <h3 className="mt-8 text-2xl font-semibold leading-tight text-[#11140f]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm font-medium leading-6 text-[#5d675f]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-[#11140f]/12 bg-[#11140f] px-4 py-16 text-[#f6f7f1] md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Core capabilities"
              title="UX strategy, systems and AI-aware product practice."
              text="I work where product experience, risk, systems and organisational alignment intersect. The focus is clearer services, stronger standards and better decisions across teams."
              invert
            />
            <div className="grid gap-px overflow-hidden rounded-lg border border-[#f6f7f1]/12 bg-[#f6f7f1]/12 md:grid-cols-3">
              {capabilityHighlights.map((item) => (
                <div key={item.title} className="bg-[#171b14] p-6 md:p-8">
                  <h3 className="text-xl font-semibold leading-tight text-[#f6f7f1]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm font-medium leading-6 text-[#f6f7f1]/66">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <SectionHeader
            eyebrow="Selected work"
            title="Case studies from complex product and platform work."
            text="A public view of the problem, my role and the impact. Deeper project detail is available privately where the work includes sensitive client or delivery context."
          />

          <div className="grid gap-8">
            {caseStudies.map((study, index) => (
              <Link
                key={study.slug}
                href={`/case-study/${study.slug}`}
                className="group grid overflow-hidden rounded-lg border border-[#11140f]/12 bg-white transition hover:border-[#11140f]/40 md:grid-cols-[0.48fr_0.52fr]"
              >
                <div className="relative min-h-80 overflow-hidden bg-[#11140f] md:min-h-[34rem]">
                  <img
                    src={study.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-88 transition duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                    width="1000"
                    height="760"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,20,15,0.08)_0%,rgba(17,20,15,0.74)_100%)]" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                    <p className="text-sm font-semibold text-[#f6f7f1]">
                      {String(index + 1).padStart(2, "0")} / {study.company}
                    </p>
                    {study.protected ? (
                      <span className="inline-flex items-center gap-2 rounded-md bg-[#f6f7f1] px-3 py-2 text-xs font-semibold text-[#11140f]">
                        <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
                        Private
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-8 p-6 md:p-9">
                  <div>
                    <p className="text-sm font-semibold text-[#5d675f]">
                      {study.sector} / {study.period}
                    </p>
                    <h3 className="mt-4 text-4xl font-semibold leading-tight text-[#11140f] md:text-6xl">
                      {study.title}
                    </h3>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-[#5d675f]">
                      {study.summary}
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid gap-px overflow-hidden rounded-lg border border-[#11140f]/12 bg-[#11140f]/12 sm:grid-cols-3">
                      {[
                        ["Problem", study.publicPreview.problem],
                        ["Remit", study.publicPreview.remit],
                        ["Impact", study.publicPreview.impact],
                      ].map(([title, text]) => (
                        <div key={title} className="bg-[#f6f7f1] p-4">
                          <p className="text-xs font-semibold uppercase text-[#11140f]">
                            {title}
                          </p>
                          <p className="mt-3 text-sm font-medium leading-5 text-[#5d675f]">
                            {text}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#11140f]/12 pt-5">
                      <div className="flex flex-wrap gap-2">
                        {study.proof.slice(0, 3).map((point) => (
                          <span
                            key={point.label}
                            className="rounded-md bg-[#11140f] px-3 py-2 text-xs font-semibold text-[#f6f7f1]"
                          >
                            {point.value} {point.label}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#11140f]">
                        {study.protected ? "Unlock case study" : "Read case study"}
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-[#11140f]/12 bg-white px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Testimonials"
              title="Proof from product, design and delivery leaders."
              text="Colleagues and stakeholders describe how I lead teams, improve design practice and connect UX work to business outcomes."
            />
            <div className="grid gap-5 md:grid-cols-3">
              {profile.testimonials.map((testimonial) => (
                <figure
                  key={testimonial.author}
                  className="rounded-lg border border-[#11140f]/12 bg-[#f6f7f1] p-6"
                >
                  <blockquote className="text-base font-medium leading-7 text-[#11140f]">
                    "{testimonial.quote}"
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4 border-t border-[#11140f]/12 pt-5">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="h-12 w-12 rounded-md object-cover"
                      loading="lazy"
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#11140f]">
                        {testimonial.author}
                      </p>
                      <p className="mt-1 text-xs font-medium text-[#5d675f]">
                        {testimonial.attribution}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f6f7f1] px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.44fr_0.56fr]">
            <SectionHeader
              eyebrow="How I work"
              title="Evidence, standards and stakeholder trust."
              text="Most of my work happens where the answer has to work for users, product teams, engineers, compliance, risk and senior stakeholders."
            />
            <div className="grid gap-3">
              {credibilitySignals.map((signal) => (
                <div
                  key={signal}
                  className="grid grid-cols-[auto_1fr] gap-4 border-t border-[#11140f]/12 py-5"
                >
                  <ShieldCheck className="mt-1 h-5 w-5 text-[#4b6bff]" aria-hidden="true" />
                  <p className="text-base font-medium leading-7 text-[#5d675f]">
                    {signal}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="principles" className="border-y border-[#11140f]/12 bg-[#11140f] px-4 py-16 text-[#f6f7f1] md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Design principles"
              title="The operating principles behind the work."
              text="Sharp product design leadership is about how decisions are made, not only how screens look."
              invert
            />
            <div className="grid gap-px overflow-hidden rounded-lg border border-[#f6f7f1]/12 bg-[#f6f7f1]/12 md:grid-cols-4">
              {principles.map((principle) => (
                <div key={principle.title} className="bg-[#171b14] p-6">
                  <div className="mb-8 h-1.5 w-10 rounded-sm bg-[#d7ff38]" />
                  <h3 className="text-xl font-semibold leading-tight">
                    {principle.title}
                  </h3>
                  <p className="mt-4 text-sm font-medium leading-6 text-[#f6f7f1]/66">
                    {principle.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 rounded-lg bg-[#d7ff38] p-6 md:grid-cols-[0.44fr_0.56fr] md:p-10">
            <div>
              <p className="text-xs font-semibold uppercase text-[#11140f]/65">
                Where I fit
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-[#11140f] md:text-6xl">
                Senior design leadership for teams building the next product system.
              </h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-lg bg-[#11140f]/20 sm:grid-cols-2">
              {services.map((service) => (
                <div key={service} className="bg-[#11140f] p-5 text-[#f6f7f1]">
                  <p className="text-base font-medium leading-6">{service}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-[#11140f]/20 pt-6 md:col-span-2 md:flex md:items-center md:justify-between">
              <p className="max-w-xl text-lg font-semibold leading-7 text-[#11140f]">
                Want the private context behind the case studies?
              </p>
              <ArrowLink href={profile.calendlyUrl} variant="dark">
                Request access
              </ArrowLink>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#11140f]/12 px-4 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm font-medium text-[#5d675f] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} David Phillip</p>
          <a href={`mailto:${profile.email}`} className="text-[#11140f]">
            {profile.email}
          </a>
        </div>
      </footer>
    </div>
  );
}
