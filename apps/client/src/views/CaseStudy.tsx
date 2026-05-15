import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "wouter";
import { motion, useScroll, useSpring } from "framer-motion";
import Header from "@/shared/components/Header";
import {
    ArrowLeft, Calendar, Award, TrendingUp, CheckCircle,
    Target, Lightbulb, Shield, TrendingUp as TrendingUpIcon,
    Search, FileText, PenTool, TestTube, Rocket, LayoutTemplate,
    ChevronDown, ChevronUp, Clock, Minus, BarChart,
    Cpu, Zap, Eye, Code, Globe, Sparkles, MessageCircle, Layers
} from "lucide-react";
import { Link } from "wouter";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/components/ui/collapsible";
import { PasswordGate } from "@/shared/components/PasswordGate";
import { isCaseStudyProtected } from "@/shared/config/case-study-passwords";

// ============================================================================
// TypeScript Interfaces
// ============================================================================

interface CaseStudyMetrics {
    label: string;
    value: string;
    description?: string;
}

interface CaseStudyMeta {
    role: string;
    date: string;
    stakeholders?: string[];
    teamSize: string;
}

interface SectionContent {
    subtitle: string;
    text: string;
    image?: string;
    caption?: string;
}

interface SectionItem {
    number?: string;
    title: string;
    text?: string;
    items?: string[];
    image?: string;
    caption?: string;
}

interface SectionSubsection {
    title: string;
    items: string[];
    image?: string;
    caption?: string;
}

interface Testimonial {
    quote: string;
    author: string;
    role: string;
    photo?: string;
}

interface CaseStudySection {
    id: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    content?: SectionContent[];
    items?: SectionItem[];
    subsections?: SectionSubsection[];
    testimonials?: Testimonial[];
}

interface CaseStudyData {
    company: string;
    title: string;
    subtitle?: string;
    role: string;
    period: string;
    thumbnail: string;
    summary: string;
    tldrTakeaways?: string[];
    metrics: CaseStudyMetrics[];
    meta?: CaseStudyMeta;
    sections: CaseStudySection[];
}

interface CaseStudiesData {
    [key: string]: CaseStudyData;
}

// ============================================================================
// Reading Progress Bar Component
// ============================================================================
function ReadingProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-accent-foreground origin-left z-50"
            style={{ scaleX }}
        />
    );
}

// ============================================================================
// Table of Contents Component (Sticky Sidebar)
// ============================================================================
interface TableOfContentsProps {
    sections: Array<{ id: string; title: string; icon: React.ComponentType<{ className?: string }> }>;
}

function TableOfContents({ sections }: TableOfContentsProps) {
    const [activeSection, setActiveSection] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-20% 0px -60% 0px" }
        );

        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [sections]);

    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setIsOpen(false);
    }, []);

    return (
        <>
            {/* Mobile TOC Toggle */}
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="lg:hidden mb-6">
                <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 bg-secondary/50 rounded-lg text-sm font-medium">
                    <span className="flex items-center gap-2">
                        <span className="text-accent-foreground">☰</span>
                        Table of Contents
                    </span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                    <nav className="space-y-1 px-2">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${activeSection === section.id
                                    ? "bg-accent-foreground text-white"
                                    : "text-muted-foreground hover:bg-secondary"
                                    }`}
                            >
                                {section.title}
                            </button>
                        ))}
                    </nav>
                </CollapsibleContent>
            </Collapsible>

            {/* Desktop TOC Sidebar */}
            <aside className="hidden lg:block sticky top-24 self-start">
                <nav className="space-y-2">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        IN THIS CASE STUDY
                    </h4>
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md transition-all ${activeSection === section.id
                                ? "bg-accent-foreground text-white translate-x-1"
                                : "text-muted-foreground hover:text-foreground hover:translate-x-0.5"
                                }`}
                        >
                            <span className="text-sm opacity-50">○</span>
                            <span className="text-sm">{section.title}</span>
                        </button>
                    ))}
                </nav>
            </aside>
        </>
    );
}

// ============================================================================
// TL;DR Summary Component
// ============================================================================
// ============================================================================
// Pull Quote Component
// ============================================================================
interface PullQuoteProps {
    children: React.ReactNode;
    author?: string;
    role?: string;
}

function PullQuote({ children, author, role }: PullQuoteProps) {
    return (
        <figure className="my-8 pl-6 border-l-4 border-accent-foreground/30">
            <blockquote className="font-serif text-xl md:text-2xl text-foreground italic leading-relaxed mb-4 max-w-65ch">
                "{children}"
            </blockquote>
            {author && (
                <figcaption className="text-sm text-muted-foreground">
                    {author}{role && `, ${role}`}
                </figcaption>
            )}
        </figure>
    );
}

// ============================================================================
// Key Takeaway Component
// ============================================================================
interface KeyTakeawayProps {
    title: string;
    children: React.ReactNode;
}

function KeyTakeaway({ title, children }: KeyTakeawayProps) {
    return (
        <div className="my-8 p-6 bg-gradient-to-br from-amber-50/50 via-background to-background rounded-lg border border-amber-200/50 dark:border-amber-900/30">
            <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">💡</span>
                <div>
                    <h4 className="font-semibold text-foreground mb-2">{title}</h4>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                        {children}
                    </p>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// Section Divider Component
// ============================================================================
function SectionDivider() {
    return (
        <div className="flex items-center justify-center my-12">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1 max-w-xs" />
            <div className="mx-4 text-muted-foreground/40">
                <Minus size={16} />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1 max-w-xs" />
        </div>
    );
}

// ============================================================================
// Placeholder Image Component
// ============================================================================
interface PlaceholderImageProps {
    src: string;
    alt: string;
    caption?: string;
    className?: string;
}

function PlaceholderImage({ src, alt, caption, className = "" }: PlaceholderImageProps) {
    const isVideo = src.match(/\.(mov|mp4|webm|avi)$/i);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (isVideo && videoRef.current) {
            videoRef.current.playbackRate = 1.8;
        }
    }, [isVideo]);

    return (
        <figure className={`my-8 ${className}`}>
            <div className="relative rounded-lg overflow-hidden bg-secondary/30 border border-border">
                <div className="w-full flex items-center justify-center relative">
                    {isVideo ? (
                        <video
                            ref={videoRef}
                            src={src}
                            controls
                            muted
                            className="w-full h-auto max-h-[640px] object-contain"
                            poster="/videos/video-placeholder-uxsidekick.png"
                        >
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <img
                            src={src}
                            alt={alt}
                            className="w-full h-auto max-h-[640px] object-cover"
                        />
                    )}
                </div>
            </div>
            {caption && (
                <figcaption className="mt-3 text-sm text-muted-foreground text-center font-sans">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}

// ============================================================================
// Calculate Reading Time
// ============================================================================
function calculateReadingTime(text: string): number {
    const wordsPerMinute = 200;
    const words = text.replace(/<[^>]*>/g, "").split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}

// ============================================================================
// Case Study Data
// ============================================================================
const caseStudiesData: CaseStudiesData = {
    "ux-sidekick": {
        company: "Internal R&D Lab",
        title: "AI-Powered Design Feedback Platform",
        subtitle: "Building an Intelligent UX Analysis Tool",
        role: "Full-Stack Developer & Product Designer",
        period: "2025",
        thumbnail: "/images/case-study-uxsidekick-thumbail.png",
        summary: "UX Sidekick is an AI-powered design critique platform that provides expert-level UX feedback in under 30 seconds. The platform analyses UI screenshots and Figma designs using computer vision AI, identifying usability issues, accessibility violations, and providing actionable remediation with copy-paste ready code.",
        tldrTakeaways: [
            "Built AI platform providing PhD-level UX feedback in 30 seconds",
            "Implemented collision-free marker system for dense UIs",
            "Achieved 95% code snippet coverage for actionable fixes",
            "Integrated Figma API for direct design file analysis"
        ],
        metrics: [
            { label: "Analysis Time", value: "30s", description: "From upload to actionable feedback" },
            { label: "Code Coverage", value: "95%", description: "Issues with Tailwind snippets" },
            { label: "Issues Found", value: "6-8", description: "Average per scan" },
            { label: "Accuracy", value: "90%+", description: "Validated against expert audits" }
        ],
        meta: {
            role: "Full-Stack Developer & Product Designer",
            date: "2024",
            stakeholders: [],
            teamSize: "1 (Solo project)",
        },
        sections: [
            {
                id: "challenge",
                title: "The Challenge",
                icon: Target,
                content: [
                    {
                        subtitle: "Design Review Bottleneck",
                        text: "Junior designers wait days for senior feedback, slowing iteration cycles. The availability of design experts is a constant constraint in fast-moving organisations."
                    },
                    {
                        subtitle: "Inconsistent Feedback Quality",
                        text: "Design feedback is subjective and varies between reviewers. There's no standardized framework for evaluating UI quality across an organisation."
                    },
                    {
                        subtitle: "Accessibility Blind Spots",
                        text: "WCAG compliance is often overlooked until expensive accessibility audits catch issues late in the development process when fixes are costly."
                    },
                    {
                        subtitle: "Actionability Gap",
                        text: "Most design feedback identifies problems but lacks concrete solutions. Designers know something is wrong but don't know how to fix it.",
                        image: "/images/case-study-uxsidekick-challenge.png",
                    }
                ]
            },
            {
                id: "solution",
                title: "The Solution",
                icon: Lightbulb,
                content: [
                    {
                        subtitle: "AI-Powered Analysis",
                        text: "Built a platform using Grok Vision API that analyses UI screenshots and provides expert-level feedback in under 30 seconds. The AI evaluates designs against Nielsen heuristics, WCAG guidelines, and Gestalt principles.",
                        caption: "Internal R&D Lab project in action - analyzing a UI design and providing actionable feedback"
                    },
                    {
                        subtitle: "Spatial Precision",
                        text: "Implemented bounding box coordinate system that places markers at exact element centers with pixel-level accuracy, solving the 'vague region' problem common in other tools."
                    },
                    {
                        subtitle: "Collision-Free Markers",
                        text: "Developed radial offset algorithm that prevents marker stacking when multiple issues target nearby elements, with dashed SVG lines connecting offset markers to their targets."
                    },
                    {
                        subtitle: "Actionable Code",
                        text: "Every issue includes copy-paste ready Tailwind CSS snippets, not just verbal feedback. This bridges the gap between identifying problems and implementing fixes."
                    }
                ]
            },
            {
                id: "technical",
                title: "Technical Implementation",
                icon: Code,
                content: [
                    {
                        subtitle: "Architecture",
                        text: "React SPA frontend with Supabase Edge Functions backend. Grok Vision API for computer vision analysis. Figma API integration for direct design file export.",
                        image: "/images/case-study-uxsidekick-ai-powered-analysis.png",
                    },
                    {
                        subtitle: "Bounding Box System",
                        text: "AI returns precise {x, y, width, height} percentages for each issue. Frontend renders markers at exact element centers using responsive positioning."
                    },
                    {
                        subtitle: "Collision Detection",
                        text: "Radial offset algorithm with configurable threshold (8%) and offset distance (12%). Markers are intelligently distributed around clustered issue locations.",
                        image: "/images/case-study-uxsidekick-collision-free-markers.png",
                    },
                    {
                        subtitle: "Figma Integration",
                        text: "Parses both /file/ and /design/ URL formats, extracts node-id parameters, exports frames at 2x resolution, converts to base64 for AI analysis."
                    }
                ]
            },
            {
                id: "impact",
                title: "Impact & Outcomes",
                icon: TrendingUpIcon,
                content: [
                    {
                        subtitle: "Performance",
                        text: "Analysis time consistently under 30 seconds. 6-8 issues identified per scan on average. 95% of issues include actionable code solutions."
                    },
                    {
                        subtitle: "User Experience",
                        text: "Feedback indicates the collision-free marker system significantly improves readability for dense UIs. Contextual intent inference receives praise for accuracy.",
                        image: "/videos/ux-sidekick-video.mov",
                    }
                ]
            },
            {
                id: "lessons",
                title: "Key Learnings",
                icon: Lightbulb,
                items: [
                    {
                        title: "Prompt Engineering is Product Design",
                        text: "The quality of AI output directly correlates with prompt sophistication. Investing in detailed system prompts with examples, constraints, and output schemas dramatically improved reliability."
                    },
                    {
                        title: "Edge Cases Define User Experience",
                        text: "The collision detection system wasn't in the original spec but emerged from real-world testing. Edge cases consumed 40% of development time but prevented 80% of potential user frustration."
                    },
                    {
                        title: "Actionability > Accuracy",
                        text: "Users preferred 'slightly imperfect but actionable' feedback over 'perfect but vague' analysis. The Tailwind snippets feature became the most praised capability despite being a late addition."
                    }
                ]
            }
        ]
    },
    coutts: {
        company: "Coutts",
        title: "Coutts: Wealth Management App",
        subtitle: "Transforming the Digital Experience at Coutts & Co",
        role: "Design Lead – Director",
        period: "2020–2022",
        thumbnail: "/images/case-study-coutts-main-hero.png",
        summary: "A 330-year-old private bank. Clients who expect perfection. An organisation skeptical design could drive change. I scaled the team from 5 to 15, shipped a top-rated app in 18 months, and helped unlock millions in new assets — with zero security incidents in a sector where one breach ends careers.",
        tldrTakeaways: [
            "Scaled design team from 5 to 15 specialists with 100% retention over 2 years",
            "Launched 4.2+ rated app in 18 months with zero security incidents",
            "Transformed Compliance from gatekeepers to collaborative partners",
            "+30% digital adoption and +22 NPS improvement amongst under-50 clients"
        ],
        metrics: [
            { label: "Digital adoption", value: "+30%", description: "Within 6 months of launch" },
            { label: "NPS improvement", value: "+22pts", description: "Amongst under-50 clients (key growth segment)" },
            { label: "Team growth", value: "5→15", description: "Specialists with 100% retention over 2 years" },
            { label: "App rating", value: "4.2+", description: "With zero security incidents" },
            { label: "RM efficiency", value: "-25%", description: "Reduction in routine enquiries" },
            { label: "Process efficiency", value: "-40%", description: "Reduction in design-to-dev handoff time" },
        ],
        meta: {
            role: "Design Lead – Director",
            date: "2020-2022",
            stakeholders: ["Product Leadership", "Engineering", "Compliance", "Legal", "Risk", "Technology", "Executive Committee", "NatWest Group Design Leadership"],
            teamSize: "Scaled from 5 to 15 specialists (UX, UI, Research, Design Operations)",
        },
        sections: [
            {
                id: "challenge",
                title: "The Challenge",
                icon: Target,
                content: [
                    {
                        subtitle: "Business Context",
                        text: "Coutts serves Britain's wealthiest families in a 330-year-old institution. Their digital experience was stuck in the 2000s — clients managing eight-figure portfolios used clunky legacy portals while 40% of prospects under 50 chose competitors with modern apps.",
                        image: "/images/case-study-coutts-before-after.png",
                        caption: "Legacy portal (left) versus modern banking apps (right) — the gap that was costing Coutts younger clients"
                    },
                    {
                        subtitle: "Organisational Complexity",
                        text: "Any change required approval from Compliance, Legal, Risk, and Technology. Previous initiatives had stalled for years. The design team was small, treated as 'styling' rather than strategy. The real barrier: Compliance and Risk acted as gatekeepers, not partners. The threefold problem was building team capability, modernising legacy systems with zero security tolerance, and maintaining the discreet brand identity wealthy clients expected — whilst navigating intense regulatory scrutiny."
                    }
                ]
            },
            {
                id: "strategy",
                title: "Strategy & Approach",
                icon: Target,
                items: [
                    {
                        number: "1",
                        title: "Vision: Quiet Confidence",
                        text: "Proved heritage institutions could deliver world-class digital. 'Quiet Confidence' meant prestige through clarity and discretion, not gamification. Framed every decision in revenue and risk — the metrics executives cared about."
                    },
                    {
                        number: "2",
                        title: "Embedded Compliance as Co-Creators",
                        text: "Compliance and Risk joined design sprints from day one, attending research and co-creating principles. This relationship shift unlocked faster progress than any previous initiative. Built an ROI model showing £400K+ annual savings through reduced rework — turning Engineering into advocates.",
                        image: "/images/coutts-workshop-facilitating.png",
                        caption: "Facilitating cross-functional workshops with Compliance and Product teams"
                    },
                    {
                        number: "3",
                        title: "Built Sustainable Capability",
                        text: "Scaled design team from 5 to 15 with 100% retention. Established research as standard practice. Presented quarterly to the executive committee in business language (acquisition cost, retention risk, efficiency) rather than design jargon — earning design a seat at strategic planning."
                    }
                ]
            },
            {
                id: "key-actions",
                title: "Key Actions",
                icon: CheckCircle,
                items: [
                    {
                        number: "1",
                        title: "Established Coutts' first UX Research practice",
                        text: "Created quarterly research cycles that shifted the organisation from 'I think' to 'we know' — research informing roadmap decisions at executive level."
                    },
                    {
                        number: "2",
                        title: "Led group-wide Figma migration",
                        text: "Migrated 280+ designers across NatWest Group (4 brands) to Figma. Established cross-brand design system governance and audit trail for Compliance."
                    },
                    {
                        number: "3",
                        title: "Transformed stakeholder dynamics",
                        text: "Embedded regulatory teams in design sprints from the start. Compliance became advocates, not blockers — baking requirements into the process from day one."
                    },
                    {
                        number: "4",
                        title: "Designed and launched the Coutts mobile app",
                        text: "Led design of Coutts' first modern native mobile experience replacing legacy portals. Achieved 4.2+ app rating with zero security incidents post-launch.",
                        image: "/images/coutts-hero-app-screens.png",
                        caption: "Final app design: Portfolio-first hierarchy reflecting 'Quiet Confidence' design vision"
                    },
                ]
            },
            {
                id: "research",
                title: "Research & Discovery",
                icon: Search,
                content: [
                    {
                        subtitle: "Findings",
                        text: "Conducted quarterly research cycles with UHNW clients, relationship managers, and compliance teams. Wealthy clients didn't want gamification or flashy features — they wanted clarity, discretion, and confidence that their information was secure. This validated the 'Quiet Confidence' direction and killed several feature ideas that would have felt downmarket. Key lesson: In regulated environments, fight for direct client access immediately — early reliance on manager proxies led to post-launch rework."
                    }
                ]
            },
            {
                id: "impact",
                title: "Impact & Outcomes",
                icon: TrendingUpIcon,
                content: [
                    {
                        subtitle: "Process & Efficiency",
                        text: "Reduced design-to-development handoff time by 40%. Built 280+ design system components establishing governance across NatWest Group. Achieved 3x digital onboarding capacity without additional staff. Reduced routine enquiries to relationship managers by 25%.",
                        image: "/images/coutts-impact-metrics.png",
                        caption: "Impact metrics: 40% faster handoff, 25% reduction in routine enquiries"
                    },
                    {
                        subtitle: "Culture & Capability",
                        text: "Design elevated from 'styling' function to strategic capability. Compliance teams now attend design sprints as standard. Multiple team members promoted into leadership roles across NatWest Group. Infrastructure still in use 3+ years later."
                    },
                    {
                        subtitle: "Security & Trust",
                        text: "Zero security incidents post-launch despite aggressive timelines. Maintained the discretion and premium feel UHNW clients expect."
                    }
                ]
            },
            {
                id: "takeaways",
                title: "Key Takeaways",
                icon: CheckCircle,
                items: [
                    {
                        title: "Make gatekeepers co-creators",
                        text: "Embed regulatory functions in the creative process. Their constraints become design inputs, and they become advocates — the unlock for moving faster than ever before."
                    },
                    {
                        title: "Quantify everything",
                        text: "Translate design decisions into revenue and risk. One avoided feature saved 6 months of development and became our proof point for years."
                    },
                    {
                        title: "Start the access fight early",
                        text: "In regulated environments, approval for direct client research takes months. Early reliance on proxies led to post-launch rework — begin the access request on day one."
                    },
                    {
                        title: "Prestige means restraint",
                        text: "Wealthy clients don't want what works for consumer fintech. Assumptions about premium audiences were often wrong — validation through testing was essential."
                    },
                    {
                        title: "Build capability, not just deliverables",
                        text: "Apps can be rebuilt. Organisational capability compounds — the systems I established still drive value 3+ years later."
                    }
                ]
            },
        ],
    },
    hsbc: {
        company: "HSBC",
        title: "Small Business Banking App",
        subtitle: "Redesigning the UK's largest business banking platform",
        role: "Design Lead | Commercial Banking",
        period: "2018–2020",
        thumbnail: "/videos/HSBC_Kinetic.mp4",
        summary: "HSBC's business banking platform for SME customers had become a competitive liability. Small business owners were abandoning mid-task at rates 3x industry average. As Design Lead for Commercial Banking, I led a team of 6 designers and made the strategic call to rebuild the core account dashboard — a 9-month investment that improved task completion from 62% to 81%, increased mobile engagement 32%, and established design as a respected function within Business Banking.",
        tldrTakeaways: [
            "Led team of 6 designers across business banking products",
            "Task completion rates improved from 62% to 81% across core workflows",
            "Mobile engagement increased 32% within 6 months of launch",
            "Design system adoption reached 85% across Business Banking products"
        ],
        metrics: [
            { label: "Task Completion", value: "81%", description: "Up from 62% across core workflows" },
            { label: "Mobile Engagement", value: "+32%", description: "Within 6 months of launch" },
            { label: "CSAT Improvement", value: "+18pts", description: "Year-over-year improvement" },
            { label: "Design System Adoption", value: "85%", description: "Across Business Banking products" },
            { label: "Reduced Bugs", value: "-40%", description: "Development bugs after design system" }
        ],
        meta: {
            role: "Design Lead - Commercial Banking",
            date: "2018-2020",
            stakeholders: ["Product Leadership", "Engineering", "Compliance", "Technology", "Business Banking Executive"],
            teamSize: "6 designers (2 Senior, 3 Mid-level, 1 Junior)"
        },
        sections: [
            {
                id: "challenge",
                title: "The Challenge",
                icon: Target,
                content: [
                    {
                        subtitle: "Business Context & Role",
                        text: "HSBC's business banking platform for SME customers had become a competitive liability. Small business owners abandoned mid-task at rates 3x industry average. The experience felt like 'banking from 2010' — clunky, inconsistent, and overwhelming. As Design Lead for Commercial Banking, I led a team of 6 designers, owned the end-to-end redesign of core lending workflows, and established the design practice within Business Banking. Leadership recognised that digital experience was now a differentiator in SME banking, and the existing platform was losing customers to digital-first challengers like Tide and Starling."
                    },
                    {
                        subtitle: "The Strategic Opportunity",
                        text: "With millions of SME customers across the UK, rebuilding wasn't an option — we had to evolve while maintaining complexity: multiple users, role-based permissions, compliance requirements. I made the strategic call to rebuild the core account dashboard rather than iterate, proposing a parallel-run approach: build new dashboard alongside existing one, validate with users, then migrate. This 9-month investment required executive sponsorship but ultimately delivered the breakthrough experience we needed."
                    }
                ]
            },
            {
                id: "key-decisions",
                title: "Key Decisions",
                icon: PenTool,
                items: [
                    {
                        number: "1",
                        title: "Rebuild vs. iterate core dashboard",
                        text: "Product leadership wanted incremental improvements. I pushed back, arguing that technical debt and inconsistent patterns meant iteration would take longer and produce worse results. The parallel-run approach I proposed — build new dashboard alongside existing, validate with users, then migrate — required executive sponsorship but delivered breakthrough results."
                    },
                    {
                        number: "2",
                        title: "Progressive disclosure over simplification",
                        text: "Product Owners requested a simplified interface that would remove functionality business owners needed. I advocated for progressive disclosure — surfacing common tasks while keeping advanced features accessible. User testing validated my position: the progressive disclosure version achieved 32% higher satisfaction."
                    },
                    {
                        number: "3",
                        title: "Design system before features",
                        text: "I convinced leadership to pause feature work for 6 weeks to establish a component library. This was controversial but critical: 150+ components ensured consistency across touchpoints, reduced development bugs by 40%, and accelerated velocity significantly in subsequent quarters."
                    }
                ]
            },
            {
                id: "research",
                title: "Research & Discovery",
                icon: Search,
                content: [
                    {
                        subtitle: "Key Findings",
                        text: "I established a continuous research program with monthly usability sessions. Research revealed that business owners needed efficiency and clarity, not gamification. The existing platform overwhelmed users with options but buried daily tasks. Our redesign prioritised task visibility and reduced cognitive load while maintaining access to complex functionality. I also built an in-house research repository that reduced research time by 50% and created institutional memory that persisted beyond individual projects. To augment analysis, I implemented AI-assisted research synthesis using Claude for interview analysis, accelerating insight extraction without replacing human judgment."
                    }
                ]
            },
            {
                id: "design-system",
                title: "Design System",
                icon: LayoutTemplate,
                content: [
                    {
                        subtitle: "Component Library & Adoption",
                        text: "I built 150+ components that ensured consistency across touchpoints and became the foundation for all Business Banking products. Design system adoption reached 85% across Business Banking products within 12 months through clear governance processes and documentation with usage guidelines and accessibility requirements. The investment reduced development bugs by 40% and became the highest-ROI decision of the project."
                    }
                ]
            },
            {
                id: "impact",
                title: "Impact & Outcomes",
                icon: TrendingUpIcon,
                content: [
                    {
                        subtitle: "Metrics & Transformation",
                        text: "Task completion rates improved from 62% to 81% across core workflows. Mobile engagement increased 32% within 6 months of launch. CSAT improved 18 points year-over-year. Design-to-development handoff time reduced by 45%. Design became a respected function within Business Banking, with design review established as standard practice and research informing roadmap decisions. These foundations persisted beyond my tenure."
                    }
                ]
            },
            {
                id: "takeaways",
                title: "Key Takeaways",
                icon: CheckCircle,
                items: [
                    {
                        title: "Rebuild vs. iterate is a strategic decision",
                        text: "Sometimes the fastest path is a slower one. If technical debt and UX problems are fundamental, iteration becomes slower than rebuilding. Validate with pilots and secure executive sponsorship."
                    },
                    {
                        title: "Design systems require upfront investment",
                        text: "A component library isn't a nice-to-have — it's infrastructure that compounds. The 6-week pause felt expensive but bug reduction and velocity gains made it the highest-ROI decision."
                    },
                    {
                        title: "Continuous research builds institutional knowledge",
                        text: "Monthly research sessions create feedback loops that make every design decision better. Research repositories ensure insights persist beyond individual projects."
                    },
                    {
                        title: "Build credibility for transformation",
                        text: "Changing how an organisation values design requires proof points, persistence, and patience. Early wins created space for larger transformation work."
                    }
                ]
            }
        ]
    },

    cognism: {
        company: "Cognism",
        title: "Cognism: Scaling B2B SaaS Design Ops & Revenue Velocity",
        subtitle: "From Zero to Four Designers at a $80M ARR SaaS Scale-up",
        role: "Head of UX",
        period: "2022–2024",
        thumbnail: "/images/case-study-hero-cognism.png",
        summary: "Cognism had grown rapidly to $80M ARR but the product experience hadn't kept pace. Sales teams were churning because the platform felt dated, inconsistent, and hard to use. NPS had dropped to -16. As the first UX hire, I built the team from scratch, grew it to 4 designers over 18 months, and improved NPS from -16 to +12 through strategic design investment.",
        tldrTakeaways: [
            "Grew UX team from 0 to 4 designers over 18 months with clear career ladders",
            "Improved NPS from -16 to +12 through systematic platform improvements",
            "Established design operations foundations: component library, design tokens, review process",
            "Reduced design-to-development handoff time by 50%"
        ],
        metrics: [
            { label: "NPS improvement", value: "+28pts", description: "From -16 to +12 over 18 months" },
            { label: "Team growth", value: "0→4", description: "Designers hired and mentored" },
            { label: "Design system adoption", value: "90%", description: "Across product teams" },
            { label: "Handoff efficiency", value: "+50%", description: "Reduction in design-to-dev time" },
            { label: "User satisfaction", value: "+40%", description: "For core workflows" },
        ],
        meta: {
            role: "Head of UX",
            date: "2022-2024",
            stakeholders: ["Product Leadership", "Engineering", "Sales Leadership", "Executive Team"],
            teamSize: "Built from 0 to 4 designers (2 Senior, 1 Mid, 1 Junior)",
        },
        sections: [
            {
                id: "challenge",
                title: "The Challenge",
                icon: Target,
                content: [
                    {
                        subtitle: "Growth Outpacing Experience",
                        text: "Cognism had grown rapidly to $80M ARR but the product experience hadn't kept pace. Sales teams were churning because the platform felt dated, inconsistent, and hard to use. NPS had dropped to -16. When I joined, there was no UX team — product decisions were made based on stakeholder opinions rather than user research, and engineering built what was spec'd without design review.",
                        image: "/images/cognism-case-study-01.png",
                        caption: "Legacy interface (left) versus the redesigned experience (right) that drove NPS improvement"
                    },
                    {
                        subtitle: "The Business Imperative",
                        text: "In the sales intelligence market, user experience is the product. Competing against ZoomInfo meant Cognism needed a platform that didn't just have better data — it needed to be easier to use. The executive team gave me a clear mandate: build a design function from nothing and transform the product experience."
                    }
                ]
            },
            {
                id: "strategy",
                title: "My Strategic Approach",
                icon: Lightbulb,
                items: [
                    {
                        number: "01",
                        title: "Built a High-Performing Design Team",
                        text: "As the first UX hire, I hired for trajectory over pedigree. I grew the team from 0 to 4 designers over 18 months (2 Senior, 1 Mid, 1 Junior), establishing clear career ladders and investing heavily in mentorship. I paired this with a structured design review process that became mandatory before engineering handoff, catching issues earlier and educating stakeholders on what good design looked like.",
                        image: "/images/cognism-case-study-02.png",
                        caption: "The Cognism UX team at full size: 4 designers with clear ownership areas"
                    },
                    {
                        number: "02",
                        title: "Prioritised Design System Investment",
                        text: "I made the controversial decision to invest in a component library and design tokens before shipping new features. This sacrificed short-term velocity but created the foundation for everything that followed. By Q3, we were iterating 3x faster than competitors who were still building from scratch.",
                        image: "/images/cognism-case-study-03.png",
                        caption: "Design system components established during my tenure"
                    },
                    {
                        number: "03",
                        title: "Led Search Redesign as Proof Point",
                        text: "I personally led the redesign of Cognism's most-used feature — search and list view. Working directly with sales teams and customers, I transformed a frustrating experience into an intuitive, scannable interface that matched user intent. This proof point justified broader design investment and created momentum for platform-wide improvements.",
                        image: "/images/cognism-case-study-05.png",
                        caption: "Before and after: the redesigned search and list view experience"
                    }
                ]
            },
            {
                id: "impact",
                title: "Impact & Outcomes",
                icon: TrendingUpIcon,
                content: [
                    {
                        subtitle: "User & Business Metrics",
                        text: "NPS improved from -16 to +12 over 18 months. User satisfaction scores for core workflows increased 40%. These improvements translated directly to customer retention and sales team confidence in the platform.",
                        image: "/images/cognism-case-study-07.svg",
                        caption: "Key metrics: NPS improvement, team growth, and efficiency gains"
                    },
                    {
                        subtitle: "Operational Excellence",
                        text: "Design system adoption reached 90% across product teams. Design-to-development handoff time reduced by 50%. The team grew from 0 to 4 designers with clear career trajectories, with multiple members promoted or taking leadership roles elsewhere."
                    },
                    {
                        subtitle: "Organisational Transformation",
                        text: "Design went from being ignored to being a respected function. Product leadership actively sought design input on roadmap decisions. Engineering valued the component library that reduced their workload. This shift required intentional stakeholder alignment and leading with credibility, not just vision."
                    }
                ]
            },
            {
                id: "takeaways",
                title: "Key Takeaways",
                icon: CheckCircle,
                items: [
                    {
                        title: "Build credibility before asking for trust",
                        text: "The search redesign proved design value before asking for broader investment. Skeptical leaders became advocates when they saw tangible results."
                    },
                    {
                        title: "Short-term sacrifice enables long-term gain",
                        text: "The design system investment felt slow initially. By Q3, we were iterating faster than teams that had started feature work earlier. Foundation enables velocity."
                    },
                    {
                        title: "Hire for trajectory, not pedigree",
                        text: "In a scale-up, I needed designers who could thrive in ambiguity and build from nothing. Adaptability and growth mindset were more valuable than domain expertise."
                    },
                    {
                        title: "Change management is foundational work",
                        text: "Building a team isn't just hiring — it's establishing processes, relationships, and credibility. Stakeholder alignment is part of the design function, not separate from it."
                    }
                ]
            }
        ]
    },
    "hsbc-kinetic": {
        company: "HSBC Kinetic",
        title: "HSBC Kinetic: Transforming Small Business Lending",
        subtitle: "Digitising SME Lending at the UK's Largest Bank",
        role: "Strategic UX Lead | SME Banking Transformation",
        period: "May 2019 – Nov 2019",
        thumbnail: "/videos/HSBC_Kinetic.mp4",
        summary: "Led the design strategy for the lending and integration workstreams of HSBC Kinetic, a £14 billion strategic digital transformation initiative. By establishing a high-velocity design pod and moving from legacy banking cycles to rapid prototyping, I oversaw the delivery of five core products, achieving a 35% lending adoption rate and a 30% reduction in development cycles.",
        tldrTakeaways: [
            "Market Context: Moved from offline lending to seamless mobile-first ecosystem",
            "High-Velocity Pods: Transitioned from waterfall to rapid prototyping",
            "Systemic Consistency: Unified brand voice across 5 parallel products",
            "De-Risking: Used design sprints to validate technical constraints early"
        ],
        metrics: [
            { label: "Adoption Rate", value: "35%", description: "Lending product uptake" },
            { label: "Delivery Speed", value: "+30%", description: "Faster cycles via prototyping" },
            { label: "Design Team", value: "3", description: "Designers led & mentored" },
            { label: "Programme", value: "£14B", description: "Strategic transformation" },
            { label: "Products", value: "5", description: "Core verticals delivered" }
        ],
        meta: {
            role: "Strategic UX Lead",
            date: "May 2019 – Nov 2019",
            stakeholders: ["Product Leadership", "Engineering", "Business Banking", "Risk & Compliance"],
            teamSize: "Led team of 3 designers across lending & integrations"
        },
        sections: [
            {
                id: "challenge",
                title: "The Challenge",
                icon: Target,
                content: [
                    {
                        subtitle: "Market Context",
                        text: "HSBC needed a digital-first \"challenger\" brand to capture the SME market. Success required moving traditionally slow, offline lending processes (loans, overdrafts) into a seamless, mobile-first ecosystem.",
                        image: "/images/case-study-kinetic-brand-evolution.jpeg"
                    },
                    {
                        subtitle: "The Bottleneck",
                        text: "Existing engineering and product silos within the bank were resulting in fragmented hand-offs and inconsistent UX across the lending portfolio."
                    },
                    {
                        subtitle: "The Stake",
                        text: "Navigating the regulatory rigour of a global bank while delivering the \"fast-paced\" experience expected by modern business owners."
                    }
                ]
            },
            {
                id: "strategy",
                title: "My Strategic Approach",
                icon: Lightbulb,
                items: [
                    {
                        number: "01",
                        title: "High-Velocity Pod Leadership",
                        text: "I built and led a multidisciplinary design pod (UX/UI) focused on five key verticals: Business Loans, Credit Cards, Overdrafts, Marketplace Integrations, and Open Banking. I transitioned the team from slow-moving waterfall methods to a rapid prototyping framework, allowing us to validate complex lending flows before a single line of code was written."
                    },
                    {
                        number: "02",
                        title: "De-Risking through Evidence",
                        text: "To bridge the gap between Product and Engineering, I facilitated design sprints that demonstrated how early-stage UX could identify technical constraints. This \"design as an accelerator\" approach gained stakeholder buy-in to embed designers directly into agile squads, breaking down traditional silos."
                    },
                    {
                        number: "03",
                        title: "Systemic Consistency",
                        text: "With five products running in parallel, I enforced a \"systemic design\" philosophy. By leveraging and contributing to the Kinetic design system, we ensured that a user moving from an overdraft application to an Open Banking integration experienced a single, unified brand voice and UI pattern.",
                        image: "/images/case-study-hsbc-kinectic-journey-6.png"
                    }
                ]
            },
            {
                id: "impact",
                title: "Impact & Results",
                icon: TrendingUpIcon,
                content: [
                    {
                        subtitle: "Measurable Outcomes",
                        text: "Achieved 35% adoption rate for lending products and a 30% reduction in development cycles through high-fidelity prototyping and early stakeholder alignment. Successfully delivered the end-to-end lending suite (Business Loans, Credit Cards, Overdrafts) plus ecosystem integrations for Marketplace and Open Banking, positioning the app as a holistic business tool."
                    },
                    {
                        subtitle: "Strategic Impact",
                        text: "Provided critical design leadership for a £14 billion digital transformation programme. The systemic design approach ensured consistency across five parallel products while personally leading the onboarding redesign that removed friction for new applicants, establishing the standard for all subsequent lending products.",
                        image: "/images/case-study-hsbc-kinectic-journey-5.png"
                    },
                    {
                        subtitle: "Organisational Change",
                        text: "Successfully mentored a lean design pod, establishing user-centred design (UCD) as a standard practice within the mobile banking division. The rapid prototyping framework demonstrated how design sprints could de-risk innovation and secure executive confidence—even in highly regulated environments."
                    }
                ],
                testimonials: [
                    {
                        quote: "David is an extremely competent UX lead with expert understanding of design. His work balancing user experience with technical constraints is exceptional while ensuring quality is not compromised.",
                        author: "Usha Sanku",
                        role: "Product Consultant, HSBC Kinetic"
                    }
                ]
            },
            {
                id: "takeaways",
                title: "Key Takeaways",
                icon: Shield,
                items: [
                    {
                        title: "The Power of Lean Teams",
                        text: "Leading a small, focused pod allowed for faster decision-making and tighter consistency across five products compared to larger design departments."
                    },
                    {
                        title: "Design as an Accelerator",
                        text: "Design sprints proved to be the best tool for de-risking innovation and identifying technical constraints early, gaining stakeholder buy-in across Product and Engineering."
                    },
                    {
                        title: "Systemic Thinking Scales",
                        text: "A unified design system philosophy ensured consistent user experiences across parallel product streams, from lending applications to Open Banking integrations."
                    }
                ]
            }
        ]
    },
};

// ============================================================================
// Main CaseStudy Component
// ============================================================================
export default function CaseStudy() {
    const params = useParams();
    const slug = params.slug || "";
    const caseStudy = caseStudiesData[slug as keyof typeof caseStudiesData];
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Check if case study is protected and if user has access
        if (!isCaseStudyProtected(slug)) {
            setIsUnlocked(true);
        } else {
            const unlocked = sessionStorage.getItem(`portfolio-unlocked`);
            if (unlocked === "true") {
                setIsUnlocked(true);
            }
        }
        setIsChecking(false);
    }, [slug]);

    const handleUnlock = useCallback(() => {
        setIsUnlocked(true);
    }, []);

    if (!caseStudy) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Case Study Not Found</h1>
                    <Link href="/#work" className="text-accent-foreground hover:underline">
                        ← Back to Work
                    </Link>
                </div>
            </div>
        );
    }

    // Show loading state while checking access
    if (isChecking) {
        return null;
    }

    // Show password gate if protected and not unlocked
    if (isCaseStudyProtected(slug) && !isUnlocked) {
        return (
            <PasswordGate
                slug={slug}
                onUnlock={handleUnlock}
                isLocked={true}
                title={caseStudy.title}
            />
        );
    }

    // Calculate reading time
    const totalText = JSON.stringify(caseStudy);
    const readingTime = calculateReadingTime(totalText);

    // Extract TOC sections
    const tocSections = caseStudy.sections.map(s => ({ id: s.id, title: s.title, icon: s.icon }));

    return (
        <article className="min-h-screen bg-background">
            <Header />
            <ReadingProgress />

            {/* Hero Section - max-w-5xl */}
            <section className="pt-24 pb-12 md:pt-32 md:pb-16">
                <div className="container max-w-5xl">
                    <Link
                        href="/#work"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors text-sm"
                    >
                        <ArrowLeft size={16} />
                        Back to Work
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium tracking-wide uppercase mb-4">
                            {caseStudy.company}
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 tracking-tight">
                            {caseStudy.title}
                        </h1>
                        {caseStudy.subtitle && (
                            <p className="font-sans text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                                {caseStudy.subtitle}
                            </p>
                        )}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                            <span className="font-sans">{caseStudy.role}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {caseStudy.period}
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span className="flex items-center gap-1">
                                <Clock size={14} />
                                {readingTime} min read
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Hero Image - max-w-5xl */}
            <section className="pb-12">
                <div className="container max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="rounded-lg overflow-hidden"
                    >
                        {caseStudy.thumbnail.match(/\.(mov|mp4|webm|avi)$/i) ? (
                            <video
                                src={caseStudy.thumbnail}
                                controls
                                muted
                                className="w-full h-auto max-h-[640px] object-cover"
                                poster="/videos/video-placeholder-hsbc-kinetic.png"
                            >
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <img
                                src={caseStudy.thumbnail}
                                alt={`${caseStudy.company} project`}
                                className="w-full h-auto max-h-[640px] object-cover"
                            />
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Executive Summary - Full width like hero */}
            {caseStudy.summary && (
                <section className="pb-12">
                    <div className="container max-w-5xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="space-y-6"
                        >
                            <div>
                                <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                                    TL;DR
                                </h3>
                                <p className="text-muted-foreground leading-relaxed text-lg">
                                    {caseStudy.summary}
                                </p>
                            </div>

                            {caseStudy.tldrTakeaways && caseStudy.tldrTakeaways.length > 0 && (
                                <div className="bg-secondary/20 rounded-xl border border-border p-6">
                                    <h4 className="font-sans font-semibold text-foreground mb-3 text-base">
                                        Key Takeaways
                                    </h4>
                                    <ul className="grid sm:grid-cols-2 gap-3">
                                        {caseStudy.tldrTakeaways.map((takeaway, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-base text-muted-foreground">
                                                <CheckCircle size={18} className="text-accent-foreground flex-shrink-0 mt-0.5" />
                                                <span>{takeaway}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Main Content - max-w-3xl with TOC sidebar */}
            <section className="pb-20">
                <div className="container max-w-7xl">
                    <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">

                        {/* Main Content Column - max-w-3xl */}
                        <div className="max-w-3xl">
                            {/* Key Metrics */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="mb-12"
                            >
                                <h3 className="font-serif text-lg text-muted-foreground mb-6 flex items-center gap-2">
                                    <TrendingUp size={18} className="text-accent-foreground" />
                                    <span>Key Results</span>
                                </h3>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {caseStudy.metrics.map((metric, idx) => (
                                        <div key={idx} className="p-5 bg-gradient-to-br from-secondary/50 to-secondary/20 rounded-xl border border-border hover:border-accent-foreground/30 hover:shadow-md transition-all duration-300 flex flex-col min-h-[120px]">
                                            <div className="font-serif text-3xl md:text-4xl font-bold text-accent-foreground tracking-tight">
                                                {metric.value}
                                            </div>
                                            <div className="font-sans font-semibold text-foreground leading-snug mt-2">
                                                {metric.label}
                                            </div>
                                            {metric.description && (
                                                <div className="font-sans text-sm text-muted-foreground mt-auto pt-3 border-t border-border/50">
                                                    {metric.description}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Dynamic Sections */}
                            {caseStudy.sections.map((section, sectionIdx) => {
                                const Icon = section.icon;
                                const delay = 0.6 + (sectionIdx * 0.1);

                                return (
                                    <motion.div
                                        key={section.id}
                                        id={section.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay }}
                                        className="mb-12 scroll-mt-24"
                                    >
                                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                                            <Icon className="text-accent-foreground" />
                                            {section.title}
                                        </h2>

                                        {/* Content with subtitles - text-lg, max-w-65ch */}
                                        {section.content && (
                                            <div className="space-y-6">
                                                {section.content.map((item, itemIdx) => (
                                                    <div key={itemIdx} className="pl-5 border-l-2 border-border">
                                                        <h3 className="font-sans font-semibold text-lg text-foreground mb-2">
                                                            {item.subtitle}
                                                        </h3>
                                                        <p className="font-sans text-lg text-muted-foreground leading-relaxed max-w-65ch">
                                                            {item.text}
                                                        </p>
                                                        {item.image && (
                                                            <PlaceholderImage
                                                                src={item.image}
                                                                alt={item.caption || item.subtitle}
                                                                caption={item.caption}
                                                                className="max-w-2xl ml-0"
                                                            />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Key Actions items */}
                                        {section.items && section.items.length > 0 && section.items[0]?.number && (
                                            <div className="space-y-4">
                                                {section.items.map((item, itemIdx) => (
                                                    <div key={itemIdx} className="p-5 bg-secondary/30 rounded-lg border border-border hover:border-accent-foreground/20 transition-all">
                                                        <div className="flex gap-4">
                                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-foreground text-white flex items-center justify-center font-serif text-lg font-bold">
                                                                {item.number}
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className="font-sans font-semibold text-lg text-foreground mb-2">
                                                                    {item.title}
                                                                </h4>
                                                                {item.text && (
                                                                    <p className="font-sans text-lg text-muted-foreground leading-relaxed max-w-65ch">
                                                                        {item.text}
                                                                    </p>
                                                                )}
                                                                {item.image && (
                                                                    <PlaceholderImage
                                                                        src={item.image}
                                                                        alt={item.caption || item.title}
                                                                        caption={item.caption}
                                                                        className="max-w-xl mt-4"
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Subsections with lists */}
                                        {section.subsections && (
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                {section.subsections.map((sub, subIdx) => (
                                                    <div key={subIdx} className="p-5 bg-secondary/30 rounded-lg border border-border">
                                                        <h4 className="font-sans font-semibold text-foreground mb-3 text-base">
                                                            {sub.title}
                                                        </h4>
                                                        <ul className="space-y-3">
                                                            {sub.items.map((subItem, subItemIdx) => (
                                                                <li key={subItemIdx} className="flex items-start gap-3">
                                                                    <CheckCircle size={16} className="text-accent-foreground flex-shrink-0 mt-0.5" />
                                                                    <span className="font-sans text-muted-foreground text-base leading-relaxed">
                                                                        {subItem}
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* What worked well / Challenges / Lessons */}
                                        {section.items && section.items.length > 0 && !section.items[0]?.number && (
                                            <div className="space-y-4">
                                                {section.items.map((item, itemIdx) => (
                                                    <div key={itemIdx} className="p-5 bg-secondary/30 rounded-lg border border-border">
                                                        <h4 className="font-sans font-semibold text-foreground mb-3 text-lg leading-snug">
                                                            {item.title}
                                                        </h4>
                                                        {item.items ? (
                                                            <ul className="space-y-3">
                                                                {item.items.map((subItem, subItemIdx) => (
                                                                    <li key={subItemIdx} className="flex items-start gap-3">
                                                                        <CheckCircle size={16} className="text-accent-foreground flex-shrink-0 mt-0.5" />
                                                                        <span className="font-sans text-muted-foreground text-base leading-relaxed">
                                                                            {subItem}
                                                                        </span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : item.text ? (
                                                            <p className="font-sans text-muted-foreground leading-relaxed max-w-65ch">
                                                                {item.text}
                                                            </p>
                                                        ) : null}
                                                        {item.image && (
                                                            <PlaceholderImage
                                                                src={item.image}
                                                                alt={item.caption || item.title}
                                                                caption={item.caption}
                                                                className="max-w-3xl mt-6 rounded-lg border border-border/50 shadow-sm"
                                                            />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Testimonials */}
                                        {section.testimonials && (
                                            <div className="space-y-4">
                                                {section.testimonials.map((testimonial, tIdx) => (
                                                    <div key={tIdx} className="p-6 bg-gradient-to-br from-accent/5 via-background to-background rounded-lg border border-border">
                                                        <QuoteIcon className="text-accent-foreground/40 mb-4" />
                                                        <p className="font-sans text-lg text-muted-foreground leading-relaxed italic mb-4 max-w-65ch">
                                                            "{testimonial.quote}"
                                                        </p>
                                                        <div className="flex items-center gap-3">
                                                            {testimonial.photo ? (
                                                                <img
                                                                    src={testimonial.photo}
                                                                    alt={testimonial.author}
                                                                    className="w-12 h-12 rounded-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-12 h-12 rounded-full bg-accent-foreground/10 flex items-center justify-center">
                                                                    <span className="font-sans font-semibold text-accent-foreground text-lg">
                                                                        {testimonial.author.charAt(0)}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            <div>
                                                                <p className="font-sans font-semibold text-foreground">
                                                                    {testimonial.author}
                                                                </p>
                                                                <p className="font-sans text-sm text-muted-foreground">
                                                                    {testimonial.role}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <SectionDivider />
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* TOC Sidebar - sticky on desktop */}
                        <div className="hidden lg:block">
                            <TableOfContents sections={tocSections} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Next Project */}
            <section className="py-20 border-t border-border bg-secondary/20">
                <div className="container max-w-5xl text-center">
                    <h3 className="font-serif text-2xl text-foreground mb-6">
                        Interested in working together?
                    </h3>
                    <Link
                        href="mailto:david.phillip@gmail.com"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-sm font-sans font-medium hover:bg-primary/90 transition-colors duration-200"
                    >
                        Let's Work Together
                    </Link>
                </div>
            </section>
        </article>
    );
}

function QuoteIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
        </svg>
    );
}

function Palette({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
        </svg>
    );
}
