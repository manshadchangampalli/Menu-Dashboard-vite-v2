import React, { useRef, useEffect } from "react";
import { cn } from "../../lib/utils";

interface SidePanelProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string | React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
}

const SidePanel = ({ open, onClose, children, title, footer, className }: SidePanelProps) => {
    const panelRef = useRef<HTMLDivElement>(null);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (open) window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [open, onClose]);

    // Close on click outside (backdrop)
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-100 flex justify-end transition-opacity duration-300 animate-in fade-in"
            onClick={handleBackdropClick}
        >
            <div
                ref={panelRef}
                className={cn(
                    "w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300",
                    className
                )}
            >
                {/* Header */}
                {(title) && (
                    <div className="px-6 py-5 border-b border-app-border flex items-center justify-between bg-white">
                        {typeof title === 'string' ? (
                            <h2 className="text-lg font-bold text-app-text">{title}</h2>
                        ) : (
                            title
                        )}
                    </div>
                )}

                {/* Body */}
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="p-6 border-t border-app-border bg-white mt-auto">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SidePanel;
