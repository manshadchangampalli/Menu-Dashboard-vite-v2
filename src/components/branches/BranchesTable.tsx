import { useMemo, useState } from "react";
import { DataTable, type Column } from "../ui/data-table";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { type Branch, type BranchData, BranchStatus, BranchType } from "../../pages/branches/service/branches.type";
import { Edit2, Store, Building, ShoppingBag, Moon, Trash2 } from "lucide-react";
import { BranchStats } from "./BranchStats";
import { CustomSelect } from "../ui/CustomSelect";
import { type TableFilters } from "../../hooks/useTableFilters";
import { ConfirmDialog } from "../ui/confirm-dialog";
import { useDeleteBranch, useUpdateBranch } from "../../pages/branches/hooks/useBranches";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface BranchesTableProps {
    data: BranchData[];
    loading?: boolean;
    total?: number;
    totalPages?: number;
    page?: number;
    onPageChange?: (page: number) => void;
    onEdit?: (branch: BranchData) => void;
    onRowClick?: (branch: Branch) => void;
    meta?: any;
    filters: TableFilters;
    onFilterChange: (newFilters: Partial<TableFilters>) => void;
}

const BranchesTable = ({
    data,
    loading,
    total,
    totalPages,
    page,
    onPageChange,
    onEdit,
    onRowClick,
    meta,
    filters,
    onFilterChange
}: BranchesTableProps) => {
    const queryClient = useQueryClient();
    const [branchToDelete, setBranchToDelete] = useState<Branch | null>(null);
    const [branchToToggle, setBranchToToggle] = useState<Branch | null>(null);
    const { mutate: deleteBranch, isPending: isDeleting } = useDeleteBranch();
    const { mutate: updateBranch, isPending: isUpdating } = useUpdateBranch();

    const handleDelete = () => {
        if (!branchToDelete) return;
        deleteBranch(branchToDelete.id, {
            onSuccess: () => {
                toast.success("Branch deleted successfully");
                setBranchToDelete(null);
            },
            onError: () => {
                toast.error("Failed to delete branch");
            }
        });
    };

    const handleStatusToggle = () => {
        if (!branchToToggle) return;
        const newStatus = branchToToggle.status === BranchStatus.ACTIVE ? BranchStatus.INACTIVE : BranchStatus.ACTIVE;

        updateBranch(
            { id: branchToToggle.id, data: { status: newStatus } },
            {
                onSuccess: () => {
                    toast.success(`Branch ${newStatus === BranchStatus.ACTIVE ? "activated" : "deactivated"} successfully`);

                    // Optimistically update the cache without an API re-fetch
                    queryClient.setQueryData(["branches", filters], (oldResponse: any) => {
                        if (!oldResponse) return oldResponse;

                        return {
                            ...oldResponse,
                            data: oldResponse.data.map((b: any) =>
                                b._id === branchToToggle.id ? { ...b, status: newStatus } : b
                            ),
                            meta: {
                                ...oldResponse.meta,
                                totalActive: newStatus === BranchStatus.ACTIVE
                                    ? (oldResponse.meta?.totalActive || 0) + 1
                                    : (oldResponse.meta?.totalActive || 0) - 1
                            }
                        };
                    });

                    setBranchToToggle(null);
                },
                onError: (error: any) => {
                    toast.error(error?.message || "Failed to update status");
                }
            }
        );
    };



    const getBranchIcon = (type: string | BranchType) => {
        switch (type) {
            case BranchType.MAIN_HQ:
            case "Main HQ":
            case "STANDARD":
                return <Store className="size-5 text-app-text" />;
            case "Suburban":
                return <Store className="size-5 text-app-text" />;
            case "Seasonal":
                return <Moon className="size-5 text-app-text" />;
            case "Delivery Hub":
                return <ShoppingBag className="size-5 text-app-text" />;
            default:
                return <Building className="size-5 text-app-text" />;
        }
    };

    const columns: Column<Branch>[] = [
        {
            header: "Branch Name",
            accessorKey: "name",
            cell: (branch) => (
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded bg-app-bg flex items-center justify-center border border-app-border">
                        {getBranchIcon(branch.type)}
                    </div>
                    <div>
                        <div className="text-sm font-bold text-app-text">{branch.name}</div>
                        <div className="text-[10px] text-app-muted font-bold uppercase tracking-tighter">{branch.type}</div>
                    </div>
                </div>
            )
        },
        {
            header: "Location",
            accessorKey: "address",
            cell: (branch) => (
                <div>
                    <div className="text-sm text-app-text">{branch.address}</div>
                    <div className="text-xs text-app-muted">{branch.district}</div>
                </div>
            )
        },
        {
            header: "Manager",
            accessorKey: "managerName",
            cell: (branch) => (
                <div className="flex items-center gap-2">
                    <div className="size-7 rounded-full bg-app-bg overflow-hidden border border-app-border">
                        <img
                            src={branch.managerAvatar}
                            alt={branch.managerName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="text-sm font-medium text-app-text">{branch.managerName}</span>
                </div>
            )
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (branch) => {
                const isActive = branch.status === BranchStatus.ACTIVE;
                return (
                    <div className="flex items-center gap-3">
                        <Switch
                            checked={isActive}
                            onCheckedChange={() => {
                                setBranchToToggle(branch);
                            }}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase ${isActive
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : "bg-gray-100 text-app-muted border-app-border"
                            }`}>
                            {branch.status}
                        </span>
                    </div>
                );
            }
        },
        {
            header: "Actions",
            accessorKey: "id",
            className: "text-right",
            cell: (branch) => (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-app-muted hover:text-app-text hover:bg-app-bg"
                        onClick={(e) => {
                            e.stopPropagation();
                            const fullData = data.find(d => d._id === branch.id);
                            if (fullData && onEdit) {
                                onEdit(fullData);
                            }
                        }}
                    >
                        <Edit2 className="size-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-app-muted hover:text-red-500 hover:bg-red-50 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            setBranchToDelete(branch);
                        }}
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>
            )
        }
    ];

    const mappedData = useMemo(() => {
        return data.map((item: any) => ({
            id: item._id,
            name: item.name,
            type: item.branch_type,
            address: item.address_detail.street,
            district: `${item.address_detail.city}, ${item.address_detail.country}`,
            managerName: "Manager Name", // Map correctly if API provides it
            managerAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random`,
            status: item.status,
        }));
    }, [data]);

    return (
        <>
            <div className="bg-white border border-app-border rounded-lg shadow-sm overflow-hidden p-4">
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
                            <div className="w-40">
                                <CustomSelect
                                    label=""
                                    value={filters.status}
                                    onValueChange={(value) => onFilterChange({ status: value })}
                                    options={[
                                        { label: "All Status", value: "all" },
                                        { label: "Active", value: "active" },
                                        { label: "Inactive", value: "inactive" },
                                    ]}
                                />
                            </div>
                        </div>
                    }
                />
            </div>
            {/* Dialogs and Stats follow... */}
            <ConfirmDialog
                open={!!branchToDelete}
                onOpenChange={(open) => !open && setBranchToDelete(null)}
                title="Delete Branch"
                description={`Are you sure you want to delete "${branchToDelete?.name}"? This action cannot be undone.`}
                confirmText={isDeleting ? "Deleting..." : "Delete"}
                cancelText="Cancel"
                onConfirm={handleDelete}
                variant="destructive"
            />

            <ConfirmDialog
                open={!!branchToToggle}
                onOpenChange={(open) => !open && setBranchToToggle(null)}
                title={branchToToggle?.status === BranchStatus.ACTIVE ? "Deactivate Branch" : "Activate Branch"}
                description={`Are you sure you want to ${branchToToggle?.status === BranchStatus.ACTIVE ? "deactivate" : "activate"} "${branchToToggle?.name}"?`}
                confirmText={isUpdating ? "Updating..." : "Confirm"}
                cancelText="Cancel"
                onConfirm={handleStatusToggle}
                variant={branchToToggle?.status === BranchStatus.ACTIVE ? "destructive" : "default"}
            />

            <BranchStats
                totalWithoutFilter={meta?.totalWithoutFilter}
                totalActive={meta?.totalActive}
            />
        </>
    );
};

export default BranchesTable;
