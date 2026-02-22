import React, { forwardRef } from "react";
import { Input } from "./input";
import { cn } from "../../lib/utils";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    containerClassName?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
    ({ label, error, containerClassName, className, ...props }, ref) => {
        return (
            <div className={cn("flex flex-col gap-1", containerClassName)}>
                <label className="text-xs font-bold text-app-muted uppercase">
                    {label}
                </label>
                <Input
                    ref={ref}
                    className={cn(
                        "w-full h-10 border-app-border bg-white text-sm font-medium focus-visible:ring-1 focus-visible:ring-app-text",
                        error ? "border-red-500 focus-visible:ring-red-500" : "",
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="text-[10px] text-red-500 font-bold mt-1">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

CustomInput.displayName = "CustomInput";

export { CustomInput };
