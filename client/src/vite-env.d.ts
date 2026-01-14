/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_FRONTEND_FORGE_API_KEY: string;
    readonly VITE_FRONTEND_FORGE_API_URL: string;
    readonly VITE_OAUTH_PORTAL_URL: string;
    readonly VITE_APP_ID: string;
    readonly VITE_ANALYTICS_ENDPOINT: string;
    readonly VITE_ANALYTICS_WEBSITE_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

// React types
declare module "react" {
    export type ReactNode = React.ReactNode;
    export type ComponentProps<P = {}> = React.ComponentProps<P>;

    export abstract class Component<P = {}, S = {}, SS = unknown> {
        props: P;
        state: S;
        constructor(props: P);
        setState<K extends keyof S>(state: S | ((prevState: S) => S | Pick<S, K>)): void;
        forceUpdate(callback?: () => void): void;
        render(): ReactNode;
    }

    export function useRef<T>(initialValue: T): React.MutableRefObject<T>;
    export function useEffect(effect: React.EffectCallback, deps?: React.DependencyList): void;
    export function useState<S>(initialState: S | (() => S)): [S, React.Dispatch<React.SetStateAction<S>>];
    export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: React.DependencyList): T;
    export function useMemo<T>(factory: () => T, deps: React.DependencyList): T;
    export function createContext<T>(defaultValue: T): React.Context<T>;
    export function useContext<T>(context: React.Context<T>): T;
    export function createRoot(container: HTMLElement): { render(node: ReactNode): void };
    export const createElement: typeof React.createElement;
    export default React;
}

// JSX namespace
declare namespace JSX {
    interface IntrinsicElements {
        [elem: string]: any;
    }
}

// Google Maps
interface Window {
    google: any;
}
