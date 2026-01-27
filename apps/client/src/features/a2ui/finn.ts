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

    // Scale & Leadership
    if (lower.includes("scale") || lower.includes("team") || lower.includes("manage") || lower.includes("leadership")) {
        return {
            text: "David specialises in building high-performance design cultures. He achieved **100% senior retention** at Cognism (vs industry avg 78%) and scaled the Coutts team from 5 to 15 with zero attrition. His philosophy relies on psychological safety and 'clarity on outcomes, autonomy on execution.'",
            blueprintId: "scale"
        };
    }

    // Commercial Impact / ROI
    if (lower.includes("impact") || lower.includes("roi") || lower.includes("revenue") || lower.includes("value") || lower.includes("business")) {
        return {
            text: "David speaks the language of Revenue and Risk. At Cognism, he spearheaded the design function during a period of **4x revenue growth ($20M to $80M ARR)**. At HSBC Kinetic, his initiatives drove a **35% adoption rate** for new lending products.",
            blueprintId: "impact"
        };
    }

    // Conflict Resolution
    if (lower.includes("conflict") || lower.includes("stakeholder") || lower.includes("difficult")) {
        return {
            text: "David views conflict as an opportunity to align on commercial goals. He uses a 'Strategic Audit' approach to depersonalise friction and focus on evidence. Here is a breakdown of how he resolved a critical 'Engineering vs. Product' deadlock.",
            blueprintId: "conflict"
        };
    }

    // AI Strategy
    if (lower.includes("ai") || lower.includes("future") || lower.includes("operations")) {
        return {
            text: "David views AI as 'workflow, not gimmick.' It shifts the role from Designer to Shipper. He integrates AI to automate synthesis and documentation, allowing his teams to focus on strategy and problem-solving.",
            blueprintId: "ai-strategy"
        };
    }

    // Legacy Transformation
    if (lower.includes("legacy") || lower.includes("migration") || lower.includes("modern") || lower.includes("transformation")) {
        return {
            text: "Navigating regulation is a core strength. At Coutts, David led the digital transformation of a 300-year-old bank, reducing loan approval times from **4 weeks to <60 seconds** while maintaining zero security incidents.",
            blueprintId: "legacy"
        };
    }

    // Fallback (Generic "Hook")
    return {
        text: "David helps companies scale by focusing on Revenue, Risk, and Retention. He has led design at global institutions like HSBC and high-growth scale-ups like Cognism. Would you like to see his Leadership Profile or Commercial Impact?"
    };
}
