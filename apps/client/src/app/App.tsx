import React, { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/shared/components/ui/sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import NotFound from "@/views/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { ThemeProvider } from "@/shared/contexts/ThemeContext";
import PageTransition from "@/shared/components/PageTransition";

// Lazy-loaded page components for code splitting
const Home = lazy(() => import("@/views/Home"));
const Articles = lazy(() => import("@/views/LinkedInArticlesView"));
const Article = lazy(() => import("@/views/Article"));
const CaseStudy = lazy(() => import("@/views/CaseStudy"));
const CV = lazy(() => import("@/views/CV"));
const DesignSystem = lazy(() => import("@/views/DesignSystem"));
const CVLab = lazy(() => import("@/views/CVLab")); // 🔒 Secret page
const CVBuilder = lazy(() => import("@/views/CVBuilder")); // 🔒 AI CV Builder
const ArticleGenerator = lazy(() => import("@/views/ArticleGenerator")); // 🔒 Article Generator
const ArticleManager = lazy(() => import("@/views/ArticleManager")); // 🔒 Article Manager
const ExecutiveExplorer = lazy(() => import("@/views/ExecutiveExplorer")); // 🔒 Agentic Explorer

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
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
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
            <Home />
          </Suspense>
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
            <CaseStudy />
          </Suspense>
        </Route>
        <Route path="/design-system">
          <Suspense fallback={<PageLoader />}>
            <DesignSystem />
          </Suspense>
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

import { FloatingChat } from "@/features/chat/FloatingChat";

function App() {
  return (
    <ThemeProvider defaultMode="light" defaultPreset="theme-x">
      <TooltipProvider>
        <Toaster />
        <Router />
        {/* <FloatingChat /> */}
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
