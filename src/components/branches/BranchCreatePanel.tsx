import { useForm, Controller } from "react-hook-form";
import SidePanel from "../ui/SidePanel";
import { Button } from "../ui/button";
import { CustomInput } from "../ui/CustomInput";
import { CustomSelect } from "../ui/CustomSelect";
import { FormSection } from "../ui/FormSection";
import { X, Save, MapPin, Clock, Users } from "lucide-react";
import { useCreateBranch, useUpdateBranch } from "../../pages/branches/hooks/useBranches";
import { type CreateBranchRequest, type BranchData, DayOfWeek } from "../../pages/branches/service/branches.type";
import { BRANCH_TYPE_OPTIONS, CITY_OPTIONS } from "../../pages/branches/config/branches.config";
import { toast } from "sonner";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface BranchCreatePanelProps {
    open: boolean;
    onClose: () => void;
    isEdit?: boolean;
    initialData?: BranchData | null;
}

const DEFAULT_VALUES: Partial<CreateBranchRequest> = {
    address_detail: {
        country: "UAE",
        city: "",
        citySlug: undefined,
        state: "", // Added to match type
        zip_code: "",
        street: "",
        map_location_url: "",
        coordinates: { lat: 0, lng: 0 }
    },
    operating_hours: [
        {
            day: DayOfWeek.MONDAY,
            open_time: "09:00",
            close_time: "22:00",
            is_closed: false,
        },
    ],
    occupancy_stats: {
        capacity: undefined as any,
    },
    organization_id: "69948af4435dccf179e3e939",
    manager_id: "69948af4435dccf179e3e939",
    name: "",
    email: "",
    phone: "",
};

const BranchCreatePanel = ({ open, onClose, isEdit, initialData }: BranchCreatePanelProps) => {
    const { mutate: createBranch, isPending: isCreating } = useCreateBranch();
    const { mutate: updateBranch, isPending: isUpdating } = useUpdateBranch();
    const queryClient = useQueryClient();
    const isPending = isCreating || isUpdating;

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<CreateBranchRequest>({
        defaultValues: DEFAULT_VALUES as CreateBranchRequest,
    });

    useEffect(() => {
        if (open) {
            if (isEdit && initialData) {
                // Normalize data for form (handle case sensitivity and spaces for enums)
                const normalizedData = {
                    ...initialData,
                    address_detail: {
                        ...(initialData.address_detail || {}),
                        citySlug: (initialData.address_detail?.citySlug as string)?.toLowerCase()
                    },
                    branch_type: (initialData.branch_type as string)?.toLowerCase() || ""
                };
                reset(normalizedData as any);
            } else {
                reset(DEFAULT_VALUES as CreateBranchRequest);
            }
        }
    }, [open, isEdit, initialData, reset]);

    const onSubmit = (data: CreateBranchRequest) => {
        if (isEdit && initialData?._id) {
            updateBranch(
                { id: initialData._id, data },
                {
                    onSuccess: () => {
                        toast.success("Branch updated successfully!");
                        queryClient.invalidateQueries({ queryKey: ["branches"] });
                        onClose();
                    },
                    onError: (error: any) => {
                        toast.error(error?.message || "Failed to update branch");
                    },
                }
            );
        } else {
            createBranch(data, {
                onSuccess: () => {
                    toast.success("Branch created successfully!");
                    queryClient.invalidateQueries({ queryKey: ["branches"] });
                    reset();
                    onClose();
                },
                onError: (error: any) => {
                    toast.error(error?.message || "Failed to create branch");
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
                        <h2 className="text-lg font-bold text-app-text">{isEdit ? "Edit Branch" : "Create New Branch"}</h2>
                        <p className="text-xs text-app-muted mt-0.5">
                            {isEdit ? "Update the details of the restaurant location." : "Fill in the details to add a new restaurant location."}
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
                                {isEdit ? "Update Branch" : "Create Branch"}
                            </>
                        )}
                    </Button>
                </div>
            }
            className="sm:max-w-xl"
        >
            <form className="p-6 space-y-8" onSubmit={handleSubmit(onSubmit)}>
                <FormSection title="Basic Information" icon={Save}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Branch name is required" }}
                        render={({ field }) => (
                            <CustomInput
                                {...field}
                                label="Branch Name"
                                placeholder="e.g. Dubai Marina Branch"
                                error={errors.name?.message}
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
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    label="Email"
                                    placeholder="branch@example.com"
                                    type="email"
                                    error={errors.email?.message}
                                />
                            )}
                        />
                        <Controller
                            name="phone"
                            control={control}
                            rules={{ required: "Phone is required" }}
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    label="Phone"
                                    placeholder="9876543210"
                                    error={errors.phone?.message}
                                />
                            )}
                        />
                    </div>
                </FormSection>

                <FormSection title="Location Details" icon={MapPin}>
                    <Controller
                        name="address_detail.street"
                        control={control}
                        rules={{ required: "Street is required" }}
                        render={({ field }) => (
                            <CustomInput
                                {...field}
                                label="Street Address"
                                placeholder="123 Main St"
                                error={errors.address_detail?.street?.message}
                            />
                        )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Controller
                            name="address_detail.citySlug"
                            control={control}
                            rules={{ required: "City is required" }}
                            render={({ field }) => (
                                <CustomSelect
                                    label="City / Emirate"
                                    options={CITY_OPTIONS}
                                    value={field.value}
                                    onValueChange={(val) => {
                                        field.onChange(val);
                                        // Also sync the readable city name
                                        const selectedOption = CITY_OPTIONS.find(opt => opt.value === val);
                                        if (selectedOption) {
                                            setValue("address_detail.city", selectedOption.label);
                                        }
                                    }}
                                    placeholder="Select city"
                                    error={errors.address_detail?.citySlug?.message}
                                />
                            )}
                        />
                        <Controller
                            name="address_detail.zip_code"
                            control={control}
                            render={({ field }) => (
                                <CustomInput {...field} label="Zip Code" placeholder="00000" />
                            )}
                        />
                    </div>
                    <Controller
                        name="address_detail.map_location_url"
                        control={control}
                        render={({ field }) => (
                            <CustomInput
                                {...field}
                                label="Map URL (Optional)"
                                placeholder="https://maps.google.com/..."
                            />
                        )}
                    />
                </FormSection>

                <FormSection title="Capacity & Settings" icon={Users} gridClassName="grid-cols-2">
                    <Controller
                        name="occupancy_stats.capacity"
                        control={control}
                        render={({ field }) => (
                            <CustomInput
                                {...field}
                                label="Capacity"
                                type="number"
                                placeholder="50"
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                                error={errors.occupancy_stats?.capacity?.message}
                            />
                        )}
                    />
                    <Controller
                        name="branch_type"
                        control={control}
                        render={({ field }) => (
                            <CustomSelect
                                label="Branch Type"
                                options={BRANCH_TYPE_OPTIONS}
                                value={field.value}
                                onValueChange={field.onChange}
                                error={errors.branch_type?.message}
                            />
                        )}
                    />
                </FormSection>

                <FormSection title="Operating Hours" icon={Clock} gridClassName="grid-cols-1">
                    <div className="p-4 bg-app-bg border border-app-border rounded-lg text-center">
                        <p className="text-xs text-app-muted font-medium italic">{DayOfWeek.MONDAY} 09:00 - 22:00 (Default)</p>
                        <p className="text-[10px] text-app-muted mt-1 uppercase font-bold">Standard hours will be applied initially</p>
                    </div>
                </FormSection>
            </form>
        </SidePanel>
    );
};

export default BranchCreatePanel;
