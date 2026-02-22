import { UtensilsCrossed, Utensils, Martini, CakeSlice, Star, Baby } from "lucide-react";
import type { Category } from "../service/categories.type";

export const MOCK_CATEGORIES: Category[] = [
    {
        _id: "1",
        name: "Appetizers",
        itemCount: 12,
        icon: UtensilsCrossed,
        isActive: true,
        menuId: "1" // Main Menu
    },
    {
        _id: "2",
        name: "Main Course",
        itemCount: 24,
        icon: Utensils,
        isActive: true,
        menuId: "1" // Main Menu
    },
    {
        _id: "3",
        name: "Beverages",
        itemCount: 18,
        icon: Martini,
        isActive: true,
        menuId: "2" // Breakfast Menu
    },
    {
        _id: "4",
        name: "Desserts",
        itemCount: 8,
        icon: CakeSlice,
        isActive: true,
        menuId: "1" // Main Menu
    },
    {
        _id: "5",
        name: "Daily Specials",
        itemCount: 0,
        icon: Star,
        isActive: false, // Matches reference "Availability" unchecked
        menuId: "3" // Ramadan Special
    },
    {
        _id: "6",
        name: "Kids Menu",
        itemCount: 6,
        icon: Baby,
        isActive: true,
        menuId: "4" // Delivery Exclusives
    }
];
