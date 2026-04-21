import { useEffect, useMemo } from "react";
import { useForm, useController, useFieldArray } from "react-hook-form";
import SidePanel from "../ui/SidePanel";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { X, Save, Check, Plus, Trash2 } from "lucide-react";
import { CustomSelect } from "../ui/CustomSelect";
import { useCreateMenuItem } from "../../pages/menu-items/hooks/useMenuItems";
import { useProducts } from "../../pages/menu-items/hooks/useProducts";
import type { CreateMenuItemRequest } from "../../pages/menu-items/menuItems.type";
import { toast } from "sonner";
import { useAuthStore } from "../../store/auth/auth.store";
import { useBranches } from "../../pages/branches/hooks/useBranches";
import { useCategories } from "../../pages/categories/hooks/useCategories";
import { UserRole } from "../../pages/login/service/login.type";

interface MenuItemCreatePanelProps {
    open: boolean;
    onClose: () => void;
    /** Pass when opening from a specific category context (locks the picker). */
    categoryId?: string;
    menuId?: string;
    branchId?: string;
}

const DEFAULT_VALUES: Partial<CreateMenuItemRequest> = {
    product_id: "",
    base_price: 0,
    selling_price: 0,
    is_available: true,
    branch_id: "",
    variants: [],
    extras: [],
    max_extras: undefined,
};

const MenuItemCreatePanel = ({ open, onClose, categoryId, menuId, branchId }: MenuItemCreatePanelProps) => {
    const { mutate: createMenuItem, isPending: isCreating } = useCreateMenuItem();

    const user = useAuthStore((state) => state.user);
    const isAdmin = user?.role === UserRole.ORG_ADMIN;

    // Standalone mode: no category passed, so show a picker
    const standalone = !categoryId;
    const { data: categoriesData, isLoading: isLoadingCategories } = useCategories();
    const categoryOptions = useMemo(() => {
        const list = Array.isArray(categoriesData) ? categoriesData : [];
        return list.map((c: { _id: string; name: string }) => ({ label: c.name, value: c._id }));
    }, [categoriesData]);

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
            category_id: categoryId ?? "",
            menu_id: menuId ?? "",
            branch_id: branchId ?? "",
        } as CreateMenuItemRequest,
    });

    const productIdController = useController({ name: "product_id", control, rules: { required: "Product is required" } });
    const categoryIdController = useController({
        name: "category_id",
        control,
        rules: { required: standalone ? "Category is required" : false },
    });
    const branchIdController = useController({
        name: "branch_id",
        control,
        rules: { required: isAdmin ? "Branch is required" : false },
    });

    // Non-admin (branch-scoped) users: branch always comes from their token.
    // We set it on open and whenever the user record loads.
    useEffect(() => {
        if (!open || isAdmin) return;
        const tokenBranch = user?.branchIds?.[0];
        if (tokenBranch) setValue("branch_id", tokenBranch);
    }, [open, isAdmin, user, setValue]);

    // Standalone: derive menu_id from the picked category.
    // For admins we also pre-fill branch_id if the category carries one (convenience only).
    const selectedCategoryId = watch("category_id");
    useEffect(() => {
        if (!standalone || !selectedCategoryId) return;
        const list = Array.isArray(categoriesData) ? categoriesData : [];
        const cat = list.find((c: { _id: string }) => c._id === selectedCategoryId);
        if (!cat) return;
        if (cat.menuId) setValue("menu_id", cat.menuId);
        if (isAdmin && cat.branch_id) setValue("branch_id", cat.branch_id);
    }, [standalone, selectedCategoryId, categoriesData, isAdmin, setValue]);

    const {
        fields: variantFields,
        append: appendVariant,
        remove: removeVariant,
    } = useFieldArray({ control, name: "variants" });

    const {
        fields: extraFields,
        append: appendExtra,
        remove: removeExtra,
    } = useFieldArray({ control, name: "extras" });

    const selectedProductId = watch("product_id");

    useEffect(() => {
        if (open) {
            reset({
                ...DEFAULT_VALUES,
                category_id: categoryId ?? "",
                menu_id: menuId ?? "",
                branch_id: branchId ?? "",
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
        // Branch source by role:
        //  - Organiser (ORG_ADMIN): they pick a branch in the form (data.branch_id)
        //  - Branch user (BRANCH_ADMIN / STAFF): branch is taken from their token
        const resolvedBranchId = isAdmin
            ? data.branch_id
            : (user?.branchIds?.[0] ?? branchId);

        if (!resolvedBranchId) {
            toast.error(
                isAdmin
                    ? "Please select a branch."
                    : "Your account is not linked to a branch. Contact your administrator.",
            );
            return;
        }

        const finalData = { ...data, branch_id: resolvedBranchId };

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
            className="sm:max-w-lg"
        >
            <form className="p-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {standalone && (
                    <CustomSelect
                        label="Select Category"
                        placeholder={isLoadingCategories ? "Loading categories..." : "Choose a category"}
                        options={categoryOptions}
                        value={categoryIdController.field.value}
                        onValueChange={categoryIdController.field.onChange}
                        error={errors.category_id?.message}
                        disabled={isLoadingCategories}
                    />
                )}

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

                {/* Variants (sizes) */}
                <div className="space-y-3 border-t border-app-border pt-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <label className="text-xs font-bold text-app-muted uppercase">Sizes / Variants</label>
                            <p className="text-[11px] text-app-muted mt-0.5">
                                Leave empty for single-price items. Prices are absolute (AED).
                            </p>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            className="h-8 px-3 text-xs font-semibold"
                            onClick={() =>
                                appendVariant({
                                    label: "",
                                    price: 0,
                                    is_default: variantFields.length === 0,
                                    sort_order: variantFields.length,
                                    is_available: true,
                                })
                            }
                        >
                            <Plus className="w-3.5 h-3.5 mr-1" />
                            Add Size
                        </Button>
                    </div>

                    {variantFields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-[1fr_110px_90px_auto] gap-2 items-start">
                            <Input
                                {...register(`variants.${index}.label` as const, { required: true })}
                                className="bg-app-bg border-app-border"
                                placeholder="e.g. Small"
                            />
                            <Input
                                type="number"
                                step="0.01"
                                {...register(`variants.${index}.price` as const, { valueAsNumber: true, required: true })}
                                className="bg-app-bg border-app-border"
                                placeholder="Price"
                            />
                            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-app-muted h-9 px-2">
                                <input
                                    type="checkbox"
                                    {...register(`variants.${index}.is_default` as const)}
                                />
                                Default
                            </label>
                            <button
                                type="button"
                                onClick={() => removeVariant(index)}
                                className="size-9 rounded-md flex items-center justify-center text-red-500 hover:bg-red-50"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Extras (modifiers) */}
                <div className="space-y-3 border-t border-app-border pt-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <label className="text-xs font-bold text-app-muted uppercase">Extras / Add-ons</label>
                            <p className="text-[11px] text-app-muted mt-0.5">
                                Optional modifiers (e.g. Extra Cheese). Price adds on top of the item.
                            </p>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            className="h-8 px-3 text-xs font-semibold"
                            onClick={() =>
                                appendExtra({
                                    label: "",
                                    price: 0,
                                    is_default: false,
                                    sort_order: extraFields.length,
                                    is_available: true,
                                })
                            }
                        >
                            <Plus className="w-3.5 h-3.5 mr-1" />
                            Add Extra
                        </Button>
                    </div>

                    {extraFields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-[1fr_110px_90px_auto] gap-2 items-start">
                            <Input
                                {...register(`extras.${index}.label` as const, { required: true })}
                                className="bg-app-bg border-app-border"
                                placeholder="e.g. Extra Cheese"
                            />
                            <Input
                                type="number"
                                step="0.01"
                                {...register(`extras.${index}.price` as const, { valueAsNumber: true, required: true })}
                                className="bg-app-bg border-app-border"
                                placeholder="+ Price"
                            />
                            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-app-muted h-9 px-2">
                                <input
                                    type="checkbox"
                                    {...register(`extras.${index}.is_default` as const)}
                                />
                                Default
                            </label>
                            <button
                                type="button"
                                onClick={() => removeExtra(index)}
                                className="size-9 rounded-md flex items-center justify-center text-red-500 hover:bg-red-50"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}

                    {extraFields.length > 0 && (
                        <div className="space-y-1.5 pt-2">
                            <label className="text-[11px] font-bold text-app-muted uppercase">Max extras a customer can pick (blank = no limit)</label>
                            <Input
                                type="number"
                                min={1}
                                {...register("max_extras", {
                                    setValueAs: (v) => (v === "" || v === null ? undefined : Number(v)),
                                })}
                                className="bg-app-bg border-app-border w-32"
                                placeholder="No limit"
                            />
                        </div>
                    )}
                </div>
            </form>
        </SidePanel>
    );
};

export default MenuItemCreatePanel;
