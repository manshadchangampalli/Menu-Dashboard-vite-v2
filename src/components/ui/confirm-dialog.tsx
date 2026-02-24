import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import type { ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";

interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    footerButtons?: ReactNode;
    variant?: VariantProps<typeof buttonVariants>["variant"];
    isLoading?: boolean;
}

export const ConfirmDialog = ({
    open,
    onOpenChange,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    footerButtons,
    variant = "default",
    isLoading = false
}: ConfirmDialogProps) => {

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
        onOpenChange(false);
    };

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
        // Don't close immediately if loading is handled externally
        if (!isLoading) {
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>
                
                <DialogFooter>
                    {footerButtons ? (
                        footerButtons
                    ) : (
                        <>
                            <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
                                {cancelText}
                            </Button>
                            <Button variant={variant} onClick={handleConfirm} disabled={isLoading}>
                                {isLoading ? "Processing..." : confirmText}
                            </Button>
                        </>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
