import { useState, useEffect, useCallback, useRef } from "react";
import {
  FileText,
  Save,
  Download,
  Eye,
  EyeOff,
  Check,
  X,
  Wand2,
  Sparkles,
  Copy,
  Palette,
  Type,
  Layout,
  Loader2,
  ChevronDown,
  ChevronUp,
  Trash2,
  Plus,
  GripVertical,
  Undo,
  Redo,
  RotateCcw,
  Keyboard,
  Settings,
  History,
  Search,
  Briefcase,
  Target,
  Zap,
} from "lucide-react";

/**
 * 🔒 CAS (Content Administration System)
 * Professional admin tool for editing and managing CV content
 * Access: /admin
 */

interface CVSection {
  id: string;
  type:
  | "header"
  | "summary"
  | "experience"
  | "skills"
  | "education"
  | "personal"
  | "tools";
  title: string;
  content: string;
  collapsed: boolean;
}

interface UnsavedChange {
  timestamp: number;
  content: string;
}

const DEFAULT_CV = `# David Phillip
**Head of Design | AI-Native Design Leader | Fintech & SaaS | London**
London, UK | [LinkedIn](https://www.linkedin.com/in/davidphillip/) | david.phillip@gmail.com

## Professional Summary
Design leader with 20+ years in financial services and SaaS, now operating as an **AI-native practitioner** who orchestrates design, research, and engineering into unified delivery systems.

## Core Capabilities
**AI-Augmented Design Practice**
- Operationalise AI across research synthesis, prototyping, and documentation
- Build AI-powered workflows that accelerate insight-to-shipping cycles
- Evaluate and implement emerging tools while maintaining craft standards

**Design Leadership**
- Scale design teams from 5→15 while maintaining craft quality
- Establish design systems and ops practices at enterprise scale
- Drive measurable business impact through design-led growth

## Professional Experience
### Head of UX – Product Design | Cognism | Jul 2022 – Jun 2024
*B2B SaaS scale-up, sales intelligence platform*
- Led Product Design function covering Design and DesignOps
- Partnered with Product and Engineering to execute strategic initiatives
- Drove $20M → $80M revenue growth with design enabling product-led expansion

### Director, Design Lead | Coutts Private Bank | Jun 2020 – Jun 2022
*Private banking for high-net-worth clients*
- Scaled team 200% (5→15 specialists), introduced dedicated UX Research practice
- Directed launch of new mobile banking app – 70% customer activation

## Tools & Methods
**Design & Prototyping**
Figma (Advanced), Framer, FigJam, Adobe Creative Suite

**AI Tools**
ChatGPT, Midjourney, AI-assisted prototyping and research synthesis

**Research & Testing**
Maze, Lookback, UserTesting, Dovetail

## Education
- Accredited Spotlight Practitioner (2020)
- CIM e-Marketing – Distinction
- UXPA Member
`;

export default function CVLab() {
  // State
  const [markdown, setMarkdown] = useState<string>("");
  const [liveMarkdown, setLiveMarkdown] = useState<string>("");
  const [showPreview, setShowPreview] = useState<boolean>(true);
  const [pdfLoading, setPdfLoading] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"visual" | "raw">("raw");
  const [loadingCV, setLoadingCV] = useState<boolean>(true);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState<boolean>(true);
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [showJobPanel, setShowJobPanel] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showShortcuts, setShowShortcuts] = useState<boolean>(false);

  // Refs
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const autoSaveTimeout = useRef<NodeJS.Timeout | null>(null);

  // Load CV on mount
  useEffect(() => {
    const loadCV = async () => {
      try {
        const res = await fetch("/docs/DP CV - Download.md");
        if (res.ok) {
          const text = await res.text();
          setMarkdown(text);
          setLiveMarkdown(text);
          // Restore autosave if available
          const autosave = localStorage.getItem("cas-autosave");
          if (autosave) {
            try {
              const savedData = JSON.parse(autosave);
              if (savedData.content && savedData.content !== text) {
                setMarkdown(savedData.content);
                setLiveMarkdown(savedData.content);
              }
            } catch (e) {
              // Ignore parse errors
            }
          }
        } else {
          setMarkdown(DEFAULT_CV);
          setLiveMarkdown(DEFAULT_CV);
        }
      } catch (err) {
        console.error("Failed to load CV:", err);
        setMarkdown(DEFAULT_CV);
        setLiveMarkdown(DEFAULT_CV);
      } finally {
        setLoadingCV(false);
      }
    };
    loadCV();
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + S - Save
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
      // Ctrl/Cmd + Z - Undo
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
      // Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y - Redo
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "y" || (e.key === "z" && e.shiftKey))
      ) {
        e.preventDefault();
        handleRedo();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [markdown, undoStack]);

  // Auto-save
  useEffect(() => {
    if (
      autoSaveEnabled &&
      markdown &&
      markdown !== localStorage.getItem("cas-autosave")
    ) {
      if (autoSaveTimeout.current) clearTimeout(autoSaveTimeout.current);
      autoSaveTimeout.current = setTimeout(() => {
        localStorage.setItem(
          "cas-autosave",
          JSON.stringify({
            content: markdown,
            timestamp: Date.now(),
          }),
        );
        setLastSaved(new Date());
      }, 2000);
    }
  }, [markdown, autoSaveEnabled]);

  // Push to undo stack when content changes significantly
  const pushUndo = useCallback((newContent: string) => {
    setUndoStack((prev) => {
      const newStack = [...prev, newContent];
      return newStack.slice(-50); // Keep last 50 states
    });
    setRedoStack([]); // Clear redo stack on new change
  }, []);

  const handleContentChange = useCallback((value: string) => {
    setMarkdown(value);
    setLiveMarkdown(value);
  }, []);

  const handleUndo = useCallback(() => {
    if (undoStack.length > 0) {
      const previous = undoStack[undoStack.length - 1];
      setRedoStack((prev) => [...prev, markdown]);
      setMarkdown(previous);
      setLiveMarkdown(previous);
      setUndoStack((prev) => prev.slice(0, -1));
    }
  }, [markdown, undoStack]);

  const handleRedo = useCallback(() => {
    if (redoStack.length > 0) {
      const next = redoStack[redoStack.length - 1];
      setUndoStack((prev) => [...prev, markdown]);
      setMarkdown(next);
      setLiveMarkdown(next);
      setRedoStack((prev) => prev.slice(0, -1));
    }
  }, [markdown, redoStack]);

  const handleSave = useCallback(() => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `DP CV - ${new Date().toISOString().split("T")[0]}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    localStorage.setItem(
      "cas-autosave",
      JSON.stringify({
        content: markdown,
        timestamp: Date.now(),
      }),
    );
    setSaved(true);
    setLastSaved(new Date());
    setTimeout(() => setSaved(false), 2000);
  }, [markdown]);

  // Generate PDF
  const handleDownloadPDF = useCallback(async () => {
    if (!liveMarkdown || pdfLoading) return;
    setPdfLoading(true);
    try {
      // Lazy load PDF dependencies to reduce initial bundle size
      const [{ pdf }, { CVPDF }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("../features/cv-pdf/CVPDF")
      ]);

      const blob = await (pdf(
        (<CVPDF markdown={liveMarkdown} />) as any,
      ).toBlob() as Promise<Blob>);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `David_Phillip_CV_${new Date().toISOString().split("T")[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setPdfLoading(false);
    }
  }, [liveMarkdown, pdfLoading]);

  // Copy to clipboard
  const handleCopyMarkdown = useCallback(() => {
    navigator.clipboard.writeText(markdown);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [markdown]);

  // Add section template
  const addSection = useCallback(
    (type: CVSection["type"]) => {
      const templates: Record<CVSection["type"], string> = {
        header: "",
        summary: `\n## Professional Summary\nAdd your summary here...`,
        experience: `\n### Job Title | Company | Date Range\n*Context line*\n- Achievement 1 with metrics\n- Achievement 2 with impact\n- Achievement 3 with outcomes`,
        skills: `\n## Core Capabilities\n**Category Name**\n- Skill 1\n- Skill 2\n- Skill 3`,
        education: `\n## Education\n- Degree or Certification\n- Institution, Year`,
        personal: `\n## Personal\n- Interest 1\n- Interest 2`,
        tools: `\n## Tools & Methods\n**Category**\n- Tool 1, Tool 2, Tool 3`,
      };
      const template = templates[type];
      const newContent = markdown + template;
      pushUndo(markdown);
      handleContentChange(newContent);
    },
    [markdown, pushUndo, handleContentChange],
  );

  // Reset to original
  const handleReset = useCallback(async () => {
    try {
      const res = await fetch("/docs/DP CV - Download.md");
      if (res.ok) {
        const text = await res.text();
        pushUndo(markdown);
        handleContentChange(text);
      }
    } catch (err) {
      pushUndo(markdown);
      handleContentChange(DEFAULT_CV);
    }
  }, [markdown, pushUndo, handleContentChange]);

  // Helper function to parse inline markdown (bold, italic, links) and return React elements
  const parseInlineMarkdown = (text: string): React.ReactNode => {
    const parts: {
      type: "text" | "bold" | "italic" | "link";
      content: string;
      url?: string;
    }[] = [];
    let remaining = text;
    let pos = 0;

    while (pos < remaining.length) {
      // Check for bold **text**
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      // Check for italic *text* (but not at start of line for lists)
      const italicMatch = remaining.match(/\*([^*]+)\*/);
      // Check for link [text](url)
      const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

      // Find which comes first
      const matches = [
        {
          type: "bold",
          match: boldMatch,
          index: boldMatch ? remaining.indexOf(boldMatch[0]) : Infinity,
        },
        {
          type: "italic",
          match: italicMatch,
          index: italicMatch ? remaining.indexOf(italicMatch[0]) : Infinity,
        },
        {
          type: "link",
          match: linkMatch,
          index: linkMatch ? remaining.indexOf(linkMatch[0]) : Infinity,
        },
      ];

      const earliest = matches.reduce(
        (min, m) => (m.index < min.index ? m : min),
        { type: "", match: null, index: Infinity } as any,
      );

      if (earliest.match && earliest.index === pos) {
        if (earliest.type === "bold") {
          parts.push({ type: "bold", content: earliest.match[1] });
        } else if (earliest.type === "italic") {
          parts.push({ type: "italic", content: earliest.match[1] });
        } else if (earliest.type === "link") {
          parts.push({
            type: "link",
            content: earliest.match[1],
            url: earliest.match[2],
          });
        }
        remaining = remaining.slice(earliest.match[0].length);
      } else if (earliest.match && earliest.index > pos) {
        // Add text before the match
        parts.push({
          type: "text",
          content: remaining.slice(0, earliest.index - pos),
        });
        remaining = remaining.slice(earliest.index - pos);
      } else {
        // No more matches, add remaining text
        parts.push({ type: "text", content: remaining });
        break;
      }
    }

    return parts.map((part, i) => {
      if (part.type === "bold") {
        return (
          <span key={i} className="font-semibold">
            {part.content}
          </span>
        );
      } else if (part.type === "italic") {
        return (
          <span key={i} className="italic">
            {part.content}
          </span>
        );
      } else if (part.type === "link") {
        return (
          <a
            key={i}
            href={part.url}
            className="text-violet-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {part.content}
          </a>
        );
      }
      return <span key={i}>{part.content}</span>;
    });
  };

  // Improved markdown to React elements with table support
  const renderPreview = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactElement[] = [];
    let i = 0;
    let foundFirstH1 = false;

    while (i < lines.length) {
      const line = lines[i];

      // Handle CV header section (after the H1 name)
      if (foundFirstH1 && !line.startsWith("##") && line.trim() !== "") {
        // This is the header/subtitle section - render with larger font
        if (line.trim()) {
          elements.push(
            <p key={i} className="text-sm text-zinc-600 leading-relaxed mb-1">
              {parseInlineMarkdown(line)}
            </p>,
          );
        }
        i++;
        continue;
      }

      // Detect first H1 to start header section
      if (line.startsWith("# ") && !foundFirstH1) {
        foundFirstH1 = true;
        elements.push(
          <h1 key={i} className="text-3xl font-bold mb-1">
            {parseInlineMarkdown(line.replace("# ", ""))}
          </h1>,
        );
        i++;
        continue;
      }

      // Handle tables
      if (line.trim().startsWith("|") && !line.includes("---")) {
        const tableLines: string[] = [];
        const headerIndex = i;

        while (
          i < lines.length &&
          lines[i].trim().startsWith("|") &&
          !lines[i].includes("---")
        ) {
          tableLines.push(lines[i]);
          i++;
        }

        if (tableLines.length >= 1) {
          const headers = tableLines[0]
            .split("|")
            .map((s) => s.trim())
            .filter((s) => s);
          const dataRows = tableLines.slice(1).map((row) =>
            row
              .split("|")
              .map((s) => s.trim())
              .filter((s) => s),
          );

          const getColWidth = (header: string) => {
            if (header === "Period") return "w-16";
            if (header === "Highlights") return "flex-1";
            return "w-24";
          };

          elements.push(
            <div key={`table-${headerIndex}`} className="my-4 overflow-x-auto">
              <table className="w-full text-[10px] border-collapse">
                <thead>
                  <tr className="border-b border-zinc-300">
                    {headers.map((h, j) => (
                      <th
                        key={j}
                        className={`text-left p-1.5 font-semibold text-zinc-700 bg-zinc-100 ${getColWidth(h)}`}
                      >
                        {parseInlineMarkdown(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataRows.map((row, j) => (
                    <tr key={j} className="border-b border-zinc-100">
                      {row.map((cell, k) => (
                        <td
                          key={k}
                          className={`p-1.5 text-zinc-600 ${getColWidth(headers[k])}`}
                        >
                          {parseInlineMarkdown(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>,
          );
          continue;
        }
      }

      // Skip separator lines in tables
      if (line.includes("|") && line.includes("---")) {
        i++;
        continue;
      }

      // Regular markdown rendering with inline formatting
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={i} className="text-2xl font-bold mb-2">
            {parseInlineMarkdown(line.replace("# ", ""))}
          </h1>,
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={i}
            className="text-lg font-bold mt-6 mb-3 text-zinc-800 border-b border-zinc-200 pb-2"
          >
            {parseInlineMarkdown(line.replace("## ", ""))}
          </h2>,
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="text-sm font-bold mt-4 mb-1 text-zinc-700">
            {parseInlineMarkdown(line.replace("### ", ""))}
          </h3>,
        );
      } else if (line.startsWith("- ")) {
        elements.push(
          <li key={i} className="text-xs text-zinc-600 ml-4 mb-1 list-disc">
            {parseInlineMarkdown(line.replace("- ", ""))}
          </li>,
        );
      } else if (line.trim() === "") {
        elements.push(<div key={i} className="h-3" />);
      } else {
        elements.push(
          <p key={i} className="text-xs text-zinc-600 leading-relaxed">
            {parseInlineMarkdown(line)}
          </p>,
        );
      }
      i++;
    }

    return elements;
  };

  // Keyboard shortcuts modal
  const shortcuts = [
    { key: "Ctrl/Cmd + S", action: "Save file" },
    { key: "Ctrl/Cmd + Z", action: "Undo" },
    { key: "Ctrl/Cmd + Shift + Z", action: "Redo" },
    { key: "Ctrl/Cmd + F", action: "Find in text" },
    { key: "Esc", action: "Close modal" },
  ];

  if (loadingCV) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
          <p className="text-zinc-400 font-mono text-sm">Loading CAS...</p>
          <p className="text-zinc-600 text-xs">Preparing workspace</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
        <div className="container max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <Wand2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg tracking-tight">CAS</h1>
                <p className="text-xs text-zinc-500 font-mono">
                  Content Administration System
                </p>
              </div>
            </div>

            {/* Quick stats */}
            <div className="hidden md:flex items-center gap-6 text-xs text-zinc-500">
              <span className="font-mono">{markdown.length} chars</span>
              <span className="font-mono">
                {markdown.split("\n").length} lines
              </span>
              {lastSaved && (
                <span className="font-mono text-violet-400">
                  Saved {lastSaved.toLocaleTimeString()}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Autosave toggle */}
              <button
                onClick={() => setAutoSaveEnabled(!autoSaveEnabled)}
                className={`p-2 rounded-lg transition-all ${autoSaveEnabled ? "text-green-400" : "text-zinc-600"}`}
                title="Auto-save"
              >
                <History size={16} />
              </button>

              {/* Undo/Redo */}
              <button
                onClick={handleUndo}
                disabled={undoStack.length === 0}
                className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-all disabled:opacity-30"
                title="Undo (Ctrl+Z)"
              >
                <Undo size={16} />
              </button>
              <button
                onClick={handleRedo}
                disabled={redoStack.length === 0}
                className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-all disabled:opacity-30"
                title="Redo (Ctrl+Shift+Z)"
              >
                <Redo size={16} />
              </button>

              <div className="w-px h-6 bg-zinc-800" />

              {/* Preview toggle */}
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${showPreview ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"}`}
                title="Toggle preview"
              >
                {showPreview ? <Eye size={16} /> : <EyeOff size={16} />}
                Preview
              </button>

              {/* Job description panel */}
              <button
                onClick={() => setShowJobPanel(!showJobPanel)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${showJobPanel ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"}`}
                title="Job description comparison"
              >
                <Briefcase size={16} />
                Jobs
              </button>

              <div className="w-px h-6 bg-zinc-800" />

              {/* Copy */}
              <button
                onClick={handleCopyMarkdown}
                className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-all"
                title="Copy to clipboard"
              >
                {saved ? (
                  <Check size={16} className="text-green-400" />
                ) : (
                  <Copy size={16} />
                )}
              </button>

              {/* Save */}
              <button
                onClick={handleSave}
                className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-all flex items-center gap-2"
              >
                <Save size={16} />
                Save
              </button>

              {/* Export PDF */}
              <button
                onClick={handleDownloadPDF}
                disabled={pdfLoading}
                className="px-4 py-2 rounded-lg text-sm font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {pdfLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                  </>
                ) : (
                  <>
                    <Download size={16} /> PDF
                  </>
                )}
              </button>

              {/* Keyboard shortcuts */}
              <button
                onClick={() => setShowShortcuts(true)}
                className="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-all"
                title="Keyboard shortcuts"
              >
                <Keyboard size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 container max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Main Editor */}
          <div
            className={`flex-1 space-y-4 ${showJobPanel ? "flex-1" : "flex-1"}`}
          >
            {/* Toolbar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("visual")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === "visual" ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"}`}
                >
                  <Layout size={16} />
                  Visual
                </button>
                <button
                  onClick={() => setActiveTab("raw")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === "raw" ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"}`}
                >
                  <Type size={16} />
                  Raw
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-violet-500"
                />
              </div>

              {/* Quick actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-all"
                  title="Reset to original"
                >
                  <RotateCcw size={16} />
                </button>
                <select
                  onChange={(e) => {
                    if (e.target.value)
                      addSection(e.target.value as CVSection["type"]);
                    e.target.value = "";
                  }}
                  className="px-3 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-300 focus:outline-none focus:border-violet-500 cursor-pointer"
                >
                  <option value="">+ Add Section</option>
                  <option value="summary">Summary</option>
                  <option value="experience">Experience</option>
                  <option value="skills">Skills</option>
                  <option value="education">Education</option>
                  <option value="personal">Personal</option>
                  <option value="tools">Tools</option>
                </select>
              </div>
            </div>

            {/* Editor */}
            {activeTab === "raw" ? (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
                <div className="p-3 border-b border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-zinc-500">
                      DP CV - Download.md
                    </span>
                    {autoSaveEnabled && (
                      <span className="text-xs px-2 py-0.5 bg-green-500/10 text-green-400 rounded-full">
                        Auto-save on
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-zinc-600">
                    {markdown.length} chars
                  </span>
                </div>
                <textarea
                  ref={textareaRef}
                  value={markdown}
                  onChange={(e) => {
                    pushUndo(markdown);
                    handleContentChange(e.target.value);
                  }}
                  className="w-full h-[calc(100vh-320px)] p-4 bg-transparent text-zinc-100 font-mono text-sm resize-none focus:outline-none"
                  spellCheck={false}
                  placeholder="Start typing your CV content here..."
                />
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 text-center">
                <Sparkles className="w-8 h-8 text-violet-400 mx-auto mb-2" />
                <p className="text-sm text-zinc-400">
                  Visual editor in development. Use{" "}
                  <span className="text-violet-400 font-mono">Raw</span> tab for
                  full editing.
                </p>
              </div>
            )}
          </div>

          {/* Job Description Panel */}
          {showJobPanel && (
            <div className="w-96 flex-shrink-0 space-y-4">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
                <div className="p-3 border-b border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-500 flex items-center gap-2">
                    <Target size={14} />
                    Job Description
                  </span>
                  <button
                    onClick={() => setShowJobPanel(false)}
                    className="text-zinc-500 hover:text-zinc-300"
                  >
                    <X size={14} />
                  </button>
                </div>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste job description here to compare..."
                  className="w-full h-[calc(100vh-380px)] p-4 bg-transparent text-zinc-300 text-sm font-mono resize-none focus:outline-none"
                  spellCheck={false}
                />
              </div>
              {jobDescription && (
                <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Zap size={14} className="text-yellow-400" />
                    Quick Tips
                  </h3>
                  <ul className="text-xs text-zinc-400 space-y-2">
                    <li>• Compare your CV keywords to job requirements</li>
                    <li>• Highlight missing skills in your experience</li>
                    <li>• Tailor your summary to the role</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Preview Panel */}
          {showPreview && (
            <div className="rounded-xl border border-zinc-800 bg-white overflow-hidden w-[210mm] flex-shrink-0">
              <div className="p-3 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500">
                  Live Preview
                </span>
                <span className="text-xs text-zinc-400">A4 PDF Output</span>
              </div>
              <div className="p-6 h-[calc(100vh-320px)] overflow-auto">
                <div className="prose prose-sm max-w-none text-zinc-900">
                  {renderPreview(markdown)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-sm p-3">
        <div className="container max-w-7xl mx-auto flex items-center justify-between text-xs text-zinc-600">
          <div className="flex items-center gap-4">
            <span className="font-mono">🔒 CAS v1.0</span>
            <span className="hidden md:inline">• Admin Tool</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowShortcuts(true)}
              className="hover:text-zinc-400 transition-colors flex items-center gap-1"
            >
              <Keyboard size={12} />
              Shortcuts
            </button>
            <span className="font-mono">
              {lastSaved
                ? `Saved ${lastSaved.toLocaleTimeString()}`
                : "Not saved"}
            </span>
          </div>
        </div>
      </footer>

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowShortcuts(false)}
        >
          <div
            className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Keyboard size={16} />
                Keyboard Shortcuts
              </h3>
              <button
                onClick={() => setShowShortcuts(false)}
                className="text-zinc-500 hover:text-zinc-300"
              >
                <X size={16} />
              </button>
            </div>
            <div className="space-y-2">
              {shortcuts.map((shortcut, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0"
                >
                  <span className="text-sm text-zinc-400">
                    {shortcut.action}
                  </span>
                  <kbd className="px-2 py-1 text-xs bg-zinc-800 rounded text-zinc-300 font-mono">
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
