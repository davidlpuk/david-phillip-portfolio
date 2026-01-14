import { useState, useEffect, useRef, useCallback } from 'react';

export function useScrollProgress(threshold: number = 10) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const lastScrollTime = useRef<number>(0);
    const rafId = useRef<number | null>(null);

    const updateScroll = useCallback(() => {
        const now = Date.now();
        // Throttle scroll updates to ~60fps (16ms)
        if (now - lastScrollTime.current < 16) {
            return;
        }
        lastScrollTime.current = now;

        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
        setScrollProgress(scrollPercent);
        setIsScrolled(scrollTop > threshold);
    }, [threshold]);

    useEffect(() => {
        const handleScroll = () => {
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
            rafId.current = requestAnimationFrame(updateScroll);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        updateScroll(); // Initial check

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, [updateScroll]);

    return { scrollProgress, isScrolled };
}
