import { Target, CheckCircle, Search, PenTool, LayoutTemplate, TrendingUpIcon, Lightbulb, Award } from 'lucide-react';

// BACKUP: Full Coutts case study archived on 2026-05-15
// Original location: apps/client/src/views/CaseStudy.tsx:473-771
// Restored on demand if full version is needed for reference

export const couttsFullBackup = {
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
};
