/**
 * Password Verification Utilities
 * 
 * Security Notes:
 * - In production, use bcrypt or argon2 for password hashing
 * - Store password hashes in environment variables, not in code
 */

import { isCaseStudyProtected, getCaseStudyPassword, GLOBAL_PASSWORD } from "../config/case-study-passwords";

/**
 * Verify password for a case study
 */
export function verifyPassword(slug: string, password: string): boolean {
    if (!isCaseStudyProtected(slug)) {
        return true;
    }

    const specificPassword = getCaseStudyPassword(slug);

    // Allow access if it matches either the specific password or the global master password
    return password === specificPassword || password === GLOBAL_PASSWORD;
}

/**
 * Check if user has access to a case study
 */
export function hasAccess(_slug: string): boolean {
    const unlocked = sessionStorage.getItem(`portfolio-unlocked`);
    return unlocked === "true";
}

/**
 * Clear access for a case study
 */
export function clearAccess(slug: string): void {
    sessionStorage.removeItem(`case-study-${slug}-unlocked`);
}
