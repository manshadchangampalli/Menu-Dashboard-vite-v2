export interface Branch {
    id: string;
    name: string;
    type: string;
    address: string;
    district: string;
    managerName: string;
    managerAvatar: string;
    status: "Open" | "Closed";
}
