export type MenuStatus = "active" | "inactive" | "archived";
export type MenuType = "dine-in" | "delivery" | "both";

export interface Menu {
    id: string;
    name: string;
    description?: string;
    status: MenuStatus;
    type?: MenuType;
    availability?: {
        startTime: string;
        endTime: string;
        days?: string[]; // "Mon", "Tue", etc.
    };
    categoryCount: number;
    itemCount: number;
    createdAt: string;
    updatedAt: string;
}
