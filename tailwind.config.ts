import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./client/index.html",
    "./client/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ["var(--font-display)", "sans-serif"],
      sans: ["var(--font-body)", "sans-serif"],
      mono: ["var(--font-mono)", "sans-serif"],
    },
    extend: {
      colors: {
        // Semantic color tokens from design-tokens.css
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--primary)",
        "primary-dark": "var(--primary-dark)",
        "primary-darker": "var(--primary-darker)",
        "primary-darkest": "var(--primary-darkest)",
        "primary-foreground": "var(--primary-foreground)",
        lavender: "#D6C6F2",
        "background-light": "#FFFFFF",
        "background-dark": "#0A0A0A",
        "surface-light": "#F8F8F8",
        "surface-dark": "#161616",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        // Chart colors
        "chart-1": "var(--chart-1)",
        "chart-2": "var(--chart-2)",
        "chart-3": "var(--chart-3)",
        "chart-4": "var(--chart-4)",
        "chart-5": "var(--chart-5)",
        // Sidebar colors
        sidebar: "var(--sidebar)",
        "sidebar-foreground": "var(--sidebar-foreground)",
        "sidebar-primary": "var(--sidebar-primary)",
        "sidebar-primary-foreground": "var(--sidebar-primary-foreground)",
        "sidebar-accent": "var(--sidebar-accent)",
        "sidebar-accent-foreground": "var(--sidebar-accent-foreground)",
        "sidebar-border": "var(--sidebar-border)",
        "sidebar-ring": "var(--sidebar-ring)",
      },
      textColor: {
        // Semantic text color tokens
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        tertiary: "var(--text-tertiary)",
        quaternary: "var(--text-quaternary)",
        "inverse-primary": "var(--text-inverse-primary)",
        "inverse-secondary": "var(--text-inverse-secondary)",
        "inverse-tertiary": "var(--text-inverse-tertiary)",
        "inverse-quaternary": "var(--text-inverse-quaternary)",
        accent: "var(--text-accent)",
        "accent-hover": "var(--text-accent-hover)",
        link: "var(--text-link)",
        "link-hover": "var(--text-link-hover)",
        "link-visited": "var(--text-link-visited)",
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      spacing: {
        // Semantic spacing tokens
        "section-sm": "var(--space-section-sm)",
        "section-md": "var(--space-section-md)",
        "section-lg": "var(--space-section-lg)",
        "section-xl": "var(--space-section-xl)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        base: "var(--duration-base)",
        normal: "var(--duration-normal)",
        slow: "var(--duration-slow)",
      },
      transitionTimingFunction: {
        elegant: "var(--ease-elegant)",
        snappy: "var(--ease-snappy)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        elevated: "var(--shadow-elevated)",
        floating: "var(--shadow-floating)",
      },
      animation: {
        "fade-in": "fadeIn var(--duration-slow) var(--ease-out) forwards",
        "fade-in-up": "fadeInUp var(--duration-slow) var(--ease-out) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      fontSize: {
        // Fluid typography tokens
        'fluid-xs': 'var(--font-size-fluid-xs)',
        'fluid-sm': 'var(--font-size-fluid-sm)',
        'fluid-base': 'var(--font-size-fluid-base)',
        'fluid-lg': 'var(--font-size-fluid-lg)',
        'fluid-xl': 'var(--font-size-fluid-xl)',
        'fluid-2xl': 'var(--font-size-fluid-2xl)',
        'fluid-3xl': 'var(--font-size-fluid-3xl)',
        'fluid-4xl': 'var(--font-size-fluid-4xl)',
        'fluid-5xl': 'var(--font-size-fluid-5xl)',
        'fluid-6xl': 'var(--font-size-fluid-6xl)',
        // Heading typography tokens - override standard sizes
        '8xl': 'var(--font-size-h1)',
        '7xl': 'var(--font-size-h2)',
        '6xl': 'var(--font-size-h3)',
        '5xl': 'var(--font-size-h4)',
        '4xl': 'var(--font-size-h5)',
        '3xl': 'var(--font-size-h6)',
      },
      lineHeight: {
        // Heading line heights - override standard sizes
        '8xl': 'var(--line-height-h1)',
        '7xl': 'var(--line-height-h2)',
        '6xl': 'var(--line-height-h3)',
        '5xl': 'var(--line-height-h4)',
        '4xl': 'var(--line-height-h5)',
        '3xl': 'var(--line-height-h6)',
      },
    },
  },
  plugins: [],
};

export default config;
