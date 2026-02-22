import { DollarSign, TrendingUp, Receipt, Users } from "lucide-react";

interface BranchStatsProps {
    occupancy_stats?: {
        capacity: number;
        current_occupancy: number;
    };
}

const BranchStats = ({ occupancy_stats }: BranchStatsProps) => {
    // Keep sales and orders as mock since they are not in the provided API response yet
    const sales = { value: "$4,285.50", trend: "+12% from yesterday" };
    const activeOrders = { value: 24, detail: "Average wait: 18m" };

    const occupancyPercent = occupancy_stats ? Math.round((occupancy_stats.current_occupancy / occupancy_stats.capacity) * 100) : 0;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border border-app-border p-5 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="text-app-muted size-5" />
                    <h3 className="text-app-muted text-[10px] font-bold uppercase tracking-wider">Today's Sales</h3>
                </div>
                <p className="text-2xl font-bold text-app-text">{sales.value}</p>
                <span className="text-emerald-600 text-[10px] font-bold flex items-center gap-1 mt-1">
                    <TrendingUp className="size-3.5" />
                    {sales.trend}
                </span>
            </div>
            <div className="bg-white border border-app-border p-5 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <Receipt className="text-app-muted size-5" />
                    <h3 className="text-app-muted text-[10px] font-bold uppercase tracking-wider">Active Orders</h3>
                </div>
                <p className="text-2xl font-bold text-app-text">{activeOrders.value}</p>
                <span className="text-app-muted text-[10px] font-bold mt-1">{activeOrders.detail}</span>
            </div>
            <div className="bg-white border border-app-border p-5 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <Users className="text-app-muted size-5" />
                    <h3 className="text-app-muted text-[10px] font-bold uppercase tracking-wider">Occupancy</h3>
                </div>
                <p className="text-2xl font-bold text-app-text">{occupancyPercent}%</p>
                <div className="w-full bg-app-bg h-1.5 rounded-full mt-3 overflow-hidden">
                    <div 
                        className="bg-app-text h-full rounded-full" 
                        style={{ width: `${occupancyPercent}%` }} 
                    />
                </div>
            </div>
        </div>
    );
};

export default BranchStats;
