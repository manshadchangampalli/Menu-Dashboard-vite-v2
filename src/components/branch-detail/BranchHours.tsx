import { BRANCH_DETAIL_DATA } from "../../pages/branch-detail/branch-detail.config";

const BranchHours = () => {
    const { hours } = BRANCH_DETAIL_DATA;

    return (
        <div className="bg-white border border-app-border rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-app-border">
                <h3 className="text-sm font-bold text-app-text uppercase tracking-wider">Operational Hours</h3>
            </div>
            <div className="p-6">
                <ul className="space-y-3">
                    {hours.map((hour, index) => (
                        <li 
                            key={index}
                            className={`flex items-center justify-between ${hour.highlight ? "bg-app-bg/50 -mx-2 px-2 py-1 rounded" : ""}`}
                        >
                            <span className={`text-sm ${hour.closed ? "font-medium text-red-500" : hour.highlight ? "font-bold text-app-text" : "font-medium text-app-text"}`}>
                                {hour.day}
                            </span>
                            <span className={`text-sm ${hour.closed ? "text-red-500 font-bold uppercase text-[10px]" : hour.highlight ? "font-bold text-app-text" : "text-app-muted"}`}>
                                {hour.time}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BranchHours;
