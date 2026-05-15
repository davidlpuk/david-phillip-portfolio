// BACKUP: Full HSBC case study archived on 2026-05-15
// Original location: apps/client/src/views/CaseStudy.tsx:772-985
// Restored on demand if full version is needed for reference

import { Target, CheckCircle, PenTool, Search, LayoutTemplate, Rocket, TrendingUp, Lightbulb } from 'lucide-react';

const TrendingUpIcon = TrendingUp;

export const hsbcFullBackup = {
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
};
