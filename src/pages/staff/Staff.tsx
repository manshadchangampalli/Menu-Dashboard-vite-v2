import { ChevronRight, Download, UserPlus, TrendingUp } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import StaffTable from "../../components/staff/StaffTable";
import StaffCreatePanel from "../../components/staff/StaffCreatePanel";
import { type StaffData } from "./staff.type";
import { useDownloadStaff } from "./hooks/useStaff";
import { toast } from "sonner";
import { useTableQuery } from "../../hooks/useTableFilters";
import { getStaff } from "./service/staff.api";

const StaffMembers = () => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState<StaffData | null>(null);
    const [isEdit, setIsEdit] = useState(false);

    const { mutate: downloadStaff, isPending: isExporting } = useDownloadStaff();

    const {
        data: response,
        isLoading,
        filters,
        setFilters
    } = useTableQuery(
        "staff",
        getStaff,
        {
            limit: 10,
            sortBy: "created_at",
            sortOrder: "desc",
        }
    );

    const handleCreateClick = () => {
        setSelectedStaff(null);
        setIsEdit(false);
        setIsPanelOpen(true);
    };

    const handleEditClick = (staff: StaffData) => {
        setSelectedStaff(staff);
        setIsEdit(true);
        setIsPanelOpen(true);
    };

    const handleExport = () => {
        downloadStaff(undefined, {
            onSuccess: (blob) => {
                const url = window.URL.createObjectURL(new Blob([blob as any]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `staff-export-${new Date().toISOString().split('T')[0]}.csv`);
                document.body.appendChild(link);
                link.click();
                link.parentNode?.removeChild(link);
                window.URL.revokeObjectURL(url);
                toast.success("Staff list exported successfully");
            },
            onError: (error: any) => {
                toast.error(error?.message || "Failed to export staff list");
            }
        });
    };

    return (
        <main className="flex-1 overflow-y-auto p-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-app-muted mb-2 uppercase tracking-widest">
                        <span>Management</span>
                        <ChevronRight className="size-3.5" />
                        <span className="text-app-text font-bold">Staff Directory</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-app-text">Staff Directory</h2>
                    <p className="text-app-muted mt-1 font-medium text-sm">Manage roles, permissions, and branch assignments for your team.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="h-9 gap-2 border-app-border bg-white font-semibold text-sm hover:bg-app-bg transition-colors shadow-sm"
                        onClick={handleExport}
                        disabled={isExporting}
                    >
                        <Download className="size-[18px]" />
                        {isExporting ? "Exporting..." : "Export List"}
                    </Button>
                    <Button
                        className="h-9 gap-2 bg-app-text text-white font-semibold text-sm hover:bg-app-text/90 transition-all shadow-sm"
                        onClick={handleCreateClick}
                    >
                        <UserPlus className="size-[18px]" />
                        Add Staff Member
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-white border border-app-border p-4 rounded-lg shadow-sm overflow-hidden">
                    <StaffTable
                        data={response?.data || []}
                        loading={isLoading}
                        total={response?.meta?.total || 0}
                        totalPages={response?.meta?.totalPages || 1}
                        page={filters.page}
                        onPageChange={(page) => setFilters({ page })}
                        onEdit={handleEditClick}
                        filters={filters}
                        onFilterChange={setFilters}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white border border-app-border p-5 rounded-lg shadow-sm">
                        <h3 className="text-app-muted text-[10px] font-bold uppercase tracking-wider mb-1">Total Staff</h3>
                        <div className="flex items-end justify-between">
                            <p className="text-2xl font-bold text-app-text">{response?.meta?.total || 0}</p>
                            <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                                <TrendingUp className="size-3.5" />
                                Updated
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <StaffCreatePanel
                open={isPanelOpen}
                onClose={() => setIsPanelOpen(false)}
                isEdit={isEdit}
                initialData={selectedStaff}
            />
        </main>
    );
};

export default StaffMembers;
