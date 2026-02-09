import { useState } from "react";
import { DataTable, type Column } from "../ui/data-table";
import { Button } from "../ui/button";
import StatusBadge from "../ui/StatusBadge";
import FilterTabs from "../ui/FilterTabs";

export interface Order {
    id: string;
    customer: {
        name: string;
        initials: string;
    };
    items: string;
    total: string;
    status: "Pending" | "Preparing" | "Ready" | "Delivered" | "Cancelled";
    timestamp: string;
    timeAgo: string;
}

const MOCK_ORDERS: Order[] = [
    {
        id: "#ORD-2841",
        timestamp: "Today, 12:45 PM",
        timeAgo: "3 mins ago",
        customer: { name: "John Doe", initials: "JD" },
        items: "2x Wagyu Burger, 1x Truffle Fries",
        total: "$54.20",
        status: "Pending",
    },
    {
        id: "#ORD-2839",
        timestamp: "Today, 12:38 PM",
        timeAgo: "10 mins ago",
        customer: { name: "Alice Smith", initials: "AS" },
        items: "1x Caesar Salad, 2x Salmon Grill",
        total: "$78.50",
        status: "Preparing",
    },
    {
        id: "#ORD-2835",
        timestamp: "Today, 12:20 PM",
        timeAgo: "28 mins ago",
        customer: { name: "Marcus Kane", initials: "MK" },
        items: "3x Pepperoni Pizza Large",
        total: "$62.00",
        status: "Ready",
    },
    {
        id: "#ORD-2832",
        timestamp: "Today, 11:55 AM",
        timeAgo: "53 mins ago",
        customer: { name: "Linda Blair", initials: "LB" },
        items: "2x Pasta Carbonara, 1x Red Wine",
        total: "$45.00",
        status: "Ready",
    },
    {
        id: "#ORD-2831",
        timestamp: "Today, 11:30 AM",
        timeAgo: "1h ago",
        customer: { name: "Sam Wilson", initials: "SW" },
        items: "1x Mushroom Risotto",
        total: "$22.00",
        status: "Delivered",
    },
];

const columns: Column<Order>[] = [
    {
        header: "Order ID",
        accessorKey: "id",
        className: "font-bold text-app-text",
    },
    {
        header: "Timestamp",
        accessorKey: "timestamp",
        cell: (order) => (
            <div>
                <div className="text-sm text-app-text font-medium">{order.timestamp}</div>
                <div className="text-[10px] text-app-muted font-bold uppercase tracking-tight">{order.timeAgo}</div>
            </div>
        ),
    },
    {
        header: "Customer",
        accessorKey: "customer",
        cell: (order) => (
            <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-app-accent flex items-center justify-center text-xs font-bold text-app-text">
                    {order.customer.initials}
                </div>
                <div className="text-sm font-semibold text-app-text">{order.customer.name}</div>
            </div>
        ),
    },
    {
        header: "Items",
        accessorKey: "items",
        className: "text-sm text-app-text font-medium",
    },
    {
        header: "Total Price",
        accessorKey: "total",
        className: "text-sm font-bold text-app-text",
    },
    {
        header: "Status",
        accessorKey: "status",
        cell: (order) => (
            <div className="flex ">
                <StatusBadge status={order.status} />
            </div>
        ),
    },
    {
        header: "Actions",
        accessorKey: "id", // Using ID as key for actions column
        cell: (order) => (
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 border-app-border text-xs font-bold hover:bg-app-bg text-app-text">Details</Button>
                <Button size="sm" className="h-8 bg-app-text text-white text-xs font-bold hover:bg-app-text/90">
                    {order.status === "Pending" ? "Process" : order.status === "Preparing" ? "Mark Ready" : "Deliver"}
                </Button>
            </div>
        ),
    }
];

interface OrdersTableProps {
    apiKey?: string;
}

const OrdersTable = ({ apiKey }: OrdersTableProps) => {
    const [activeTab, setActiveTab] = useState("All Orders");
    const tabs = ["All Orders", "Pending", "Preparing", "Ready", "Delivered"];

    // Filter logic for Tabs
    const filteredOrders = MOCK_ORDERS.filter(order => {
        if (activeTab === "All Orders") return true;
        return order.status === activeTab;
    });

    return (
        <div className="space-y-4">
            <FilterTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
            <div className="bg-white border border-app-border rounded-lg shadow-sm overflow-hidden p-4">
                <DataTable
                    columns={columns}
                    data={filteredOrders}
                    searchKeys={["id", "customer.name", "items"]}
                    initialPageSize={10}
                />
            </div>
        </div>
    );
};

export default OrdersTable;
