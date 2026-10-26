import { ArrowRight, ArrowUpRight, Download, Linkedin, Mail } from "lucide-react";
import { Link } from "wouter";
import { useAudience } from "@/rebuild/audiences";
import { CV_PDF_PATH } from "@/rebuild/meta";
import { profile } from "@/rebuild/portfolioData";
import {
  shortEarlierCareer,
  shortExperience,
  shortHero,
  shortPrinciples,
  shortProjects,
  shortReferences,
  shortNow,
  type ShortProject,
} from "@/rebuild/shortPortfolio";
import {
  AvailabilityBadge,
  ButtonLink,
  CopyEmailButton,
  useDocumentMeta,
  useInitialScroll,
} from "@/rebuild/site";

/**
 * The main portfolio at /: one page, readable in about two minutes. The
 * longer versions live at /full, /saas and /design-leadership.
 * Shares the design tokens of the main site; copy lives in shortPortfolio.ts.
 */

const nav = [
  { id: "work", label: "Work" },
  { id: "leadership", label: "How I lead" },
  { id: "testimonials", label: "References" },
  { id: "experience", label: "Experience" },
];

function SectionHeading({ index, id, children }: { index: string; id: string; children: string }) {
  return (
    <div className="flex items-baseline gap-4 border-t border-ink/15 pt-5">
      <span className="font-label text-xs text-cobalt">{index}</span>
      <h2
        id={id}
        className="font-editorial text-[clamp(2rem,4vw,3rem)] leading-none tracking-[-0.02em] text-ink"
      >
        {children}
      </h2>
    </div>
  );
}

function Header() {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5 md:px-8">
        <a href="#top" className="flex items-center gap-3 rounded-full pr-2">
          <span
            aria-hidden="true"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink font-editorial text-[17px] leading-none text-bone"
          >
            D<span className="italic">p</span>
          </span>
          <span className="text-[15px] font-medium tracking-[-0.01em] text-ink">
            David Phillip
          </span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-full px-3 py-2 text-sm text-stone transition hover:text-ink"
            >
              {item.label}
            </a>
          ))}
          <Link href="/cv" className="rounded-full px-3 py-2 text-sm text-stone transition hover:text-ink">
            CV
          </Link>
        </nav>
        <div className="flex items-center gap-1">
          <Link
            href="/cv"
            className="rounded-full px-3 py-2 text-sm font-medium text-ink md:hidden"
          >
            CV
          </Link>
          <ButtonLink href="#contact" size="sm" variant="ink" icon="none">
            Contact
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="mx-auto max-w-5xl px-5 pb-16 pt-12 md:px-8 md:pb-24 md:pt-20">
      <div className="hero-rise">
        <div className="flex flex-wrap items-center gap-4">
          <img
            src="/images/site/portrait-david-160.webp"
            alt="David Phillip"
            className="h-14 w-14 rounded-full object-cover"
            width="56"
            height="56"
          />
          <div>
            <p className="text-[15px] font-medium leading-6 text-ink">{profile.name}</p>
            <p className="text-sm leading-5 text-stone">{shortHero.seeking}</p>
          </div>
          <div className="w-full sm:ml-auto sm:w-auto">
            <AvailabilityBadge tone="paper" />
          </div>
        </div>

        <h1
          id="hero-title"
          className="type-hero mt-10 max-w-4xl text-[clamp(2.625rem,6vw,5rem)] text-ink"
        >
          {shortHero.headline}{" "}
          <em className="italic text-cobalt">{shortHero.emphasis}</em>
          {shortHero.tail}
        </h1>
        <p className="type-lede mt-6 max-w-2xl text-stone">{shortHero.intro}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={profile.calendlyUrl} icon="external">
            Book a 30-minute call
          </ButtonLink>
          <a
            href={CV_PDF_PATH}
            download
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ink/15 px-6 text-[15px] font-medium tracking-[-0.01em] text-ink transition hover:border-ink/40"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download CV (PDF)
          </a>
        </div>
      </div>

      <p className="mt-10 flex flex-col gap-2 border-l-2 border-cobalt pl-4 text-[15px] leading-6 text-ink sm:flex-row sm:gap-4">
        <span className="type-label shrink-0 pt-0.5 text-cobalt">Now</span>
        <span>
          {shortNow.text}{" "}
          <Link
            href={`/case-study/${shortNow.slug}`}
            className="font-medium text-cobalt underline underline-offset-4"
          >
            {shortNow.link}
          </Link>
        </span>
      </p>

      <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-3">
        {shortHero.proof.map((item) => (
          <div key={item.label} className="flex flex-col-reverse justify-end gap-2 bg-bone p-5 md:p-6">
            <dt className="text-sm leading-5 text-stone">{item.label}</dt>
            <dd className="font-editorial text-[2.5rem] leading-none tracking-[-0.02em] text-ink">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Project({ project, index }: { project: ShortProject; index: number }) {
  const rows = [
    { label: "Mandate", text: project.mandate },
    { label: "Problem", text: project.problem },
    { label: "What I did", text: project.action },
    { label: "Result", text: project.result },
  ];
  return (
    <article
      aria-labelledby={`project-${project.slug}`}
      className="grid gap-6 border-t border-ink/10 py-10 first:border-t-0 first:pt-2 md:grid-cols-12 md:gap-10 md:py-14"
    >
      <Link
        href={`/case-study/${project.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="group block self-start overflow-hidden rounded-2xl border border-ink/10 bg-ink-2 md:col-span-5"
      >
        <img
          src={project.imageSmall ?? project.image}
          srcSet={project.imageSmall ? `${project.imageSmall} 800w, ${project.image} 1600w` : undefined}
          sizes="(min-width: 768px) 400px, 100vw"
          alt=""
          width="800"
          height="534"
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          className="aspect-[3/2] w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
        />
      </Link>

      <div className="md:col-span-7">
        <p className="type-label text-stone">
          <span className="text-cobalt">{project.company}</span> · {project.role} · {project.period}
        </p>
        <h3
          id={`project-${project.slug}`}
          className="type-title mt-3 text-[clamp(1.625rem,2.6vw,2.25rem)] text-ink"
        >
          {project.title}
        </h3>
        <p className="mt-4 flex items-baseline gap-3">
          <span className="font-editorial text-4xl leading-none tracking-[-0.02em] text-cobalt">
            {project.metric.value}
          </span>
          <span className="text-sm text-stone">{project.metric.label}</span>
        </p>
        <dl className="mt-6 space-y-4">
          {rows.map((row) => (
            <div key={row.label} className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
              <dt className="type-label pt-0.5 text-stone">{row.label}</dt>
              <dd className="text-[15px] leading-6 text-ink">{row.text}</dd>
            </div>
          ))}
        </dl>
        <Link
          href={`/case-study/${project.slug}`}
          className="group mt-7 inline-flex items-center gap-2 text-[15px] font-medium text-cobalt underline-offset-4 hover:underline"
        >
          Read the {project.company} case study
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}

function Work() {
  return (
    <section aria-labelledby="work" className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
      <SectionHeading index="01" id="work">
        Selected work
      </SectionHeading>
      <p className="mt-4 max-w-xl text-[15px] leading-6 text-stone">
        Three projects, each with the brief, the problem, my part and the result.
      </p>
      <div className="mt-8">
        {shortProjects.map((project, index) => (
          <Project key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section aria-labelledby="leadership" className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
      <SectionHeading index="02" id="leadership">
        How I lead
      </SectionHeading>
      <p className="type-lede mt-6 max-w-2xl text-ink">
        Good design teams need clear standards, honest critique and a seat with
        Product and Engineering. I set those up first, and I’m equally
        comfortable hands-on in a critique or leading multidisciplinary teams.
      </p>
      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {shortPrinciples.map((item) => (
          <li key={item.title} className="border-t-2 border-cobalt pt-4">
            <h3 className="text-[17px] font-medium tracking-[-0.01em] text-ink">{item.title}</h3>
            <p className="mt-2 text-[15px] leading-6 text-stone">{item.text}</p>
          </li>
        ))}
      </ul>
      <p id="writing" className="mt-10 text-[15px] leading-6 text-ink">
        I also write about design leadership and AI.{" "}
        <Link
          href="/articles"
          className="font-medium text-cobalt underline underline-offset-4"
        >
          Read the essays
        </Link>
      </p>
    </section>
  );
}

function References() {
  const [featured, ...rest] = shortReferences;
  return (
    <section aria-labelledby="testimonials" className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
      <SectionHeading index="03" id="testimonials">
        What colleagues say
      </SectionHeading>
      <figure className="mt-10">
        <blockquote className="font-editorial text-[clamp(1.625rem,3.2vw,2.5rem)] leading-[1.15] tracking-[-0.015em] text-ink">
          “{featured.quote}”
        </blockquote>
        <figcaption className="mt-5 text-[15px] leading-6">
          <span className="font-medium text-ink">{featured.author}</span>
          <span className="text-stone">
            , {featured.role} · {featured.relationship}
          </span>
        </figcaption>
      </figure>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {rest.map((item) => (
          <figure key={item.author} className="rounded-2xl border border-ink/10 bg-bone p-6">
            <blockquote className="text-[15px] leading-6 text-ink">“{item.quote}”</blockquote>
            <figcaption className="mt-4 text-sm leading-5">
              <span className="font-medium text-ink">{item.author}</span>
              <span className="block text-stone">
                {item.role} · {item.relationship}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section aria-labelledby="experience" className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
      <SectionHeading index="04" id="experience">
        Experience
      </SectionHeading>
      <ol className="mt-8">
        {shortExperience.map((item) => (
          <li
            key={item.period}
            className="grid gap-1 border-b border-ink/10 py-4 sm:grid-cols-[9rem_1fr_auto] sm:items-baseline sm:gap-6"
          >
            <span className="font-label text-xs text-stone">{item.period}</span>
            <span className="text-[15px] font-medium text-ink">{item.role}</span>
            <span className="text-[15px] text-stone">{item.company}</span>
          </li>
        ))}
      </ol>
      <p className="mt-5 text-[15px] leading-6 text-stone">{shortEarlierCareer}</p>
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-medium">
        <Link href="/cv" className="inline-flex items-center gap-1.5 text-cobalt underline-offset-4 hover:underline">
          Read the full CV <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <a
          href={CV_PDF_PATH}
          download
          className="inline-flex items-center gap-1.5 text-cobalt underline-offset-4 hover:underline"
        >
          Download PDF <Download className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      aria-labelledby="contact"
      data-surface="ink"
      className="bg-ink text-bone"
    >
      <div className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
        <AvailabilityBadge />
        <h2
          id="contact"
          className="mt-8 font-editorial text-[clamp(2.75rem,6vw,4.75rem)] leading-[0.95] tracking-[-0.02em]"
        >
          Let’s <em className="italic text-periwinkle">talk</em>.
        </h2>
        <p className="type-lede mt-6 max-w-xl text-mist">
          I’m based in London and looking for Head of Design or Design
          Director roles. A 30-minute call is the quickest way to see if we’re
          a fit.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href={profile.calendlyUrl} icon="external">
            Book a 30-minute call
          </ButtonLink>
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-[15px] font-medium text-bone transition hover:border-white/50 sm:flex-none"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {profile.email}
            </a>
            <CopyEmailButton />
          </div>
        </div>
        <a
          href={profile.linkedinUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 text-[15px] text-mist transition hover:text-bone"
        >
          <Linkedin className="h-4 w-4" aria-hidden="true" />
          LinkedIn
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-mist">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 border-t border-white/10 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between md:px-8">
        <p>© {new Date().getFullYear()} David Phillip</p>
        <Link href="/full" className="inline-flex items-center gap-1.5 text-bone underline-offset-4 hover:underline">
          See the full portfolio <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </footer>
  );
}

export default function PortfolioShort() {
  const audience = useAudience();
  useDocumentMeta(audience.meta);
  useInitialScroll(audience.id);

  return (
    <div id="top" className="dp min-h-screen bg-paper text-ink">
      <Header />
      <main id="main-content">
        <Hero />
        <Work />
        <Leadership />
        <References />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
