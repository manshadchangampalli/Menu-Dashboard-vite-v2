import { MapPin, Building2, CheckCircle } from "lucide-react";
import { STAFF_DETAIL_DATA } from "../../pages/staff-detail/staff-detail.config";

const BranchAccessCard = () => {
    const { branches } = STAFF_DETAIL_DATA;

    return (
        <div className="bg-white border border-app-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-app-text">Branch Access</h3>
                    <p className="text-sm text-app-muted">Authorized locations</p>
                </div>
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Building2 size={20} />
                </div>
            </div>

            <div className="space-y-4">
                {branches.map((branch) => (
                    <div
                        key={branch.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-app-border transition-colors group"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${branch.isPrimary ? 'bg-app-accent/10 text-app-text' : 'bg-gray-100 text-gray-500'}`}>
                                <MapPin size={16} />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-app-text transition-colors">
                                    {branch.name}
                                </h4>
                                {branch.isPrimary && (
                                    <span className="text-[10px] uppercase font-bold text-app-text bg-green-500/20 px-2 py-1 rounded-full tracking-wider">
                                        Primary Location
                                    </span>
                                )}
                            </div>
                        </div>

                        {branch.isPrimary && (
                            <CheckCircle size={16} className="text-app-accent" />
                        )}
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 py-2.5 px-4 bg-gray-50 hover:bg-gray-100 text-app-text text-sm font-semibold rounded-lg border border-app-border transition-colors">
                Manage Access
            </button>
        </div>
    );
};

export default BranchAccessCard;
