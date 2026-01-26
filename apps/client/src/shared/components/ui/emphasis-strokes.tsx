import React from 'react';

interface EmphasisStrokesProps {
    className?: string;
}

export const EmphasisStrokes: React.FC<EmphasisStrokesProps> = ({ className = '' }) => {
    return (
        <div className={`relative py-2 ${className}`}>
            <div className="w-48 h-4 bg-primary rounded-full opacity-60 -rotate-2"></div>
            <div className="w-40 h-3 bg-primary rounded-full opacity-40 mt-1 rotate-1"></div>
        </div>
    );
};