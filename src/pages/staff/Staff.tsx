import { ChevronRight, Download, UserPlus, TrendingUp } from "lucide-react";
import { Button } from "../../components/ui/button";
import StaffTable from "../../components/staff/StaffTable";
import { MOCK_STAFF } from "./staff.config";

const StaffMembers = () => {
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
                    <Button variant="outline" className="h-9 gap-2">
                        <Download className="size-[18px]" />
                        Export
                    </Button>
                    <Button className="h-9 gap-2 bg-app-text text-white hover:bg-app-text/90">
                        <UserPlus className="size-[18px]" />
                        + Add Staff
                    </Button>
                </div>
            </div>

            <div className="bg-white border border-app-border p-4 rounded-lg shadow-sm overflow-hidden mb-4">
                <StaffTable data={MOCK_STAFF} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-app-border p-5 rounded-lg shadow-sm">
                    <h3 className="text-app-muted text-[10px] font-bold uppercase tracking-wider mb-1">Total Staff</h3>
                    <div className="flex items-end justify-between">
                        <p className="text-2xl font-bold text-app-text">48</p>
                        <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                            <TrendingUp className="size-3.5" />
                            +5 this month
                        </span>
                    </div>
                </div>
                <div className="bg-white border border-app-border p-5 rounded-lg shadow-sm">
                    <h3 className="text-app-muted text-[10px] font-bold uppercase tracking-wider mb-1">Active Staff</h3>
                    <div className="flex items-end justify-between">
                        <p className="text-2xl font-bold text-app-text">42</p>
                        <span className="text-app-muted text-xs font-bold">87% availability</span>
                    </div>
                </div>
                <div className="bg-white border border-app-border p-5 rounded-lg shadow-sm">
                    <h3 className="text-app-muted text-[10px] font-bold uppercase tracking-wider mb-1">Role Distribution</h3>
                    <div className="flex items-end justify-between">
                        <p className="text-2xl font-bold text-app-text">Diverse</p>
                        <div className="flex -space-x-2">
                            <div className="size-6 rounded-full border-2 border-white bg-indigo-500" title="Admin"></div>
                            <div className="size-6 rounded-full border-2 border-white bg-amber-500" title="Chef"></div>
                            <div className="size-6 rounded-full border-2 border-white bg-blue-500" title="Waiter"></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default StaffMembers;
