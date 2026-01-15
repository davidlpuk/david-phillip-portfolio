declare module 'turndown' {
  interface TurndownServiceOptions {
    headingStyle?: 'atx' | 'setext';
    codeBlockStyle?: 'fenced' | 'indented';
    bulletListMarker?: '-' | '*' | '+';
    emDelimiter?: '_' | '*';
    strongDelimiter?: '__' | '**';
    linkStyle?: 'inlined' | 'referenced';
    linkReferenceStyle?: 'full' | 'collapsed' | 'shortcut';
  }

  interface TurndownRule {
    filter: string | ((node: HTMLElement) => boolean);
    replacement?: ((content: string, node: HTMLElement) => string) | undefined;
  }

  class TurndownService {
    constructor(options?: TurndownServiceOptions);
    addRule(name: string, rule: TurndownRule): void;
    removeRule(filter: string): void;
    turndown(html: string): string;
    keep(filter: string | ((node: HTMLElement) => boolean)): void;
    remove(filter: string | ((node: HTMLElement) => boolean)): void;
  }

  export = TurndownService;
}
