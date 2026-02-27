import { useMemo, useState } from "react";
import { DataTable, type Column } from "../ui/data-table";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { type Menu, MenuStatus } from "../../pages/menu/service/menu.type";
import { Edit2, Trash2, Clock } from "lucide-react";
import { useDeleteMenu, useUpdateMenu } from "../../pages/menu/hooks/useMenu";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { type TableFilters } from "../../hooks/useTableFilters";
import { ConfirmDialog } from "../ui/confirm-dialog";

interface MenuTableProps {
    data: Menu[];
    loading?: boolean;
    total?: number;
    totalPages?: number;
    page?: number;
    onPageChange?: (page: number) => void;
    onRowClick?: (item: Menu) => void;
    onEdit?: (item: Menu) => void;
    filters: TableFilters;
    onFilterChange: (newFilters: Partial<TableFilters>) => void;
}

const MenuTable = ({
    data,
    loading,
    total,
    totalPages,
    page,
    onPageChange,
    onRowClick,
    onEdit,
    filters,
    onFilterChange
}: MenuTableProps) => {
    const queryClient = useQueryClient();
    const [menuToDelete, setMenuToDelete] = useState<Menu | null>(null);
    const { mutate: updateMenu, isPending: isUpdating } = useUpdateMenu();
    const { mutate: deleteMenu, isPending: isDeleting } = useDeleteMenu();

    const handleDelete = () => {
        if (!menuToDelete) return;

        deleteMenu(menuToDelete._id, {
            onSuccess: () => {
                toast.success("Menu deleted successfully");
                setMenuToDelete(null);
                // The query will be invalidated by the hook's onSuccess
            },
            onError: (error: any) => {
                toast.error(error?.message || "Failed to delete menu");
            }
        });
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleStatusToggle = (item: Menu, checked: boolean) => {
        const newStatus = checked ? MenuStatus.ACTIVE : MenuStatus.INACTIVE;

        updateMenu(
            { id: item._id, data: { status: newStatus } },
            {
                onSuccess: () => {
                    toast.success(`Menu ${checked ? "activated" : "deactivated"} successfully`);

                    // Optimistically update the cache without an API re-fetch
                    queryClient.setQueryData(["menus", filters], (oldResponse: any) => {
                        if (!oldResponse) return oldResponse;

                        return {
                            ...oldResponse,
                            data: oldResponse.data.map((m: any) =>
                                m._id === item._id ? { ...m, status: newStatus } : m
                            )
                        };
                    });
                },
                onError: (error: any) => {
                    toast.error(error?.message || "Failed to update status");
                }
            }
        );
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
                        onCheckedChange={(checked) => handleStatusToggle(item, checked)}
                        disabled={isUpdating}
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
            cell: (item) => (
                <div className="flex items-center justify-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-app-muted hover:text-app-text hover:bg-app-accent"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit?.(item);
                        }}
                    >
                        <Edit2 className="size-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-app-muted hover:text-red-600 hover:bg-red-50"
                        onClick={(e) => {
                            e.stopPropagation();
                            setMenuToDelete(item);
                        }}
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>
            )
        }
    ];

    const mappedData = useMemo(() => {
        return data.map((item) => ({
            ...item,
            id: item._id,
        }));
    }, [data]);

    return (
        <>
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
                        <select
                            className="h-9 rounded-md border border-app-border bg-white px-3 text-sm text-app-text font-medium focus:outline-none focus:ring-1 focus:ring-app-border"
                            value={filters.status || "all"}
                            onChange={(e) => onFilterChange({ status: e.target.value })}
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                }
            />

            <ConfirmDialog
                open={!!menuToDelete}
                onOpenChange={(open) => !open && setMenuToDelete(null)}
                title="Delete Menu"
                description={`Are you sure you want to delete "${menuToDelete?.name}"? This action cannot be undone.`}
                onConfirm={handleDelete}
                confirmText="Delete"
                variant="destructive"
                isLoading={isDeleting}
            />
        </>
    );
};

export default MenuTable;
