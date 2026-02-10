import { DataTable, type Column } from "../ui/data-table";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import type { MenuItem } from "../../pages/menu-items/menuItems.type";
import { Edit2, Trash2 } from "lucide-react";

interface MenuTableProps {
    data: MenuItem[];
    onRowClick?: (item: MenuItem) => void;
}

const MenuItemTable = ({ data, onRowClick }: MenuTableProps) => {

    // Format price to currency
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    // Category Styles
    const getCategoryStyle = (category: string) => {
        switch (category) {
            case "Appetizers": return "bg-orange-100 text-orange-800 border-orange-200";
            case "Main Course": return "bg-blue-100 text-blue-800 border-blue-200";
            case "Desserts": return "bg-pink-100 text-pink-800 border-pink-200";
            case "Beverages": return "bg-purple-100 text-purple-800 border-purple-200";
            case "Sides": return "bg-yellow-100 text-yellow-800 border-yellow-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const columns: Column<MenuItem>[] = [
        {
            header: "Product Name",
            accessorKey: "name",
            cell: (item) => (
                <div className="flex items-center gap-4 py-1">
                    <div className="size-12 rounded-md border border-app-border bg-app-bg overflow-hidden shrink-0">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-app-text">{item.name}</div>
                        <div className="text-xs text-app-muted font-medium truncate max-w-[200px]">{item.shortDescription}</div>
                    </div>
                </div>
            )
        },
        {
            header: "Category",
            accessorKey: "category",
            cell: (item) => (
                <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getCategoryStyle(item.category)}`}>
                    {item.category}
                </span>
            )
        },
        {
            header: "Price",
            accessorKey: "price",
            cell: (item) => <span className="text-sm font-bold text-app-text">{formatPrice(item.price)}</span>
        },
        {
            header: "Stock Status",
            accessorKey: "inStock",
            cell: (item) => (
                <div className="flex items-center gap-3">
                    <Switch
                        checked={item.inStock}
                        onCheckedChange={(checked) => console.log(`Toggle ${item.id}`, checked)}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <span className={`text-xs font-semibold ${item.inStock ? "text-emerald-600" : "text-red-500"}`}>
                        {item.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                </div>
            )
        },
        {
            header: "Actions",
            accessorKey: "id",
            className: "text-right",
            cell: (_) => (
                <div className="flex items-center  gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-app-muted hover:text-app-text hover:bg-app-accent"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Edit2 className="size-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-app-muted hover:text-red-600 hover:bg-red-50"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <DataTable
            columns={columns}
            data={data}
            searchKeys={["name", "category"]}
            initialPageSize={10}
            onRowClick={onRowClick}
        />
    );
};

export default MenuItemTable;
