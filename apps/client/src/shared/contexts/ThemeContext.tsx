import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export type ThemeMode = "light" | "dark";
export type ThemePreset = "institutional-elegance" | "modern-tech" | "fresh-modern" | "theme-x";

export interface ThemeContextType {
  // Theme mode (light/dark)
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;

  // Theme preset
  preset: ThemePreset;
  setPreset: (preset: ThemePreset) => void;

  // Computed theme class for HTML element
  themeClass: string;

  // System preference
  systemPreference: ThemeMode;
  useSystemTheme: boolean;
  setUseSystemTheme: (useSystem: boolean) => void;

  // Reduced motion preference
  reducedMotion: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_MODE_KEY = "theme-mode";
const THEME_PRESET_KEY = "theme-preset";
const USE_SYSTEM_THEME_KEY = "use-system-theme";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
  defaultPreset?: ThemePreset;
}

export function ThemeProvider({
  children,
  defaultMode = "light",
  defaultPreset = "institutional-elegance",
}: ThemeProviderProps) {
  // Initialize mode from localStorage, system preference, or default
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem(THEME_MODE_KEY);
    if (stored) return stored as ThemeMode;

    // Check system preference
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return defaultMode;
  });

  // Initialize preset from localStorage or default
  const [preset, setPresetState] = useState<ThemePreset>(() => {
    const stored = localStorage.getItem(THEME_PRESET_KEY);
    if (stored && isValidPreset(stored)) {
      return stored as ThemePreset;
    }
    return defaultPreset;
  });

  // Initialize useSystemTheme from localStorage
  const [useSystemTheme, setUseSystemThemeState] = useState(() => {
    const stored = localStorage.getItem(USE_SYSTEM_THEME_KEY);
    return stored === "true";
  });

  // Detect reduced motion preference
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect system preference
  const [systemPreference, setSystemPreference] = useState<ThemeMode>(() => {
    if (typeof window === "undefined" || !window.matchMedia) return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  // Update reduced motion on change
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Update system preference on change
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemPreference(mediaQuery.matches ? "dark" : "light");

    const handler = (e: MediaQueryListEvent) => {
      setSystemPreference(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Determine effective mode - always light
  const effectiveMode = "light";

  // Set mode with persistence - always set to light
  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState("light");
    localStorage.setItem(THEME_MODE_KEY, "light");
    setUseSystemThemeState(false);
    localStorage.setItem(USE_SYSTEM_THEME_KEY, "false");
  }, []);

  // Toggle mode - disabled, always light
  const toggleMode = useCallback(() => {
    // Do nothing, always light mode
  }, []);

  // Set preset with persistence
  const setPreset = useCallback((newPreset: ThemePreset) => {
    setPresetState(newPreset);
    localStorage.setItem(THEME_PRESET_KEY, newPreset);
  }, []);

  // Set useSystemTheme with persistence
  const setUseSystemTheme = useCallback((useSystem: boolean) => {
    setUseSystemThemeState(useSystem);
    localStorage.setItem(USE_SYSTEM_THEME_KEY, String(useSystem));
  }, []);

  // Compute theme class - always light
  const themeClass = preset === "institutional-elegance"
    ? "light"  // Force light theme for institutional-elegance preset
    : `light theme-${preset.replace("institutional-elegance", "").replace(/-/g, "")}`;

  // Apply theme to document
  useEffect(() => {
    if (typeof document === "undefined") return;

    const html = document.documentElement;

    // Remove all theme classes
    html.classList.remove(
      "light",
      "dark",
      "theme-modern-tech",
      "theme-warm-minimal",
      "theme-x"
    );

    // Apply mode class
    html.classList.add(effectiveMode);

    // Apply preset class
    const presetClassMap: Record<ThemePreset, string> = {
      "institutional-elegance": "",
      "modern-tech": "theme-modern-tech",
      "fresh-modern": "theme-fresh-modern",
      "theme-x": "theme-x",
    };
    if (presetClassMap[preset]) {
      html.classList.add(presetClassMap[preset]);
    }

    // Apply preset as data attribute for CSS targeting
    html.setAttribute("data-theme-preset", preset);
    html.setAttribute("data-theme-mode", effectiveMode);

    // Apply reduced motion data attribute
    html.setAttribute("data-reduced-motion", reducedMotion ? "reduce" : "no-preference");

    // Apply smooth theme transition to body
    const body = document.body;
    body.style.setProperty("--theme-transitioning", "true");

    // Force reflow to enable transition
    requestAnimationFrame(() => {
      body.style.removeProperty("--theme-transitioning");
    });
  }, [preset, effectiveMode, reducedMotion]);

  // Persist settings
  useEffect(() => {
    localStorage.setItem(THEME_MODE_KEY, mode);
    localStorage.setItem(THEME_PRESET_KEY, preset);
    localStorage.setItem(USE_SYSTEM_THEME_KEY, String(useSystemTheme));
  }, [mode, preset, useSystemTheme]);

  const value: ThemeContextType = {
    mode,
    setMode,
    toggleMode,
    preset,
    setPreset,
    themeClass,
    systemPreference,
    useSystemTheme,
    setUseSystemTheme,
    reducedMotion,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Helper function to validate preset
function isValidPreset(value: string): value is ThemePreset {
  return [
    "institutional-elegance",
    "modern-tech",
    "fresh-modern",
    "theme-x",
  ].includes(value);
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
