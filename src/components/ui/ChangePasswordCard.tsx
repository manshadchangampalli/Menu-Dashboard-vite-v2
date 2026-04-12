import { useState } from "react";
import { useParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { KeyRound, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { changeStaffPassword } from "../../pages/staff/service/staff.api";
import { Button } from "./button";
import { toast } from "sonner";

const ChangePasswordCard = () => {
    const { id } = useParams<{ id: string }>();
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { mutate, isPending } = useMutation({
        mutationFn: () => changeStaffPassword(id!, password),
        onSuccess: () => {
            toast.success("Password changed successfully");
            setPassword("");
            setConfirm("");
        },
        onError: (error: any) => {
            toast.error(error?.message || "Failed to change password");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        if (password !== confirm) {
            toast.error("Passwords do not match");
            return;
        }
        mutate();
    };

    return (
        <div className="bg-white border border-app-border rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-app-border flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-app-muted" />
                <h2 className="text-sm font-bold text-app-text">Change Password</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
                {/* New Password */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-app-muted uppercase">New Password</label>
                    <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-muted pointer-events-none" />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Min. 6 characters"
                            className="w-full h-10 pl-9 pr-10 border border-app-border rounded-md text-sm font-medium focus:ring-1 focus:ring-app-text outline-none transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-app-muted hover:text-app-text transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-app-muted uppercase">Confirm Password</label>
                    <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-muted pointer-events-none" />
                        <input
                            type={showConfirm ? "text" : "password"}
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            placeholder="Re-enter password"
                            className={`w-full h-10 pl-9 pr-10 border rounded-md text-sm font-medium focus:ring-1 focus:ring-app-text outline-none transition-all ${
                                confirm && confirm !== password
                                    ? "border-red-400 focus:ring-red-400"
                                    : "border-app-border"
                            }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-app-muted hover:text-app-text transition-colors"
                        >
                            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    {confirm && confirm !== password && (
                        <p className="text-xs text-red-500 font-medium mt-0.5">Passwords do not match</p>
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full bg-app-text text-white hover:bg-app-text/90 font-semibold h-10"
                    disabled={isPending || !password || password !== confirm}
                >
                    {isPending ? "Changing..." : "Change Password"}
                </Button>
            </form>
        </div>
    );
};

export default ChangePasswordCard;
