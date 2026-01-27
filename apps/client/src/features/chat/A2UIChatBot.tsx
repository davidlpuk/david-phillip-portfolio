import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, X, Sparkles, WifiOff, User } from 'lucide-react';
import { CHAT_API_URL } from './types';
import { A2UIMessage, A2UIComponent } from './a2ui-types';
import { A2UIRenderer } from './A2UIRenderer';
// import { createWelcomeMessage } from './welcomeMessage'; // Need to adapt this or create a new one

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

export const A2UIChatBot = React.memo(function A2UIChatBot({ onClose, context, isPanel = false }: { onClose?: () => void; context?: string; isPanel?: boolean }) {
    // Initial welcome message needs to be A2UI compatible
    const [messages, setMessages] = useState<A2UIMessage[]>([{
        role: 'assistant',
        content: {
            type: 'text',
            props: {
                content: "Hi there! I'm David's AI assistant. I can help you navigate his portfolio, answer questions about his experience, or even schedule a call. How can I help you today?"
            }
        },
        timestamp: Date.now()
    }]);

    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [connectionError, setConnectionError] = useState<string | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const scrollToBottom = useCallback(() => {
        if (messages.length > 0) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages.length]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    // Auto-resize textarea dynamically
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            const scrollHeight = textareaRef.current.scrollHeight;
            const newHeight = Math.max(56, Math.min(scrollHeight, 200));
            textareaRef.current.style.height = `${newHeight} px`;
        }
    }, [input]);

    // Check connection on mount
    useEffect(() => {
        let isMounted = true;
        const checkConnection = async () => {
            try {
                const response = await fetch(`${CHAT_API_URL}/health`);
                if (isMounted) {
                    if (response.ok) {
                        setIsConnected(true);
                        setConnectionError(null);
                    } else {
                        setIsConnected(false);
                        setConnectionError(`Status: ${response.status}`);
                    }
                }
            } catch (err: any) {
                if (isMounted) {
                    setIsConnected(false);
                    setConnectionError(`Connection failed: ${err.message || 'Unknown error'}`);
                }
            }
        };

        checkConnection();
        return () => { isMounted = false; };
    }, []);

    const sendMessage = useCallback(async (content: string | any) => {
        if ((typeof content === 'string' && !content.trim()) || isLoading) return;

        let userMessageContent: A2UIComponent;

        if (typeof content === 'string') {
            userMessageContent = {
                type: 'text',
                props: { content: content.trim() }
            };
        } else {
            // It's a form submission object
            userMessageContent = {
                type: 'box',
                props: { className: "bg-primary/10 border-primary/20" },
                children: Object.entries(content).map(([key, value]) => ({
                    type: 'text',
                    props: { content: `${key}: ${value}`, className: "text-xs opacity-70" }
                }))
            };
        }

        const userMessage: A2UIMessage = {
            role: 'user',
            content: userMessageContent,
            timestamp: Date.now()
        };

        setMessages((prev) => [...prev, userMessage]);
        if (typeof content === 'string') setInput('');
        setIsLoading(true);
        setIsTyping(true);

        try {
            const response = await fetch(`${CHAT_API_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: content,
                    conversationId,
                    mode: 'a2ui'
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

            // Expecting data.response to be an object (A2UI component) or string (fallback)
            let responseContent: A2UIComponent;
            if (typeof data.response === 'string') {
                // Legacy fallback
                responseContent = { type: 'text', props: { content: data.response } };
            } else {
                responseContent = data.response;
            }

            const assistantMessage: A2UIMessage = {
                role: 'assistant',
                content: responseContent,
                timestamp: Date.now(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
            setConnectionError(null);
        } catch {
            setIsTyping(false);
            console.error('Chat error');
            setConnectionError('Connection lost.');
            const errorMessage: A2UIMessage = {
                role: 'assistant',
                content: { type: 'text', props: { content: "I apologise, but I'm experiencing some technical difficulties." } },
                timestamp: Date.now(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [conversationId, isLoading]);

    const handleAction = useCallback((action: string, payload: any) => {
        if (action === 'sendMessage') {
            sendMessage(payload.message || payload);
        } else {
            console.log('Unknown action:', action, payload);
        }
    }, [sendMessage]);

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

    return (
        <div className={`flex flex-col ${isPanel ? 'h-full' : 'h-[calc(100vh-120px)] max-h-[85vh] md:max-h-[80vh] md:h-[700px]'} bg-gradient-to-b from-background to-muted/10 ${isPanel ? 'rounded-none border-0' : 'rounded-3xl border border-border/50 shadow-xl'} overflow-hidden`}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-background/95 to-muted/20 backdrop-blur-sm border-b border-border/50">
                <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 flex-shrink-0">
                        <img
                            src="/images/finn-avatar.png"
                            alt="Finn"
                            className="w-8 h-8 object-cover rounded-full ring-2 ring-primary/10"
                            loading="lazy"
                        />
                        <div
                            className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${isConnected ? 'bg-accent' : 'bg-muted-foreground'}`}
                            title={isConnected ? 'Connected' : 'Disconnected'}
                        />
                    </div>
                    <div>
                        <h3 className="font-bold text-base md:text-lg text-foreground">Finn AI Assistant</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-accent" />
                            Chatbot helping David
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
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        {/* Avatar */}
                        {message.role === 'assistant' ? (
                            <img
                                src="/images/finn-avatar.png"
                                alt="Finn"
                                className="w-8 h-8 object-cover rounded-full flex-shrink-0 ring-1 ring-border mt-1"
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full flex-shrink-0 ring-1 ring-border mt-1 bg-muted flex items-center justify-center">
                                <User className="w-5 h-5 text-muted-foreground" />
                            </div>
                        )}

                        <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${message.role === 'user'
                            ? 'bg-primary text-primary-foreground rounded-tr-sm'
                            : 'bg-card/80 backdrop-blur-sm border border-border/50 rounded-tl-sm'
                            }`}>
                            {/* Render logic depending on content type */}
                            {typeof message.content === 'string' ? (
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                            ) : (
                                <A2UIRenderer component={message.content} onAction={handleAction} />
                            )}
                        </div>
                    </div>
                ))}

                {(isLoading || isTyping) && <TypingIndicator />}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t bg-background/50 backdrop-blur-sm">
                <div className="relative">
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={isConnected ? "Ask anything..." : "Server not connected..."}
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
            </form>
        </div>
    );
});
