export interface StaffProfile {
    id: string;
    name: string;
    role: string;
    avatar: string;
    status: "Active" | "Inactive";
    email: string;
    phone: string;
    joinDate: string;
}

export interface BranchAccess {
    id: string;
    name: string;
    isPrimary: boolean;
}

export interface PerformanceStat {
    label: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    subtext?: string;
    icon: any; // Lucide icon
    iconColor?: string;
}

export interface ActivityLog {
    id: string;
    title: string;
    time: string;
    description: string;
    icon: any; // Lucide icon
    type: "menu" | "schedule" | "inventory" | "other"
}

export interface StaffDetailData {
    profile: StaffProfile;
    branches: BranchAccess[];
    stats: PerformanceStat[];
    activity: ActivityLog[];
}
