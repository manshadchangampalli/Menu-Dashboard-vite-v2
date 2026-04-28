import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteImage, uploadImage, type UploadFolder } from "../../services/upload.api";

interface ImageUploaderProps {
    label?: string;
    folder: UploadFolder;
    value?: string;
    publicId?: string;
    onChange: (next: { url: string; public_id: string } | null) => void;
    error?: string;
    /** Maximum size in MB. Default 5. Backend caps at 5 too. */
    maxSizeMB?: number;
}

const ACCEPT = "image/jpeg,image/png,image/webp,image/avif,image/gif";

export const ImageUploader = ({
    label = "Image",
    folder,
    value,
    publicId,
    onChange,
    error,
    maxSizeMB = 5,
}: ImageUploaderProps) => {
    const [isUploading, setIsUploading] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const openPicker = () => inputRef.current?.click();

    const handleFile = async (file: File) => {
        if (file.size > maxSizeMB * 1024 * 1024) {
            toast.error(`Image must be under ${maxSizeMB} MB`);
            return;
        }
        setIsUploading(true);
        try {
            const res = await uploadImage(file, folder);
            const uploaded = res?.data;
            if (!uploaded?.url || !uploaded?.public_id) {
                throw new Error("Upload returned no URL");
            }
            // If we already had an asset, remove it (don't block on failure)
            if (publicId) {
                deleteImage(publicId).catch(() => undefined);
            }
            onChange({ url: uploaded.url, public_id: uploaded.public_id });
        } catch (err) {
            const message =
                err && typeof err === "object" && "message" in err
                    ? String((err as { message?: unknown }).message)
                    : "Upload failed";
            toast.error(message);
        } finally {
            setIsUploading(false);
            if (inputRef.current) inputRef.current.value = "";
        }
    };

    const handleRemove = async () => {
        if (!publicId) {
            onChange(null);
            return;
        }
        setIsRemoving(true);
        try {
            await deleteImage(publicId);
        } catch {
            // best-effort: still clear locally so the user isn't stuck
        } finally {
            setIsRemoving(false);
            onChange(null);
        }
    };

    return (
        <div className="space-y-1.5">
            {label && (
                <label className="text-xs font-bold text-app-muted uppercase tracking-wider">
                    {label}
                </label>
            )}

            {value ? (
                <div className="relative w-full rounded-lg border border-app-border overflow-hidden bg-app-bg group">
                    <img src={value} alt="" className="w-full h-48 object-cover" />
                    <button
                        type="button"
                        onClick={handleRemove}
                        disabled={isRemoving}
                        className="absolute top-2 right-2 size-8 rounded-md bg-white/90 text-red-600 hover:bg-white flex items-center justify-center shadow-sm disabled:opacity-50"
                    >
                        {isRemoving ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={openPicker}
                    disabled={isUploading}
                    className="w-full h-32 rounded-lg border-2 border-dashed border-app-border bg-app-bg/40 hover:bg-app-bg flex flex-col items-center justify-center text-app-muted gap-2 transition-colors disabled:opacity-60"
                >
                    {isUploading ? (
                        <>
                            <Loader2 className="size-6 animate-spin" />
                            <span className="text-xs font-semibold">Uploading…</span>
                        </>
                    ) : (
                        <>
                            <ImagePlus className="size-6" />
                            <span className="text-xs font-semibold">Click to upload</span>
                            <span className="text-[10px]">PNG, JPG, WebP up to {maxSizeMB} MB</span>
                        </>
                    )}
                </button>
            )}

            <input
                ref={inputRef}
                type="file"
                accept={ACCEPT}
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                }}
            />

            {error && <p className="text-[10px] text-red-500 font-bold">{error}</p>}
        </div>
    );
};

export default ImageUploader;
