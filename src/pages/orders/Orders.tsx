
import { useState } from "react";
import { ChevronRight, History, Plus } from "lucide-react";
import FilterTabs from "../../components/ui/FilterTabs";
import OrdersTable, { type Order } from "../../components/orders/OrdersTable";
import Pagination from "../../components/ui/Pagination";

const Orders = () => {
    const [activeTab, setActiveTab] = useState("All Orders");
    const [currentPage, setCurrentPage] = useState(1);

    const tabs = ["All Orders", "Pending", "Preparing", "Ready", "Delivered"];

    const orders: Order[] = [
        {
            id: "#ORD-2841",
            timestamp: "Today, 12:45 PM",
            timeAgo: "3 mins ago",
            customer: {
                name: "John Doe",
                initials: "JD",
            },
            items: "2x Wagyu Burger, 1x Truffle Fries",
            total: "$54.20",
            status: "Pending",
        },
        {
            id: "#ORD-2839",
            timestamp: "Today, 12:38 PM",
            timeAgo: "10 mins ago",
            customer: {
                name: "Alice Smith",
                initials: "AS",
            },
            items: "1x Caesar Salad, 2x Salmon Grill",
            total: "$78.50",
            status: "Preparing",
        },
        {
            id: "#ORD-2835",
            timestamp: "Today, 12:20 PM",
            timeAgo: "28 mins ago",
            customer: {
                name: "Marcus Kane",
                initials: "MK",
            },
            items: "3x Pepperoni Pizza Large",
            total: "$62.00",
            status: "Ready",
        },
        {
            id: "#ORD-2832",
            timestamp: "Today, 11:55 AM",
            timeAgo: "53 mins ago",
            customer: {
                name: "Linda Blair",
                initials: "LB",
            },
            items: "2x Pasta Carbonara, 1x Red Wine",
            total: "$45.00",
            status: "Ready",
        },
    ];

    // Filter logic (mock implementation for now)
    const filteredOrders = activeTab === "All Orders"
        ? orders
        : orders.filter(order => order.status === activeTab);

    return (
        <main className="flex-1 overflow-y-auto p-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-app-muted mb-2 uppercase tracking-widest">
                        <span>Management</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-app-text font-bold">Live Order Console</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-app-text">Order Management</h2>
                    <p className="text-app-muted mt-1 font-medium">Manage and monitor live orders in real-time.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 h-9 rounded-md border border-app-border bg-white font-semibold text-sm hover:bg-app-bg transition-colors shadow-sm text-app-text">
                        <History className="w-[18px] h-[18px]" />
                        Order History
                    </button>
                    <button className="flex items-center gap-2 px-4 h-9 rounded-md bg-app-text text-white font-semibold text-sm hover:bg-app-text/90 transition-all shadow-sm">
                        <Plus className="w-[18px] h-[18px]" />
                        New Walk-in Order
                    </button>
                </div>
            </div>

            <FilterTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <OrdersTable orders={filteredOrders} />

            <Pagination
                currentPage={currentPage}
                totalPages={4}
                totalItems={48}
                itemsPerPage={12}
                onPageChange={setCurrentPage}
            />
        </main>
    );
};

export default Orders;
