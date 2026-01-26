const BASE_MESSAGE = `Hi, I'm **David's AI Assistant** — here to help you quickly evaluate David's fit for senior Product Design and Design Director roles.

I can answer:

- **Leadership track record** — team sizes, retention, mentoring
- **Business impact** — revenue growth, cost reduction, ROI metrics
- **Availability** — current interest in new opportunities
- **Specific expertise** — Fintech, SaaS, AI integration, design systems

What would you like to know?`;

export const createWelcomeMessage = (context?: string): {
    role: 'assistant';
    content: string;
    timestamp: number;
} => {
    let content = BASE_MESSAGE;
    if (context) {
        content += `\n\n*${context}*`;
    }
    return {
        role: 'assistant',
        content,
        timestamp: Date.now(),
    };
};
