import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import SidePanel from "../ui/SidePanel";
import { Button } from "../ui/button";
import { Accordion } from "../ui/accordion";
import { X, Save } from "lucide-react";
import { useCreateProduct, useUpdateProduct } from "../../pages/menu-items/hooks/useProducts";
import {
    type CreateProductRequest,
    type Product,
    ProductType,
    SpiceLevel,
} from "../../pages/menu-items/service/products.type";
import { toast } from "sonner";
import {
    BasicInfoSection,
    PricingSection,
    DietarySection,
    NutritionalSection,
    MediaSection,
    TagsSection,
    AllergensSection,
} from "./ProductFormSections";

interface ProductCreatePanelProps {
    open: boolean;
    onClose: () => void;
    isEdit?: boolean;
    initialData?: Product | null;
}

const DEFAULT_VALUES: Partial<CreateProductRequest> = {
    name: "",
    slug: "",
    description: "",
    sku: "",
    type: ProductType.VEG,
    spice_level: SpiceLevel.NONE,
    is_alcohol: false,
    is_featured: false,
    base_price: 0,
    base_tax_rate: 0,
    calories: 0,
    nutritional_info: { protein: 0, carbs: 0, fat: 0, fiber: 0 },
    media: [],
    tags: [],
    allergens: [],
    is_active: true,
    organization_id: "69948af4435dccf179e3e939",
};

const ProductCreatePanel = ({ open, onClose, isEdit = false, initialData }: ProductCreatePanelProps) => {
    const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
    const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
    const isPending = isCreating || isUpdating;

    const {
        control,
        handleSubmit,
        reset,
        register,
        watch,
        setValue,
        formState: { errors },
    } = useForm<CreateProductRequest>({
        defaultValues: DEFAULT_VALUES as CreateProductRequest,
    });

    // Prefill form when opening in edit mode
    useEffect(() => {
        if (open && isEdit && initialData) {
            reset({
                name: initialData.name,
                slug: initialData.slug,
                description: initialData.description,
                sku: initialData.sku,
                type: initialData.type,
                spice_level: initialData.spice_level,
                is_alcohol: initialData.is_alcohol,
                is_featured: initialData.is_featured,
                base_price: initialData.base_price,
                base_tax_rate: initialData.base_tax_rate,
                calories: initialData.calories,
                nutritional_info: initialData.nutritional_info,
                media: initialData.media ?? [],
                tags: initialData.tags ?? [],
                allergens: initialData.allergens ?? [],
                is_active: initialData.is_active,
                organization_id: initialData.organization_id,
            });
        } else if (!open) {
            reset(DEFAULT_VALUES as CreateProductRequest);
        }
    }, [open, isEdit, initialData, reset]);

    const {
        fields: mediaFields,
        append: appendMedia,
        remove: removeMedia,
    } = useFieldArray({ control, name: "media" });

    const {
        fields: tagFields,
        append: appendTag,
        remove: removeTag,
    } = useFieldArray({ control, name: "tags" as any });

    const {
        fields: allergenFields,
        append: appendAllergen,
        remove: removeAllergen,
    } = useFieldArray({ control, name: "allergens" as any });

    const watchedAllergens: string[] = watch("allergens") as string[];

    const toggleAllergen = (allergen: string) => {
        const current = watchedAllergens || [];
        if (current.includes(allergen)) {
            const idx = current.indexOf(allergen);
            removeAllergen(idx);
        } else {
            appendAllergen(allergen as any);
        }
    };

    const onSubmit = (data: CreateProductRequest) => {
        if (isEdit && initialData?._id) {
            updateProduct(
                { id: initialData._id, data },
                {
                    onSuccess: () => {
                        toast.success("Product updated successfully!");
                        onClose();
                    },
                    onError: (error: any) => {
                        toast.error(error?.message || "Failed to update product");
                    },
                }
            );
        } else {
            createProduct(data, {
                onSuccess: () => {
                    toast.success("Product created successfully!");
                    reset();
                    onClose();
                },
                onError: (error: any) => {
                    toast.error(error?.message || "Failed to create product");
                },
            });
        }
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <SidePanel
            open={open}
            onClose={handleClose}
            title={
                <div className="flex items-center justify-between w-full">
                    <div>
                        <h2 className="text-lg font-bold text-app-text">
                            {isEdit ? "Edit Product" : "Add New Product"}
                        </h2>
                        <p className="text-xs text-app-muted mt-0.5">
                            {isEdit
                                ? "Update the details below and save changes."
                                : "Fill in each section to create a new menu item."}
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
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
                        onClick={handleClose}
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
                        {isPending ? (
                            isEdit ? "Saving..." : "Creating..."
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                {isEdit ? "Save Changes" : "Create Product"}
                            </>
                        )}
                    </Button>
                </div>
            }
            className="sm:max-w-xl"
        >
            <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
                <Accordion
                    type="multiple"
                    defaultValue={["basic"]}
                    className="flex flex-col gap-3"
                >
                    <BasicInfoSection control={control} errors={errors} setValue={setValue} />
                    <PricingSection control={control} errors={errors} />
                    <DietarySection control={control} errors={errors} />
                    <NutritionalSection control={control} errors={errors} />
                    <MediaSection
                        control={control}
                        errors={errors}
                        fields={mediaFields}
                        append={appendMedia}
                        remove={removeMedia}
                        register={register}
                    />
                    <TagsSection
                        control={control}
                        errors={errors}
                        fields={tagFields}
                        append={appendTag}
                        remove={removeTag}
                    />
                    <AllergensSection
                        control={control}
                        errors={errors}
                        fields={allergenFields}
                        append={appendAllergen}
                        remove={removeAllergen}
                        watchedAllergens={watchedAllergens}
                        toggleAllergen={toggleAllergen}
                    />
                </Accordion>
            </form>
        </SidePanel>
    );
};

export default ProductCreatePanel;
