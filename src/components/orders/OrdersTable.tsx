import { useState } from "react";
import { DataTable, type Column } from "../ui/data-table";
import { Button } from "../ui/button";
import StatusBadge from "../ui/StatusBadge";
import FilterTabs from "../ui/FilterTabs";
import { formatDistanceToNow } from "date-fns";
import { useOrders } from "../../pages/orders/hooks/useOrders";
import type { Order } from "../../pages/orders/order.type";

interface OrdersTableProps {
    apiKey?: string;
    onViewDetails?: (order: Order) => void;
}

const TABS = ["All Orders", "Pending", "Preparing", "Ready", "Delivered"];

const OrdersTable = ({ onViewDetails }: OrdersTableProps) => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("All Orders");

    const { orders, total, totalPages, isLoading } = useOrders({
        page,
        limit: 10,
        status: activeTab === "All Orders" ? undefined : activeTab.toUpperCase(),
        search,
    });

    const columns: Column<Order>[] = [
        {
            header: "Order ID",
            accessorKey: "order_uuid",
            cell: (order) => <span className="font-medium text-app-text">#{order.order_uuid?.slice(-6) || "N/A"}</span>,
        },
        {
            header: "Order Time",
            accessorKey: "created_at",
            cell: (order) => (
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-app-text">
                        {order.created_at ? new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A"}
                    </span>
                    <span className="text-[10px] text-app-muted font-bold uppercase tracking-tight">
                        {order.created_at ? formatDistanceToNow(new Date(order.created_at), { addSuffix: true }) : ""}
                    </span>
                </div>
            ),
        },
        {
            header: "Customer",
            accessorKey: "customer_name",
            cell: (order) => (
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-app-accent flex items-center justify-center text-[10px] font-bold text-app-text">
                        {order.customer_name?.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) || "G"}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-app-text">{order.customer_name}</span>
                        <span className="text-[10px] text-app-muted font-medium">{order.customer_phone}</span>
                    </div>
                </div>
            ),
        },
        {
            header: "Items",
            accessorKey: "items",
            cell: (order) => (
                <span className="text-sm text-app-text font-medium">
                    {order.items?.map(item => `${item.quantity}x ${item.name}`).join(", ")}
                </span>
            ),
        },
        {
            header: "Total",
            accessorKey: "total_amount",
            cell: (order) => <span className="text-sm font-bold text-app-text">${(order.total_amount || 0).toFixed(2)}</span>,
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (order) => {
                const statusMap: Record<string, "Pending" | "Preparing" | "Ready" | "Delivered" | "Cancelled"> = {
                    PENDING: "Pending",
                    PREPARING: "Preparing",
                    READY: "Ready",
                    COMPLETED: "Delivered",
                    CANCELLED: "Cancelled",
                };
                return (
                    <div className="flex">
                        <StatusBadge status={statusMap[order.status] || "Pending"} />
                    </div>
                );
            },
        },
        {
            header: "Actions",
            accessorKey: "order_uuid",
            cell: (order) => (
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        className="h-8 bg-app-text text-white text-xs font-bold hover:bg-app-text/90"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {order.status === "PENDING" ? "Process" : order.status === "PREPARING" ? "Mark Ready" : "Deliver"}
                    </Button>
                </div>
            ),
        }
    ];

    const filteredOrders = orders;

    return (
        <div className="space-y-4">
            <FilterTabs
                tabs={TABS}
                activeTab={activeTab}
                onTabChange={(tab) => {
                    setActiveTab(tab);
                    setPage(1); // Explicitly reset page when tab changes
                }}
            />
            <div className="bg-white border border-app-border rounded-lg shadow-sm overflow-hidden p-4">
                <DataTable
                    columns={columns}
                    data={filteredOrders}
                    loading={isLoading}
                    total={total}
                    totalPages={totalPages}
                    page={page}
                    onPageChange={setPage}
                    search={search}
                    onSearchChange={(query) => {
                        setSearch(query);
                        setPage(1);
                    }}
                    searchKeys={["order_uuid", "customer_name"]}
                    initialPageSize={10}
                    onRowClick={onViewDetails}
                />
            </div>
        </div>
    );
};

export default OrdersTable;
