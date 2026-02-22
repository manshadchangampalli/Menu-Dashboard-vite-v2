import { 
    UtensilsCrossed, 
    Pizza, 
    Coffee, 
    Beer, 
    IceCream,
    HelpCircle,
    type LucideIcon 
} from "lucide-react";

export enum CategoryIcon {
    UTENSILS_CROSSED = 'UtensilsCrossed',
    PIZZA = 'Pizza',
    COFFEE = 'Coffee',
    BEER = 'Beer',
    ICE_CREAM = 'IceCream',
}

export const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
    [CategoryIcon.UTENSILS_CROSSED]: UtensilsCrossed,
    [CategoryIcon.PIZZA]: Pizza,
    [CategoryIcon.COFFEE]: Coffee,
    [CategoryIcon.BEER]: Beer,
    [CategoryIcon.ICE_CREAM]: IceCream,
};

export const getCategoryIcon = (iconName: string | LucideIcon): LucideIcon => {
    if (typeof iconName !== 'string') return iconName;
    return CATEGORY_ICON_MAP[iconName] || HelpCircle;
};

export type CategoryIconName = keyof typeof CategoryIcon | string;

export interface CreateCategoryRequest {
    name: string;
    organization_id: string;
    icon: string;
    isActive: boolean;
    menuId: string;
    itemCount?: number;
}

export interface Category {
    _id: string; // From API
    id?: string; // For backward compatibility if needed
    name: string;
    organization_id?: string;
    itemCount: number;
    icon: string | LucideIcon;
    isActive: boolean;
    menuId?: string;
    created_at?: string;
    updated_at?: string;
}
