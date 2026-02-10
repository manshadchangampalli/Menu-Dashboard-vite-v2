import { ChevronRight, Edit } from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { BRANCH_DETAIL_DATA } from "../../pages/branch-detail/branch-detail.config";

const BranchHeader = () => {
    const data = BRANCH_DETAIL_DATA;

    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-app-muted mb-2 uppercase tracking-widest">
                    <a className="hover:text-app-text" href="#">Management</a>
                    <ChevronRight className="size-3.5" />
                    <a className="hover:text-app-text" href="#">Branches</a>
                    <ChevronRight className="size-3.5" />
                    <span className="text-app-text font-bold">{data.name}</span>
                </div>
                <div className="flex items-center gap-4">
                    <h2 className="text-3xl font-bold tracking-tight text-app-text">{data.name}</h2>
                    <span className="px-2 py-0.5 rounded border border-app-text bg-app-text text-[10px] font-bold text-white uppercase tracking-wider">
                        {data.type}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-white px-4 h-10 border border-app-border rounded-md shadow-sm">
                    <span className="text-xs font-bold text-app-muted uppercase tracking-wider">Status:</span>
                    <div className="flex items-center gap-2">
                        <Switch checked={data.status === "Open"} />
                        <span className={`text-xs font-bold uppercase ${data.status === "Open" ? "text-emerald-600" : "text-red-600"}`}>
                            {data.status}
                        </span>
                    </div>
                </div>
                <Button className="flex items-center gap-2 h-10 bg-app-text text-white font-semibold text-sm hover:bg-app-text/90 transition-all shadow-sm">
                    <Edit className="size-[18px]" />
                    Edit Details
                </Button>
            </div>
        </div>
    );
};

export default BranchHeader;
