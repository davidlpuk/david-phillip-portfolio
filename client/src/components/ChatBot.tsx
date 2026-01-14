import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, X, Sparkles, WifiOff, User } from 'lucide-react';
import type { Message } from './chat/types';
import { CHAT_API_URL, suggestedQuestions } from './chat/types';
import { createWelcomeMessage } from './chat/welcomeMessage';
import { MessageBubble } from './chat/MessageBubble';

// Memoized typing indicator to avoid re-renders
const TypingIndicator = React.memo(function TypingIndicator() {
    return (
        <div className="flex gap-3">
            <img
                src="/images/avatar.png"
                alt="David"
                className="w-8 h-8 object-cover rounded-full flex-shrink-0 ring-1 ring-border"
                loading="lazy"
            />
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 border border-border/50">
                <p className="text-xs text-muted-foreground mb-2">David is typing...</p>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
            </div>
        </div>
    );
});

export const ChatBot = React.memo(function ChatBot({ onClose, context, isPanel = false }: { onClose?: () => void; context?: string; isPanel?: boolean }) {
    const [messages, setMessages] = useState<Message[]>([createWelcomeMessage(context)]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [connectionError, setConnectionError] = useState<string | null>(null);
    const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const mainScrollRef = useRef<number>(0);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (copyTimeoutRef.current) {
                clearTimeout(copyTimeoutRef.current);
            }
        };
    }, []);

    const scrollToBottom = useCallback(() => {
        // Only scroll to bottom if there are messages (after initial load)
        if (messages.length > 1) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages.length]);

    useEffect(() => {
        // Scroll to bottom only when new messages are added
        if (messages.length > 1) {
            scrollToBottom();
        }
    }, [messages, scrollToBottom]);

    // Auto-resize textarea dynamically
    useEffect(() => {
        if (textareaRef.current) {
            // Reset height to auto to get accurate scrollHeight
            textareaRef.current.style.height = 'auto';
            // Calculate new height with proper padding consideration
            // scrollHeight includes padding, so we get the full content height
            const scrollHeight = textareaRef.current.scrollHeight;
            const newHeight = Math.max(56, Math.min(scrollHeight, 200)); // min 56px (increased from 48px), max 200px
            textareaRef.current.style.height = `${newHeight}px`;
        }
    }, [input]);

    // Check connection on mount
    useEffect(() => {
        let isMounted = true;
        const checkConnection = async () => {
            try {
                const response = await fetch(`${CHAT_API_URL}/health`);
                if (isMounted && response.ok) {
                    setIsConnected(true);
                    setConnectionError(null);
                } else if (isMounted) {
                    setIsConnected(false);
                    setConnectionError('Server responded with error');
                }
            } catch {
                if (isMounted) {
                    setIsConnected(false);
                    setConnectionError('Cannot connect to chat server. Make sure Ollama and the server are running.');
                }
            }
        };

        checkConnection();
        return () => { isMounted = false; };
    }, []);

    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim() || isLoading) return;

        // Save main scroll position
        mainScrollRef.current = window.scrollY;

        const userMessage: Message = { role: 'user', content: content.trim(), timestamp: Date.now() };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setIsTyping(true);

        try {
            const response = await fetch(`${CHAT_API_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: content.trim(),
                    conversationId,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const data = await response.json();

            if (!conversationId) {
                setConversationId(data.conversationId);
            }

            setIsTyping(false);

            const assistantMessage: Message = {
                role: 'assistant',
                content: data.response,
                timestamp: Date.now(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
            setConnectionError(null);
        } catch {
            setIsTyping(false);
            console.error('Chat error:');
            setConnectionError('Connection lost. Please check if Ollama is running.');
            const errorMessage: Message = {
                role: 'assistant',
                content: `I apologise, but I'm experiencing some technical difficulties. Please try again later.`,
                timestamp: Date.now(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [conversationId, isLoading]);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    }, [input, sendMessage]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (input.trim()) {
                sendMessage(input);
            }
        }
    }, [input, sendMessage]);

    const handleCopy = useCallback((content: string) => {
        setCopiedMessageId(Date.now());
        if (copyTimeoutRef.current) {
            clearTimeout(copyTimeoutRef.current);
        }
        copyTimeoutRef.current = setTimeout(() => setCopiedMessageId(null), 2000);
    }, []);

    const clearChat = useCallback(() => {
        setMessages([createWelcomeMessage()]);
        setConversationId(null);
    }, []);

    // Memoize message items to prevent unnecessary re-renders
    const messageElements = React.useMemo(() =>
        messages.map((message, index) => (
            <div
                key={index}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
                {/* Avatar */}
                {message.role === 'assistant' ? (
                    <img
                        src="/images/avatar.png"
                        alt="David"
                        className="w-8 h-8 object-cover rounded-full flex-shrink-0 ring-1 ring-border mt-1"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full flex-shrink-0 ring-1 ring-border mt-1 bg-muted flex items-center justify-center">
                        <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                )}

                <MessageBubble
                    message={message}
                    onCopy={handleCopy}
                    showActions={message.role === 'assistant'}
                    showCTA={false}
                />
            </div>
        )),
        [messages, handleCopy]
    );

    const suggestedQuestionsElements = React.useMemo(() =>
        suggestedQuestions.map((question, index) => (
            <button
                key={index}
                onClick={() => sendMessage(`What's ${question.text}?`)}
                disabled={isLoading || isTyping}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/60 hover:bg-muted border border-border/50 hover:border-primary/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-xs text-muted-foreground hover:text-foreground"
            >
                <span className="group-hover:scale-110 transition-transform duration-200">{question.icon}</span>
                <span>{question.text}</span>
            </button>
        )),
        [isLoading, isTyping, sendMessage]
    );

    const shouldShowSuggestions = messages.length <= 2;

    return (
        <div className={`flex flex-col ${isPanel ? 'h-full' : 'h-[calc(100vh-120px)] max-h-[85vh] md:max-h-[80vh] md:h-[700px]'} bg-gradient-to-b from-background to-muted/10 ${isPanel ? 'rounded-none border-0' : 'rounded-3xl border border-border/50 shadow-xl'} overflow-hidden`}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-background/95 to-muted/20 backdrop-blur-sm border-b border-border/50">
                <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 flex-shrink-0">
                        <img
                            src="/images/avatar.png"
                            alt="David"
                            className="w-8 h-8 object-cover rounded-full ring-2 ring-primary/10"
                            loading="lazy"
                        />
                        <div
                            className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${isConnected ? 'bg-accent' : 'bg-muted-foreground'}`}
                            title={isConnected ? 'Connected' : 'Disconnected'}
                        />
                    </div>
                    <div>
                        <h3 className="font-bold text-base md:text-lg text-foreground">David's AI Assistant</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-accent" />
                            Executive Assistant • 24 years expertise
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-accent/50 rounded-lg transition-all duration-200 hover:scale-105"
                        aria-label="Close chat"
                    >
                        <X className="w-5 h-5 text-foreground" />
                    </button>
                </div>
            </div>

            {/* Connection Error Banner */}
            {connectionError && (
                <div className="px-4 md:px-6 py-3 bg-muted/80 backdrop-blur-sm border-b border-border text-muted-foreground text-sm flex items-center gap-2.5">
                    <WifiOff className="w-4 h-4 flex-shrink-0" />
                    {connectionError}
                </div>
            )}

            {/* Messages */}
            <div
                className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-6 space-y-5 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
            >
                {messageElements}

                {/* Improved Typing Indicator */}
                {(isLoading || isTyping) && <TypingIndicator />}

                <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {shouldShowSuggestions && (
                <div className="px-4 py-3 border-t bg-gradient-to-b from-transparent to-muted/10">
                    <div className="flex flex-wrap gap-2">
                        {suggestedQuestionsElements}
                    </div>
                </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t bg-background/50 backdrop-blur-sm">
                <div className="relative">
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={isConnected ? "Ask about David's leadership, business impact, or availability..." : "Server not connected..."}
                        className="w-full px-4 py-3 pr-12 rounded-xl border border-border/50 bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-200 text-base placeholder:text-muted-foreground/60 resize-none overflow-y-auto"
                        style={{ minHeight: '56px', maxHeight: '200px' }}
                        disabled={isLoading || !isConnected}
                        rows={1}
                        aria-label="Chat input"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading || !isConnected}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gradient-to-br from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                        aria-label="Send message"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-center text-xs text-muted-foreground mt-2 opacity-50">
                    Press <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs">Shift+Enter</kbd> for new line • Powered by Ollama • Local & private
                </p>
            </form>
        </div>
    );
});

export default ChatBot;
