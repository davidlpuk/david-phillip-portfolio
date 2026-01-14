import React from 'react';

interface TestimonialCardProps {
    quote: string;
    name: string;
    title: string;
    avatarSrc?: string;
    className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
    quote,
    name,
    title,
    avatarSrc,
    className = '',
}) => {
    return (
        <div className={`p-6 bg-surface-light dark:bg-surface-dark rounded-2xl border border-gray-200 dark:border-neutral-800 ${className}`}>
            <p className="italic text-sm mb-6 leading-relaxed">{quote}</p>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                    {avatarSrc && <img alt="User Avatar" className="w-full h-full object-cover" src={avatarSrc} />}
                </div>
                <div>
                    <p className="text-xs font-bold">{name}</p>
                    <p className="text-[10px] text-gray-500">{title}</p>
                </div>
            </div>
        </div>
    );
};