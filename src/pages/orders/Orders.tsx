import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronRight, History, Plus } from "lucide-react";
import OrdersTable from "../../components/orders/OrdersTable";
import OrderCreatePanel from "../../components/orders/OrderCreatePanel";
import { Button } from "../../components/ui/button";
import type { Order } from "./order.type";

const Orders = () => {
    const navigate = useNavigate();
    const [showCreatePanel, setShowCreatePanel] = useState(false);

    return (
        <main className="flex-1 overflow-y-auto p-8 relative">
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
                    <Button variant="outline" className="border-app-border bg-white font-semibold text-app-text hover:bg-app-bg shadow-sm">
                        <History className="w-[18px] h-[18px]" />
                        Order History
                    </Button>
                    <Button
                        className="bg-app-text text-white font-semibold hover:bg-app-text/90 shadow-sm"
                        onClick={() => setShowCreatePanel(true)}
                    >
                        <Plus className="w-[18px] h-[18px]" />
                        New Walk-in Order
                    </Button>
                </div>
            </div>

            <OrdersTable
                onViewDetails={(order: Order) => navigate(`/orders/${order._id}`)}
            />

            <OrderCreatePanel
                open={showCreatePanel}
                onClose={() => setShowCreatePanel(false)}
            />
        </main>
    );
};

export default Orders;
