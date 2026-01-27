
export interface A2UIComponent {
    type: 'text' | 'button' | 'box' | 'image' | 'stack' | 'input' | 'form' | 'link' | 'carousel' | 'card';
    props?: Record<string, any>;
    children?: A2UIComponent[];
}

export interface A2UIMessage {
    role: 'user' | 'assistant';
    content: string | A2UIComponent;
    timestamp: number;
}
