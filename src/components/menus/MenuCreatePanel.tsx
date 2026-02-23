import { useForm, Controller } from "react-hook-form";
import SidePanel from "../ui/SidePanel";
import { Button } from "../ui/button";
import { CustomInput } from "../ui/CustomInput";
import { CustomSelect } from "../ui/CustomSelect";
import { FormSection } from "../ui/FormSection";
import { X, Save, Layout, Clock, Activity, FileText } from "lucide-react";
import { useCreateMenu } from "../../pages/menu/hooks/useMenu";
import { MenuType, MenuStatus, type CreateMenuRequest } from "../../pages/menu/service/menu.type";
import { toast } from "sonner";

interface MenuCreatePanelProps {
    open: boolean;
    onClose: () => void;
}

const TYPE_OPTIONS = [
    { label: "Dine-In", value: MenuType.DINE_IN },
    { label: "Delivery", value: MenuType.DELIVERY },
    { label: "Both", value: MenuType.BOTH },
];

const STATUS_OPTIONS = [
    { label: "Active", value: MenuStatus.ACTIVE },
    { label: "Inactive", value: MenuStatus.INACTIVE },
];

const DEFAULT_VALUES: CreateMenuRequest = {
    name: "",
    type: MenuType.BOTH,
    description: "",
    start_time: "11:00",
    end_time: "23:00",
    status: MenuStatus.ACTIVE,
    isActive: true,
    organization_id: "65d8f7a9e1b2c3d4e5f6a7b8", // Placeholder or from context if available
    categoryCount: 0,
    itemCount: 0
};

const MenuCreatePanel = ({ open, onClose }: MenuCreatePanelProps) => {
    const { mutate: createMenu, isPending } = useCreateMenu();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateMenuRequest>({
        defaultValues: DEFAULT_VALUES,
    });

    const onSubmit = (data: CreateMenuRequest) => {
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
    };

    return (
        <SidePanel
            open={open}
            onClose={onClose}
            title={
                <div className="flex items-center justify-between w-full">
                    <div>
                        <h2 className="text-lg font-bold text-app-text">Add New Menu</h2>
                        <p className="text-xs text-app-muted mt-0.5">
                            Create a new menu offering for your customers.
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
                                Create Menu
                            </>
                        )}
                    </Button>
                </div>
            }
            className="sm:max-w-xl"
        >
            <form className="p-6 space-y-8" onSubmit={handleSubmit(onSubmit)}>
                <FormSection title="Menu Details" icon={Layout}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Menu name is required" }}
                        render={({ field }) => (
                            <CustomInput
                                {...field}
                                label="Menu Name"
                                placeholder="e.g. Main Menu"
                                error={errors.name?.message}
                            />
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Controller
                            name="type"
                            control={control}
                            rules={{ required: "Type is required" }}
                            render={({ field }) => (
                                <CustomSelect
                                    label="Menu Type"
                                    options={TYPE_OPTIONS}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    placeholder="Select type"
                                    error={errors.type?.message}
                                />
                            )}
                        />

                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <CustomSelect
                                    label="Status"
                                    options={STATUS_OPTIONS}
                                    value={field.value}
                                    onValueChange={(val) => {
                                        field.onChange(val);
                                        // Update isActive accordingly if needed, though usually handled by backend
                                    }}
                                    placeholder="Select status"
                                />
                            )}
                        />
                    </div>
                </FormSection>

                <FormSection title="Description" icon={FileText}>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <CustomInput
                                {...field}
                                label="Description"
                                placeholder="Describe your menu offering..."
                                error={errors.description?.message}
                            />
                        )}
                    />
                </FormSection>

                <FormSection title="Availability" icon={Clock}>
                    <div className="grid grid-cols-2 gap-4">
                        <Controller
                            name="start_time"
                            control={control}
                            rules={{ required: "Start time is required" }}
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    type="time"
                                    label="Start Time"
                                    error={errors.start_time?.message}
                                />
                            )}
                        />

                        <Controller
                            name="end_time"
                            control={control}
                            rules={{ required: "End time is required" }}
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    type="time"
                                    label="End Time"
                                    error={errors.end_time?.message}
                                />
                            )}
                        />
                    </div>
                </FormSection>

                <FormSection title="Initial Statistics" icon={Activity}>
                    <div className="grid grid-cols-2 gap-4">
                        <Controller
                            name="categoryCount"
                            control={control}
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    label="Category Count"
                                    type="number"
                                    placeholder="0"
                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                    error={errors.categoryCount?.message}
                                />
                            )}
                        />
                        <Controller
                            name="itemCount"
                            control={control}
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    label="Item Count"
                                    type="number"
                                    placeholder="0"
                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                    error={errors.itemCount?.message}
                                />
                            )}
                        />
                    </div>
                </FormSection>
            </form>
        </SidePanel>
    );
};

export default MenuCreatePanel;
