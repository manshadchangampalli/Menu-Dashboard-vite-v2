import { useState } from "react";
import { ChevronRight, Download, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import ProductsTable from "../../components/menu-items/ProductsTable";
import ProductDetailPanel from "../../components/menu-items/ProductDetailPanel";
import ProductCreatePanel from "../../components/products/ProductCreatePanel";
import { useTableQuery } from "../../hooks/useTableFilters";
import { getProducts } from "./service/products.api";
import type { Product } from "./service/products.type";
import { useDownloadProducts } from "./hooks/useProducts";
import { toast } from "sonner";

const MenuItemList = () => {
    const [selectedItem, setSelectedItem] = useState<Product | null>(null);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const { mutate: downloadProducts, isPending: isExporting } = useDownloadProducts();

    const handleExport = () => {
        downloadProducts(undefined, {
            onSuccess: (blob) => {
                const url = window.URL.createObjectURL(new Blob([blob as any]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `products-export-${new Date().toISOString().split('T')[0]}.csv`);
                document.body.appendChild(link);
                link.click();
                link.parentNode?.removeChild(link);
                window.URL.revokeObjectURL(url);
                toast.success("Products exported successfully");
            },
            onError: (error: any) => {
                toast.error(error?.message || "Failed to export products");
            }
        });
    };

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

    const handleEdit = (product: Product) => {
        setSelectedItem(null);   // close detail panel if open
        setProductToEdit(product);
        setIsCreateOpen(true);
    };

    return (
        <main className="flex-1 overflow-y-auto p-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-app-muted mb-2 uppercase tracking-widest">
                        <span>Admin</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span>Inventory</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-app-text">Product Catalog</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-app-text">Product Catalog</h2>
                    <p className="text-app-muted mt-1 font-medium">Manage your master inventory items and configurations.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 h-9 border-app-border bg-white font-semibold text-sm hover:bg-app-bg transition-colors shadow-sm"
                        onClick={handleExport}
                        disabled={isExporting}
                    >
                        <Download className="size-[18px]" />
                        {isExporting ? "Exporting..." : "Export"}
                    </Button>
                    <Button
                        onClick={() => {
                            setProductToEdit(null);
                            setIsCreateOpen(true);
                        }}
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
                    onEdit={handleEdit}
                    filters={filters}
                    onFilterChange={setFilters}
                />
            </div>

            <ProductDetailPanel
                item={selectedItem}
                open={!!selectedItem}
                onClose={() => setSelectedItem(null)}
                onEdit={handleEdit}
            />

            <ProductCreatePanel
                open={isCreateOpen}
                onClose={() => {
                    setIsCreateOpen(false);
                    setProductToEdit(null);
                }}
                isEdit={!!productToEdit}
                initialData={productToEdit}
            />
        </main>
    );
};

export default MenuItemList;
