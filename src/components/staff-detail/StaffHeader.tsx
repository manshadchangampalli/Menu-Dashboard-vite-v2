import { ChevronRight, Edit, Mail } from "lucide-react";
import { Button } from "../ui/button";

const StaffHeader = () => {
    return (
        <div className="flex items-center justify-between mb-8">
            <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-app-muted mb-2 uppercase tracking-widest">
                    <a className="hover:text-app-text" href="#">Management</a>
                    <ChevronRight className="size-3.5" />
                    <a className="hover:text-app-text" href="#">Staff</a>
                    <ChevronRight className="size-3.5" />
                    <span className="text-app-text font-bold">Profile</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-app-text">Staff Member Profile</h2>
            </div>
            <div className="flex gap-3">
                <Button variant="outline" className="h-9 gap-2">
                    <Edit className="size-[18px]" />
                    Edit Profile
                </Button>
                <Button className="h-9 gap-2 bg-app-text text-white hover:bg-black/90">
                    <Mail className="size-[18px]" />
                    Send Message
                </Button>
            </div>
        </div>
    );
};

export default StaffHeader;
