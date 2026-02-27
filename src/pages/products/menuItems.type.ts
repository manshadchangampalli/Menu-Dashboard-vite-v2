export type MenuType = string;

export interface MenuItem {
    id: string;
    name: string;
    sku: string;
    shortDescription: string;
    longDescription: string;
    category: "Appetizers" | "Main Course" | "Desserts" | "Beverages" | "Sides";
    price: number;
    offerPrice?: number;
    image: string; // Keep for backward compatibility/thumbnail
    images: string[];
    videos?: { url: string; type: 'cooking' | 'promo' }[];
    modelUrl?: string;
    inStock: boolean;
    rating?: number;
    reviews?: number;
    menuType: MenuType;
    variants?: { name: string; price: number; stock: boolean }[];
    attributes?: { name: string; value: string }[];
}
