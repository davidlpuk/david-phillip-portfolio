import React from 'react';

interface EnergySparklesProps {
    className?: string;
}

export const EnergySparkles: React.FC<EnergySparklesProps> = ({ className = '' }) => {
    return (
        <div className={`relative w-24 h-24 ${className}`}>
            <svg className="w-full h-full fill-primary animate-pulse" viewBox="0 0 100 100">
                <path d="M50 5 L55 45 L95 50 L55 55 L50 95 L45 55 L5 50 L45 45 Z"></path>
            </svg>
            <svg className="absolute -top-4 -right-4 w-12 h-12 fill-lavender" viewBox="0 0 100 100">
                <path d="M50 5 L55 45 L95 50 L55 55 L50 95 L45 55 L5 50 L45 45 Z"></path>
            </svg>
        </div>
    );
};