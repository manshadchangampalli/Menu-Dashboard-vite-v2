import { Edit2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import type { Category } from "../../pages/categories/service/categories.type";
import { getCategoryIcon } from "../../pages/categories/service/categories.type";
import { useUpdateCategory } from "../../pages/categories/hooks/useCategories";
import { toast } from "sonner";

interface CategoryCardProps {
    category: Category;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

const CategoryCard = ({ category, onEdit, onDelete }: CategoryCardProps) => {
    const Icon = getCategoryIcon(category.icon);
    const { mutate: updateCategory, isPending: isToggling } = useUpdateCategory();

    const handleToggleStatus = (checked: boolean) => {
        updateCategory(
            { id: category._id, data: { isActive: checked } },
            {
                onSuccess: () => {
                    toast.success(`Category ${checked ? "activated" : "deactivated"} successfully`);
                },
                onError: (error: any) => {
                    toast.error(error?.message || "Failed to update category status");
                },
            }
        );
    };

    return (
        <div className="bg-white border border-app-border rounded-xl p-6 shadow-sm hover:border-app-text transition-all group flex flex-col justify-between min-h-[180px]">
            <div>
                <div className="flex items-start justify-between mb-4">
                    <div className="size-12 rounded-lg bg-app-bg border border-app-border flex items-center justify-center text-app-text">
                        <Icon className="size-6" />
                    </div>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-app-muted hover:text-app-text rounded-md"
                            onClick={() => onEdit?.(category._id)}
                        >
                            <Edit2 className="size-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-app-muted hover:text-red-600 rounded-md"
                            onClick={() => onDelete?.(category._id)}
                        >
                            <Trash2 className="size-4" />
                        </Button>
                    </div>
                </div>
                <h3 className="font-bold text-lg text-app-text mb-1">{category.name}</h3>
                <p className="text-sm text-app-muted font-medium">{category.itemCount} Menu Items</p>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-app-border pt-4">
                <span className="text-xs font-bold uppercase tracking-wider text-app-muted">Availability</span>
                <Switch
                    checked={category.isActive}
                    onCheckedChange={handleToggleStatus}
                    disabled={isToggling}
                />
            </div>
        </div>
    );
};

export default CategoryCard;
