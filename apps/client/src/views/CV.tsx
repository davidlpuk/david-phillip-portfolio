import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { Check, Copy, Download, Loader2, Printer } from "lucide-react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { profile } from "@/rebuild/portfolioData";
import { CV_PDF_PATH, pageMeta } from "@/rebuild/meta";
import {
  AvailabilityBadge,
  ButtonLink,
  Eyebrow,
  Reveal,
  SiteShell,
  useDocumentMeta,
  useInitialScroll,
} from "@/rebuild/site";

const CV_SOURCE = "/docs/DP CV - Download.md";

declare global {
  // Set by scripts/prerender.mjs while rendering /cv at build time
  var __CV_SOURCE__: string | undefined;
}

/**
 * The prerendered /cv page embeds the CV markdown in #cv-source so it renders
 * (and hydrates) with content; client-side navigation fetches it instead.
 */
function embeddedCv() {
  if (typeof document === "undefined") return globalThis.__CV_SOURCE__ ?? "";
  return document.getElementById("cv-source")?.textContent ?? "";
}

function textOf(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) return children.map(textOf).join("");
  return "";
}

const markdownComponents: Components = {
  h3: ({ children }) => {
    const parts = textOf(children)
      .split("|")
      .map((part) => part.trim());
    if (parts.length >= 3) {
      const [role, company, dates] = parts;
      return (
        <h3 className="mt-12 grid gap-1 first:mt-0 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6">
          <span className="font-editorial text-[1.75rem] leading-tight text-ink">
            {role}
            <span className="mt-1 block font-ui text-[15px] font-medium leading-6 text-ink">
              {company}
            </span>
          </span>
          <span className="type-label text-stone">{dates}</span>
        </h3>
      );
    }
    if (parts.length === 2) {
      return (
        <h3 className="mt-12 grid gap-1 first:mt-0 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6">
          <span className="font-editorial text-[1.75rem] leading-tight text-ink">
            {parts[0]}
          </span>
          <span className="type-label text-stone">{parts[1]}</span>
        </h3>
      );
    }
    return (
      <h3 className="mt-10 font-editorial text-[1.75rem] leading-tight text-ink first:mt-0">
        {children}
      </h3>
    );
  },
  p: ({ children }) => (
    <p className="mt-4 text-[15px] leading-7 text-stone">{children}</p>
  ),
  em: ({ children }) => <em className="not-italic text-stone">{children}</em>,
  strong: ({ children }) => (
    <strong className="font-medium text-ink">{children}</strong>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className="font-medium text-cobalt underline decoration-cobalt/30 underline-offset-4 hover:decoration-cobalt"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => <ul className="mt-4 grid gap-2.5">{children}</ul>,
  li: ({ children }) => (
    <li className="grid grid-cols-[1rem_1fr] text-[15px] leading-7 text-stone">
      <span aria-hidden="true" className="mt-[0.7rem] h-1.5 w-1.5 rounded-full bg-cobalt" />
      <span>{children}</span>
    </li>
  ),
  hr: () => <hr className="my-10 border-ink/10" />,
  table: ({ children }) => (
    // Focusable so keyboard users can scroll it on narrow screens
    <div
      className="mt-6 overflow-x-auto rounded-2xl border border-ink/10"
      tabIndex={0}
      role="region"
      aria-label="Earlier career (scrolls sideways on small screens)"
    >
      <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="type-label border-b border-ink/10 bg-paper px-4 py-3 text-stone">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-ink/10 px-4 py-3 align-top leading-6 text-ink [tr:last-child_&]:border-b-0">
      {children}
    </td>
  ),
};

interface CvSection {
  id: string;
  title: string;
  body: string;
}

function parseCv(markdown: string) {
  const [header, ...rest] = markdown.split(/\n(?=## )/);
  const summary = header
    .split("\n")
    .filter((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("# ")) return false;
      if (/^\*\*.*\*\*$/.test(trimmed) && trimmed.includes("|")) return false;
      if (trimmed.includes("|") && trimmed.includes("LinkedIn")) return false;
      return true;
    })
    .join("\n")
    .trim();

  const sections: CvSection[] = rest.map((block) => {
    const [titleLine, ...body] = block.split("\n");
    const title = titleLine.replace(/^##\s*/, "").trim();
    return {
      id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      title,
      body: body.join("\n").trim(),
    };
  });

  return { summary, sections };
}

function CapabilityGrid({ body }: { body: string }) {
  const blocks = body.split(/\n\n(?=\*\*)/);
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-2">
      {blocks.map((block) => {
        const [heading, ...items] = block.split("\n");
        return (
          <div key={heading} className="bg-bone p-6">
            <p className="font-editorial text-2xl leading-tight text-ink">
              {heading.replace(/\*\*/g, "")}
            </p>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {items.join("\n")}
            </ReactMarkdown>
          </div>
        );
      })}
    </div>
  );
}

export default function CV() {
  const [markdown, setMarkdown] = useState(embeddedCv);
  const [loading, setLoading] = useState(() => !markdown);
  const [copied, setCopied] = useState(false);

  useDocumentMeta(pageMeta.cv);
  useInitialScroll();

  useEffect(() => {
    if (markdown) return;
    fetch(encodeURI(CV_SOURCE))
      .then((res) => {
        if (!res.ok) throw new Error(`Status: ${res.status}`);
        return res.text();
      })
      .then(setMarkdown)
      .catch((error) => {
        console.error("Failed to load CV:", error);
        setMarkdown("");
      })
      .finally(() => setLoading(false));
    // Only the first render decides whether a fetch is needed
  }, []);

  const handleCopy = useCallback(async () => {
    if (!markdown) return;
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      toast.success("CV copied as plain text");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Couldn’t copy the CV. Try the PDF instead.");
    }
  }, [markdown]);

  const { summary, sections } = useMemo(() => parseCv(markdown), [markdown]);

  const actionClass =
    "inline-flex h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <SiteShell>
      <main id="main-content" className="pb-24 md:pb-32">
        <header className="mx-auto max-w-6xl px-5 pt-28 md:px-8 md:pt-36">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Eyebrow>Curriculum vitae</Eyebrow>
              <AvailabilityBadge tone="paper" />
            </div>
            <h1 className="type-hero mt-8 text-[clamp(3rem,7vw,6rem)] text-ink">
              David Phillip
            </h1>
            <p className="mt-4 font-editorial text-[clamp(1.5rem,2.6vw,2.25rem)] italic leading-tight text-stone">
              Head of Design · Design Director · Financial services & SaaS
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="no-print mt-10 flex flex-wrap gap-3">
              <a
                href={CV_PDF_PATH}
                download
                className={`${actionClass} bg-cobalt text-white hover:bg-cobalt-deep`}
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download PDF
              </a>
              <button
                type="button"
                onClick={() => window.print()}
                disabled={!markdown}
                className={`${actionClass} border border-ink/15 text-ink hover:border-ink/40`}
              >
                <Printer className="h-4 w-4" aria-hidden="true" />
                Print
              </button>
              <button
                type="button"
                onClick={handleCopy}
                disabled={!markdown}
                className={`${actionClass} border border-ink/15 text-ink hover:border-ink/40`}
              >
                {copied ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden="true" />
                )}
                {copied ? "Copied" : "Copy as text"}
              </button>
              <ButtonLink
                href={profile.calendlyUrl}
                variant="ink"
                icon="external"
                size="sm"
              >
                Book an intro call
              </ButtonLink>
            </div>
          </Reveal>
        </header>

        <div className="mx-auto mt-14 grid max-w-6xl gap-10 px-5 md:px-8 lg:grid-cols-12">
          <aside className="no-print hidden lg:col-span-3 lg:block">
            <nav aria-label="CV sections" className="sticky top-28">
              <dl className="grid gap-4 text-sm">
                <div>
                  <dt className="type-label text-stone">Email</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${profile.email}`}
                      className="font-medium text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-ink"
                    >
                      {profile.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="type-label text-stone">LinkedIn</dt>
                  <dd className="mt-1">
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-ink"
                    >
                      in/davidphillip
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="type-label text-stone">Location</dt>
                  <dd className="mt-1 font-medium text-ink">{profile.location}</dd>
                </div>
              </dl>
              <p className="type-label mt-10 text-stone">Sections</p>
              <ul className="mt-5 grid gap-1 border-l border-ink/10">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-stone transition hover:border-ink/40 hover:text-ink"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="cv-document min-w-0 rounded-[28px] border border-ink/10 bg-bone p-6 md:p-12 lg:col-span-9">
            {loading ? (
              <div className="flex min-h-[70vh] items-start gap-3 py-24 text-stone" role="status">
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                Loading CV…
              </div>
            ) : !markdown ? (
              <div className="py-16" role="alert">
                <p className="font-editorial text-3xl text-ink">
                  The CV couldn’t be loaded.
                </p>
                <p className="mt-3 text-stone">
                  Please refresh, or email{" "}
                  <a className="text-cobalt underline" href={`mailto:${profile.email}`}>
                    {profile.email}
                  </a>{" "}
                  for a copy.
                </p>
              </div>
            ) : (
              <>
                <section aria-label="Profile summary">
                  <div className="font-editorial text-[clamp(1.375rem,2.2vw,1.75rem)] leading-[1.35] text-ink [&_p]:mt-4 [&_p]:font-editorial [&_p]:text-[length:inherit] [&_p]:leading-[inherit] [&_p]:text-ink [&_p:first-child]:mt-0">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{ ...markdownComponents, p: ({ children }) => <p>{children}</p> }}
                    >
                      {summary}
                    </ReactMarkdown>
                  </div>
                </section>

                {sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    aria-labelledby={`${section.id}-title`}
                    className="cv-section mt-14 border-t border-ink/10 pt-10"
                  >
                    <h2
                      id={`${section.id}-title`}
                      className="type-label mb-8 text-cobalt"
                    >
                      {section.title}
                    </h2>
                    {section.title === "Core Capabilities" ? (
                      <CapabilityGrid body={section.body} />
                    ) : (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={markdownComponents}
                      >
                        {section.body}
                      </ReactMarkdown>
                    )}
                  </section>
                ))}
              </>
            )}
          </article>
        </div>
      </main>
      <style>{`
        @media print {
          @page { margin: 1.4cm; }
          body { background: #fff !important; }
          .dp { background: #fff !important; }
          .dp main { padding: 0 !important; }
          .dp main > header { padding-top: 0 !important; }
          .cv-document { border: 0 !important; padding: 0 !important; background: #fff !important; }
          .cv-section { break-inside: auto; }
          .cv-section h3 { break-after: avoid; }
          .cv-document a { color: inherit !important; text-decoration: none !important; }
        }
      `}</style>
    </SiteShell>
  );
}
