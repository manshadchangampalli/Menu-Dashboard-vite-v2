import React from "react";
import { cn } from "../../lib/utils";
import type { LucideIcon } from "lucide-react";

interface FormSectionProps {
    title: string;
    icon: LucideIcon;
    children: React.ReactNode;
    className?: string;
    gridClassName?: string;
}

const FormSection = ({
    title,
    icon: Icon,
    children,
    className,
    gridClassName,
}: FormSectionProps) => {
    return (
        <section className={cn("grid gap-4", className)}>
            <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-app-accent">
                    <Icon className="w-4 h-4 text-app-text" />
                </div>
                <h3 className="text-sm font-bold text-app-text uppercase tracking-wider">
                    {title}
                </h3>
            </div>
            <div className={cn("grid gap-4", gridClassName)}>
                {children}
            </div>
        </section>
    );
};

export { FormSection };
