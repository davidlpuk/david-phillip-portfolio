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
// Note: Passwords are stored in plain text for client-side demo
// In production, use server-side validation with hashed passwords
export const caseStudyPasswords: Record<string, string> = {
    // Example: coutts: "coutts2024",
    cognism: "cognism2024",
    coutts: "coutts2024",
    hsbc: "hsbc2024",
    schroders: "schroders2024",
    "hsbc-kinetic": "kinetic2024",
};

// List of protected case study slugs
export const protectedCaseStudies: string[] = [
    // Add slugs of case studies that require passwords
    "cognism",
    "coutts",
    "hsbc",
    "schroders",
    "hsbc-kinetic",
];

export function isCaseStudyProtected(slug: string): boolean {
    return protectedCaseStudies.includes(slug);
}

export function getCaseStudyPassword(slug: string): string {
    return caseStudyPasswords[slug] || "";
}
