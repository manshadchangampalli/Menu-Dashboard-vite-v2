import { useForm, Controller } from "react-hook-form";
import SidePanel from "../ui/SidePanel";
import { Button } from "../ui/button";
import { CustomInput } from "../ui/CustomInput";
import { CustomSelect } from "../ui/CustomSelect";
import { FormSection } from "../ui/FormSection";
import { X, Save, User, Shield, Briefcase, Eye, EyeOff } from "lucide-react";
import { useCreateStaff, useUpdateStaff } from "../../pages/staff/hooks/useStaff";
import { useBranches } from "../../pages/branches/hooks/useBranches";
import { useStaff } from "../../pages/staff/hooks/useStaff";
import { type CreateStaffRequest, type StaffData } from "../../pages/staff/staff.type";
import { STAFF_ROLE_OPTIONS } from "../../pages/staff/staff.config";
import { toast } from "sonner";
import { useEffect, useState } from "react";

interface StaffCreatePanelProps {
    open: boolean;
    onClose: () => void;
    isEdit?: boolean;
    initialData?: StaffData | null;
}

// Extend form type locally to include confirm_password (not sent to API)
type StaffFormValues = CreateStaffRequest & { confirm_password?: string };

const DEFAULT_VALUES: Partial<StaffFormValues> = {
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    employee_code: "",
    role: "WAITER",
    branch_id: "",
    permissions: {
        can_create_order: false,
        can_update_order: false,
        can_cancel_payment: false,
        can_handle_payment: false,
    },
};

/** Derive next employee code from existing list, e.g. STF001 → STF002 */
function generateEmployeeCode(existingCodes: string[]): string {
    const nums = existingCodes
        .map((c) => {
            const match = c.match(/^STF(\d+)$/i);
            return match ? parseInt(match[1], 10) : 0;
        })
        .filter((n) => !isNaN(n));

    const next = nums.length > 0 ? Math.max(...nums) + 1 : 1;
    return `STF${String(next).padStart(3, "0")}`;
}

const StaffCreatePanel = ({ open, onClose, isEdit, initialData }: StaffCreatePanelProps) => {
    const { mutate: createStaff, isPending: isCreating } = useCreateStaff();
    const { mutate: updateStaff, isPending: isUpdating } = useUpdateStaff();
    const { data: branchesResponse } = useBranches({ limit: 100, status: "active" });
    const { data: allStaffResponse } = useStaff({ limit: 1000 });
    const isPending = isCreating || isUpdating;

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const branchOptions = branchesResponse?.data?.map((b: any) => ({
        label: b.name,
        value: b._id || b.id,
    })) || [];

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<StaffFormValues>({
        defaultValues: DEFAULT_VALUES as StaffFormValues,
    });

    const passwordValue = watch("password");

    useEffect(() => {
        if (!open) return;

        if (isEdit && initialData) {
            reset({
                ...initialData,
                password: "",
                confirm_password: "",
            } as any);
        } else {
            // Auto-generate employee code
            const existingCodes: string[] = (allStaffResponse?.data ?? []).map(
                (s: StaffData) => s.employee_code
            );
            const nextCode = generateEmployeeCode(existingCodes);
            reset({
                ...(DEFAULT_VALUES as StaffFormValues),
                employee_code: nextCode,
            });
        }
        // Reset password visibility on open
        setShowPassword(false);
        setShowConfirmPassword(false);
    }, [open, isEdit, initialData, reset, allStaffResponse]);

    const onSubmit = (data: StaffFormValues) => {
        // Strip confirm_password — never send it to the API
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirm_password: _cp, ...apiData } = data;

        if (isEdit && initialData?._id) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: _pw, ...rest } = apiData;
            const updatePayload = Object.fromEntries(
                Object.entries(rest).filter(([, v]) => v !== "")
            );

            updateStaff(
                { id: initialData._id, data: updatePayload },
                {
                    onSuccess: () => {
                        toast.success("Staff member updated successfully!");
                        onClose();
                    },
                    onError: (error: any) => {
                        toast.error(error?.message || "Failed to update staff member");
                    },
                }
            );
        } else {
            createStaff(apiData as CreateStaffRequest, {
                onSuccess: () => {
                    toast.success("Staff member created successfully!");
                    reset();
                    onClose();
                },
                onError: (error: any) => {
                    toast.error(error?.message || "Failed to create staff member");
                },
            });
        }
    };

    return (
        <SidePanel
            open={open}
            onClose={onClose}
            title={
                <div className="flex items-center justify-between w-full">
                    <div>
                        <h2 className="text-lg font-bold text-app-text">{isEdit ? "Edit Staff Member" : "Add New Staff Member"}</h2>
                        <p className="text-xs text-app-muted mt-0.5">
                            {isEdit ? "Update profile and permissions." : "Fill in the details to add a new team member."}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="size-8 rounded-full flex items-center justify-center text-app-muted hover:bg-app-accent hover:text-app-text cursor-pointer transition-colors"
                        type="button"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            }
            footer={
                <div className="flex gap-3 h-14">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="flex-1 h-full font-bold border-app-border text-app-text hover:bg-app-bg text-base"
                        type="button"
                    >
                        Cancel
                    </Button>
                    <Button
                        className="flex-1 h-full bg-app-text text-white hover:bg-app-text/90 font-bold shadow-sm text-base"
                        onClick={handleSubmit(onSubmit)}
                        disabled={isPending}
                        type="submit"
                    >
                        {isPending ? (isEdit ? "Updating..." : "Creating...") : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                {isEdit ? "Update Staff" : "Add Staff"}
                            </>
                        )}
                    </Button>
                </div>
            }
            className="sm:max-w-xl"
        >
            <form className="p-6 space-y-8" onSubmit={handleSubmit(onSubmit)}>
                <FormSection title="Basic Information" icon={User}>
                    <Controller
                        name="full_name"
                        control={control}
                        rules={{ required: "Full name is required" }}
                        render={({ field }: { field: any }) => (
                            <CustomInput
                                {...field}
                                label="Full Name"
                                placeholder="e.g. John Doe"
                                error={errors.full_name?.message}
                            />
                        )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                            }}
                            render={({ field }: { field: any }) => (
                                <CustomInput
                                    {...field}
                                    label="Email Address"
                                    placeholder="john@example.com"
                                    type="email"
                                    error={errors.email?.message}
                                />
                            )}
                        />
                        <Controller
                            name="phone"
                            control={control}
                            rules={{ required: "Phone is required" }}
                            render={({ field }: { field: any }) => (
                                <CustomInput
                                    {...field}
                                    label="Phone Number"
                                    placeholder="9876543210"
                                    error={errors.phone?.message}
                                />
                            )}
                        />
                    </div>

                    {/* ── Password fields (create mode only) ── */}
                    {!isEdit && (
                        <div className="grid grid-cols-2 gap-4">
                            {/* Password */}
                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } }}
                                render={({ field }: { field: any }) => (
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-bold text-app-muted uppercase">Password</label>
                                        <div className="relative">
                                            <input
                                                {...field}
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Min 6 characters"
                                                className={`w-full h-10 rounded-md border px-3 pr-10 text-sm font-medium bg-white focus:outline-none focus:ring-1 focus-visible:ring-app-text transition-colors ${errors.password
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "border-app-border focus:ring-app-text"
                                                    }`}
                                            />
                                            <button
                                                type="button"
                                                tabIndex={-1}
                                                onClick={() => setShowPassword((v) => !v)}
                                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-app-muted hover:text-app-text transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <p className="text-[10px] text-red-500 font-bold mt-1">{errors.password.message}</p>
                                        )}
                                    </div>
                                )}
                            />

                            {/* Confirm Password */}
                            <Controller
                                name="confirm_password"
                                control={control}
                                rules={{
                                    required: "Please confirm password",
                                    validate: (val: string) => val === passwordValue || "Passwords do not match",
                                }}
                                render={({ field }: { field: any }) => (
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-bold text-app-muted uppercase">Confirm Password</label>
                                        <div className="relative">
                                            <input
                                                {...field}
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Re-enter password"
                                                className={`w-full h-10 rounded-md border px-3 pr-10 text-sm font-medium bg-white focus:outline-none focus:ring-1 transition-colors ${errors.confirm_password
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "border-app-border focus:ring-app-text"
                                                    }`}
                                            />
                                            <button
                                                type="button"
                                                tabIndex={-1}
                                                onClick={() => setShowConfirmPassword((v) => !v)}
                                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-app-muted hover:text-app-text transition-colors"
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        {errors.confirm_password && (
                                            <p className="text-[10px] text-red-500 font-bold mt-1">{errors.confirm_password.message}</p>
                                        )}
                                    </div>
                                )}
                            />
                        </div>
                    )}
                </FormSection>

                <FormSection title="Assignment" icon={Briefcase}>
                    <div className="grid grid-cols-2 gap-4">
                        <Controller
                            name="employee_code"
                            control={control}
                            rules={{ required: "Employee code is required" }}
                            render={({ field }: { field: any }) => (
                                <CustomInput
                                    {...field}
                                    label="Employee Code"
                                    placeholder="e.g. STF001"
                                    error={errors.employee_code?.message}
                                />
                            )}
                        />
                        <Controller
                            name="role"
                            control={control}
                            rules={{ required: "Role is required" }}
                            render={({ field }: { field: any }) => (
                                <CustomSelect
                                    label="Role"
                                    options={STAFF_ROLE_OPTIONS}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    error={errors.role?.message}
                                />
                            )}
                        />
                    </div>
                    <Controller
                        name="branch_id"
                        control={control}
                        rules={{ required: "Branch assignment is required" }}
                        render={({ field }: { field: any }) => (
                            <CustomSelect
                                label="Assign to Branch"
                                options={branchOptions}
                                value={field.value}
                                onValueChange={field.onChange}
                                placeholder="Select a branch"
                                error={errors.branch_id?.message}
                            />
                        )}
                    />
                </FormSection>

                <FormSection title="Permissions" icon={Shield} gridClassName="grid-cols-2">
                    <div className="flex items-center gap-3 p-3 bg-app-bg border border-app-border rounded-lg">
                        <Controller
                            name="permissions.can_create_order"
                            control={control}
                            render={({ field }: { field: any }) => (
                                <input
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={field.onChange}
                                    className="size-4 rounded border-gray-300 text-app-text focus:ring-app-text"
                                />
                            )}
                        />
                        <span className="text-sm font-medium text-app-text">Can Create Orders</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-app-bg border border-app-border rounded-lg">
                        <Controller
                            name="permissions.can_update_order"
                            control={control}
                            render={({ field }: { field: any }) => (
                                <input
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={field.onChange}
                                    className="size-4 rounded border-gray-300 text-app-text focus:ring-app-text"
                                />
                            )}
                        />
                        <span className="text-sm font-medium text-app-text">Can Update Orders</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-app-bg border border-app-border rounded-lg">
                        <Controller
                            name="permissions.can_handle_payment"
                            control={control}
                            render={({ field }: { field: any }) => (
                                <input
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={field.onChange}
                                    className="size-4 rounded border-gray-300 text-app-text focus:ring-app-text"
                                />
                            )}
                        />
                        <span className="text-sm font-medium text-app-text">Can Handle Payment</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-app-bg border border-app-border rounded-lg">
                        <Controller
                            name="permissions.can_cancel_payment"
                            control={control}
                            render={({ field }: { field: any }) => (
                                <input
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={field.onChange}
                                    className="size-4 rounded border-gray-300 text-app-text focus:ring-app-text"
                                />
                            )}
                        />
                        <span className="text-sm font-medium text-app-text">Can Cancel Payment</span>
                    </div>
                </FormSection>
            </form>
        </SidePanel>
    );
};

export default StaffCreatePanel;
