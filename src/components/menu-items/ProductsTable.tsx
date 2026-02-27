import { useMemo } from "react";
import { DataTable, type Column } from "../ui/data-table";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { ProductType, type Product } from "../../pages/menu-items/service/products.type";
import { Edit2, Trash2, Filter } from "lucide-react";
import { CustomSelect } from "../ui/CustomSelect";
import { type TableFilters } from "../../hooks/useTableFilters";

interface ProductsTableProps {
    data: Product[];
    loading?: boolean;
    total?: number;
    totalPages?: number;
    page?: number;
    onPageChange?: (page: number) => void;
    onEdit?: (product: Product) => void;
    onRowClick?: (product: Product) => void;
    filters: TableFilters;
    onFilterChange: (newFilters: Partial<TableFilters>) => void;
}

const ProductsTable = ({
    data,
    loading,
    total,
    totalPages,
    page,
    onPageChange,
    onEdit,
    onRowClick,
    filters,
    onFilterChange
}: ProductsTableProps) => {

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    const getTypeStyle = (type: ProductType) => {
        switch (type) {
            case ProductType.VEG: return "bg-emerald-100 text-emerald-800 border-emerald-200";
            case ProductType.NON_VEG: return "bg-rose-100 text-rose-800 border-rose-200";
            case ProductType.VEGAN: return "bg-green-100 text-green-800 border-green-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const columns: Column<Product>[] = [
        {
            header: "Product Name",
            accessorKey: "name",
            cell: (product) => (
                <div className="flex items-center gap-4 py-1">
                    <div className="size-12 rounded-md border border-app-border bg-app-bg overflow-hidden shrink-0 flex items-center justify-center">
                        {product.media && product.media.length > 0 ? (
                            <img
                                src={product.media[0].url}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="text-[10px] text-app-muted font-bold text-center p-1">No Image</div>
                        )}
                    </div>
                    <div>
                        <div className="text-sm font-bold text-app-text">{product.name}</div>
                        <div className="text-[10px] text-app-muted font-bold uppercase tracking-tighter">{product.sku}</div>
                    </div>
                </div>
            )
        },
        {
            header: "Type",
            accessorKey: "type",
            cell: (product) => (
                <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getTypeStyle(product.type)}`}>
                    {product.type.replace('_', ' ')}
                </span>
            )
        },
        {
            header: "Base Price",
            accessorKey: "base_price",
            cell: (product) => <span className="text-sm font-bold text-app-text">{formatPrice(product.base_price)}</span>
        },
        {
            header: "Slug",
            accessorKey: "slug",
            cell: (product) => (
                <span className="text-xs font-mono text-app-muted">{product.slug}</span>
            )
        },
        {
            header: "SKU",
            accessorKey: "sku",
            cell: (product) => (
                <span className="text-xs font-mono font-semibold text-app-text">{product.sku}</span>
            )
        },
        {
            header: "Status",
            accessorKey: "is_active",
            cell: (product) => (
                <div className="flex items-center gap-3">
                    <Switch
                        checked={product.is_active}
                        onCheckedChange={(checked) => console.log(`Toggle ${product._id}`, checked)}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${product.is_active ? "text-emerald-600" : "text-app-muted"}`}>
                        {product.is_active ? "Active" : "Inactive"}
                    </span>
                </div>
            )
        },
        {
            header: "Actions",
            accessorKey: "_id",
            className: "text-right",
            cell: (product) => (
                <div className="flex items-center gap-1 justify-end">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-app-muted hover:text-app-text hover:bg-app-accent"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit?.(product);
                        }}
                    >
                        <Edit2 className="size-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-app-muted hover:text-red-500 hover:bg-red-50"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Handle delete
                        }}
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>
            )
        }
    ];

    const mappedData = useMemo(() => {
        return data.map(item => ({
            ...item,
            id: item._id // DataTable expects 'id' property
        }));
    }, [data]);

    return (
        <DataTable
            columns={columns}
            data={mappedData}
            loading={loading}
            total={total}
            totalPages={totalPages}
            page={page}
            onPageChange={onPageChange}
            search={filters.query}
            onSearchChange={(query) => onFilterChange({ query })}
            sortBy={filters.sortBy}
            sortOrder={filters.sortOrder}
            onSortChange={(sortBy, sortOrder) => onFilterChange({ sortBy: sortOrder ? sortBy : undefined, sortOrder })}
            onRowClick={onRowClick}
            actions={
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-app-bg rounded-md border border-app-border mr-2 font-bold text-[10px] uppercase text-app-muted">
                        <Filter className="size-3" />
                        Filters
                    </div>
                    <div className="w-32">
                        <CustomSelect
                            label=""
                            value={filters.type || "all"}
                            onValueChange={(value) => onFilterChange({ type: value === "all" ? undefined : value })}
                            options={[
                                { label: "All Types", value: "all" },
                                { label: "Veg", value: ProductType.VEG },
                                { label: "Non-Veg", value: ProductType.NON_VEG },
                                { label: "Vegan", value: ProductType.VEGAN },
                            ]}
                            placeholder="Type"
                        />
                    </div>
                    <div className="w-32">
                        <CustomSelect
                            label=""
                            value={filters.is_active === undefined ? "all" : String(filters.is_active)}
                            onValueChange={(value) => onFilterChange({ is_active: value === "all" ? undefined : value === "true" })}
                            options={[
                                { label: "All Status", value: "all" },
                                { label: "Active", value: "true" },
                                { label: "Inactive", value: "false" },
                            ]}
                            placeholder="Status"
                        />
                    </div>
                    <div className="w-32">
                        <CustomSelect
                            label=""
                            value={filters.is_featured === undefined ? "all" : String(filters.is_featured)}
                            onValueChange={(value) => onFilterChange({ is_featured: value === "all" ? undefined : value === "true" })}
                            options={[
                                { label: "All Featured", value: "all" },
                                { label: "Featured", value: "true" },
                                { label: "Standard", value: "false" },
                            ]}
                            placeholder="Featured"
                        />
                    </div>
                </div>
            }
        />
    );
};

export default ProductsTable;
