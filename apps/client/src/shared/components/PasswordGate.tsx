import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

interface PasswordGateProps {
    slug: string;
    onUnlock: () => void;
    isLocked: boolean;
    title?: string;
}

/**
 * Password Gate Component
 * Provides an accessible, mobile-responsive lock screen for protected content
 */
export function PasswordGate({ slug, onUnlock, isLocked, title = "Protected Case Study" }: PasswordGateProps) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const unlocked = sessionStorage.getItem(`case-study-${slug}-unlocked`);
        if (unlocked === "true") {
            onUnlock();
        }
        setIsLoaded(true);
    }, [slug, onUnlock]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 500));

        const { verifyPassword } = await import("@/shared/lib/password-utils");

        if (verifyPassword(slug, password)) {
            sessionStorage.setItem(`case-study-${slug}-unlocked`, "true");
            onUnlock();
        } else {
            setError("Incorrect password. Please try again.");
            setPassword("");
            document.getElementById(`password-input-${slug}`)?.focus();
        }

        setIsSubmitting(false);
    }, [slug, password, onUnlock]);

    if (!isLoaded) {
        return null;
    }

    return (
        <AnimatePresence mode="wait">
            {isLocked && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="min-h-screen flex items-center justify-center bg-background px-4"
                    role="main"
                    aria-label="Password required"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full max-w-md"
                    >
                        <div className="flex justify-center mb-8">
                            <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center">
                                <Lock className="w-8 h-8 text-muted-foreground" aria-hidden="true" />
                            </div>
                        </div>

                        <div className="text-center mb-8">
                            <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
                                {title}
                            </h1>
                            <p className="text-muted-foreground text-sm">
                                This case study is password protected
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor={`password-input-${slug}`} className="sr-only">
                                    Password
                                </Label>
                                <Input
                                    id={`password-input-${slug}`}
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    className="text-center"
                                    autoComplete="current-password"
                                    autoFocus
                                    aria-describedby={error ? "password-error" : undefined}
                                    disabled={isSubmitting}
                                />
                                {error && (
                                    <p
                                        id="password-error"
                                        className="text-sm text-destructive flex items-center justify-center gap-2"
                                        role="alert"
                                    >
                                        <AlertCircle size={14} />
                                        {error}
                                    </p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={!password.trim() || isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <span className="animate-spin">⏳</span>
                                        Verifying...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        Access Case Study
                                        <ArrowRight size={16} />
                                    </span>
                                )}
                            </Button>
                        </form>

                        <p className="text-center text-sm text-muted-foreground mt-8">
                            This case study involved sensitive commercial information. Reach out for a private walkthrough: <a href="mailto:david.phillip@gmail.com" className="text-accent hover:underline font-bold">david.phillip@gmail.com</a>
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export function LockBadge({ className = "" }: { className?: string }) {
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs font-medium ${className}`}>
            <Lock size={12} aria-hidden="true" />
            <span>Private</span>
        </span>
    );
}
