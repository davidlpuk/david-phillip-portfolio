import React from 'react';

interface OrganicDividersProps {
    className?: string;
}

export const OrganicDividers: React.FC<OrganicDividersProps> = ({ className = '' }) => {
    return (
        <svg
            className={`stroke-primary ${className}`}
            fill="none"
            height="40"
            strokeLinecap="round"
            strokeWidth="4"
            viewBox="0 0 120 40"
            width="120"
        >
            <path d="M5 30C20 30 25 10 40 10C55 10 60 30 75 30C90 30 95 10 115 10" />
        </svg>
    );
};