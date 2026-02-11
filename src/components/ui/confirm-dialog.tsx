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
    variant = "default"
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
        onOpenChange(false);
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
                            <Button variant="outline" onClick={handleCancel}>
                                {cancelText}
                            </Button>
                            <Button variant={variant} onClick={handleConfirm}>
                                {confirmText}
                            </Button>
                        </>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
