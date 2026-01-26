export interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}

export const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:3001/api');

export interface SuggestedQuestion {
    icon: string;
    text: string;
}

export const suggestedQuestions: SuggestedQuestion[] = [
    { icon: "👔", text: "Leadership experience" },
    { icon: "📈", text: "Biggest business impact" },
    { icon: "🎯", text: "Open to opportunities?" },
];
