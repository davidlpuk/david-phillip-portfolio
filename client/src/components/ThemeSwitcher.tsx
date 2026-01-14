import React, { useState } from "react";
import { useTheme, ThemePreset } from "../contexts/ThemeContext";
import { THEME_PRESETS } from "../const/theme";
import { cn } from "../lib/utils";

export interface ThemeSwitcherProps {
  className?: string;
  variant?: "dropdown" | "buttons" | "compact" | "button";
}

export function ThemeSwitcher({
  className,
  variant = "dropdown",
}: ThemeSwitcherProps) {
  const {
    mode,
    setMode,
    toggleMode,
    preset,
    setPreset,
    useSystemTheme,
    setUseSystemTheme,
  } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const handleModeToggle = () => {
    setUseSystemTheme(false);
    toggleMode();
  };

  const handlePresetSelect = (newPreset: ThemePreset) => {
    setPreset(newPreset);
    setIsOpen(false);
  };

  const handleSystemToggle = () => {
    setUseSystemTheme(!useSystemTheme);
  };

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <button
          onClick={handleModeToggle}
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-md bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 transition-colors"
          aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
        >
          <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-transform dark:rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
        </button>
      </div>
    );
  }

  if (variant === "button") {
    return (
      <button
        onClick={handleModeToggle}
        className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:scale-110 transition-transform"
        aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
      >
        <SunIcon className="h-[20px] w-[20px] rotate-0 scale-100 transition-transform dark:rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[20px] w-[20px] rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
      </button>
    );
  }

  if (variant === "buttons") {
    return (
      <div className={cn("flex flex-col gap-4", className)}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Mode
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setMode("light")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                mode === "light"
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
              )}
            >
              <SunIcon className="h-4 w-4" />
              Light
            </button>
            <button
              onClick={() => setMode("dark")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                mode === "dark"
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
              )}
            >
              <MoonIcon className="h-4 w-4" />
              Dark
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Theme Preset
          </label>
          <div className="grid gap-2">
            {THEME_PRESETS.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handlePresetSelect(theme.id)}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg border text-left transition-all",
                  preset === theme.id
                    ? "border-primary bg-secondary"
                    : "border-border bg-card hover:border-primary/50"
                )}
              >
                <div
                  className="w-6 h-6 rounded-full mt-0.5 flex-shrink-0"
                  style={{
                    background: getPresetColor(theme.id, mode),
                  }}
                />
                <div>
                  <span className="text-sm font-medium text-foreground">
                    {theme.label}
                  </span>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {theme.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-secondary hover:bg-secondary/80 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <PaletteIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Theme</span>
        <ChevronDownIcon className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-72 rounded-lg border border-border bg-card py-2 shadow-lg z-50">
            <button
              onClick={handleSystemToggle}
              className="flex w-full items-center justify-between px-4 py-2 text-sm hover:bg-secondary transition-colors"
            >
              <span className="text-foreground">
                Use System Theme
              </span>
              <div
                className={cn(
                  "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
                  useSystemTheme ? "bg-primary" : "bg-secondary"
                )}
              >
                <span
                  className={cn(
                    "inline-block h-3.5 w-3.5 transform rounded-full bg-background transition-transform",
                    useSystemTheme ? "translate-x-5" : "translate-x-0.5"
                  )}
                />
              </div>
            </button>

            <div className="my-2 border-t border-neutral-200 dark:border-neutral-700" />

            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-sm text-muted-foreground">
                Current Mode
              </span>
              <button
                onClick={handleModeToggle}
                className="flex items-center gap-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                {mode === "light" ? (
                  <>
                    <SunIcon className="h-4 w-4" />
                    Light
                  </>
                ) : (
                  <>
                    <MoonIcon className="h-4 w-4" />
                    Dark
                  </>
                )}
              </button>
            </div>

            <div className="my-2 border-t border-neutral-200 dark:border-neutral-700" />

            <div className="px-4 py-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Theme Presets
              </span>
            </div>
            {THEME_PRESETS.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handlePresetSelect(theme.id)}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors",
                  preset === theme.id
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <div
                  className="w-5 h-5 rounded-full flex-shrink-0"
                  style={{
                    background: getPresetColor(theme.id, mode),
                  }}
                />
                <div className="flex flex-col items-start">
                  <span>{theme.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {theme.description}
                  </span>
                </div>
                {preset === theme.id && (
                  <CheckIcon className="h-4 w-4 ml-auto" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

function getPresetColor(preset: string, mode: string): string {
  const colors: Record<string, { light: string; dark: string }> = {
    "institutional-elegance": {
      light: "#1A1A1A",
      dark: "#1A1A1A",
    },
    "modern-tech": {
      light: "#7C3AED",
      dark: "#8B5CF6",
    },
    "warm-minimal": {
      light: "#B45309",
      dark: "#F59E0B",
    },
    "fresh-modern": {
      light: "#0D9488",
      dark: "#14B8A6",
    },
    "theme-x": {
      light: "#DFFF00",
      dark: "#DFFF00",
    },
  };
  return colors[preset]?.[mode as "light" | "dark"] || "#DFFF00";
}

export default ThemeSwitcher;
