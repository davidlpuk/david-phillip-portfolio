import { useState, useEffect } from "react";

/**
 * Hook to detect reduced motion preference
 * Returns true if user has requested reduced motion
 */
export function useReducedMotion(): boolean {
    const [reducedMotion, setReducedMotion] = useState(false);

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

    return reducedMotion;
}

/**
 * Animation duration for standard animations
 * Reduced motion: near-instant, Normal motion: normal duration
 */
export const getAnimationDuration = (reducedMotion: boolean): number => {
    return reducedMotion ? 0.01 : 0.6; // seconds
};

/**
 * Transition duration for transitions
 * Reduced motion: near-instant, Normal motion: normal duration
 */
export const getTransitionDuration = (reducedMotion: boolean): number => {
    return reducedMotion ? 0.01 : 0.2; // seconds
};
