import { Link } from "wouter";
import {
  capabilityHighlights,
  caseStudies,
  credibilitySignals,
  principles,
  profile,
  services,
} from "@/rebuild/portfolioData";

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
    <div className="mb-8 md:mb-12">
      <p
        className={`mb-4 text-xs font-black uppercase tracking-[0.28em] ${
          invert ? "text-[#d9ff40]" : "text-[#526358]"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`max-w-4xl text-4xl font-black leading-[0.96] tracking-[-0.055em] md:text-6xl ${
          invert ? "text-white" : "text-[#07110d]"
        }`}
      >
        {title}
      </h2>
      {text ? (
        <p
          className={`mt-5 max-w-2xl text-base leading-7 md:text-lg ${
            invert ? "text-white/68" : "text-[#526358]"
          }`}
        >
          {text}
        </p>
      ) : null}
    </div>
  );
}

export default function PortfolioV2() {
  return (
    <div className="min-h-screen bg-[#eef2ee] text-[#07110d]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[#d9ff40] focus:px-5 focus:py-3 focus:text-sm focus:font-black focus:text-[#07110d]"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-[#07110d]/10 bg-[#eef2ee]/85 backdrop-blur-2xl">
        <nav
          aria-label="Portfolio v2 navigation"
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8"
        >
          <Link href="/portfolio-v2" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#07110d] text-xs font-black text-[#d9ff40]">
              DP
            </span>
            <span className="hidden text-sm font-black uppercase tracking-[0.2em] sm:inline">
              David Phillip
            </span>
          </Link>
          <div className="flex items-center gap-3 text-sm font-bold text-[#526358]">
            <a href="#work" className="hidden hover:text-[#07110d] sm:inline">
              Work
            </a>
            <a
              href="#principles"
              className="hidden hover:text-[#07110d] sm:inline"
            >
              Principles
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full bg-[#07110d] px-4 py-2 text-white transition hover:bg-[#14231b]"
            >
              Contact
            </a>
          </div>
        </nav>
      </header>

      <main id="main">
        <section className="relative overflow-hidden bg-[#07110d] text-white">
          <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(217,255,64,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(217,255,64,0.12)_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-[#d9ff40]/25 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-56 w-full bg-gradient-to-t from-[#07110d] to-transparent" />

          <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.15fr_0.85fr] md:px-8 md:py-20">
            <div className="flex min-h-[66vh] flex-col justify-between gap-10">
              <div>
                <div className="mb-7 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-white/75">
                    {profile.location}
                  </span>
                  <span className="rounded-full bg-[#d9ff40] px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-[#07110d]">
                    Platform Design Lead
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-white/75">
                    Financial services
                  </span>
                </div>

                <h1 className="max-w-5xl text-6xl font-black leading-[0.86] tracking-[-0.08em] text-white sm:text-7xl md:text-8xl lg:text-9xl">
                  {profile.headline}
                </h1>
                <p className="mt-8 max-w-2xl text-xl leading-8 text-white/72 md:text-2xl md:leading-9">
                  {profile.intro}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-[auto_1fr] md:items-end">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#work"
                    className="rounded-full bg-[#d9ff40] px-6 py-4 text-center text-sm font-black text-[#07110d] shadow-[0_20px_70px_rgba(217,255,64,0.24)] transition hover:scale-[1.02]"
                  >
                    View case studies
                  </a>
                  <a
                    href="/cv"
                    className="rounded-full border border-white/20 px-6 py-4 text-center text-sm font-black text-white transition hover:border-[#d9ff40] hover:text-[#d9ff40]"
                  >
                    View CV
                  </a>
                </div>
                <p className="max-w-md text-sm font-semibold leading-6 text-white/55 md:justify-self-end md:text-right">
                  {profile.availability}
                </p>
              </div>
            </div>

            <aside className="grid content-between gap-4">
              <div className="overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.06] p-3 shadow-[0_34px_110px_rgba(0,0,0,0.42)] backdrop-blur">
                <div className="relative overflow-hidden rounded-[1.4rem]">
                  <img
                    src="/images/hero-image.png"
                    alt="David Phillip"
                    className="aspect-[4/4.7] w-full object-cover object-top saturate-[0.85]"
                    width="640"
                    height="760"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07110d] via-[#07110d]/55 to-transparent p-5 pt-20">
                    <p className="text-2xl font-black tracking-[-0.05em]">
                      {profile.name}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white/62">
                      {profile.title}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {profile.proof.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-white/12 bg-white/[0.07] p-5 backdrop-blur"
                  >
                    <p className="text-3xl font-black tracking-[-0.06em] text-[#d9ff40]">
                      {item.value}
                    </p>
                    <p className="mt-2 text-xs font-semibold leading-5 text-white/62">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="border-y border-[#07110d]/10 bg-[#d9ff40] py-4">
          <div className="mx-auto flex max-w-7xl items-center gap-7 overflow-x-auto px-4 md:px-8">
            <span className="shrink-0 text-xs font-black uppercase tracking-[0.24em] text-[#07110d]/55">
              Trusted contexts
            </span>
            {profile.clients.map((client) => (
              <span
                key={client}
                className="shrink-0 text-sm font-black uppercase tracking-[0.18em] text-[#07110d]"
              >
                {client}
              </span>
            ))}
          </div>
        </section>

        <section
          id="work"
          className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24"
        >
          <div className="mb-16 rounded-[2.2rem] border border-[#07110d]/10 bg-white p-6 shadow-[0_24px_90px_rgba(7,17,13,0.08)] md:p-8">
            <SectionHeader
              eyebrow="Core capabilities"
              title="Platform design, research and governance for complex product teams."
              text="David works where product experience, risk, systems and organisational alignment intersect. The focus is not just better screens, but clearer services, stronger standards and better decisions across teams."
            />
            <div className="grid gap-3 md:grid-cols-3">
              {capabilityHighlights.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.4rem] bg-[#eef2ee] p-5"
                >
                  <h3 className="text-lg font-black tracking-[-0.04em] text-[#07110d]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-[#526358]">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <SectionHeader
            eyebrow="Selected work"
            title="Case studies in platform design, regulated products and design-system leadership."
            text="Examples of how I lead through ambiguity: defining the problem, aligning stakeholders, shaping the experience and building the systems that help teams deliver."
          />

          <div className="grid gap-5">
            {caseStudies.map((study, index) => (
              <Link
                key={study.slug}
                href={`/portfolio-v2/case-study/${study.slug}`}
                className="group grid overflow-hidden rounded-[2rem] border border-[#07110d]/10 bg-white shadow-[0_24px_90px_rgba(7,17,13,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#07110d]/30 md:grid-cols-[0.72fr_1.28fr]"
              >
                <div className="relative min-h-72 overflow-hidden bg-[#07110d]">
                  <img
                    src={study.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-[0.86] grayscale-[0.25] transition duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                    loading="lazy"
                    width="900"
                    height="640"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07110d]/82 via-[#07110d]/18 to-transparent" />
                  <div className="absolute left-5 top-5 flex gap-2">
                    <span className="rounded-full bg-[#d9ff40] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#07110d]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {study.protected ? (
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#07110d]">
                        Private
                      </span>
                    ) : null}
                  </div>
                  <p className="absolute bottom-5 left-5 text-xs font-black uppercase tracking-[0.2em] text-white/72">
                    {study.company}
                  </p>
                </div>

                <div className="grid gap-6 p-5 md:grid-cols-[1fr_13rem] md:p-8">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#526358]">
                      {study.sector} · {study.period}
                    </p>
                    <h3 className="mt-3 max-w-2xl text-3xl font-black leading-[0.98] tracking-[-0.055em] text-[#07110d] md:text-5xl">
                      {study.title}
                    </h3>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-[#526358]">
                      {study.summary}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {study.focus.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[#07110d]/10 px-3 py-1 text-xs font-bold text-[#526358]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 md:grid-cols-1">
                    {study.proof.slice(0, 3).map((point) => (
                      <div
                        key={point.label}
                        className="rounded-2xl bg-[#eef2ee] p-4"
                      >
                        <p className="text-xl font-black tracking-[-0.05em] text-[#07110d]">
                          {point.value}
                        </p>
                        <p className="mt-1 text-[11px] font-semibold leading-4 text-[#526358]">
                          {point.label}
                        </p>
                      </div>
                    ))}
                    <p className="col-span-3 mt-2 text-sm font-black text-[#07110d] md:col-span-1">
                      {study.protected
                        ? "Unlock case study"
                        : "Read case study"}{" "}
                      <span className="inline-block transition group-hover:translate-x-1">
                        →
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-[#07110d] px-4 py-16 text-white md:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.85fr_1.15fr]">
            <SectionHeader
              eyebrow="How I work"
              title="Evidence, standards and stakeholder trust."
              text="Most of my work happens in environments where the right answer has to work for users, product teams, engineers, compliance, risk and senior stakeholders. That means good design is as much about alignment and judgement as it is about interface craft."
              invert
            />
            <div className="grid gap-4">
              {credibilitySignals.map((signal) => (
                <article
                  key={signal}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur"
                >
                  <p className="text-base font-semibold leading-7 text-white/76">
                    {signal}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="principles"
          className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24"
        >
          <SectionHeader
            eyebrow="Design principles"
            title="Principles I bring to product teams."
            text="These are the behaviours I rely on when the work is complex, politically sensitive or moving quickly."
          />
          <div className="grid gap-4 md:grid-cols-4">
            {principles.map((principle) => (
              <article
                key={principle.title}
                className="rounded-[1.75rem] border border-[#07110d]/10 bg-white p-6 shadow-[0_18px_70px_rgba(7,17,13,0.06)]"
              >
                <div className="mb-6 h-2 w-12 rounded-full bg-[#d9ff40]" />
                <h3 className="text-xl font-black tracking-[-0.04em]">
                  {principle.title}
                </h3>
                <p className="mt-4 text-sm font-medium leading-6 text-[#526358]">
                  {principle.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8 md:pb-24">
          <div className="rounded-[2.2rem] bg-[#d9ff40] p-6 md:p-10">
            <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#07110d]/55">
                  Where David fits
                </p>
                <h2 className="mt-4 text-4xl font-black leading-[0.96] tracking-[-0.06em] md:text-6xl">
                  Senior design leadership for teams that need judgement and
                  momentum.
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <div
                    key={service}
                    className="rounded-2xl bg-[#07110d] p-5 text-white"
                  >
                    <p className="text-base font-bold leading-6">{service}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 border-t border-[#07110d]/20 pt-6 md:flex md:items-center md:justify-between">
              <p className="max-w-xl text-lg font-bold leading-7 text-[#07110d]">
                Want the private context behind the case studies?
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-5 inline-flex rounded-full bg-white px-6 py-4 text-sm font-black text-[#07110d] shadow-[0_18px_50px_rgba(7,17,13,0.16)] md:mt-0"
              >
                Request access
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#07110d]/10 px-4 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm font-semibold text-[#526358] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} David Phillip</p>
          <a href={`mailto:${profile.email}`} className="text-[#07110d]">
            {profile.email}
          </a>
        </div>
      </footer>
    </div>
  );
}
