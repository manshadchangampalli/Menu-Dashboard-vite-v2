import { useState } from "react";
import { DataTable, type Column } from "../ui/data-table";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Edit2, Trash2, User } from "lucide-react";
import type { StaffData, StaffRole } from "../../pages/staff/staff.type";
import { useNavigate } from "react-router";
import { type TableFilters } from "../../hooks/useTableFilters";
import { ConfirmDialog } from "../ui/confirm-dialog";
import { useDeleteStaff, useUpdateStaff } from "../../pages/staff/hooks/useStaff";
import { toast } from "sonner";
import { CustomSelect } from "../ui/CustomSelect";
import { STAFF_ROLE_OPTIONS } from "../../pages/staff/staff.config";
import { useBranches } from "../../pages/branches/hooks/useBranches";

interface StaffTableProps {
    data: StaffData[];
    loading?: boolean;
    total?: number;
    totalPages?: number;
    page?: number;
    onPageChange?: (page: number) => void;
    onEdit?: (staff: StaffData) => void;
    filters: TableFilters;
    onFilterChange: (newFilters: Partial<TableFilters>) => void;
}

const StaffTable = ({
    data,
    loading,
    total,
    totalPages,
    page,
    onPageChange,
    onEdit,
    filters,
    onFilterChange
}: StaffTableProps) => {
    const navigate = useNavigate();
    const [staffToDelete, setStaffToDelete] = useState<StaffData | null>(null);
    const [staffToToggle, setStaffToToggle] = useState<StaffData | null>(null);
    const { mutate: deleteStaff, isPending: isDeleting } = useDeleteStaff();
    const { mutate: updateStaff, isPending: isUpdating } = useUpdateStaff();
    const { data: branchesResponse } = useBranches({ limit: 100 });

    const branchMap: Record<string, string> = {};
    (branchesResponse?.data ?? []).forEach((b: any) => {
        branchMap[b._id || b.id] = b.name;
    });

    const handleDelete = () => {
        if (!staffToDelete) return;
        deleteStaff(staffToDelete._id, {
            onSuccess: () => {
                toast.success("Staff member deleted successfully");
                setStaffToDelete(null);
            },
            onError: (err: any) => {
                toast.error(err?.message || "Failed to delete staff member");
            }
        });
    };

    const handleStatusToggle = () => {
        if (!staffToToggle) return;
        const newStatus = !staffToToggle.is_active;

        updateStaff(
            { id: staffToToggle._id, data: { is_active: newStatus } as any },
            {
                onSuccess: () => {
                    toast.success(`Staff member ${newStatus ? "activated" : "deactivated"} successfully`);
                    setStaffToToggle(null);
                },
                onError: (err: any) => {
                    toast.error(err?.message || "Failed to update status");
                }
            }
        );
    };

    const getRoleBadgeColor = (role: StaffRole) => {
        switch (role) {
            case "MANAGER": return "bg-indigo-50 text-indigo-700 border-indigo-100";
            case "CHEF": return "bg-amber-50 text-amber-700 border-amber-100";
            case "WAITER": return "bg-blue-50 text-blue-700 border-blue-100";
            case "CASHIER": return "bg-purple-50 text-purple-700 border-purple-100";
            default: return "bg-gray-50 text-gray-700 border-gray-100";
        }
    };

    const columns: Column<any>[] = [
        {
            header: "Staff Name",
            accessorKey: "full_name",
            cell: (staff) => (
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-app-bg flex items-center justify-center border border-app-border overflow-hidden">
                        <User className="size-5 text-app-muted" />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-app-text">{staff.full_name}</div>
                        <div className="text-[10px] text-app-muted font-bold uppercase tracking-tighter">Code: {staff.employee_code}</div>
                        {branchMap[staff.branch_id] && (
                            <div className="text-[10px] text-app-muted font-medium">{branchMap[staff.branch_id]}</div>
                        )}
                    </div>
                </div>
            )
        },
        {
            header: "Contact Info",
            accessorKey: "email",
            cell: (staff) => (
                <div>
                    <div className="text-sm text-app-text">{staff.email}</div>
                    <div className="text-xs text-app-muted">{staff.phone}</div>
                </div>
            )
        },
        {
            header: "Role",
            accessorKey: "role",
            cell: (staff) => (
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase ${getRoleBadgeColor(staff.role)}`}>
                    {staff.role}
                </span>
            )
        },
        {
            header: "Status",
            accessorKey: "is_active",
            cell: (staff) => (
                <div className="flex items-center gap-3">
                    <Switch
                        checked={staff.is_active}
                        onCheckedChange={() => setStaffToToggle(staff)}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <span className={`text-[10px] font-bold uppercase ${staff.is_active ? "text-emerald-600" : "text-app-muted"}`}>
                        {staff.is_active ? "Active" : "Inactive"}
                    </span>
                </div>
            )
        },
        {
            header: "Actions",
            accessorKey: "id",
            className: "text-right",
            cell: (staff) => (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-app-muted hover:text-app-text hover:bg-app-bg"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit?.(staff);
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
                            setStaffToDelete(staff);
                        }}
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <>
            <DataTable
                columns={columns}
                data={data}
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
                onRowClick={(staff) => navigate(`/staff/${staff._id}`)}
                actions={
                    <div className="flex items-center gap-2">
                        <div className="w-40">
                            <CustomSelect
                                label=""
                                value={filters.role ?? "all"}
                                onValueChange={(value) => onFilterChange({ role: value === "all" ? undefined : value })}
                                options={[
                                    { label: "All Roles", value: "all" },
                                    ...STAFF_ROLE_OPTIONS
                                ]}
                            />
                        </div>
                    </div>
                }
            />

            <ConfirmDialog
                open={!!staffToDelete}
                onOpenChange={(open) => !open && setStaffToDelete(null)}
                title="Delete Staff Member"
                description={`Are you sure you want to delete "${staffToDelete?.full_name}"? This action cannot be undone.`}
                confirmText={isDeleting ? "Deleting..." : "Delete"}
                cancelText="Cancel"
                onConfirm={handleDelete}
                variant="destructive"
            />

            <ConfirmDialog
                open={!!staffToToggle}
                onOpenChange={(open) => !open && setStaffToToggle(null)}
                title={staffToToggle?.is_active ? "Deactivate Staff" : "Activate Staff"}
                description={`Are you sure you want to ${staffToToggle?.is_active ? "deactivate" : "activate"} "${staffToToggle?.full_name}"?`}
                confirmText={isUpdating ? "Updating..." : "Confirm"}
                cancelText="Cancel"
                onConfirm={handleStatusToggle}
                variant={staffToToggle?.is_active ? "destructive" : "default"}
            />
        </>
    );
};

export default StaffTable;
