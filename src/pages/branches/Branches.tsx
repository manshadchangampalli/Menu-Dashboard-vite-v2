import { ChevronRight, Download, Plus, TrendingUp } from "lucide-react";
import { Button } from "../../components/ui/button";
import BranchesTable from "../../components/branches/BranchesTable";
import { MOCK_BRANCHES } from "./config/branches.config";
import { useState } from "react";
import BranchCreatePanel from "../../components/branches/BranchCreatePanel";

const Branches = () => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    return (
        <main className="flex-1 overflow-y-auto p-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-app-muted mb-2 uppercase tracking-widest">
                        <span>Management</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-app-text font-bold">Branches</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-app-text">Branch Listing</h2>
                    <p className="text-app-muted mt-1 font-medium text-sm">Manage and monitor all restaurant locations from a central hub.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="flex items-center gap-2 h-9 border-app-border bg-white font-semibold text-sm hover:bg-app-bg transition-colors shadow-sm">
                        <Download className="size-[18px]" />
                        Export List
                    </Button>
                    <Button
                        className="flex items-center gap-2 h-9 bg-app-text text-white font-semibold text-sm hover:bg-app-text/90 transition-all shadow-sm"
                        onClick={() => setIsPanelOpen(true)}
                    >
                        <Plus className="size-[18px]" />
                        New Branch
                    </Button>
                </div>
            </div>

            <div className="bg-white border border-app-border rounded-lg shadow-sm overflow-hidden p-4">
                <BranchesTable data={MOCK_BRANCHES} />
            </div>

            {/* Panel integration */}
            <BranchCreatePanel
                open={isPanelOpen}
                onClose={() => setIsPanelOpen(false)}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-white border border-app-border p-5 rounded-lg shadow-sm">
                    <h3 className="text-app-muted text-[10px] font-bold uppercase tracking-wider mb-1">Total Branches</h3>
                    <div className="flex items-end justify-between">
                        <p className="text-2xl font-bold text-app-text">12</p>
                        <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                            <TrendingUp className="size-3.5" />
                            +2 this year
                        </span>
                    </div>
                </div>
                <div className="bg-white border border-app-border p-5 rounded-lg shadow-sm">
                    <h3 className="text-app-muted text-[10px] font-bold uppercase tracking-wider mb-1">Active Now</h3>
                    <div className="flex items-end justify-between">
                        <p className="text-2xl font-bold text-app-text">9</p>
                        <span className="text-app-muted text-xs font-bold">75% capacity</span>
                    </div>
                </div>

            </div>
        </main>
    );
};

export default Branches;
