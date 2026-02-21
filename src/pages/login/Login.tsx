import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Utensils, Mail, Lock } from "lucide-react";
import { useLogin } from "./hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
    const navigate = useNavigate();
    const { mutate, isPending } = useLogin();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn === "true") {
            navigate("/");
        }
    }, [navigate]);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: "",
            remember: false
        }
    });

    const onSubmit = (data: any) => {
        mutate({
            email: data.email,
            password: data.password
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-app-bg font-display">
            <div className="w-full max-w-[400px]">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-primary size-12 rounded-lg flex items-center justify-center text-white mb-4 shadow-sm">
                        <Utensils className="size-6" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-app-text">BistroOS</h1>
                    <p className="text-[10px] text-app-muted uppercase tracking-[0.3em] font-bold mt-1.5">Direct Access Only</p>
                </div>

                <div className="bg-white border border-app-border rounded-xl shadow-sm p-8">
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-app-text">Admin Login</h2>
                        <p className="text-sm text-app-muted mt-1.5">Enter your administrative credentials.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-app-text leading-none" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-app-muted">
                                    <Mail className="size-5" />
                                </div>
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{ required: "Email is required" }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            id="email"
                                            type="email"
                                            className="pl-10"
                                            placeholder="admin@bistroos.com"
                                        />
                                    )}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-red-500">{errors.email.message as string}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-app-text leading-none" htmlFor="password">
                                    Password
                                </label>
                                <a href="#" className="text-xs font-semibold text-app-text hover:text-app-muted transition-colors">
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-app-muted">
                                    <Lock className="size-5" />
                                </div>
                                <Controller
                                    name="password"
                                    control={control}
                                    rules={{ required: "Password is required" }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            id="password"
                                            type="password"
                                            className="pl-10"
                                            placeholder="••••••••"
                                        />
                                    )}
                                />
                            </div>
                            {errors.password && (
                                <p className="text-xs text-red-500">{errors.password.message as string}</p>
                            )}
                        </div>

                        {/* <div className="flex items-center space-x-2 pb-2">
                            <Controller
                                name="remember"
                                control={control}
                                render={({ field: { value, onChange, ...field } }) => (
                                    <input
                                        {...field}
                                        type="checkbox"
                                        checked={value}
                                        onChange={onChange}
                                        id="remember"
                                        className="h-4 w-4 rounded border-app-border text-app-text focus:ring-app-text cursor-pointer accent-primary"
                                    />
                                )}
                            />
                            <label className="text-sm font-medium text-app-muted cursor-pointer select-none" htmlFor="remember">
                                Keep me signed in
                            </label>
                        </div> */}

                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? "Signing In..." : "Sign In"}
                        </Button>
                    </form>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-[11px] text-app-muted uppercase tracking-widest font-medium">
                        © 2024 BistroOS. Restricted Environment.
                    </p>
                    <div className="mt-4 flex justify-center gap-4 text-xs font-medium text-app-muted">
                        <a href="#" className="hover:text-app-text transition-colors">Security Policy</a>
                        <span className="text-app-border">•</span>
                        <a href="#" className="hover:text-app-text transition-colors">System Status</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
