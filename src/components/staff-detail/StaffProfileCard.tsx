import { Mail, Phone, Calendar } from "lucide-react";
import { STAFF_DETAIL_DATA } from "../../pages/staff-detail/staff-detail.config";

const StaffProfileCard = () => {
    const { profile } = STAFF_DETAIL_DATA;

    return (
        <div className="bg-white border border-app-border rounded-xl p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
                <div className="size-24 rounded-full border-4 border-app-bg overflow-hidden mb-4 shadow-sm">
                    <img 
                        alt={profile.name} 
                        className="w-full h-full object-cover" 
                        src={profile.avatar} 
                    />
                </div>
                <h3 className="text-xl font-bold text-app-text">{profile.name}</h3>
                <p className="text-sm font-medium text-app-muted mb-4 uppercase tracking-wider">{profile.role}</p>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${profile.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-gray-50 text-gray-700 border-gray-100'}`}>
                    <span className={`size-1.5 rounded-full ${profile.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-500'}`}></span>
                    {profile.status}
                </span>
            </div>
            <div className="mt-8 pt-8 border-t border-app-border space-y-4">
                <h4 className="text-[11px] font-bold text-app-muted uppercase tracking-widest">Personal Information</h4>
                <div className="flex items-start gap-3">
                    <Mail className="text-app-muted size-5" />
                    <div>
                        <p className="text-xs text-app-muted font-medium">Email Address</p>
                        <p className="text-sm font-semibold text-app-text">{profile.email}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Phone className="text-app-muted size-5" />
                    <div>
                        <p className="text-xs text-app-muted font-medium">Phone Number</p>
                        <p className="text-sm font-semibold text-app-text">{profile.phone}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Calendar className="text-app-muted size-5" />
                    <div>
                        <p className="text-xs text-app-muted font-medium">Join Date</p>
                        <p className="text-sm font-semibold text-app-text">{profile.joinDate}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffProfileCard;
