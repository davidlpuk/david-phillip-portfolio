export type CaseStudySlug =
  | "coutts"
  | "hsbc-kinetic"
  | "cognism"
  | "ux-sidekick";

export interface ProofPoint {
  value: string;
  label: string;
  context?: string;
}

export interface CaseStudySummary {
  slug: CaseStudySlug;
  company: string;
  title: string;
  sector: string;
  role: string;
  period: string;
  team: string;
  scope: string;
  outcome: string;
  /** One line for hiring managers: what this case study demonstrates */
  relevance: string;
  image: string;
  /** 800px-wide variant for small screens, when the cover is larger */
  imageSmall?: string;
  imageAlt: string;
  /** CSS object-position that keeps the subject in view when cropped */
  imageFocus: string;
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
  film?: {
    src: string;
    poster: string;
    title: string;
    caption: string;
  };
  visuals: Array<{
    src: string;
    width: number;
    height: number;
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

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
  relationship: string;
}

export interface ExperienceEntry {
  period: string;
  role: string;
  company: string;
  summary: string;
  caseStudy?: CaseStudySlug;
}

export const profile = {
  name: "David Phillip",
  title: "Head of Design · Design Director",
  email: "david.phillip@gmail.com",
  calendlyUrl: "https://calendly.com/david-phillip/30min",
  linkedinUrl: "https://www.linkedin.com/in/davidphillip/",
  location: "London, UK",
  availability: "Available now",
  targetRoles: "Head of Design, Design Director and Platform Design Lead roles",
  headline: "Design leadership for financial products where trust is the product.",
  intro:
    "I’m David Phillip, a Head of Design and Design Director with 20+ years across Coutts, HSBC, BlackRock and Cognism. I build design teams, the systems they run on, and the evidence that ties UX to adoption, NPS and revenue.",
  heroProof: [
    { value: "−16 → +12", label: "NPS turnaround", context: "Cognism" },
    { value: "5 → 15", label: "Design team scaled", context: "Coutts" },
    { value: "35%", label: "Adoption in 6 months, vs 25% target", context: "HSBC Kinetic" },
    { value: "£400K", label: "Saved a year moving 280+ designers to Figma", context: "NatWest Group" },
  ] satisfies ProofPoint[],
  clients: [
    { name: "Coutts", logo: "/images/logos/logo-coutts.svg" },
    { name: "HSBC", logo: "/images/logos/logo-hsbc.svg" },
    { name: "BlackRock", logo: "/images/logos/logo-blackrock.svg" },
    { name: "Cognism", logo: "/images/logos/logo-cognism.svg" },
    { name: "Barclays", logo: "/images/logos/logo-barclays.svg" },
    { name: "Deutsche Bank", logo: "/images/logos/logo-deustche-bank.svg" },
    { name: "Schroders", logo: "/images/logos/logo-schorders.svg" },
    { name: "TSB", logo: "/images/logos/tsb-logo.svg" },
  ],
};

export const leadershipPillars = [
  {
    title: "People before pixels",
    text: "Hire for trajectory, grow people with clear career paths and honest critique, and protect the team’s focus.",
    proof: "100% design team retention over two years at Cognism.",
  },
  {
    title: "Systems that scale quality",
    text: "Design systems, tooling and DesignOps so quality doesn’t depend on a few heroic individuals.",
    proof: "Figma rollout for 280+ designers across NatWest Group, saving £400K+ a year.",
  },
  {
    title: "Evidence over opinion",
    text: "Research cadences, usability testing and product metrics that turn debates into decisions.",
    proof: "Set up the first UX research practice at Coutts.",
  },
  {
    title: "Risk as a design partner",
    text: "Bring Compliance, Risk, Legal and Engineering in early so constraints shape the work instead of blocking it late.",
    proof: "Coutts mobile app launched with zero security incidents.",
  },
];

export const firstNinetyDays = [
  {
    window: "Days 1–30",
    title: "Listen and map",
    text: "Meet every designer, PM and engineering lead. Audit the product, the design system and the backlog. Find where design is blocked and where trust is thin.",
  },
  {
    window: "Days 31–60",
    title: "Align on outcomes",
    text: "Agree a design strategy and success measures with Product and Engineering. Set the rhythms: critique, research cadence, design QA and risk check-ins.",
  },
  {
    window: "Days 61–90",
    title: "Deliver and embed",
    text: "Ship a visible improvement on a high-traffic journey. Publish the operating model, hiring plan and a 12-month roadmap the business can hold us to.",
  },
];

export const aiPractice = [
  {
    title: "Research synthesis",
    text: "Interview notes and survey data clustered into themes in minutes, then validated by people before they shape a decision.",
  },
  {
    title: "Critique at scale",
    text: "UX Sidekick reviews screens against usability and WCAG heuristics in about 30 seconds, so senior attention goes where it matters.",
  },
  {
    title: "Prototypes in code",
    text: "Working prototypes built with AI coding tools, so teams test real behaviour with users and engineers sooner.",
  },
  {
    title: "Team enablement",
    text: "Ran AI workshops at Cognism that drove tool adoption across design and product, with guardrails for quality and data.",
  },
];

export const experience: ExperienceEntry[] = [
  {
    period: "2024 – now",
    role: "Career break and AI product R&D",
    company: "Independent",
    summary:
      "Designing and building AI-assisted design tools, including UX Sidekick.",
    caseStudy: "ux-sidekick",
  },
  {
    period: "2022 – 2024",
    role: "Head of UX, Product Design",
    company: "Cognism",
    summary:
      "Built the first product design function through 4× ARR growth. NPS from −16 to +12, 100% team retention.",
    caseStudy: "cognism",
  },
  {
    period: "2020 – 2022",
    role: "Design Director",
    company: "Coutts · NatWest Group",
    summary:
      "Led digital experience design across four brands. Scaled the team from 5 to 15 and launched the 4.2★ mobile app.",
    caseStudy: "coutts",
  },
  {
    period: "2019",
    role: "UX Lead, Product Design (contract)",
    company: "HSBC Kinetic",
    summary:
      "Led design for five SME lending products. 35% adoption in six months against a 25% target.",
    caseStudy: "hsbc-kinetic",
  },
  {
    period: "2016 – 2019",
    role: "UX Lead, Wealth & Investments",
    company: "Schroders",
    summary:
      "Unified three legacy systems into one digital platform and led design sprints for the first HNWI mobile app.",
  },
  {
    period: "2016",
    role: "UX Lead",
    company: "Deutsche Bank",
    summary: "HR intranet design and mobile labs across the UK and Germany.",
  },
  {
    period: "2013 – 2015",
    role: "UX Lead",
    company: "TSB Bank",
    summary: "Branch locator and digital journeys behind multimillion-pound campaigns.",
  },
  {
    period: "2012 – 2013",
    role: "UX Lead",
    company: "Barclays Wealth",
    summary: "A/B testing, conversion optimisation and international banking journeys.",
  },
  {
    period: "2008 – 2012",
    role: "Senior UX Designer",
    company: "HSBC",
    summary: "Owned UX for HSBC’s commercial banking web presence, 34M+ visits a year.",
  },
  {
    period: "2006 – 2008",
    role: "AVP, Digital Marketing",
    company: "BlackRock",
    summary: "Digital transformation across 21 countries in EMEA, APAC and LATAM.",
  },
];

export const featuredTestimonial: Testimonial = {
  quote:
    "When David came into the organisation, the UX organisation consisted of 1.5 spread-thin resources without solid processes. David built the team and instituted all the design processes that helped to lift our product from a −16 NPS to a positive 12. The designers were ahead of our agile teams across all features.",
  author: "Michelle Bradbury",
  role: "Chief Product Officer",
  company: "Cognism",
  image: "/images/testimonial-michelle-bradbury.png",
  relationship: "David’s manager",
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "David is a very inspirational senior UX lead. His focus on the customer, paired with a deep understanding of UX and business objectives, meant we were not only able to orchestrate a highly compelling digital presence, but also optimise our performance post-live.",
    author: "Jana Lowe",
    role: "Global Head of Digital Sales",
    company: "HSBC",
    image: "/images/testimonial-jana-lowe.png",
    relationship: "Business stakeholder",
  },
  {
    quote:
      "David excelled in organising and hiring for a very fast-growing team, working hard to improve the team’s ways of working and processes. He supported me as I moved into a lead UI position with empathy and patience. The team flourished under his leadership.",
    author: "Jacqui Chadwick",
    role: "Lead Product Designer",
    company: "Coutts",
    image: "/images/testimonial-jacqui-chadwick.png",
    relationship: "Reported to David",
  },
  {
    quote:
      "One of his standout qualities is his ability to make people feel heard and valued. He fosters a safe and supportive environment where team members can voice their thoughts and feel confident exploring new ideas.",
    author: "André Louro Martins",
    role: "Design Lead",
    company: "Cognism",
    image: "/images/testimonial-andre-martins.png",
    relationship: "Reported to David",
  },
  {
    quote:
      "David was able to grasp any business requirement quickly and come up with creative ways of visualising it. His work balancing the best experience for the user with technical constraints is exceptional, whilst ensuring quality is not compromised.",
    author: "Usha Sanku",
    role: "Product Consultant",
    company: "HSBC Commercial Banking",
    image: "/images/testimonial-usha-sanku.png",
    relationship: "Product partner",
  },
  {
    quote:
      "His favourite saying, ‘It’s not about the pixels, it’s about the people,’ perfectly encapsulates his philosophy. He empowered individuals, nurtured creativity, and championed a culture of inclusivity and open communication.",
    author: "Biljana Galapcheva",
    role: "Senior Product Designer",
    company: "Cognism",
    image: "/images/testimonial-biljana-galapcheva.png",
    relationship: "Reported to David",
  },
  {
    quote:
      "As Head of Design, he not only set up great processes but also created a really positive and collaborative work culture. He genuinely cares about the people he works with and always pushed me to be my best.",
    author: "Ljupcho Krstevski",
    role: "Senior Product Designer",
    company: "Cognism",
    image: "/images/testimonial-ljupcho-krstevski.png",
    relationship: "Reported to David",
  },
  {
    quote:
      "One of the most thoughtful managers I have known. He really goes above and beyond to create a great work environment. In addition to being a great manager, David is a smart designer with a deep knowledge of all levels of the UX process.",
    author: "Kiri Martin",
    role: "UX Designer",
    company: "Coutts",
    image: "/images/testimonial-kiri-martin.png",
    relationship: "Reported to David",
  },
  {
    quote:
      "David is a true professional with a huge amount of knowledge and passion for all things digital. He has an impressive track record of developing and delivering great ideas, with a focus on great customer experience.",
    author: "Chris Joannou",
    role: "Head of Digital",
    company: "Santander Consumer Finance",
    image: "/images/testimonial-chris-joannou.png",
    relationship: "Peer",
  },
];

export const caseStudies: CaseStudyDetail[] = [
  {
    slug: "coutts",
    company: "Coutts",
    title: "Modernising private banking without losing its quiet confidence",
    sector: "Private banking",
    role: "Design Director",
    period: "2020 – 2022",
    team: "5 → 15 designers and researchers",
    scope: "Mobile and web, four brands",
    outcome: "+30% digital adoption in six months",
    relevance: "Director-level leadership inside a regulated, high-trust bank",
    image: "/images/site/cover-coutts.webp",
    imageSmall: "/images/site/cover-coutts-800.webp",
    imageAlt:
      "Coutts mobile banking screens showing a personalised welcome, account balances and Coutts Rewards",
    imageFocus: "40% 50%",
    protected: true,
    summary:
      "Directed the design of Coutts’ mobile banking experience and grew the team behind it, balancing high-net-worth client expectations, regulatory scrutiny and delivery pressure.",
    proof: [
      { value: "+30%", label: "Digital adoption in 6 months" },
      { value: "4.2★", label: "App rating at launch" },
      { value: "5 → 15", label: "Design team growth" },
      { value: "£400K+", label: "Saved a year via Figma rollout" },
    ],
    focus: [
      "Design leadership",
      "Design systems",
      "Regulated delivery",
      "Team scaling",
    ],
    context:
      "Coutts needed to modernise its digital experience without diluting the discretion, security and confidence expected from a private bank. The work sat where client experience, risk, compliance, legacy technology and organisational change meet.",
    publicPreview: {
      problem:
        "Younger high-net-worth clients expected modern mobile banking. Existing clients still needed the restraint and reassurance of a private bank.",
      remit:
        "Director of digital experience design across four brands: team growth, product direction, research practice and the operating model for regulated delivery.",
      impact:
        "Higher digital adoption, a 4.2★ app launched with zero security incidents, and a faster, more consistent design-to-development model.",
    },
    visuals: [
      {
        src: "/images/site/coutts-research.webp",
        width: 1264,
        height: 694,
        title: "Research operating model",
        caption:
          "A shared discover-define-design-deliver process gave research a regular place in product decisions.",
        variant: "wide",
      },
      {
        src: "/images/site/coutts-design-system.webp",
        width: 632,
        height: 347,
        title: "Design-system foundations",
        caption:
          "Colour, type and component standards documented once and reused across design and engineering.",
      },
      {
        src: "/images/site/coutts-impact.webp",
        width: 632,
        height: 347,
        title: "From system to production",
        caption:
          "The Instant Cash journey, built from shared components and shipped through the new handoff model.",
      },
    ],
    story: [
      {
        title: "The business problem",
        text: "The digital experience was not keeping pace with client expectations or competitors. Younger high-net-worth prospects expected modern mobile banking, while existing clients still needed the reassurance and restraint of a private bank.",
      },
      {
        title: "My role",
        text: "I led digital experience design at Director level with full budget responsibility, scaling the team from 5 to 15 specialists across UX, research and UI, and building the operating model needed to move faster in a regulated environment.",
      },
      {
        title: "The design strategy",
        text: "The product direction was built around ‘quiet confidence’: clarity, restraint and trust instead of consumer-fintech noise. It gave every design decision a test that matched the Coutts brand and the bank’s risk posture.",
      },
      {
        title: "Changing how decisions get made",
        text: "Compliance, Risk and Legal joined the process at the start, so constraints shaped the solution rather than blocking it late in delivery. Research moved from occasional validation to a quarterly rhythm.",
      },
      {
        title: "The platform work",
        text: "Alongside the app, I helped mature the design-system and tooling foundations, including the Figma migration for 280+ designers across NatWest Group and reusable patterns shared with engineering.",
      },
    ],
    leadershipDecisions: [
      "Positioned the experience around restraint and confidence instead of borrowing consumer-fintech patterns that would not fit a private-bank relationship.",
      "Brought Compliance, Risk and Legal into the design process early so constraints shaped the solution before late-stage delivery pressure.",
      "Invested in team scale, design-system foundations and tooling standards so delivery quality did not depend on individuals working in isolation.",
    ],
    challenge: [
      "Legacy digital journeys were not matching the expectations of high-net-worth clients.",
      "Compliance, Legal, Risk and Technology all needed confidence before meaningful change could move.",
      "Design had to shift from a perceived styling function to a strategic product capability.",
    ],
    actions: [
      "Defined a restrained product direction around clarity, discretion and confidence.",
      "Embedded Compliance and Risk into design work early so constraints became inputs, not late blockers.",
      "Scaled the design team from 5 to 15 specialists and set up the bank’s first UX research practice.",
      "Supported group-wide tooling and standards, including the Figma migration and cross-brand governance.",
      "Reported design work in executive language: adoption, operational efficiency, risk and client retention.",
    ],
    outcomes: [
      "Launched a 4.2★ rated mobile app with zero security incidents.",
      "Increased digital adoption by 30% within six months.",
      "Reduced design-to-development handoff time by 40%.",
      "Reduced routine relationship-manager enquiries by 25%.",
      "Saved £400K+ a year by moving 280+ designers to Figma across NatWest Group.",
    ],
    lessons: [
      "In regulated environments, direct client research access has to be fought for early.",
      "Premium UX often means restraint, not more functionality.",
      "Stakeholder trust compounds when risk teams are treated as co-creators.",
    ],
  },
  {
    slug: "hsbc-kinetic",
    company: "HSBC Kinetic",
    title: "Making SME lending fast enough for a mobile-first bank",
    sector: "SME banking",
    role: "UX Lead, Product Design (contract)",
    period: "2019",
    team: "Lean design pod",
    scope: "Five SME lending products",
    outcome: "35% adoption in six months against a 25% target",
    relevance: "Speed and shared patterns inside a global bank’s transformation",
    image: "/images/site/cover-hsbc-kinetic.webp",
    imageAlt:
      "HSBC Kinetic app on a phone with the line ‘Let’s do business’ over a red wave graphic",
    imageFocus: "100% 50%",
    protected: true,
    summary:
      "Led UX strategy across HSBC Kinetic’s lending and integration workstreams, moving SME lending from slow, fragmented processes into one coherent mobile-first product.",
    proof: [
      { value: "35%", label: "Adoption in 6 months (target 25%)" },
      { value: "30%", label: "Faster development cycles" },
      { value: "80%+", label: "Component reuse" },
    ],
    focus: ["SME banking", "Platform patterns", "Design sprints"],
    context:
      "HSBC Kinetic was a multi-billion-pound digital transformation for small-business banking. The design challenge was to make complex lending and integration journeys feel fast and coherent inside the controls of a global bank.",
    publicPreview: {
      problem:
        "SME lending had to become faster and fully digital while still meeting the controls and confidence expected from a global bank.",
      remit:
        "UX lead across lending and integration workstreams: mentoring a lean design pod and aligning Product, Engineering, Risk and Compliance on shared mobile-first patterns.",
      impact:
        "Adoption ahead of target, faster delivery cycles and one product ecosystem instead of five separate journeys.",
    },
    film: {
      src: "/videos/hsbc-kinetic-film.mp4",
      poster: "/images/site/kinetic-film-poster.webp",
      title: "HSBC Kinetic launch film",
      caption:
        "The shipped product: HSBC’s launch film for Kinetic, showing the mobile-first business banking experience in market.",
    },
    visuals: [
      {
        src: "/images/site/kinetic-brand.webp",
        width: 1600,
        height: 900,
        title: "Brand into product",
        caption:
          "The Kinetic brand had to sit inside the HSBC brand and carry through into the app’s design language.",
        variant: "wide",
      },
      {
        src: "/images/site/kinetic-journeys.webp",
        width: 639,
        height: 359,
        title: "Lending journeys end to end",
        caption:
          "Lending flows mapped and prototyped to expose edge cases before engineering committed.",
      },
      {
        src: "/images/site/kinetic-detail.webp",
        width: 639,
        height: 359,
        title: "Screen-level detail",
        caption:
          "Screen states for an MVP flow, used to agree the intended journey with Product, Engineering and Risk.",
      },
      {
        src: "/images/site/kinetic-patterns.webp",
        width: 639,
        height: 359,
        title: "Working sessions",
        caption:
          "Whiteboard flows used to agree shared patterns across parallel lending products.",
      },
    ],
    story: [
      {
        title: "The business problem",
        text: "SME lending was slow, fragmented and dependent on offline processes. HSBC needed a digital-first experience that could match challenger-bank expectations without weakening regulatory rigour.",
      },
      {
        title: "My role",
        text: "I led UX strategy for the lending and integration workstreams, mentoring a lean design pod and working daily with Product, Engineering, Risk and Compliance.",
      },
      {
        title: "The design strategy",
        text: "Rapid prototyping de-risked complex lending flows early and aligned stakeholders around evidence. Reusable patterns covered loans, overdrafts, cards, marketplace integrations and Open Banking.",
      },
      {
        title: "The delivery work",
        text: "Rather than treating each product as a separate journey, I pushed for systemic consistency so business owners experienced one product. Design sprints became the default way to start new work.",
      },
    ],
    leadershipDecisions: [
      "Used rapid prototyping to make lending rules, edge cases and regulatory dependencies visible before engineering commitment.",
      "Prioritised shared interaction patterns across product streams so teams stopped solving the same SME banking problems separately.",
      "Kept the direction practical: faster journeys, clearer reassurance, plain language and visible progress for business owners.",
    ],
    challenge: [
      "Small businesses needed faster, clearer lending journeys.",
      "Design work had to fit a global bank’s controls and delivery process.",
      "Without shared patterns, every product stream would solve the same problems independently.",
    ],
    actions: [
      "Led UX direction across Business Loans, Credit Cards, Overdrafts, Marketplace Integrations and Open Banking.",
      "Built a shared pattern library to improve consistency and cut repeated design work.",
      "Introduced design sprints and high-fidelity prototypes to surface technical and regulatory constraints earlier.",
      "Mentored a small design pod and embedded user-centred practice into mobile banking delivery.",
    ],
    outcomes: [
      "Reached 35% adoption within six months, against a 25% target.",
      "Cut development cycles by 30% through design sprints.",
      "Achieved 80%+ component reuse across five lending products.",
      "The rapid prototyping practice was adopted by other teams.",
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
    title: "Building product design from zero through 4× growth",
    sector: "B2B SaaS",
    role: "Head of UX, Product Design",
    period: "2022 – 2024",
    team: "0 → 4 designers, reporting to the CPO",
    scope: "Sales-intelligence platform",
    outcome: "NPS from −16 to +12, with ease of use the main driver",
    relevance: "Building a design function from zero, tied to commercial results",
    image: "/images/site/cover-cognism.webp",
    imageAlt:
      "Cognism usage dashboard showing credits remaining, active users and a bar chart of profile views",
    imageFocus: "85% 50%",
    protected: true,
    summary:
      "Built Cognism’s first product design function during rapid growth, fixing high-frequency workflows, setting up DesignOps and earning design a seat with Product and Engineering.",
    proof: [
      { value: "−16 → +12", label: "NPS turnaround" },
      { value: "100%", label: "Team retention over two years" },
      { value: "$20M → $80M", label: "ARR during tenure" },
    ],
    focus: ["B2B SaaS", "DesignOps", "Usability", "Design systems"],
    context:
      "Cognism had grown quickly, but the product experience had not kept pace with the data behind it or the expectations of the sales teams using it. The business needed a design function that could raise usability without slowing a scale-up down.",
    publicPreview: {
      problem:
        "Strong data, but inconsistent workflows, usability friction and an NPS of −16 that was becoming a commercial risk.",
      remit:
        "First UX hire with full budget responsibility: built the team, introduced DesignOps and led the redesign of the most-used workflows.",
      impact:
        "NPS moved from −16 to +12 with ease of use cited as the main driver, while the business grew ARR from $20M to $80M.",
    },
    visuals: [
      {
        src: "/images/site/cognism-experience-gap.webp",
        width: 843,
        height: 562,
        title: "The experience gap",
        caption:
          "The product needed to feel as sophisticated as the data offering behind it.",
        variant: "wide",
      },
      {
        src: "/images/site/cognism-search.webp",
        width: 843,
        height: 562,
        title: "Search and filters",
        caption:
          "Search and list views came first because they were the highest-frequency workflows tied to retention.",
      },
      {
        src: "/images/site/cognism-design-system.webp",
        width: 843,
        height: 562,
        title: "Design-system components",
        caption:
          "Filter and selection components built once, reducing inconsistency and rework with Engineering.",
      },
      {
        src: "/images/site/cognism-team.webp",
        width: 843,
        height: 562,
        title: "The team",
        caption:
          "The Cognism product design team: four designers with clear ownership areas and 100% retention.",
      },
    ],
    story: [
      {
        title: "The business problem",
        text: "The platform was powerful but inconsistent and hard to use. NPS had dropped to −16, and in a competitive sales-intelligence market the experience was becoming a commercial risk.",
      },
      {
        title: "My role",
        text: "I joined as the first UX hire, reporting to the CPO, and built the function from zero to four designers. I owned hiring, career paths, DesignOps, critique and hands-on leadership of key product improvements.",
      },
      {
        title: "The design strategy",
        text: "The first priority was not visual polish. It was repeatable foundations: a component library, design tokens, clear review processes and a stronger link between research, product decisions and delivery.",
      },
      {
        title: "The product focus",
        text: "I led the redesign of search and list views myself, because they were the most-used workflows and had the clearest link to satisfaction and retention. The proof point unlocked wider design investment.",
      },
    ],
    leadershipDecisions: [
      "Prioritised the highest-frequency workflows first because search and list-view quality had the clearest link to retention and satisfaction.",
      "Invested in design-system foundations before scaling the team, accepting slower short-term output to cut inconsistency and rework.",
      "Introduced critique, discovery and handoff rituals that made quality repeatable without heavy governance.",
    ],
    challenge: [
      "Product complexity was increasing during rapid commercial growth.",
      "Design needed to move from individual contribution to a repeatable function.",
      "Usability had to improve without slowing product velocity.",
    ],
    actions: [
      "Hired and grew the first product design team, with career pathways and a weekly operating cadence.",
      "Prioritised design-system foundations over short-term feature output.",
      "Focused design effort on search, list views and other high-frequency workflows.",
      "Ran AI workshops that drove tool adoption across design and product.",
      "Built the design system and DesignOps end to end, with clear design-to-development handoff.",
    ],
    outcomes: [
      "Moved NPS from −16 to +12, with ease of use cited as the main driver.",
      "Kept 100% of the design team over two years.",
      "The onboarding experience became the company benchmark for user-centred design.",
      "Supported the business through growth from $20M to $80M ARR.",
    ],
    lessons: [
      "Scale-up design leadership is mostly prioritisation under pressure.",
      "A small team can outperform when rituals, ownership and feedback loops are clear.",
      "DesignOps should remove drag, not create governance theatre.",
    ],
  },
  {
    slug: "ux-sidekick",
    company: "UX Sidekick",
    title: "An AI design critic, designed and built end to end",
    sector: "AI product R&D",
    role: "Product designer and full-stack developer",
    period: "2025",
    team: "Solo: design and engineering",
    scope: "AI critique tool, two-week build",
    outcome: "Structured UX critique in about 30 seconds",
    relevance: "Hands-on AI product fluency, from concept to working code",
    image: "/images/site/cover-ux-sidekick.webp",
    imageSmall: "/images/site/cover-ux-sidekick-800.webp",
    imageAlt:
      "UX Sidekick interface showing a 30-second verdict score of 80 out of 100 and a list of critical issues",
    imageFocus: "100% 100%",
    protected: false,
    summary:
      "Designed and built an AI critique tool that reviews interface screenshots and returns structured UX feedback, pinned to the exact element, with a suggested fix.",
    proof: [
      { value: "~30s", label: "Per analysis" },
      { value: "6–8", label: "Issues found per scan" },
      { value: "95%", label: "Issues with a code-level fix" },
    ],
    focus: ["AI workflows", "UX critique", "Prototyping in code"],
    context:
      "UX Sidekick explores how AI can support design critique without replacing senior judgement. The aim was to cut feedback latency and make critique specific enough to act on.",
    publicPreview: {
      problem:
        "Design feedback is slow, inconsistent and hard to act on, especially in teams without enough senior critique capacity.",
      remit:
        "Concept, interaction design, prompt design and full-stack build in React, TypeScript and Supabase Edge Functions.",
      impact:
        "A working tool that shows practical AI fluency: fast, constrained, reviewable output tied to established UX principles.",
    },
    film: {
      src: "/videos/ux-sidekick-demo.mp4",
      poster: "/images/site/sidekick-demo-poster.webp",
      title: "UX Sidekick walkthrough",
      caption:
        "A short walkthrough: upload a screen, choose the context, and get a scored critique with pinned issues and fixes.",
    },
    visuals: [
      {
        src: "/images/site/sidekick-markers.webp",
        width: 843,
        height: 562,
        title: "Pinned, specific feedback",
        caption:
          "Each issue is pinned to the element it refers to, with collision handling so markers stay readable.",
        variant: "wide",
      },
      {
        src: "/images/site/sidekick-challenge.webp",
        width: 843,
        height: 562,
        title: "Problem framing",
        caption:
          "The product brief: slow, inconsistent critique and no clear next step for the designer.",
      },
      {
        src: "/images/site/sidekick-analysis.webp",
        width: 843,
        height: 562,
        title: "Platform and API",
        caption:
          "A small platform layer with API keys and usage, so the critique engine can plug into other tools.",
      },
    ],
    story: [
      {
        title: "The problem explored",
        text: "Design feedback is often delayed, inconsistent or too vague to act on. Junior designers may know an interface has issues, but not where they are or how to fix them.",
      },
      {
        title: "My role",
        text: "I worked across product design and full-stack development: the concept, the interaction model, the prompt and response design, and the build.",
      },
      {
        title: "The design strategy",
        text: "Every piece of feedback follows the same structure: name the issue, locate it on the screen, explain the principle behind it and suggest a practical fix.",
      },
      {
        title: "What it shows",
        text: "AI accelerates design operations when its output is constrained, reviewable and tied to established principles. Prompt design is product design when the model’s output is the interface.",
      },
    ],
    leadershipDecisions: [
      "Constrained AI output around named UX principles so feedback stayed specific, reviewable and useful.",
      "Added spatial annotation because critique becomes actionable when people can see exactly where the issue is.",
      "Treated the prompt, response schema and interaction model as design decisions, not technical details.",
    ],
    challenge: [
      "Feedback quality varies by reviewer.",
      "Accessibility and usability issues are often caught too late.",
      "AI critique has to be specific enough to be trusted.",
    ],
    actions: [
      "Built a tool that analyses screenshots against usability, accessibility and visual hierarchy heuristics.",
      "Implemented a bounding-box system so markers point at exact elements, with collision avoidance.",
      "Added implementation guidance with copy-paste code, not generic comments.",
    ],
    outcomes: [
      "Returns a full critique in about 30 seconds.",
      "Finds six to eight issues on a typical screen.",
      "Includes a code-level fix for around 95% of issues.",
    ],
    lessons: [
      "Prompt design is product design when the model output is the interface.",
      "Useful AI tools need constraints, examples and a fixed output structure.",
      "The next generation of design leaders needs judgement plus AI fluency, not automation theatre.",
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
