import { useState, useEffect } from "react";
import { ChevronRight, Plus, ListFilter, Loader2 } from "lucide-react";
import { useSearchParams } from "react-router";
import { Button } from "../../components/ui/button";
import CategoryCard from "../../components/categories/CategoryCard";
import CategoryCreatePanel from "../../components/categories/CategoryCreatePanel";
import { useCategories, useDeleteCategory } from "./hooks/useCategories";
import type { Category } from "./service/categories.type";
import { toast } from "sonner";
import { ConfirmDialog } from "../../components/ui/confirm-dialog";

const Categories = () => {
    const [searchParams] = useSearchParams();
    const { data: categories, isLoading, error } = useCategories();
    const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    useEffect(() => {
        const openCreate = searchParams.get("openCreateCategory");
        if (openCreate === "true") {
            setIsPanelOpen(true)
        }
    }, [searchParams]);


    const handleEdit = (id: string | Category) => {
        const category = typeof id === 'string' ? categories?.find(c => c._id === id) : id;
        if (category) {
            setSelectedCategory(category);
            setIsPanelOpen(true);
        }
    };

    const handleDelete = (id: string | Category) => {
        const category = typeof id === 'string' ? categories?.find(c => c._id === id) : id;
        if (category) {
            setCategoryToDelete(category);
        }
    };

    const confirmDelete = () => {
        if (!categoryToDelete) return;
        deleteCategory(categoryToDelete._id, {
            onSuccess: () => {
                toast.success("Category deleted successfully");
                setCategoryToDelete(null);
            },
            onError: (error: any) => {
                toast.error(error?.message || "Failed to delete category");
            }
        });
    };

    const handleAdd = () => {
        setSelectedCategory(null);
        setIsPanelOpen(true);
    };

    return (
        <main className="flex-1 overflow-y-auto p-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-app-muted mb-2 uppercase tracking-widest">
                        <span>Menu</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-app-text">Category Management</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-app-text">Menu Categories</h2>
                    <p className="text-app-muted mt-1 font-medium">Organize and manage your restaurant menu groups.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="flex items-center gap-2 h-9 border-app-border bg-white font-semibold text-sm hover:bg-app-bg transition-colors shadow-sm">
                        <ListFilter className="size-[18px]" />
                        Reorder
                    </Button>
                    <Button
                        onClick={handleAdd}
                        className="flex items-center gap-2 h-9 bg-app-text text-white font-semibold text-sm hover:bg-app-text/90 transition-all shadow-sm"
                    >
                        <Plus className="size-[18px]" />
                        Add Category
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isLoading ? (
                    <div className="col-span-full h-64 flex flex-col items-center justify-center text-app-muted">
                        <Loader2 className="w-8 h-8 animate-spin mb-2" />
                        <p className="font-medium">Loading categories...</p>
                    </div>
                ) : error ? (
                    <div className="col-span-full h-64 flex flex-col items-center justify-center text-red-500">
                        <p className="font-bold text-lg">Failed to load categories</p>
                        <p className="text-sm">Please try again later</p>
                    </div>
                ) : (
                    <>
                        {categories?.map((category: Category) => (
                            <CategoryCard
                                key={category._id}
                                category={category}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}

                        {/* Add New Category Card */}
                        <button
                            onClick={handleAdd}
                            className="border-2 border-dashed border-app-border rounded-xl p-6 flex flex-col items-center justify-center text-center gap-3 hover:border-app-text hover:bg-white transition-all group min-h-[180px]"
                        >
                            <div className="size-10 rounded-full bg-app-bg flex items-center justify-center text-app-muted group-hover:text-app-text group-hover:scale-110 transition-transform">
                                <Plus className="size-6" />
                            </div>
                            <span className="text-sm font-bold text-app-muted group-hover:text-app-text">Add New Category</span>
                        </button>
                    </>
                )}
            </div>

            <CategoryCreatePanel
                open={isPanelOpen}
                onClose={() => {
                    setIsPanelOpen(false);
                    setSelectedCategory(null);
                }}
                categoryToEdit={selectedCategory}
                isEdit={!!selectedCategory}
            />

            <ConfirmDialog
                open={!!categoryToDelete}
                onOpenChange={(open) => !open && setCategoryToDelete(null)}
                title="Delete Category"
                description={`Are you sure you want to delete "${categoryToDelete?.name}"? This action cannot be undone.`}
                confirmText={isDeleting ? "Deleting..." : "Delete"}
                cancelText="Cancel"
                onConfirm={confirmDelete}
                variant="destructive"
            />
        </main>
    );
};

export default Categories;
