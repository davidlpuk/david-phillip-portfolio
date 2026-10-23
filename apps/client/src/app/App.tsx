import React, { lazy, Suspense, useEffect, useState } from "react";
import { Toaster } from "@/shared/components/ui/sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import NotFound from "@/views/NotFound";
import { Redirect, Route, Router as WouterRouter, Switch, useLocation } from "wouter";
import { ThemeProvider } from "@/shared/contexts/ThemeContext";
import PageTransition from "@/shared/components/PageTransition";
import { caseStudyBySlug, type CaseStudySlug } from "@/rebuild/portfolioData";

// Lazy-loaded page components for code splitting
const Articles = lazy(() => import("@/views/LinkedInArticlesView"));
const Article = lazy(() => import("@/views/Article"));
const CV = lazy(() => import("@/views/CV"));
const DesignSystem = lazy(() => import("@/views/DesignSystem"));
const CVLab = lazy(() => import("@/views/CVLab")); // 🔒 Secret page
const CVBuilder = lazy(() => import("@/views/CVBuilder")); // 🔒 AI CV Builder
const ArticleGenerator = lazy(() => import("@/views/ArticleGenerator")); // 🔒 Article Generator
const ArticleManager = lazy(() => import("@/views/ArticleManager")); // 🔒 Article Manager
const ExecutiveExplorer = lazy(() => import("@/views/ExecutiveExplorer")); // 🔒 Agentic Explorer
const PortfolioV2 = lazy(() => import("@/views/PortfolioV2"));
const PortfolioV2CaseStudy = lazy(() => import("@/views/PortfolioV2CaseStudy"));

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
        <Route path="/">
          <Suspense fallback={<PageLoader />}>
            <PortfolioV2 />
          </Suspense>
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
