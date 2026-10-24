import { ArrowRight, ArrowUpRight, Check, LockKeyhole, Quote } from "lucide-react";
import { Link } from "wouter";
import {
  aiPractice,
  caseStudyBySlug,
  experience,
  featuredTestimonial,
  firstNinetyDays,
  profile,
  testimonials,
  type CaseStudyDetail,
  type Testimonial,
} from "@/rebuild/portfolioData";
import { writing } from "@/rebuild/writing";
import { useAudience, type Audience } from "@/rebuild/audiences";
import {
  AvailabilityBadge,
  ButtonLink,
  ContactSection,
  Eyebrow,
  Reveal,
  SiteShell,
  useDocumentMeta,
  useInitialScroll,
} from "@/rebuild/site";

const capabilities = [
  "Design leadership",
  "Team building and hiring",
  "Design systems",
  "DesignOps",
  "UX research",
  "Product strategy",
  "Regulated delivery",
  "Stakeholder alignment",
  "AI-assisted workflows",
  "Prototyping in code",
];

function Hero({ audience }: { audience: Audience }) {
  const clients = audience.clientOrder.flatMap((name) =>
    profile.clients.filter((client) => client.name === name),
  );

  return (
    <section
      data-surface="ink"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-ink text-bone"
    >
      <div className="grid-texture absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="glow absolute -left-72 top-0 h-[48rem] w-[48rem] opacity-80"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-28 md:px-8 md:pt-36 lg:grid-cols-12 lg:gap-10 lg:pb-20">
        <div className="hero-rise flex flex-col justify-end lg:col-span-7">
          <div>
            <AvailabilityBadge />
          </div>

          <div className="mt-10 flex items-center gap-4">
            <img
              src="/images/site/portrait-david-160.webp"
              alt=""
              className="h-14 w-14 rounded-full object-cover lg:hidden"
              width="56"
              height="56"
            />
            <p className="text-[15px] leading-6">
              <span className="font-medium text-bone">David Phillip</span>
              <span className="block text-mist sm:inline">
                <span className="hidden sm:inline"> · </span>
                {profile.title}
              </span>
            </p>
          </div>
          <h1
            id="hero-title"
            className="type-hero mt-6 text-[clamp(2.875rem,6.4vw,5.75rem)] text-bone"
          >
            {audience.headline.lead}{" "}
            <em className="italic text-periwinkle">{audience.headline.emphasis}</em>
            {audience.headline.tail}
          </h1>

          <p className="type-lede mt-8 max-w-xl text-mist">{audience.intro}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="#work">View selected work</ButtonLink>
            <ButtonLink
              href={profile.calendlyUrl}
              variant="outline-light"
              icon="external"
            >
              Book an intro call
            </ButtonLink>
          </div>
        </div>

        <div className="hero-rise hidden lg:col-span-5 lg:block">
          <figure className="relative h-full min-h-[34rem] overflow-hidden rounded-[28px] border border-white/10 bg-ink-2">
            {/* Only fetched on large screens, where this column is shown */}
            <picture>
              <source
                media="(min-width: 1024px)"
                srcSet="/images/site/portrait-david.webp"
              />
              <img
                src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                alt="Portrait of David Phillip, photographed through fluted glass"
                className="absolute inset-0 h-full w-full object-cover object-[50%_35%]"
                width="876"
                height="732"
                fetchPriority="high"
              />
            </picture>
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/60 to-transparent"
            />
            <figcaption className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
              <div>
                <p className="font-editorial text-3xl leading-none text-bone">
                  Many lenses,
                  <br />
                  <em className="italic">one product.</em>
                </p>
              </div>
              <ul className="type-label text-right leading-6 text-mist">
                {audience.lenses.map((lens) => (
                  <li key={lens}>{lens}</li>
                ))}
              </ul>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <dl className="grid grid-cols-2 border-t border-white/10 lg:grid-cols-4">
          {audience.heroProof.map((item, index) => (
            <div
              key={item.label}
              className={`py-8 pr-4 ${index % 2 === 1 ? "pl-4 sm:pl-6" : ""} ${
                index > 0 ? "lg:border-l lg:border-white/10 lg:pl-6" : ""
              } ${index % 2 === 1 ? "border-l border-white/10" : ""} ${
                index > 1 ? "border-t border-white/10 lg:border-t-0" : ""
              }`}
            >
              <dt className="sr-only">{item.label}</dt>
              <dd>
                <span className="type-metric block text-bone">{item.value}</span>
                <span className="mt-3 block text-sm leading-5 text-mist">
                  {item.label}
                </span>
                <span className="type-label mt-3 block text-periwinkle">
                  {item.context}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-8 md:px-8 lg:flex-row lg:items-center lg:gap-12">
          <p className="type-label shrink-0 text-mist">Two decades inside</p>
          <ul
            className="grid flex-1 grid-cols-4 items-center gap-x-6 gap-y-6 sm:gap-x-10 lg:flex lg:justify-between lg:gap-6"
            aria-label="Organisations David has worked with"
          >
            {clients.map((client) => (
              <li key={client.name} className="flex items-center">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-4 w-auto max-w-full opacity-60 invert transition hover:opacity-100 sm:h-5 lg:h-[22px]"
                  width="92"
                  height="24"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CaseStudyCard({
  study,
  index,
  relevance,
}: {
  study: CaseStudyDetail;
  index: number;
  relevance: string;
}) {
  const [lead, ...rest] = study.proof;
  const flipped = index % 2 === 1;

  return (
    <Reveal>
      <Link
        href={`/case-study/${study.slug}`}
        className="group grid overflow-hidden rounded-[28px] border border-ink/10 bg-bone transition duration-300 hover:border-ink/25 hover:shadow-[0_30px_80px_-40px_rgb(12_14_18/0.45)] lg:grid-cols-12"
      >
        <div
          className={`relative aspect-[4/3] overflow-hidden bg-paper-2 lg:col-span-7 lg:aspect-auto lg:min-h-[34rem] ${
            flipped ? "lg:order-last" : ""
          }`}
        >
          <img
            src={study.image}
            srcSet={
              study.imageSmall
                ? `${study.imageSmall} 800w, ${study.image} 1600w`
                : undefined
            }
            sizes="(min-width: 1024px) 680px, 100vw"
            alt={study.imageAlt}
            className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
            style={{ objectPosition: study.imageFocus }}
            loading="lazy"
            width="1600"
            height="1067"
          />
          {study.protected ? (
            <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1.5 text-xs font-medium text-bone backdrop-blur">
              <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
              Full story on request
            </span>
          ) : null}
        </div>

        <div className="flex flex-col justify-between gap-10 p-7 md:p-10 lg:col-span-5">
          <div>
            <p className="type-label flex flex-wrap items-center gap-x-3 gap-y-1 text-stone">
              <span className="text-cobalt">{String(index + 1).padStart(2, "0")}</span>
              <span>{study.company}</span>
              <span aria-hidden="true">·</span>
              <span>{study.period}</span>
            </p>
            <h3 className="type-title mt-5 text-ink">{study.title}</h3>
            <p className="mt-5 text-[15px] leading-7 text-stone">{study.summary}</p>
            <p className="mt-5 flex items-start gap-2.5 text-sm font-medium leading-6 text-ink">
              <span
                aria-hidden="true"
                className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-cobalt"
              />
              <span>
                <span className="sr-only">What this shows: </span>
                {relevance}
              </span>
            </p>
          </div>

          <div>
            <div className="border-t border-ink/10 pt-6">
              <p className="type-metric text-ink">{lead.value}</p>
              <p className="mt-2 text-sm text-stone">{lead.label}</p>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="More results">
              {rest.slice(0, 2).map((point) => (
                <li
                  key={point.label}
                  className="rounded-full border border-ink/10 bg-paper px-3 py-1.5 text-[13px] text-ink"
                >
                  <span className="font-semibold">{point.value}</span>{" "}
                  <span className="text-stone">{point.label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-ink">
              Read the case study
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </p>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

function SelectedWork({ audience }: { audience: Audience }) {
  const studies = audience.caseStudyOrder.flatMap((slug) => {
    const study = caseStudyBySlug.get(slug);
    return study ? [study] : [];
  });

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-36"
    >
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow index="01">Selected work</Eyebrow>
            <h2 id="work-title" className="type-section mt-6 text-ink">
              Four engagements, measured in outcomes.
            </h2>
          </div>
          <p className="type-lede text-stone lg:col-span-5">
            Each one starts with the business problem, my remit and the
            result. Detail on confidential client work is shared in a
            walkthrough or with a password.
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-6 md:mt-20 md:gap-8">
        {studies.map((study, index) => (
          <CaseStudyCard
            key={study.slug}
            study={study}
            index={index}
            relevance={audience.relevance[study.slug] ?? study.relevance}
          />
        ))}
      </div>
    </section>
  );
}

function Leadership({ audience }: { audience: Audience }) {
  return (
    <section
      id="leadership"
      aria-labelledby="leadership-title"
      className="border-y border-ink/10 bg-bone"
    >
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-36">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow index="02">Leadership</Eyebrow>
              <h2 id="leadership-title" className="type-section mt-6 text-ink">
                How I lead design organisations.
              </h2>
            </div>
            <p className="type-lede text-stone lg:col-span-5">
              {audience.leadershipLede}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-ink/10 bg-ink/10 md:mt-20 md:grid-cols-2">
          {audience.pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.05} className="bg-bone">
              <article className="flex h-full flex-col p-7 md:p-10">
                <p className="type-label text-cobalt">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-6 font-editorial text-[2rem] leading-[1.05] tracking-[-0.015em] text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-4 max-w-md text-[15px] leading-7 text-stone">
                  {pillar.text}
                </p>
                <p className="mt-auto flex items-start gap-3 pt-8 text-sm font-medium leading-6 text-ink">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-cobalt text-white">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>
                  {pillar.proof}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <figure className="mx-auto mt-24 max-w-4xl text-center md:mt-32">
            <blockquote className="font-editorial text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[-0.02em] text-ink">
              “It’s not about the pixels,{" "}
              <em className="italic text-cobalt">it’s about the people.</em>”
            </blockquote>
            <figcaption className="mt-6 text-sm text-stone">
              David’s favourite saying, as remembered by Biljana Galapcheva,
              Senior Product Designer at Cognism
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-24 grid gap-10 md:mt-32 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>If you hire me</Eyebrow>
            <h3 className="type-title mt-5 text-ink">The first 90 days.</h3>
            <p className="mt-5 max-w-sm text-[15px] leading-7 text-stone">
              A new design leader should earn trust before changing things.
              This is the plan I bring, adapted to your team.
            </p>
          </Reveal>
          <ol className="grid gap-4 md:grid-cols-3 lg:col-span-8">
            {firstNinetyDays.map((phase, index) => (
              <Reveal
                key={phase.window}
                as="li"
                delay={index * 0.06}
                className="h-full rounded-2xl border border-ink/10 bg-paper p-6"
              >
                <p className="type-label text-cobalt">{phase.window}</p>
                <p className="mt-6 font-editorial text-2xl leading-tight text-ink">
                  {phase.title}
                </p>
                <p className="mt-3 text-sm leading-6 text-stone">{phase.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="mb-5 break-inside-avoid rounded-2xl border border-ink/10 bg-bone p-6 md:p-7">
      <blockquote className="text-[15px] leading-7 text-ink">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-5">
        <img
          src={testimonial.image}
          alt=""
          className="h-10 w-10 rounded-full object-cover grayscale"
          loading="lazy"
          width="40"
          height="40"
        />
        <div className="text-sm leading-5">
          <p className="font-medium text-ink">{testimonial.author}</p>
          <p className="text-stone">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

function References() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-36"
    >
      <Reveal>
        <Eyebrow index="03">References</Eyebrow>
        <h2 id="testimonials-title" className="type-section mt-6 max-w-4xl text-ink">
          What product, design and business leaders say.
        </h2>
      </Reveal>

      <Reveal>
        <figure className="relative mt-14 overflow-hidden rounded-[28px] bg-ink p-8 text-bone md:mt-20 md:p-14" data-surface="ink">
          <Quote
            className="absolute right-8 top-8 h-16 w-16 text-white/[0.06] md:h-24 md:w-24"
            aria-hidden="true"
          />
          <blockquote className="relative max-w-4xl font-editorial text-[clamp(1.625rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.01em]">
            “{featuredTestimonial.quote}”
          </blockquote>
          <figcaption className="relative mt-10 flex items-center gap-4">
            <img
              src={featuredTestimonial.image}
              alt=""
              className="h-14 w-14 rounded-full object-cover"
              loading="lazy"
              width="56"
              height="56"
            />
            <div className="leading-6">
              <p className="font-medium text-bone">{featuredTestimonial.author}</p>
              <p className="text-sm text-mist">
                {featuredTestimonial.role}, {featuredTestimonial.company} ·{" "}
                {featuredTestimonial.relationship}
              </p>
            </div>
          </figcaption>
        </figure>
      </Reveal>

      <div className="mt-6 columns-1 gap-5 md:columns-2 lg:columns-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.author} testimonial={testimonial} />
        ))}
      </div>

      <p className="mt-6 text-sm text-stone">
        More recommendations on{" "}
        <a
          href={profile.linkedinUrl}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
        >
          LinkedIn
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        .
      </p>
    </section>
  );
}

function AIPractice() {
  return (
    <section
      id="ai"
      data-surface="ink"
      aria-labelledby="ai-title"
      className="relative overflow-hidden bg-ink text-bone"
    >
      <div
        aria-hidden="true"
        className="glow absolute -right-80 -top-20 h-[52rem] w-[52rem] opacity-70"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-36">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow index="04" tone="ink">
                AI-native practice
              </Eyebrow>
              <h2 id="ai-title" className="type-section mt-6">
                AI in the workflow.{" "}
                <em className="italic text-periwinkle">Judgement</em> at the
                centre.
              </h2>
            </div>
            <p className="type-lede text-mist lg:col-span-5">
              I use AI to shorten the distance between insight and shipped
              product, with the governance a regulated business expects.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
          {aiPractice.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05} className="bg-ink-2">
              <div className="h-full p-7">
                <p className="type-label text-periwinkle">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-8 font-editorial text-[1.75rem] leading-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-mist">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <Link
            href="/case-study/ux-sidekick"
            className="group mt-6 flex flex-col overflow-hidden rounded-[28px] border border-white/10 bg-ink-2 transition hover:border-white/25 md:flex-row md:items-center"
          >
            <img
              src="/images/site/sidekick-markers.webp"
              alt="UX Sidekick placing numbered critique markers on a portfolio landing page"
              className="aspect-[16/10] w-full object-cover md:w-[42%]"
              loading="lazy"
              width="843"
              height="562"
            />
            <div className="flex flex-1 items-end justify-between gap-6 p-7 md:p-10">
              <div>
                <p className="type-label text-mist">Case study · 2025</p>
                <p className="mt-4 font-editorial text-3xl leading-tight md:text-4xl">
                  UX Sidekick: an AI design critic, designed and built end to end.
                </p>
              </div>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-bone text-ink transition group-hover:bg-periwinkle">
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Read the UX Sidekick case study</span>
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Writing() {
  const latest = writing.slice(0, 3);

  return (
    <section
      id="writing"
      aria-labelledby="writing-title"
      className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-36"
    >
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow index="05">Writing</Eyebrow>
            <h2 id="writing-title" className="type-section mt-6 text-ink">
              Thinking out loud on design, AI and leadership.
            </h2>
          </div>
          <p className="type-lede text-stone lg:col-span-5">
            {writing.length} essays published on LinkedIn since 2025, on where
            design value is moving and how teams should adapt.
          </p>
        </div>
      </Reveal>

      <ol className="mt-14 border-b border-ink/10 md:mt-20">
        {latest.map((entry, index) => (
          <Reveal key={entry.id} as="li" delay={index * 0.05}>
            <a
              href={entry.url}
              target="_blank"
              rel="noreferrer"
              className="group grid gap-4 border-t border-ink/10 py-8 transition md:grid-cols-12 md:gap-8"
            >
              <p className="type-label text-stone md:col-span-3">
                <time dateTime={entry.date}>{entry.displayDate}</time>
                <span className="mt-1 block text-cobalt">{entry.category}</span>
              </p>
              <div className="md:col-span-8">
                <h3 className="font-editorial text-[clamp(1.625rem,2.6vw,2.25rem)] leading-[1.08] text-ink decoration-ink/30 underline-offset-[6px] group-hover:underline">
                  {entry.title}
                </h3>
                <p className="mt-3 max-w-2xl text-[15px] leading-7 text-stone">
                  {entry.excerpt}
                </p>
                <p className="mt-4 text-sm text-stone">
                  {entry.readTime} min read on LinkedIn
                  <span className="sr-only"> (opens in a new tab)</span>
                </p>
              </div>
              <span className="hidden h-11 w-11 place-items-center justify-self-end rounded-full border border-ink/15 text-ink transition group-hover:border-ink group-hover:bg-ink group-hover:text-bone md:col-span-1 md:grid">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
          </Reveal>
        ))}
      </ol>

      <Reveal>
        <div className="mt-10">
          <ButtonLink href="/articles" variant="outline">
            Read all {writing.length} essays
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}

function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-36"
    >
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Eyebrow index="06">Experience</Eyebrow>
              <h2 id="experience-title" className="type-section mt-6 text-ink">
                Twenty years, one thread.
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-7 text-stone">
                I started in digital at BlackRock, moved into UX at HSBC and
                have spent the last decade leading design in banks, wealth
                managers and a SaaS scale-up. Outside work you’ll find me in
                Spain, behind a camera or at a Spanish film.
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <figure className="mt-10 overflow-hidden rounded-[24px] border border-ink/10 bg-bone">
                <img
                  src="/images/site/david-workshop.webp"
                  alt="David Phillip standing in front of a workshop wall covered in sticky notes"
                  className="aspect-[4/3] w-full object-cover object-[50%_22%]"
                  loading="lazy"
                  width="602"
                  height="932"
                />
                <figcaption className="flex items-center justify-between gap-4 px-5 py-4 text-sm text-stone">
                  <span>Mid-workshop, mapping a service end to end.</span>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="type-label mt-10 text-stone">Capabilities</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="rounded-full border border-ink/10 bg-bone px-3 py-1.5 text-[13px] text-ink"
                  >
                    {capability}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/cv" variant="ink">
                  Read the full CV
                </ButtonLink>
                <ButtonLink
                  href={profile.linkedinUrl}
                  variant="outline"
                  icon="external"
                >
                  LinkedIn
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>

        <ol className="lg:col-span-7" aria-label="Career history">
          {experience.map((entry, index) => (
            <Reveal
              key={`${entry.company}-${entry.period}`}
              as="li"
              delay={Math.min(index, 4) * 0.03}
              className="grid gap-2 border-t border-ink/10 py-7 sm:grid-cols-[8.5rem_1fr] sm:gap-6"
            >
                <p className="type-label pt-1.5 text-stone">{entry.period}</p>
                <div>
                  <h3 className="font-editorial text-[1.75rem] leading-tight text-ink">
                    {entry.role}
                  </h3>
                  <p className="mt-1 text-[15px] font-medium text-ink">
                    {entry.company}
                  </p>
                  <p className="mt-3 text-[15px] leading-7 text-stone">
                    {entry.summary}
                  </p>
                  {entry.caseStudy ? (
                    <Link
                      href={`/case-study/${entry.caseStudy}`}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cobalt hover:text-cobalt-deep"
                    >
                      Read the case study
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  ) : null}
                </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** The home page; /saas and /design-leadership render audience versions of it. */
export default function PortfolioV2() {
  const audience = useAudience();
  useDocumentMeta(audience.meta);
  useInitialScroll(audience.id);

  return (
    <SiteShell>
      <main id="main-content">
        <Hero audience={audience} />
        <SelectedWork audience={audience} />
        <Leadership audience={audience} />
        <References />
        <AIPractice />
        <Writing />
        <Experience />
        <ContactSection />
      </main>
    </SiteShell>
  );
}
