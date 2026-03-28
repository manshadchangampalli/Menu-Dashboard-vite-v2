import { useForm, Controller, useFieldArray } from "react-hook-form";
import SidePanel from "../ui/SidePanel";
import { Button } from "../ui/button";
import { CustomInput } from "../ui/CustomInput";
import { CustomSelect } from "../ui/CustomSelect";
import { FormSection } from "../ui/FormSection";
import { X, Save, User, ShoppingBag, Plus, Trash2, ClipboardList } from "lucide-react";
import { useCreateOrder } from "../../pages/orders/hooks/useOrders";
import { useBranches } from "../../pages/branches/hooks/useBranches";
import { useMenuItems } from "../../pages/menu-items/hooks/useMenuItems";
import { type CreateOrderRequest } from "../../pages/orders/service/order.api";
import { toast } from "sonner";
import { useEffect } from "react";

interface OrderCreatePanelProps {
    open: boolean;
    onClose: () => void;
}

const DEFAULT_VALUES: Partial<CreateOrderRequest> = {
    customer_name: "",
    customer_phone: "",
    table_number: "",
    notes: "",
    branch_id: "",
    items: [
        {
            menu_item_id: "",
            name: "",
            quantity: 1,
            unit_price: 0,
        }
    ],
};

const OrderCreatePanel = ({ open, onClose }: OrderCreatePanelProps) => {
    const { mutate: createOrder, isPending } = useCreateOrder();
    const { data: branchesResponse } = useBranches({ limit: 100 });
    const { data: menuItemsResponse } = useMenuItems({ limit: 1000 });

    const branchOptions = branchesResponse?.data?.map((b: any) => ({
        label: b.name,
        value: b._id || b.id,
    })) || [];

    const menuItemOptions = menuItemsResponse?.data?.map((m: any) => ({
        label: m.product_id?.name || "Unknown Item",
        value: m._id,
        price: m.selling_price || 0,
        name: m.product_id?.name || "Unknown Item",
    })) || [];

    const {
        control,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<CreateOrderRequest>({
        defaultValues: DEFAULT_VALUES as CreateOrderRequest,
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    const items = watch("items");
    const totalAmount = items?.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0) || 0;

    useEffect(() => {
        if (open) {
            reset(DEFAULT_VALUES as CreateOrderRequest);
        }
    }, [open, reset]);

    const handleMenuItemChange = (index: number, menuItemId: string) => {
        const selected = menuItemOptions.find(opt => opt.value === menuItemId);
        if (selected) {
            setValue(`items.${index}.name`, selected.name);
            setValue(`items.${index}.unit_price`, selected.price);
        }
    };

    const onSubmit = (data: CreateOrderRequest) => {
        if (!data.items || data.items.length === 0) {
            toast.error("Please add at least one item to the order");
            return;
        }

        // Validate items
        const invalidItem = data.items.find(item => !item.menu_item_id || item.quantity <= 0);
        if (invalidItem) {
            toast.error("Please ensure all items have a selection and valid quantity");
            return;
        }

        createOrder(data, {
            onSuccess: () => {
                toast.success("Order created successfully!");
                onClose();
            },
            onError: (error: any) => {
                toast.error(error?.message || "Failed to create order");
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
                        <h2 className="text-lg font-bold text-app-text">Create Walk-in Order</h2>
                        <p className="text-xs text-app-muted mt-0.5">Fill in the details to place a new order.</p>
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
                                Create Order
                            </>
                        )}
                    </Button>
                </div>
            }
            className="sm:max-w-2xl"
        >
            <form className="p-6 space-y-8" onSubmit={handleSubmit(onSubmit)}>
                <FormSection title="Customer info" icon={User}>
                    <div className="grid grid-cols-2 gap-4">
                        <Controller
                            name="customer_name"
                            control={control}
                            render={({ field }: { field: any }) => (
                                <CustomInput
                                    {...field}
                                    label="Customer Name"
                                    placeholder="e.g. John Doe"
                                    error={errors.customer_name?.message}
                                />
                            )}
                        />
                        <Controller
                            name="customer_phone"
                            control={control}
                            render={({ field }: { field: any }) => (
                                <CustomInput
                                    {...field}
                                    label="Phone Number"
                                    placeholder="9876543210"
                                    error={errors.customer_phone?.message}
                                />
                            )}
                        />
                    </div>
                </FormSection>

                <FormSection title="Dining Details" icon={ClipboardList}>
                   <div className="grid grid-cols-2 gap-4">
                        <Controller
                            name="branch_id"
                            control={control}
                            rules={{ required: "Branch is required" }}
                            render={({ field }: { field: any }) => (
                                <CustomSelect
                                    label="Branch"
                                    options={branchOptions}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    placeholder="Select Branch"
                                    error={errors.branch_id?.message}
                                />
                            )}
                        />
                        <Controller
                            name="table_number"
                            control={control}
                            render={({ field }: { field: any }) => (
                                <CustomInput
                                    {...field}
                                    label="Table Number"
                                    placeholder="e.g. 5"
                                    error={errors.table_number?.message}
                                />
                            )}
                        />
                   </div>
                </FormSection>

                <FormSection title="Order Items" icon={ShoppingBag}>
                    <div className="space-y-4">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex gap-3 items-end p-4 bg-app-bg border border-app-border rounded-lg relative group">
                                <div className="flex-1">
                                    <Controller
                                        name={`items.${index}.menu_item_id`}
                                        control={control}
                                        rules={{ required: "Required" }}
                                        render={({ field: fieldProps }: { field: any }) => (
                                            <CustomSelect
                                                label="Menu Item"
                                                options={menuItemOptions}
                                                value={fieldProps.value}
                                                onValueChange={(val) => {
                                                    fieldProps.onChange(val);
                                                    handleMenuItemChange(index, val);
                                                }}
                                                placeholder="Select Item"
                                            />
                                        )}
                                    />
                                </div>
                                <div className="w-24">
                                    <Controller
                                        name={`items.${index}.quantity`}
                                        control={control}
                                        rules={{ required: "Required", min: 1 }}
                                        render={({ field: fieldProps }: { field: any }) => (
                                            <CustomInput
                                                {...fieldProps}
                                                label="Qty"
                                                type="number"
                                                min={1}
                                                onChange={(e) => fieldProps.onChange(parseInt(e.target.value) || 1)}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="w-28">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-bold text-app-muted uppercase">Price</label>
                                        <div className="h-10 flex items-center px-3 bg-white border border-app-border rounded-md text-sm font-bold text-app-text">
                                            ${(items[index]?.unit_price || 0).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                                {fields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="size-10 rounded-md border border-app-border flex items-center justify-center text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full border-dashed border-2 border-app-border text-app-muted hover:text-app-text hover:border-app-text h-11 transition-all"
                            onClick={() => append({ menu_item_id: "", name: "", quantity: 1, unit_price: 0 })}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Another Item
                        </Button>
                    </div>
                </FormSection>

                <FormSection title="Additional Notes" icon={ClipboardList}>
                    <Controller
                        name="notes"
                        control={control}
                        render={({ field }: { field: any }) => (
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-app-muted uppercase italic">Special Instructions</label>
                                <textarea
                                    {...field}
                                    placeholder="Any special requests or allergies?"
                                    className="min-h-[100px] w-full rounded-md border border-app-border p-3 text-sm font-medium focus:ring-1 focus:ring-app-text outline-none transition-all"
                                />
                            </div>
                        )}
                    />
                </FormSection>

                <div className="p-4 bg-app-text text-white rounded-xl shadow-lg flex justify-between items-center mt-4">
                    <span className="text-sm font-bold opacity-80">ESTIMATED TOTAL</span>
                    <span className="text-2xl font-black">${totalAmount.toFixed(2)}</span>
                </div>
            </form>
        </SidePanel>
    );
};

export default OrderCreatePanel;
