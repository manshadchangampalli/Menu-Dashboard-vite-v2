import { DollarSign, TrendingUp, Receipt, Users } from "lucide-react";
import { BRANCH_DETAIL_DATA } from "../../pages/branch-detail/branch-detail.config";

const BranchStats = () => {
    const { stats } = BRANCH_DETAIL_DATA;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border border-app-border p-5 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="text-app-muted size-5" />
                    <h3 className="text-app-muted text-[10px] font-bold uppercase tracking-wider">Today's Sales</h3>
                </div>
                <p className="text-2xl font-bold text-app-text">{stats.sales.value}</p>
                <span className="text-emerald-600 text-[10px] font-bold flex items-center gap-1 mt-1">
                    <TrendingUp className="size-3.5" />
                    {stats.sales.trend}
                </span>
            </div>
            <div className="bg-white border border-app-border p-5 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <Receipt className="text-app-muted size-5" />
                    <h3 className="text-app-muted text-[10px] font-bold uppercase tracking-wider">Active Orders</h3>
                </div>
                <p className="text-2xl font-bold text-app-text">{stats.activeOrders.value}</p>
                <span className="text-app-muted text-[10px] font-bold mt-1">{stats.activeOrders.detail}</span>
            </div>
            <div className="bg-white border border-app-border p-5 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <Users className="text-app-muted size-5" />
                    <h3 className="text-app-muted text-[10px] font-bold uppercase tracking-wider">Occupancy</h3>
                </div>
                <p className="text-2xl font-bold text-app-text">{stats.occupancy.detail}</p>
                <div className="w-full bg-app-bg h-1.5 rounded-full mt-3 overflow-hidden">
                    <div 
                        className="bg-app-text h-full rounded-full" 
                        style={{ width: `${stats.occupancy.value}%` }} 
                    />
                </div>
            </div>
        </div>
    );
};

export default BranchStats;
