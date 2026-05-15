// BACKUP: Full Cognism case study archived on 2026-05-15
// Original location: apps/client/src/views/CaseStudy.tsx:987-1213
// Contains all 11 sections for reference during mobile condensing

import { Target, CheckCircle, PenTool, Search, Rocket, TrendingUp as TrendingUpIcon, Lightbulb } from 'lucide-react';

export const cognismFullBackup = {
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
    }
};
