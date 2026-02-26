import React, { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

interface CustomMediaUploadProps {
    value?: string;
    onChange: (url: string) => void;
    onBlur?: () => void;
    label?: string;
    error?: string;
    placeholder?: string;
    disabled?: boolean;
    accept?: string;
}

export const CustomMediaUpload = ({
    value,
    onChange,
    label,
    error,
    placeholder = "Upload or drag media",
    disabled,
    accept = "image/*,video/*",
}: CustomMediaUploadProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            await uploadFile(file);
        }
    };

    const uploadFile = async (file: File) => {
        setIsUploading(true);
        // Mock upload logic - in a real app, this would call httpService.upload
        // and return the URL from the server.
        try {
            // Simulating upload delay
            await new Promise((resolve) => setTimeout(resolve, 1500));
            
            // For now, we'll use a local object URL to show it works in the UI
            const mockUrl = URL.createObjectURL(file);
            onChange(mockUrl);
        } catch (err) {
            console.error("Upload failed", err);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (disabled) return;

        const file = e.dataTransfer.files?.[0];
        if (file) {
            await uploadFile(file);
        }
    };

    const removeMedia = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className="text-xs font-semibold text-app-muted uppercase tracking-wide">
                    {label}
                </label>
            )}

            <div
                className={cn(
                    "relative min-h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-4 transition-all overflow-hidden",
                    isDragging ? "border-app-text bg-app-accent/30" : "border-app-border bg-white hover:border-app-text/50",
                    error ? "border-red-400 bg-red-50/50" : "",
                    disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    accept={accept}
                    disabled={disabled || isUploading}
                />

                {isUploading ? (
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 className="w-8 h-8 text-app-text animate-spin" />
                        <p className="text-xs font-semibold text-app-muted">Uploading...</p>
                    </div>
                ) : value ? (
                    <div className="relative w-full h-full flex items-center justify-center group">
                        {value.match(/\.(mp4|webm|ogg)$/) || value.startsWith('blob:') && fileInputRef.current?.files?.[0]?.type.startsWith('video') ? (
                            <video src={value} className="max-h-24 rounded object-contain" />
                        ) : (
                            <img src={value} alt="Media preview" className="max-h-24 rounded object-contain" />
                        )}
                        <button
                            type="button"
                            onClick={removeMedia}
                            className="absolute -top-2 -right-2 size-6 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-600"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center gap-1">
                             <p className="text-[10px] font-bold text-white bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">Click to change</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2 text-center">
                        <div className="p-2 rounded-full bg-app-accent">
                            <Upload className="w-5 h-5 text-app-text" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-app-text">{placeholder}</p>
                            <p className="text-[10px] text-app-muted mt-0.5">MP4, WebM, PNG, JPG up to 10MB</p>
                        </div>
                    </div>
                )}
            </div>

            {error && <p className="text-[10px] font-medium text-red-500">{error}</p>}
        </div>
    );
};
