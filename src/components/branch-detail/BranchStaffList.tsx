import { UserPlus } from "lucide-react";

interface StaffMember {
    name: string;
    role: string;
    status: string;
    avatar: string;
}

interface BranchStaffListProps {
    staff?: StaffMember[];
}

const BranchStaffList = ({ staff: apiStaff }: BranchStaffListProps) => {
    // Fallback to mock data if API doesn't provide staff yet
    const mockStaff: StaffMember[] = [
        {
            name: "Amanda Ross",
            role: "Floor Manager",
            status: "active",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMQ8ULifD_PvI6_Hu47XNT6pKr3pCgfgcOh0rg54IwDsC0yL5NiHAGp2hqlKrwldRaFD9q9ErbTqGjcxC6Bo5-eGLQg-5AcZjKNCTha1-BPM6p2LvShogRHgY803aZGMhqsRA0ioJQU3Kzn26T-HR9ru51s_5cVG43__lcgrDqwWX-nWwkD57T1gy8pXmIe2YtWzQK2Qk1ObQX4rQky80YRNIeUgZNYyzSkYQOZns6jyfNU5MpScS-Rbdm7ccVZ_wtA3_6G8z0MJE"
        },
        {
            name: "David Kim",
            role: "Head Chef",
            status: "active",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB03Ou7YUTBnRwnEDH2RdEnnytWYcQYQalZMMSl6azzMB248MDuczHnlQ9DZ2DV4QEUagkbW0Hx4llC_51K2g8D2HlnehC7y8zvo-_W0vzF06XC_MSNy34iYI-HYNGwdkWsEJ45P3BaIo2ivOY6cbZE7XeJrSnrhp2EdrKpgjvxVTHi-sdVKUig60L5r7RYUdN6Dwpxle7vi3cH0pddGOH9f8_Ju26XGQWsWn9emqeyxvvqshTUfAy3OX7OHUMRZ1VtkPGS9BMg4E8"
        },
        {
            name: "Elena Vassili",
            role: "Shift Supervisor",
            status: "inactive",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXq0Nhgbg4tayZZgXZqHkfyaULdtTqyRactB8f6UgchvQW-oYJroR036ymeCLfq4x_Q45-ITr6pW1EkLDMDXCALBnVxUjn_2xUQFFmZURPpP6Okxrrhrp3u1FXqLy-cpnMgxlEfrdxcmqc2fVYMQ8xDJ0NI2FNkTA8in1V4g7qOelNZfEsb8jK0HD9ely-2WK2saCTb54EpXtjgA6rpzUXzgZOGahHYfH69a2pyYkF-g3ffDFMtPC7O4FBt9h9a6qAoV7V2XEOl5k"
        }
    ];

    const staff = apiStaff || mockStaff;

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
