import React, { memo, type ReactNode } from 'react';
import ReactMarkdownRaw from 'react-markdown';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Markdown = ReactMarkdownRaw as any as (props: { children: ReactNode; components?: Record<string, unknown> }) => ReactNode;

// Function to linkify plain emails and URLs (skips already markdown-formatted links)
function linkifyText(text: string): string {
    // Skip if text already contains markdown links
    if (/\[.*?\]\(.*?\)/.test(text)) {
        return text;
    }

    // Email regex
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    // URL regex - matches http/https, www., or domain.com patterns
    const urlRegex = /\b(?:https?:\/\/|www\.|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})(?:[^\s<>"{}|\\^`[\]]*)?/g;

    return text
        .replace(emailRegex, (email) => `[${email}](mailto:${email})`)
        .replace(urlRegex, (url) => {
            // Add https:// if not present
            const fullUrl = url.startsWith('http') ? url : `https://${url}`;
            return `[${url}](${fullUrl})`;
        });
}

// Move components object outside to prevent recreation on each render
const MARKDOWN_COMPONENTS = {
    p: ({ children }: { children: ReactNode }) => <p className="mb-2 last:mb-0 leading-normal text-left">{children}</p>,
    ul: ({ children }: { children: ReactNode }) => <ul className="list-disc ml-4 mb-2 space-y-1 text-left">{children}</ul>,
    ol: ({ children }: { children: ReactNode }) => <ol className="list-decimal ml-4 mb-2 space-y-1 text-left">{children}</ol>,
    li: ({ children }: { children: ReactNode }) => <li className="leading-normal text-left">{children}</li>,
    strong: ({ children }: { children: ReactNode }) => <strong className="font-semibold">{children}</strong>,
    a: ({ href, children }: { href?: string; children: ReactNode }) => (
        <a href={href} className="underline hover:no-underline opacity-90 hover:opacity-100" target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    ),
};

interface MarkdownContentProps {
    content: string;
}

export const MarkdownContent = memo(function MarkdownContent({ content }: MarkdownContentProps) {
    const linkifiedContent = linkifyText(content);
    return (
        <Markdown components={MARKDOWN_COMPONENTS}>
            {linkifiedContent}
        </Markdown>
    );
});
