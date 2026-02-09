import { useState } from "react";
import { ChevronRight, Plus, ListFilter } from "lucide-react";
import { Button } from "../../components/ui/button";
import CategoryCard from "../../components/categories/CategoryCard";
import { MOCK_CATEGORIES } from "./categories.config";
import type { Category } from "./categories.type";

const Categories = () => {
    // In a real app, this would come from an API
    const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);

    const handleToggleStatus = (id: string, status: boolean) => {
        setCategories(prev => prev.map(cat => 
            cat.id === id ? { ...cat, isActive: status } : cat
        ));
    };

    const handleEdit = (id: string) => {
        console.log("Edit category", id);
        // Implement edit logic/modal here
    };

    const handleDelete = (id: string) => {
        console.log("Delete category", id);
        // Implement delete logic/confirmation here
    };

    const handleAdd = () => {
        console.log("Add new category");
        // Implement add logic/modal here
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
                {categories.map((category) => (
                    <CategoryCard 
                        key={category.id} 
                        category={category}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onToggleStatus={handleToggleStatus}
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
            </div>
        </main>
    );
};

export default Categories;
