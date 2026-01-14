import { useState, useEffect, useCallback } from "react";
import {
    FileText, Save, Download, Eye, EyeOff, RefreshCw, Check, X,
    Wand2, Sparkles, Copy, Palette, Type, Layout, Loader2,
    ChevronDown, ChevronUp, Trash2, Plus, GripVertical
} from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import { CVPDF } from "@/components/CVPDF";

/**
 * 🔒 SECRET CV LAB
 * Hidden tool for David to edit and manage his CV
 * Access: /cv-lab (not linked anywhere)
 */

interface CVSection {
    id: string;
    type: 'header' | 'summary' | 'experience' | 'skills' | 'education' | 'personal' | 'table';
    title: string;
    content: string;
    collapsed: boolean;
}

const defaultSections: CVSection[] = [
    { id: 'header', type: 'header', title: 'Header', content: '# David Phillip\n\n**Head of Design | AI-Native Design Leader | Fintech & SaaS | London**\nLondon, UK | [LinkedIn](https://www.linkedin.com/in/davidphillip/) | david.phillip@gmail.com', collapsed: false },
    { id: 'summary', type: 'summary', title: 'Professional Summary', content: 'Design leader with 20+ years in financial services and SaaS, now operating as an **AI-native practitioner** who orchestrates design, research, and engineering into unified delivery systems.\n\nI don\'t just use AI tools—I design workflows that compress discovery-to-delivery cycles, enabling small teams to ship faster without sacrificing quality or governance. My edge is **orchestration**: knowing what to build, why it matters, and how to get it shipped properly.', collapsed: true },
    { id: 'capabilities', type: 'skills', title: 'Core Capabilities', content: '## Core Capabilities\n\n**AI-Augmented Design Practice**\n- Operationalise AI across research synthesis, prototyping, and documentation\n- Build AI-powered workflows that accelerate insight-to-shipping cycles\n- Evaluate and implement emerging tools while maintaining craft standards', collapsed: true },
    { id: 'experience', type: 'experience', title: 'Professional Experience', content: '## Professional Experience\n\n### Head of UX – Product Design | Cognism | Jul 2022 – Jun 2024\n*B2B SaaS scale-up, sales intelligence platform*\n\nLed Product Design function covering Design and DesignOps. Partnered with Product and Engineering to execute strategic initiatives during a period of rapid growth.', collapsed: true },
];

export default function CVLab() {
    const [sections, setSections] = useState<CVSection[]>(defaultSections);
    const [markdown, setMarkdown] = useState<string>("");
    const [liveMarkdown, setLiveMarkdown] = useState<string>("");
    const [showPreview, setShowPreview] = useState<boolean>(true);
    const [pdfLoading, setPdfLoading] = useState<boolean>(false);
    const [saved, setSaved] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<'visual' | 'raw'>('visual');
    const [loadingCV, setLoadingCV] = useState<boolean>(true);

    // Load existing CV markdown on mount
    useEffect(() => {
        fetch(encodeURI("/docs/DP CV - Download.md"))
            .then((res) => {
                if (!res.ok) throw new Error(`Status: ${res.status}`);
                return res.text();
            })
            .then((text) => {
                setMarkdown(text);
                setLiveMarkdown(text);
                setLoadingCV(false);
            })
            .catch((err) => {
                console.error("Failed to load CV:", err);
                setLoadingCV(false);
            });
    }, []);

    // Generate PDF
    const handleDownloadPDF = useCallback(async () => {
        if (!liveMarkdown || pdfLoading) return;

        setPdfLoading(true);
        try {
            const blob = await (pdf(<CVPDF markdown={liveMarkdown} /> as any).toBlob() as Promise<Blob>);
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
            alert('Failed to generate PDF.');
        } finally {
            setPdfLoading(false);
        }
    }, [liveMarkdown, pdfLoading]);

    // Copy markdown to clipboard
    const handleCopyMarkdown = useCallback(() => {
        navigator.clipboard.writeText(liveMarkdown);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }, [liveMarkdown]);

    // Save to file (opens download)
    const handleSaveMarkdown = useCallback(() => {
        const blob = new Blob([liveMarkdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'DP CV - Download.md';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [liveMarkdown]);

    if (loadingCV) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 animate-spin text-accent" />
                    <p className="text-muted-foreground font-mono text-sm">Loading CV Lab...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            {/* Secret Header */}
            <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
                <div className="container max-w-7xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                                <Wand2 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="font-bold text-lg tracking-tight">CV Lab</h1>
                                <p className="text-xs text-zinc-500 font-mono">🔒 Secret Editor</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowPreview(!showPreview)}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${showPreview ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'
                                    }`}
                            >
                                {showPreview ? <Eye size={16} /> : <EyeOff size={16} />}
                                Preview
                            </button>

                            <div className="w-px h-6 bg-zinc-800" />

                            <button
                                onClick={handleCopyMarkdown}
                                className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-all flex items-center gap-2"
                            >
                                {saved ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                                {saved ? 'Copied!' : 'Copy'}
                            </button>

                            <button
                                onClick={handleSaveMarkdown}
                                className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-all flex items-center gap-2"
                            >
                                <Save size={16} />
                                Save .md
                            </button>

                            <button
                                onClick={handleDownloadPDF}
                                disabled={pdfLoading}
                                className="px-4 py-2 rounded-lg text-sm font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
                            >
                                {pdfLoading ? (
                                    <><Loader2 size={16} className="animate-spin" /> Generating...</>
                                ) : (
                                    <><Download size={16} /> Export PDF</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container max-w-7xl mx-auto px-4 py-6">
                <div className={`grid gap-6 ${showPreview ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {/* Editor Panel */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <button
                                onClick={() => setActiveTab('visual')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'visual'
                                        ? 'bg-zinc-800 text-zinc-100'
                                        : 'text-zinc-500 hover:text-zinc-300'
                                    }`}
                            >
                                <Layout size={16} className="inline mr-2" />
                                Visual
                            </button>
                            <button
                                onClick={() => setActiveTab('raw')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'raw'
                                        ? 'bg-zinc-800 text-zinc-100'
                                        : 'text-zinc-500 hover:text-zinc-300'
                                    }`}
                            >
                                <Type size={16} className="inline mr-2" />
                                Raw Markdown
                            </button>
                        </div>

                        {activeTab === 'raw' ? (
                            <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
                                <div className="p-3 border-b border-zinc-800 flex items-center justify-between">
                                    <span className="text-xs font-mono text-zinc-500">DP CV - Download.md</span>
                                    <span className="text-xs text-zinc-600">{liveMarkdown.length} chars</span>
                                </div>
                                <textarea
                                    value={liveMarkdown}
                                    onChange={(e) => setLiveMarkdown(e.target.value)}
                                    className="w-full h-[calc(100vh-280px)] p-4 bg-transparent text-zinc-100 font-mono text-sm resize-none focus:outline-none"
                                    spellCheck={false}
                                />
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="p-4 rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 text-center">
                                    <Sparkles className="w-8 h-8 text-violet-400 mx-auto mb-2" />
                                    <p className="text-sm text-zinc-400">
                                        Visual editor coming soon. Use <span className="text-violet-400 font-mono">Raw Markdown</span> tab for now.
                                    </p>
                                </div>

                                <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900">
                                    <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                                        <Palette size={16} className="text-fuchsia-400" />
                                        Quick Actions
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button className="p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-all text-left">
                                            <span className="text-xs font-mono text-zinc-400">Add Section</span>
                                            <p className="text-sm text-zinc-200 mt-1">+ Experience</p>
                                        </button>
                                        <button className="p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-all text-left">
                                            <span className="text-xs font-mono text-zinc-400">Add Section</span>
                                            <p className="text-sm text-zinc-200 mt-1">+ Skills</p>
                                        </button>
                                        <button className="p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-all text-left">
                                            <span className="text-xs font-mono text-zinc-400">Template</span>
                                            <p className="text-sm text-zinc-200 mt-1">Job Entry</p>
                                        </button>
                                        <button className="p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-all text-left">
                                            <span className="text-xs font-mono text-zinc-400">AI Assist</span>
                                            <p className="text-sm text-zinc-200 mt-1">Enhance Copy</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Preview Panel */}
                    {showPreview && (
                        <div className="rounded-xl border border-zinc-800 bg-white overflow-hidden">
                            <div className="p-3 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
                                <span className="text-xs font-mono text-zinc-500">Live Preview</span>
                                <span className="text-xs text-zinc-400">PDF Output</span>
                            </div>
                            <div className="p-6 h-[calc(100vh-280px)] overflow-auto">
                                <div className="prose prose-sm max-w-none text-zinc-900">
                                    {liveMarkdown.split('\n').map((line, i) => {
                                        if (line.startsWith('# ')) {
                                            return <h1 key={i} className="text-2xl font-bold mb-2">{line.replace('# ', '')}</h1>;
                                        }
                                        if (line.startsWith('## ')) {
                                            return <h2 key={i} className="text-lg font-bold mt-6 mb-3 text-zinc-800">{line.replace('## ', '')}</h2>;
                                        }
                                        if (line.startsWith('### ')) {
                                            return <h3 key={i} className="text-sm font-bold mt-4 mb-1 text-zinc-700">{line.replace('### ', '')}</h3>;
                                        }
                                        if (line.startsWith('- ')) {
                                            return <li key={i} className="text-xs text-zinc-600 ml-4">{line.replace('- ', '')}</li>;
                                        }
                                        if (line.startsWith('**') && line.endsWith('**')) {
                                            return <p key={i} className="text-sm font-semibold text-zinc-700">{line.replace(/\*\*/g, '')}</p>;
                                        }
                                        if (line.trim() === '') {
                                            return <div key={i} className="h-2" />;
                                        }
                                        return <p key={i} className="text-xs text-zinc-600 leading-relaxed">{line}</p>;
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-sm p-3">
                <div className="container max-w-7xl mx-auto flex items-center justify-between text-xs text-zinc-600">
                    <span className="font-mono">🔒 CV Lab v1.0 • For David's eyes only</span>
                    <span className="font-mono">Last synced: {new Date().toLocaleTimeString()}</span>
                </div>
            </footer>
        </div>
    );
}
