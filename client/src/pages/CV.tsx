import { useState, useEffect, useMemo, useCallback } from "react";
import { FileText, Mail, Linkedin, MapPin, ArrowRight, Star, TrendingUp, Users, Target, Award, Heart, Loader2, Copy, Check } from "lucide-react";
import Header from "@/components/Header";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { pdf } from "@react-pdf/renderer";
import { CVPDF } from "@/components/CVPDF";

export default function CV() {
    const [markdown, setMarkdown] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [pdfLoading, setPdfLoading] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);

    const handlePrint = () => window.print();

    const handleCopy = useCallback(async () => {
        if (!markdown) return;

        try {
            await navigator.clipboard.writeText(markdown);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
            alert('Failed to copy to clipboard. Please try again.');
        }
    }, [markdown]);

    const handleDownloadPDF = useCallback(async () => {
        if (!markdown || pdfLoading) return;

        setPdfLoading(true);
        try {
            const blob = await (pdf(<CVPDF markdown={markdown} /> as any).toBlob() as Promise<Blob>);
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'David_Phillip_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('PDF generation failed:', error);
            alert('Failed to generate PDF. Please try using the Print View option instead.');
        } finally {
            setPdfLoading(false);
        }
    }, [markdown, pdfLoading]);

    useEffect(() => {
        fetch(encodeURI("/docs/DP CV - Download.md"))
            .then((res) => {
                if (!res.ok) throw new Error(`Status: ${res.status}`);
                return res.text();
            })
            .then((text) => {
                setMarkdown(text);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load CV:", err);
                setLoading(false);
                setMarkdown("# Error\nFailed to load CV content. Please try again later.");
            });
    }, []);

    const MarkdownRenderer = ReactMarkdown as any;

    const components = {
        h1: ({ children }: { children: React.ReactNode }) => (
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-2">
                {children}
            </h1>
        ),
        h2: ({ children }: { children: React.ReactNode }) => (
            <h2 className="font-display text-2xl font-bold text-foreground mt-16 mb-8 flex items-center gap-4">
                <span className="text-foreground tracking-tight whitespace-nowrap">{children}</span>
                <span className="flex-1 border-b border-border/60"></span>
                <span className="uppercase tracking-[0.2em] text-[10px] font-bold py-1 px-3 bg-secondary/50 rounded text-muted-foreground whitespace-nowrap">Section</span>
            </h2>
        ),
        h3: ({ children }: { children: React.ReactNode }) => {
            const content = typeof children === 'string' ? children :
                Array.isArray(children) ? children.map(c => typeof c === 'string' ? c : '').join('') : '';

            if (content.includes('|')) {
                const parts = content.split('|').map(p => p.trim());
                if (parts.length >= 2) {
                    const date = parts.pop();
                    const mainInfo = parts.join(' | ');
                    return (
                        <h3 className="group flex items-center gap-3 font-display text-xl font-bold text-foreground mt-12 first:mt-10 mb-2 w-full">
                            <div className="w-1.5 h-6 bg-accent rounded-full opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between w-full gap-2">
                                <span className="flex-1 tracking-tight text-foreground font-semibold uppercase text-lg">{mainInfo}</span>
                                <span className="text-sm md:text-base font-sans font-medium text-foreground whitespace-nowrap">{date}</span>
                            </div>
                        </h3>
                    );
                }
            }

            return (
                <h3 className="group flex items-center gap-3 font-display text-xl font-bold text-foreground mt-10 mb-4 uppercase tracking-tight">
                    <div className="w-1.5 h-6 bg-accent rounded-full opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    {children}
                </h3>
            );
        },
        p: ({ children }: { children: React.ReactNode }) => (
            <p className="font-sans text-foreground leading-relaxed mb-4 text-base md:text-[17px] font-normal">
                {children}
            </p>
        ),
        em: ({ children }: { children: React.ReactNode }) => (
            <em className="block font-sans text-sm md:text-base text-foreground/60 italic mb-4 leading-normal font-medium">
                {children}
            </em>
        ),
        ul: ({ children }: { children: React.ReactNode }) => (
            <ul className="list-none space-y-1 mb-8 pl-0">
                {children}
            </ul>
        ),
        li: ({ children }: { children: React.ReactNode }) => (
            <li className="flex items-start gap-3 text-foreground mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-accent/60 mt-2 flex-shrink-0" />
                <span className="font-sans text-[15px] md:text-base leading-normal font-normal">{children}</span>
            </li>
        ),
        hr: () => <hr className="border-border/40 my-10" />,
        table: ({ children }: { children: React.ReactNode }) => (
            <div className="overflow-x-auto my-8 border rounded-lg border-border">
                <table className="w-full border-collapse">
                    {children}
                </table>
            </div>
        ),
        th: ({ children }: { children: React.ReactNode }) => {
            const isPeriod = typeof children === 'string' && children.toLowerCase().includes('period');
            return (
                <th className={`bg-secondary/30 px-4 py-4 text-left font-bold border-b border-border text-foreground uppercase tracking-wider text-xs ${isPeriod ? 'min-w-[140px]' : ''}`}>
                    {children}
                </th>
            );
        },
        td: ({ children }: { children: React.ReactNode }) => {
            const content = typeof children === 'string' ? children : '';
            // Basic check for date formats like "2016-17" or "2008-13"
            const isDate = /^\d{4}/.test(content.trim());
            return (
                <td className={`px-4 py-3 border-b border-border/40 text-foreground text-sm leading-relaxed last:border-0 font-medium ${isDate ? 'whitespace-nowrap' : ''}`}>
                    {children}
                </td>
            );
        },
        strong: ({ children }: { children: React.ReactNode }) => (
            <strong className="text-foreground font-bold">{children}</strong>
        )
    };

    // Parse markdown into sections for advanced layout
    const renderedContent = useMemo(() => {
        if (!markdown) return null;

        // Split by ## headers
        const parts = markdown.split(/\n(?=## )/);
        const headerSection = parts[0];
        const sections = parts.slice(1);

        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <article className="prose prose-neutral dark:prose-invert max-w-none 
                    prose-h1:font-display prose-h1:font-bold prose-h1:tracking-tighter
                    prose-p:text-foreground prose-li:text-foreground
                    prose-strong:text-foreground prose-strong:font-bold
                    prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                ">
                    {/* Premium Editorial Header Orchestration */}
                    <div className="mb-20 pb-16 border-b border-border/60">
                        <div className="header-layout">
                            <MarkdownRenderer
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    ...components,
                                    h1: ({ children }: { children: React.ReactNode }) => (
                                        <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tighter text-foreground mb-4 leading-tight">
                                            {children}
                                        </h1>
                                    ),
                                    p: ({ children, ...props }: any) => {
                                        const text = typeof children === 'string' ? children : '';
                                        // Detect contact line (London, UK | LinkedIn...)
                                        if (text.includes('|') && (text.includes('LinkedIn') || text.includes('@'))) {
                                            return (
                                                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 py-4 border-y border-border/30 text-xs md:text-sm font-bold uppercase tracking-widest text-foreground/80">
                                                    {text.split('|').map((part: string, i: number) => {
                                                        const trimmedPart = part.trim();
                                                        // Check if this part contains a markdown link
                                                        const linkMatch = trimmedPart.match(/\[([^\]]+)\]\(([^)]+)\)/);
                                                        if (linkMatch) {
                                                            const linkText = linkMatch[1];
                                                            const linkUrl = linkMatch[2];
                                                            return (
                                                                <span key={i} className="flex items-center gap-2">
                                                                    {i > 0 && <span className="text-accent">•</span>}
                                                                    <a
                                                                        href={linkUrl}
                                                                        className="text-accent hover:underline"
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        {linkText}
                                                                    </a>
                                                                </span>
                                                            );
                                                        }
                                                        return (
                                                            <span key={i} className="flex items-center gap-2">
                                                                {i > 0 && <span className="text-accent">•</span>}
                                                                {trimmedPart}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            );
                                        }
                                        // Detect the role/title line (Head of Design | ...)
                                        if (text.includes('|') && text.includes('Head of')) {
                                            return (
                                                <p className="font-display text-xl md:text-2xl font-bold text-accent tracking-tight mb-2">
                                                    {children}
                                                </p>
                                            );
                                        }
                                        // Standard summary paragraph
                                        return (
                                            <p className="font-sans text-foreground leading-relaxed mt-6 text-lg md:text-xl font-medium max-w-3xl">
                                                {children}
                                            </p>
                                        );
                                    }
                                }}
                            >
                                {headerSection}
                            </MarkdownRenderer>
                        </div>
                    </div>

                    {sections.map((section, idx) => {
                        // Detect Core Capabilities for special layout
                        if (section.trim().startsWith("## Core Capabilities")) {
                            const titleMatch = section.match(/^## (.*?)\n/);
                            const title = titleMatch ? titleMatch[1] : "Core Capabilities";
                            const content = section.replace(/^## .*?\n+/, "");

                            // Split sub-blocks (typically starting with **Title**)
                            const subBlocks = content.split(/\n\n(?=\*\*)/);

                            return (
                                <section key={idx} className="break-inside-avoid mt-16">
                                    <h2 className="font-display text-2xl font-bold text-foreground mb-10 flex items-center gap-4">
                                        <span className="text-foreground tracking-tight whitespace-nowrap">{title}</span>
                                        <span className="flex-1 border-b border-border/60"></span>
                                        <span className="uppercase tracking-[0.2em] text-[10px] font-bold py-1 px-3 bg-secondary rounded text-muted-foreground whitespace-nowrap">Expertise</span>
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                                        {subBlocks.map((block, sIdx) => (
                                            <div key={sIdx} className="capability-block">
                                                <MarkdownRenderer remarkPlugins={[remarkGfm]} components={components}>
                                                    {block}
                                                </MarkdownRenderer>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            );
                        }

                        // Normal section rendering
                        return (
                            <div key={idx} className="break-inside-avoid">
                                <MarkdownRenderer remarkPlugins={[remarkGfm]} components={components}>
                                    {section}
                                </MarkdownRenderer>
                            </div>
                        );
                    })}
                </article>
                <footer className="mt-24 pt-10 border-t border-border no-print">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Updated January 2026</p>
                    </div>
                </footer>
            </div>
        );
    }, [markdown]);

    return (
        <>
            <div className="no-print">
                <Header />
            </div>
            <style>{`
        @media print { 
            .no-print { display: none !important; } 
            header, nav { display: none !important; }
            .break-inside-avoid { break-inside: avoid; } 
            body { background: white !important; color: #000 !important; font-family: 'Montserrat', sans-serif !important; margin: 0 !important; padding: 0 !important; font-size: 11pt; } 
            .cv-page-wrapper { padding-top: 0 !important; margin-top: 0 !important; }
            .cv-container { max-width: 100% !important; width: 100% !important; padding: 0 !important; margin: 0 !important; font-family: 'Montserrat', sans-serif !important; } 
            .prose { max-width: none !important; color: #000 !important; font-family: 'Montserrat', sans-serif !important; font-size: 10.5pt !important; line-height: 1.4 !important; }
            .prose p, .prose li { margin-bottom: 0.4rem !important; }
            a { text-decoration: none !important; color: #000 !important; }
            .prose h1 { font-size: 28pt !important; margin-bottom: 0.5rem !important; margin-top: 0 !important; }
            .prose h2 { font-size: 18pt !important; margin-top: 1.5rem !important; margin-bottom: 0.8rem !important; }
            .prose h3 { font-size: 14pt !important; margin-top: 1.2rem !important; margin-bottom: 0.4rem !important; }
            .header-layout { margin-bottom: 1.5rem !important; padding-bottom: 1rem !important; }
            ul { margin-bottom: 1rem !important; }
            table { border-collapse: collapse !important; width: 100% !important; font-size: 9pt !important; }
            th, td { border: 1px solid #eee !important; padding: 6px !important; }
            section { page-break-inside: avoid !important; margin-top: 1rem !important; }
            footer { border-top: 1px solid #eee !important; margin-top: 1.5rem !important; padding-top: 0.5rem !important; }
        }
        @page { margin: 1.2cm; }
        .prose-container { position: relative; }
        .cv-page-wrapper { font-family: 'Montserrat', sans-serif !important; line-height: 1.6; }
        .cv-page-wrapper * { font-family: 'Montserrat', sans-serif !important; }
      `}</style>
            <div className="min-h-screen bg-background pt-24 cv-page-wrapper">
                <div className="container max-w-5xl py-12 cv-container">
                    <div className="flex justify-end mb-12 no-print gap-4">
                        <button
                            onClick={handleCopy}
                            disabled={!markdown}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-foreground border border-border rounded-full hover:shadow-lg hover:bg-secondary/80 transition-all font-sans text-xs font-bold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 min-w-[140px] justify-center"
                            aria-label="Copy to clipboard"
                        >
                            {copied ? (
                                <><Check size={16} /> Copied!</>
                            ) : (
                                <><Copy size={16} /> Copy</>
                            )}
                        </button>
                        <button
                            onClick={handleDownloadPDF}
                            disabled={!markdown || pdfLoading}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:shadow-lg transition-all font-sans text-xs font-bold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 min-w-[180px] justify-center"
                            aria-label="Download PDF"
                        >
                            {pdfLoading ? (
                                <><Loader2 size={16} className="animate-spin" /> Generating...</>
                            ) : (
                                <><FileText size={16} /> Download PDF</>
                            )}
                        </button>
                    </div>

                    <div className="max-w-4xl mx-auto bg-background px-4 md:px-0">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-32 gap-6">
                                <Loader2 className="w-10 h-10 animate-spin text-accent" />
                                <p className="text-muted-foreground font-sans text-xs uppercase tracking-[0.3em] animate-pulse">Designing Professional Identity...</p>
                            </div>
                        ) : renderedContent}
                    </div>
                </div>
            </div>
        </>
    );
}
