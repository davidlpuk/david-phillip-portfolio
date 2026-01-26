export interface LinkedInArticle {
    id: string;
    title: string;
    excerpt: string;
    url: string;
    thumbnail: string;
    readTime: number;
    date: string;
    category: string;
}

export const linkedInArticles: LinkedInArticle[] = [
    {
        id: "designer-revolt",
        title: "The Designer Revolt: Why Your Design Handoff Process Just Became Obsolete",
        excerpt: "I watched a designer build a fully functional calculator app in 20 minutes last week. No engineer involved. No handoff documentation. No red-lined spe",
        url: "https://www.linkedin.com/pulse/designer-revolt-why-your-design-handoff-process-just-became-phillip-8oqhe",
        thumbnail: "https://media.licdn.com/dms/image/v2/D4E12AQEz2jd5WDUqiw/article-cover_image-shrink_600_2000/B4EZvr03h_GQAQ-/0/1769188066372?e=1770854400&v=beta&t=5t8OE78ZuDCO-5nKpNSSLWW_h8rIlJmevRmsyXcmJVg",
        readTime: 9,
        date: "2024-05-15",
        category: "Design Process"
    },
    {
        id: "vibe-coding-question",
        title: "The Vibe Coding Question: What Happens When Everyone Can Prototype?",
        excerpt: "Why non-designers building interfaces isn't a threat—it's a shift in where design value gets created A product manager I spoke with recently mentioned",
        url: "https://www.linkedin.com/pulse/vibe-coding-question-what-happens-when-everyone-can-david-phillip-0dfke",
        thumbnail: "https://media.licdn.com/dms/image/v2/D4E12AQH8Eu-DPlsh0g/article-cover_image-shrink_600_2000/B4EZuiWihtMIAU-/0/1767955381454?e=1770854400&v=beta&t=7NkqXTFEKpfqa5xfg_HN3I6ET9OqMBem5x2q9eU4DgQ",
        readTime: 6,
        date: "2024-04-20",
        category: "AI & Prototyping"
    },
    {
        id: "ai-product-design",
        title: "AI in Product Design: Separating Genuine Capability from Industry Noise",
        excerpt: "Every product designer I know has been asked the same question this year: \"Can't AI just do that now?\" Sometimes the answer is yes. More often, it's a",
        url: "https://www.linkedin.com/pulse/ai-product-design-separating-genuine-capability-from-industry-david-nh98e",
        thumbnail: "https://media.licdn.com/dms/image/v2/D4E12AQHq7pMVkBqzDA/article-cover_image-shrink_600_2000/B4EZtvFnauJQAQ-/0/1767095303880?e=1770854400&v=beta&t=ksEN_ERukKRE2ngSa8rmHvj2d4Q0S0lbEIkx_jxUFfQ",
        readTime: 6,
        date: "2024-03-10",
        category: "AI Strategy"
    },
    {
        id: "first-step-learning",
        title: "The first step is learning to see",
        excerpt: "There's a lie we've been telling ourselves about design. It goes like this: great designers have vision. They see what users need before users know th",
        url: "https://www.linkedin.com/pulse/first-step-learning-see-david-phillip-ctnae",
        thumbnail: "https://media.licdn.com/dms/image/v2/D4E12AQHQVAJ9I9mV9Q/article-cover_image-shrink_600_2000/B4EZtQV_gxKMAQ-/0/1766579506376?e=1770854400&v=beta&t=Cjwz7P3vGhd7J9NF5WbPj_Bo3y_B2jtkvYp7evu8YPk",
        readTime: 5,
        date: "2024-02-15",
        category: "Design Philosophy"
    },
    {
        id: "augmenting-ai-2026",
        title: "Augmenting AI in Your Product Design Process in 2026",
        excerpt: "LinkedIn just killed its Associate Product Manager program. In its place, the company's CPO Tomer Cohen has introduced something called the \"Full Stac",
        url: "https://www.linkedin.com/pulse/augmenting-ai-your-product-design-process-2026-david-phillip-chtxe",
        thumbnail: "https://media.licdn.com/dms/image/v2/D4E12AQHOWVNe_Imgvg/article-cover_image-shrink_600_2000/B4EZtP23HhIMAQ-/0/1766571348798?e=1770854400&v=beta&t=hoS9jIonVpbYnbaAsFcJegqsyz3FnOe7eVK7TkGrs5k",
        readTime: 5,
        date: "2024-01-25",
        category: "AI & Careers"
    },
    {
        id: "pixel-perfect-hurting",
        title: "Why Chasing 'Pixel Perfect' Code is Hurting Your Product",
        excerpt: "For years, the gold standard in building digital products was simple: \"pixel perfect\". We wanted the live product to match the static design image pre",
        url: "https://www.linkedin.com/pulse/why-chasing-pixel-perfect-code-hurting-your-product-david-phillip-hqzne",
        thumbnail: "https://media.licdn.com/dms/image/v2/D4E12AQHfX3dYyOS9rg/article-cover_image-shrink_600_2000/B4EZrA.TagIoAU-/0/1764174153914?e=1770854400&v=beta&t=lzxi8EnJSsSZ7PPxyOUNx-dUD4e_VgqBl-M4XOrRBDc",
        readTime: 3,
        date: "2023-12-05",
        category: "Development"
    },
    {
        id: "static-mocks-lie",
        title: "💥 Static Mocks Lie. Code Doesn't.",
        excerpt: "The era of the \"pixel-perfect\" handoff is over. Welcome to the age of Vibe Coding. The traditional product development process often follows this pain",
        url: "https://www.linkedin.com/pulse/static-mocks-lie-code-doesnt-david-phillip-izsde",
        thumbnail: "https://media.licdn.com/dms/image/v2/D4E12AQH4xxc0X34XiA/article-cover_image-shrink_600_2000/B4EZrAyp3DIoAU-/0/1764171100267?e=1770854400&v=beta&t=MeAqklW3PKOVqkW6QKjLqqTwj4HmNZn3gG4Yc4ZJHKU",
        readTime: 3,
        date: "2023-11-20",
        category: "Vibe Coding"
    },
    {
        id: "automating-boring-bits",
        title: "Why Smart Designers Are Automating the Boring Bits",
        excerpt: "Research shows AI can increase design team efficiency by up to 40%. Here\u2019s what\u2019s actually working\u2014and what isn\u2019t. The design industry is experiencing",
        url: "https://www.linkedin.com/pulse/why-smart-designers-automating-boring-bits-david-phillip-6h29e",
        thumbnail: "https://media.licdn.com/dms/image/v2/D4E12AQHyW94T9w3QZg/article-cover_image-shrink_600_2000/B4EZrAQRa0JgAY-/0/1764162087268?e=1770854400&v=beta&t=w7Ow3rXDLKpDTSpHETJa9G-oRS5T0ixhAo3d9EXJPF0",
        readTime: 10,
        date: "2023-10-15",
        category: "Automation"
    },
    {
        id: "designer-to-shipper",
        title: "The Shift From Designer to Shipper: Why AI Changes Everything",
        excerpt: "The conversation about whether designers should learn to code is over. Here's what's replacing it. The conversation about whether designers should lea",
        url: "https://www.linkedin.com/pulse/shift-from-designer-shipper-why-ai-changes-everything-david-phillip-fmpje",
        thumbnail: "https://media.licdn.com/dms/image/v2/D4E12AQHCl-QmFtu60Q/article-cover_image-shrink_600_2000/B4EZq7hFg9JgAQ-/0/1764082609694?e=1770854400&v=beta&t=LIvJRc5XRioQwgS2DGMv8_pd_BW-6WrCLavKOVgTqBc",
        readTime: 6,
        date: "2023-09-01",
        category: "AI & Product"
    },
    {
        id: "ai-hype-vs-reality",
        title: "The AI Hype vs. Reality: Why Designers Are Frustrated and What's Next",
        excerpt: "Across industries—from defense and aerospace to finance and big tech—leadership's message is consistent: embrace AI to streamline workflows, boost eff",
        url: "https://www.linkedin.com/pulse/ai-hype-vs-reality-why-designers-frustrated-whats-next-david-phillip-xceje",
        thumbnail: "https://media.licdn.com/dms/image/v2/D4E12AQGFx9ub0qIsxA/article-cover_image-shrink_600_2000/B4EZgx55zrHoAU-/0/1753183922750?e=1770854400&v=beta&t=iuaNz1tu0IcGBReHIoVC5_81LSs-R-NAkdT9kpl3Mj4",
        readTime: 5,
        date: "2023-08-10",
        category: "AI Strategy"
    },
    {
        id: "rising-above-noise",
        title: "Rising Above the Noise: Why UX Leadership Matters More Than Ever in the AI Era",
        excerpt: "The conversation around AI's impact on UX has been dominated by fear, uncertainty, and frankly, a lot of noise from people who don't truly understand",
        url: "https://www.linkedin.com/pulse/rising-above-noise-why-ux-leadership-matters-more-than-david-phillip-vy9oe",
        thumbnail: "https://media.licdn.com/dms/image/v2/D4E12AQGaeLT9GwfBmw/article-cover_image-shrink_600_2000/B4EZgx1PR7GoAU-/0/1753182700273?e=1770854400&v=beta&t=8KwYCO4v5EVEc3wmbC1h5cmwFYI2AH_VU3cofZDg3BM",
        readTime: 5,
        date: "2023-07-25",
        category: "UX Leadership"
    },
    {
        id: "crafting-ux-portfolio",
        title: "Crafting a Portfolio as a UX Director: Why It Still Matters and How to Get It Right",
        excerpt: "A few weeks ago, I was catching up with a fellow UX director over a virtual coffee when she dropped a bombshell: \"I'm applying for a head of product d",
        url: "https://www.linkedin.com/pulse/crafting-portfolio-ux-director-why-still-matters-how-get-phillip-kvybe",
        thumbnail: "https://media.licdn.com/dms/image/v2/D4E12AQHQNWY39Ohu9A/article-cover_image-shrink_600_2000/B4EZawNMDDGcAQ-/0/1746712971304?e=1770854400&v=beta&t=Kk6ZDgz1pfYc6cknCI5OCmbQuU6P7cuD--BH2lfl4Uc",
        readTime: 7,
        date: "2023-06-15",
        category: "Career Growth"
    },
    {
        id: "beyond-pixels-differentiation",
        title: "Beyond Pixels: How Design Becomes the Strategic Differentiator in an AI-Powered World",
        excerpt: "Artificial intelligence can churn out functional ideas and interfaces in a few seconds - just take a look at what Figma have launched recently with 'F",
        url: "https://www.linkedin.com/pulse/beyond-pixels-how-design-becomes-strategic-david-phillip-lnque",
        thumbnail: "https://media.licdn.com/dms/image/v2/D4E12AQE__c02roCTZA/article-cover_image-shrink_600_2000/B4EZav3rK8HMAQ-/0/1746707331860?e=1770854400&v=beta&t=zEl-1xhVUudvNePNVl-lLJxoQZYstqtAmpYH_-xrC2A",
        readTime: 6,
        date: "2023-05-30",
        category: "Design Strategy"
    },
    {
        id: "bridging-gap-research",
        title: "Bridging the Gap: Why Design Research Matters More Than Ever",
        excerpt: "Great products don\u2019t just happen\u2014they\u2019re built on a deep understanding of what people actually need. Without rigorous design research, teams lean on a",
        url: "https://www.linkedin.com/pulse/bridging-gap-why-design-research-matters-more-than-ever-david-phillip-ywdte",
        thumbnail: "https://media.licdn.com/dms/image/v2/D4E12AQEOM8Z79sprQg/article-cover_image-shrink_600_2000/B4EZWE._fWH0AU-/0/1741692866355?e=1770854400&v=beta&t=p2hKhu919HZpcqFB0gnj9PBHwEms-PNDv9oyZDR6OSE",
        readTime: 2,
        date: "2023-04-10",
        category: "Research"
    },
    {
        id: "ethical-maze-ai",
        title: "Navigating the Ethical Maze of AI-Driven Interfaces in UX Design",
        excerpt: "AI-driven interfaces are redefining how users engage with technology, delivering unrivalled personalisation and efficiency. Yet, this leap forward isn",
        url: "https://www.linkedin.com/pulse/navigating-ethical-maze-ai-driven-interfaces-ux-design-david-phillip-xjide",
        thumbnail: "https://media.licdn.com/dms/image/v2/D4E12AQHORuCuO7KtUA/article-cover_image-shrink_600_2000/B4EZWE_uXuGwAY-/0/1741693059785?e=1770854400&v=beta&t=RTJUPRZasfdtoepDIXDp0GT42nhjRXHNymisipge7ao",
        readTime: 4,
        date: "2023-03-20",
        category: "Ethics & AI"
    }
];
