import type { LucideIcon } from "lucide-react";

export type CategoryIconName = "UtensilsCrossed" | "Utensils" | "Martini" | "CakeSlice" | "Star" | "Baby";

export interface Category {
    id: string;
    name: string;
    itemCount: number;
    icon: LucideIcon;
    isActive: boolean;
}
