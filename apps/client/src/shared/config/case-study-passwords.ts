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

export function getCaseStudyPassword(_slug: string): string {
    return GLOBAL_PASSWORD;
}
