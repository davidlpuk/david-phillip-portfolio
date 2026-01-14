import React from 'react';

interface SparkleProps {
    className?: string;
}

export const Sparkle: React.FC<SparkleProps> = ({ className }) => {
    return (
        <svg className={className} viewBox="0 0 100 100">
            <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z"></path>
        </svg>
    );
};