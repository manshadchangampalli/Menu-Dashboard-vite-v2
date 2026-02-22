import { MapPin, Phone, User } from "lucide-react";

interface BranchGeneralInfoProps {
    address_detail?: {
        street: string;
        city: string;
        state: string;
        zip_code: string;
        country: string;
    };
    phone?: string;
    email?: string;
}

const BranchGeneralInfo = ({ address_detail, phone, email }: BranchGeneralInfoProps) => {
    // Keep manager as mock since it's not in the provided API response yet
    const manager = {
        name: "Michael Chen",
        role: "General Manager",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMzu455RKXc5QZ9HWOYdKpZ7VAWnj053fUJzSIGDjbkgUd_NP1-y2tw1cEMZr4-5dRvyfOueqRvx6KXHzgxlO6HFX13MTfvrUsOQ3tb-plXSIRMrAG-9HdrOCJ0k3wIiMBMRsS4pmRXIHYMRxnq3gCCuyc8lNK5kGxvsV7_AEcJ9U8L3siNtfbR3PozDvY-scLS4w8BJcyA5zJfM6Ass2lHNpo5IdyuxAfGuCS2U878oB88dSZMcQpMFePqqu1-imxj_GDhC_nz4g"
    };

    const address = address_detail ? `${address_detail.street}, ${address_detail.city}, ${address_detail.state} ${address_detail.zip_code}` : '';

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
                            {address}
                        </p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Phone className="text-app-muted size-5" />
                    <div>
                        <p className="text-xs font-bold text-app-muted uppercase mb-1">Contact</p>
                        <p className="text-sm text-app-text font-medium">{phone}</p>
                        <p className="text-sm text-app-text font-medium">{email}</p>
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
                                    src={manager.avatar}
                                />
                            </div>
                            <p className="text-sm text-app-text font-bold">{manager.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BranchGeneralInfo;
