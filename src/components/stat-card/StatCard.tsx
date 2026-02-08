
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    trend: string;
    trendDirection: "up" | "down" | "neutral";
}

const StatCard = ({ title, value, icon: Icon, trend, trendDirection }: StatCardProps) => {
    const getTrendColor = () => {
        switch (trendDirection) {
            case "up":
                return "text-emerald-700 bg-emerald-50 border-emerald-100";
            case "down":
                return "text-red-700 bg-red-50 border-red-100";
            default:
                return "text-app-muted bg-gray-50 border-gray-100";
        }
    };

    return (
        <div className="bg-white border border-app-border p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-app-bg rounded-md text-app-text">
                    <Icon className="w-6 h-6" />
                </div>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${getTrendColor()}`}>
                    {trend}
                </span>
            </div>
            <h3 className="text-app-muted text-xs font-bold uppercase tracking-wider">{title}</h3>
            <p className="text-2xl font-bold mt-1 text-app-text">{value}</p>
        </div>
    );
};

export default StatCard;
