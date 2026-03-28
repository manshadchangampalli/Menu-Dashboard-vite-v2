export interface OrderItem {
    menu_item_id: string;
    name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
}

export interface Order {
    _id: string;
    order_uuid: string;
    organization_id: string;
    branch_id: string;
    customer_name: string;
    customer_email?: string;
    customer_phone?: string;
    customer_address?: string;
    items: OrderItem[];
    total_amount: number;
    status: "PENDING" | "PREPARING" | "READY" | "COMPLETED" | "CANCELLED";
    created_at: string;
    updated_at: string;
    table_number?: string;
    notes?: string;
}
