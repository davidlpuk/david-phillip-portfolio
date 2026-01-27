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
                        text: "Coutts serves Britain's wealthiest families, including the Royal Family. But their digital experience was stuck in the 2000s. Clients managing eight-figure portfolios used clunky legacy portals while competitors won younger prospects with modern apps. 40% of prospects under 50 cited outdated digital tools as their reason for choosing competitors.",
                        image: "/images/case-study-coutts-before-after.png",
                        caption: "Legacy portal (left) versus modern banking apps (right) — the gap that was costing Coutts younger clients"
                    },
                    {
                        subtitle: "Organisational Complexity",
                        text: "As a 330-year-old institution, any change required approval from Compliance, Legal, Risk, and Technology. Previous digital initiatives had stalled for years. The design team was small, treated as 'styling' rather than strategy, and made decisions based on opinions rather than evidence. Compliance and Risk acted as gatekeepers, not partners."
                    },
                    {
                        subtitle: "The Threefold Problem",
                        text: "Build team capability from scratch. Modernise legacy systems with zero tolerance for security incidents. Navigate intense regulatory scrutiny whilst maintaining the discreet brand identity wealthy clients expected."
                    }
                ]
            },
            {
                id: "strategy",
                title: "Strategy & Approach",
                icon: Target,
                content: [
                    {
                        subtitle: "Vision: Quiet Confidence",
                        text: "I reframed the challenge: prove heritage institutions can deliver world-class digital. The design vision — 'Quiet Confidence' — meant prestige through clarity and discretion, not gamification. Every decision translated into revenue and risk: the metrics executives cared about."
                    },
                    {
                        subtitle: "Three Strategic Pillars",
                        text: "Build sustainable design capability — not just deliver projects. Replace opinion with evidence — establish research as standard practice. Turn Compliance and Risk into co-creators — embed them in the process from day one."
                    },
                    {
                        subtitle: "Making Stakeholders Co-Owners",
                        text: "Compliance and Risk joined design sprints from day one. They attended research sessions, co-created principles, and understood our commercial pressure while we understood their legal exposure. This relationship shift unlocked faster progress than any previous digital initiative. I built an ROI model showing Figma would save £400K+ annually through reduced rework — turning Engineering into advocates.",
                        image: "/images/coutts-workshop-facilitating.png",
                        caption: "Facilitating a cross-functional workshop with Compliance and Product teams"
                    },
                    {
                        subtitle: "Speaking to the Board",
                        text: "I presented quarterly to the executive committee, framing design progress in their language: client acquisition cost, asset retention risk, and operational efficiency. No wireframes — just metrics, strategic trade-offs, and clear asks. This earned design a seat at planning conversations, not just delivery reviews."
                    }
                ]
            },
            {
                id: "building-team",
                title: "Building the Team",
                icon: CheckCircle,
                content: [
                    {
                        subtitle: "How I Hired",
                        text: "I hired for trajectory over pedigree. Several of my best hires came from adjacent industries — they brought fresh perspectives unconstrained by 'how banking apps should work.' I structured interviews around real problems: candidates worked through actual Coutts challenges, revealing how they think under ambiguity. Portfolio reviews focused on process and decision-making, not just final outputs.",
                        caption: "Team photo showing leadership and design specialists in context"
                    },
                    {
                        subtitle: "Team Structure",
                        text: "I restructured from UX/UI splits to holistic Product Designers supported by centralised Design Operations — eliminating handoffs and empowering designers to own end-to-end experiences."
                    },
                    {
                        subtitle: "Retention",
                        text: "100% retention over two years — through a pandemic, return-to-office tensions, and a competitive hiring market where fintech salaries spiked 25%. Industry average: 78%. Multiple team members were subsequently promoted into leadership roles across NatWest Group."
                    },
                    {
                        subtitle: "How I Developed People",
                        text: "Quarterly growth conversations focused on career trajectory, not just performance. Stretch assignments matched to individual development goals. Sponsorship over mentorship — actively creating opportunities, not just giving advice. Protected maker time — designers had uninterrupted focus blocks for deep work.",
                        image: "/images/coutts-team-scaling.svg",
                        caption: "Team growth from 5 to 15 specialists across four phases"
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
                        text: "Created quarterly research cycles that embedded evidence across Product and Engineering. Shifted the organisation from 'I think' to 'we know' — with research informing roadmap decisions at executive level."
                    },
                    {
                        number: "2",
                        title: "Led group-wide Figma migration",
                        text: "Migrated 280+ designers across NatWest Group (4 brands) from Sketch to Figma. Established cross-brand design system governance: single source of truth for Engineering, audit trail for Compliance."
                    },
                    {
                        number: "3",
                        title: "Transformed stakeholder dynamics",
                        text: "Embedded regulatory teams in design sprints from the start. Baked requirements into the design process rather than bolting them on at the end. Compliance became advocates, not blockers."
                    },
                    {
                        number: "4",
                        title: "Designed and launched the Coutts mobile app",
                        text: "Led the design of Coutts' first modern native mobile experience, replacing fragmented legacy portals with a cohesive app built on 'Quiet Confidence'. Achieved 4.2+ app rating with zero security incidents post-launch.",
                        image: "/images/coutts-hero-app-screens.png",
                        caption: "Final app design: Portfolio-first hierarchy reflecting 'Quiet Confidence' design vision"
                    },
                    {
                        number: "5",
                        title: "Elevated design to strategic capability",
                        text: "Positioned design as a function regularly presenting to executive committee. Created 'design open houses' and cross-functional rituals that changed how the organisation engaged with design."
                    },
                ]
            },
            {
                id: "research",
                title: "Research & Discovery",
                icon: Search,
                content: [
                    {
                        subtitle: "The Access Challenge",
                        text: "Researching ultra-high-net-worth clients in a regulated environment isn't straightforward. Client access required months of approval. Initially, I relied on relationship manager insights — and several design decisions had to be reversed post-launch as a result. Lesson learned: Start fighting for direct client access immediately, even when approval processes seem insurmountable.",
                        image: "/images/coutts-research-methodology.png",
                        caption: "Our research methodology: from discovery to synthesis"
                    },
                    {
                        subtitle: "What We Did",
                        text: "Conducted quarterly research cycles including interviews, surveys, and usability tests with UHNW clients. Deep-dived into relationship manager workflows, compliance requirements, and executive expectations. Benchmarked against premium banking and wealth management apps to identify differentiation opportunities. Created detailed journey maps identifying pain points in legacy portals."
                    },
                    {
                        subtitle: "Key Insight",
                        text: "Research revealed that wealthy clients didn't want gamification or flashy features. They wanted clarity, discretion, and confidence that their information was secure. This validated the 'Quiet Confidence' direction and killed several feature ideas that would have felt downmarket."
                    }
                ]
            },
            {
                id: "hands-on",
                title: "Hands-On Involvement",
                icon: PenTool,
                content: [
                    {
                        subtitle: "Design Decisions I Shaped",
                        text: "While my team owned day-to-day design, I directly shaped key moments. Onboarding flow: I sketched the initial concept that framed portfolio overview as the first screen — not transactions. This set the 'wealth first, banking second' hierarchy that defined the product. Data visualisation approach: I prototyped three portfolio chart concepts to test whether clients wanted detail or simplicity. Research killed my preferred option — they wanted less. Information architecture: When we hit a 3-month deadlock balancing client needs against regulatory requirements, I ran a FigJam workshop with Compliance that created the breakthrough.",
                        image: "/images/coutts-data-visualisation.png",
                        caption: "Portfolio chart evolution: from detailed breakdowns to simplified confidence views"
                    },
                    {
                        subtitle: "Design Reviews",
                        text: "I ran weekly design critiques focused on 'what decision are we making?' not 'what do we think of this design?' This shifted conversations from subjective preference to strategic alignment. Designers came prepared with the problem they were solving, not just the screens they'd made."
                    },
                    {
                        subtitle: "Prototyping Cadence",
                        text: "Established rapid prototyping rhythm that unlocked stakeholder alignment in weeks rather than months. I stayed hands-on: facilitating design sprints when political complexity required executive presence, prototyping key interactions myself when fast iteration was needed.",
                        image: "/images/coutts-flows.png",
                        caption: "Design iteration: from wireframe to high-fidelity to live product"
                    }
                ]
            },
            {
                id: "design-system",
                title: "Design System",
                icon: LayoutTemplate,
                content: [
                    {
                        subtitle: "Component Library",
                        text: "Built 280+ components spanning atoms to templates. Established design tokens for colour, typography, and spacing. Created governance model ensuring consistency across Coutts and the wider NatWest Group. The design system enabled rapid iteration and maintained visual consistency across all touchpoints.",
                        image: "/images/coutts-design-system.png",
                        caption: "Design system components: buttons, cards, and data visualisation samples"
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
                        text: "Reduced design-to-development handoff time by 40%. Achieved 3x digital onboarding capacity without additional operations staff. Reduced routine enquiries to relationship managers by 25%.",
                        image: "/images/coutts-impact-metrics.png",
                        caption: "Impact metrics: 40% faster handoff, 25% reduction in routine enquiries"
                    },
                    {
                        subtitle: "Culture & Capability",
                        text: "Design elevated from 'styling' function to strategic capability. Compliance teams now attend design sprints as standard practice. Multiple team members promoted into leadership roles across NatWest Group. Infrastructure still in use 3+ years later."
                    },
                    {
                        subtitle: "Security & Trust",
                        text: "Zero security incidents post-launch despite aggressive timelines. Maintained the discretion and premium feel UHNW clients expect."
                    }
                ]
            },
            {
                id: "what-worked",
                title: "What Worked Well",
                icon: Lightbulb,
                items: [
                    {
                        title: "Embedding Compliance from day one",
                        text: "They attended research, co-created principles, and understood our commercial pressure whilst we understood their legal exposure. This relationship shift was more valuable than any single feature — and the unlock for moving faster than ever before."
                    },
                    {
                        title: "Quantifying design in business language",
                        text: "Translating recommendations into revenue impact or risk mitigation made stakeholders co-owners, not sceptics. One avoided feature saved 6 months of development and became our proof point for years."
                    },
                    {
                        title: "Building capability, not just delivering projects",
                        text: "Focusing on team growth, research infrastructure, and tool adoption created lasting impact. The systems I established still drive value 3+ years later."
                    }
                ]
            },
            {
                id: "lessons",
                title: "Lessons Learned",
                icon: Lightbulb,
                items: [
                    {
                        title: "Start the access fight early",
                        text: "In regulated environments, approval for direct client research takes months. I initially relied on relationship manager proxies — and paid for it with post-launch rework. Next time: begin the access request on day one, even if it feels premature."
                    },
                    {
                        title: "Prestige means restraint",
                        text: "Wealthy clients don't want what works for consumer fintech. Many 'best practices' had to be rejected. Validation through user testing was essential — assumptions about premium audiences were often wrong."
                    },
                    {
                        title: "Your best idea might be wrong",
                        text: "I was convinced clients wanted detailed portfolio breakdowns. Research showed they wanted simplicity and confidence, not granularity. Being willing to kill my own ideas built credibility with the team."
                    }
                ]
            },
            {
                id: "testimonials",
                title: "What Others Said",
                icon: Award,
                testimonials: [
                    {
                        quote: "I worked for David for almost a year at Coutts bank and found him to be one of the most thoughtful managers I have known. He really goes above and beyond to create a great work environment. In addition to being a great manager, David is a smart designer with a deep knowledge of all levels of the UX process.",
                        author: "Kiri Romero",
                        role: "UX Designer, Coutts",
                        photo: "/images/testimonial-kiri-romero.png"
                    },
                    {
                        quote: "David excelled in organising and hiring for a very fast growing team, working hard to improve the team's ways of working and processes. David helped to support me as I moved into a lead UI position with empathy and patience. The team flourished under his leadership — he was both diplomatic and challenging with the team to help improve efficiency and creativity.",
                        author: "Jacqui Chadwick",
                        role: "Lead UI Designer, Coutts",
                        photo: "/images/testimonial-jacqui-chadwick.png"
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
                        text: "Embed regulatory functions in the creative process. Their constraints become design inputs, and they become advocates."
                    },
                    {
                        title: "Quantify everything",
                        text: "Translate design decisions into revenue and risk. Stakeholders become co-owners when they see their metrics."
                    },
                    {
                        title: "Build capability, not just deliverables",
                        text: "Apps can be rebuilt. Organisational capability compounds."
                    },
                    {
                        title: "Hire for trajectory",
                        text: "The best candidates aren't always from your industry — fresh perspectives often outperform domain expertise."
                    },
                    {
                        title: "Heritage institutions can move fast",
                        text: "If you invest in relationships and prove value early."
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
        summary: "HSBC's business banking platform for SME customers had become a competitive liability. Small business owners were abandoning mid-task at rates 3x industry average. The experience felt like 'banking from 2010' — clunky, inconsistent, and overwhelming. As Design Lead for Commercial Banking, I led a team of 6 designers, owned the end-to-end redesign of the onboarding and account management flows, and established the design practice within Business Banking. I made the strategic call to rebuild the core account dashboard rather than iterate — a 9-month investment that required significant stakeholder alignment.",
        tldrTakeaways: [
            "Led team of 6 designers across business banking and cash management products",
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
                        subtitle: "Business Context",
                        text: "HSBC's business banking platform for SME customers had become a competitive liability. Small business owners were abandoning mid-task at rates 3x industry average. The experience felt like 'banking from 2010' — clunky, inconsistent, and overwhelming. Leadership recognised that digital experience was now a differentiator in SME banking, and the existing platform was losing customers to digital-first challengers."
                    },
                    {
                        subtitle: "The Scale of the Problem",
                        text: "With millions of SME customers across the UK, the platform couldn't simply be replaced. We needed to evolve it while maintaining the complexity required for business banking: multiple users, role-based permissions, compliance requirements, and complex financial operations. The challenge wasn't just UX — it was architecture, compliance, and organisational alignment."
                    },
                    {
                        subtitle: "Competitive Pressure",
                        text: "Challenger banks like Tide and Starling had raised the bar for digital business banking. HSBC's SME customers increasingly compared their banking experience to consumer apps — and found the business platform wanting. The risk wasn't just lost customers; it was the perception that HSBC couldn't deliver modern digital experiences."
                    }
                ]
            },
            {
                id: "role",
                title: "Role & Ownership",
                icon: CheckCircle,
                content: [
                    {
                        subtitle: "Leadership Scope",
                        text: "I led a team of 3 designers across business banking and lending products. This was a new practice within Business Banking — previously, design was embedded within product teams without standardised processes or governance. I established hiring frameworks, design review processes, and relationship structures with Product and Engineering."
                    },
                    {
                        subtitle: "Strategic Ownership",
                        text: "I directly owned the end-to-end redesign of the lending product flows — HSBC's highest-volume digital interactions. I partnered with Product leadership to influence the roadmap, shifting prioritisation toward experience consistency over feature velocity. This required building credibility with stakeholders who were accustomed to shipping features quickly."
                    },
                    {
                        subtitle: "Strategic Decision",
                        text: "I made the call to focus on business credit cards and small business loans - ensuring the core products business owners wanted were there from day one. This was an investment that required significant stakeholder alignment — Product wanted incremental improvements, but I argued that the technical debt and UX problems required a fundamental rebuild. We ran pilots to validate the approach and secured executive sponsorship for the investment."
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
                        text: "Product leadership wanted incremental improvements to avoid a long development cycle. I pushed back, arguing that technical debt and inconsistent UX patterns meant iteration would actually take longer and produce worse results. I proposed a parallel-run approach: build new dashboard alongside existing one, validate with users, then migrate. This 9-month investment required executive sponsorship but ultimately delivered the breakthrough experience we needed.",
                        caption: "Dashboard evolution: from legacy interface to redesigned experience"
                    },
                    {
                        number: "2",
                        title: "Progressive disclosure vs. simplified flows",
                        text: "Product Owners requested a dramatically simplified interface that would have removed functionality business owners needed. I pushed back, arguing that removing features would force users to call support for tasks they previously handled themselves. I advocated for progressive disclosure that surfaced common tasks while keeping advanced features accessible. We tested both approaches and my position was validated — the progressive disclosure version saw a 32% satisfaction increase."
                    },
                    {
                        number: "3",
                        title: "Design system investment",
                        text: "I convinced leadership to pause feature work for 6 weeks to establish a component library. This was controversial — it felt like we were slowing down when we needed to move faster. But I argued that inconsistency was causing development bugs and rework. The investment reduced development bugs by 40% in subsequent quarters and accelerated development velocity significantly."
                    },
                    {
                        number: "4",
                        title: "Continuous research cadence",
                        text: "I introduced monthly research sessions rather than project-based research. This created a continuous feedback loop that informed roadmap decisions. I also built an in-house research repository that reduced research time by 50% — instead of starting from scratch, designers could access previous findings and avoid duplicating work."
                    }
                ]
            },
            {
                id: "research",
                title: "Research & Discovery",
                icon: Search,
                content: [
                    {
                        subtitle: "Research Approach",
                        text: "I established a continuous research program with monthly usability sessions. This wasn't project-based research that happened once per initiative — it was an ongoing relationship with our users that built institutional knowledge. We interviewed small business owners about their banking workflows, pain points, and expectations. We observed them completing tasks in the existing platform and identified where abandonment occurred."
                    },
                    {
                        subtitle: "Key Insights",
                        text: "Research revealed that business owners didn't want a 'consumerised' experience — they needed efficiency and clarity, not gamification. The existing platform overwhelmed users with options but buried the tasks they performed daily. Our redesign prioritised task visibility and reduced cognitive load while maintaining access to complex functionality."
                    },
                    {
                        subtitle: "Research Repository",
                        text: "I built an in-house research repository that captured insights systematically. This reduced research time by 50% because designers could access previous findings instead of starting from scratch. It also created institutional memory that persisted beyond individual projects."
                    }
                ]
            },
            {
                id: "design-system",
                title: "Design System",
                icon: LayoutTemplate,
                content: [
                    {
                        subtitle: "Component Library Investment",
                        text: "I convinced leadership to pause feature work for 6 weeks to establish a component library. This was the right call: we built 150+ components that ensured consistency across touchpoints and accelerated development velocity. The investment reduced development bugs by 40% in subsequent quarters and became the foundation for all Business Banking products.",
                        caption: "Design system components: buttons, cards, and form elements"
                    },
                    {
                        subtitle: "Adoption & Governance",
                        text: "Design system adoption reached 85% across Business Banking products within 12 months. I established governance processes that made it easy for designers and developers to use the system while maintaining quality standards. Components were documented with clear usage guidelines and accessibility requirements."
                    }
                ]
            },
            {
                id: "ai-integration",
                title: "AI Integration",
                icon: Rocket,
                content: [
                    {
                        subtitle: "Research Synthesis",
                        text: "I implemented AI-assisted user research synthesis using Claude for interview analysis. This accelerated insight extraction without replacing human judgment. AI handled the mechanical parts of analysis — identifying patterns, categorising feedback, surfacing quotes — giving designers more time for synthesis and strategic thinking.",
                        caption: "AI-augmented design workflow for research and ideation"
                    },
                    {
                        subtitle: "Competitive Analysis",
                        text: "I created prompt libraries for competitive analysis and design pattern documentation. These prompts standardised how we captured and shared competitor insights, making the team more efficient and ensuring consistency across projects."
                    },
                    {
                        subtitle: "Team Training",
                        text: "I led team training on AI-augmented design workflows, establishing principles for when AI helps and when it hinders. The goal was augmentation, not replacement — using AI to think faster about research, not to make design decisions without human input."
                    }
                ]
            },
            {
                id: "impact",
                title: "Impact & Outcomes",
                icon: TrendingUpIcon,
                content: [
                    {
                        subtitle: "User Metrics",
                        text: "Task completion rates improved from 62% to 81% across core workflows. Mobile engagement increased 32% within 6 months of launch. Customer satisfaction scores (CSAT) improved 18 points year-over-year. These weren't vanity metrics — they translated directly to customer retention and reduced support costs.",
                        image: "/images/coutts-impact-metrics.svg",
                        caption: "Impact metrics: 19pt improvement in task completion, 32% increase in mobile engagement"
                    },
                    {
                        subtitle: "Operational Impact",
                        text: "Design system adoption reached 85% across Business Banking products. Reduced design-to-development handoff time by 45%. Development bugs reduced by 40% after design system implementation."
                    },
                    {
                        subtitle: "Organisational Change",
                        text: "Design became a respected function within Business Banking. The team I built established design review as standard practice, and research informed roadmap decisions. These foundations persisted beyond my tenure."
                    }
                ]
            },
            {
                id: "reflection",
                title: "Honest Reflection",
                icon: Lightbulb,
                content: [
                    {
                        subtitle: "What I'd Do Differently",
                        text: "I initially underestimated the complexity of migrating existing customers to the new experience. The parallel-run approach we eventually adopted was the right solution, but I should have anticipated this earlier. I would have engaged the customer success team from the start to understand migration concerns and established baseline metrics more rigorously before starting."
                    },
                    {
                        subtitle: "What Worked",
                        text: "The decision to invest in the design system before shipping features was critical — even though it was uncomfortable explaining the delay to stakeholders. The continuous research cadence built institutional knowledge that made every subsequent project faster. Building credibility with Product leadership through early wins created space for the larger transformation work."
                    },
                    {
                        subtitle: "What I'd Do Sooner",
                        text: "I should have established the design review process as mandatory from day one. Initially, I was too accommodating of 'just this once' exceptions. This created inconsistency that took months to clean up."
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
                        text: "Sometimes the fastest path is a slower one. If technical debt and UX problems are fundamental, iteration becomes slower than rebuilding. The key is validating the approach with pilots and securing executive sponsorship."
                    },
                    {
                        title: "Design systems require investment",
                        text: "A component library isn't a nice-to-have — it's infrastructure that compounds. The 6-week pause felt expensive, but the bug reduction and velocity gains made it the highest-ROI decision of the project."
                    },
                    {
                        title: "Continuous research builds institutional knowledge",
                        text: "Monthly research sessions created a feedback loop that made every design decision better. The research repository ensured insights persisted beyond individual projects."
                    },
                    {
                        title: "Stakeholder alignment takes time",
                        text: "Changing how an organisation values design requires proof points, persistence, and patience. The early wins that built credibility were essential for creating space for the larger transformation."
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
                        text: "Cognism had grown rapidly to $80M ARR , but the product experience hadn't kept pace. Sales teams were churning because the platform felt dated, inconsistent, and hard to use. NPS had dropped to -16, and the leadership team recognised that product experience was now a competitive differentiator in the sales intelligence market.",
                        image: "/images/cognism-case-study-01.png",
                        caption: "Legacy interface (left) versus the redesigned experience (right) that drove NPS improvement"
                    },
                    {
                        subtitle: "No Design Function",
                        text: "When I joined, there was no UX team. Product decisions were made based on stakeholder opinions rather than user research. Engineering built what was spec'd without design review. The result: inconsistent patterns, confusing workflows, and a platform that didn't match the sophistication of Cognism's data offering."
                    },
                    {
                        subtitle: "The Business Imperative",
                        text: "In the sales intelligence market, user experience is the product. Competing against players like ZoomInfo meant Cognism needed a platform that didn't just have better data — it needed to be easier to use. The executive team understood this and gave me a clear mandate: build a design function that could transform the product experience."
                    }
                ]
            },
            {
                id: "role",
                title: "Role & Ownership",
                icon: CheckCircle,
                content: [
                    {
                        subtitle: "Building from Scratch",
                        text: "As the first UX hire, I had the unusual opportunity — and responsibility — of building the function from nothing. This meant not just hiring designers, but establishing the processes, culture, and credibility that would make design a trusted partner across the organisation.",
                        image: "/images/cognism-case-study-02.png",
                        caption: "The Cognism UX team at full size: 4 designers with clear ownership areas"
                    },
                    {
                        subtitle: "What I Owned",
                        text: "I owned the end-to-end design function: hiring, mentoring, process establishment, design operations, and direct leadership of key initiatives. I partnered with Product and Engineering leadership to define product strategy and made the strategic decision to prioritise platform consistency over feature velocity."
                    },
                    {
                        subtitle: "Direct Leadership",
                        text: "I directly led the redesign of Cognism's core search and list view experience — the most used features in the product. This wasn't just about UX improvement; it was about proving the value of design investment and creating momentum for broader changes."
                    }
                ]
            },
            {
                id: "hiring",
                title: "Building the Team",
                icon: CheckCircle,
                content: [
                    {
                        subtitle: "Hiring Strategy",
                        text: "I hired for trajectory over pedigree. Given Cognism was a scale-up, I needed designers who could thrive in ambiguity, build processes from scratch, and grow with the company. I established clear hiring frameworks and design career ladders that gave the team visibility into growth paths.",
                        image: "/images/cognism-case-study-03.png",
                        caption: "Design system components established during my tenure"
                    },
                    {
                        subtitle: "Team Composition",
                        text: "Grew from 0 to 4 designers over 18 months: 2 Senior Designers (to handle complexity and mentor others), 1 Mid-level Designer (core execution), and 1 Junior Designer (growth potential). This structure let me balance delivery with capability building."
                    },
                    {
                        subtitle: "Mentorship & Development",
                        text: "I invested heavily in mentorship, treating it as a core part of my role rather than an add-on. Weekly 1:1s, regular design critiques, and stretch assignments matched to individual development goals. Multiple team members have since been promoted or taken leadership roles elsewhere."
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
                        title: "Prioritised design system over features",
                        text: "For Q1-Q2, I made the controversial decision to invest in a component library and design tokens rather than shipping new features. This sacrificed short-term velocity but created the foundation for everything that followed. By Q3, we were iterating 3x faster than competitors who were still building from scratch.",
                        image: "/images/cognism-case-study-04.png",
                        caption: "Design system investment enabled rapid iteration across the product"
                    },
                    {
                        number: "2",
                        title: "Pivoted to iterative improvements",
                        text: "Initial instinct was a comprehensive redesign. User research revealed this was too risky — users were attached to certain workflows even if they were suboptimal. I pivoted to iterative improvements based on continuous research, reducing change aversion while still driving progress."
                    },
                    {
                        number: "3",
                        title: "Influenced product roadmap",
                        text: "Through regular presence in roadmap planning, I deprioritised low-value features in favour of core experience improvements. This required building credibility with Product leadership and showing — not just telling — how design investment translated to business value."
                    },
                    {
                        number: "4",
                        title: "Established design review process",
                        text: "Created a structured design review process that became mandatory before engineering handoff. This caught issues earlier, reduced rework, and educated stakeholders on what good design looked like."
                    }
                ]
            },
            {
                id: "search-redesign",
                title: "Core Search Redesign",
                icon: Search,
                content: [
                    {
                        subtitle: "The Problem",
                        text: "Cognism's search was its most used feature — and its most frustrating. Users couldn't find the right companies or contacts. Results felt random rather than ranked. The list view that followed was cluttered and overwhelming. These weren't just UX problems; they were business problems affecting customer retention.",
                        image: "/images/cognism-case-study-05.png",
                        caption: "Before and after: the redesigned search and list view experience"
                    },
                    {
                        subtitle: "My Approach",
                        text: "I led this initiative personally, combining strategic thinking with hands-on design. I ran workshops with sales teams to understand their workflows, tested prototypes with customers, and iterated based on feedback. The result was a search experience that felt intuitive, list views that were scannable, and — most importantly — results that matched user intent."
                    },
                    {
                        subtitle: "Impact",
                        text: "The redesigned search and list view drove significant improvements in user satisfaction for core workflows. Combined with the broader platform improvements, this was a key driver of the NPS improvement from -16 to +12."
                    }
                ]
            },
            {
                id: "ai-integration",
                title: "AI Integration",
                icon: Rocket,
                content: [
                    {
                        subtitle: "Research Synthesis",
                        text: "I implemented AI-assisted user research synthesis using Claude to accelerate insight extraction. This wasn't about replacing human judgment — it was about giving designers more time for the work that matters by automating the mechanical parts of analysis.",
                        image: "/images/cognism-case-study-06.png",
                        caption: "AI-augmented design workflow for research and ideation"
                    },
                    {
                        subtitle: "Prompt Library",
                        text: "Created a prompt library for common design tasks: user persona development, competitive analysis, design critique, and problem reframing. This became a team resource that accelerated onboarding and standardised high-quality thinking."
                    },
                    {
                        subtitle: "Team Training",
                        text: "Led team training on AI-augmented design workflows, establishing principles for when AI helps and when it hinders. The goal was augmentation, not replacement — using AI to think faster, not think differently."
                    }
                ]
            },
            {
                id: "impact",
                title: "Impact & Outcomes",
                icon: TrendingUpIcon,
                content: [
                    {
                        subtitle: "User Metrics",
                        text: "NPS improved from -16 to +12 over 18 months. User satisfaction scores for core workflows increased 40%. These weren't vanity metrics — they translated directly to customer retention and sales team confidence in the platform.",
                        image: "/images/cognism-case-study-07.svg",
                        caption: "Key metrics: NPS improvement, team growth, and efficiency gains"
                    },
                    {
                        subtitle: "Team & Process",
                        text: "Design system adoption reached 90% across product teams. Design-to-development handoff time reduced by 50%. The team grew from 0 to 4 designers with clear career trajectories."
                    },
                    {
                        subtitle: "Organisational Change",
                        text: "Design went from being ignored to being a respected function. Product leadership actively sought design input on roadmap decisions. Engineering valued the component library that reduced their workload."
                    }
                ]
            },
            {
                id: "reflection",
                title: "Honest Reflection",
                icon: Lightbulb,
                content: [
                    {
                        subtitle: "What I'd Do Differently",
                        text: "The biggest mistake was underestimating organisational change management. I focused on building the team and outputs but didn't invest enough in stakeholder alignment early on. By month 6, I had to pause feature work for 3 weeks to realign with product leadership on priorities. Now I always establish shared OKRs and review cadences before starting any significant initiative."
                    },
                    {
                        subtitle: "What I'd Do Sooner",
                        text: "I should have established design review as mandatory from day one. Initially, I was too accommodating of 'just this once' exceptions. This created technical debt and inconsistent patterns that took months to clean up."
                    },
                    {
                        subtitle: "What Worked",
                        text: "The decision to invest in the design system before shipping features was the right call — even though it was uncomfortable explaining to leadership why we weren't shipping. The search redesign was a proof point that justified that investment and created momentum for everything that followed."
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
                        text: "I proved design value through the search redesign before asking for broader investment. Leaders who were skeptical became advocates when they saw tangible results."
                    },
                    {
                        title: "Change management is part of the job",
                        text: "Building a team isn't just hiring — it's establishing the processes, relationships, and credibility that let that team succeed. I underestimated this and paid the price with a mid-program pause."
                    },
                    {
                        title: "Short-term sacrifice enables long-term gain",
                        text: "The design system investment felt slow initially. But by Q3, we were iterating faster than teams that had started feature work earlier. Foundation enables velocity."
                    },
                    {
                        title: "Hire for trajectory, not pedigree",
                        text: "In a scale-up, I needed designers who could build things from nothing and thrive in ambiguity. Domain expertise was less valuable than adaptability and growth mindset."
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
                id: "deliverables",
                title: "Key Deliverables & Actions",
                icon: CheckCircle,
                items: [
                    {
                        title: "End-to-End Lending Suite",
                        text: "Directed the UX strategy for Business Loans, Credit Cards, and Overdrafts."
                    },
                    {
                        title: "Ecosystem Integration",
                        text: "Led the design for Marketplace Integrations and Open Banking, positioning the app as a holistic business tool rather than just a bank account."
                    },
                    {
                        title: "Onboarding Transformation",
                        text: "Personally led the redesign of the digital onboarding journey to remove friction for new applicants, establishing the standard for all subsequent lending products."
                    },
                    {
                        title: "Process Optimisation",
                        text: "Implemented a repeatable sprint framework that reduced time-to-market for feature iterations by 30%."
                    }
                ]
            },
            {
                id: "work-built",
                title: "Examples of Work Built",
                icon: Layers,
                items: [
                    {
                        title: "Full Flow: Personal Guarantee Overdraft Extension",
                        image: "/images/case-study-hsbc-kinectic-journeys-1.png",
                        caption: "An example of a Personal Guarantee Overdraft Extension journey showing full flow with edge cases."
                    },
                    {
                        title: "Detailed Interaction",
                        image: "/images/case-study-hsbc-kinectic-journeys-zoom-2.png",
                        caption: "Zoomed up example of the detail of each screen showing precise detail and different interactions with other journeys within the wider-app."
                    },
                    {
                        title: "Screen Details",
                        image: "/images/case-study-hsbc-kinectic-journey-3.png",
                        caption: "Example of zoomed up screens."
                    }
                ]
            },
            {
                id: "impact",
                title: "Impact & Results",
                icon: TrendingUpIcon,
                content: [
                    {
                        subtitle: "35% Adoption Rate",
                        text: "High uptake of lending products among the initial Kinetic user base."
                    },
                    {
                        subtitle: "30% Faster Delivery",
                        text: "Reduced development cycles through high-fidelity prototyping and early stakeholder alignment."
                    },
                    {
                        subtitle: "£14bn Programme Support",
                        text: "Provided critical design leadership for one of HSBC’s largest-ever digital investments."
                    },
                    {
                        subtitle: "Team Growth",
                        text: "Successfully mentored a lean design pod, establishing user-centred design (UCD) as a standard practice within the mobile banking division."
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
                id: "reflections",
                title: "Critical Reflections",
                icon: Shield,
                items: [
                    {
                        title: "The Power of Lean Teams",
                        text: "Leading a small, focused pod allowed for faster decision-making and tighter consistency across the five products compared to larger, more bloated design departments."
                    },
                    {
                        title: "Navigating Complexity",
                        text: "The project proved that even in highly regulated environments, rapid prototyping is the best tool for de-risking innovation and securing executive confidence."
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
