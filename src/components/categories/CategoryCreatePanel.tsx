import { useForm, Controller } from "react-hook-form";
import SidePanel from "../ui/SidePanel";
import { Button } from "../ui/button";
import { CustomInput } from "../ui/CustomInput";
import { CustomSelect } from "../ui/CustomSelect";
import { FormSection } from "../ui/FormSection";
import { X, Save, Layers, Layout, Activity } from "lucide-react";
import { useCreateCategory, useUpdateCategory } from "../../pages/categories/hooks/useCategories";
import { type CreateCategoryRequest, CategoryIcon, type Category } from "../../pages/categories/service/categories.type";
import { MOCK_MENUS } from "../../pages/menu/menu.config";
import { toast } from "sonner";
import { useEffect } from "react";

interface CategoryCreatePanelProps {
    open: boolean;
    onClose: () => void;
    categoryToEdit?: Category | null;
    isEdit?: boolean;
}

const ICON_OPTIONS = [
    { label: "Utensils Crossed", value: CategoryIcon.UTENSILS_CROSSED },
    { label: "Pizza", value: CategoryIcon.PIZZA },
    { label: "Coffee", value: CategoryIcon.COFFEE },
    { label: "Beer", value: CategoryIcon.BEER },
    { label: "Ice Cream", value: CategoryIcon.ICE_CREAM },
];

const MENU_OPTIONS = MOCK_MENUS.map(menu => ({
    label: menu.name,
    value: menu.id
}));

const DEFAULT_VALUES: Partial<CreateCategoryRequest> = {
    name: "",
    organization_id: "69948af4435dccf179e3e939",
    icon: CategoryIcon.UTENSILS_CROSSED,
    isActive: true,
    menuId: "",
    itemCount: 0
};

const CategoryCreatePanel = ({ open, onClose, categoryToEdit, isEdit }: CategoryCreatePanelProps) => {
    const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
    const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateCategoryRequest>({
        defaultValues: DEFAULT_VALUES as CreateCategoryRequest,
    });

    useEffect(() => {
        if (isEdit && categoryToEdit) {
            reset({
                name: categoryToEdit.name,
                organization_id: categoryToEdit.organization_id || "69948af4435dccf179e3e939",
                icon: (typeof categoryToEdit.icon === 'string' ? categoryToEdit.icon : CategoryIcon.UTENSILS_CROSSED) as any,
                isActive: categoryToEdit.isActive,
                menuId: categoryToEdit.menuId || "",
                itemCount: categoryToEdit.itemCount || 0
            });
        } else {
            reset(DEFAULT_VALUES as CreateCategoryRequest);
        }
    }, [isEdit, categoryToEdit, reset]);

    const isPending = isCreating || isUpdating;

    const onSubmit = (data: CreateCategoryRequest) => {
        if (isEdit && categoryToEdit) {
            updateCategory(
                { id: categoryToEdit._id, data },
                {
                    onSuccess: () => {
                        toast.success("Category updated successfully!");
                        reset();
                        onClose();
                    },
                    onError: (error: any) => {
                        toast.error(error?.message || "Failed to update category");
                    },
                }
            );
        } else {
            createCategory(data, {
                onSuccess: () => {
                    toast.success("Category created successfully!");
                    reset();
                    onClose();
                },
                onError: (error: any) => {
                    toast.error(error?.message || "Failed to create category");
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
                        <h2 className="text-lg font-bold text-app-text">{isEdit ? "Edit Category" : "Add New Category"}</h2>
                        <p className="text-xs text-app-muted mt-0.5">
                            {isEdit ? "Update the details of your category." : "Organize your menu by creating a new category."}
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
                        {isPending ? (isEdit ? "Changing..." : "Sharing...") : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                {isEdit ? "Update Category" : "Create Category"}
                            </>
                        )}
                    </Button>
                </div>
            }
            className="sm:max-w-xl"
        >
            <form className="p-6 space-y-8" onSubmit={handleSubmit(onSubmit)}>
                <FormSection title="Category Details" icon={Layers}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Category name is required" }}
                        render={({ field }) => (
                            <CustomInput
                                {...field}
                                label="Category Name"
                                placeholder="e.g. Appetizers"
                                error={errors.name?.message}
                            />
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Controller
                            name="icon"
                            control={control}
                            rules={{ required: "Icon is required" }}
                            render={({ field }) => (
                                <CustomSelect
                                    label="Category Icon"
                                    options={ICON_OPTIONS}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    placeholder="Select icon"
                                    error={errors.icon?.message}
                                />
                            )}
                        />

                        <Controller
                            name="isActive"
                            control={control}
                            render={({ field }) => (
                                <CustomSelect
                                    label="Status"
                                    options={[
                                        { label: "Active", value: "true" },
                                        { label: "Inactive", value: "false" }
                                    ]}
                                    value={field.value ? "true" : "false"}
                                    onValueChange={(val) => field.onChange(val === "true")}
                                    placeholder="Select status"
                                />
                            )}
                        />
                    </div>
                </FormSection>

                <FormSection title="Menu Mapping" icon={Layout}>
                    <Controller
                        name="menuId"
                        control={control}
                        rules={{ required: "Menu assignment is required" }}
                        render={({ field }) => (
                            <CustomSelect
                                label="Assign to Menu"
                                options={MENU_OPTIONS}
                                value={field.value}
                                onValueChange={field.onChange}
                                placeholder="Select a menu"
                                error={errors.menuId?.message}
                            />
                        )}
                    />
                </FormSection>

                <FormSection title="Initial Statistics" icon={Activity}>
                    <Controller
                        name="itemCount"
                        control={control}
                        render={({ field }) => (
                            <CustomInput
                                {...field}
                                label="Initial Item Count"
                                type="number"
                                placeholder="0"
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                error={errors.itemCount?.message}
                            />
                        )}
                    />
                </FormSection>
            </form>
        </SidePanel>
    );
};

export default CategoryCreatePanel;
