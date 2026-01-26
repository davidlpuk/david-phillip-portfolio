import React from 'react';
import { cn } from '@/lib/utils';

interface HighlighterStrokeProps {
    children: React.ReactNode;
    className?: string;
}

export const HighlighterStroke: React.FC<HighlighterStrokeProps> = ({
    children,
    className,
}) => {
    return (
        <span className={cn('highlighter-stroke', className)}>
            {children}
        </span>
    );
};