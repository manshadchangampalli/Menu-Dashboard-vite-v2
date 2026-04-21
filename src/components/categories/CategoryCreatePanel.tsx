// @ts-ignore
import { useForm, useController } from "react-hook-form";
import { useSearchParams } from "react-router";
import SidePanel from "../ui/SidePanel";
import { Button } from "../ui/button";
import { CustomInput } from "../ui/CustomInput";
import { CustomSelect } from "../ui/CustomSelect";
import { FormSection } from "../ui/FormSection";
import { X, Save, Layers, Layout, Activity } from "lucide-react";
import { useCreateCategory, useUpdateCategory } from "../../pages/categories/hooks/useCategories";
import { useMenus } from "../../pages/menu/hooks/useMenu";
import { useBranches } from "../../pages/branches/hooks/useBranches";
import { type CreateCategoryRequest, CategoryIcon, type Category } from "../../pages/categories/service/categories.type";
import { toast } from "sonner";
import { useEffect, useMemo } from "react";
import { useAuthStore } from "../../store/auth/auth.store";

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

const STATUS_OPTIONS = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" }
];


const DEFAULT_VALUES: Partial<CreateCategoryRequest> = {
    name: "",
    icon: CategoryIcon.UTENSILS_CROSSED,
    image_url: "",
    isActive: true,
    menuId: "",
    branch_id: "",
    itemCount: 0
};

const CategoryCreatePanel = ({ open, onClose, categoryToEdit, isEdit }: CategoryCreatePanelProps) => {
    const [searchParams] = useSearchParams();
    const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
    const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
    const { data: menusResponse, isLoading: isLoadingMenus } = useMenus({ limit: 100, page: 1 });

    const user = useAuthStore((state) => state.user);
    const isAdmin = user?.role === 'admin';

    const menuOptions = useMemo(() => {
        if (!menusResponse?.data) return [];
        return menusResponse.data.map((menu: { name: string; _id: string }) => ({
            label: menu.name,
            value: menu._id
        }));
    }, [menusResponse]);

    const { data: branchesResponse, isLoading: isLoadingBranches } = useBranches({ limit: 100, page: 1 });
    const branchOptions = useMemo(() => {
        if (!branchesResponse?.data) return [];
        return branchesResponse.data.map((branch: { name: string; _id: string }) => ({
            label: branch.name,
            value: branch._id
        }));
    }, [branchesResponse]);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateCategoryRequest>({
        defaultValues: DEFAULT_VALUES,
    });

    const nameController = useController({ name: "name", control, rules: { required: "Category name is required" } });
    const descriptionController = useController({ name: "description", control });
    const statusController = useController({ name: "isActive", control });
    const menuIdController = useController({ name: "menuId", control, rules: { required: "Menu is required" } });
    const iconController = useController({ name: "icon", control, rules: { required: "Icon is required" } });
    const imageUrlController = useController({ name: "image_url", control });
    const branchIdController = useController({ name: "branch_id", control, rules: { required: isAdmin ? "Branch is required" : false } });
    const itemCountController = useController({ name: "itemCount", control });

    useEffect(() => {
        if (isEdit && categoryToEdit) {
            reset({
                name: categoryToEdit.name,
                icon: (typeof categoryToEdit.icon === 'string' ? categoryToEdit.icon : CategoryIcon.UTENSILS_CROSSED) as any,
                image_url: categoryToEdit.image_url || "",
                isActive: categoryToEdit.isActive,
                menuId: categoryToEdit.menuId || "",
                branch_id: categoryToEdit.branch_id || "",
                itemCount: categoryToEdit.itemCount || 0
            });
        } else {
            const menuIdFromUrl = searchParams.get("menuId");
            reset({
                ...DEFAULT_VALUES,
                menuId: menuIdFromUrl || ""
            } as CreateCategoryRequest);
        }
    }, [isEdit, categoryToEdit, reset, searchParams]);

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
                    <CustomInput
                        {...nameController.field}
                        label="Category Name"
                        placeholder="e.g. Appetizers"
                        error={errors.name?.message}
                    />
                    <CustomInput
                        {...descriptionController.field}
                        label="Description"
                        placeholder="Category description..."
                        error={errors.description?.message}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <CustomSelect
                            label="Category Icon"
                            options={ICON_OPTIONS}
                            value={iconController.field.value}
                            onValueChange={iconController.field.onChange}
                            placeholder="Select icon"
                            error={errors.icon?.message}
                        />

                        <CustomSelect
                            label="Status"
                            options={STATUS_OPTIONS}
                            value={statusController.field.value ? "active" : "inactive"}
                            onValueChange={(val) => statusController.field.onChange(val === "active")}
                            placeholder="Select status"
                        />
                    </div>

                    <CustomInput
                        {...imageUrlController.field}
                        label="Image URL"
                        placeholder="https://cdn.example.com/categories/pizza.jpg"
                        error={errors.image_url?.message}
                    />
                </FormSection>

                <FormSection title="Menu & Branch Mapping" icon={Layout}>
                    <div className="grid grid-cols-2 gap-4">
                        <CustomSelect
                            label="Select Menu"
                            options={menuOptions}
                            value={menuIdController.field.value}
                            onValueChange={menuIdController.field.onChange}
                            placeholder={isLoadingMenus ? "Loading menus..." : "Select a menu"}
                            error={errors.menuId?.message}
                            disabled={isLoadingMenus}
                        />

                        {isAdmin && (
                            <CustomSelect
                                label="Select Branch"
                                options={branchOptions}
                                value={branchIdController.field.value}
                                onValueChange={branchIdController.field.onChange}
                                placeholder={isLoadingBranches ? "Loading branches..." : "Select a branch"}
                                error={errors.branch_id?.message}
                                disabled={isLoadingBranches}
                            />
                        )}
                    </div>
                </FormSection>

                <FormSection title="Initial Statistics" icon={Activity}>
                    <CustomInput
                        {...itemCountController.field}
                        label="Initial Item Count"
                        type="number"
                        placeholder="0"
                        onChange={(e) => itemCountController.field.onChange(parseInt(e.target.value) || 0)}
                        error={errors.itemCount?.message}
                    />
                </FormSection>
            </form>
        </SidePanel>
    );
};

export default CategoryCreatePanel;
