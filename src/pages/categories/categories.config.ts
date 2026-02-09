import { UtensilsCrossed, Utensils, Martini, CakeSlice, Star, Baby } from "lucide-react";
import type { Category } from "./categories.type";

export const MOCK_CATEGORIES: Category[] = [
    {
        id: "1",
        name: "Appetizers",
        itemCount: 12,
        icon: UtensilsCrossed,
        isActive: true
    },
    {
        id: "2",
        name: "Main Course",
        itemCount: 24,
        icon: Utensils,
        isActive: true
    },
    {
        id: "3",
        name: "Beverages",
        itemCount: 18,
        icon: Martini,
        isActive: true
    },
    {
        id: "4",
        name: "Desserts",
        itemCount: 8,
        icon: CakeSlice,
        isActive: true
    },
    {
        id: "5",
        name: "Daily Specials",
        itemCount: 0,
        icon: Star,
        isActive: false // Matches reference "Availability" unchecked
    },
    {
        id: "6",
        name: "Kids Menu",
        itemCount: 6,
        icon: Baby,
        isActive: true
    }
];
