import { UserPlus } from "lucide-react";
import { BRANCH_DETAIL_DATA } from "../../pages/branch-detail/branch-detail.config";

const BranchStaffList = () => {
    const { staff } = BRANCH_DETAIL_DATA;

    return (
        <div className="bg-white border border-app-border rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-app-border flex items-center justify-between">
                <h3 className="text-sm font-bold text-app-text uppercase tracking-wider">Assigned Staff</h3>
                <button className="text-[10px] font-bold text-app-muted hover:text-app-text uppercase">See All</button>
            </div>
            <div className="divide-y divide-app-border">
                {staff.map((staffMember, i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-app-bg/30 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full overflow-hidden bg-app-bg border border-app-border">
                                <img 
                                    alt={staffMember.name} 
                                    className="w-full h-full object-cover" 
                                    src={staffMember.avatar} 
                                />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-app-text leading-tight">{staffMember.name}</p>
                                <p className="text-[10px] font-medium text-app-muted uppercase">{staffMember.role}</p>
                            </div>
                        </div>
                        <span className={`size-2 rounded-full ${staffMember.status === 'active' ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                    </div>
                ))}
            </div>
            <div className="p-4 bg-app-bg/10 text-center">
                <button className="text-xs font-bold text-app-text hover:underline flex items-center justify-center gap-1 w-full">
                    <UserPlus className="size-4" />
                    Assign New Staff
                </button>
            </div>
        </div>
    );
};

export default BranchStaffList;
