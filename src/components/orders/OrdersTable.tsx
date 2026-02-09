import { useState } from "react";
import { DataTable, type Column } from "../ui/data-table";
import { Button } from "../ui/button";
import StatusBadge from "../ui/StatusBadge";
import FilterTabs from "../ui/FilterTabs";

import type { Order } from "../../pages/orders/order.type";
import { MOCK_ORDERS } from "@/pages/orders/orders.config";

interface OrdersTableProps {
    apiKey?: string;
    onViewDetails?: (order: Order) => void;
}

const OrdersTable = ({ apiKey, onViewDetails }: OrdersTableProps) => {
    const [activeTab, setActiveTab] = useState("All Orders");
    const tabs = ["All Orders", "Pending", "Preparing", "Ready", "Delivered"];

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
                    <Button
                        size="sm"
                        className="h-8 bg-app-text text-white text-xs font-bold hover:bg-app-text/90"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {order.status === "Pending" ? "Process" : order.status === "Preparing" ? "Mark Ready" : "Deliver"}
                    </Button>
                </div>
            ),
        }
    ];

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
                    onRowClick={onViewDetails}
                />
            </div>
        </div>
    );
};

export default OrdersTable;
