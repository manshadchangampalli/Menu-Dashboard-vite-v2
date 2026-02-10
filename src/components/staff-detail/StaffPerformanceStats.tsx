import { STAFF_DETAIL_DATA } from "../../pages/staff-detail/staff-detail.config";
import { TrendingUp, CheckCircle, Star } from "lucide-react";

const StaffPerformanceStats = () => {
    const { stats } = STAFF_DETAIL_DATA;

    return (
        <div className="bg-white border border-app-border rounded-xl p-6 shadow-sm">
            <h4 className="text-[11px] font-bold text-app-muted uppercase tracking-widest mb-6">Performance Overview</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => {

                    return (
                        <div key={index} className="p-4 rounded-xl border border-app-border bg-white shadow-sm flex flex-col gap-1">
                            <span className="text-2xl font-bold text-app-text">{stat.value}</span>
                            <span className="text-[10px] font-bold text-app-muted uppercase tracking-wider">{stat.label}</span>
                            <div className={`mt-2 flex items-center gap-1 ${stat.trendUp ? "text-emerald-600" : "text-app-text"} text-xs font-bold`}>
                                {index === 0 && <TrendingUp className="size-3.5" />}
                                {index === 1 && <CheckCircle className="size-3.5 text-emerald-500" />}
                                {index === 2 && <Star className="size-3.5 text-amber-500" />}
                                {stat.trend || stat.subtext}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StaffPerformanceStats;
