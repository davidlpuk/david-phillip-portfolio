import React, { useState, useEffect, useRef } from "react";
// import { Helmet } from "react-helmet"; // Removed
import { RECRUITER_QUESTIONS } from "@/features/a2ui/blueprints";
import { A2UIRenderer } from "@/features/a2ui/A2UIRenderer";
import Header from "@/shared/components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { Send, TerminalSquare, User, Sparkles, ArrowUp } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";

interface Message {
    id: string;
    role: "user" | "agent";
    text: string;
    blueprintId?: string;
}

export default function ExecutiveExplorer() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.title = "Executive Intelligence | David Phillip";
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSendMessage = async (text: string) => {
        if (!text.trim()) return;

        // 1. Add User Message
        const userMsg: Message = { id: Date.now().toString(), role: "user", text };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        // 2. Simulate "Thinking" delay
        setTimeout(() => {
            const lowerText = text.toLowerCase();
            let blueprintId: string | undefined;
            let responseText = "I don't have a specific executive briefing for that yet. Try asking about Scale, Impact, or AI.";

            // Simple Keyword Matcher
            if (lowerText.includes("scale") || lowerText.includes("team") || lowerText.includes("manage")) {
                blueprintId = "scale";
                responseText = "Here is the executive profile regarding team scale and leadership.";
            } else if (lowerText.includes("impact") || lowerText.includes("roi") || lowerText.includes("value")) {
                blueprintId = "impact";
                responseText = "Here is the consolidated impact ledger across major programmes.";
            } else if (lowerText.includes("conflict") || lowerText.includes("stakeholder") || lowerText.includes("difficult")) {
                blueprintId = "conflict";
                responseText = "Here is a breakdown of my conflict resolution methodology using a real example.";
            } else if (lowerText.includes("ai") || lowerText.includes("future") || lowerText.includes("ops")) {
                blueprintId = "ai-strategy";
                responseText = "Here is my operational model for integrating AI into design workflows.";
            } else if (lowerText.includes("legacy") || lowerText.includes("migration") || lowerText.includes("modern")) {
                blueprintId = "legacy";
                responseText = "Here is my track record for complex legacy system transformation.";
            }

            const agentMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "agent",
                text: responseText,
                blueprintId
            };

            setMessages(prev => [...prev, agentMsg]);
            setIsTyping(false);
        }, 1200);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(inputValue);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans">
            <Header />

            {/* Chat History Area */}
            <main className="flex-1 container mx-auto px-4 pt-32 pb-40 max-w-4xl">
                {messages.length === 0 ? (
                    // Empty State
                    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="w-16 h-16 rounded-2xl bg-secondary/30 flex items-center justify-center mb-6 border border-border">
                            <TerminalSquare size={32} className="text-foreground/70" />
                        </div>
                        <h1 className="text-3xl font-bold mb-3 tracking-tight">Executive Intelligence Engine</h1>
                        <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
                            Ask me strategic questions about leadership style, commercial impact, or AI operations.
                        </p>

                        {/* Quick Prompts (Neutral Colors) */}
                        <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
                            {RECRUITER_QUESTIONS.map(q => (
                                <button
                                    key={q.id}
                                    onClick={() => handleSendMessage(q.question)}
                                    className="px-4 py-2 rounded-full bg-secondary/40 hover:bg-secondary text-sm text-foreground/80 transition-colors border border-transparent hover:border-border"
                                >
                                    {q.label}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    // Message Stream
                    <div className="space-y-8">
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                {msg.role === "agent" && (
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 border border-primary/20">
                                        <Sparkles size={14} className="text-primary" />
                                    </div>
                                )}

                                <div className={`max-w-[85%] space-y-4`}>
                                    <div className={`px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                        ? "bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 ml-auto rounded-tr-sm"
                                        : "bg-secondary/40 text-foreground border border-border/50 rounded-tl-sm"
                                        }`}>
                                        {msg.text}
                                    </div>

                                    {/* Inline Blueprint Renderer */}
                                    {msg.blueprintId && (
                                        <div className="mt-2">
                                            <A2UIRenderer blueprintId={msg.blueprintId} />
                                        </div>
                                    )}
                                </div>

                                {msg.role === "user" && (
                                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-1">
                                        <User size={14} className="text-muted-foreground" />
                                    </div>
                                )}
                            </motion.div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex gap-4 justify-start">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 border border-primary/20">
                                    <Sparkles size={14} className="text-primary" />
                                </div>
                                <div className="bg-secondary/40 px-5 py-4 rounded-2xl rounded-tl-sm border border-border/50 flex gap-1 items-center h-[46px]">
                                    <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </main>

            {/* Fixed Bottom Chat Input */}
            <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-background via-background to-transparent z-50">
                <div className="container mx-auto max-w-3xl">
                    <div className="relative shadow-2xl rounded-[2rem] bg-background">
                        <div className="absolute inset-0 bg-primary/5 rounded-[2rem] blur-xl" /> {/* Subtle Glow */}
                        <div className="relative flex items-center bg-card border border-border/50 rounded-[2rem] px-2 py-2 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask about leadership, impact, or strategy..."
                                className="border-0 focus-visible:ring-0 bg-transparent text-base px-6 h-12 shadow-none flex-1"
                            />
                            <Button
                                onClick={() => handleSendMessage(inputValue)}
                                size="icon"
                                className="h-10 w-10 full-rounded shrink-0 rounded-full mr-1"
                                disabled={!inputValue.trim() || isTyping}
                            >
                                <ArrowUp size={18} />
                            </Button>
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium opacity-60">
                            A2UI Powered • Executive Intelligence
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
