import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  LockKeyhole,
  Maximize2,
  ShieldCheck,
  X,
} from "lucide-react";
import { Link, useParams } from "wouter";
import {
  caseStudies,
  caseStudyBySlug,
  profile,
  type CaseStudyDetail,
  type CaseStudySlug,
} from "@/rebuild/portfolioData";
import {
  isUnlocked,
  rememberUnlock,
  verifyCaseStudyPassword,
} from "@/rebuild/password";
import {
  ButtonLink,
  ContactSection,
  Eyebrow,
  Reveal,
  SiteShell,
  useDocumentMeta,
  useInitialScroll,
} from "@/rebuild/site";

function isCaseStudySlug(slug: string | undefined): slug is CaseStudySlug {
  return Boolean(slug && caseStudyBySlug.has(slug as CaseStudySlug));
}

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="no-print fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-cobalt"
      style={{ scaleX }}
    />
  );
}

function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function CaseHero({
  study,
  index,
}: {
  study: CaseStudyDetail;
  index: number;
}) {
  const facts = [
    ["Role", study.role],
    ["Timeline", study.period],
    ["Team", study.team],
    ["Scope", study.scope],
  ];

  return (
    <header className="mx-auto max-w-6xl px-5 pt-28 md:px-8 md:pt-36">
      <div className="hero-rise">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm font-medium text-stone hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All work
        </Link>
        <div className="mt-10">
          <Eyebrow index={`${String(index + 1).padStart(2, "0")} / ${String(caseStudies.length).padStart(2, "0")}`}>
            {study.company} · {study.sector}
          </Eyebrow>
        </div>
        <h1 className="type-hero mt-6 max-w-5xl text-[clamp(2.75rem,6vw,5.5rem)] text-ink">
          {study.title}
        </h1>
        <p className="type-lede mt-8 max-w-3xl text-stone">{study.summary}</p>
      </div>

      <div className="hero-rise">
        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 lg:grid-cols-4">
          {facts.map(([label, value]) => (
            <div key={label} className="bg-paper p-5">
              <dt className="type-label text-stone">{label}</dt>
              <dd className="mt-2 text-[15px] font-medium leading-6 text-ink">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <figure className="mt-6 overflow-hidden rounded-[28px] border border-ink/10 bg-paper-2">
          <img
            src={study.image}
            srcSet={
              study.imageSmall
                ? `${study.imageSmall} 800w, ${study.image} 1600w`
                : undefined
            }
            sizes="(min-width: 1152px) 1152px, 100vw"
            alt={study.imageAlt}
            className="aspect-[4/3] w-full object-cover md:aspect-[16/8]"
            style={{ objectPosition: study.imageFocus }}
            width="1600"
            height="1067"
            fetchPriority="high"
          />
        </figure>
      </div>

      <Reveal delay={0.05}>
        <dl
          className={`mt-6 grid gap-px overflow-hidden rounded-2xl bg-ink text-bone ${
            study.proof.length > 3 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3"
          }`}
          data-surface="ink"
        >
          {study.proof.map((point) => (
            <div key={point.label} className="border-white/10 p-6 md:p-8 [&:not(:first-child)]:border-t sm:[&:not(:first-child)]:border-t-0 sm:[&:not(:first-child)]:border-l">
              <dt className="sr-only">{point.label}</dt>
              <dd>
                <span className="type-metric block">{point.value}</span>
                <span className="mt-3 block text-sm leading-5 text-mist">
                  {point.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </header>
  );
}

function SectionBlock({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="border-t border-ink/10 py-14 first:border-t-0 first:pt-0 md:py-20"
    >
      <Reveal>
        <p className="type-label text-cobalt">{label}</p>
        <h2
          id={`${id}-title`}
          className="type-title mt-4 max-w-2xl text-ink"
        >
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </Reveal>
    </section>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10">
      {items.map((item, index) => (
        <li key={item} className="grid grid-cols-[2.5rem_1fr] gap-3 bg-bone p-5 md:p-6">
          <span className="type-label pt-1 text-cobalt">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-[15px] leading-7 text-ink">{item}</span>
        </li>
      ))}
    </ol>
  );
}

function Gallery({ study }: { study: CaseStudyDetail }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const visuals = study.visuals;
  const current = openIndex === null ? null : visuals[openIndex];

  function step(delta: number) {
    setOpenIndex((value) =>
      value === null ? value : (value + delta + visuals.length) % visuals.length,
    );
  }

  return (
    <>
      <div className="grid items-start gap-x-4 gap-y-8 sm:grid-cols-2">
        {visuals.map((visual, index) => {
          const fullWidth =
            index === 0 || (index === visuals.length - 1 && visuals.length % 2 === 0);
          return (
            <figure
              key={visual.src}
              className={fullWidth ? "sm:col-span-2" : undefined}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="group relative block w-full overflow-hidden rounded-2xl border border-ink/10 bg-bone text-left"
                aria-label={`Enlarge image: ${visual.title}`}
              >
                <img
                  src={visual.src}
                  alt={visual.title}
                  width={visual.width}
                  height={visual.height}
                  className="h-auto w-full transition duration-500 group-hover:scale-[1.015]"
                  loading="lazy"
                />
                <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-ink/70 text-bone opacity-0 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Maximize2 className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
              <figcaption className="mt-3 text-sm leading-6">
                <span className="font-medium text-ink">{visual.title}.</span>{" "}
                <span className="text-stone">{visual.caption}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <Dialog.Root
        open={openIndex !== null}
        onOpenChange={(open) => !open && setOpenIndex(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <Dialog.Content
            data-surface="ink"
            className="dp fixed inset-0 z-50 flex flex-col p-4 text-bone md:p-8"
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") step(1);
              if (event.key === "ArrowLeft") step(-1);
            }}
          >
            <div className="flex items-center justify-between gap-4">
              <Dialog.Title className="type-label text-mist">
                {openIndex !== null ? `${openIndex + 1} / ${visuals.length}` : ""} ·{" "}
                {current?.title}
              </Dialog.Title>
              <Dialog.Close
                className="grid h-11 w-11 place-items-center rounded-full border border-white/20 hover:border-white/50"
                aria-label="Close image"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </Dialog.Close>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center py-4">
              {current ? (
                <img
                  src={current.src}
                  alt={current.title}
                  className="max-h-full max-w-full rounded-xl object-contain"
                />
              ) : null}
            </div>
            <div className="flex items-center justify-between gap-4">
              <Dialog.Description className="max-w-2xl text-sm leading-6 text-mist">
                {current?.caption}
              </Dialog.Description>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/20 hover:border-white/50"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/20 hover:border-white/50"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

function PasswordGate({
  study,
  onUnlock,
}: {
  study: CaseStudyDetail;
  onUnlock: () => void;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const valid = await verifyCaseStudyPassword(study.slug, password);
    if (valid) {
      rememberUnlock(study.slug);
      onUnlock();
    } else {
      setError(
        "That password didn’t work. Check your invitation, or ask me for access.",
      );
      setPassword("");
    }

    setIsSubmitting(false);
  }

  const accessEmail = `mailto:${profile.email}?subject=${encodeURIComponent(
    `Access to the ${study.company} case study`,
  )}`;

  return (
    <section
      id="full-story"
      aria-labelledby="full-story-title"
      data-surface="ink"
      className="overflow-hidden rounded-[28px] bg-ink text-bone"
    >
      <div className="grid md:grid-cols-2">
        <div className="relative p-7 md:p-10">
          <div
            aria-hidden="true"
            className="glow absolute -left-40 -top-40 h-[28rem] w-[28rem]"
          />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium">
              <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
              Private section
            </span>
            <h2
              id="full-story-title"
              className="type-title mt-8 text-bone"
            >
              The full story is shared privately.
            </h2>
            <p className="mt-5 text-[15px] leading-7 text-mist">
              The challenge, what I did, the outcomes and lessons include
              client-confidential detail. Enter the password from your
              invitation, or ask me for access.
            </p>
            <ul className="mt-6 grid gap-2 text-sm text-bone">
              {["The challenge", "What I did", "Outcomes", "What I learned"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-periwinkle" aria-hidden="true" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-t border-white/10 bg-ink-2 p-7 md:border-l md:border-t-0 md:p-10"
        >
          <label
            htmlFor="case-study-password"
            className="text-sm font-medium text-bone"
          >
            Password
          </label>
          <input
            id="case-study-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            autoComplete="current-password"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "case-study-password-error" : undefined}
            className="mt-3 h-12 w-full rounded-xl border border-white/15 bg-ink px-4 text-base text-bone placeholder:text-mist/70 focus:border-periwinkle"
            placeholder="Enter password"
          />
          {error ? (
            <p
              id="case-study-password-error"
              className="mt-3 text-sm text-[#ff9b9b]"
              role="alert"
            >
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={!password.trim() || isSubmitting}
            className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-bone text-[15px] font-medium text-ink transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Checking…" : "Unlock the full story"}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="mt-8 border-t border-white/10 pt-6 text-sm leading-6 text-mist">
            <p>No password?</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              <a
                href={profile.calendlyUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-bone underline decoration-white/30 underline-offset-4 hover:decoration-white"
              >
                Book a walkthrough
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a
                href={accessEmail}
                className="font-medium text-bone underline decoration-white/30 underline-offset-4 hover:decoration-white"
              >
                Email me for access
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function NextStudy({ study }: { study: CaseStudyDetail }) {
  return (
    <section
      aria-label="Next case study"
      className="mx-auto max-w-6xl px-5 pb-24 md:px-8 md:pb-32"
    >
      <Reveal>
        <Link
          href={`/case-study/${study.slug}`}
          className="group grid overflow-hidden rounded-[28px] border border-ink/10 bg-bone transition hover:border-ink/25 md:grid-cols-2"
        >
          <div className="flex flex-col justify-between gap-10 p-7 md:p-10">
            <p className="type-label text-stone">Next case study</p>
            <div>
              <p className="type-label text-cobalt">
                {study.company} · {study.period}
              </p>
              <p className="type-title mt-4 text-ink">{study.title}</p>
              <p className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-ink">
                Read the case study
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </p>
            </div>
          </div>
          <div className="relative min-h-64 overflow-hidden bg-paper-2">
            <img
              src={study.image}
              srcSet={
                study.imageSmall
                  ? `${study.imageSmall} 800w, ${study.image} 1600w`
                  : undefined
              }
              sizes="(min-width: 768px) 50vw, 100vw"
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              style={{ objectPosition: study.imageFocus }}
              loading="lazy"
            />
          </div>
        </Link>
      </Reveal>
    </section>
  );
}

function NotFoundStudy() {
  return (
    <main id="main-content" className="mx-auto max-w-3xl px-5 pb-32 pt-40 md:px-8">
      <Eyebrow>Not found</Eyebrow>
      <h1 className="type-section mt-6 text-ink">That case study doesn’t exist.</h1>
      <p className="type-lede mt-6 text-stone">
        It may have moved. All current work is on the home page.
      </p>
      <div className="mt-10">
        <ButtonLink href="/#work" variant="ink">
          See all work
        </ButtonLink>
      </div>
    </main>
  );
}

export default function PortfolioV2CaseStudy() {
  const params = useParams();
  const slug = params.slug;
  const study = isCaseStudySlug(slug) ? caseStudyBySlug.get(slug) : undefined;
  const [unlocked, setUnlocked] = useState(false);

  useDocumentMeta(
    study
      ? `${study.company}: ${study.title} · David Phillip`
      : "Case study not found · David Phillip",
    study?.summary,
  );
  useInitialScroll(slug);

  useEffect(() => {
    setUnlocked(Boolean(study && (!study.protected || isUnlocked(study.slug))));
  }, [study]);

  const locked = Boolean(study?.protected && !unlocked);
  const toc = useMemo(
    () =>
      [
        { id: "overview", label: "Overview" },
        { id: "story", label: "The story" },
        { id: "evidence", label: "Visual evidence" },
        { id: "decisions", label: "Key decisions" },
        ...(locked
          ? [{ id: "full-story", label: "Full story (private)" }]
          : [
              { id: "challenge", label: "The challenge" },
              { id: "actions", label: "What I did" },
              { id: "outcomes", label: "Outcomes" },
              { id: "lessons", label: "What I learned" },
            ]),
      ],
    [locked],
  );
  const tocIds = useMemo(() => toc.map((item) => item.id), [toc]);
  const activeHeading = useActiveHeading(tocIds);

  if (!study) {
    return (
      <SiteShell>
        <NotFoundStudy />
      </SiteShell>
    );
  }

  const index = caseStudies.findIndex((item) => item.slug === study.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <SiteShell>
      <ReadingProgress />
      <main id="main-content">
        <CaseHero study={study} index={index} />

        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-12">
          <aside className="no-print hidden lg:col-span-3 lg:block">
            <nav aria-label="On this page" className="sticky top-28">
              <p className="type-label text-stone">On this page</p>
              <ul className="mt-5 grid gap-1 border-l border-ink/10">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={activeHeading === item.id ? "true" : undefined}
                      className={`-ml-px block border-l py-1.5 pl-4 text-sm transition ${
                        activeHeading === item.id
                          ? "border-cobalt font-medium text-ink"
                          : "border-transparent text-stone hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-10 rounded-2xl border border-ink/10 bg-bone p-5">
                <p className="font-editorial text-xl leading-tight text-ink">
                  Want the detail behind this work?
                </p>
                <p className="mt-2 text-sm leading-6 text-stone">
                  I’m happy to walk through it on a call.
                </p>
                <ButtonLink
                  href={profile.calendlyUrl}
                  size="sm"
                  icon="external"
                  className="mt-4 w-full"
                >
                  Book a walkthrough
                </ButtonLink>
              </div>
            </nav>
          </aside>

          <article className="min-w-0 lg:col-span-9 lg:pl-6">
            <SectionBlock id="overview" label="Overview" title="The context.">
              <p className="font-editorial text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.25] text-ink">
                {study.context}
              </p>
              <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10">
                {(
                  [
                    ["Problem", study.publicPreview.problem],
                    ["My remit", study.publicPreview.remit],
                    ["Impact", study.publicPreview.impact],
                  ] as const
                ).map(([label, text]) => (
                  <div
                    key={label}
                    className="grid gap-2 bg-bone p-5 md:grid-cols-[9rem_1fr] md:gap-6 md:p-6"
                  >
                    <dt className="type-label pt-1 text-stone">{label}</dt>
                    <dd className="text-[15px] leading-7 text-ink">{text}</dd>
                  </div>
                ))}
              </dl>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Focus areas">
                {study.focus.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-ink/10 bg-bone px-3 py-1.5 text-[13px] text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </SectionBlock>

            <SectionBlock id="story" label="The story" title="How the work unfolded.">
              <ol className="grid gap-10">
                {study.story.map((item, itemIndex) => (
                  <li key={item.title} className="grid gap-3 md:grid-cols-[3rem_1fr]">
                    <span className="type-label pt-2 text-cobalt">
                      {String(itemIndex + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-editorial text-[1.75rem] leading-tight text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-base leading-7 text-stone">
                        {item.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </SectionBlock>

            <SectionBlock
              id="evidence"
              label="Visual evidence"
              title="Artefacts from the work."
            >
              <Gallery study={study} />
            </SectionBlock>

            <SectionBlock
              id="decisions"
              label="Key decisions"
              title="The calls that shaped the outcome."
            >
              <NumberedList items={study.leadershipDecisions} />
            </SectionBlock>

            {locked ? (
              <div className="border-t border-ink/10 pt-14 md:pt-20">
                <PasswordGate study={study} onUnlock={() => setUnlocked(true)} />
              </div>
            ) : (
              <>
                <SectionBlock
                  id="challenge"
                  label="The challenge"
                  title="What made this hard."
                >
                  <NumberedList items={study.challenge} />
                </SectionBlock>
                <SectionBlock id="actions" label="What I did" title="The work itself.">
                  <NumberedList items={study.actions} />
                </SectionBlock>
                <SectionBlock id="outcomes" label="Outcomes" title="What changed.">
                  <ul className="grid gap-3">
                    {study.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="flex items-start gap-4 rounded-2xl bg-ink p-5 text-bone md:p-6"
                        data-surface="ink"
                      >
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cobalt">
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                        <span className="text-base leading-7">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </SectionBlock>
                <SectionBlock
                  id="lessons"
                  label="What I learned"
                  title="What I’d take into the next role."
                >
                  <ul className="grid gap-4 md:grid-cols-3">
                    {study.lessons.map((lesson) => (
                      <li
                        key={lesson}
                        className="rounded-2xl border border-ink/10 bg-bone p-6 font-editorial text-xl leading-snug text-ink"
                      >
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </SectionBlock>
              </>
            )}

            {study.protected ? (
              <p className="mt-10 flex items-start gap-3 rounded-2xl border border-ink/10 bg-bone p-5 text-sm leading-6 text-stone">
                <ShieldCheck
                  className="mt-0.5 h-5 w-5 shrink-0 text-cobalt"
                  aria-hidden="true"
                />
                Some details are summarised because the work involved
                commercial, client or delivery-sensitive information. I can go
                deeper in a private walkthrough.
              </p>
            ) : null}
          </article>
        </div>

        <NextStudy study={next} />
        <ContactSection compact />
      </main>
    </SiteShell>
  );
}
