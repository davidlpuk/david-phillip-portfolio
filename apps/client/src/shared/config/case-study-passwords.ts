/**
 * Password Protection Configuration
 * 
 * Add passwords for case studies you want to protect.
 * Leave empty string "" for public (unprotected) case studies.
 */

export interface PasswordConfig {
    slug: string;
    isProtected: boolean;
    password: string;
}

// Add case studies and their passwords here
export const caseStudyPasswords: Record<string, string> = {
    cognism: "cognism2024",
    coutts: "coutts2024",
    hsbc: "hsbc2024",
    "hsbc-kinetic": "kinetic2024",
};

// Global password for all protected case studies
export const GLOBAL_PASSWORD = "david2026ux";

// List of protected case study slugs
export const protectedCaseStudies: string[] = [
    "cognism",
    "coutts",
    "hsbc",
    "hsbc-kinetic",
];

export function isCaseStudyProtected(slug: string): boolean {
    return protectedCaseStudies.includes(slug);
}

export function getCaseStudyPassword(slug: string): string {
    return caseStudyPasswords[slug] || "";
}
