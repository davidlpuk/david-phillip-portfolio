import React, { useState } from 'react';
import { A2UIChatBot } from './A2UIChatBot';
import { X } from 'lucide-react';

export const FloatingChat: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => setIsOpen(prev => !prev);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            {/* Chat Window */}
            {isOpen && (
                <div className="w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[80vh] shadow-2xl rounded-3xl overflow-hidden fade-in-up animation-duration-300">
                    <A2UIChatBot onClose={() => setIsOpen(false)} isPanel={true} />
                </div>
            )}

            {/* Floating Trigger Button */}
            <button
                onClick={toggleChat}
                className={`group relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${isOpen ? 'bg-background text-foreground' : 'bg-primary text-primary-foreground'}`}
                aria-label={isOpen ? "Close Chat" : "Open Chat"}
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <div className="relative w-full h-full p-2">
                        <img
                            src="/images/finn-avatar.png"
                            alt="Finn"
                            className="w-full h-full object-cover rounded-full"
                        />
                        {/* Pulse effect when closed to draw attention */}
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                    </div>
                )}
            </button>
        </div>
    );
};
