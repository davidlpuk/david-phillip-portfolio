export type CaseStudySlug =
  | "coutts"
  | "hsbc-kinetic"
  | "cognism"
  | "ux-sidekick";

export interface ProofPoint {
  value: string;
  label: string;
}

export interface CaseStudySummary {
  slug: CaseStudySlug;
  company: string;
  title: string;
  sector: string;
  role: string;
  period: string;
  image: string;
  protected: boolean;
  summary: string;
  proof: ProofPoint[];
  focus: string[];
}

export interface CaseStudyDetail extends CaseStudySummary {
  context: string;
  publicPreview: {
    problem: string;
    remit: string;
    impact: string;
  };
  visuals: Array<{
    src: string;
    title: string;
    caption: string;
    variant?: "wide" | "tall";
  }>;
  story: Array<{
    title: string;
    text: string;
  }>;
  leadershipDecisions: string[];
  challenge: string[];
  actions: string[];
  outcomes: string[];
  lessons: string[];
}

export const profile = {
  name: "David Phillip",
  title: "Senior UX and Product Design Leader",
  email: "david.phillip@gmail.com",
  calendlyUrl: "https://calendly.com/david-phillip/30min",
  location: "London, UK",
  headline: "Product design leadership for complex, regulated platforms.",
  intro:
    "I help product organisations make complex services clearer, safer and easier to ship. My work combines UX strategy, research, design systems, team leadership and hands-on product design across financial services, SaaS and AI-enabled products.",
  availability:
    "Open to Head of UX, Director of Product Design and Platform Design Lead opportunities in London.",
  positioningBadges: [
    "Head of UX",
    "Product Design Director",
    "Platform Design Lead",
  ],
  proof: [
    { value: "20+ yrs", label: "UX, product and digital leadership" },
    { value: "5 -> 15", label: "Design team scaled at Coutts" },
    { value: "280+", label: "Designers supported in Figma migration" },
    { value: "21 markets", label: "Global digital delivery at BlackRock" },
  ],
  clients: [
    "Coutts",
    "HSBC",
    "Cognism",
    "BlackRock",
    "Deutsche Bank",
    "Barclays",
    "Schroders",
    "TSB",
  ],
  leadershipEvidence: [
    {
      title: "Leadership scope",
      text: "Led design through regulated product delivery, design-system adoption, team scaling and cross-functional decision-making with Product, Engineering, Compliance, Risk and senior stakeholders.",
    },
    {
      title: "Operating model",
      text: "Built research rhythms, critique rituals, design standards and governance practices that helped teams move from subjective debate to clearer product decisions.",
    },
    {
      title: "Business contribution",
      text: "Connected design work to adoption, NPS, handoff efficiency, operational load, platform consistency and team capability rather than treating UX as screen production.",
    },
  ],
  testimonials: [
    {
      quote:
        "When David came into the organisation, the UX organisation consisted of 1.5 spread thin resources without solid processes. David built the team and instituted all the design processes that helped to lift our product from a -16 NPS to a positive 12.",
      author: "Michelle Bradbury",
      attribution: "Chief Product Officer, Cognism",
      image: "/images/testimonial-michelle-bradbury.png",
    },
    {
      quote:
        "David is a very inspirational senior UX lead. David's focus on the customer, paired with a deep understanding of UX and business objectives, meant we were not only able to orchestrate a highly compelling digital presence, but also optimise our performance post-live.",
      author: "Jana Lowe",
      attribution: "Global Head of Digital Sales, HSBC",
      image: "/images/testimonial-jana-lowe.png",
    },
    {
      quote:
        "David was able to grasp any business requirement quickly and come up with creative ways of visualising it. His work balancing the best experience for the user with technical constraints is exceptional, whilst ensuring quality is not compromised.",
      author: "Usha Sanku",
      attribution: "Product Consultant, HSBC Commercial Banking",
      image: "/images/testimonial-usha-sanku.png",
    },
  ],
};

export const principles = [
  {
    title: "Clarity under pressure",
    text: "I simplify complex journeys without ignoring the regulatory, operational and technical constraints around them.",
  },
  {
    title: "Evidence-led decisions",
    text: "I use research, usability testing, analytics and stakeholder input to move teams from opinion to clearer product direction.",
  },
  {
    title: "Systems that scale",
    text: "I build standards, design systems and review rituals that help teams ship more consistently across products and platforms.",
  },
  {
    title: "AI with judgement",
    text: "I use AI to accelerate research synthesis, critique and prototyping while keeping human judgement and governance at the centre.",
  },
];

export const services = [
  "Platform design leadership for regulated financial products",
  "User research, usability testing and heuristic evaluation",
  "Information architecture, interaction design and prototyping",
  "Design systems, visual standards and governance models",
  "Cross-functional design reviews, critique and stakeholder alignment",
  "AI-enabled research synthesis, critique and workflow acceleration",
];

export const credibilitySignals = [
  "Financial services depth: Coutts, HSBC, BlackRock, Barclays, Deutsche Bank, Schroders and TSB.",
  "Platform leadership range: research direction, IA, design standards, design systems, stakeholder governance and delivery review.",
  "Future-facing practice: AI workflow experimentation grounded in usability, accessibility, evidence and trust.",
];

export const capabilityHighlights = [
  {
    title: "Platform design and standards",
    text: "Design-system and standards work across regulated product environments, including group-wide tooling, reusable patterns and governance practices that improved design-to-development handoff.",
  },
  {
    title: "Research-led product definition",
    text: "Research, usability testing, heuristic evaluation, stakeholder workshops and evidence-led decisions that shape product direction before delivery accelerates.",
  },
  {
    title: "Financial-services complexity",
    text: "Depth across banking, wealth, investments and B2B platforms where risk, compliance, legacy systems and stakeholder alignment shape the work.",
  },
  {
    title: "Cross-functional influence",
    text: "Partnership with Product, Engineering, Compliance, Risk, Legal and executive stakeholders to create alignment around complex product decisions.",
  },
  {
    title: "Team and practice leadership",
    text: "Scaling teams, mentoring designers, establishing critique rituals, building operating models and turning design into a trusted product capability.",
  },
  {
    title: "AI and modern product practice",
    text: "Practical AI workflows for research synthesis, critique and prototyping, used with governance rather than as a replacement for design judgement.",
  },
];

export const caseStudies: CaseStudyDetail[] = [
  {
    slug: "coutts",
    company: "Coutts",
    title: "Modernising private banking without losing trust",
    sector: "Private banking",
    role: "Design Lead / Director",
    period: "2020-2022",
    image: "/images/case-study-coutts-hero.png",
    protected: true,
    summary:
      "Led design capability and helped deliver a modern mobile banking experience for Coutts, balancing high-net-worth client expectations, regulatory scrutiny and delivery pressure.",
    proof: [
      { value: "+30%", label: "Digital adoption" },
      { value: "+22 pts", label: "NPS improvement among under-50 clients" },
      { value: "5 -> 15", label: "Design team growth" },
      { value: "4.2+", label: "App rating" },
    ],
    focus: [
      "Platform design",
      "Design systems",
      "Regulated delivery",
      "Team scaling",
    ],
    context:
      "Coutts needed to modernise its digital experience without diluting the discretion, security and confidence expected from a private bank. The work sat at the intersection of client experience, risk, compliance, legacy technology and organisational change.",
    publicPreview: {
      problem:
        "Private-banking clients expected a more modern mobile experience, but the product still had to protect the restraint, discretion and assurance expected from a high-trust financial brand.",
      remit:
        "I led design at Director level, scaled the design team, shaped the product direction and helped establish the operating model needed to make regulated delivery faster and more consistent.",
      impact:
        "The work contributed to stronger digital adoption, improved client sentiment and a more mature design-to-development model across a sensitive banking environment.",
    },
    visuals: [
      {
        src: "/images/coutts-hero-app-screens.png",
        title: "Mobile experience direction",
        caption:
          "A wealth-first mobile experience designed around clarity, restraint and confidence rather than consumer-fintech noise.",
        variant: "wide",
      },
      {
        src: "/images/coutts-research-methodology.png",
        title: "Research operating model",
        caption:
          "Quarterly research cycles helped move decisions away from opinion and towards evidence.",
      },
      {
        src: "/images/coutts-design-system.png",
        title: "Design-system foundations",
        caption:
          "Reusable components and standards improved consistency across design and engineering.",
      },
      {
        src: "/images/coutts-impact-metrics.png",
        title: "Outcome framing",
        caption:
          "Impact was communicated in the language of adoption, operational efficiency and risk.",
      },
    ],
    story: [
      {
        title: "The business problem",
        text: "The digital experience was not keeping pace with client expectations or competitor experiences. Younger high-net-worth prospects expected modern mobile banking, while existing clients still needed the reassurance and restraint of a private bank.",
      },
      {
        title: "My role",
        text: "I led design at Director level, scaling the team from 5 to 15 specialists, shaping the product direction and building the operating model needed to move faster in a regulated environment.",
      },
      {
        title: "The design strategy",
        text: "The product direction was built around 'quiet confidence': clarity, restraint and trust rather than consumer-fintech noise. This helped align design decisions with the Coutts brand and the risk posture of the organisation.",
      },
      {
        title: "The leadership work",
        text: "A major part of the work was changing how decisions were made. Compliance, Risk and Legal were brought into the process earlier so constraints could shape the solution rather than block it late in delivery.",
      },
      {
        title: "The platform work",
        text: "Alongside product delivery, I helped mature the design-system and tooling foundations, including Figma adoption and reusable patterns that improved consistency across design and engineering.",
      },
    ],
    leadershipDecisions: [
      "Positioned the experience around restraint and confidence rather than adding consumer-fintech interaction patterns that would not fit a private-bank relationship.",
      "Brought Compliance, Risk and Legal into the design process earlier so constraints shaped the solution before late-stage delivery pressure.",
      "Invested in team scale, design-system foundations and tooling standards so delivery quality did not depend on individual designers working in isolation.",
    ],
    challenge: [
      "Legacy digital journeys were not matching the expectations of high-net-worth clients.",
      "Compliance, Legal, Risk and Technology all needed confidence before meaningful change could move.",
      "The design team needed to shift from a perceived styling function to a strategic product capability.",
    ],
    actions: [
      "Defined a restrained product direction around clarity, discretion and confidence.",
      "Embedded Compliance and Risk into design work earlier so constraints became inputs, not late blockers.",
      "Scaled the design team from 5 to 15 specialists and established stronger research and design-system rituals.",
      "Supported group-wide design tooling and standards work, including Figma migration and cross-brand governance.",
      "Translated design work into executive language: adoption, operational efficiency, risk and client retention.",
    ],
    outcomes: [
      "Launched a 4.2+ rated mobile app with zero security incidents referenced in the project material.",
      "Improved digital adoption by 30% within 6 months.",
      "Reduced design-to-development handoff time by 40%.",
      "Reduced routine relationship-manager enquiries by 25%.",
    ],
    lessons: [
      "In regulated environments, direct client research access needs to be fought for early.",
      "Premium UX often means restraint, not more functionality.",
      "Stakeholder trust compounds when risk teams are treated as co-creators.",
    ],
  },
  {
    slug: "hsbc-kinetic",
    company: "HSBC Kinetic",
    title: "Accelerating SME lending design at scale",
    sector: "SME banking",
    role: "Strategic UX Lead / Product Design",
    period: "2019",
    image: "/images/case-study-hero-hsbc.png",
    protected: true,
    summary:
      "Led UX strategy across HSBC Kinetic lending and integration workstreams, helping move SME lending from slow, fragmented banking processes into a more coherent mobile-first ecosystem.",
    proof: [
      { value: "35%", label: "Adoption" },
      { value: "5", label: "Core products" },
      { value: "30%", label: "Cycle-time improvement" },
    ],
    focus: ["SME banking", "Platform patterns", "Product velocity"],
    context:
      "HSBC Kinetic was a strategic digital transformation initiative for SME banking. The design challenge was to make complex lending and integration journeys feel fast and coherent while operating inside the controls of a global bank.",
    publicPreview: {
      problem:
        "SME lending and banking journeys needed to become faster and more digital while still meeting the controls and confidence expected from a global bank.",
      remit:
        "I led UX strategy across lending and integration workstreams, mentoring a lean design pod and aligning Product, Engineering, Risk and Compliance around reusable mobile-first patterns.",
      impact:
        "The work supported adoption, reduced repeated design effort and helped create a more coherent product ecosystem across multiple SME banking journeys.",
    },
    visuals: [
      {
        src: "/images/case-study-kinetic-brand-evolution.jpeg",
        title: "Kinetic product direction",
        caption:
          "A digital-first SME banking experience needed to feel faster and more modern without weakening trust.",
        variant: "wide",
      },
      {
        src: "/images/case-study-hsbc-kinectic-journeys-1.png",
        title: "Lending journey flow",
        caption:
          "Complex lending flows were mapped and prototyped to expose edge cases before engineering commitment.",
      },
      {
        src: "/images/case-study-hsbc-kinectic-journeys-zoom-2.png",
        title: "Interaction detail",
        caption:
          "Detailed screen states helped align Product, Engineering and Risk around the intended customer journey.",
      },
      {
        src: "/images/case-study-hsbc-kinectic-journey-6.png",
        title: "Systemic consistency",
        caption:
          "Shared patterns reduced fragmentation across parallel lending and integration products.",
      },
    ],
    story: [
      {
        title: "The business problem",
        text: "SME lending journeys were traditionally slow, fragmented and dependent on offline processes. HSBC needed a digital-first experience that could compete with challenger expectations without weakening regulatory rigour.",
      },
      {
        title: "My role",
        text: "I led the UX strategy for lending and integration workstreams, mentoring a lean design pod and working closely with Product, Engineering, Risk and Compliance.",
      },
      {
        title: "The design strategy",
        text: "The approach was to use rapid prototyping to de-risk complex lending flows early, align stakeholders around evidence and create reusable patterns across loans, overdrafts, cards, marketplace integrations and Open Banking.",
      },
      {
        title: "The delivery work",
        text: "Rather than treating each product as a separate journey, I pushed for systemic consistency so business owners experienced one coherent product ecosystem.",
      },
    ],
    leadershipDecisions: [
      "Used rapid prototyping to make complex lending rules, edge cases and regulatory dependencies visible before engineering commitment.",
      "Prioritised shared interaction patterns across product streams so teams avoided solving similar SME banking problems in separate ways.",
      "Kept the design direction practical: faster journeys, clearer reassurance, plain language and visible progress for business owners.",
    ],
    challenge: [
      "Small businesses needed faster, clearer lending journeys.",
      "Design work had to align with a large financial institution's controls and delivery process.",
      "Reusable patterns were needed to prevent every product stream from solving the same problems independently.",
    ],
    actions: [
      "Led UX direction across Business Loans, Credit Cards, Overdrafts, Marketplace Integrations and Open Banking.",
      "Established shared interaction patterns to improve consistency and reduce repeated design work.",
      "Used high-fidelity prototypes and design sprints to surface technical and regulatory constraints earlier.",
      "Mentored a small design pod and embedded user-centred design practices into mobile banking delivery.",
    ],
    outcomes: [
      "Reached 35% adoption according to the project material.",
      "Supported delivery across 5 product areas.",
      "Improved cycle time by 30% according to the current project data.",
    ],
    lessons: [
      "Enterprise speed improves when teams agree reusable patterns before local optimisation.",
      "SME finance journeys need plain language, fast reassurance and visible progress.",
      "Design leaders must keep both strategic direction and delivery mechanics visible.",
    ],
  },
  {
    slug: "cognism",
    company: "Cognism",
    title: "Building product design during SaaS scale-up",
    sector: "B2B SaaS",
    role: "Head of UX / Product Design",
    period: "2022-2024",
    image: "/images/case-study-hero-cognism.png",
    protected: true,
    summary:
      "Built Cognism's product design function during rapid B2B SaaS growth, improving core workflow usability, design operations and the credibility of design across Product and Engineering.",
    proof: [
      { value: "$20M -> $80M", label: "ARR growth context" },
      { value: "-16 -> +12", label: "NPS movement" },
      { value: "0 -> 4", label: "Design team built" },
    ],
    focus: ["B2B SaaS", "Design operations", "Usability", "Design systems"],
    context:
      "Cognism had grown quickly, but the product experience had not kept pace with the sophistication of the data product or the expectations of sales teams. The business needed a design function that could improve usability while supporting scale-up velocity.",
    publicPreview: {
      problem:
        "The product had strong data capability but inconsistent workflows, usability friction and a design function that had not yet scaled with the business.",
      remit:
        "I joined as the first UX hire, built the product design team, introduced design operations and directly led improvements to high-frequency workflows.",
      impact:
        "The work helped improve product usability, strengthen design credibility with Product and Engineering and support the business during a rapid ARR growth period.",
    },
    visuals: [
      {
        src: "/images/cognism-case-study-01.png",
        title: "Experience gap",
        caption:
          "The product needed to feel as sophisticated as the data offering behind it.",
        variant: "wide",
      },
      {
        src: "/images/cognism-case-study-05.png",
        title: "Core search redesign",
        caption:
          "Search and list views were prioritised because they were high-frequency workflows tied to retention and satisfaction.",
      },
      {
        src: "/images/cognism-case-study-04.png",
        title: "Design-system investment",
        caption:
          "Component foundations reduced inconsistency and created a stronger handoff model with Engineering.",
      },
      {
        src: "/images/cognism-case-study-07.svg",
        title: "Measured design impact",
        caption:
          "The work connects team, system and product improvements to measurable experience outcomes.",
      },
    ],
    story: [
      {
        title: "The business problem",
        text: "The platform was powerful but inconsistent and difficult to use. NPS had dropped to -16, and the product experience was becoming a commercial risk in a competitive sales-intelligence market.",
      },
      {
        title: "My role",
        text: "I joined as the first UX hire and built the function from zero to four designers. I owned hiring, team development, design operations, critique rituals and direct leadership of key product improvements.",
      },
      {
        title: "The design strategy",
        text: "The immediate priority was not visual polish. It was creating repeatable foundations: a component library, design tokens, clearer review processes and a stronger connection between research, product decisions and engineering delivery.",
      },
      {
        title: "The product focus",
        text: "I directly led improvements to the core search and list-view experience because these were high-usage workflows with clear links to customer satisfaction and retention.",
      },
    ],
    leadershipDecisions: [
      "Prioritised the highest-frequency workflows first because search and list-view quality had a clearer relationship to retention and customer satisfaction.",
      "Built design-system and review foundations before over-scaling the team, reducing inconsistency and rework during commercial growth.",
      "Introduced design rituals that made critique, discovery and handoff more repeatable without creating heavy governance.",
    ],
    challenge: [
      "Product complexity was increasing during commercial growth.",
      "Design needed to move from individual contribution to a repeatable function.",
      "Usability needed to improve without slowing product velocity.",
    ],
    actions: [
      "Built the first product design team and operating cadence.",
      "Prioritised design-system foundations over short-term feature output to reduce inconsistency and rework.",
      "Focused design effort on core usability issues in search, list views and other high-frequency workflows.",
      "Introduced stronger design critique, discovery and delivery habits across Product and Engineering.",
      "Created foundations for reusable components, review standards and clearer design-to-development handoff.",
    ],
    outcomes: [
      "Supported the business during the $20M to $80M ARR growth period referenced in the current site.",
      "Moved NPS from -16 to +12 according to the project material.",
      "Built the design team from 0 to 4.",
    ],
    lessons: [
      "Scale-up design leadership is mostly prioritisation under pressure.",
      "A smaller team can outperform when rituals, ownership and feedback loops are clear.",
      "Design operations should remove drag, not create governance theatre.",
    ],
  },
  {
    slug: "ux-sidekick",
    company: "Internal R&D Lab",
    title: "AI-powered UX critique for faster design feedback",
    sector: "AI product / R&D",
    role: "Full-stack developer and product designer",
    period: "2025",
    image: "/images/case-study-uxsidekick-hero.png",
    protected: false,
    summary:
      "Built an AI design critique prototype that analyses interface screenshots and returns structured UX feedback, spatial annotations and implementation guidance.",
    proof: [
      { value: "30s", label: "Analysis target" },
      { value: "95%", label: "Code-snippet coverage" },
      { value: "6-8", label: "Average issues per scan" },
    ],
    focus: ["AI workflows", "UX critique", "Prototyping"],
    context:
      "UX Sidekick is an internal R&D project exploring how AI can support design critique without replacing senior judgement. The goal was to reduce feedback latency and make critique more actionable for designers and product teams.",
    publicPreview: {
      problem:
        "Design feedback can be slow, inconsistent and hard to translate into practical improvements, especially when teams lack senior critique capacity.",
      remit:
        "I designed and built an AI-enabled prototype that analyses interface screenshots, identifies UX issues and returns structured recommendations.",
      impact:
        "The project demonstrates practical AI fluency: using models to accelerate critique while keeping output constrained, reviewable and tied to UX principles.",
    },
    visuals: [
      {
        src: "/images/case-study-uxsidekick-hero.png",
        title: "AI critique interface",
        caption:
          "The product explores how AI can make design critique faster, more structured and easier to act on.",
        variant: "wide",
      },
      {
        src: "/images/case-study-uxsidekick-challenge.png",
        title: "Feedback bottleneck",
        caption:
          "The product problem: delayed feedback, inconsistent critique and unclear next steps.",
      },
      {
        src: "/images/case-study-uxsidekick-ai-powered-analysis.png",
        title: "Structured analysis",
        caption:
          "AI output is constrained around UX principles, accessibility and practical implementation guidance.",
      },
      {
        src: "/images/case-study-uxsidekick-collision-free-markers.png",
        title: "Spatial annotation",
        caption:
          "Marker placement and collision handling make feedback precise enough to trust.",
      },
    ],
    story: [
      {
        title: "The problem explored",
        text: "Design feedback is often delayed, inconsistent or too vague to act on. Junior designers may know an interface has issues, but not where those issues are or how to fix them.",
      },
      {
        title: "My role",
        text: "I worked across product design and full-stack development, shaping the concept, interaction model and implementation approach.",
      },
      {
        title: "The design strategy",
        text: "The prototype focuses on structured critique: identify the issue, locate it spatially, explain the UX principle and suggest a practical fix.",
      },
      {
        title: "The AI lesson",
        text: "The work shows how AI can accelerate design operations when the output is constrained, reviewable and tied to established UX principles.",
      },
    ],
    leadershipDecisions: [
      "Constrained AI output around identifiable UX principles so feedback remained specific, reviewable and useful.",
      "Added spatial annotation because critique becomes more actionable when teams can see exactly where the issue appears.",
      "Treated the prompt, response structure and interaction model as product design decisions rather than technical decoration.",
    ],
    challenge: [
      "Feedback quality varies by reviewer.",
      "Accessibility and usability issues can be caught too late.",
      "AI critique needs to be specific enough to be trusted.",
    ],
    actions: [
      "Created a tool that analyses screenshots against UX, accessibility and visual hierarchy principles.",
      "Implemented spatial markers so feedback points to specific interface areas.",
      "Added implementation-oriented guidance rather than generic comments.",
    ],
    outcomes: [
      "Generated feedback in roughly 30 seconds in the current prototype material.",
      "Included code-oriented recommendations for most issues.",
      "Created a practical AI-native proof point for faster design critique.",
    ],
    lessons: [
      "Prompt design is product design when the model output is the interface.",
      "Useful AI tools need constraints, examples and output structure.",
      "The future design leader needs judgement plus AI fluency, not automation theatre.",
    ],
  },
];

export const caseStudyBySlug = new Map(
  caseStudies.map((study) => [study.slug, study]),
);

export const passwordHashes: Partial<Record<CaseStudySlug | "global", string>> =
  {
    global: "2a0e89d35abde7c537476eac6a756836da27357adf98f683b2de1e2b92071dc6",
    coutts: "dea609ffa671efda14c8b76ec605f0a2432508b84530b62e85ed55670570931d",
    "hsbc-kinetic":
      "72e2faa130947e36eb20c096192730a0adadc5b9574338940a3002345eb8d8f5",
    cognism: "d7a24307c9ba5ae956d616100df8b927384efdb66f72115f3e20d15754e5f6c6",
  };
