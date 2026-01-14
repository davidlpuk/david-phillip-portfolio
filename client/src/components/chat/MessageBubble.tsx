import React, { useState, useCallback, memo } from 'react';
import { MoreVertical, Copy, Check, Trash2, Calendar } from 'lucide-react';
import type { Message } from './types';
import { MarkdownContent } from './MarkdownContent';

interface MessageBubbleProps {
    message: Message;
    onCopy: (content: string) => void;
    showActions: boolean;
    showCTA?: boolean;
}

export const MessageBubble = memo(function MessageBubble({ message, onCopy, showActions, showCTA }: MessageBubbleProps) {
    const [copied, setCopied] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(message.content);
        setCopied(true);
        setShowMenu(false);
        onCopy(message.content);
        setTimeout(() => setCopied(false), 2000);
    }, [message.content, onCopy]);

    return (
        <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'} max-w-[75%]`}>
            <div className={`relative group px-5 py-4 ${message.role === 'user'
                ? 'bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-2xl rounded-tr-sm text-left'
                : 'bg-gradient-to-b from-card to-card/80 border border-border/50 text-card-foreground rounded-2xl rounded-tl-sm shadow-sm text-left'
                }`}>
                <div className="text-sm leading-normal text-left chat-message">
                    <MarkdownContent content={message.content} />
                </div>

                {/* Action buttons - only show for assistant messages */}
                {message.role === 'assistant' && showActions && (
                    <div className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="relative">
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="p-1.5 rounded-lg bg-background/90 backdrop-blur-sm border border-border/50 shadow-sm hover:bg-accent transition-colors"
                            >
                                <MoreVertical className="w-3.5 h-3.5 text-muted-foreground" />
                            </button>

                            {showMenu && (
                                <div className="absolute right-0 top-full mt-1 bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg shadow-lg py-1 min-w-[100px] z-10">
                                    <button
                                        onClick={handleCopy}
                                        className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent w-full text-left transition-colors"
                                    >
                                        {copied ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
                                        {copied ? 'Copied!' : 'Copy'}
                                    </button>
                                    <button
                                        onClick={() => setShowMenu(false)}
                                        className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent w-full text-left transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        Clear chat
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            
            {/* CTA Button - Book a Call */}
            {showCTA && message.role === 'assistant' && (
                <a
                    href="mailto:david@phillip.design"
                    className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
                >
                    <Calendar className="w-4 h-4" />
                    Book a 30-min call with David
                </a>
            )}
            
            <span className="text-xs text-muted-foreground mt-1.5 px-1 opacity-60">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
        </div>
    );
});
