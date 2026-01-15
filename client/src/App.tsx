import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { ThemeProvider } from "./contexts/ThemeContext";
import PageTransition from "./components/PageTransition";

// Lazy-loaded page components for code splitting
const Home = lazy(() => import("./pages/Home"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const CV = lazy(() => import("./pages/CV"));
const DesignSystem = lazy(() => import("./pages/DesignSystem"));
const CVLab = lazy(() => import("./pages/CVLab")); // 🔒 Secret page
const CVBuilder = lazy(() => import("./pages/CVBuilder")); // 🔒 AI CV Builder

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
  return (
    <PageTransition>
      <Switch>
        <Route path="/">
          <Suspense fallback={<PageLoader />}>
            <Home />
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
        <Route path="/404" component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </PageTransition>
  );
}

function App() {
  return (
    <ThemeProvider defaultMode="light" defaultPreset="theme-x">
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
