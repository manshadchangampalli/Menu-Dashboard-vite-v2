import { DataTable, type Column } from "../ui/data-table";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { type Branch, BranchStatus, BranchType } from "../../pages/branches/service/branches.type";
import { Edit2, MoreVertical, Store, Building, ShoppingBag, Moon } from "lucide-react";

import { useNavigate } from "react-router";
import { getBranches } from "../../pages/branches/service/branches.api";
import { CustomSelect } from "../ui/CustomSelect";
import { useTableFilters } from "../../hooks/useTableFilters";

const BranchesTable = () => {
    const navigate = useNavigate();
    const { filters, setFilters } = useTableFilters({
        limit: 10,
        sortBy: "created_at",
        sortOrder: "desc",
        status: "all"
    });

    const handleRowClick = (branch: Branch) => {
        navigate(`/branches/${branch.id}`);
    };

    const fetchBranches = async (params: {
        page: number;
        pageSize: number;
        search: string;
        sort?: { column: keyof Branch; direction: "asc" | "desc" };
    }) => {
        // Sync URL parameters when table state changes
        setFilters({
            page: params.page,
            limit: params.pageSize,
            query: params.search,
            sortBy: params.sort?.column as string,
            sortOrder: params.sort?.direction,
        });

        const response = await getBranches({
            page: params.page,
            limit: params.pageSize,
            query: params.search,
            sortBy: params.sort?.column as string,
            sortOrder: params.sort?.direction,
            status: filters.status === "all" ? undefined : filters.status
        });

        const mappedData: Branch[] = response.data.map((item: any) => ({
            id: item._id,
            name: item.name,
            type: item.branch_type,
            address: item.address_detail.street,
            district: `${item.address_detail.city}, ${item.address_detail.country}`,
            managerName: "Manager Name", // Map correctly if API provides it
            managerAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random`,
            status: item.status,
        }));

        return {
            data: mappedData,
            total: (response as any).meta?.total || mappedData.length,
            totalPages: (response as any).meta?.totalPages || 1,
        };
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
            fetchData={fetchBranches}
            searchKeys={["name", "address", "managerName"]}
            initialPageSize={10}
            onRowClick={handleRowClick}
            actions={
                <div className="flex items-center gap-2">
                    <div className="w-40">
                        <CustomSelect
                            label=""
                            value={filters.status}
                            onValueChange={(value) => setFilters({ status: value })}
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
    );
};

export default BranchesTable;
