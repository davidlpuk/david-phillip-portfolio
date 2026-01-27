import { EXECUTIVE_BLUEPRINTS } from "./blueprints";

// ============================================================================
// FINN: The Portfolio Concierge - System Logic
// ============================================================================

export interface FinnResponse {
    text: string;
    blueprintId?: string;
}

const SYSTEM_PROMPT = `
You are Finn, the Digital Assistant for David Phillip.
Voice: Professional, High-Signal, Commercial, "Quiet Confidence."
Language: British English (UK) only.

CORE DIRECTIVE:
Vet and guide "Heroes" (Recruiters, VPs) by proving David is the Guide who solves business problems (Revenue, Risk, Retention).

NARRATIVE FRAMEWORK:
1. Acknowledge Need
2. The Hook (Problem: "perfect pixels" vs Revenue/Risk)
3. The Guide (David's USP: Commercial leader, 24+ yrs)
4. The Plan (Audit -> Execution -> Excellence)
5. The Evidence (Metrics)
6. Call to Action (Calendar)
`;

// Knowledge Modules
const MODULES = {
    HOOK_METRICS: [
        "Spearheaded design at Cognism during 4x revenue growth ($20M to $80M ARR).",
        "Shifted Cognism’s NPS from –16 to +8 by fixing enterprise UX debt.",
        "Contributed to £40M+ in new assets at Coutts via mobile onboarding.",
        "Achieved 35% adoption for SME lending products at HSBC Kinetic.",
        "Reduced front-end component creation time by 40% at Cognism."
    ],
    LEADERSHIP: [
        "Philosophy: 'Clarity on outcomes, autonomy on execution.'",
        "Retention: 100% senior retention at Cognism; scaled Coutts from 5 to 15 with zero attrition.",
        "Psychological Safety: Accredited Spotlight & Mindflic Practitioner.",
        "The Platinum Rule: 'Treat people how *they* want to be treated.'"
    ],
    CASE_STUDIES: {
        coutts: "Coutts: Reduced loan time from 4 weeks to <60 seconds using FaceID. Secured 100% of requested funding.",
        cognism: "Cognism: Built first design team, established design system. NPS -16 to +8. Revenue 4x.",
        hsbc: "HSBC Kinetic: Led UX for 5 lending products. 35% adoption, 30% faster cycles."
    },
    TECHNICAL: "Fluent in JavaScript, CSS, backend databases. Uses AI as workflow, not gimmick."
};

/**
 * Generates a response based on Finn's persona and knowledge base.
 * note: In a real implementation, this would call an LLM. Here we simulate the logic.
 */
export function generateFinnResponse(input: string): FinnResponse {
    const lower = input.toLowerCase();

    // 1. OPENING GREETING (Handled by UI initial state, but good for reset)
    if (lower.includes("hello") || lower.includes("hi") || lower.includes("start")) {
        return {
            text: "Hello. I am Finn, David’s portfolio concierge. I can guide you through his commercial impact, leadership philosophy, or specific case studies from Coutts and Cognism. How can I help you de-risk your next leadership hire?"
        };
    }

    // 2. SPECIFIC SCENARIOS (Guardrails)
    if (lower.includes("salary") || lower.includes("rate") || lower.includes("cost") || lower.includes("compensation")) {
        return {
            text: "David prefers to discuss compensation during an introductory call to ensure alignment with the project scope and role requirements. Would you like to book a 15-minute chat?"
        };
    }

    if (lower.includes("hands on") || lower.includes("hands-on") || lower.includes("design yourself")) {
        return {
            text: "Yes. David believes leaders must know the tools to respect the craft. He is fluent in **Figma (Advanced), FigJam, and AI prototyping tools**. He stays close to the work to unblock teams, but focuses his energy on **orchestration and strategy** rather than individual component design."
        };
    }

    if (lower.includes("why looking") || lower.includes("new role") || lower.includes("leave")) {
        return {
            text: "After successfully scaling the design function at Cognism and seeing them through a major growth phase ($20M-$80M ARR), David is looking for his next challenge to build high-performing teams in a Series B+ Fintech or SaaS environment."
        };
    }

    if (lower.includes("nda") || lower.includes("confidential")) {
        return {
            text: "While David can share the strategic frameworks and outcomes of his work at Coutts and HSBC, specific client data or sensitive banking metrics are under NDA. He is happy to walk through sanitized artifacts during an interview."
        };
    }

    // 4. BOOKING / CALENDAR
    if (lower.includes("book") || lower.includes("calendar") || lower.includes("schedule") || lower.includes("call") || lower.includes("time") || lower.includes("meet")) {
        return {
            text: "David is currently prioritizing conversations with Series B+ founders and VP/Head of Design roles. Please select a time directly below:",
            blueprintId: "book-call"
        };
    }

    // 3. STRATEGIC TOPICS (Trigger Blueprints)

    // CV & Credentials
    if (lower.includes("cv") || lower.includes("resume") || lower.includes("credentials") || lower.includes("background") || lower.includes("profile")) {
        return {
            text: "David's career spans over two decades of digital transformation. He isn't just a designer; he's a commercial leader who has successfully navigated the complexities of global banking and high-growth SaaS. Here is a summary of his credentials:",
            blueprintId: "cv"
        };
    }

    // Portfolio & Work
    if (lower.includes("portfolio") || lower.includes("work") || lower.includes("project") || lower.includes("see") || lower.includes("show")) {
        // Narrow down if specific project mentioned
        if (lower.includes("cognism")) {
            return {
                text: "At Cognism, David was the first design hire (1 to 5). He was brought in to fix 'enterprise UX debt' that was costing them deals. He transformed the NPS from -16 to +8, which was a major factor in their 4x revenue growth.",
                blueprintId: "cognism-deep-dive"
            };
        }
        return {
            text: "David’s portfolio highlights his ability to deliver across three distinct sectors: Fintech, SaaS, and Private Banking. Each of these projects was a major commercial bet. Which would you like to explore deeper?",
            blueprintId: "portfolio"
        };
    }

    // Cognism Deep Dive (Explicit)
    if (lower.includes("cognism")) {
        return {
            text: "The Cognism journey is a blueprint for scaling for exit. David established the design function from scratch, implemented a robust Figma design system, and shifted the culture from 'feature-factory' to outcome-driven design.",
            blueprintId: "cognism-deep-dive"
        };
    }

    // Scale & Leadership
    if (lower.includes("scale") || lower.includes("team") || lower.includes("manage") || lower.includes("leadership") || lower.includes("direct reports") || lower.includes("culture")) {
        return {
            text: "Most companies struggle to scale design because they focus on 'hiring more hands.' David focuses on 'hiring more signal.' He specialises in building high-performance cultures where senior designers have the autonomy to execute against commercial outcomes.",
            blueprintId: "scale"
        };
    }

    // Commercial Impact / ROI
    if (lower.includes("impact") || lower.includes("roi") || lower.includes("revenue") || lower.includes("value") || lower.includes("business") || lower.includes("metrics") || lower.includes("numbers")) {
        return {
            text: "Commercial success is the only metric that truly matters for a Head of Design. David speaks the language of the CFO. Whether it is increasing assets at Coutts or driving 4x revenue at Cognism, his work is directly tied to the bottom line.",
            blueprintId: "impact"
        };
    }

    // Conflict Resolution
    if (lower.includes("conflict") || lower.includes("stakeholder") || lower.includes("difficult") || lower.includes("argument") || lower.includes("deadlock")) {
        return {
            text: "David views stakeholder conflict as 'unmet commercial needs.' He uses a Strategic Audit approach to depersonalise friction. By mapping technical debt against business risk, he moves teams from 'I think' to 'We know.'",
            blueprintId: "conflict"
        };
    }

    // AI Strategy
    if (lower.includes("ai") || lower.includes("future") || lower.includes("operations") || lower.includes("ops") || lower.includes("prompt") || lower.includes("automation")) {
        return {
            text: "David’s AI strategy is 'Efficiency through Orchestration.' He uses AI to automate the low-value 'grunt work' of design (documentation, synthesis) so his leads can stay focussed on high-value strategic problems.",
            blueprintId: "ai-strategy"
        };
    }

    // Legacy Transformation
    if (lower.includes("legacy") || lower.includes("migration") || lower.includes("modern") || lower.includes("transformation") || lower.includes("banking") || lower.includes("regulated")) {
        return {
            text: "Transforming legacy systems in regulated environments is David's 'superpower.' At Coutts (300+ yrs old), he didn't just 'make it pretty'—he redesigned the entire SME lending process, reducing 4-week lead times to under 60 seconds.",
            blueprintId: "legacy"
        };
    }

    // Fallback (Generic "Hook")
    return {
        text: "I am trained to help you de-risk your next leadership hire. Would you like to see David's **Portfolio**, his **Cognism Deep-Dive**, or are you ready to **Schedule a Call**?"
    };
}
