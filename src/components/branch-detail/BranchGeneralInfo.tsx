import { MapPin, Phone, User } from "lucide-react";
import { BRANCH_DETAIL_DATA } from "../../pages/branch-detail/branch-detail.config";

const BranchGeneralInfo = () => {
    const { generalInfo } = BRANCH_DETAIL_DATA;

    return (
        <div className="bg-white border border-app-border rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-app-border">
                <h3 className="text-sm font-bold text-app-text uppercase tracking-wider">General Information</h3>
            </div>
            <div className="p-6 space-y-6">
                <div className="flex gap-4">
                    <MapPin className="text-app-muted size-5" />
                    <div>
                        <p className="text-xs font-bold text-app-muted uppercase mb-1">Address</p>
                        <p className="text-sm text-app-text font-medium leading-relaxed">
                            {generalInfo.address}<br />
                            {generalInfo.district}
                        </p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Phone className="text-app-muted size-5" />
                    <div>
                        <p className="text-xs font-bold text-app-muted uppercase mb-1">Contact</p>
                        <p className="text-sm text-app-text font-medium">{generalInfo.phone}</p>
                        <p className="text-sm text-app-text font-medium">{generalInfo.email}</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <User className="text-app-muted size-5" />
                    <div>
                        <p className="text-xs font-bold text-app-muted uppercase mb-1">Branch Manager</p>
                        <div className="flex items-center gap-3 mt-1">
                            <div className="size-8 rounded-full bg-app-bg overflow-hidden border border-app-border">
                                <img 
                                    alt="Manager" 
                                    className="w-full h-full object-cover" 
                                    src={generalInfo.manager.avatar} 
                                />
                            </div>
                            <p className="text-sm text-app-text font-bold">{generalInfo.manager.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BranchGeneralInfo;
