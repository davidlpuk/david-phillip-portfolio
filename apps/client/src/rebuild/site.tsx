import { ReactNode, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, MotionConfig } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Linkedin,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import type { PageMeta } from "@/rebuild/meta";
import { profile } from "@/rebuild/portfolioData";

const navItems = [
  { id: "work", label: "Work" },
  { id: "leadership", label: "Leadership" },
  { id: "testimonials", label: "References" },
  { id: "writing", label: "Writing" },
  { id: "experience", label: "Experience" },
];

function isHomePath(path: string) {
  return path === "/" || path === "/portfolio-v2";
}

function setMeta(selector: string, attribute: string, value: string) {
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  if (element) element.setAttribute(attribute, value);
}

export function useDocumentMeta({ title, description }: PageMeta) {
  const [location] = useLocation();

  useEffect(() => {
    const url = `${window.location.origin}${location}`;
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    document.head
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.setAttribute("href", url);
  }, [title, description, location]);
}

/*
 * Scroll memory for Back/Forward. Positions are recorded at the moment of
 * navigation (wouter dispatches `pushState`/`replaceState` events after the
 * URL changes but before React re-renders), because the page transition
 * briefly collapses the document while the old page unmounts.
 */
const scrollPositions = new Map<string, number>();
let lastPopState = -Infinity;

if (typeof window !== "undefined") {
  window.history.scrollRestoration = "manual";
  let currentPath = window.location.pathname;
  const leave = (remember: boolean) => {
    if (remember) scrollPositions.set(currentPath, window.scrollY);
    currentPath = window.location.pathname;
  };
  window.addEventListener("pushState", () => leave(true));
  window.addEventListener("replaceState", () => leave(false));
  window.addEventListener("popstate", () => {
    leave(true);
    lastPopState = performance.now();
  });
}

/**
 * Client-side navigation keeps the previous scroll position, so start each
 * page at the top, at the section named in the URL hash, or, after Back or
 * Forward, where the visitor left it.
 */
export function useInitialScroll(key?: string) {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    const saved = scrollPositions.get(window.location.pathname);
    const restore = performance.now() - lastPopState < 2000 && saved !== undefined;

    if (!restore && !id) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const timer = window.setTimeout(() => {
      if (restore) {
        window.scrollTo({ top: saved, behavior: "instant" });
      } else {
        document
          .getElementById(id)
          ?.scrollIntoView({ block: "start", behavior: "instant" });
      }
    }, 80);
    return () => window.clearTimeout(timer);
  }, [key]);
}

/** In-page anchor on the home page, client-side route to `/#id` elsewhere. */
function SectionLink({
  id,
  onHome,
  className,
  children,
  onClick,
  current,
}: {
  id: string;
  onHome: boolean;
  className: string;
  children: ReactNode;
  onClick?: () => void;
  current?: boolean;
}) {
  if (onHome) {
    return (
      <a
        href={`#${id}`}
        onClick={onClick}
        aria-current={current ? "true" : undefined}
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={`/#${id}`} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActive(visible[0].target.id);
        } else if (sections[0].getBoundingClientRect().top > window.innerHeight * 0.35) {
          // Scrolled back above the first section, e.g. into the hero
          setActive(null);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

type ButtonVariant = "primary" | "ink" | "outline" | "outline-light";

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-cobalt text-white hover:bg-cobalt-deep shadow-[0_1px_0_rgb(255_255_255/0.2)_inset,0_8px_24px_-12px_rgb(42_75_216/0.8)]",
  ink: "bg-ink text-bone hover:bg-ink-3",
  outline: "border border-ink/15 text-ink hover:border-ink/40 hover:bg-ink/[0.03]",
  "outline-light":
    "border border-white/20 text-bone hover:border-white/50 hover:bg-white/[0.04]",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon = "arrow",
  size = "md",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: "arrow" | "external" | "none";
  size?: "sm" | "md";
  className?: string;
}) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const Icon =
    icon === "external" ? ArrowUpRight : icon === "arrow" ? ArrowRight : null;
  const classes = `group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition duration-200 ${
    size === "sm" ? "h-10 px-4 text-sm" : "h-12 px-6 text-[15px]"
  } ${buttonStyles[variant]} ${className}`;
  const content = (
    <>
      {children}
      {Icon ? (
        <Icon
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  if (external || href.startsWith("#")) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
      >
        {content}
        {href.startsWith("http") ? (
          <span className="sr-only">(opens in a new tab)</span>
        ) : null}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

export function Eyebrow({
  index,
  children,
  tone = "paper",
}: {
  index?: string;
  children: ReactNode;
  tone?: "paper" | "ink";
}) {
  return (
    <p
      className={`type-label flex items-center gap-3 ${
        tone === "ink" ? "text-mist" : "text-stone"
      }`}
    >
      {index ? (
        <span className={tone === "ink" ? "text-periwinkle" : "text-cobalt"}>
          {index}
        </span>
      ) : null}
      {index ? (
        <span
          aria-hidden="true"
          className={`h-px w-8 ${tone === "ink" ? "bg-white/20" : "bg-ink/20"}`}
        />
      ) : null}
      {children}
    </p>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const Component = as === "li" ? motion.li : motion.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

export function AvailabilityBadge({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium ${
        tone === "ink"
          ? "border-white/15 bg-white/[0.04] text-bone"
          : "border-ink/12 bg-bone text-ink"
      }`}
    >
      <span className="status-dot h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
      {profile.availability}
      <span className={tone === "ink" ? "text-mist" : "text-stone"}>
        · {profile.location}
      </span>
    </span>
  );
}

export function CopyEmailButton({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast.success("Email address copied");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition ${
        tone === "ink"
          ? "border-white/15 text-bone hover:border-white/40"
          : "border-ink/15 text-ink hover:border-ink/40"
      }`}
      aria-label={copied ? "Email address copied" : "Copy email address"}
    >
      {copied ? (
        <Check className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Copy className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}

function Monogram() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-bone font-editorial text-[17px] leading-none text-ink"
    >
      D<span className="italic">p</span>
    </span>
  );
}

function MobileMenu({ onHome }: { onHome: boolean }) {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => setOpen(false), [location]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-medium text-bone md:hidden"
        >
          <Menu className="h-4 w-4" aria-hidden="true" />
          Menu
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          data-surface="ink"
          className="dp fixed inset-x-3 top-3 z-50 rounded-[28px] border border-white/10 bg-ink p-6 text-bone shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-4"
        >
          <div className="flex items-center justify-between">
            <Dialog.Title className="type-label text-mist">Menu</Dialog.Title>
            <Dialog.Close
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            Site navigation and contact options
          </Dialog.Description>
          <nav aria-label="Mobile" className="mt-6 grid">
            {navItems.map((item) => (
              <SectionLink
                key={item.id}
                id={item.id}
                onHome={onHome}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-4 font-editorial text-4xl leading-none"
              >
                {item.label}
              </SectionLink>
            ))}
            <Link
              href="/cv"
              className="border-b border-white/10 py-4 font-editorial text-4xl leading-none"
            >
              CV
            </Link>
          </nav>
          <div className="mt-8 grid gap-3">
            <ButtonLink href={profile.calendlyUrl} icon="external">
              Book an intro call
            </ButtonLink>
            <ButtonLink
              href={`mailto:${profile.email}`}
              variant="outline-light"
              icon="none"
            >
              {profile.email}
            </ButtonLink>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function SiteHeader() {
  const [location] = useLocation();
  const onHome = isHomePath(location);
  const active = useActiveSection(onHome);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="no-print fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-6 md:pt-4">
      <div
        data-surface="ink"
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-full border pl-2.5 pr-2 text-bone backdrop-blur-xl transition duration-300 ${
          scrolled
            ? "border-white/10 bg-ink/95 shadow-[0_12px_40px_-16px_rgb(12_14_18/0.6)]"
            : "border-white/[0.08] bg-ink/90"
        }`}
      >
        <Link href="/" className="flex items-center gap-3 rounded-full pr-2">
          <Monogram />
          <span className="hidden text-[15px] font-medium tracking-[-0.01em] sm:inline">
            David Phillip
          </span>
          <span className="sr-only sm:hidden">David Phillip</span>
          <span className="hidden text-[13px] text-mist lg:inline">
            Head of Design
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <SectionLink
                key={item.id}
                id={item.id}
                onHome={onHome}
                current={isActive}
                className={`rounded-full px-3.5 py-2 text-sm transition ${
                  isActive
                    ? "bg-white/10 text-bone"
                    : "text-mist hover:text-bone"
                }`}
              >
                {item.label}
              </SectionLink>
            );
          })}
          <Link
            href="/cv"
            aria-current={location === "/cv" ? "page" : undefined}
            className={`rounded-full px-3.5 py-2 text-sm transition ${
              location === "/cv"
                ? "bg-white/10 text-bone"
                : "text-mist hover:text-bone"
            }`}
          >
            CV
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href={profile.calendlyUrl} size="sm" icon="external">
            Book a call
          </ButtonLink>
          <MobileMenu onHome={onHome} />
        </div>
      </div>
    </header>
  );
}

export function ContactSection({ compact = false }: { compact?: boolean }) {
  return (
    <section
      id="contact"
      data-surface="ink"
      aria-labelledby="contact-title"
      className="relative overflow-hidden bg-ink text-bone"
    >
      <div className="grid-texture absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="glow absolute -right-64 -top-64 h-[48rem] w-[48rem]"
      />
      <div
        className={`relative mx-auto max-w-6xl px-5 md:px-8 ${
          compact ? "py-20 md:py-28" : "py-24 md:py-36"
        }`}
      >
        <Reveal>
          <Eyebrow tone="ink">Hiring a Head of Design or Design Director?</Eyebrow>
          <h2
            id="contact-title"
            className="type-hero mt-6 max-w-4xl text-bone"
          >
            Let’s talk about <em className="italic text-periwinkle">your</em> team.
          </h2>
          <p className="type-lede mt-6 max-w-2xl text-mist">
            Open to {profile.targetRoles} in financial services, fintech and
            B2B SaaS. A 30-minute intro call is the quickest way to see if
            there’s a fit.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonLink href={profile.calendlyUrl} icon="external">
              Book an intro call
            </ButtonLink>
            <ButtonLink href="/cv" variant="outline-light" icon="arrow">
              Read the CV
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <dl className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
            <div className="bg-ink-2 p-6">
              <dt className="type-label text-mist">Email</dt>
              <dd className="mt-3 flex items-center justify-between gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="truncate text-[15px] font-medium text-bone underline decoration-white/25 underline-offset-4 hover:decoration-white"
                >
                  {profile.email}
                </a>
                <CopyEmailButton />
              </dd>
            </div>
            <div className="bg-ink-2 p-6">
              <dt className="type-label text-mist">LinkedIn</dt>
              <dd className="mt-3 flex items-center justify-between gap-3">
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[15px] font-medium text-bone underline decoration-white/25 underline-offset-4 hover:decoration-white"
                >
                  in/davidphillip
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <Linkedin className="h-4 w-4 text-mist" aria-hidden="true" />
              </dd>
            </div>
            <div className="bg-ink-2 p-6">
              <dt className="type-label text-mist">Based in</dt>
              <dd className="mt-3 text-[15px] font-medium text-bone">
                London, UK · {profile.availability.toLowerCase()}
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer
      data-surface="ink"
      className="no-print border-t border-white/10 bg-ink text-mist"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-sm md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-3">
          <Monogram />
          <p>
            <span className="text-bone">David Phillip</span> · {profile.title}
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/" className="hover:text-bone">
            Work
          </Link>
          <Link href="/cv" className="hover:text-bone">
            CV
          </Link>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-bone"
          >
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-bone">
            Email
          </a>
        </nav>
        <p>© {new Date().getFullYear()} David Phillip</p>
      </div>
    </footer>
  );
}

export function SiteShell({
  children,
  surface = "paper",
}: {
  children: ReactNode;
  surface?: "paper" | "ink";
}) {
  return (
    <MotionConfig reducedMotion="user">
      <div
        className={`dp min-h-screen ${
          surface === "ink" ? "bg-ink text-bone" : "bg-paper text-ink"
        }`}
      >
        <SiteHeader />
        {children}
        <SiteFooter />
      </div>
    </MotionConfig>
  );
}
