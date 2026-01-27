import React, { memo, type ReactNode } from 'react';
import ReactMarkdownRaw from 'react-markdown';
import remarkGfm from 'remark-gfm';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Markdown = ReactMarkdownRaw as any as (props: { children: ReactNode; components?: Record<string, unknown>; remarkPlugins?: any[] }) => ReactNode;

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
    return (
        <Markdown components={MARKDOWN_COMPONENTS} remarkPlugins={[remarkGfm]}>
            {content}
        </Markdown>
    );
});
