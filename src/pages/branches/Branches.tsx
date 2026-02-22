import { ChevronRight, Download, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import BranchesTable from "../../components/branches/BranchesTable";
import { useState } from "react";
import BranchCreatePanel from "../../components/branches/BranchCreatePanel";
import { type BranchData } from "./service/branches.type";

const Branches = () => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState<BranchData | null>(null);
    const [isEdit, setIsEdit] = useState(false);

    const handleCreateClick = () => {
        setSelectedBranch(null);
        setIsEdit(false);
        setIsPanelOpen(true);
    };

    const handleEditClick = (branch: BranchData) => {
        setSelectedBranch(branch);
        setIsEdit(true);
        setIsPanelOpen(true);
    };

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
                        onClick={handleCreateClick}
                    >
                        <Plus className="size-[18px]" />
                        New Branch
                    </Button>
                </div>
            </div>
            <BranchesTable onEdit={handleEditClick} />
            {/* Panel integration */}
            <BranchCreatePanel
                open={isPanelOpen}
                isEdit={isEdit}
                initialData={selectedBranch}
                onClose={() => {
                    setIsPanelOpen(false);
                    setSelectedBranch(null);
                    setIsEdit(false);
                }}
            />


        </main>
    );
};

export default Branches;
