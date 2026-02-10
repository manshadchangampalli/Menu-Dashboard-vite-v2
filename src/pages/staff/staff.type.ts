export type StaffRole = "Admin" | "Chef" | "Waiter" | "Manager" | "Bartender";
export type StaffStatus = "Active" | "Inactive";

export interface StaffMember {
    id: string;
    name: string;
    role: StaffRole;
    joinedDate: string; // ISO date string or formatted string
    avatar: string;
    branchName: string;
    branchLocation: string;
    status: StaffStatus;
}
