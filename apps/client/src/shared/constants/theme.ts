import { ThemePreset } from "@/shared/contexts/ThemeContext";

export const THEME_PRESETS: readonly {
    id: ThemePreset;
    label: string;
    description: string;
}[] = [
    {
        id: "institutional-elegance",
        label: "Institutional Elegance",
        description: "Classic professional with Montserrat typography",
    },
    {
        id: "modern-tech",
        label: "Modern Tech",
        description: "Vibrant purple palette with contemporary styling",
    },
    {
        id: "warm-minimal",
        label: "Warm Minimal",
        description: "Earthy amber tones with minimalist approach",
    },
    {
        id: "fresh-modern",
        label: "Fresh Modern",
        description: "Clean teal and mint palette with contemporary design",
    },
    {
        id: "theme-x",
        label: "Theme X",
        description: "Bold design system with electric lime and lavender accents",
    },
] as const;
