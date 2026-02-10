import { DataTable, type Column } from "../ui/data-table";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Edit2, MoreVertical } from "lucide-react";
import type { StaffMember, StaffRole } from "../../pages/staff/staff.type";
import { useNavigate } from "react-router";

interface StaffTableProps {
    data: StaffMember[];
    onEdit?: (staff: StaffMember) => void;
}

const StaffTable = ({ data, onEdit }: StaffTableProps) => {
    const navigate = useNavigate();

    const handleRowClick = (staff: StaffMember) => {
        navigate(`/staff/${staff.id}`);
    };

    const getRoleBadgeColor = (role: StaffRole) => {
        switch (role) {
            case "Admin": return "bg-indigo-50 text-indigo-700 border-indigo-100";
            case "Chef": return "bg-amber-50 text-amber-700 border-amber-100";
            case "Waiter": return "bg-blue-50 text-blue-700 border-blue-100";
            case "Manager": return "bg-purple-50 text-purple-700 border-purple-100";
            case "Bartender": return "bg-orange-50 text-orange-700 border-orange-100";
            default: return "bg-gray-50 text-gray-700 border-gray-100";
        }
    };

    const columns: Column<StaffMember>[] = [
        {
            header: "Staff Name",
            accessorKey: "name",
            cell: (staff) => (
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-app-bg overflow-hidden border border-app-border">
                        <img alt={staff.name} className="w-full h-full object-cover" src={staff.avatar} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-app-text">{staff.name}</div>
                        <div className="text-[10px] text-app-muted font-bold uppercase tracking-tighter">Joined {staff.joinedDate}</div>
                    </div>
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
            header: "Assigned Branch",
            accessorKey: "branchName",
            cell: (staff) => (
                <div>
                    <div className="text-sm text-app-text font-medium">{staff.branchName}</div>
                    <div className="text-xs text-app-muted">{staff.branchLocation}</div>
                </div>
            )
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (staff) => (
                <div className="flex items-center gap-3">
                    <Switch checked={staff.status === "Active"} />
                    <span className={`text-xs font-bold uppercase ${staff.status === "Active" ? "text-emerald-600" : "text-app-muted"}`}>
                        {staff.status}
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
                        className="text-app-muted hover:text-app-text hover:bg-app-bg"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit?.(staff);
                        }}
                    >
                        <Edit2 className="size-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-app-muted hover:text-app-text hover:bg-app-bg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <MoreVertical className="size-5" />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <DataTable
            columns={columns}
            data={data}
            searchKeys={["name", "role", "branchName"]}
            initialPageSize={10}
            onRowClick={handleRowClick}
        />
    );
};

export default StaffTable;
