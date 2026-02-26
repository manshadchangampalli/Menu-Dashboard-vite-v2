import { Accordion as AccordionPrimitive } from "radix-ui";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";
import type { LucideIcon } from "lucide-react";

const Accordion = AccordionPrimitive.Root;
const AccordionItem = AccordionPrimitive.Item;

const AccordionTrigger = ({
    className,
    children,
    ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>) => (
    <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
            className={cn(
                "flex flex-1 items-center justify-between py-3 px-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180",
                className
            )}
            {...props}
        >
            {children}
            <ChevronDown className="h-4 w-4 shrink-0 text-app-muted transition-transform duration-200" />
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
);

const AccordionContent = ({
    className,
    children,
    ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>) => (
    <AccordionPrimitive.Content
        className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        {...props}
    >
        <div className={cn("px-4 pb-5 pt-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
);

// Styled numbered step used in multi-step forms
interface AccordionStepProps {
    value: string;
    icon: LucideIcon;
    title: string;
    description?: string;
    stepNumber: number;
    children: React.ReactNode;
}

const AccordionStep = ({
    value,
    icon: Icon,
    title,
    description,
    stepNumber,
    children,
}: AccordionStepProps) => (
    <AccordionItem
        value={value}
        className="border border-app-border rounded-lg overflow-hidden bg-white"
    >
        <AccordionTrigger className="hover:bg-app-accent/40 transition-colors data-[state=open]:border-b data-[state=open]:border-app-border">
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-7 rounded-full bg-app-text text-white text-xs font-bold shrink-0">
                    {stepNumber}
                </div>
                <div className="p-1.5 rounded-md bg-app-accent">
                    <Icon className="w-4 h-4 text-app-text" />
                </div>
                <div className="text-left">
                    <p className="text-sm font-bold text-app-text">{title}</p>
                    {description && (
                        <p className="text-xs text-app-muted font-normal">{description}</p>
                    )}
                </div>
            </div>
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
);

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent, AccordionStep };
