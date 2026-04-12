import { useEffect, useMemo } from "react";
import { useForm, useController } from "react-hook-form";
import SidePanel from "../ui/SidePanel";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { X, Save, Check } from "lucide-react";
import { CustomSelect } from "../ui/CustomSelect";
import { useCreateMenuItem } from "../../pages/menu-items/hooks/useMenuItems";
import { useProducts } from "../../pages/menu-items/hooks/useProducts";
import type { CreateMenuItemRequest } from "../../pages/menu-items/menuItems.type";
import { toast } from "sonner";
import { useAuthStore } from "../../store/auth/auth.store";
import { useBranches } from "../../pages/branches/hooks/useBranches";
import { UserRole } from "../../pages/login/service/login.type";

interface MenuItemCreatePanelProps {
    open: boolean;
    onClose: () => void;
    categoryId: string;
    menuId: string;
    branchId: string;
}

const DEFAULT_VALUES: Partial<CreateMenuItemRequest> = {
    product_id: "",
    base_price: 0,
    selling_price: 0,
    is_available: true,
    branch_id: ""
};

const MenuItemCreatePanel = ({ open, onClose, categoryId, menuId, branchId }: MenuItemCreatePanelProps) => {
    const { mutate: createMenuItem, isPending: isCreating } = useCreateMenuItem();

    const user = useAuthStore((state) => state.user);
    const isAdmin = user?.role === UserRole.ORG_ADMIN;

    const { data: branchesResponse, isLoading: isLoadingBranches } = useBranches({ limit: 100 });
    const branchOptions = useMemo(() => {
        if (!branchesResponse?.data) return [];
        return branchesResponse.data.map((b: { name: string; _id: string }) => ({ label: b.name, value: b._id }));
    }, [branchesResponse]);

    // Fetch products for the dropdown
    const { data: productsResponse, isLoading: isProductsLoading } = useProducts({
        limit: 100,
    });

    const products = useMemo(() => productsResponse?.data || [], [productsResponse]);

    const {
        register,
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<CreateMenuItemRequest>({
        defaultValues: {
            ...DEFAULT_VALUES,
            category_id: categoryId,
            menu_id: menuId,
            branch_id: branchId,
        } as CreateMenuItemRequest,
    });

    const productIdController = useController({ name: "product_id", control, rules: { required: "Product is required" } });
    const branchIdController = useController({ name: "branch_id", control, rules: { required: isAdmin ? "Branch is required" : false } });

    const selectedProductId = watch("product_id");

    useEffect(() => {
        if (open) {
            reset({
                ...DEFAULT_VALUES,
                category_id: categoryId,
                menu_id: menuId,
                branch_id: branchId || "",
            } as CreateMenuItemRequest);
        }
    }, [open, reset, categoryId, menuId, branchId]);

    // Update prices when product is selected
    useEffect(() => {
        if (selectedProductId) {
            const product = products.find(p => p._id === selectedProductId);
            if (product) {
                setValue("base_price", product.base_price);
                setValue("selling_price", product.base_price);
            }
        }
    }, [selectedProductId, products, setValue]);

    const onSubmit = (data: CreateMenuItemRequest) => {
        // If not admin, use the branchId from prop. If admin, it should be in data.branch_id from the dropdown
        const finalData = {
            ...data,
            branch_id: isAdmin ? data.branch_id : branchId
        };

        if (!finalData.branch_id && !isAdmin) {
            toast.error("Branch ID is missing. Please ensure the category is associated with a branch.");
            return;
        }

        createMenuItem(finalData, {
            onSuccess: () => {
                toast.success("Menu item added successfully!");
                onClose();
                reset();
            },
            onError: (error: unknown) => {
                toast.error((error as Error)?.message || "Failed to add menu item");
            },
        });
    };

    const productOptions = products.map((p: { name: string; _id: string }) => ({
        label: p.name,
        value: p._id
    }));

    return (
        <SidePanel
            open={open}
            onClose={onClose}
            title={
                <div className="flex items-center justify-between w-full">
                    <div>
                        <h2 className="text-lg font-bold text-app-text">Add Item to Category</h2>
                        <p className="text-xs text-app-muted mt-0.5">Select a product to add as a menu item.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="size-8 rounded-full flex items-center justify-center text-app-muted hover:bg-app-accent hover:text-app-text transition-colors"
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
                        disabled={isCreating}
                        type="submit"
                    >
                        {isCreating ? "Adding..." : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Add to Category
                            </>
                        )}
                    </Button>
                </div>
            }
            className="sm:max-w-md"
        >
            <form className="p-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <CustomSelect
                    label="Select Product"
                    placeholder={isProductsLoading ? "Loading products..." : "Search products..."}
                    options={productOptions}
                    value={productIdController.field.value}
                    onValueChange={productIdController.field.onChange}
                    error={errors.product_id?.message}
                    disabled={isProductsLoading}
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

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-app-muted uppercase">Base Price (AED)</label>
                        <Input
                            type="number"
                            {...register("base_price", { valueAsNumber: true })}
                            className="bg-app-bg border-app-border"
                            placeholder="0.00"
                        />
                        {errors.base_price && <p className="text-[10px] text-red-500 font-bold">{errors.base_price.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-app-muted uppercase">Selling Price (AED)</label>
                        <Input
                            type="number"
                            {...register("selling_price", { valueAsNumber: true })}
                            className="bg-white border-app-border font-bold text-app-text"
                            placeholder="0.00"
                        />
                        {errors.selling_price && <p className="text-[10px] text-red-500 font-bold">{errors.selling_price.message}</p>}
                    </div>
                </div>

                <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100 space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="size-5 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                            <Check className="size-3" />
                        </div>
                        <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Availability</span>
                    </div>
                    <p className="text-xs text-emerald-700 font-medium leading-relaxed">
                        This item will be immediately available in the menu category upon creation.
                    </p>
                </div>
            </form>
        </SidePanel>
    );
};

export default MenuItemCreatePanel;
