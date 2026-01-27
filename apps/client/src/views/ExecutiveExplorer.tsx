import React, { useState, useEffect } from "react";
// import { Helmet } from "react-helmet"; // Removed as package is missing
import { RECRUITER_QUESTIONS } from "@/features/a2ui/blueprints";
import { A2UIRenderer } from "@/features/a2ui/A2UIRenderer";
import Header from "@/shared/components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Sparkles, TerminalSquare, ArrowRight } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";

export default function ExecutiveExplorer() {
    const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

    useEffect(() => {
        document.title = "Executive Intelligence | David Phillip";
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 pt-32 pb-20">

                {/* Header Section */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-xs font-medium mb-6 border border-border"
                    >
                        <TerminalSquare size={12} />
                        <span>EXECUTIVE INTELLIGENCE INTERFACE v1.0</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold font-serif mb-6"
                    >
                        Strategic Insight Engine
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-muted-foreground leading-relaxed"
                    >
                        This interface uses Agent-to-UI (A2UI) rendering to provide immediate, high-fidelity answers to strategic leadership questions.
                        <br className="hidden md:block" /> Select a query below to generate a real-time executive briefing.
                    </motion.p>
                </div>

                {/* Question Selector (Click-to-Query) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="max-w-5xl mx-auto mb-16"
                >
                    <div className="flex flex-wrap justify-center gap-3">
                        {RECRUITER_QUESTIONS.map((q) => (
                            <button
                                key={q.id}
                                onClick={() => setSelectedQuestion(q.id)}
                                className={`
                                    group relative px-6 py-4 rounded-xl border text-left transition-all duration-300
                                    flex items-center gap-4 hover:-translate-y-1
                                    ${selectedQuestion === q.id
                                        ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105 ring-2 ring-primary/20"
                                        : "bg-card hover:bg-secondary/50 border-border text-foreground hover:border-primary/50 shadow-sm"}
                                `}
                            >
                                <div className={`
                                    w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors
                                    ${selectedQuestion === q.id ? "bg-white/20 text-white" : "bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"}
                                `}>
                                    {selectedQuestion === q.id ? <CheckCircle size={16} /> : <Command size={16} />}
                                </div>
                                <div>
                                    <div className={`text-xs font-semibold uppercase tracking-wider mb-0.5 ${selectedQuestion === q.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                                        {q.label}
                                    </div>
                                    <div className="font-serif font-medium text-sm md:text-base pr-4">
                                        {q.question}
                                    </div>
                                </div>
                                {(selectedQuestion === q.id) && (
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
                                )}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Dynamic Renderer Area */}
                <div className="max-w-4xl mx-auto min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {selectedQuestion ? (
                            <A2UIRenderer key={selectedQuestion} blueprintId={selectedQuestion} />
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center h-64 text-muted-foreground border-2 border-dashed border-border rounded-xl bg-secondary/10"
                            >
                                <Sparkles size={48} className="mb-4 text-muted-foreground/30" />
                                <p className="text-lg">Select a strategic query to initialize the agent.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </main>
        </div>
    );
}

function CheckCircle({ size }: { size: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 6 9 17l-5-5" />
        </svg>
    )
}
