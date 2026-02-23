import { DataTable, type Column } from "../ui/data-table";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { type Menu, MenuStatus } from "../../pages/menu/service/menu.type";
import { Edit2, Trash2, Clock } from "lucide-react";
import { getMenus } from "../../pages/menu/service/menu.api";
import { useTableFilters } from "../../hooks/useTableFilters";

import { MENU_CONFIG } from "../../pages/menu/config/menu.config";

interface MenuTableProps {
    onRowClick?: (item: Menu) => void;
}

const MenuTable = ({ onRowClick }: MenuTableProps) => {

    const { filters, setFilters } = useTableFilters({
        limit: MENU_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE,
        sortBy: "created_at",
        sortOrder: "desc",
        status: "all"
    });

    const formatDate = (dateString: string) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const fetchMenus = async (params: {
        page: number;
        pageSize: number;
        search: string;
        sort?: { column: string | number | symbol; direction: "asc" | "desc" };
    }) => {
        // Sync filters if they changed from table (DataTable component handles internal state)
        // Usually DataTable setPage/setPageSize calls this fetchFn
        setFilters({
            page: params.page,
            limit: params.pageSize,
            query: params.search,
            sortBy: params.sort?.column as string,
            sortOrder: params.sort?.direction,
        });

        const response = await getMenus({
            page: params.page,
            limit: params.pageSize,
            query: params.search,
            sortBy: params.sort?.column as string,
            sortOrder: params.sort?.direction,
            status: filters.status === "all" ? undefined : filters.status,
        });

        // Map data if needed (API returns _id, DataTable might expect id in some cases, 
        // but here we can just use the item directly in cell renders)
        const mappedData: any[] = response.data.map((item) => ({
            ...item,
            id: item._id, // Map _id to id for consistency if DataTable or other components use 'id'
        }));

        return {
            data: mappedData,
            total: (response as any).meta?.total || mappedData.length,
            totalPages: (response as any).meta?.totalPages || 1,
        };
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
                        checked={item.status === MenuStatus.ACTIVE}
                        onCheckedChange={(checked) => console.log(`Toggle status ${item._id}`, checked)}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <span className={`text-xs font-semibold ${item.status === MenuStatus.ACTIVE ? "text-emerald-600" : "text-app-muted"}`}>
                        {item.status === MenuStatus.ACTIVE ? "Active" : "Inactive"}
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
            accessorKey: "start_time",
            cell: (item) => (
                <div className="flex items-center gap-1.5 text-xs text-app-muted">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.start_time} - {item.end_time}</span>
                </div>
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
            accessorKey: "updated_at",
            cell: (item) => (
                <span className="text-xs text-app-muted font-medium">
                    {formatDate(item.updated_at)}
                </span>
            )
        },
        {
            header: "Actions",
            accessorKey: "_id",
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
            fetchData={fetchMenus}
            searchKeys={["name"]}
            initialPageSize={10}
            onRowClick={onRowClick}
        />
    );
};

export default MenuTable;
