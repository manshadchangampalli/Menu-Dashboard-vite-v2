import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Check, Plus, Save, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import SidePanel from "../ui/SidePanel";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
    useMenuItem,
    useUpdateMenuItem,
} from "../../pages/menu-items/hooks/useMenuItems";
import type { UpdateMenuItemRequest } from "../../pages/menu-items/menuItems.type";

interface MenuItemEditPanelProps {
    open: boolean;
    onClose: () => void;
    menuItemId: string | null;
}

const DEFAULT_VALUES: UpdateMenuItemRequest = {
    base_price: 0,
    selling_price: 0,
    is_available: true,
    is_featured: false,
    variants: [],
    extras: [],
    max_extras: undefined,
};

const MenuItemEditPanel = ({ open, onClose, menuItemId }: MenuItemEditPanelProps) => {
    const { data: response, isLoading } = useMenuItem(open ? menuItemId : null);
    const item = response?.data;
    const { mutate: updateMenuItem, isPending: isSaving } = useUpdateMenuItem();

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isDirty },
    } = useForm<UpdateMenuItemRequest>({ defaultValues: DEFAULT_VALUES });

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

    useEffect(() => {
        if (!open) return;
        if (item) {
            reset({
                base_price: item.base_price,
                selling_price: item.selling_price,
                is_available: item.is_available,
                is_featured: item.is_featured,
                variants: item.variants ?? [],
                extras: item.extras ?? [],
                max_extras: item.max_extras,
            });
        } else {
            reset(DEFAULT_VALUES);
        }
    }, [open, item, reset]);

    const onSubmit = (data: UpdateMenuItemRequest) => {
        if (!menuItemId) return;
        updateMenuItem(
            { id: menuItemId, data },
            {
                onSuccess: () => {
                    toast.success("Menu item updated");
                    onClose();
                },
                onError: (err: unknown) => {
                    const message =
                        err && typeof err === "object" && "message" in err
                            ? String((err as { message?: unknown }).message)
                            : "Failed to update menu item";
                    toast.error(message);
                },
            },
        );
    };

    const productName = item?.product_id?.name ?? "Unlinked product";
    const productType = item?.product_id?.type ?? "—";

    return (
        <SidePanel
            open={open}
            onClose={onClose}
            title={
                <div className="flex items-center justify-between w-full">
                    <div className="min-w-0">
                        <h2 className="text-lg font-bold text-app-text truncate">{productName}</h2>
                        <p className="text-xs text-app-muted mt-0.5 uppercase tracking-wider">{productType}</p>
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
                        disabled={isSaving || !isDirty || !item}
                        type="submit"
                    >
                        {isSaving ? "Saving..." : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Save changes
                            </>
                        )}
                    </Button>
                </div>
            }
            className="sm:max-w-lg"
        >
            {isLoading || !item ? (
                <div className="p-6 text-sm text-app-muted font-medium">Loading menu item…</div>
            ) : (
                <form className="p-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-app-muted uppercase">Base Price (AED)</label>
                            <Input
                                type="number"
                                step="0.01"
                                {...register("base_price", { valueAsNumber: true, min: 0 })}
                                className="bg-app-bg border-app-border"
                                placeholder="0.00"
                            />
                            {errors.base_price && (
                                <p className="text-[10px] text-red-500 font-bold">{errors.base_price.message}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-app-muted uppercase">Selling Price (AED)</label>
                            <Input
                                type="number"
                                step="0.01"
                                {...register("selling_price", { valueAsNumber: true, min: 0 })}
                                className="bg-white border-app-border font-bold text-app-text"
                                placeholder="0.00"
                            />
                            {errors.selling_price && (
                                <p className="text-[10px] text-red-500 font-bold">{errors.selling_price.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <label className="flex items-center gap-2 p-3 rounded-lg bg-app-bg border border-app-border cursor-pointer">
                            <input type="checkbox" {...register("is_available")} className="size-4" />
                            <div>
                                <div className="text-xs font-bold text-app-text uppercase">Available</div>
                                <div className="text-[10px] text-app-muted">Visible to customers</div>
                            </div>
                        </label>
                        <label className="flex items-center gap-2 p-3 rounded-lg bg-app-bg border border-app-border cursor-pointer">
                            <input type="checkbox" {...register("is_featured")} className="size-4" />
                            <div>
                                <div className="text-xs font-bold text-app-text uppercase">Featured</div>
                                <div className="text-[10px] text-app-muted">Highlight on menu</div>
                            </div>
                        </label>
                    </div>

                    <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100 space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="size-5 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                                <Check className="size-3" />
                            </div>
                            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                                Linked product
                            </span>
                        </div>
                        <p className="text-xs text-emerald-700 font-medium leading-relaxed">
                            To switch the product or category, remove this menu item and add a new one.
                        </p>
                    </div>

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
                                    {...register(`variants.${index}.price` as const, {
                                        valueAsNumber: true,
                                        required: true,
                                    })}
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
                                    {...register(`extras.${index}.price` as const, {
                                        valueAsNumber: true,
                                        required: true,
                                    })}
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
                                <label className="text-[11px] font-bold text-app-muted uppercase">
                                    Max extras a customer can pick (blank = no limit)
                                </label>
                                <Input
                                    type="number"
                                    min={1}
                                    {...register("max_extras", {
                                        setValueAs: (v) =>
                                            v === "" || v === null ? undefined : Number(v),
                                    })}
                                    className="bg-app-bg border-app-border w-32"
                                    placeholder="No limit"
                                />
                            </div>
                        )}
                    </div>
                </form>
            )}
        </SidePanel>
    );
};

export default MenuItemEditPanel;
