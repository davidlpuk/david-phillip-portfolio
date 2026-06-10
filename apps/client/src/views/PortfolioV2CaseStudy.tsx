import { FormEvent, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { Link, useParams } from "wouter";
import {
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

function isCaseStudySlug(slug: string | undefined): slug is CaseStudySlug {
  return Boolean(slug && caseStudyBySlug.has(slug as CaseStudySlug));
}

function PasswordPanel({
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
        "That password did not work. Check the invitation or request access.",
      );
      setPassword("");
    }

    setIsSubmitting(false);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
      <div className="grid overflow-hidden rounded-lg border border-[#11140f]/12 bg-white md:grid-cols-[0.44fr_0.56fr]">
        <div className="bg-[#11140f] p-6 text-[#f6f7f1] md:p-10">
          <div className="inline-flex items-center gap-2 rounded-md bg-[#d7ff38] px-3 py-2 text-xs font-semibold text-[#11140f]">
            <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
            Private case study
          </div>
          <h2 className="mt-8 text-4xl font-semibold leading-tight md:text-6xl">
            Detailed project evidence is protected.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#f6f7f1]/70">
            This work includes client and delivery context that should not be
            fully public. Enter the shared password or request access.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-10">
          <label
            htmlFor="case-study-password"
            className="text-sm font-semibold text-[#11140f]"
          >
            Password
          </label>
          <input
            id="case-study-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            autoComplete="current-password"
            className="mt-3 w-full rounded-md border border-[#11140f]/18 bg-[#f6f7f1] px-4 py-4 text-base text-[#11140f] outline-none focus:border-[#4b6bff]"
            placeholder="Enter password"
          />
          {error ? (
            <p className="mt-3 text-sm font-medium text-red-700" role="alert">
              {error}
            </p>
          ) : null}
          <button
            disabled={!password.trim() || isSubmitting}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#11140f] px-6 text-sm font-semibold text-[#f6f7f1] transition hover:bg-[#263027] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Checking..." : "Unlock case study"}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>

          <p className="mt-6 text-sm font-medium leading-6 text-[#5d675f]">
            No password?{" "}
            <a
              href={profile.calendlyUrl}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[#11140f] underline decoration-[#d7ff38] decoration-4 underline-offset-4"
            >
              Request a private walkthrough
            </a>
            .
          </p>
        </form>
      </div>
    </section>
  );
}

function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-6 grid gap-4 md:grid-cols-[0.32fr_0.68fr] md:items-end">
      <p className="text-xs font-semibold uppercase text-[#5d675f]">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold leading-tight text-[#11140f] md:text-5xl">
        {title}
      </h2>
    </div>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="border-t border-[#11140f]/12 py-10">
      <SectionTitle eyebrow="Case detail" title={title} />
      <div className="grid gap-px overflow-hidden rounded-lg border border-[#11140f]/12 bg-[#11140f]/12 md:grid-cols-3">
        {items.map((item) => (
          <div key={item} className="bg-white p-5">
            <p className="text-sm font-medium leading-6 text-[#5d675f]">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PublicPreview({ study }: { study: CaseStudyDetail }) {
  return (
    <section className="border-t border-[#11140f]/12 py-10">
      <SectionTitle eyebrow="At a glance" title="Problem, remit and impact." />
      <div className="grid gap-px overflow-hidden rounded-lg border border-[#11140f]/12 bg-[#11140f]/12 md:grid-cols-3">
        {[
          ["Problem", study.publicPreview.problem],
          ["Remit", study.publicPreview.remit],
          ["Impact", study.publicPreview.impact],
        ].map(([title, text]) => (
          <div key={title} className="bg-white p-5 md:p-6">
            <p className="text-xs font-semibold uppercase text-[#11140f]">
              {title}
            </p>
            <p className="mt-4 text-sm font-medium leading-6 text-[#5d675f]">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function StoryBlock({
  story,
}: {
  story: Array<{ title: string; text: string }>;
}) {
  return (
    <section className="border-t border-[#11140f]/12 py-10">
      <SectionTitle eyebrow="Narrative" title="The shape of the work." />
      <div className="grid gap-px overflow-hidden rounded-lg border border-[#11140f]/12 bg-[#11140f]/12 md:grid-cols-2">
        {story.map((item) => (
          <div key={item.title} className="bg-white p-5 md:p-6">
            <h2 className="text-xl font-semibold leading-tight text-[#11140f]">
              {item.title}
            </h2>
            <p className="mt-4 text-sm font-medium leading-6 text-[#5d675f]">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function VisualEvidence({ visuals }: { visuals: CaseStudyDetail["visuals"] }) {
  if (visuals.length === 0) return null;

  const [leadVisual, ...supportingVisuals] = visuals;

  return (
    <section className="border-t border-[#11140f]/12 py-10">
      <SectionTitle
        eyebrow="Visual evidence"
        title="Artefacts, diagrams and product detail."
      />

      <figure className="overflow-hidden rounded-lg border border-[#11140f]/12 bg-white">
        <div className="bg-[#11140f]">
          <img
            src={leadVisual.src}
            alt={leadVisual.title}
            className={`w-full object-cover ${
              leadVisual.variant === "tall"
                ? "aspect-[4/5]"
                : "aspect-[16/10] md:aspect-[16/7]"
            }`}
            loading="lazy"
          />
        </div>
        <figcaption className="grid gap-3 border-t border-[#11140f]/12 p-5 md:grid-cols-[16rem_1fr]">
          <span className="text-sm font-semibold text-[#11140f]">
            {leadVisual.title}
          </span>
          <span className="text-sm font-medium leading-6 text-[#5d675f]">
            {leadVisual.caption}
          </span>
        </figcaption>
      </figure>

      {supportingVisuals.length > 0 ? (
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {supportingVisuals.map((visual) => (
            <figure
              key={visual.src}
              className="overflow-hidden rounded-lg border border-[#11140f]/12 bg-white"
            >
              <div className="bg-[#11140f]">
                <img
                  src={visual.src}
                  alt={visual.title}
                  className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              <figcaption className="border-t border-[#11140f]/12 p-4">
                <p className="text-sm font-semibold text-[#11140f]">
                  {visual.title}
                </p>
                <p className="mt-2 text-xs font-medium leading-5 text-[#5d675f]">
                  {visual.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default function PortfolioV2CaseStudy() {
  const params = useParams();
  const slug = params.slug;
  const study = isCaseStudySlug(slug) ? caseStudyBySlug.get(slug) : undefined;
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (study && (!study.protected || isUnlocked(study.slug))) {
      setUnlocked(true);
    }
  }, [study]);

  if (!study) {
    return (
      <div className="min-h-screen bg-[#f6f7f1] px-4 py-16 text-[#11140f]">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase text-[#5d675f]">
            Not found
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">
            Case study not found.
          </h1>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 font-semibold underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Return to portfolio v2
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f7f1] text-[#11140f]">
      <header className="sticky top-0 z-40 border-b border-[#11140f]/12 bg-[#f6f7f1]/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Case studies
          </Link>
          <a
            href={profile.calendlyUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Contact
          </a>
        </nav>
      </header>

      <main>
        <section className="border-b border-[#11140f]/12 bg-[#11140f] text-[#f6f7f1]">
          <div className="mx-auto grid max-w-7xl gap-px bg-[#f6f7f1]/12 md:grid-cols-[0.5fr_0.5fr]">
            <div className="flex min-h-[34rem] flex-col justify-end bg-[#11140f] px-4 py-10 md:px-8 md:py-14">
              <p className="text-sm font-semibold text-[#d7ff38]">
                {study.company} / {study.sector}
              </p>
              <h1 className="mt-5 text-5xl font-semibold leading-none md:text-7xl">
                {study.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-[#f6f7f1]/72">
                {study.summary}
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-[#f6f7f1]/16">
                <div className="bg-[#171b14] p-4">
                  <dt className="text-xs font-semibold uppercase text-[#f6f7f1]/52">
                    Role
                  </dt>
                  <dd className="mt-2 text-sm font-semibold">{study.role}</dd>
                </div>
                <div className="bg-[#171b14] p-4">
                  <dt className="text-xs font-semibold uppercase text-[#f6f7f1]/52">
                    Period
                  </dt>
                  <dd className="mt-2 text-sm font-semibold">{study.period}</dd>
                </div>
              </dl>
            </div>

            <div className="relative min-h-[28rem] overflow-hidden bg-[#11140f]">
              <img
                src={study.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-92"
                width="1000"
                height="760"
              />
              <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 gap-px bg-[#11140f]/32 p-4 backdrop-blur-md">
                {study.proof.slice(0, 3).map((point) => (
                  <div key={point.label} className="rounded-md bg-[#f6f7f1] p-3">
                    <p className="text-lg font-semibold text-[#11140f]">
                      {point.value}
                    </p>
                    <p className="mt-1 text-xs font-medium leading-4 text-[#5d675f]">
                      {point.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {study.protected && !unlocked ? (
          <>
            <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
              <section className="grid gap-8 border-b border-[#11140f]/12 pb-10 md:grid-cols-[0.35fr_0.65fr]">
                <div>
                  <p className="text-xs font-semibold uppercase text-[#5d675f]">
                    Public preview
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {study.focus.map((item) => (
                      <span
                        key={item}
                        className="rounded-md bg-[#11140f] px-3 py-2 text-xs font-semibold text-[#f6f7f1]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-2xl font-medium leading-snug text-[#11140f] md:text-4xl">
                  {study.context}
                </p>
              </section>
              <PublicPreview study={study} />
              <VisualEvidence visuals={study.visuals} />
              <StoryBlock story={study.story} />
              <ListBlock
                title="Key leadership decisions."
                items={study.leadershipDecisions}
              />
            </div>
            <PasswordPanel study={study} onUnlock={() => setUnlocked(true)} />
          </>
        ) : (
          <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
            <section className="grid gap-8 border-b border-[#11140f]/12 pb-10 md:grid-cols-[0.35fr_0.65fr]">
              <div>
                <p className="text-xs font-semibold uppercase text-[#5d675f]">
                  Context
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {study.focus.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-[#11140f] px-3 py-2 text-xs font-semibold text-[#f6f7f1]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-2xl font-medium leading-snug text-[#11140f] md:text-4xl">
                {study.context}
              </p>
            </section>

            <PublicPreview study={study} />
            <VisualEvidence visuals={study.visuals} />
            <StoryBlock story={study.story} />
            <ListBlock
              title="Key leadership decisions."
              items={study.leadershipDecisions}
            />
            <ListBlock title="Challenge." items={study.challenge} />
            <ListBlock title="What I did." items={study.actions} />
            <ListBlock title="Outcomes." items={study.outcomes} />
            <ListBlock title="Lessons." items={study.lessons} />
            <section className="mt-8 grid grid-cols-[auto_1fr] gap-4 rounded-lg border border-[#11140f]/12 bg-white p-6">
              <ShieldCheck className="mt-1 h-5 w-5 text-[#4b6bff]" aria-hidden="true" />
              <p className="text-sm font-medium leading-6 text-[#5d675f]">
                Some project details are intentionally summarised publicly
                because the work involved commercial, client or
                delivery-sensitive information. I can provide deeper context in
                a private walkthrough.
              </p>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
