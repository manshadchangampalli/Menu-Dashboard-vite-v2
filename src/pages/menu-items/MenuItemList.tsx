import { useState } from "react";
import { ChevronRight, Download, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import ProductsTable from "../../components/menu-items/ProductsTable";
import MenuDetailPanel from "../../components/menu-items/MenuItemDetailPanel";
import ProductCreatePanel from "../../components/products/ProductCreatePanel";
import { useTableQuery } from "../../hooks/useTableFilters";
import { getProducts } from "./service/products.api";
import type { Product } from "./service/products.type";

const MenuItemList = () => {
    const [selectedItem, setSelectedItem] = useState<Product | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const {
        data: response,
        isLoading,
        filters,
        setFilters
    } = useTableQuery(
        "products",
        getProducts,
        {
            limit: 10,
            sortBy: "created_at",
            sortOrder: "desc",
            organization_id: "69948af4435dccf179e3e939"
        }
    );

    return (
        <main className="flex-1 overflow-y-auto p-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-app-muted mb-2 uppercase tracking-widest">
                        <span>Admin</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span>Inventory</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-app-text">Menu Items</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-app-text">Menu Management</h2>
                    <p className="text-app-muted mt-1 font-medium">Configure and manage your restaurant's digital catalog.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="flex items-center gap-2 h-9 border-app-border bg-white font-semibold text-sm hover:bg-app-bg transition-colors shadow-sm">
                        <Download className="size-[18px]" />
                        Export
                    </Button>
                    <Button
                        onClick={() => setIsCreateOpen(true)}
                        className="flex items-center gap-2 h-9 bg-app-text text-white font-semibold text-sm hover:bg-app-text/90 transition-all shadow-sm"
                    >
                        <Plus className="size-[18px]" />
                        Add Item
                    </Button>
                </div>
            </div>

            <div className="bg-white border border-app-border rounded-lg shadow-sm overflow-hidden p-4">
                <ProductsTable
                    data={response?.data ?? []}
                    loading={isLoading}
                    total={response?.meta?.total || 0}
                    totalPages={response?.meta?.totalPages || 1}
                    page={filters.page}
                    onPageChange={(page) => setFilters({ page })}
                    onRowClick={(item) => setSelectedItem(item)}
                    filters={filters}
                    onFilterChange={setFilters}
                />
            </div>

            <MenuDetailPanel
                item={selectedItem}
                open={!!selectedItem}
                onClose={() => setSelectedItem(null)}
            />

            <ProductCreatePanel
                open={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
            />
        </main>
    );
};

export default MenuItemList;

