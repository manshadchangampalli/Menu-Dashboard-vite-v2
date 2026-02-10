import { STAFF_DETAIL_DATA } from "../../pages/staff-detail/staff-detail.config";

const StaffActivityLog = () => {
    const { activity } = STAFF_DETAIL_DATA;

    return (
        <div className="bg-white border border-app-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <h4 className="text-[11px] font-bold text-app-muted uppercase tracking-widest">Recent Activity</h4>
                <button className="text-xs font-bold text-app-text hover:underline">View All Log</button>
            </div>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-app-border before:to-transparent">
                {activity.map((log) => {
                    const Icon = log.icon;
                    return (
                        <div key={log.id} className="relative flex items-center gap-6 group">
                            <div className="relative size-10 flex-shrink-0 bg-white border-2 border-app-text rounded-full flex items-center justify-center z-10 group-hover:border-app-text transition-colors">
                                <Icon className="size-[18px] text-app-text" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-bold text-app-text">{log.title}</p>
                                    <time className="text-[10px] font-bold text-app-muted uppercase">{log.time}</time>
                                </div>
                                <p className="text-xs text-app-muted mt-1 leading-relaxed">{log.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StaffActivityLog;
