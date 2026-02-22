import { DataTable, type Column } from "../ui/data-table";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { type Branch, BranchStatus, BranchType } from "../../pages/branches/service/branches.type";
import { Edit2, MoreVertical, Store, Building, ShoppingBag, Moon } from "lucide-react";

interface BranchesTableProps {
    data: Branch[];
}

import { useNavigate } from "react-router";

const BranchesTable = ({ data }: BranchesTableProps) => {
    const navigate = useNavigate();

    const handleRowClick = (branch: Branch) => {
        navigate(`/branches/${branch.id}`);
    };


    const getBranchIcon = (type: string | BranchType) => {
        switch (type) {
            case BranchType.MAIN_HQ:
            case "Main HQ":
                return <Store className="size-5 text-app-text" />;
            case "Suburban":
                return <Store className="size-5 text-app-text" />; // Fallback or distinct if available
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
                const isActive = branch.status === "Open" || branch.status === BranchStatus.ACTIVE;
                return (
                    <div className="flex items-center gap-3">
                        <Switch
                            checked={isActive}
                            onCheckedChange={() => { }}
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
            cell: (_) => (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-app-muted hover:text-app-text hover:bg-app-bg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Edit2 className="size-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-app-muted hover:text-app-text hover:bg-app-bg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <MoreVertical className="size-4" />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <DataTable
            columns={columns}
            data={data}
            searchKeys={["name", "address", "managerName"]}
            initialPageSize={10}
            onRowClick={handleRowClick}
        />
    );
};

export default BranchesTable;
