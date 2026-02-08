import type { LucideIcon } from "lucide-react";


interface ActivityItem {
    id: string;
    title: string;
    time: string;
    icon: LucideIcon;
}

interface RecentActivityListProps {
    activities: ActivityItem[];
}

const RecentActivityList = ({ activities }: RecentActivityListProps) => {
    return (
        <div className="space-y-6 relative">
            <div className="absolute left-5 top-2 bottom-2 w-px bg-app-border"></div>
            {activities.map((activity) => (
                <div key={activity.id} className="relative flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-app-border bg-white text-app-text z-10">
                        <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="text-sm">
                        <div className="font-bold text-app-text">{activity.title}</div>
                        <div className="text-app-muted font-medium">{activity.time}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecentActivityList;
