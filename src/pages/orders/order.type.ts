export interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    specialInstructions?: string;
    addons?: string[];
}

export interface OrderTimelineStep {
    status: string;
    time: string;
    completed: boolean;
}

export interface Order {
    id: string;
    customer: {
        name: string;
        initials: string; 
        email?: string;
        phone?: string;
        address?: string;
        isRepeat?: boolean;
    };
    items: string; // Keep for table display
    itemsDetail?: OrderItem[]; // For detailed view
    total: string;
    subtotal?: number;
    tax?: number;
    serviceFee?: number;
    status: "Pending" | "Preparing" | "Ready" | "Delivered" | "Cancelled";
    timestamp: string;
    timeAgo: string;
    paymentMethod?: string;
    timeline?: OrderTimelineStep[];
    kitchenNotes?: string;
    tableNo?: string;
    serverName?: string;
}
