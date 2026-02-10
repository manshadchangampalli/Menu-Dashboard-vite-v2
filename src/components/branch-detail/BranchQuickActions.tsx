import { ChevronRight, Utensils, Activity, Box, FileText } from "lucide-react";

const BranchQuickActions = () => {
    return (
        <div className="bg-white border border-app-border rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-app-border">
                <h3 className="text-sm font-bold text-app-text uppercase tracking-wider">Quick Actions</h3>
            </div>
            <div className="p-4 space-y-2">
                {[
                    { icon: Utensils, label: "Edit Branch Menu" },
                    { icon: Activity, label: "View Live Orders" },
                    { icon: Box, label: "Inventory Management" },
                    { icon: FileText, label: "Sales Reports" }
                ].map((action, i) => (
                    <button key={i} className="w-full flex items-center justify-between p-3 rounded-md hover:bg-app-bg transition-colors group text-left border border-transparent hover:border-app-border">
                        <div className="flex items-center gap-3">
                            <action.icon className="text-app-muted group-hover:text-app-text size-5" />
                            <span className="text-sm font-medium text-app-text">{action.label}</span>
                        </div>
                        <ChevronRight className="text-app-muted size-4" />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BranchQuickActions;
