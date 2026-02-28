import { useMemo } from "react";
import { DataTable, type Column } from "../ui/data-table";
import { Switch } from "../ui/switch";
import type { MenuItem } from "../../pages/menu-items/menuItems.type";
import { type TableFilters } from "../../hooks/useTableFilters";
import { toast } from "sonner";

interface MenuItemsTableProps {
    data: MenuItem[];
    loading?: boolean;
    total?: number;
    totalPages?: number;
    page?: number;
    onPageChange?: (page: number) => void;
    filters: TableFilters;
    onFilterChange: (newFilters: Partial<TableFilters>) => void;
    hideSearch?: boolean;
}

const MenuItemsTable = ({
    data,
    loading,
    total,
    totalPages,
    page,
    onPageChange,
    filters,
    onFilterChange,
    hideSearch
}: MenuItemsTableProps) => {
    // const queryClient = useQueryClient();
    // const [itemToToggle, setItemToToggle] = useState<MenuItem | null>(null);

    // Note: status toggle mutation would normally go here
    // For now we'll mock the success as the logic is similar to ProductsTable

    const columns: Column<MenuItem>[] = [
        {
            header: "Product",
            accessorKey: "product_id",
            cell: (item) => (
                <div className="flex items-center gap-4 py-1">
                    <div className="size-10 rounded-md border border-app-border bg-app-bg overflow-hidden shrink-0 flex items-center justify-center">
                       <span className="text-[10px] text-app-muted font-bold text-center">ITEM</span>
                    </div>
                    <div>
                        <div className="text-sm font-bold text-app-text">{item.product_id.name}</div>
                        <div className="text-[10px] text-app-muted font-bold uppercase tracking-tighter">{item.product_id.type}</div>
                    </div>
                </div>
            )
        },
        {
            header: "Base Price",
            accessorKey: "base_price",
            cell: (item) => <span className="text-sm font-medium text-app-text">{item.base_price} AED</span>
        },
        {
            header: "Selling Price",
            accessorKey: "selling_price",
            cell: (item) => <span className="text-sm font-bold text-app-text">{item.selling_price} AED</span>
        },
        {
            header: "Status",
            accessorKey: "is_available",
            cell: (item) => (
                <div className="flex items-center gap-3">
                    <Switch
                        checked={item.is_available}
                        onCheckedChange={() => {
                            // Logic for toggling status
                            toast.info("Status toggle feature coming soon for menu items table component");
                        }}
                    />
                    <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${item.is_available ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                        {item.is_available ? 'AVAILABLE' : 'OUT OF STOCK'}
                    </div>
                </div>
            )
        }
    ];

    const mappedData = useMemo(() => {
        return data.map(item => ({
            ...item,
            id: item._id
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
            hideSearch={hideSearch}
        />
    );
};

export default MenuItemsTable;
