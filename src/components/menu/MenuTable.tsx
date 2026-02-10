import { DataTable, type Column } from "../ui/data-table";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import type { Menu } from "../../pages/menu/menu.type";
import { Edit2, Trash2, Eye, Clock } from "lucide-react";

interface MenuTableProps {
    data: Menu[];
    onRowClick?: (item: Menu) => void;
}

const MenuTable = ({ data, onRowClick }: MenuTableProps) => {

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const columns: Column<Menu>[] = [
        {
            header: "Menu Name",
            accessorKey: "name",
            cell: (item) => (
                <div>
                    <div className="text-sm font-bold text-app-text">{item.name}</div>
                    {item.description && (
                        <div className="text-xs text-app-muted truncate max-w-[200px]">{item.description}</div>
                    )}
                </div>
            )
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (item) => (
                <div className="flex items-center gap-3">
                    <Switch
                        checked={item.status === 'active'}
                        onCheckedChange={(checked) => console.log(`Toggle status ${item.id}`, checked)}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <span className={`text-xs font-semibold ${item.status === 'active' ? "text-emerald-600" : "text-app-muted"}`}>
                        {item.status === 'active' ? "Active" : "Inactive"}
                    </span>
                </div>
            )
        },
        {
            header: "Type",
            accessorKey: "type",
            cell: (item) => (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-app-border bg-app-bg text-[10px] font-bold uppercase tracking-wider text-app-text">
                    {item.type}
                </span>
            )
        },
        {
            header: "Availability",
            accessorKey: "availability",
            cell: (item) => item.availability ? (
                <div className="flex items-center gap-1.5 text-xs text-app-muted">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.availability.startTime} - {item.availability.endTime}</span>
                </div>
            ) : (
                <span className="text-xs text-app-muted">-</span>
            )
        },
        {
            header: "Categories",
            accessorKey: "categoryCount",
            cell: (item) => (
                <span className="text-sm font-medium text-app-text">{item.categoryCount}</span>
            )
        },
        {
            header: "Items",
            accessorKey: "itemCount",
            cell: (item) => (
                <span className="text-sm font-medium text-app-text">{item.itemCount}</span>
            )
        },
        {
            header: "Last Updated",
            accessorKey: "updatedAt",
            cell: (item) => (
                <span className="text-xs text-app-muted font-medium">
                    {formatDate(item.updatedAt)}
                </span>
            )
        },
        {
            header: "Actions",
            accessorKey: "id",
            className: "text-right",
            cell: (_) => (
                <div className="flex items-center justify-center gap-1">
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
            searchKeys={["name"]}
            initialPageSize={10}
            onRowClick={onRowClick}
        />
    );
};

export default MenuTable;
