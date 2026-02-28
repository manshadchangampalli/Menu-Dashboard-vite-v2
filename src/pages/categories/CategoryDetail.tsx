import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ChevronRight, ArrowLeft, Loader2, Edit2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useCategory } from "./hooks/useCategories";
import { getCategoryIcon } from "./service/categories.type";
import MenuItemsTable from "../../components/menu-items/MenuItemsTable";
import { useTableQuery } from "../../hooks/useTableFilters";
import { getMenuItems } from "../menu-items/service/menuItems.api";
import CategoryCreatePanel from "../../components/categories/CategoryCreatePanel";
import MenuItemCreatePanel from "../../components/menu-items/MenuItemCreatePanel";

const CategoryDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isAddItemOpen, setIsAddItemOpen] = useState(false);

    const { data: category, isLoading: isCategoryLoading, isError } = useCategory(id);

    const {
        data: itemsResponse,
        isLoading: isItemsLoading,
        filters,
        setFilters
    } = useTableQuery(
        `category-items-${id}`,
        getMenuItems,
        {
            limit: 10,
            categoryId: id,
            organization_id: "69948af4435dccf179e3e939"
        }
    );

    if (isCategoryLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-app-text" />
                <p className="text-sm font-bold text-app-muted uppercase tracking-widest">Loading category details...</p>
            </div>
        );
    }

    if (isError || !category) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center px-4">
                <h2 className="text-2xl font-bold text-app-text mb-2">Category Not Found</h2>
                <Button variant="outline" className="font-bold gap-2" onClick={() => navigate("/categories")}>
                    <ArrowLeft className="w-4 h-4" />
                    Back to Categories
                </Button>
            </div>
        );
    }

    const Icon = getCategoryIcon(category.icon);

    return (
        <main className="flex-1 overflow-y-auto bg-app-bg min-h-full pb-10">
            {/* Header Section */}
            <div className="bg-white border-b border-app-border">
                <div className="mx-auto px-8 py-6">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-app-muted mb-4 uppercase tracking-widest">
                        <span className="cursor-pointer hover:text-app-text transition-colors" onClick={() => navigate("/categories")}>Categories</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-app-text">{category.name}</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="size-16 rounded-xl bg-app-bg border border-app-border flex items-center justify-center text-app-text shrink-0 shadow-sm">
                                <Icon className="size-8" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight text-app-text mb-1">{category.name}</h1>
                                <div className="flex items-center gap-3">
                                    <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${category.isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                        {category.isActive ? 'ACTIVE' : 'INACTIVE'}
                                    </div>
                                    <span className="text-xs text-app-muted font-bold uppercase tracking-widest">{category.itemCount || 0} Menu Items</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                            <Button variant="outline" className="gap-2 font-semibold" onClick={() => setIsEditOpen(true)}>
                                <Edit2 className="w-4 h-4" />
                                Edit Category
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto px-8 py-8 space-y-8">
                <div className="bg-white border border-app-border rounded-lg shadow-sm overflow-hidden p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-app-text">Menu Items in this Category</h3>
                        <Button
                            onClick={() => setIsAddItemOpen(true)}
                            className="bg-app-text text-white hover:bg-app-text/90 font-bold"
                        >
                            Add Item
                        </Button>
                    </div>

                    <MenuItemsTable
                        data={itemsResponse?.data ?? []}
                        loading={isItemsLoading}
                        total={itemsResponse?.meta?.total || 0}
                        totalPages={itemsResponse?.meta?.totalPages || 1}
                        page={filters.page}
                        onPageChange={(page) => setFilters({ page })}
                        filters={filters}
                        onFilterChange={setFilters}
                        hideSearch={true}
                    />
                </div>
            </div>

            <CategoryCreatePanel
                open={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                categoryToEdit={category}
                isEdit={true}
            />

            <MenuItemCreatePanel
                open={isAddItemOpen}
                onClose={() => setIsAddItemOpen(false)}
                categoryId={id!}
                menuId={category.menuId || ""}
                branchId={category.branch_id || ""}
            />
        </main>
    );
};

export default CategoryDetail;
