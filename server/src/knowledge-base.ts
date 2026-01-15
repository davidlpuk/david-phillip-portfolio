/**
 * Knowledge Base for David Phillip's AI Digital Twin
 * This data is used for RAG (Retrieval-Augmented Generation)
 * 
 * Last updated: January 2026
 * Source of truth: CV (2025) and Executive Brand Strategy
 */

export interface KnowledgeChunk {
    id: string;
    content: string;
    category: 'bio' | 'achievement' | 'methodology' | 'case_study' | 'philosophy' | 'technical';
    keywords: string[];
}

export const knowledgeBase: KnowledgeChunk[] = [
    // Core Bio
    {
        id: 'bio-1',
        content: `David Phillip is a commercial Head of Design with 20+ years of experience specialising in Fintech and hyper-growth SaaS. He speaks the language of revenue, risk, and retention — not just pixels. His approach treats design as a strategic business lever that directly impacts bottom-line results.

David has led design teams at globally recognised financial institutions including HSBC, Coutts & Co (NatWest Group), Deutsche Bank, Schroders, Barclays, and BlackRock, as well as high-growth SaaS companies like Cognism that scaled from $20M to $80M ARR under his design leadership.

He is skilled at building and mentoring high-performing, multidisciplinary design teams, embedding design thinking across organisations, and advancing design maturity. He has proven expertise managing distributed teams asynchronously in remote environments across multiple time zones.`,
        category: 'bio',
        keywords: ['head of design', 'fintech', 'product design', '20 years', 'commercial', 'revenue', 'hsbc', 'coutts', 'deutsche bank', 'cognism', 'schroders', 'barclays', 'blackrock']
    },

    // Cognism Achievement
    {
        id: 'cognism-1',
        content: `At Cognism (Jul 2022 – Jun 2024), David led the Product Design function within a Sales Technology scale-up, overseeing both Design and DesignOps. He partnered with Product and Engineering teams to execute strategic product initiatives.

Key achievement: David built Cognism's first Product Design team, modernising tools and processes, which contributed to revenue growth from $20M to $80M ARR — a 300% increase during his tenure.

His team achieved 100% retention over two years — a testament to his leadership philosophy of creating high-trust environments where mistakes are treated as valuable data rather than failures.

Additional achievements include developing a comprehensive cross-functional Design System in Figma, conducting user research and early-stage validation, and driving innovation through design thinking workshops and AI tool integration.`,
        category: 'achievement',
        keywords: ['cognism', 'arr', '20m', '80m', '300%', 'growth', 'retention', 'design system', 'saas', 'b2b', 'sales intelligence', 'designops']
    },

    {
        id: 'cognism-2',
        content: `The Cognism case study represents David's ability to scale design from a scrappy startup function to an enterprise-grade strategic capability. When he joined, there was no formal design team. When he left, it was a mature function that could demonstrate clear ROI on design investments.

Key initiatives included:
- Establishing DesignOps as a formal function
- Creating a comprehensive design system in Figma
- Implementing user research programmes with early-stage validation
- Building cross-functional partnerships with Product and Engineering
- Leading design thinking workshops and integrating AI tools
- Creating a user-centric employee onboarding process

All of these contributed to the 300% ARR growth during his tenure while maintaining 100% team retention.`,
        category: 'case_study',
        keywords: ['startup', 'scale', 'enterprise', 'design ops', 'design system', 'user research', 'roi', 'cognism', 'team retention', 'onboarding']
    },

    // Coutts Achievement
    {
        id: 'coutts-1',
        content: `At Coutts Private Bank – NatWest Group (Jun 2020 – Jun 2022), David led the Digital Experience Design Team for this 320+ year-old private bank, overseeing UX Research, UX Design, and Visual (UI) Design.

He scaled the team by over 200%, growing to manage 15 specialists across Research, UX, and UI. He introduced UX Research as a formal practice and implemented Figma across the organisation, enhancing efficiency, design quality, and collaboration across NatWest Group.

Key achievement: David directed the development and launch of a new mobile app for private banking clients, delivering an exceptional customer experience. He also founded an Invest-focused digital team, expanding product offerings and driving business growth.

His work covered four brands within the organisation, evangelising and evolving design maturity across all of them.`,
        category: 'achievement',
        keywords: ['coutts', 'private bank', 'natwest', 'team scaling', '200%', '15 specialists', 'mobile app', 'wealth management', 'ux research', 'figma']
    },

    {
        id: 'coutts-2',
        content: `The Coutts case study demonstrates David's ability to lead design in regulated, high-stakes environments. Working with private bankers, compliance teams, and technology stakeholders, he navigated complex stakeholder management while keeping projects focused on client outcomes.

Key contributions:
- Scaled Digital Experience Design team by over 200% to 15 specialists
- Introduced UX Research practice to the organisation
- Implemented Figma, improving collaboration across NatWest Group
- Led development and launch of new private banking mobile app
- Founded Invest-focused digital team
- Enhanced design maturity through workshops and innovative methods
- Promoted Design Thinking company-wide
- Optimised multi-branded Design System for faster delivery and brand consistency
- Implemented agile methodologies improving team structure and planning

This project exemplifies David's approach: every initiative is grounded in clear commercial outcomes while maintaining the quality standards expected in private banking.`,
        category: 'case_study',
        keywords: ['private banking', 'regulated', 'stakeholder management', 'design system', 'transformation', 'coutts', 'natwest', 'agile', 'design thinking']
    },

    // HSBC Kinetic Achievement
    {
        id: 'hsbc-1',
        content: `David led a design team for HSBC Kinetic (May 2019 – Nov 2019), a multi-billion pound mobile banking app initiative focused on small businesses. He grew and mentored a design team creating user experiences for 5 key business lending products.

Key contributions:
- Scaled and managed a team of UX and UI designers across five products
- Championed agile development through design sprints and workshops
- Embedded user-centred design principles with research-backed decisions
- Delivered end-to-end products driving customer satisfaction
- Contributed to the success of a $14 billion banking initiative

At this scale, every improvement represents significant revenue impact. David's leadership ensured the design function was seen as a strategic partner, not just a service team.`,
        category: 'achievement',
        keywords: ['hsbc', 'kinetic', '14 billion', 'sme', 'small business', 'lending', 'mobile banking', 'design sprints', 'agile']
    },

    {
        id: 'hsbc-2',
        content: `HSBC Kinetic was one of the largest banking transformation programmes in European history. David's role required him to operate at the intersection of global design standards, local market requirements, and cutting-edge technology.

His team implemented design sprints and facilitated workshops that accelerated innovation and reduced development cycles. The user-centred design principles he embedded ensured customer-focused solutions backed by research.

This project demonstrates David's ability to lead design in complex enterprise environments where multiple stakeholders, regulatory requirements, and technical constraints must be balanced against user needs and business objectives.`,
        category: 'case_study',
        keywords: ['transformation', 'global', 'sme', 'hsbc', 'kinetic', 'enterprise', 'design sprints', 'user research']
    },

    // Schroders Achievement
    {
        id: 'schroders-1',
        content: `At Schroders/Cazenove Capital (Mar 2017 – Feb 2019), David worked as a Senior Consultant driving digital transformation initiatives for high-net-worth clients.

Key contributions:
- Led Google Ventures Design Sprints to rapidly develop solutions
- Executed comprehensive user testing processes generating actionable insights
- Created personas, storyboards, user journeys, and experience maps
- Built and refined interactive prototypes for mobile and desktop platforms
- Accelerated project timelines and optimised product development

Earlier at Schroders Asset Management (2016-2017), he delivered global UX projects combining user research and interaction design in agile environments.`,
        category: 'achievement',
        keywords: ['schroders', 'cazenove', 'wealth management', 'design sprints', 'google ventures', 'user testing', 'prototypes', 'digital transformation']
    },

    // AI Integration
    {
        id: 'ai-1',
        content: `David is passionate about leveraging emerging technologies like AI in design workflows. His approach to AI is pragmatic and outcome-focused: he doesn't implement technology for its own sake but looks for specific problems where AI can add genuine value.

His philosophy is to automate routine tasks so that talented team members can focus on high-level strategy and creative problem-solving. This includes using AI for design tasks, data analysis, and initial research, freeing designers to do what humans do best — empathise with users and solve complex problems.

At Cognism, he drove innovation through design thinking workshops and integrated AI tools, enhancing product capabilities and fostering a culture of innovation. David stays current with AI developments and regularly evaluates new tools for potential integration into design workflows.`,
        category: 'technical',
        keywords: ['ai', 'automation', 'productivity', 'workflow', 'integration', 'innovation', 'design thinking']
    },

    // Design Systems
    {
        id: 'design-system-1',
        content: `David has implemented Design Systems that consistently deliver measurable efficiency gains. At Cognism, he created and implemented a comprehensive cross-functional Design System in Figma, streamlining platform consistency and improving collaboration.

At Coutts, he optimised a multi-branded Design System for faster delivery and brand consistency across four brands within NatWest Group.

Design systems under David's leadership go beyond UI component libraries. They include comprehensive guidelines for interaction patterns, accessibility requirements, content standards, and brand implementation. The goal is creating a shared language between design and engineering that enables scaling without proportional headcount growth.`,
        category: 'methodology',
        keywords: ['design system', 'figma', 'components', 'ui', 'library', 'scaling', 'efficiency', 'collaboration', 'multi-brand']
    },

    // Leadership Philosophy
    {
        id: 'leadership-1',
        content: `David's leadership philosophy is built on creating high-trust environments where teams can thrive. As an Accredited Spotlight Practitioner (performance psychology), he focuses on increasing self-awareness, shifting old ways of working, and creating positive differences in how people work.

Key principles:
- Clarity: Every designer knows how their work connects to business metrics
- Autonomy: Align on outcomes, then step back. Coach and unblock — don't art-direct
- Safety: Share failures openly. 100% retention at Cognism over two years
- Growth: Match projects to stretch skills. People stay because they're growing

This approach led to 100% senior team retention at Cognism. Team members feel safe to experiment, take calculated risks, and voice concerns without fear of punishment.`,
        category: 'philosophy',
        keywords: ['leadership', 'spotlight practitioner', 'psychological safety', 'autonomy', 'clarity', 'retention', '100%', 'trust', 'growth', 'mentoring']
    },

    // The Deutsche Bank Story (What Went Wrong)
    {
        id: 'failure-1',
        content: `At Deutsche Bank (2016), David established UK/Germany UX labs, managing distributed teams and improving employee digital tools. However, this role also provided a pivotal professional lesson that shaped his current commercial focus.

A major redesign initiative struggled because the design team couldn't articulate its value to business stakeholders in terms they understood. The work was high-quality but couldn't be connected to revenue, risk, or retention outcomes.

This experience was transformative. David realised that design excellence means nothing if you can't communicate its business impact. He returned to fundamentals: learning to speak finance, understanding commercial drivers, and framing every design decision in terms of measurable outcomes.

The lesson shapes everything David does now. Before proposing any initiative, he asks: "What business problem does this solve?" and "How will we measure success?" This discipline has made him a more effective leader and a more valuable business partner.`,
        category: 'achievement',
        keywords: ['deutsche bank', 'failure', 'redesign', 'value', 'revenue', 'learn', 'evolution', 'commercial', 'business impact', 'distributed teams']
    },

    // Earlier Career
    {
        id: 'earlier-career-1',
        content: `David's earlier career (2006-2016) built the foundation for his strategic design leadership:

TSB Bank (2013-2015) - Senior UX Manager:
- Delivered branch locator and digital-only current account
- Drove customer acquisition via multimillion-pound campaigns

Barclays & HSBC (2008-2013) - Digital Experience Manager:
- Optimised ROI through A/B testing and conversion rate optimisation
- Improved customer journeys for international banking

BlackRock (2006-2008) - International E-Marketing Manager:
- Led digital brand transition across 21 countries (Asia Pacific, Europe & Latin America)
- Enhanced global user experience and multi-market scalability

This global experience across major financial institutions shaped David's understanding of how design delivers across cultures and regulatory frameworks.`,
        category: 'achievement',
        keywords: ['tsb', 'barclays', 'blackrock', 'a/b testing', 'cro', 'conversion', 'branch locator', 'international', '21 countries', 'asia pacific', 'emea', 'latam']
    },

    // Personal Interests
    {
        id: 'personal-1',
        content: `When asked about personal interests, David enjoys travelling, watching international movies (particularly Spanish cinema), and photography.

His travel experiences inform his design perspective — seeing how different markets solve similar problems inspires creative solutions. International cinema influences his understanding of narrative and emotional engagement, principles he applies to user experience design. Photography reflects his eye for composition and visual storytelling.

These interests complement his professional experience working across 21 countries at BlackRock and managing distributed teams at Deutsche Bank.`,
        category: 'bio',
        keywords: ['personal', 'travelling', 'travel', 'international cinema', 'spanish movies', 'photography', 'hobbies', 'culture']
    },

    // Call to Action
    {
        id: 'cta-1',
        content: `When engaging with potential employers or clients, David's standard call to action is to "book a 30-minute call" or "review case studies." He is transparent about his availability and eager to discuss how his experience can solve specific business challenges.

David is particularly interested in roles where he can apply his 20+ years of Fintech and SaaS experience to drive measurable commercial outcomes. He is not looking for purely creative positions but strategic roles where design can be a revenue driver.

His commitment to outcomes means he will ask pointed questions about the business problem you're trying to solve. This isn't rudeness — it's his way of understanding how he can add value. He prefers to under-promise and over-deliver.`,
        category: 'bio',
        keywords: ['contact', 'book a call', '30 minutes', 'case study', 'availability', 'strategic', 'revenue', 'value']
    },

    // Approach to Questions
    {
        id: 'response-pattern-1',
        content: `When responding to questions, David follows a structured narrative framework:

1. Acknowledge what the Hero (recruiter/hiring manager) wants — demonstrate understanding of their business challenge
2. Highlight the Problem — articulate common pain points in their situation
3. Position himself as the Guide — reference relevant experience and capabilities
4. Present a Plan: Strategy & Audit → Iterative Design & Testing → Full-Scale Deployment
5. Clear Call to Action — offer to book a call or review case studies
6. Success Vision — describe achievable positive outcomes
7. Failure Warning — articulate the cost of inaction

This framework ensures every response is commercial, outcome-focused, and actionable. It's designed to speak directly to business concerns about revenue, risk, and results.`,
        category: 'methodology',
        keywords: ['narrative', 'framework', 'acknowledge', 'problem', 'guide', 'plan', 'call to action', 'success', 'failure', 'commercial']
    },

    // Technical Tools & Skills
    {
        id: 'technical-1',
        content: `David's technical proficiency spans the modern design toolkit:

Design Tools:
- Figma (Advanced) — primary tool for design and prototyping
- FigJam — collaborative whiteboarding
- Adobe Creative Suite — visual design and image editing
- Miro — workshop facilitation and mapping

Collaboration & Management:
- Confluence — documentation and knowledge management
- Jira — agile project tracking
- ProductBoard — product roadmap management
- Maze — user testing and validation
- Lookback — user research sessions

This technical versatility enables David to lead teams effectively and make informed decisions about tooling and workflows. He stays current with emerging tools and regularly evaluates new options for potential integration.`,
        category: 'technical',
        keywords: ['figma', 'figjam', 'adobe', 'miro', 'confluence', 'jira', 'productboard', 'maze', 'lookback', 'tools', 'prototyping']
    },

    // Skills Overview
    {
        id: 'skills-1',
        content: `David's skills are organised into four categories:

Leadership & People Management:
- Building high-performing Design & Research teams
- Fostering growth-oriented design culture
- Driving organisational design maturity
- Managing distributed teams across time zones

Strategic Customer-Centric Design:
- Leading customer-centric design initiatives
- Leveraging research insights and design thinking
- Creating and scaling design systems

Business Alignment & Agile Mindset:
- Bridging design and business objectives
- Championing customer-focused solutions in iterative workflows
- Stakeholder management and executive communication

Design Tools & Trends:
- Proficient in Figma, Adobe CS and leading design tools
- Knowledgeable in branding, typography, website design, and enterprise application design
- AI-augmented design workflows`,
        category: 'technical',
        keywords: ['skills', 'leadership', 'team building', 'design operations', 'stakeholder management', 'product strategy', 'ux research', 'design systems', 'figma', 'ai', 'agile', 'enterprise']
    },

    // Core Capabilities
    {
        id: 'capabilities-1',
        content: `David's core capabilities span three areas:

Strategy & Leadership:
- Design strategy aligned with business objectives
- Building and scaling high-performing teams
- Stakeholder navigation in regulated industries
- AI strategy and team enablement

Design & Research:
- Complex B2B/enterprise systems (multi-persona, roles/permissions)
- Data-informed design using product analytics
- Inclusive design and accessibility practices
- Design system creation, governance, and contribution

Technical & Delivery:
- Enterprise application design expertise
- Regulated industry compliance awareness
- Cross-functional team leadership
- Agile methodology and rapid iteration`,
        category: 'methodology',
        keywords: ['capabilities', 'strategy', 'leadership', 'design strategy', 'team building', 'stakeholder', 'regulated industries', 'ai', 'b2b', 'enterprise', 'ux research', 'accessibility', 'design systems', 'agile']
    },

    // Unique Value Propositions
    {
        id: 'unique-value-1',
        content: `Three things set David apart:

1. AI Fluency: AI isn't a shortcut; it's a force multiplier. David integrates AI tools strategically into design workflows, enhancing product capabilities and fostering innovation. At Cognism, he led design thinking workshops that incorporated AI tools.

2. Regulated Industries: David has deep experience in private banking (Coutts), wealth management (Schroders), and enterprise banking (HSBC, Deutsche Bank, Barclays). He understands compliance requirements and stakeholder complexity in financial services.

3. Global Scale: David has led design across 21 countries through his work at BlackRock covering Asia Pacific, EMEA, and Latin America. He understands how design delivers across cultures and regulatory frameworks, and has proven expertise managing distributed teams.`,
        category: 'philosophy',
        keywords: ['ai fluency', 'regulated industries', 'global scale', 'compliance', '21 countries', 'cross-cultural', 'asia pacific', 'emea', 'latam', 'private banking', 'wealth management']
    },

    // Confidentiality Approach
    {
        id: 'confidentiality-1',
        content: `When asked about specific sensitive banking data — particularly from Coutts & Co, HSBC, or other financial institutions — David speaks to the strategic framework and general approaches rather than private client details. This maintains necessary confidentiality while still demonstrating relevant experience.

He can discuss methodologies, approaches, and types of outcomes without revealing client-identifying information or proprietary details. This professional approach to confidentiality is essential in regulated industries and demonstrates David's understanding of professional obligations and risk management.`,
        category: 'philosophy',
        keywords: ['confidentiality', 'sensitive', 'banking', 'private', 'strategic framework', 'regulated', 'risk management', 'professional']
    },

    // British English
    {
        id: 'language-1',
        content: `David uses British English spelling and conventions: organisations (not organizations), centre (not center), modernising (not modernizing), specialised (not specialized), optimise (not optimize), programme (not program for initiatives), colour (not color).

This attention to detail reflects his professional background working with British institutions including Coutts & Co, NatWest Group, HSBC, and TSB, as well as his commitment to precision in all forms of communication.`,
        category: 'bio',
        keywords: ['british', 'english', 'spelling', 'organisations', 'centre', 'professional', 'precision', 'uk']
    },

    // Employment Type Flexibility
    {
        id: 'employment-flexibility-1',
        content: `David is flexible and open to both contract and permanent roles. He understands that different organisations have different hiring needs and preferences. Whether it's a 6-month contract to deliver a specific transformation, or a permanent leadership position to build and scale a design function, David is interested in opportunities where he can make a significant business impact.

His experience spans both contract and permanent engagements - he has successfully delivered major transformations as a contractor (like the Schroders digital transformation) and built lasting teams in permanent roles (like scaling the design team at Cognism from 0 to 15 people).

David prefers to discuss specific opportunities rather than committing to one employment type. The right structure depends on the business challenge, timeline, and mutual fit. He's happy to explore both contract and permanent arrangements.`,
        category: 'bio',
        keywords: ['contract', 'permanent', 'employment', 'flexible', 'freelance', 'consultant', 'full-time', 'part-time', 'engagement', 'hiring', 'roles', 'opportunities']
    },

    // Contact Information
    {
        id: 'contact-1',
        content: `David Phillip's contact information:

- Email: david.phillip@gmail.com
- LinkedIn: https://www.linkedin.com/in/davidphillip/
- Location: London, United Kingdom

When users ask "how can I contact you", "what's your email", "how do I reach you", or similar questions, provide the email address david.phillip@gmail.com and LinkedIn profile link.

David welcomes inquiries about senior Product Design and Head of Design roles, particularly in Fintech, B2B SaaS, and regulated industries. He is open to discussing opportunities where he can apply his 20+ years of experience to drive measurable commercial outcomes.`,
        category: 'bio',
        keywords: ['contact', 'email', 'david.phillip@gmail.com', 'linkedin', 'https://www.linkedin.com/in/davidphillip/', 'phone', 'reach', 'how to contact', 'get in touch', 'message', 'london']
    },

    // Education & Credentials
    {
        id: 'education-1',
        content: `David's education and credentials:

- Accredited Spotlight Practitioner (2020): Performance psychology — increasing people's self-awareness, shifting old ways of working, and providing a positive difference in how people work. This informs his approach to creating high-trust team environments.

- CIM E-Marketing Qualification (Distinction - A): Chartered Institute of Marketing qualification demonstrating commercial marketing expertise.

- UXPA Member: Ongoing professional development through the Usability Professionals' Association.`,
        category: 'bio',
        keywords: ['education', 'credentials', 'spotlight practitioner', 'cim', 'marketing qualification', 'uxpa', 'professional development', 'psychology', 'distinction']
    },

    // Key Achievements Summary
    {
        id: 'achievements-summary',
        content: `David Phillip's key achievements across his career:

Cognism (2022-2024):
- Built first Product Design team from scratch
- Contributed to ARR growth from $20M to $80M (300% increase)
- Achieved 100% team retention over two years
- Implemented comprehensive Design System in Figma

Coutts/NatWest (2020-2022):
- Scaled team by over 200% to 15 specialists
- Launched new private banking mobile app
- Introduced UX Research practice
- Implemented Figma across NatWest Group

HSBC Kinetic (2019):
- Led design for $14 billion SME banking initiative
- Scaled design team across five lending products
- Implemented design sprints reducing development cycles

Earlier Career:
- Led digital brand transition across 21 countries at BlackRock
- Drove customer acquisition via multimillion-pound campaigns at TSB
- Optimised conversion through A/B testing at Barclays/HSBC`,
        category: 'achievement',
        keywords: ['achievements', 'arr', '20m to 80m', 'retention', '100%', 'team scaling', '200%', '14 billion', '21 countries', 'design system']
    }
];

// Helper function to get relevant chunks based on a query
export function getRelevantChunks(query: string, maxChunks: number = 5): KnowledgeChunk[] {
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/);

    // Score each chunk based on keyword matches
    const scored = knowledgeBase.map(chunk => {
        let score = 0;

        // Check for direct keyword matches
        chunk.keywords.forEach(keyword => {
            if (queryLower.includes(keyword)) {
                score += 10;
            }
        });

        // Check for partial matches in content
        queryWords.forEach(word => {
            if (word.length > 3 && chunk.content.toLowerCase().includes(word)) {
                score += 1;
            }
        });

        // Boost score for category relevance based on query type
        if (queryLower.includes('achievement') || queryLower.includes('result') || queryLower.includes('metric')) {
            if (chunk.category === 'achievement' || chunk.category === 'case_study') {
                score += 5;
            }
        }

        if (queryLower.includes('how') || queryLower.includes('approach') || queryLower.includes('method')) {
            if (chunk.category === 'methodology') {
                score += 5;
            }
        }

        return { chunk, score };
    });

    // Sort by score and return top chunks
    return scored
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, maxChunks)
        .map(item => item.chunk);
}

// System prompt for the AI Digital Twin - Digital Chief of Staff for Recruiters
export const systemPrompt = `You are David's Digital Assistant — a professional executive assistant representing David Phillip, a commercial Head of Design with 20+ years of Fintech and SaaS expertise.

## Your Audience
You are speaking with executive recruiters, hiring managers based in the UK, and talent acquisition specialists. These are business professionals who care about:
- Leadership track record and team size
- Measurable business impact (revenue, growth, cost savings)
- Clear evidence of ROI from design investments
- Speed and efficiency in the hiring process

## How to Respond
- Be professional, confident, clear, and minimise jargon — keep it business-oriented
- Use first person (I, me, my) — never "we" for David's experience
- Speak the language of business outcomes (revenue, growth, retention, cost reduction)
- Keep responses concise — 1-2 sentences for simple questions, 2-3 for complex ones
- Avoid abstract design jargon unless specifically asked
- Use British English spelling throughout
- When discussing skills, pivot to senior-level context (e.g., "Yes, and I've managed teams of up to 15 designers...")

## Key Business Metrics (Memorise These)
- Cognism: Built first design team, contributed to ARR growth $20M→$80M (300%), 100% team retention over 2 years
- Coutts: Scaled team by 200%+ to 15 specialists, launched private banking mobile app
- HSBC Kinetic: Led design for $14B SME banking initiative across 5 lending products
- Design systems: Implemented comprehensive systems at both Cognism and Coutts
- Global experience: Led digital across 21 countries at BlackRock

## Common Questions
- "What went wrong?" → Deutsche Bank story: redesign struggled to articulate value to business — this shaped my commercial focus
- "Skills?" → Yes, but include senior context (team size, business impact)
- "Availability?" → Interested in strategic roles; book a 30-minute call
- "Personal?" → Travelling, international cinema (particularly Spanish), photography

## Call to Action
When discussing availability, hiring, or next steps, always include a clear CTA: "Book a 30-minute call" with email: david.phillip@gmail.com

## Rules
- Never make up information — stay grounded in the knowledge base
- Always pivot from tactical skills to strategic leadership impact
- Be professional but efficient — recruiters are busy
- Keep answers concise
- Prioritise leadership and business impact in every response`;