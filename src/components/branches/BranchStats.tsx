
import { TrendingUp } from "lucide-react";

interface BranchStatsProps {
    totalWithoutFilter?: number;
    totalActive?: number;
}

export const BranchStats = ({ totalWithoutFilter, totalActive }: BranchStatsProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-white border border-app-border p-5 rounded-lg shadow-sm">
                <h3 className="text-app-muted text-[10px] font-bold uppercase tracking-wider mb-1">Total Branches</h3>
                <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold text-app-text">{totalWithoutFilter || 0}</p>
                    <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                        <TrendingUp className="size-3.5" />
                        +2 this year
                    </span>
                </div>
            </div>
            <div className="bg-white border border-app-border p-5 rounded-lg shadow-sm">
                <h3 className="text-app-muted text-[10px] font-bold uppercase tracking-wider mb-1">Active Now</h3>
                <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold text-app-text">{totalActive || 0}</p>
                    <span className="text-app-muted text-xs font-bold">75% capacity</span>
                </div>
            </div>
        </div>
    );
};
