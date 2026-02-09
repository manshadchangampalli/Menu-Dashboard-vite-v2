
import React from 'react';
import {
    ChevronRight,
    FileDown,
    Plus,
    DollarSign,
    ShoppingCart,
    Users,
    Star,
    BarChart2,
    Clock,
    Utensils,
    UserPlus,
    AlertTriangle
} from "lucide-react";
import StatCard from "../../components/stat-card/StatCard";
import RecentActivityList from "../../components/recent-activity-list/RecentActivityList";
import { Button } from "../../components/ui/button";

const Overview = () => {
    const stats = [
        {
            title: "Total Revenue",
            value: "$42,394.00",
            icon: DollarSign,
            trend: "+12.5%",
            trendDirection: "up" as const,
        },
        {
            title: "Live Orders",
            value: "156",
            icon: ShoppingCart,
            trend: "+8.2%",
            trendDirection: "up" as const,
        },
        {
            title: "Active Tables",
            value: "24",
            icon: Users,
            trend: "-2.4%",
            trendDirection: "down" as const,
        },
        {
            title: "Avg. Rating",
            value: "4.8",
            icon: Star,
            trend: "+4.1%",
            trendDirection: "up" as const,
        },
    ];

    const activities = [
        {
            id: "1",
            title: "Order #8821 Paid",
            time: "2 minutes ago",
            icon: Utensils,
        },
        {
            id: "2",
            title: "New Staff Added",
            time: "45 minutes ago",
            icon: UserPlus,
        },
        {
            id: "3",
            title: "Stock Low: Ribeye Steak",
            time: "3 hours ago",
            icon: AlertTriangle,
        },
    ];

    return (
        <main className="flex-1 overflow-y-auto flex flex-col p-8 gap-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-app-muted mb-2 uppercase tracking-widest">
                        <span>Admin</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span>Analytics</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-app-text font-bold">Dashboard</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-app-text">System Overview</h2>
                    <p className="text-app-muted mt-1 font-medium">Real-time performance across all restaurant branches.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-app-border bg-white font-semibold hover:bg-app-bg shadow-sm">
                        <FileDown className="w-[18px] h-[18px]" />
                        Export
                    </Button>
                    <Button className="bg-app-text text-white font-semibold hover:bg-app-text/90 shadow-sm">
                        <Plus className="w-[18px] h-[18px]" />
                        New Order
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-8">
                    <div className="bg-white border border-app-border rounded-lg p-6 min-h-[400px] flex flex-col items-center justify-center text-center shadow-sm">
                        <div className="bg-app-bg size-16 rounded-full flex items-center justify-center mb-4 border border-app-border">
                            <BarChart2 className="w-8 h-8 text-app-muted" />
                        </div>
                        <h4 className="font-bold text-lg text-app-text">Activity Insights</h4>
                        <p className="text-app-muted max-w-xs mt-2 text-sm leading-relaxed font-medium">This module will contain interactive performance charts and sales data trends.</p>
                        <Button variant="outline" className="mt-6 border-app-border font-semibold hover:bg-app-bg">Initialize Data</Button>
                    </div>
                </div>
                <div className="space-y-8">
                    <div className="bg-white border border-app-border rounded-lg p-6 shadow-sm">
                        <h4 className="font-bold text-lg mb-6 flex items-center gap-2 text-app-text">
                            <Clock className="w-5 h-5 text-app-muted" />
                            Recent Activity
                        </h4>
                        <RecentActivityList activities={activities} />
                        <Button variant="ghost" className="w-full mt-8 h-auto py-2.5 text-xs font-bold uppercase tracking-widest text-app-muted hover:text-app-text border border-transparent hover:border-app-border transition-all">View All Activity Logs</Button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Overview;
