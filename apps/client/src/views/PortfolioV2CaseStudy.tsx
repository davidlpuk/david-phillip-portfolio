import { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import {
  caseStudyBySlug,
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
        "That password did not work. Check the invitation or ask David for access.",
      );
      setPassword("");
    }

    setIsSubmitting(false);
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-20">
      <div className="rounded-[2rem] border border-[#07110d]/10 bg-white p-6 shadow-[0_24px_80px_rgba(7,17,13,0.08)] md:p-10">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#526358]">
          Private case study
        </p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-[#07110d] md:text-5xl">
          Detailed project evidence is protected.
        </h2>
        <p className="mt-4 text-base font-medium leading-7 text-[#526358]">
          This work includes client and delivery context that should not be
          fully public. Enter the shared password or request access from David.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label htmlFor="case-study-password" className="text-sm font-bold">
            Password
          </label>
          <input
            id="case-study-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            autoComplete="current-password"
            className="w-full rounded-2xl border border-[#07110d]/15 bg-[#eef2ee] px-4 py-4 text-base outline-none focus:border-[#07110d]"
            placeholder="Enter password"
          />
          {error ? (
            <p className="text-sm font-medium text-red-700" role="alert">
              {error}
            </p>
          ) : null}
          <button
            disabled={!password.trim() || isSubmitting}
            className="w-full rounded-full bg-[#07110d] px-6 py-4 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Checking..." : "Unlock case study"}
          </button>
        </form>

        <p className="mt-6 text-sm font-medium leading-6 text-[#526358]">
          No password?{" "}
          <a
            href="mailto:david.phillip@gmail.com?subject=Portfolio case study access"
            className="font-black text-[#07110d] underline decoration-[#d9ff40] decoration-4 underline-offset-4"
          >
            Request a private walkthrough
          </a>
          .
        </p>
      </div>
    </section>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="border-t border-[#07110d]/10 py-8">
      <h2 className="text-3xl font-black tracking-[-0.05em] text-[#07110d]">
        {title}
      </h2>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-2xl border border-[#07110d]/5 bg-white p-4 text-sm font-medium leading-6 text-[#526358] shadow-sm"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function StoryBlock({
  story,
}: {
  story: Array<{ title: string; text: string }>;
}) {
  return (
    <section className="grid gap-3 border-t border-[#07110d]/10 py-8 md:grid-cols-2">
      {story.map((item) => (
        <article
          key={item.title}
          className="rounded-[1.5rem] border border-[#07110d]/5 bg-white p-5 shadow-sm"
        >
          <h2 className="text-xl font-black tracking-[-0.04em] text-[#07110d]">
            {item.title}
          </h2>
          <p className="mt-3 text-sm font-medium leading-6 text-[#526358]">
            {item.text}
          </p>
        </article>
      ))}
    </section>
  );
}

function VisualEvidence({ visuals }: { visuals: CaseStudyDetail["visuals"] }) {
  if (visuals.length === 0) return null;

  const [leadVisual, ...supportingVisuals] = visuals;

  return (
    <section className="border-t border-[#07110d]/10 py-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#526358]">
            Visual evidence
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] text-[#07110d]">
            Artefacts, diagrams and product details
          </h2>
        </div>
      </div>

      <figure className="overflow-hidden rounded-[2rem] border border-[#07110d]/10 bg-white p-3 shadow-[0_24px_80px_rgba(7,17,13,0.08)]">
        <div className="overflow-hidden rounded-[1.4rem] bg-[#07110d]">
          <img
            src={leadVisual.src}
            alt={leadVisual.title}
            className={`w-full object-cover ${
              leadVisual.variant === "tall"
                ? "aspect-[4/5]"
                : "aspect-[16/10] md:aspect-[16/8]"
            }`}
            loading="lazy"
          />
        </div>
        <figcaption className="grid gap-2 p-3 md:grid-cols-[16rem_1fr] md:p-4">
          <span className="text-sm font-black text-[#07110d]">
            {leadVisual.title}
          </span>
          <span className="text-sm font-medium leading-6 text-[#526358]">
            {leadVisual.caption}
          </span>
        </figcaption>
      </figure>

      {supportingVisuals.length > 0 ? (
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {supportingVisuals.map((visual) => (
            <figure
              key={visual.src}
              className="overflow-hidden rounded-[1.5rem] border border-[#07110d]/10 bg-white p-2 shadow-sm"
            >
              <div className="overflow-hidden rounded-[1.1rem] bg-[#07110d]">
                <img
                  src={visual.src}
                  alt={visual.title}
                  className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <figcaption className="p-3">
                <p className="text-sm font-black text-[#07110d]">
                  {visual.title}
                </p>
                <p className="mt-2 text-xs font-medium leading-5 text-[#526358]">
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
      <div className="min-h-screen bg-[#eef2ee] px-4 py-16 text-[#07110d]">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#526358]">
            Not found
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.05em]">
            Case study not found.
          </h1>
          <Link
            href="/portfolio-v2"
            className="mt-8 inline-block font-bold underline"
          >
            Return to portfolio v2
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eef2ee] text-[#07110d]">
      <header className="sticky top-0 z-40 border-b border-[#07110d]/10 bg-[#eef2ee]/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <Link href="/portfolio-v2" className="text-sm font-bold">
            ← Case studies
          </Link>
          <a
            href="mailto:david.phillip@gmail.com"
            className="text-sm font-bold"
          >
            Contact
          </a>
        </nav>
      </header>

      <main className="bg-[radial-gradient(circle_at_80%_0%,rgba(217,255,64,0.32),transparent_30rem)]">
        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[0.95fr_1.05fr] md:px-8 md:py-16">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#526358]">
              {study.company} · {study.sector}
            </p>
            <h1 className="mt-4 text-5xl font-black leading-[0.9] tracking-[-0.07em] md:text-7xl">
              {study.title}
            </h1>
            <p className="mt-5 text-lg font-medium leading-8 text-[#526358]">
              {study.summary}
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-[#07110d]/5 bg-white p-4 shadow-sm">
                <dt className="text-xs font-black uppercase tracking-[0.18em] text-[#526358]">
                  Role
                </dt>
                <dd className="mt-2 text-sm font-black">{study.role}</dd>
              </div>
              <div className="rounded-2xl border border-[#07110d]/5 bg-white p-4 shadow-sm">
                <dt className="text-xs font-black uppercase tracking-[0.18em] text-[#526358]">
                  Period
                </dt>
                <dd className="mt-2 text-sm font-black">{study.period}</dd>
              </div>
            </dl>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-[#07110d]/10 bg-white p-3 shadow-[0_24px_80px_rgba(7,17,13,0.1)]">
            <img
              src={study.image}
              alt=""
              className="aspect-[4/3] w-full rounded-[1.4rem] object-cover"
              width="900"
              height="675"
            />
            <div className="grid grid-cols-3 gap-2 pt-3">
              {study.proof.slice(0, 3).map((point) => (
                <div
                  key={point.label}
                  className="rounded-2xl border border-[#07110d]/5 bg-[#eef2ee] p-3"
                >
                  <p className="text-lg font-black tracking-[-0.04em]">
                    {point.value}
                  </p>
                  <p className="mt-1 text-[11px] font-semibold leading-4 text-[#526358]">
                    {point.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {study.protected && !unlocked ? (
          <>
            <article className="mx-auto max-w-4xl px-4 md:px-8">
              <section className="rounded-[2rem] bg-[#07110d] p-6 text-white md:p-10">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#d9ff40]">
                  Public preview
                </p>
                <p className="mt-4 text-xl font-semibold leading-8 tracking-[-0.02em] text-white/82 md:text-2xl">
                  {study.context}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {study.focus.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs font-black"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </section>
              <VisualEvidence visuals={study.visuals} />
              <StoryBlock story={study.story} />
            </article>
            <PasswordPanel study={study} onUnlock={() => setUnlocked(true)} />
          </>
        ) : (
          <article className="mx-auto max-w-4xl px-4 pb-20 md:px-8">
            <section className="rounded-[2rem] bg-[#07110d] p-6 text-white md:p-10">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#d9ff40]">
                Context
              </p>
              <p className="mt-4 text-xl font-semibold leading-8 tracking-[-0.02em] text-white/82 md:text-2xl">
                {study.context}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {study.focus.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs font-black"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>

            <VisualEvidence visuals={study.visuals} />
            <StoryBlock story={study.story} />
            <ListBlock title="Challenge" items={study.challenge} />
            <ListBlock title="What David Did" items={study.actions} />
            <ListBlock title="Outcomes" items={study.outcomes} />
            <ListBlock title="Lessons" items={study.lessons} />
            <section className="mt-8 rounded-[2rem] border border-[#07110d]/10 bg-white p-6 text-sm font-medium leading-6 text-[#526358]">
              Some project details are intentionally summarised publicly because
              the work involved commercial, client or delivery-sensitive
              information. I can provide deeper context in a private
              walkthrough.
            </section>
          </article>
        )}
      </main>
    </div>
  );
}
