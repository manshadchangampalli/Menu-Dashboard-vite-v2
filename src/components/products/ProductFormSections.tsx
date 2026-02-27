import { useState } from "react";
import { Controller, useWatch, type Control, type RegisterOptions, type UseFieldArrayAppend, type UseFieldArrayRemove } from "react-hook-form";
import { CustomInput } from "../ui/CustomInput";
import { CustomSelect } from "../ui/CustomSelect";
import { CustomMediaUpload } from "../ui/CustomMediaUpload";
import { AccordionStep } from "../ui/accordion";
import {
    ShoppingBag,
    DollarSign,
    Flame,
    Info,
    Image,
    Tag,
    AlertTriangle,
    Plus,
    Trash2,
    Box
} from "lucide-react";
import {
    ProductType,
    SpiceLevel,
    MediaType,
    MediaFormat,
    type CreateProductRequest,
} from "../../pages/menu-items/service/products.type";

// ─── Reusable Form Field Wrappers ─────────────────────────────────────────────

interface FormFieldProps {
    name: string;
    control: Control<any>;
    label?: string;
    placeholder?: string;
    rules?: RegisterOptions;
    error?: string;
    className?: string;
}

const FormInput = ({ name, control, label, placeholder, rules, error, ...props }: FormFieldProps & { type?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
            <CustomInput
                {...field}
                {...props}
                label={label ?? ""}
                placeholder={placeholder}
                error={error}
                onChange={(e) => {
                    if (props.type === "number") {
                        const val = e.target.value === "" ? 0 : parseFloat(e.target.value);
                        field.onChange(val);
                    } else {
                        field.onChange(e);
                    }
                    // Call the custom onChange handler if provided
                    if (props.onChange) {
                        props.onChange(e);
                    }
                }}
            />
        )}
    />
);

const FormSelect = ({ name, control, label, options, placeholder, rules, error, transform }: FormFieldProps & { options: { label: string; value: any }[], transform?: { from: (val: any) => string, to: (val: string) => any } }) => (
    <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
            <CustomSelect
                label={label ?? ""}
                options={options}
                value={transform ? transform.from(field.value) : field.value}
                onValueChange={(val) => field.onChange(transform ? transform.to(val) : val)}
                placeholder={placeholder}
                error={error}
            />
        )}
    />
);

const FormMediaUpload = ({ name, control, label, placeholder, rules, error }: FormFieldProps) => (
    <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
            <CustomMediaUpload
                {...field}
                label={label}
                placeholder={placeholder}
                error={error}
            />
        )}
    />
);

// ─── Small reusable sub-components ────────────────────────────────────────────

export const FieldLabel = ({ children }: { children: React.ReactNode }) => (
    <p className="text-xs font-semibold text-app-muted uppercase tracking-wide mb-1.5">
        {children}
    </p>
);

export const AddButton = ({ onClick, label }: { onClick: () => void; label: string }) => (
    <button
        type="button"
        onClick={onClick}
        className="flex items-center gap-1.5 text-xs font-semibold text-app-text border border-dashed border-app-border rounded-md px-3 py-2 hover:bg-app-accent transition-colors w-full justify-center mt-2"
    >
        <Plus className="w-3.5 h-3.5" />
        {label}
    </button>
);

export const RemoveButton = ({ onClick }: { onClick: () => void }) => (
    <button
        type="button"
        onClick={onClick}
        className="size-7 rounded-md flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors shrink-0 mt-6"
    >
        <Trash2 className="w-4 h-4" />
    </button>
);

// ─── Constants ────────────────────────────────────────────────────────────────

const PRODUCT_TYPE_OPTIONS = [
    { label: "Vegetarian", value: ProductType.VEG },
    { label: "Non-Vegetarian", value: ProductType.NON_VEG },
    { label: "Vegan", value: ProductType.VEGAN },
];

const SPICE_LEVEL_OPTIONS = [
    { label: "None", value: SpiceLevel.NONE },
    { label: "Mild", value: SpiceLevel.MILD },
    { label: "Medium", value: SpiceLevel.MEDIUM },
    { label: "Hot", value: SpiceLevel.HOT },
    { label: "Extra Hot", value: SpiceLevel.EXTRA_HOT },
];

const MEDIA_TYPE_OPTIONS = [
    { label: "Image", value: MediaType.IMAGE },
    { label: "Video", value: MediaType.VIDEO },
    { label: "3D", value: MediaType.THREE_D },
];

const MEDIA_FORMAT_OPTIONS = [
    { label: "GLB", value: MediaFormat.GLB },
    { label: "USDZ", value: MediaFormat.USDZ },
];

const COMMON_ALLERGENS = [
    "Gluten", "Dairy", "Eggs", "Nuts", "Peanuts",
    "Soy", "Fish", "Shellfish", "Sesame", "Sulfites",
];

const STATUS_OPTIONS = [
    { label: "Active", value: "true" },
    { label: "Inactive", value: "false" },
];

const YES_NO_OPTIONS = [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
];

const booleanTransform = {
    from: (val: boolean) => (val ? "true" : "false"),
    to: (val: string) => val === "true",
};

// ─── Form Sections ────────────────────────────────────────────────────────────

interface SectionProps {
    control: Control<CreateProductRequest>;
    errors: any;
    setValue?: any;
}

export const BasicInfoSection = ({ control, errors, setValue }: SectionProps) => {
    const slugify = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
    };

    return (
        <AccordionStep
            value="basic"
            stepNumber={1}
            icon={ShoppingBag}
            title="Basic Information"
            description="Name, type, SKU & status"
        >
            <div className="grid gap-4">
                <FormInput
                    name="name"
                    control={control}
                    label="Product Name"
                    placeholder="e.g. Grilled Chicken Burger"
                    rules={{ required: "Product name is required" }}
                    error={errors.name?.message}
                    onChange={(e) => {
                        if (setValue) {
                            setValue("slug", slugify(e.target.value));
                        }
                    }}
                />
                <FormInput
                    name="description"
                    control={control}
                    label="Description"
                    placeholder="Briefly describe the product"
                    error={errors.description?.message}
                />
                <div className="grid grid-cols-2 gap-4">
                    <FormInput
                        name="sku"
                        control={control}
                        label="SKU"
                        placeholder="e.g. BURG-001"
                        error={errors.sku?.message}
                    />
                    <FormInput
                        name="slug"
                        control={control}
                        label="Slug"
                        placeholder="e.g. grilled-chicken-burger"
                        error={errors.slug?.message}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormSelect
                        name="type"
                        control={control}
                        label="Product Type"
                        options={PRODUCT_TYPE_OPTIONS}
                        rules={{ required: "Product type is required" }}
                        placeholder="Select type"
                        error={errors.type?.message}
                    />
                    <FormSelect
                        name="is_active"
                        control={control}
                        label="Status"
                        options={STATUS_OPTIONS}
                        transform={booleanTransform}
                        placeholder="Select status"
                    />
                </div>
            </div>
        </AccordionStep>
    );
};

export const PricingSection = ({ control, errors }: SectionProps) => (
    <AccordionStep
        value="pricing"
        stepNumber={2}
        icon={DollarSign}
        title="Pricing & Tax"
        description="Base price and tax rate"
    >
        <div className="grid grid-cols-2 gap-4">
            <FormInput
                name="base_price"
                control={control}
                label="Base Price (AED)"
                type="number"
                placeholder="0.00"
                rules={{ required: "Price is required", min: { value: 0, message: "Must be ≥ 0" } }}
                error={errors.base_price?.message}
            />
            <FormInput
                name="base_tax_rate"
                control={control}
                label="Tax Rate (%)"
                type="number"
                placeholder="5"
                error={errors.base_tax_rate?.message}
            />
        </div>
    </AccordionStep>
);

export const DietarySection = ({ control }: SectionProps) => (
    <AccordionStep
        value="dietary"
        stepNumber={3}
        icon={Flame}
        title="Dietary Details"
        description="Spice level, calories, featured & alcohol"
    >
        <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
                <FormSelect
                    name="spice_level"
                    control={control}
                    label="Spice Level"
                    options={SPICE_LEVEL_OPTIONS}
                    placeholder="Select spice level"
                />
                <FormInput
                    name="calories"
                    control={control}
                    label="Calories (kcal)"
                    type="number"
                    placeholder="0"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <FormSelect
                    name="is_featured"
                    control={control}
                    label="Featured Item"
                    options={YES_NO_OPTIONS}
                    transform={booleanTransform}
                    placeholder="Is featured?"
                />
                <FormSelect
                    name="is_alcohol"
                    control={control}
                    label="Contains Alcohol"
                    options={YES_NO_OPTIONS}
                    transform={booleanTransform}
                    placeholder="Contains alcohol?"
                />
            </div>
        </div>
    </AccordionStep>
);

export const NutritionalSection = ({ control }: SectionProps) => (
    <AccordionStep
        value="nutrition"
        stepNumber={4}
        icon={Info}
        title="Nutritional Info"
        description="Protein, carbs, fat & fiber"
    >
        <div className="grid grid-cols-2 gap-4">
            {(["protein", "carbs", "fat", "fiber"] as const).map((nutrient) => (
                <FormInput
                    key={nutrient}
                    name={`nutritional_info.${nutrient}`}
                    control={control}
                    label={`${nutrient.charAt(0).toUpperCase() + nutrient.slice(1)} (g)`}
                    type="number"
                    placeholder="0"
                />
            ))}
        </div>
    </AccordionStep>
);

interface MediaItemProps {
    control: Control<CreateProductRequest>;
    index: number;
    field: any;
    remove: UseFieldArrayRemove;
    register: any;
    errors: any;
}

const MediaItem = ({ control, index, field, remove, register, errors }: MediaItemProps) => {
    const [source, setSource] = useState<"upload" | "url">("upload");

    const mediaType = useWatch({
        control,
        name: `media.${index}.type`,
        defaultValue: field.type || MediaType.IMAGE
    });

    return (
        <div className="border border-app-border rounded-lg p-3 grid gap-3 relative bg-white shadow-sm">
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                    <p className="text-xs font-bold text-app-text uppercase tracking-wide">
                        Media {index + 1}
                    </p>
                    <div className="flex bg-app-bg p-0.5 rounded-md border border-app-border">
                        <button
                            type="button"
                            onClick={() => setSource("upload")}
                            className={`px-2 py-0.5 text-[10px] font-bold rounded-sm transition-all ${source === "upload" ? "bg-white text-app-text shadow-sm" : "text-app-muted hover:text-app-text"}`}
                        >
                            Upload
                        </button>
                        <button
                            type="button"
                            onClick={() => setSource("url")}
                            className={`px-2 py-0.5 text-[10px] font-bold rounded-sm transition-all ${source === "url" ? "bg-white text-app-text shadow-sm" : "text-app-muted hover:text-app-text"}`}
                        >
                            URL
                        </button>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => remove(index)}
                    className="size-6 rounded-md flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
            </div>

            {source === "upload" ? (
                <FormMediaUpload
                    name={`media.${index}.url`}
                    control={control}
                    label="Media File"
                    placeholder="Click to upload image or video"
                    rules={{ required: "Media file is required" }}
                    error={(errors.media?.[index] as any)?.url?.message}
                />
            ) : (
                <div className="grid gap-2">
                    <FormInput
                        name={`media.${index}.url`}
                        control={control}
                        label="Media URL"
                        placeholder="https://example.com/image.jpg"
                        rules={{ required: "URL is required" }}
                        error={(errors.media?.[index] as any)?.url?.message}
                    />
                    <Controller
                        name={`media.${index}.url`}
                        control={control}
                        render={({ field: { value } }) => (
                            value ? (
                                <div className="mt-2 rounded-lg border border-app-border overflow-hidden bg-app-bg h-32 flex items-center justify-center">
                                    {value.match(/\.(mp4|webm|ogg)$/) ? (
                                        <video src={value} className="max-h-full max-w-full object-contain" controls />
                                    ) : value.match(/\.(glb|usdz)$/) ? (
                                        <div className="flex flex-col items-center gap-2 text-app-muted">
                                            <Box className="w-8 h-8" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">3D Model Preview</span>
                                        </div>
                                    ) : (
                                        <img
                                            src={value}
                                            alt="Preview"
                                            className="max-h-full max-w-full object-contain"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "https://placehold.co/400x300?text=Invalid+URL";
                                            }}
                                        />
                                    )}
                                </div>
                            ) : <div />
                        )}
                    />
                </div>
            )}

            <div className={`grid gap-3 ${mediaType === MediaType.THREE_D ? "grid-cols-2" : "grid-cols-1"}`}>
                <FormSelect
                    name={`media.${index}.type`}
                    control={control}
                    label="Type"
                    options={MEDIA_TYPE_OPTIONS}
                    placeholder="Select type"
                />
                {mediaType === MediaType.THREE_D && (
                    <FormSelect
                        name={`media.${index}.format`}
                        control={control}
                        label="Format"
                        options={MEDIA_FORMAT_OPTIONS}
                        placeholder="Select format"
                    />
                )}
            </div>
            <div className="grid grid-cols-2 gap-3">
                <FormInput
                    name={`media.${index}.alt_text`}
                    control={control}
                    label="Alt Text"
                    placeholder="Describe the image"
                />
                <FormInput
                    name={`media.${index}.order`}
                    control={control}
                    label="Order"
                    type="number"
                    placeholder="1"
                />
            </div>
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id={`media-primary-${index}`}
                    {...register(`media.${index}.is_primary`)}
                    className="rounded border-app-border accent-app-text"
                />
                <label
                    htmlFor={`media-primary-${index}`}
                    className="text-xs font-medium text-app-text cursor-pointer"
                >
                    Set as primary media
                </label>
            </div>
        </div>
    );
};

interface MediaSectionProps extends SectionProps {
    fields: any[];
    append: UseFieldArrayAppend<CreateProductRequest, "media">;
    remove: UseFieldArrayRemove;
    register: any;
}

export const MediaSection = ({ control, errors, fields, append, remove, register }: MediaSectionProps) => (
    <AccordionStep
        value="media"
        stepNumber={5}
        icon={Image}
        title="Media"
        description="Images, videos or 3D assets"
    >
        <div className="grid gap-4">
            {fields.map((field: any, index: number) => (
                <MediaItem
                    key={field.id}
                    index={index}
                    field={field}
                    control={control}
                    remove={remove}
                    register={register}
                    errors={errors}
                />
            ))}
            <AddButton
                label="Add Media"
                onClick={() =>
                    append({
                        url: "",
                        type: MediaType.IMAGE,
                        format: MediaFormat.GLB,
                        is_primary: false,
                        order: fields.length,
                        alt_text: "",
                    })
                }
            />
        </div>
    </AccordionStep>
);

interface TagsSectionProps extends SectionProps {
    fields: any[];
    append: UseFieldArrayAppend<CreateProductRequest, any>;
    remove: UseFieldArrayRemove;
}

export const TagsSection = ({ control, fields, append, remove }: TagsSectionProps) => (
    <AccordionStep
        value="tags"
        stepNumber={6}
        icon={Tag}
        title="Tags"
        description="Searchable labels for this product"
    >
        <div className="grid gap-2">
            {fields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-2">
                    <div className="flex-1">
                        <FormInput
                            name={`tags.${index}` as any}
                            control={control}
                            label={index === 0 ? "Tag" : ''}
                            placeholder="e.g. spicy, bestseller"
                        />
                    </div>
                    <RemoveButton onClick={() => remove(index)} />
                </div>
            ))}
            <AddButton label="Add Tag" onClick={() => append("" as any)} />
        </div>
    </AccordionStep>
);

interface AllergensSectionProps extends SectionProps {
    fields: any[];
    append: UseFieldArrayAppend<CreateProductRequest, any>;
    remove: UseFieldArrayRemove;
    watchedAllergens: string[];
    toggleAllergen: (allergen: string) => void;
}

export const AllergensSection = ({ control, fields, append, remove, watchedAllergens, toggleAllergen }: AllergensSectionProps) => (
    <AccordionStep
        value="allergens"
        stepNumber={7}
        icon={AlertTriangle}
        title="Allergens"
        description="Select all allergens present in this product"
    >
        <div className="grid gap-3">
            <FieldLabel>Common Allergens (tap to toggle)</FieldLabel>
            <div className="flex flex-wrap gap-2">
                {COMMON_ALLERGENS.map((allergen) => {
                    const isSelected = (watchedAllergens || []).includes(allergen);
                    return (
                        <button
                            key={allergen}
                            type="button"
                            onClick={() => toggleAllergen(allergen)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${isSelected
                                ? "bg-app-text text-white border-app-text"
                                : "bg-white text-app-muted border-app-border hover:border-app-text hover:text-app-text"
                                }`}
                        >
                            {allergen}
                        </button>
                    );
                })}
            </div>
            <div className="border-t border-app-border pt-3 grid gap-2">
                <FieldLabel>Custom Allergens</FieldLabel>
                {fields
                    .filter((_, i) => !COMMON_ALLERGENS.includes((watchedAllergens || [])[i]))
                    .map((field) => {
                        const actualIndex = fields.indexOf(field);
                        return (
                            <div key={field.id} className="flex items-start gap-2">
                                <div className="flex-1">
                                    <FormInput
                                        name={`allergens.${actualIndex}` as any}
                                        control={control}
                                        label="Custom Allergen"
                                        placeholder="e.g. Mustard"
                                    />
                                </div>
                                <RemoveButton onClick={() => remove(actualIndex)} />
                            </div>
                        );
                    })}
                <AddButton
                    label="Add Custom Allergen"
                    onClick={() => append("" as any)}
                />
            </div>
        </div>
    </AccordionStep>
);
