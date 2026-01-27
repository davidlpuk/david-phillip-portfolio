import {
    Users, TrendingUp, Shield, Brain, Layers,
    CheckCircle, BarChart3, PieChart
} from "lucide-react";

export type BlueprintType = 'metrics-card' | 'impact-table' | 'star-method' | 'diagram' | 'calendly' | 'portfolio-grid' | 'credentials-card';


export interface Blueprint {
    id: string;
    type: BlueprintType;
    title: string;
    data: any;
}

export const EXECUTIVE_BLUEPRINTS: Record<string, Blueprint> = {
    "book-call": {
        id: "book-call",
        type: "calendly",
        title: "Schedule a Call",
        data: {
            url: "https://calendly.com/david-phillip/30min"
        }
    },
    // Portfolio Highlights
    "portfolio": {
        id: "portfolio",
        type: "portfolio-grid",
        title: "Selected Work Highlights",
        data: {
            projects: [
                { id: "cognism", name: "Cognism", role: "Head of Design", impact: "4x Revenue Growth", image: "/images/case-study-hero-cognism.png" },
                { id: "coutts", name: "Coutts", role: "Design Lead", impact: "4-week to 60s wait reduction", image: "/images/case-study-hero-coutts.png" },
                { id: "hsbc", name: "HSBC Kinetic", role: "Design Lead", impact: "$14bn Fintech initiative", image: "/images/case-study-hero-hsbc.png" }
            ]
        }
    },
    // Cognism Deep Dive
    "cognism-deep-dive": {
        id: "cognism-deep-dive",
        type: "metrics-card",
        title: "Cognism: Scaling for Exit ($20M to $80M ARR)",
        data: {
            metrics: [
                { label: "Revenue Growth", value: "4x", sub: "$20M to $80M ARR" },
                { label: "NPS Shift", value: "+24 pts", sub: "-16 to +8" },
                { label: "Retention", value: "100%", sub: "Senior Designers" },
                { label: "Efficiency", value: "40%", sub: "Faster Dev Cycles" }
            ],
            methodologies: ["Figma Design System", "Outcome-Driven Design", "Strategic Research", "Team Scaling (1 to 5)"]
        }
    },
    // CV & Credentials
    "cv": {
        id: "cv",
        type: "credentials-card",
        title: "Professional Credentials",
        data: {
            summary: "Executive Design Leader with 24+ years of experience across Fintech, SaaS, and Private Banking.",
            stats: [
                { label: "Experience", value: "24+ Years" },
                { label: "Leading Teams", value: "10+ Years" },
                { label: "Specialization", value: "Strategic UX / AI Ops" }
            ],
            link: "/cv"
        }
    },

    // 1. Scale & Leadership
    "scale": {
        id: "scale",
        type: "metrics-card",
        title: "Scale & Leadership Profile",
        data: {
            metrics: [
                { label: "Budget Managed", value: "£14M+", sub: "Programme Value" },
                { label: "Direct Reports", value: "5", sub: "Senior Leads" },
                { label: "Team Size", value: "15+", sub: "Cross-functional" },
                { label: "Markets", value: "Global", sub: "UK, HK, US" }
            ],
            methodologies: ["Lean UX", "Dual-Track Agile", "Design Sprints"]
        }
    },

    // 2. Commercial Impact
    "impact": {
        id: "impact",
        type: "impact-table",
        title: "Commercial Impact Ledger",
        data: {
            rows: [
                { project: "HSBC Kinetic", metric: "35% Adoption", outcome: "Exceeded year-1 KPIs for SME lending.", icon: TrendingUp },
                { project: "Coutts Mobile", metric: "Paperless Migration", outcome: "Reduced manual processing by 40%.", icon: CheckCircle },
                { project: "Schroders", metric: "30% Efficiency", outcome: "Accelerated advisor workflows.", icon: BarChart3 }
            ]
        }
    },

    // 3. Conflict Resolution
    "conflict": {
        id: "conflict",
        type: "star-method",
        title: "Conflict Resolution: The 'Engineering vs. Product' Deadlock",
        data: {
            situation: "Engineering blocked a key lending feature due to 'technical complexity'. Product pushed for launch.",
            task: "I needed to unblock delivery without compromising UX quality or burning out engineers.",
            action: {
                step1: "Facilitated a 'Technical Spike' workshop to map exact API limitations.",
                step2: "Proposed a phased UI rollout (V1: MVP, V2: Ideal State).",
                step3: "Gained buy-in by demonstrating V1 reduced dev effort by 50%."
            },
            result: "Feature launched on time. Relationship with Engineering lead significantly improved."
        }
    },

    // 4. AI Strategy
    "ai-strategy": {
        id: "ai-strategy",
        type: "diagram",
        title: "AI Operations Model (2025)",
        data: {
            columns: [
                { title: "Governance", items: ["Ethical Guidelines", "Data Privacy Checks", "Human-in-Loop"] },
                { title: "Tooling", items: ["Generative UI", "Synthetic User Testing", "Automated Docs"] },
                { title: "Talent", items: ["AI Literacy Training", "Prompt Engineering", "Strategic Oversight"] }
            ]
        }
    },

    // 5. Legacy Transformation
    "legacy": {
        id: "legacy",
        type: "metrics-card", // Re-using metrics card for variety but focused on transformation
        title: "Legacy Transformation Track Record",
        data: {
            metrics: [
                { label: "Systems Retired", value: "3", sub: "Mainframe front-ends" },
                { label: "Process Reduction", value: "40%", sub: "Fewer manual steps" },
                { label: "Speed Increase", value: "3x", sub: "Deployment frequency" }
            ],
            methodologies: ["Strangler Fig Pattern", "Componentization", "Incremenetal Migration"]
        }
    }
};

export const RECRUITER_QUESTIONS = [
    { id: "portfolio", label: "Selected Portfolio", question: "Can I see your portfolio highlights?" },
    { id: "cv", label: "Interactive CV", question: "Tell me about your background and CV." },
    { id: "impact", label: "Commercial Impact", question: "Can you prove design ROI in hard numbers?" },
    { id: "scale", label: "Scale & Leadership", question: "What scale of teams and budgets have you managed?" },
    { id: "ai-strategy", label: "AI Strategy", question: "How are you integrating AI into design ops?" },
    { id: "legacy", label: "Legacy Modernization", question: "Have you transformed complex legacy systems?" },
];
