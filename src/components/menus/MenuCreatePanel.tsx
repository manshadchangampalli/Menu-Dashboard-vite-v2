import { useEffect } from "react";
// @ts-ignore - Module resolution issue with react-hook-form
import { useForm, useController } from "react-hook-form";
import SidePanel from "../ui/SidePanel";
import { Button } from "../ui/button";
import { CustomInput } from "../ui/CustomInput";
import { CustomSelect } from "../ui/CustomSelect";
import { FormSection } from "../ui/FormSection";
import { X, Save, Layout, Clock, Activity, FileText, MapPin } from "lucide-react";
import { useCreateMenu, useUpdateMenu } from "../../pages/menu/hooks/useMenu";
import { type Menu, MenuType, MenuStatus, type CreateMenuRequest } from "../../pages/menu/service/menu.type";
import { toast } from "sonner";
import { useAuthStore } from "../../store/auth/auth.store";
import { useBranches } from "../../pages/branches/hooks/useBranches";

const TYPE_OPTIONS = [
    { label: "Dine-In", value: MenuType.DINE_IN },
    { label: "Delivery", value: MenuType.DELIVERY },
    { label: "Both", value: MenuType.BOTH },
];

const STATUS_OPTIONS = [
    { label: "Active", value: MenuStatus.ACTIVE },
    { label: "Inactive", value: MenuStatus.INACTIVE },
];

interface MenuCreatePanelProps {
    open: boolean;
    onClose: () => void;
    initialData?: Menu;
}

const DEFAULT_VALUES: CreateMenuRequest = {
    name: "",
    type: MenuType.DELIVERY,
    description: "",
    start_time: "11:00",
    end_time: "23:00",
    status: MenuStatus.ACTIVE,
    isActive: true,
    categoryCount: 0,
    itemCount: 0,
    branch_id: ""
};

const MenuCreatePanel = ({ open, onClose, initialData }: MenuCreatePanelProps) => {
    const isEdit = !!initialData;
    const { mutate: createMenu, isPending: isCreating } = useCreateMenu();
    const { mutate: updateMenu, isPending: isUpdating } = useUpdateMenu();
    const isPending = isCreating || isUpdating;

    const user = useAuthStore((state) => state.user);
    const isAdmin = user?.role === 'admin';

    const { data: branchesData } = useBranches({ limit: 100 });
    const branches = branchesData?.data || [];
    const branchOptions = branches.map(b => ({ label: b.name, value: b._id }));

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateMenuRequest>({
        defaultValues: DEFAULT_VALUES,
    });

    const nameController = useController({ name: "name", control, rules: { required: "Menu name is required" } });
    const typeController = useController({ name: "type", control, rules: { required: "Type is required" } });
    const statusController = useController({ name: "status", control });
    const descriptionController = useController({ name: "description", control });
    const startTimeController = useController({ name: "start_time", control, rules: { required: "Start time is required" } });
    const endTimeController = useController({ name: "end_time", control, rules: { required: "End time is required" } });
    const categoryCountController = useController({ name: "categoryCount", control });
    const itemCountController = useController({ name: "itemCount", control });
    const branchIdController = useController({ name: "branch_id", control, rules: { required: isAdmin ? "Branch is required" : false } });

    useEffect(() => {
        if (open) {
            if (initialData) {
                // Determine the correct menu type value, handling potential casing or character mismatches
                const normalizedType = (initialData.type as string)?.toUpperCase().replace('_', '-') as MenuType;

                reset({
                    ...initialData,
                    type: normalizedType,
                    description: initialData.description || "",
                    isActive: initialData.status === MenuStatus.ACTIVE,
                    categoryCount: initialData.categoryCount || 0,
                    itemCount: initialData.itemCount || 0,
                    branch_id: initialData.branch_id || ""
                });
            } else {
                reset(DEFAULT_VALUES);
            }
        }
    }, [open, initialData, reset]);

    const onSubmit = (data: CreateMenuRequest) => {
        if (isEdit && initialData?._id) {
            updateMenu(
                { id: initialData._id, data },
                {
                    onSuccess: () => {
                        toast.success("Menu updated successfully!");
                        onClose();
                    },
                    onError: (error: any) => {
                        toast.error(error?.message || "Failed to update menu");
                    },
                }
            );
        } else {
            createMenu(data, {
                onSuccess: () => {
                    toast.success("Menu created successfully!");
                    reset(DEFAULT_VALUES);
                    onClose();
                },
                onError: (error: any) => {
                    toast.error(error?.message || "Failed to create menu");
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
                        <h2 className="text-lg font-bold text-app-text">
                            {isEdit ? "Edit Menu" : "Add New Menu"}
                        </h2>
                        <p className="text-xs text-app-muted mt-0.5">
                            {isEdit ? "Update your existing menu offering." : "Create a new menu offering for your customers."}
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
                        {isPending ? "Creating..." : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                {isEdit ? "Save Changes" : "Create Menu"}
                            </>
                        )}
                    </Button>
                </div>
            }
            className="sm:max-w-xl"
        >
            <form className="p-6 space-y-8" onSubmit={handleSubmit(onSubmit)}>
                <FormSection title="Menu Details" icon={Layout}>
                    <CustomInput
                        {...nameController.field}
                        label="Menu Name"
                        placeholder="e.g. Main Menu"
                        error={errors.name?.message}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <CustomSelect
                            label="Menu Type"
                            options={TYPE_OPTIONS}
                            value={typeController.field.value}
                            onValueChange={typeController.field.onChange}
                            placeholder="Select type"
                            error={errors.type?.message}
                        />

                        <CustomSelect
                            label="Status"
                            options={STATUS_OPTIONS}
                            value={statusController.field.value}
                            onValueChange={(val) => {
                                statusController.field.onChange(val);
                            }}
                            placeholder="Select status"
                        />
                    </div>
                </FormSection>

                <FormSection title="Description" icon={FileText}>
                    <CustomInput
                        {...descriptionController.field}
                        label="Description"
                        placeholder="Describe your menu offering..."
                        error={errors.description?.message}
                    />
                </FormSection>

                <FormSection title="Availability" icon={Clock}>
                    <div className="grid grid-cols-2 gap-4">
                        <CustomInput
                            {...startTimeController.field}
                            type="time"
                            label="Start Time"
                            error={errors.start_time?.message}
                        />

                        <CustomInput
                            {...endTimeController.field}
                            type="time"
                            label="End Time"
                            error={errors.end_time?.message}
                        />
                    </div>
                </FormSection>

                <FormSection title="Initial Statistics" icon={Activity}>
                    <div className="grid grid-cols-2 gap-4">
                        <CustomInput
                            {...categoryCountController.field}
                            label="Category Count"
                            type="number"
                            placeholder="0"
                            onChange={(e) => categoryCountController.field.onChange(parseInt(e.target.value) || 0)}
                            error={errors.categoryCount?.message}
                        />
                        <CustomInput
                            {...itemCountController.field}
                            label="Item Count"
                            type="number"
                            placeholder="0"
                            onChange={(e) => itemCountController.field.onChange(parseInt(e.target.value) || 0)}
                            error={errors.itemCount?.message}
                        />
                    </div>
                </FormSection>

                {isAdmin && (
                    <FormSection title="Branch Assignment" icon={MapPin}>
                        <CustomSelect
                            label="Select Branch"
                            options={branchOptions}
                            value={branchIdController.field.value}
                            onValueChange={branchIdController.field.onChange}
                            placeholder="Select a branch"
                            error={errors.branch_id?.message}
                        />
                    </FormSection>
                )}
            </form>
        </SidePanel>
    );
};

export default MenuCreatePanel;
