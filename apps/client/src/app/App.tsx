import React, { lazy, Suspense, useEffect, useState } from "react";
import { Toaster } from "@/shared/components/ui/sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import NotFound from "@/views/NotFound";
import { Redirect, Route, Router as WouterRouter, Switch, useLocation, useSearch } from "wouter";
import { ThemeProvider } from "@/shared/contexts/ThemeContext";
import PageTransition from "@/shared/components/PageTransition";
import { caseStudyBySlug, type CaseStudySlug } from "@/rebuild/portfolioData";
import { unlockFromUrl } from "@/rebuild/password";

// Lazy-loaded page components for code splitting
const Articles = lazy(() => import("@/views/LinkedInArticlesView"));
const Article = lazy(() => import("@/views/Article"));
const CV = lazy(() => import("@/views/CV"));
const DesignSystem = lazy(() => import("@/views/DesignSystem"));

// 🔒 Local tools. Production builds swap them for the 404 page (and leave their
// code out) unless VITE_ENABLE_ADMIN=true is set.
const adminEnabled =
  import.meta.env.DEV || import.meta.env.VITE_ENABLE_ADMIN === "true";
const CVLab = adminEnabled ? lazy(() => import("@/views/CVLab")) : NotFound;
const CVBuilder = adminEnabled ? lazy(() => import("@/views/CVBuilder")) : NotFound;
const ArticleGenerator = adminEnabled
  ? lazy(() => import("@/views/ArticleGenerator"))
  : NotFound;
const ArticleManager = adminEnabled
  ? lazy(() => import("@/views/ArticleManager"))
  : NotFound;
const ExecutiveExplorer = adminEnabled
  ? lazy(() => import("@/views/ExecutiveExplorer"))
  : NotFound;
const PortfolioV2 = lazy(() => import("@/views/PortfolioV2"));
const PortfolioShort = lazy(() => import("@/views/PortfolioShort"));
const PortfolioV2CaseStudy = lazy(() => import("@/views/PortfolioV2CaseStudy"));

// The pre-2026 pages still use Montserrat and Material Symbols. Load them on
// those pages only, so the public site never waits on Google Fonts.
const LEGACY_FONTS =
  "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap";
const legacyPages = ["/articles/", "/design-system", "/admin", "/explorer"];

function useLegacyFonts(location: string) {
  useEffect(() => {
    if (!legacyPages.some((prefix) => location.startsWith(prefix))) return;
    if (document.getElementById("legacy-fonts")) return;
    const link = document.createElement("link");
    link.id = "legacy-fonts";
    link.rel = "stylesheet";
    link.href = LEGACY_FONTS;
    document.head.append(link);
  }, [location]);
}

/** /v2 moved to /; keep any ?ref= so tracking still works. */
function ShortPortfolioRedirect() {
  const search = useSearch();
  return <Redirect to={search ? `/?${search}` : "/"} replace />;
}

// Loading fallback component
const PageLoader = React.memo(function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
});

/**
 * App Router
 * Design System: Theme X - light theme by default
 * Theme: Electric lime and lavender accents with modern styling
 */

function Router() {
  const [location] = useLocation();
  useLegacyFonts(location);
  useEffect(() => {
    void unlockFromUrl();
  }, []);

  // Handle anchor scrolling when location changes
  useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash;
    if (hash) {
      // Remove the # from the hash
      const targetId = hash.substring(1);

      // Small delay to ensure the page has rendered
      const scrollToElement = () => {
        const element = document.getElementById(targetId);
        if (element) {
          // Add some offset for the fixed header
          const headerHeight = 80; // Approximate header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      };

      // Try immediately, and also after a short delay in case content is still loading
      scrollToElement();
      setTimeout(scrollToElement, 100);
      setTimeout(scrollToElement, 500);
    }
  }, [location]);

  return (
    <PageTransition>
      <Switch>
        {/* The main portfolio: one short page */}
        <Route path="/">
          <Suspense fallback={<PageLoader />}>
            <PortfolioShort />
          </Suspense>
        </Route>
        {/* Longer versions of the portfolio (see rebuild/audiences.ts) */}
        <Route path="/full">
          <Suspense fallback={<PageLoader />}>
            <PortfolioV2 />
          </Suspense>
        </Route>
        <Route path="/saas">
          <Suspense fallback={<PageLoader />}>
            <PortfolioV2 />
          </Suspense>
        </Route>
        <Route path="/design-leadership">
          <Suspense fallback={<PageLoader />}>
            <PortfolioV2 />
          </Suspense>
        </Route>
        {/* The short portfolio started at /v2; links already sent keep working */}
        <Route path="/v2">
          <ShortPortfolioRedirect />
        </Route>
        {/* The pre-2026 site (views/Home.tsx, views/CaseStudy.tsx) is kept in
            the repo for reference but no longer served. */}
        <Route path="/legacy">
          <Redirect to="/" replace />
        </Route>
        <Route path="/articles">
          <Suspense fallback={<PageLoader />}>
            <Articles />
          </Suspense>
        </Route>
        <Route path="/articles/:slug">
          <Suspense fallback={<PageLoader />}>
            <Article />
          </Suspense>
        </Route>
        <Route path="/cv">
          <Suspense fallback={<PageLoader />}>
            <CV />
          </Suspense>
        </Route>
        <Route path="/case-study/:slug">
          <Suspense fallback={<PageLoader />}>
            <PortfolioV2CaseStudy />
          </Suspense>
        </Route>
        <Route path="/legacy/case-study/:slug">
          {(params) => (
            <Redirect
              to={
                caseStudyBySlug.has(params.slug as CaseStudySlug)
                  ? `/case-study/${params.slug}`
                  : "/#work"
              }
              replace
            />
          )}
        </Route>
        <Route path="/design-system">
          <Suspense fallback={<PageLoader />}>
            <DesignSystem />
          </Suspense>
        </Route>
        <Route path="/portfolio-v2">
          <Redirect to="/" replace />
        </Route>
        <Route path="/portfolio-v2/case-study/:slug">
          {(params) => <Redirect to={`/case-study/${params.slug}`} replace />}
        </Route>
        {/* 🔒 SECRET ROUTE - Not linked anywhere */}
        <Route path="/admin">
          <Suspense fallback={<PageLoader />}>
            <CVLab />
          </Suspense>
        </Route>
        {/* 🔒 CV Builder - AI-Optimized ATS Resume Builder */}
        <Route path="/admin/cv-builder">
          <Suspense fallback={<PageLoader />}>
            <CVBuilder />
          </Suspense>
        </Route>
        {/* 🔒 Article Manager */}
        <Route path="/admin/articles">
          <Suspense fallback={<PageLoader />}>
            <ArticleManager />
          </Suspense>
        </Route>
        {/* 🔒 Article Generator */}
        <Route path="/admin/article-generator">
          <Suspense fallback={<PageLoader />}>
            <ArticleGenerator />
          </Suspense>
        </Route>
        {/* 🔒 Agentic Explorer Interface */}
        <Route path="/explorer">
          <Suspense fallback={<PageLoader />}>
            <ExecutiveExplorer />
          </Suspense>
        </Route>
        <Route path="/404" component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </PageTransition>
  );
}

/** Renders children only in the browser, after hydration. */
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? <>{children}</> : null;
}

/**
 * `ssrPath` is set when prerendering a route at build time; in the browser
 * wouter reads the location itself.
 */
function App({ ssrPath }: { ssrPath?: string }) {
  return (
    <WouterRouter ssrPath={ssrPath}>
      <ThemeProvider defaultMode="light" defaultPreset="theme-x">
        <TooltipProvider>
          <ClientOnly>
            <Toaster />
          </ClientOnly>
          <Router />
          {/* <FloatingChat /> from "@/features/chat/FloatingChat" */}
        </TooltipProvider>
      </ThemeProvider>
    </WouterRouter>
  );
}

export default App;
